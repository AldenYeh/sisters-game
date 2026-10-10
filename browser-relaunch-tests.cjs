const {chromium}=require('playwright');
const fs=require('node:fs');
const assert=require('node:assert/strict');
const base=process.env.BASE_URL||'http://127.0.0.1:8002';
(async()=>{
  fs.mkdirSync('outputs',{recursive:true});
  const profile=fs.mkdtempSync('/tmp/sisters-r1-profile-');
  const options={executablePath:'/usr/bin/chromium',args:['--no-sandbox']};
  let context;
  try{
    context=await chromium.launchPersistentContext(profile,options);
    let page=await context.newPage();
    await page.goto(base);
    await page.evaluate(()=>{
      localStorage.setItem('sistersPuzzleCurrentPlayerV1','sister');
      localStorage.setItem('sistersCoachSeenV1:memory','1');
      localStorage.setItem('sistersMuted','1');
    });
    await page.goto(base+'/games/memory/');
    await page.waitForFunction(()=>SistersRound.canInteract());
    await page.locator('.card').first().click();
    const round=await page.evaluate(()=>SistersRound.current());
    await context.close();
    context=await chromium.launchPersistentContext(profile,options);
    // Restored browser tabs may own the lease; inspect using one operation tab.
    for(const old of context.pages())await old.close();
    page=await context.newPage();
    await page.goto(base+'/games/memory/');
    await page.waitForFunction(()=>SistersRound.canInteract());
    assert.deepEqual(await page.evaluate(()=>SistersRound.current()),round);
    fs.writeFileSync('outputs/browser-relaunch.json',JSON.stringify({pass:true,roundId:round.id,openCards:round.payload.open,processRelaunched:true},null,2));
    console.log('PASS: Chromium process relaunch restores identical memory round');
  }finally{
    if(context)await context.close();
    fs.rmSync(profile,{recursive:true,force:true});
  }
})().catch(error=>{console.error(error);process.exitCode=1;});
