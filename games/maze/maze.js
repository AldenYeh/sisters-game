(() => {
  "use strict";

  const content = window.SISTERS_CONTENT;
  const ui = window.SistersShared;
  const m = content.maze;
  const STORAGE_KEY = "mazeAdventureRecordsV1";
  const DIFFICULTIES = Object.freeze({
    easy: { text: m.easy, hint: m.easyHint, size: 3, candidates: 8, percentile: .20 },
    normal: { text: m.normal, hint: m.normalHint, size: 5, candidates: 10, percentile: .50 },
    hard: { text: m.hard, hint: m.hardHint, size: 7, candidates: 12, percentile: .78 },
    super: { text: m.super, hint: m.superHint, size: 9, candidates: 14, percentile: .90 }
  });
  const DIRECTIONS = Object.freeze({ up: [-1, 0], down: [1, 0], left: [0, -1], right: [0, 1] });
  const KEY_DIRECTIONS = Object.freeze({ ArrowUp: "up", ArrowDown: "down", ArrowLeft: "left", ArrowRight: "right" });
  const byId = id => document.getElementById(id);
  const cellKey = (row, col) => `${row},${col}`;

  const elements = {
    screens: { setup: byId("setup-screen"), game: byId("game-screen"), records: byId("records-screen") },
    maze: byId("maze"), status: byId("status"), currentPlayer: byId("current-player"),
    currentDifficulty: byId("current-difficulty"), timer: byId("timer"), togglePath: byId("toggle-path"),
    winPanel: byId("win-panel"), winDetails: byId("win-details"), newRecord: byId("new-record"), recordsBody: byId("records-body")
  };

  const gameState = {
    page: "setup", playerId: ui.loadPlayer(), difficultyId: "easy", maze: [], mazeSnapshot: [],
    start: null, goal: null, playerPosition: null, visited: new Set(), showPath: true,
    completed: false, moveLocked: false, timerStartedAt: null, elapsedMs: 0, timerId: null,
    records: loadRecords(), lastPathLength: 0, swipe: { pointerId: null, startX: 0, startY: 0 }
  };

  function phrase(element, text, options = {}) { ui.setReading(element, text, options); }
  function setStatus(text) { phrase(elements.status, text, { compact: true }); }
  function setLabeledValue(element, label, value) {
    element.replaceChildren(ui.makeReading(label, { compact: true }), document.createTextNode("："), ui.makeReading(value, { compact: true }));
  }

  function configureText() {
    document.title = `${m.title.zh}｜${content.site.title.zh}`;
    phrase(byId("setup-kicker"), content.site.title, { compact: true }); phrase(byId("setup-title"), m.title, { icon: "🐱" });
    phrase(byId("difficulty-title"), m.chooseDifficulty);
    phrase(byId("game-kicker"), content.site.title, { compact: true }); phrase(byId("game-title"), m.title);
    phrase(byId("records-kicker"), m.title, { compact: true }); phrase(byId("records-title"), content.common.records);
    phrase(byId("start-game"), m.start); phrase(byId("show-records"), content.common.records); phrase(byId("setup-home"), content.common.backToGames, { icon: "←" });
    phrase(byId("home-from-game"), content.common.backToGames, { icon: "←", compact: true }); phrase(byId("restart"), m.restart, { compact: true });
    phrase(byId("win-title"), m.completed); phrase(byId("new-record"), m.newBest); phrase(byId("play-again"), m.playAgain); phrase(byId("home-from-win"), content.common.backToGames, { icon: "←" });
    phrase(byId("records-back"), content.common.back); phrase(byId("clear-records"), m.clearAll, { compact: true });
    phrase(byId("clear-confirm-title"), m.clearConfirm); phrase(byId("cancel-clear"), content.common.cancel); phrase(byId("confirm-clear"), m.confirmClear);
    const difficultyIds = ["easy", "normal", "hard", "super"];
    document.querySelectorAll(".difficulty-choice").forEach((button, index) => {
      button.replaceChildren(ui.makeReading(DIFFICULTIES[difficultyIds[index]].text), ui.makeReading(DIFFICULTIES[difficultyIds[index]].hint, { compact: true }));
    });
    const touch = { up: ["▲", m.up], down: ["▼", m.down], left: ["◀", m.left], right: ["▶", m.right] };
    document.querySelectorAll(".touch-direction").forEach(button => {
      const [arrow, text] = touch[button.dataset.move];
      const icon = document.createElement("span"); icon.setAttribute("aria-hidden", "true"); icon.textContent = arrow;
      button.replaceChildren(icon, ui.makeReading(text, { compact: true })); button.setAttribute("aria-label", text.zh);
    });
    elements.maze.setAttribute("aria-label", m.title.zh);
    byId("touch-controls").setAttribute("aria-label", m.title.zh);
    renderRecordHead(); updateSetup(); setStatus(m.ready);
  }

  function createEmptyRecords() {
    const records = { version: 1, players: {} };
    Object.keys(content.players).forEach(playerId => {
      records.players[playerId] = {};
      Object.keys(DIFFICULTIES).forEach(difficultyId => { records.players[playerId][difficultyId] = { completions: 0, bestMs: null }; });
    });
    return records;
  }

  function normalizeRecords(value) {
    const safe = createEmptyRecords();
    if (!value || typeof value !== "object" || !value.players || typeof value.players !== "object") return safe;
    Object.keys(content.players).forEach(playerId => Object.keys(DIFFICULTIES).forEach(difficultyId => {
      const item = value.players?.[playerId]?.[difficultyId];
      if (!item || typeof item !== "object") return;
      const completions = Number(item.completions), bestMs = item.bestMs === null ? null : Number(item.bestMs);
      safe.players[playerId][difficultyId] = {
        completions: Number.isInteger(completions) && completions >= 0 ? completions : 0,
        bestMs: Number.isFinite(bestMs) && bestMs >= 0 ? Math.round(bestMs) : null
      };
    }));
    return safe;
  }

  function loadRecords() { try { return normalizeRecords(JSON.parse(localStorage.getItem(STORAGE_KEY))); } catch (_) { return createEmptyRecords(); } }
  function saveRecords() { gameState.records = normalizeRecords(gameState.records); try { localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState.records)); return true; } catch (_) { return false; } }
  function updateRecords(elapsedMs) {
    const record = gameState.records.players[gameState.playerId][gameState.difficultyId];
    const isNewBest = record.bestMs === null || elapsedMs < record.bestMs;
    record.completions += 1; if (isNewBest) record.bestMs = elapsedMs; saveRecords();
    return { isNewBest, completions: record.completions };
  }

  function setPage(page) { gameState.page = page; Object.entries(elements.screens).forEach(([name, screen]) => { screen.hidden = name !== page; }); }
  function goHub() { stopTimer(); window.location.href = "../../index.html#games/logic"; }
  function showSetup() { stopTimer(); elements.winPanel.hidden = true; updateSetup(); setPage("setup"); }
  function updateSetup() {
    const player = content.players[gameState.playerId];
    if (player) setLabeledValue(byId("setup-player"), m.player, player.name);
    document.querySelectorAll(".difficulty-choice").forEach(button => {
      const selected = button.dataset.difficulty === gameState.difficultyId;
      button.classList.toggle("selected", selected); button.setAttribute("aria-pressed", String(selected));
    });
  }
  function selectDifficulty(id) { if (!DIFFICULTIES[id]) return; gameState.difficultyId = id; updateSetup(); }

  function makeGrid(logicalSize) {
    const side = logicalSize * 2 + 1, grid = Array.from({ length: side }, () => Array(side).fill(1));
    const seen = Array.from({ length: logicalSize }, () => Array(logicalSize).fill(false)), stack = [[0, 0]], steps = [[-1,0],[1,0],[0,-1],[0,1]];
    seen[0][0] = true; grid[1][1] = 0;
    while (stack.length) {
      const [row, col] = stack[stack.length - 1];
      const choices = steps.map(([dr,dc]) => [row+dr,col+dc,dr,dc]).filter(([nr,nc]) => nr>=0&&nr<logicalSize&&nc>=0&&nc<logicalSize&&!seen[nr][nc]);
      if (!choices.length) { stack.pop(); continue; }
      const [nr,nc,dr,dc] = choices[Math.floor(Math.random()*choices.length)];
      seen[nr][nc] = true; grid[row*2+1+dr][col*2+1+dc] = 0; grid[nr*2+1][nc*2+1] = 0; stack.push([nr,nc]);
    }
    return grid;
  }

  function bfs(grid, start) {
    const queue = [start], distances = new Map([[cellKey(start.row,start.col),0]]); let farthest = start;
    for (let index=0; index<queue.length; index+=1) {
      const current=queue[index], distance=distances.get(cellKey(current.row,current.col));
      if (distance>distances.get(cellKey(farthest.row,farthest.col))) farthest=current;
      Object.values(DIRECTIONS).forEach(([dr,dc])=>{const row=current.row+dr,col=current.col+dc,key=cellKey(row,col);if(grid[row]?.[col]===0&&!distances.has(key)){distances.set(key,distance+1);queue.push({row,col});}});
    }
    return { distances, farthest, distance: distances.get(cellKey(farthest.row,farthest.col)) };
  }

  function pathBetween(grid,start,goal){const queue=[start],previous=new Map([[cellKey(start.row,start.col),null]]);for(let i=0;i<queue.length;i+=1){const current=queue[i];if(current.row===goal.row&&current.col===goal.col)break;Object.values(DIRECTIONS).forEach(([dr,dc])=>{const row=current.row+dr,col=current.col+dc,key=cellKey(row,col);if(grid[row]?.[col]===0&&!previous.has(key)){previous.set(key,current);queue.push({row,col});}});}const result=[];for(let point=goal;point;point=previous.get(cellKey(point.row,point.col)))result.push(point);return result.reverse();}
  function mazeComplexity(grid,start,goal){const path=pathBetween(grid,start,goal),pathKeys=new Set(path.map(p=>cellKey(p.row,p.col)));let deadEnds=0,totalDepth=0,maxDepth=0,nearBranches=0,awaySteps=0;grid.forEach((line,row)=>line.forEach((tile,col)=>{if(tile!==0)return;const degree=Object.values(DIRECTIONS).filter(([dr,dc])=>grid[row+dr]?.[col+dc]===0).length;if(degree===1&&!pathKeys.has(cellKey(row,col))){deadEnds+=1;let depth=0,current={row,col},previous=null;while(current){const next=Object.values(DIRECTIONS).map(([dr,dc])=>({row:current.row+dr,col:current.col+dc})).filter(p=>grid[p.row]?.[p.col]===0&&(!previous||p.row!==previous.row||p.col!==previous.col));const onward=next.find(p=>!pathKeys.has(cellKey(p.row,p.col)));if(next.some(p=>pathKeys.has(cellKey(p.row,p.col)))){depth+=1;break;}if(!onward)break;previous=current;current=onward;depth+=1;}totalDepth+=depth;maxDepth=Math.max(maxDepth,depth);}}));path.forEach((point,index)=>{const branches=Object.values(DIRECTIONS).filter(([dr,dc])=>{const key=cellKey(point.row+dr,point.col+dc);return grid[point.row+dr]?.[point.col+dc]===0&&!pathKeys.has(key);}).length;nearBranches+=branches;if(index&&Math.abs(point.row-goal.row)+Math.abs(point.col-goal.col)>Math.abs(path[index-1].row-goal.row)+Math.abs(path[index-1].col-goal.col))awaySteps+=1;});const score=path.length*1.2+deadEnds*9+(deadEnds?totalDepth/deadEnds:0)*5+maxDepth*4+nearBranches*7+awaySteps*8;return {score,pathLength:path.length-1,deadEnds,maxDepth,nearBranches,awaySteps};}
  function generateAndValidateMaze(id) {const config=DIFFICULTIES[id],start={row:1,col:1},candidates=[];for(let attempt=0;attempt<config.candidates;attempt+=1){const grid=makeGrid(config.size),result=bfs(grid,start),goal={...result.farthest};if(!result.distances.has(cellKey(goal.row,goal.col)))continue;const complexity=mazeComplexity(grid,start,goal);candidates.push({grid,start,goal,pathLength:result.distance,complexity});}candidates.sort((a,b)=>a.complexity.score-b.complexity.score);return candidates[Math.min(candidates.length-1,Math.floor((candidates.length-1)*config.percentile))];}

  function startGame(options={}) {
    if (!content.players[gameState.playerId]) { goHub(); return false; }
    stopTimer(); const generated=generateAndValidateMaze(gameState.difficultyId);
    gameState.maze=generated.grid; gameState.mazeSnapshot=generated.grid.map(row=>[...row]); gameState.start={...generated.start}; gameState.goal={...generated.goal};
    gameState.playerPosition={...generated.start}; gameState.lastPathLength=generated.pathLength; gameState.visited=new Set([cellKey(generated.start.row,generated.start.col)]);
    gameState.completed=false; gameState.moveLocked=false; setTouchControlsDisabled(false); elements.winPanel.hidden=true;
    setLabeledValue(elements.currentPlayer,m.player,content.players[gameState.playerId].name); setLabeledValue(elements.currentDifficulty,m.difficulty,DIFFICULTIES[gameState.difficultyId].text);
    setStatus(options.replay?m.newMaze:m.ready); setPage("game"); renderMaze(); startTimer(); return true;
  }

  function restartGame(){if(!gameState.mazeSnapshot.length)return;stopTimer();gameState.maze=gameState.mazeSnapshot.map(row=>[...row]);gameState.playerPosition={...gameState.start};gameState.visited=new Set([cellKey(gameState.start.row,gameState.start.col)]);gameState.completed=false;gameState.moveLocked=false;setTouchControlsDisabled(false);elements.winPanel.hidden=true;setStatus(m.restartMessage);renderMaze();startTimer();}
  function isWalkable(row,col){return Number.isInteger(row)&&Number.isInteger(col)&&gameState.maze[row]?.[col]===0;}
  function makeToken(symbol,className,label){const token=document.createElement("span");token.className=`token ${className}`;token.textContent=symbol;token.setAttribute("role","img");token.setAttribute("aria-label",label.zh);return token;}

  function renderMaze(){
    const rows=gameState.maze.length,cols=gameState.maze[0]?.length||0;document.documentElement.style.setProperty("--maze-rows",rows);document.documentElement.style.setProperty("--maze-cols",cols);const fragment=document.createDocumentFragment();
    gameState.maze.forEach((line,row)=>line.forEach((tile,col)=>{const cell=document.createElement("div"),isGoal=row===gameState.goal.row&&col===gameState.goal.col,isPlayer=row===gameState.playerPosition.row&&col===gameState.playerPosition.col,wasVisited=gameState.showPath&&gameState.visited.has(cellKey(row,col))&&!isGoal&&!isPlayer;cell.className=`cell ${tile===1?"wall":"path"}${isGoal?" goal":""}${wasVisited?" visited":""}`;cell.setAttribute("role","gridcell");if(tile===1)cell.setAttribute("aria-label",m.wallCell.zh);if(isGoal)cell.append(makeToken("🐟","goal-token",m.carrotGoal));if(isPlayer)cell.append(makeToken("🐱","player",m.rabbitPlayer));fragment.append(cell);}));
    elements.maze.replaceChildren(fragment);elements.togglePath.setAttribute("aria-pressed",String(gameState.showPath));phrase(elements.togglePath,gameState.showPath?m.hidePath:m.showPath,{compact:true});
  }

  function movePlayer(direction){if(gameState.page!=="game"||gameState.completed||gameState.moveLocked||!DIRECTIONS[direction])return false;gameState.moveLocked=true;const[dr,dc]=DIRECTIONS[direction],row=gameState.playerPosition.row+dr,col=gameState.playerPosition.col+dc;if(isWalkable(row,col)){gameState.playerPosition={row,col};gameState.visited.add(cellKey(row,col));setStatus(m.keepGoing);renderMaze();if(row===gameState.goal.row&&col===gameState.goal.col)handleWin();}else setStatus(m.wall);requestAnimationFrame(()=>{gameState.moveLocked=false;});return true;}
  function togglePathDisplay(){gameState.showPath=!gameState.showPath;renderMaze();}
  function setTouchControlsDisabled(disabled){document.querySelectorAll(".touch-direction").forEach(button=>{button.disabled=disabled;});}
  function handleSwipeStart(event){if(gameState.page!=="game"||gameState.completed||event.target.closest("button"))return;gameState.swipe={pointerId:event.pointerId,startX:event.clientX,startY:event.clientY};if(event.currentTarget.setPointerCapture)event.currentTarget.setPointerCapture(event.pointerId);event.preventDefault();}
  function handleSwipeEnd(event){if(gameState.swipe.pointerId!==event.pointerId)return;const dx=event.clientX-gameState.swipe.startX,dy=event.clientY-gameState.swipe.startY;gameState.swipe.pointerId=null;if(Math.hypot(dx,dy)<28||gameState.completed)return;event.preventDefault();movePlayer(Math.abs(dx)>Math.abs(dy)?(dx>0?"right":"left"):(dy>0?"down":"up"));}
  function cancelSwipe(event){if(gameState.swipe.pointerId===event.pointerId)gameState.swipe.pointerId=null;}

  function startTimer(){stopTimer();gameState.elapsedMs=0;gameState.timerStartedAt=Date.now();updateTimer();gameState.timerId=window.setInterval(updateTimer,250);}
  function updateTimer(){if(gameState.timerStartedAt!==null)gameState.elapsedMs=Date.now()-gameState.timerStartedAt;elements.timer.textContent=formatTime(gameState.elapsedMs);elements.timer.dateTime=`PT${Math.floor(gameState.elapsedMs/1000)}S`;}
  function stopTimer(){if(gameState.timerStartedAt!==null)gameState.elapsedMs=Date.now()-gameState.timerStartedAt;gameState.timerStartedAt=null;if(gameState.timerId!==null)window.clearInterval(gameState.timerId);gameState.timerId=null;if(elements.timer)elements.timer.textContent=formatTime(gameState.elapsedMs);}
  function formatTime(ms){const total=Math.max(0,Math.floor(ms/1000));return `${String(Math.floor(total/60)).padStart(2,"0")}:${String(total%60).padStart(2,"0")}`;}

  function addDetail(label,value){const p=document.createElement("p");p.append(ui.makeReading(label,{compact:true}),document.createTextNode("："),value);elements.winDetails.append(p);}
  function handleWin(){if(gameState.completed)return;gameState.completed=true;setTouchControlsDisabled(true);stopTimer();const result=updateRecords(gameState.elapsedMs);setStatus(m.completed);elements.winDetails.replaceChildren();addDetail(m.player,ui.makeReading(content.players[gameState.playerId].name,{compact:true}));addDetail(m.difficulty,ui.makeReading(DIFFICULTIES[gameState.difficultyId].text,{compact:true}));addDetail(m.completionTime,document.createTextNode(formatTime(gameState.elapsedMs)));const count=document.createDocumentFragment();count.append(document.createTextNode(`${result.completions} `),ui.makeReading(m.times,{compact:true}));addDetail(m.totalCompletions,count);elements.newRecord.hidden=!result.isNewBest;elements.winPanel.hidden=false;byId("play-again").focus();}

  function renderRecordHead(){const head=byId("records-head");head.replaceChildren();[m.player,m.difficulty,m.completionCount,m.fastest].forEach(text=>{const th=document.createElement("th");th.append(ui.makeReading(text,{compact:true}));head.append(th);});}
  function showScoreboard(){stopTimer();gameState.records=loadRecords();elements.recordsBody.replaceChildren();Object.entries(content.players).forEach(([playerId,player])=>Object.entries(DIFFICULTIES).forEach(([difficultyId,config])=>{const record=gameState.records.players[playerId][difficultyId],row=document.createElement("tr");const values=[ui.makeReading(player.name,{compact:true}),ui.makeReading(config.text,{compact:true}),document.createTextNode(`${record.completions} ${m.times.zh}`),record.bestMs===null?ui.makeReading(m.noRecord,{compact:true}):document.createTextNode(formatTime(record.bestMs))];values.forEach(value=>{const td=document.createElement("td");td.append(value);row.append(td);});elements.recordsBody.append(row);}));byId("clear-confirm").hidden=true;setPage("records");}
  function requestClearRecords(){byId("clear-confirm").hidden=false;byId("cancel-clear").focus();}
  function cancelClearRecords(){byId("clear-confirm").hidden=true;byId("clear-records").focus();}
  function clearRecords(){gameState.records=createEmptyRecords();saveRecords();showScoreboard();return true;}

  document.querySelectorAll(".difficulty-choice").forEach(button=>button.addEventListener("click",()=>selectDifficulty(button.dataset.difficulty)));
  byId("start-game").addEventListener("click",()=>startGame());byId("show-records").addEventListener("click",showScoreboard);byId("setup-home").addEventListener("click",goHub);byId("home-from-game").addEventListener("click",goHub);byId("home-from-win").addEventListener("click",goHub);byId("records-back").addEventListener("click",showSetup);byId("restart").addEventListener("click",restartGame);byId("play-again").addEventListener("click",()=>startGame({replay:true}));elements.togglePath.addEventListener("click",togglePathDisplay);byId("clear-records").addEventListener("click",requestClearRecords);byId("cancel-clear").addEventListener("click",cancelClearRecords);byId("confirm-clear").addEventListener("click",clearRecords);
  document.querySelectorAll(".touch-direction").forEach(button=>button.addEventListener("click",event=>{event.preventDefault();movePlayer(button.dataset.move);}));
  byId("maze-wrap").addEventListener("pointerdown",handleSwipeStart,{passive:false});byId("maze-wrap").addEventListener("pointerup",handleSwipeEnd,{passive:false});byId("maze-wrap").addEventListener("pointercancel",cancelSwipe);
  document.addEventListener("keydown",event=>{const direction=KEY_DIRECTIONS[event.key];if(!direction)return;event.preventDefault();movePlayer(direction);},{passive:false});

  window.MazeGame=Object.freeze({startGame,restartGame,move:movePlayer,togglePath:togglePathDisplay,generateMaze:generateAndValidateMaze,mazeComplexity,bfs,showRecords:showScoreboard,loadRecords,getState:()=>({...gameState,maze:gameState.maze.map(row=>[...row]),visited:[...gameState.visited]}),constants:{DIFFICULTIES,STORAGE_KEY}});
  if(!gameState.playerId){goHub();return;} configureText(); showSetup();
})();
