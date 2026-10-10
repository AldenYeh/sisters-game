const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('fs');
const base=process.env.BASE_URL||'http://127.0.0.1:8003',games=['maze','sudoku','memory','sokoban','pattern','visual','spot','stroke','hanoi','puzzle','sliding','tangram'];
const views=[{width:1366,height:768},{width:1920,height:1080},{width:1024,height:700},{width:911,height:512,zoomEquivalent:'150% of 1366x768'},{width:683,height:384,zoomEquivalent:'200% of 1366x768'}];
(async()=>{fs.mkdirSync('outputs/modes',{recursive:true});const b=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});const selected=process.env.FOCUS_GAMES?.split(",")||games;const rows=process.env.FOCUS_GAMES?JSON.parse(fs.readFileSync("outputs/pc-mode-review.json")).filter(r=>!selected.includes(r.game)):[];
for(const game of selected){
 const c=await b.newContext({viewport:views[0]});await c.addInitScript(gs=>{if(location.origin==='null')return;localStorage.setItem('sistersPuzzleCurrentPlayerV1','guest');localStorage.setItem('sistersMuted','1');for(const g of gs)localStorage.setItem('sistersCoachSeenV1:'+g,'1')},games);
 const p=await c.newPage();p.setDefaultTimeout(4000);let errors=[];p.on('pageerror',e=>errors.push(e.message));await p.goto(base+'/games/'+game+'/');
 let modes=[];
 if(game==='maze')for(const memory of [false,true])for(const difficulty of ['easy','normal','hard','super'])modes.push({memory,difficulty});
 else if(game==='sudoku')for(const size of [4,6])for(const mode of ['number','picture'])for(const difficulty of ['practice','easy','challenge'])modes.push({size,mode,difficulty});
 else if(game==='memory')for(const size of [[4,3],[4,4],[6,4],[6,6]])for(const theme of ['animal','fruit','car','food','shape'])modes.push({size,theme});
 else if(game==='puzzle')for(const art of ['garden','room','sea'])for(const pieces of [12,24,36])modes.push({art,pieces});
 else if(game==='hanoi')modes=[3,4,5,6,7].map(n=>({n}));
 else {const count={sokoban:30,sliding:36,tangram:20,visual:5,stroke:30,spot:10,pattern:1}[game];modes=Array.from({length:count},(_,index)=>({index}));}
 async function active(){await p.waitForFunction(()=>SistersRound.canInteract());}
 for(let mi=0;mi<modes.length;mi++){
 const mode=modes[mi],entry={game,mode,views:[],errors};
 try{
 await p.setViewportSize(views[0]);
 if(game==='maze'){
  if(await p.locator('#round-abandon').isVisible())await p.locator('#round-abandon').click();
  await p.goto(base+'/games/maze/'+(mode.memory?'#memory':''));await p.locator('[data-difficulty="'+mode.difficulty+'"]').click();await p.locator('#start-game').click();
 }else if(game==='sudoku'){
  if(await p.locator('#back-setup').isVisible())await p.locator('#back-setup').click();
  for(const [setting,value]of Object.entries(mode))await p.locator('[data-setting="'+setting+'"][data-value="'+value+'"]').click();await p.locator('#start').click();
 }else{
  await active();
  if(game==='puzzle'){await p.locator('#art-row button').nth(['garden','room','sea'].indexOf(mode.art)).click();await active();await p.locator('#size-row button').nth([12,24,36].indexOf(mode.pieces)).click();}
  else if(game==='memory'){await p.locator('#size-row button').nth([[4,3],[4,4],[6,4],[6,6]].findIndex(s=>String(s)===String(mode.size))).click();await active();await p.locator('#theme-row button').nth(['animal','fruit','car','food','shape'].indexOf(mode.theme)).click();}
  else if(game==='hanoi')await p.locator('#disc-row button').nth(mode.n-3).click();
  else if(game!=='pattern')await p.locator(game==='spot'?'#diff-row button':'#level-row button').nth(mode.index).click();
 }
 await active();const payload=await p.evaluate(()=>SistersRound.current().payload);
 if(game==='maze'){assert.equal(payload.difficultyId,mode.difficulty);assert.equal(payload.memoryMode,mode.memory);}
 if(game==='sudoku')for(const [key,value]of Object.entries(mode))assert.equal(payload[key],value);
 if(game==='puzzle'){assert.equal(payload.art.id,mode.art);assert.equal(payload.pieces,mode.pieces);assert.equal(await p.locator('#board>div').evaluateAll(es=>es.every(e=>getComputedStyle(e).backgroundImage==='none')),true);}
 if(game==='memory'){assert.equal(payload.theme,mode.theme);assert.deepEqual(payload.size,mode.size);}
 if(game==='hanoi')assert.equal(payload.n,mode.n);
 if(game==='spot')assert.equal(payload.scene,mode.index);
 if(game==="sokoban")assert.equal(await p.locator(".cell.goal").count(),payload.rows.flat().filter(c=>".*+".includes(c)).length);
 if(['sliding','sokoban','stroke'].includes(game))assert.equal(payload.index,mode.index);
 if(['visual','tangram'].includes(game))assert.equal(payload.idx,mode.index);
 for(const vp of views){
 await p.setViewportSize(vp);await p.evaluate(()=>window.scrollTo(0,0));await p.waitForTimeout(15);
 const metrics=await p.evaluate(()=>{const visible=e=>e&&e.getBoundingClientRect().height>0,rect=e=>e.getBoundingClientRect().toJSON(),board=document.querySelector('#board,#maze,#grid,#pegs,#seq'),back=document.querySelector('#back-home,#home-from-game,#back-setup'),bar=document.querySelector('.round-bar'),cell=document.querySelector('.sudoku-cell');return{width:innerWidth,scrollWidth:document.documentElement.scrollWidth,scrollHeight:document.documentElement.scrollHeight,overflow:getComputedStyle(document.body).overflowY,back:visible(back)&&rect(back),bar:rect(bar),board:visible(board)&&rect(board),cell:visible(cell)&&{...rect(cell),font:getComputedStyle(cell).fontSize},backHit:visible(back)&&document.elementFromPoint(back.getBoundingClientRect().x+back.clientWidth/2,back.getBoundingClientRect().y+back.clientHeight/2)?.closest('button')?.id}});
 assert(metrics.scrollWidth<=vp.width+1,'horizontal overflow '+metrics.scrollWidth+' at '+vp.width);
 assert.equal(metrics.backHit,{maze:'home-from-game',sudoku:'back-setup'}[game]||'back-home','back button obscured');
 assert(metrics.back.y>=metrics.bar.bottom-1,'save row overlaps back');
 assert(metrics.overflow!=='hidden','vertical scrolling disabled');
 if(game==='sudoku'){assert(metrics.cell.width>=40,'sudoku cell too small');assert(parseFloat(metrics.cell.font)<metrics.cell.height-3,'sudoku font clipped');}
 entry.views.push({viewport:vp,...metrics});
 if(mi===modes.length-1||(['puzzle','maze','sudoku','sliding','spot'].includes(game)&&mi===0))await p.screenshot({path:'outputs/after/'+game+'-'+vp.width+(vp.zoomEquivalent?'-zoom':'')+(mi===0?'-first':'')+'.png',fullPage:true});
 }
 await p.setViewportSize(views[0]);
 if(game==='maze'){const dir=await p.evaluate(()=>{const s=MazeGame.getState();return [['right',0,1],['down',1,0],['up',-1,0],['left',0,-1]].find(([d,dr,dc])=>s.maze[s.playerPosition.row+dr]?.[s.playerPosition.col+dc]===0)[0]});await p.keyboard.press('Arrow'+dir[0].toUpperCase()+dir.slice(1));await p.waitForTimeout(20);}
 if(game==='sudoku'){const a=await p.evaluate(()=>{const s=SudokuGame.getState();for(let r=0;r<s.size;r++)for(let c=0;c<s.size;c++)if(!s.puzzle[r][c])return {r,c,v:s.solution[r][c]}});await p.locator('[data-row="'+a.r+'"][data-col="'+a.c+'"]').click();await p.locator('#answers button').nth(a.v-1).click();}
 if(game==='puzzle'){const i=Number(await p.locator('.piece').first().getAttribute('data-piece'));await p.locator('.piece').first().click();await p.locator('#board>div').nth(i).click();}
 if(game==='memory')await p.locator('.card').first().click();
 if(game==='pattern')await p.locator('#choices button').first().click();
 if(game==='spot')await p.locator('.hit').first().click();
 if(game==='hanoi'){await p.locator('.peg').nth(0).click();await p.locator('.peg').nth(2).click();}
 if(game==='stroke')await p.locator('[data-n="0"]').click();
 if(game==='tangram'){await p.locator('[data-id="L1"]').focus();await p.keyboard.press('ArrowRight');}
 if(game==='visual'){await p.waitForFunction(()=>SistersRound.current()?.payload.phase==='play');const n=await p.evaluate(()=>SistersRound.current().payload.targets[0]);await p.locator('#grid button').nth(n).click();}
 if(game==='sokoban'){const key=await p.evaluate(()=>{const rows=SistersRound.current().payload.rows;let x,y;rows.forEach((r,iy)=>r.forEach((c,ix)=>{if('@+'.includes(c)){x=ix;y=iy}}));for(const [key,dx,dy]of [['ArrowDown',0,1],['ArrowUp',0,-1],['ArrowLeft',-1,0],['ArrowRight',1,0]])if(' .'.includes(rows[y+dy]?.[x+dx]))return key});if(key)await p.keyboard.press(key);}
 await p.evaluate(()=>window.scrollTo(0,0));await p.screenshot({path:'outputs/modes/'+game+'-'+String(mi+1).padStart(2,'0')+'.png',fullPage:true});
 // Every setting must survive a genuine refresh without bouncing back to an earlier mode.
 const saved=await p.evaluate(()=>SistersRound.current());await p.reload();await active();const restored=await p.evaluate(()=>SistersRound.current());assert.equal(restored.id,saved.id);if(game==="maze"){assert(restored.payload.elapsedMs>=saved.payload.elapsedMs,"maze time went backward");const a={...saved.payload},z={...restored.payload};delete a.elapsedMs;delete z.elapsedMs;assert.deepEqual(z,a);}else assert.deepEqual(restored.payload,saved.payload);
 entry.refresh=true;
 // Exercise the complete navigation/round controls for every mode on PC.
 if(game==='sudoku'){await p.locator('#back-setup').click();await p.locator('#back-list').click();}
 else await p.locator(game==='maze'?'#home-from-game':'#back-home').click();
 await p.waitForURL('**/index.html#games/logic');await p.locator('#round-resume').click();await active();assert.equal(await p.evaluate(()=>SistersRound.current().id),saved.id);entry.returnResume=true;
 const beforeRestart=await p.evaluate(()=>SistersRound.current().id);await p.locator(game==='spot'?'#retry-scene':'#restart').click();await p.waitForFunction(id=>SistersRound.current()?.id!==id&&SistersRound.canInteract(),beforeRestart);entry.restart=true;
 const lastId=await p.evaluate(()=>SistersRound.current().id);await p.locator('#round-abandon').click();await p.waitForURL('**/index.html#games/logic');const end=await p.evaluate(()=>JSON.parse(localStorage.getItem(SistersRound.KEY)));assert.equal(end.round.id,lastId);assert.equal(end.round.status,'abandoned');assert.equal(end.events.filter(e=>e.type==='GameAbandoned'&&e.roundId===lastId).length,1);entry.abandon=true;
 await p.goto(base+'/games/'+game+'/');
 assert.deepEqual(errors,[]);entry.pass=true;
 }catch(e){entry.failure=e.message;entry.pass=false;await p.screenshot({path:'outputs/after/fail-'+game+'-'+mi+'.png',fullPage:true}).catch(()=>{});}
 rows.push(entry);fs.writeFileSync('outputs/pc-mode-review.json',JSON.stringify(rows,null,2));
 }
 console.log(game,modes.length,'modes',rows.filter(r=>r.game===game&&!r.pass).map(r=>r.failure));await c.close();
}
await b.close();console.log('PC review',rows.filter(r=>r.pass).length+'/'+rows.length);if(rows.some(r=>!r.pass))process.exitCode=1;})();
