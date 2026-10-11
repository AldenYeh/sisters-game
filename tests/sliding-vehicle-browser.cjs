'use strict';
const {chromium}=require('playwright');
const fs=require('fs'),assert=require('assert/strict'),cp=require('child_process');
const base=process.env.TEST_URL||'http://127.0.0.1:8005',out=process.env.SLIDING_OUTPUT||'outputs/sliding-vehicles';
fs.mkdirSync(out,{recursive:true});
const rows=[];
async function capture(page,path,coarse){assert.equal(await page.evaluate(()=>matchMedia('(pointer:coarse)').matches),coarse);await page.screenshot({path,fullPage:false});assert.equal(await page.evaluate(()=>matchMedia('(pointer:coarse)').matches),coarse);}
async function grant(page){
  await page.goto(base+'/');
  await page.evaluate(async()=>{await SistersFamily.ready;SistersShared.savePlayer('guest');localStorage.setItem('sistersCoachSeenV1:sliding','1');localStorage.setItem('sistersMuted','1');await SistersFamily.transact(s=>{s.credential={algorithm:'PBKDF2-SHA256',iterations:600000,salt:'ac'.repeat(16),hash:'bd'.repeat(32)};SistersFamilyCore.grant(s,'guest',7200000,Date.now(),'fictional-vehicle-qa');});});
}
const idle=p=>p.waitForFunction(()=>SistersRound.canInteract());
async function fixture(page,tier){
  await page.goto(base+'/games/sliding/');await idle(page);
  await page.evaluate(async tier=>{await SistersFamily.transact(s=>{
    const score=L=>new Set(L.pieces.map((p,i)=>p.target?'car':Math.max(p.w,p.h)>=3?(i%2?'bus':'truck'):(i%2?'van':'car'))).size*100+L.minimumMoves+L.pieces.length;
    const L=[...SistersBanks.sliding[tier]].sort((a,b)=>score(b)-score(a))[0],r=s.rounds.guest.sliding;
    r.payload.question=structuredClone(L);r.payload.tier=tier;r.payload.pieces=structuredClone(L.pieces);r.payload.moves=0;r.payload.hints=0;r.payload.history=[];
  });},tier);await page.reload();await idle(page);
}
async function drag(page,mode,cdp,[i,dr,dc],anchor=[.5,.5]){
  await page.locator('#board').scrollIntoViewIfNeeded();
  const a=await page.locator('#board .block').nth(i).boundingBox(),b=await page.locator('#board').boundingBox();
  const L=await page.evaluate(()=>SistersRound.current().payload.question||SlidingLevels[SistersRound.current().payload.index]);
  const x=a.x+a.width*anchor[0],y=a.y+a.height*anchor[1],tx=x+dc*b.width/L.cols,ty=y+dr*b.height/L.rows;
  if(mode==='mouse'){await page.mouse.move(x,y);await page.mouse.down();await page.mouse.move(tx,ty,{steps:8});await page.mouse.up();}
  else{await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y,id:1}]});for(let n=1;n<=8;n++)await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x+(tx-x)*n/8,y:y+(ty-y)*n/8,id:1}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});}
}
async function geometry(page){return page.evaluate(()=>{
  const r=SistersRound.current().payload,L=r.question||SlidingLevels[r.index],b=document.getElementById('board').getBoundingClientRect();
  return [...document.querySelectorAll('#board .block')].map((e,i)=>{const p=r.pieces[i],q=e.getBoundingClientRect();return {kind:e.dataset.vehicle,axis:e.dataset.axis,label:e.getAttribute('aria-label'),svg:e.querySelector('svg')?.getAttribute('viewBox'),left:(q.left-b.left)/b.width*L.cols,top:(q.top-b.top)/b.height*L.rows,width:q.width/b.width*L.cols,height:q.height/b.height*L.rows,expected:p,hit:[ [.5,.5],[.03,.5],[.97,.5] ].every(([x,y])=>document.elementFromPoint(q.x+q.width*x,q.y+q.height*y)?.closest('.block')===e)};});
});}
(async()=>{
  const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
  try{
    // Optional historical comparison; normal regression does not require Git history.
    if(process.env.CAPTURE_BASELINE==='1')for(const mode of ['mouse','touch','mixed']){
      const c=await browser.newContext({viewport:mode==='mouse'?{width:1180,height:757}:{width:390,height:844},hasTouch:mode!=='mouse',isMobile:mode!=='mouse'});
      for(const name of(mode==='mixed'?['sliding.js']:['sliding.js','sliding.css']))await c.route('**/games/sliding/'+name+'*',r=>r.fulfill({body:cp.execFileSync('git',['show','f13b671:games/sliding/'+name]),contentType:name.endsWith('.css')?'text/css':'application/javascript'}));
      const p=await c.newPage();await grant(p);await fixture(p,'challenge');await capture(p,out+'/before-'+mode+'.png',mode!=='mouse');
      if(mode==='mixed'){assert(await p.locator('.block').evaluateAll(es=>es.every(e=>!e.querySelector('svg')&&getComputedStyle(e).backgroundColor!=='rgba(0, 0, 0, 0)')));rows.push({pass:true,oldJSWithNewCSS:true,visibleFallbackBlocks:true});}
      await c.close();
    }
    for(const mode of ['mouse','touch'])for(const tier of ['basic','planning','challenge']){
      const c=await browser.newContext({viewport:mode==='mouse'?{width:1180,height:757}:{width:390,height:844},hasTouch:mode==='touch',isMobile:mode==='touch'}),p=await c.newPage(),errors=[];
      p.on('pageerror',e=>errors.push(e.message));await grant(p);await fixture(p,tier);
      const initial=await p.evaluate(()=>SistersRound.current()),route=initial.payload.question.solution,cdp=await c.newCDPSession(p);
      await p.locator('#board').scrollIntoViewIfNeeded();const checks=await geometry(p);
      for(const x of checks){for(const [key,expected] of [['left',x.expected.c],['top',x.expected.r],['width',x.expected.w],['height',x.expected.h]])assert(Math.abs(x[key]-expected)<.002,key+' remains exact grid footprint');assert(x.hit,'SVG and transparent footprint both route to the correct button');assert(x.svg);assert.equal(x.axis,x.expected.w>x.expected.h?'x':'y');}
      assert.equal(checks[0].kind,'car');assert(checks[0].label.includes('紅色目標車'));assert(checks.some(x=>x.axis==='y'));assert(checks.some(x=>x.kind==='bus'||x.kind==='truck'));
      assert.equal(await p.locator('.door').textContent(),'出口→');assert(await p.locator('.door').isVisible());assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
      await capture(p,out+'/'+tier+'-'+mode+'-before.png',mode==='touch');
      await drag(p,mode,cdp,[0,1,0]);await idle(p);assert.deepEqual((await p.evaluate(()=>SistersRound.current())).payload.pieces,initial.payload.pieces,'perpendicular movement rejected');assert.equal((await p.evaluate(()=>SistersRound.current())).payload.moves,0);
      const blocked=await p.evaluate(()=>{const r=SistersRound.current().payload,L=r.question;for(let i=0;i<r.pieces.length;i++){const q=r.pieces[i],directions=q.w>q.h?[[0,1],[0,-1]]:[[1,0],[-1,0]];for(const [dr,dc] of directions){const occupied=new Set();r.pieces.forEach((p,j)=>{if(i!==j)for(let y=0;y<p.h;y++)for(let x=0;x<p.w;x++)occupied.add(`${p.r+y},${p.c+x}`)});let ok=q.r+dr>=0&&q.c+dc>=0&&q.r+dr+q.h<=L.rows&&q.c+dc+q.w<=L.cols;for(let y=0;y<q.h;y++)for(let x=0;x<q.w;x++)if(occupied.has(`${q.r+dr+y},${q.c+dc+x}`))ok=false;if(!ok)return[i,dr,dc];}}});
      await drag(p,mode,cdp,blocked);await idle(p);assert.deepEqual((await p.evaluate(()=>SistersRound.current())).payload.pieces,initial.payload.pieces,'collision/boundary rejected');
      // Start on the painted wheel/edge rather than only the vehicle centre.
      await drag(p,mode,cdp,route[0],[.2,.15]);await idle(p);const progressed=await p.evaluate(()=>SistersRound.current());assert.equal(progressed.payload.moves,1);
      await p.reload();await idle(p);const restored=await p.evaluate(()=>SistersRound.current());assert.equal(restored.id,initial.id);assert.deepEqual(restored.payload.pieces,progressed.payload.pieces);assert.deepEqual(restored.payload.question,initial.payload.question);
      await p.locator('#undo')[mode==='touch'?'tap':'click']();await idle(p);assert.deepEqual((await p.evaluate(()=>SistersRound.current())).payload.pieces,initial.payload.pieces);assert.equal((await p.evaluate(()=>SistersRound.current())).payload.moves,0);
      for(let n=0;n<route.length;n++){await drag(p,mode,cdp,route[n]);if(n<route.length-1)await idle(p);}
      await p.waitForFunction(()=>SistersRound.current()?.status==='completed');await p.waitForFunction(id=>SistersFamily.read().events.some(e=>e.type==='GameCompleted'&&e.roundId===id),initial.id);const completed=await p.evaluate(()=>SistersRound.current());assert.equal(completed.payload.moves,route.length);assert.equal(await p.evaluate(id=>SistersFamily.read().events.filter(e=>e.type==='GameCompleted'&&e.roundId===id).length,initial.id),1);assert.equal(await p.locator('#complete').isVisible(),true);assert.match(await p.locator('#complete p').textContent(),/紅車開出去了/);assert.deepEqual(errors,[]);
      await capture(p,out+'/'+tier+'-'+mode+'-completed.png',mode==='touch');rows.push({pass:true,mode,tier,level:initial.payload.question.id,moves:route.length,vehicleKinds:[...new Set(checks.map(x=>x.kind))],gridFootprintAndHitPoints:true,perpendicularAndCollisionBlocked:true,actualWheelDrag:true,reloadActiveRound:true,undo:true,actualRouteCompletion:true,errors});await c.close();
    }
    // Saved square pieces keep their original four-direction behaviour and full hit area.
    const c=await browser.newContext({viewport:{width:390,height:844},hasTouch:true,isMobile:true}),p=await c.newPage();await grant(p);await fixture(p,'basic');
    await p.evaluate(async()=>{await SistersFamily.transact(s=>{const index=SlidingLevels.findIndex(L=>L.pieces.some(p=>p.w===p.h)),L=SlidingLevels[index],r=s.rounds.guest.sliding;r.payload.question=null;r.payload.index=index;r.payload.tier='legacy';r.payload.pieces=structuredClone(L.pieces);r.payload.moves=0;r.payload.history=[];});});await p.reload();await idle(p);await p.locator('#board').scrollIntoViewIfNeeded();const old=await geometry(p);assert(old.some(x=>x.axis==='free'&&x.kind==='cart'));for(const x of old)assert(x.hit);await capture(p,out+'/legacy-square-touch.png',true);rows.push({pass:true,legacySquareRestore:true,originalFreeAxis:true,fullHitArea:true});await c.close();
  }catch(e){rows.push({pass:false,error:e.stack});process.exitCode=1;console.error(e);}finally{fs.writeFileSync(out+'/results.json',JSON.stringify({rows,limits:['Chromium desktop and genuine CDP touch dispatch, not physical iPhone/WebKit.']},null,2));await browser.close();}
  console.log('Sliding vehicle checks',rows.filter(r=>r.pass).length);
})();
