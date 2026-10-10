const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('fs');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});const c=await b.newContext({viewport:{width:1366,height:768}});await c.addInitScript(()=>{if(location.origin==='null')return;localStorage.setItem('sistersPuzzleCurrentPlayerV1','guest');localStorage.setItem('sistersMuted','1');localStorage.setItem('sistersCoachSeenV1:spot','1');});const p=await c.newPage(),rows=[];p.setDefaultTimeout(4000);await p.goto('http://127.0.0.1:8003/games/spot/');await p.waitForFunction(()=>SistersRound.canInteract());
for(let i=0;i<10;i++){await p.locator('#diff-row button').nth(i).click();await p.waitForFunction(i=>SistersRound.current()?.payload?.scene===i&&SistersRound.canInteract(),i);
const data=await p.evaluate(i=>SpotScenes[i],i),id=await p.evaluate(()=>SistersRound.current().id);
await p.addStyleTag({content:'.hit{border:2px dashed #b93451}.hit:before{content:attr(data-spot);position:absolute;top:0;left:0;color:#8c2639;background:white;font-size:12px}'});
await p.screenshot({path:'outputs/after/spot-scene-'+(i+1)+'-bounds.png',fullPage:true});
const find=p.locator('.find'),r=await find.boundingBox();await p.mouse.click(r.x+r.width*.96,r.y+r.height*.96);assert.equal(await p.evaluate(()=>SistersRound.current().payload.found.length),0);
const clicks=[];
for(const sp of data.spots){
 const fr=await find.boundingBox(),point={x:fr.x+fr.width*(sp.x+sp.w/2)/100,y:fr.y+fr.height*(sp.y+sp.h/2)/100};await p.mouse.click(point.x,point.y);
 assert((await p.evaluate(()=>SistersRound.current().payload.found)).includes(sp.id),'hit missed '+sp.id);clicks.push({id:sp.id,label:sp.label,point});
 if(clicks.length===1){await p.reload();await p.waitForFunction(()=>SistersRound.canInteract());assert.equal(await p.evaluate(()=>SistersRound.current().id),id);assert.equal(await p.locator('.hit.found').count(),1);}
}
await p.waitForFunction(()=>SistersRound.current().status==='completed');await p.reload();await p.waitForFunction(()=>SistersRound.current()?.status==='completed');const count=await p.evaluate(id=>JSON.parse(localStorage.getItem('sistersGameResultsV1')).filter(x=>x.roundId===id).length,id);assert.equal(count,1);await p.screenshot({path:'outputs/after/spot-scene-'+(i+1)+'-completed.png',fullPage:true});await p.locator('#overlay-next').click();await p.waitForFunction(i=>SistersRound.current()?.payload?.scene===(i+1)%10&&SistersRound.canInteract(),i);rows.push({scene:i+1,name:data.name,clicks,restore:true,completed:true,next:true,onceOnly:true});
}fs.writeFileSync('outputs/spot-visual-clicks.json',JSON.stringify(rows,null,2));console.log('10 scenes;30 position clicks;restore/completion/next/dedup pass');await c.close();await b.close()})();
