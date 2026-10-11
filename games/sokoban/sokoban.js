(async () => {
  "use strict";
  const levels = window.SokobanLevels;
  let question=null,tier="1";const level=()=>question||levels[index];
  let index = 0, rows = [], moves = 0, history = [], restarts = 0, startedAt = Date.now(), completed=false;
  let routeVersion=0;
  function cancelRoute(){routeVersion++;}
  const feedback=text=>{document.getElementById("status").textContent=text;};
  async function load(i=index,reason="new",nextTier=tier) { return SistersRound.start(async()=>{
    const old=level();tier=nextTier;question=reason==="restart"?structuredClone(old):await SistersChallenges.draw("sokoban:"+tier,SistersBanks.sokoban[tier]);
    if(reason==="restart")restarts++;completed=false;
    index = i; rows = level().rows.map(r => r.split("")); moves = 0; history = []; startedAt = Date.now();
    document.getElementById("complete").hidden = true; chips(); render();
  },reason); }
  function find(ch) {
    for (let y=0;y<rows.length;y++) for (let x=0;x<rows[y].length;x++) if (rows[y][x]===ch || (ch==="@" && rows[y][x]==="+")) return [x,y];
    return null;
  }
  function won() { return !rows.some(r => r.includes("$")); }
  function render() {
    const board = document.getElementById("board");
    board.style.setProperty("--sokoban-cols",rows[0].length);
    board.style.gridTemplateColumns = `repeat(${rows[0].length},minmax(0,1fr))`;
    board.replaceChildren();
    rows.forEach((row,y) => row.forEach((ch,x) => {
      const d = document.createElement("div");
      d.className = "cell" + (ch==="#"?" wall":"") + (".*+".includes(ch)?" goal":"") + (ch==="$"||ch==="*"?" box":"") + (ch==="*"?" done":"");
      d.textContent = { "#":"", "@":"🐱", "+":"🐱", "$":"📦", "*":"📦", ".":"🐟", " ":"" }[ch] || "";
      d.dataset.x=x;d.dataset.y=y;d.setAttribute("role","gridcell");
      board.append(d);
    }));
    const L = level();
    document.getElementById("status").textContent = `把箱子推到小魚上 · ${L.name} · ${moves} 步 · 點空格走過去；點身旁箱子推一下 · 方向鍵／WASD，或在棋盤滑動`;
    fitBoard();
  }
  async function move(dx, dy) {
    if(!SistersRound.canInteract()||completed) return false;
    let px, py; 
    for (let y=0;y<rows.length;y++) for (let x=0;x<rows[y].length;x++) if (rows[y][x]==="@" || rows[y][x]==="+") { px=x; py=y; }
    const nx=px+dx, ny=py+dy, t=rows[ny]?.[nx];
    if (t===undefined||t==="#") {feedback("前面是牆，走不過去。");return false;}
    history.push(rows.map(r=>r.join("")));
    const leave = rows[py][px]==="+" ? "." : " ";
    if (t==="$" || t==="*") {
      const bx=nx+dx, by=ny+dy, b=rows[by]?.[bx];
      if (b===undefined || b==="#" || b==="$" || b==="*") { history.pop(); feedback("箱子後方被擋住，不能推。");return false; }
      rows[by][bx] = b==="." ? "*" : "$";
      rows[ny][nx] = t==="*" ? "+" : "@";
    } else rows[ny][nx] = t==="." ? "+" : "@";
    rows[py][px] = leave; moves++; SistersPlay.playSound('ok'); render();
    if (won()) {
      completed=true;
      SistersPlay.showComplete(`你用了 ${moves} 步，最少 ${level().minimumMoves} 步`);
      SistersPlay.recordResult({game:"sokoban", difficulty:level().tier, level:level().name, startedAt, moves, restartCount:restarts});
    }
    if(!completed)await SistersRound.checkpoint();
    return true;
  }
  function walkingPath(target){
    const start=find("@"),key=([x,y])=>x+","+y,queue=[start],previous=new Map([[key(start),null]]);
    for(let i=0;i<queue.length;i++){
      const point=queue[i];if(key(point)===key(target))break;
      for(const[dx,dy]of [[0,-1],[1,0],[0,1],[-1,0]]){
        const next=[point[0]+dx,point[1]+dy],tile=rows[next[1]]?.[next[0]];
        if(tile!==undefined&&!"#$*".includes(tile)&&!previous.has(key(next))){previous.set(key(next),point);queue.push(next);}
      }
    }
    if(!previous.has(key(target)))return null;
    const path=[];for(let point=target;point;point=previous.get(key(point)))path.push(point);return path.reverse();
  }
  async function tapCell(event){
    cancelRoute();if(!SistersRound.canInteract()||completed)return;
    const cell=[...swipeBoard.children].find(cell=>{const r=cell.getBoundingClientRect();return event.clientX>=r.left&&event.clientX<r.right&&event.clientY>=r.top&&event.clientY<r.bottom;});
    if(!cell)return;
    const target=[+cell.dataset.x,+cell.dataset.y],tile=rows[target[1]]?.[target[0]],player=find("@");
    if(tile==="#"){feedback("這格是牆，走不過去。");return;}
    if(tile==="$"||tile==="*"){
      const dx=target[0]-player[0],dy=target[1]-player[1];
      if(Math.abs(dx)+Math.abs(dy)!==1){feedback("先走到箱子旁，再點箱子推一下。");return;}
      await move(dx,dy);return;
    }
    const path=walkingPath(target);
    if(!path){feedback("這格走不到：牆或箱子擋住了路。");return;}
    const version=routeVersion;
    for(const next of path.slice(1)){
      if(version!==routeVersion||!SistersRound.canInteract()||completed)return;
      const current=find("@"),dx=next[0]-current[0],dy=next[1]-current[1];
      // Recheck every step: an automatic walking route never pushes a box.
      if("#$*".includes(rows[next[1]]?.[next[0]]||"#")||!await move(dx,dy))return;
      await new Promise(resolve=>setTimeout(resolve,70));
    }
  }
  // Presentation only: grow within the viewport after reserving the real controls.
  function fitBoard(){
    if(!rows.length)return;
    const board=document.getElementById("board"),wrap=board.parentElement,app=document.querySelector(".play-app"),controls=document.getElementById("undo").parentElement,ws=getComputedStyle(wrap),as=getComputedStyle(app),gap=parseFloat(getComputedStyle(board).gap)||0;
    const top=board.getBoundingClientRect().top+scrollY,tail=controls.getBoundingClientRect().height+parseFloat(getComputedStyle(controls).marginTop)+parseFloat(getComputedStyle(controls).marginBottom)+parseFloat(ws.paddingBottom)+parseFloat(ws.borderBottomWidth)+parseFloat(as.paddingBottom);
    const width=app.clientWidth-parseFloat(as.paddingLeft)-parseFloat(as.paddingRight)-parseFloat(ws.paddingLeft)-parseFloat(ws.paddingRight)-parseFloat(ws.borderLeftWidth)-parseFloat(ws.borderRightWidth),ratio=rows.length/rows[0].length,height=Math.max(220,innerHeight-top-tail-3);
    const side=Math.floor(Math.min(width,(height-gap*(ratio-1))/ratio));
    app.style.setProperty("--sokoban-board-size",side+"px");
  }
  const boardSizer=new ResizeObserver(fitBoard);for(const el of [document.querySelector(".play-top"),document.getElementById("level-row"),document.getElementById("status"),document.getElementById("undo").parentElement,document.querySelector(".family-bar"),document.querySelector(".round-bar")])boardSizer.observe(el);window.addEventListener("resize",fitBoard);
  function chips(){SistersChallenges.selector(document.getElementById('level-row'),[1,2,3].map(v=>({value:v,label:v+' 箱'})),tier,v=>load(index,'new',v),'箱子數');}
  window.addEventListener("keydown", ev=>{if(ev.target.closest?.('input,textarea,select,[contenteditable]')||!SistersRound.canInteract())return;const map={ArrowUp:[0,-1],ArrowDown:[0,1],ArrowLeft:[-1,0],ArrowRight:[1,0],w:[0,-1],W:[0,-1],a:[-1,0],A:[-1,0],s:[0,1],S:[0,1],d:[1,0],D:[1,0]}; if(map[ev.key]){ev.preventDefault(); cancelRoute();move(...map[ev.key]);} if(ev.key==='z'||ev.key==='Z') document.getElementById('undo').click(); if(ev.key==='r'||ev.key==='R') document.getElementById('restart').click(); });
  let sx,sy,pointerId;const swipeBoard=document.getElementById("board");
  function cancelSwipe(){if(pointerId!==undefined&&swipeBoard.hasPointerCapture(pointerId))swipeBoard.releasePointerCapture(pointerId);sx=sy=pointerId=undefined;}
  swipeBoard.addEventListener("pointerdown",e=>{if(!SistersRound.canInteract()||pointerId!==undefined)return;pointerId=e.pointerId;sx=e.clientX;sy=e.clientY;swipeBoard.setPointerCapture(e.pointerId);e.preventDefault();});
  swipeBoard.addEventListener("pointerup",e=>{if(sx===undefined||e.pointerId!==pointerId)return;const dx=e.clientX-sx,dy=e.clientY-sy;cancelSwipe();if(Math.hypot(dx,dy)<10){tapCell(e);return;}if(Math.hypot(dx,dy)<28)return;cancelRoute();if(Math.abs(dx)>Math.abs(dy))move(dx>0?1:-1,0);else move(0,dy>0?1:-1);});
  swipeBoard.addEventListener("pointercancel",e=>{if(e.pointerId===pointerId)cancelSwipe();});
  document.getElementById("undo").onclick=()=>{ cancelRoute();if(!SistersRound.canInteract()||completed||!history.length) return; rows=history.pop().map(r=>r.split("")); moves=Math.max(0,moves-1); render(); SistersRound.checkpoint(); };
  document.getElementById("overlay-next").onclick=()=>{ load((index+1)%levels.length); chips(); };
  SistersPlay.showCoach("sokoban", [{demo:"🐱📦🐟", line:"點空格走過去；點身旁箱子推一下，把箱子推到小魚上"}]);
  SistersPlay.mount({title:"推箱子", onRestart:()=>load(index,"restart")});
  chips(); if(!await SistersRound.attach({snapshot:()=>({question,tier,index,rows,moves,history,restarts,startedAt,completed}),cancel:()=>{cancelRoute();cancelSwipe();},restore:p=>{if(!(p.question||levels[p.index])||!Array.isArray(p.rows))throw Error("推箱子存檔格式錯誤");question=p.question||null;tier=p.tier||"1";({index,rows,moves,history,restarts,startedAt,completed}=p);chips();render();}})) await load(0);
})();
