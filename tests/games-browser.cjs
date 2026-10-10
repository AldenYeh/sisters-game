'use strict';
const {chromium}=require('playwright'),fs=require('fs'),assert=require('assert/strict'),crypto=require('crypto');
const url=process.env.TEST_URL||'http://127.0.0.1:8005',out='outputs/r3/games',password='R3-synthetic-only!long-2026';
const salt='34'.repeat(16),hash=crypto.pbkdf2Sync(password,Buffer.from(salt,'hex'),600000,32,'sha256').toString('hex');
(async()=>{fs.mkdirSync(out,{recursive:true});const browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox']});const ctx=await browser.newContext({viewport:{width:1366,height:768}});await ctx.addInitScript(()=>{const now=Date.now;window.__shift=0;Date.now=()=>now()+window.__shift;});const page=await ctx.newPage(),passed=[],errors=[];page.on('pageerror',e=>errors.push(e.message));
const idle=()=>page.waitForFunction(()=>SistersRound.canInteract(),null,{timeout:10000});const payload=()=>page.evaluate(()=>SistersRound.current().payload);
async function grant(){await page.evaluate(()=>window.__shift=0);await page.click('#family-open');await page.fill('#parent-password',password);await page.locator('#parent-auth button[type=submit]').click();await page.waitForFunction(()=>!document.getElementById('parent-authorized').hidden);await page.selectOption('#parent-minutes','20');await page.locator('#parent-duration button[type=submit]').click();await page.waitForFunction(()=>!document.querySelector('.family-dialog').open);}
async function coach(){for(let i=0;i<6&&await page.locator('.coach button').count();i++)await page.locator('.coach button').last().click();}
async function click(selector){await page.locator(selector).click();await idle();}
const solve=require('./browser-helpers.cjs').makeSolver(page,idle,payload);
try{await page.goto(url+'/');await page.evaluate(async c=>{await SistersFamily.ready;SistersShared.savePlayer('guest');await SistersFamily.transact(s=>{s.credential=c;SistersFamilyCore.grant(s,'guest',1200000,Date.now(),crypto.randomUUID());});},{algorithm:'PBKDF2-SHA256',iterations:600000,salt,hash});
for(const game of['maze','sudoku','puzzle','memory','hanoi','sliding','sokoban','stroke','tangram','visual','pattern','spot'].filter(g=>!process.env.TEST_GAMES||process.env.TEST_GAMES.split(',').includes(g))){
 if(passed.length)await grant();await page.goto(url+'/games/'+game+'/');await coach();if(game==='maze')await page.click('#start-game');if(game==='sudoku')await page.click('#start');await idle();
 await page.screenshot({path:out+'/'+game+'-before.png',fullPage:true});const original=await page.evaluate(()=>SistersRound.current());
 // Verify exact saved/reloaded question before reaching expiry.
 await page.reload();await idle();assert.equal((await page.evaluate(()=>SistersRound.current())).id,original.id);assert.deepEqual((await payload()).question,original.payload.question);
 await page.evaluate(()=>{window.__shift=SistersFamily.read().session.deadline-Date.now()+50;});await page.waitForFunction(()=>SistersFamily.read().session.phase==='grace');await idle();await solve(game);
 await page.waitForFunction(()=>SistersRound.current()?.status==='completed',null,{timeout:10000});await page.waitForFunction(()=>SistersFamily.read().session.phase==='locked');const state=await page.evaluate(()=>SistersFamily.read());assert.equal(state.active,null);assert.equal(state.events.filter(e=>e.type==='GameCompleted'&&e.roundId===original.id).length,1);assert.equal(Object.keys(state.settlements).filter(id=>id===state.session.id).length,1);
 const debt=state.players.guest.debtMs;await page.waitForTimeout(300);assert.equal((await page.evaluate(()=>SistersFamily.read())).players.guest.debtMs,debt);await page.screenshot({path:out+'/'+game+'-completed-grace.png',fullPage:true});passed.push(game);console.log('PASS actual completion after expiry',game);
}
assert.deepEqual(errors,[]);
}catch(e){await page.screenshot({path:out+'/failure.png',fullPage:true});console.error(e);process.exitCode=1;}finally{fs.writeFileSync('outputs/r3/'+(process.env.TEST_GAMES?'games-browser-affected':'games-browser')+'.json',JSON.stringify({passed,errors},null,2));await browser.close();}})();
