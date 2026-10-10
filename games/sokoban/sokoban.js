(async () => {
  "use strict";
  const levels = window.SokobanLevels;
  let index = 0, rows = [], moves = 0, history = [], restarts = 0, startedAt = Date.now(), completed=false;
  async function load(i,reason="new") { return SistersRound.start(()=>{
    if(reason==="restart")restarts++;completed=false;
    index = i; rows = levels[i].rows.map(r => r.split("")); moves = 0; history = []; startedAt = Date.now();
    document.getElementById("complete").hidden = true; chips(); render();
  },reason); }
  function find(ch) {
    for (let y=0;y<rows.length;y++) for (let x=0;x<rows[y].length;x++) if (rows[y][x]===ch || (ch==="@" && rows[y][x]==="+")) return [x,y];
    return null;
  }
  function won() { return !rows.some(r => r.includes("$")); }
  function render() {
    const board = document.getElementById("board");
    board.style.gridTemplateColumns = `repeat(${rows[0].length},minmax(0,1fr))`;
    board.replaceChildren();
    rows.forEach(row => row.forEach(ch => {
      const d = document.createElement("div");
      d.className = "cell" + (ch==="#"?" wall":"") + (".*+".includes(ch)?" goal":"") + (ch==="$"||ch==="*"?" box":"") + (ch==="*"?" done":"");
      d.textContent = { "#":"", "@":"🐱", "+":"🐱", "$":"📦", "*":"📦", ".":"🐟", " ":"" }[ch] || "";
      board.append(d);
    }));
    const L = levels[index];
    document.getElementById("status").textContent = `把箱子推到小魚上 · ${L.name} · ${moves} 步`;
  }
  function move(dx, dy) {
    if(!SistersRound.canInteract()||completed) return;
    let px, py; 
    for (let y=0;y<rows.length;y++) for (let x=0;x<rows[y].length;x++) if (rows[y][x]==="@" || rows[y][x]==="+") { px=x; py=y; }
    const nx=px+dx, ny=py+dy, t=rows[ny]?.[nx];
    if (t===undefined||t==="#") return;
    history.push(rows.map(r=>r.join("")));
    const leave = rows[py][px]==="+" ? "." : " ";
    if (t==="$" || t==="*") {
      const bx=nx+dx, by=ny+dy, b=rows[by]?.[bx];
      if (b===undefined || b==="#" || b==="$" || b==="*") { history.pop(); return; }
      rows[by][bx] = b==="." ? "*" : "$";
      rows[ny][nx] = t==="*" ? "+" : "@";
    } else rows[ny][nx] = t==="." ? "+" : "@";
    rows[py][px] = leave; moves++; SistersPlay.playSound('ok'); render();
    if (won()) {
      completed=true;
      SistersPlay.showComplete(`你用了 ${moves} 步，最少 ${levels[index].minimumMoves} 步`);
      SistersPlay.recordResult({game:"sokoban", difficulty:levels[index].tier, level:levels[index].name, startedAt, moves, restartCount:restarts});
    }
    SistersRound.checkpoint();
  }
  function chips() {
    const row=document.getElementById("level-row"); row.replaceChildren();
    levels.forEach((L,i)=>{ const b=document.createElement("button"); b.type="button"; b.className="chip"+(i===index?" selected":""); b.textContent=String(i+1); b.onclick=()=>{load(i); chips();}; row.append(b); });
  }
  document.querySelectorAll(".pad button").forEach(b=>b.onclick=()=>{ const [dx,dy]=b.dataset.d.split(",").map(Number); move(dx,dy); });
  window.addEventListener("keydown", ev=>{ const map={ArrowUp:[0,-1],ArrowDown:[0,1],ArrowLeft:[-1,0],ArrowRight:[1,0],w:[0,-1],W:[0,-1],a:[-1,0],A:[-1,0],s:[0,1],S:[0,1],d:[1,0],D:[1,0]}; if(map[ev.key]){ev.preventDefault(); move(...map[ev.key]);} if(ev.key==='z'||ev.key==='Z') document.getElementById('undo').click(); if(ev.key==='r'||ev.key==='R') document.getElementById('restart').click(); });
  let sx,sy,pointerId; document.getElementById("board").addEventListener("pointerdown", e=>{if(pointerId!==undefined)return;pointerId=e.pointerId;sx=e.clientX; sy=e.clientY;});
  document.getElementById("board").addEventListener("pointerup", e=>{ if(sx===undefined||e.pointerId!==pointerId)return;pointerId=undefined; const dx=e.clientX-sx, dy=e.clientY-sy;sx=sy=undefined; if(Math.hypot(dx,dy)<24) return; if(Math.abs(dx)>Math.abs(dy)) move(dx>0?1:-1,0); else move(0,dy>0?1:-1); });
  document.getElementById("board").addEventListener("pointercancel",()=>{sx=sy=pointerId=undefined;});
  document.getElementById("undo").onclick=()=>{ if(!SistersRound.canInteract()||completed||!history.length) return; rows=history.pop().map(r=>r.split("")); moves=Math.max(0,moves-1); render(); SistersRound.checkpoint(); };
  document.getElementById("overlay-next").onclick=()=>{ load((index+1)%levels.length); chips(); };
  SistersPlay.showCoach("sokoban", [{demo:"🐱📦🐟", line:"把箱子推到小魚上"}]);
  SistersPlay.mount({title:"推箱子", onRestart:()=>load(index,"restart")});
  chips(); if(!await SistersRound.attach({snapshot:()=>({index,rows,moves,history,restarts,startedAt,completed}),cancel:()=>{sx=sy=pointerId=undefined;},restore:p=>{if(!levels[p.index]||!Array.isArray(p.rows))throw Error("推箱子存檔格式錯誤");({index,rows,moves,history,restarts,startedAt,completed}=p);chips();render();}})) await load(0);
})();
