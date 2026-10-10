'use strict';
const{chromium}=require('playwright'),assert=require('assert/strict'),fs=require('fs'),crypto=require('crypto'),{execFileSync}=require('child_process');
const base=process.env.TEST_URL||'http://127.0.0.1:8005',pw='Renew-synthetic+long!2026',salt='cd'.repeat(16),credential={algorithm:'PBKDF2-SHA256',iterations:600000,salt,hash:crypto.pbkdf2Sync(pw,Buffer.from(salt,'hex'),600000,32,'sha256').toString('hex')};
const old=execFileSync('git',['show','624975ef739ef773989fbe868a0c0b553c01ca3b:assets/js/lifecycle.js'],{encoding:'utf8'}),out='outputs/r3/renew-transition';fs.mkdirSync(out,{recursive:true});
(async()=>{const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']}),rows=[];
async function run(name,game,selector,value,kind='fixed'){
 const c=await browser.newContext({viewport:{width:1180,height:757}}),p=await c.newPage(),errors=[],faults=[],row={name,game,kind,pass:false};p.setDefaultTimeout(8000);p.on('pageerror',e=>errors.push(e.message));
 await c.addInitScript(()=>{if(location.origin==='null')return;localStorage.setItem('sistersPuzzleCurrentPlayerV1','guest');for(const g of ['puzzle','memory','visual'])localStorage.setItem('sistersCoachSeenV1:'+g,'1');const now=Date.now;window.__shift=0;Date.now=()=>now()+window.__shift;});
 if(kind==='baseline')await p.route('**/assets/js/lifecycle.js',r=>r.fulfill({contentType:'application/javascript',body:old}));
 const idle=()=>p.waitForFunction(()=>SistersRound.canInteract()),state=()=>p.evaluate(()=>SistersFamily.read());
 try{
  await p.goto(base+'/');await p.evaluate(async credential=>{await SistersFamily.ready;await SistersFamily.transact(s=>{s.credential=credential;SistersFamilyCore.grant(s,'guest',1200000,Date.now(),'synthetic-renew');});},credential);
  const records=Array.from({length:401},(_,i)=>({roundId:'synthetic-history-'+i,marker:i}));await p.evaluate(records=>localStorage.setItem('sistersGameResultsV1',JSON.stringify(records)),records);
  await p.goto(base+'/games/'+game+'/');await idle();await p.evaluate(()=>{window.__faults=[];document.addEventListener('sisters:family-fault',()=>window.__faults.push(SistersFamily.fault()));});
  if(game==='puzzle'){await p.click('#hint');await idle();}if(game==='memory'){await p.locator('#grid button').first().click();await idle();}
  const before=await p.evaluate(()=>SistersRound.current());await p.evaluate(()=>window.__shift=SistersFamily.read().session.deadline-Date.now()+100);await p.waitForFunction(()=>SistersFamily.read().session.phase==='grace');await p.waitForTimeout(350);
  if(kind==='renewOnly')await p.click('#family-open');else{await p.selectOption(selector,value);if(kind==='rapid')await p.selectOption(selector,'24');}
  await p.waitForFunction(()=>document.querySelector('.family-dialog').open);
  if(kind==='cancel'){
   await p.locator('#parent-auth [data-cancel]').click();await idle();const current=await p.evaluate(()=>SistersRound.current());assert.equal(current.id,before.id);assert.deepEqual(current.payload,before.payload);assert.equal((await state()).session.id,'synthetic-renew');
  }else{
   await p.fill('#parent-password',pw);await p.locator('#parent-auth button[type=submit]').click();await p.waitForFunction(()=>!document.getElementById('parent-authorized').hidden);
   const session=(await state()).session;await p.locator('#parent-duration button[type=submit]').click();await p.waitForFunction(()=>!document.querySelector('.family-dialog').open);
   if(kind==='baseline'){
    await p.waitForFunction(()=>SistersFamily.fault()==='保存版本已改變');row.reproduced='保存版本已改變';await p.screenshot({path:out+'/'+name+'.png'});
   }else{
    await idle();let current=await p.evaluate(()=>SistersRound.current());
    if(kind==='renewOnly'){assert.equal(current.id,before.id);assert.deepEqual(current.payload,before.payload);}else{assert.notEqual(current.id,before.id);if(game==='puzzle')assert.equal(current.payload.pieces,kind==='rapid'?24:+value);if(game==='memory')assert.equal(current.payload.deck.length,36);if(game==='visual')assert.equal(current.payload.targets.length,6);}
    let s=await state();assert.equal(Object.values(s.settlements).filter(x=>x.id===session.id).length,1);const settlement=s.settlements[session.id];assert(settlement.debtMs>0);assert.equal(s.session.deadline-s.session.startedAt,1200000-settlement.debtMs);assert.equal(s.players.guest.debtMs,0);row.debtMs=settlement.debtMs;
    faults.push(...await p.evaluate(()=>window.__faults));const id=current.id;if(game==='puzzle'){await p.click('#reference-toggle');await idle();await p.click('#hint');await idle();}if(game==='memory'){await p.locator('#grid button').first().click();await idle();}
    await p.evaluate(()=>SistersRound.checkpoint());current=await p.evaluate(()=>SistersRound.current());await p.screenshot({path:out+'/'+name+'.png'});await p.reload();await idle();const restored=await p.evaluate(()=>SistersRound.current());assert.equal(restored.id,id);assert.deepEqual(restored.payload,current.payload);
    await p.click('#round-save');await p.waitForURL('**/index.html#games/logic');assert.equal((await state()).rounds.guest[game].id,id);assert.equal((await state()).rounds.guest[game].status,'saved');await p.goto(base+'/games/'+game+'/');await idle();assert.equal((await p.evaluate(()=>SistersRound.current())).id,id);assert.equal(Object.values((await state()).settlements).filter(x=>x.id===session.id).length,1);row.reloadAndSavedReturn=true;row.noRetryRequired=true;
   }
  }
  assert.equal(c.pages().length,1);assert.deepEqual(await p.evaluate(()=>JSON.parse(localStorage.getItem('sistersGameResultsV1'))),records);faults.push(...await p.evaluate(()=>window.__faults||[]));if(kind!=='baseline')assert.deepEqual(faults,[]);assert.deepEqual(errors,[]);row.pass=true;row.singleGameTab=true;console.log('PASS',name);
 }catch(e){row.error=e.message;row.errors=errors;console.error('FAIL',name,e.stack);await p.screenshot({path:out+'/'+name+'-failure.png'});}finally{rows.push(row);await c.close();}
}
for(const n of [24,36])await run('baseline-puzzle-'+n,'puzzle','#size-row select',String(n),'baseline');await run('baseline-memory-36','memory','#size-row select','3','baseline');
for(const n of [24,36])await run('fixed-puzzle-'+n,'puzzle','#size-row select',String(n));await run('fixed-memory-36','memory','#size-row select','3');await run('fixed-visual-6','visual','#level-row select','4');
await run('cancel-puzzle-difficulty','puzzle','#size-row select','36','cancel');await run('cancel-memory-difficulty','memory','#size-row select','3','cancel');await run('renew-preserves-current-puzzle','puzzle',null,null,'renewOnly');await run('rapid-puzzle-targets','puzzle','#size-row select','36','rapid');
await browser.close();fs.writeFileSync('outputs/r3/renew-transition-browser.json',JSON.stringify(rows,null,2));if(rows.some(r=>!r.pass))process.exitCode=1;
})();
