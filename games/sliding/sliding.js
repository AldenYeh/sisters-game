(async () => {
  "use strict";
  const levels = window.SlidingLevels;
  const tierName = {tutorial:"教學",easy:"簡單",medium:"普通",hard:"困難",challenge:"挑戰",master:"大師"};
  let filter="all", index=0, pieces=[], moves=0, hints=0, restarts=0, startedAt=Date.now(), history=[],cancelDrag=null,dragSnapshot=null;
  const board=document.getElementById("board");
  const level=()=>levels[index];
  const clone=ps=>ps.map(p=>({...p}));
  async function load(i,reason="new"){return SistersRound.start(()=>{if(reason==="restart")restarts++;index=i; pieces=clone(level().pieces); moves=0; hints=0; startedAt=Date.now(); history=[]; document.getElementById("complete").hidden=true;chips(); render();},reason); }
  function occ(skip){ const m=new Set(); pieces.forEach((p,i)=>{ if(i===skip)return; for(let y=0;y<p.h;y++) for(let x=0;x<p.w;x++) m.add((p.r+y)+","+(p.c+x)); }); return m; }
  function can(i,dr,dc){ const L=level(), p=pieces[i], nr=p.r+dr, nc=p.c+dc; if(nr<0||nc<0||nr+p.h>L.rows||nc+p.w>L.cols) return false; const used=occ(i); for(let y=0;y<p.h;y++) for(let x=0;x<p.w;x++) if(used.has((nr+y)+","+(nc+x))) return false; return true; }
  function slide(i,dr,dc,steps){ let n=0; while(n<steps && can(i,dr,dc)){ pieces[i].r+=dr; pieces[i].c+=dc; n++; } return n; }
  function won(){ const L=level(); const row=L.exitRow; return pieces.some(p=>p.target && p.r===row && p.c+p.w===L.cols); }
  function render(){
    const L=level();
    board.style.aspectRatio=L.cols+"/"+L.rows;
    board.style.setProperty("--cols", L.cols);
    board.style.setProperty("--rows", L.rows);
    board.replaceChildren();
    for(let r=0;r<L.rows;r++) for(let c=0;c<L.cols;c++){ const cell=document.createElement("div"); cell.className="cell"+(r===L.exitRow&&c===L.cols-1?" exit":""); board.append(cell); }
    const door=document.createElement("div"); door.className="door"; door.textContent="出口 →"; door.style.top=(L.exitRow/L.rows*100)+"%"; door.style.height=(100/L.rows)+"%"; door.style.right="0"; door.style.width=(100/L.cols)+"%"; board.append(door);
    pieces.forEach((p,i)=>{
      const el=document.createElement("button");
      el.type="button"; el.className="block"+(p.target?" target":"")+(p.w>=p.h?" hcar":" vcar");
      el.style.left=(p.c/L.cols*100)+"%"; el.style.top=(p.r/L.rows*100)+"%";
      el.style.width=(p.w/L.cols*100)+"%"; el.style.height=(p.h/L.rows*100)+"%";
      el.textContent=p.target?"紅車":""; el.dataset.axis = p.w===p.h?"free":(p.w>p.h?"x":"y");
      el.setAttribute("aria-label",p.target?"紅車，方向鍵移動":"車輛，方向鍵移動");el.onkeydown=e=>{const delta={ArrowLeft:[0,-1],ArrowRight:[0,1],ArrowUp:[-1,0],ArrowDown:[1,0]}[e.key];if(!delta||!SistersRound.canInteract())return;e.preventDefault();const [dr,dc]=delta;if((p.w>p.h&&dr)||(p.h>p.w&&dc)||!can(i,dr,dc))return;history.push(clone(pieces));slide(i,dr,dc,1);moves++;render();board.querySelectorAll(".block")[i]?.focus();SistersRound.checkpoint();};el.addEventListener("pointerdown", ev=>startDrag(ev,i,el));
      board.append(el);
    });
    document.getElementById("status").textContent=`把紅車拖到右邊「出口」 · ${L.name} · ${tierName[L.tier]||L.tier} · ${moves} 步 · 最少 ${L.minimumMoves}`;
    if(won()) finish();
  }
  function startDrag(ev,i,el){
    if(!SistersRound.canInteract()||cancelDrag)return;
    if(ev.button!=null && ev.button!==0) return;
    ev.preventDefault();
    el.setPointerCapture(ev.pointerId);
    el.classList.add("selected");
    const origin={r:pieces[i].r,c:pieces[i].c};
    const rect=board.getBoundingClientRect();
    const cellW=rect.width/level().cols, cellH=rect.height/level().rows;
    const p=pieces[i];
    const axis = p.w===p.h ? "free" : (p.w>p.h ? "x" : "y");
    const before=clone(pieces);dragSnapshot={filter,index,pieces:clone(pieces),moves,hints,restarts,startedAt,history:structuredClone(history)};
    function move(e){
      if(e.pointerId!==ev.pointerId||!SistersRound.canInteract()) return;
      pieces[i].r=origin.r; pieces[i].c=origin.c;
      const dx=e.clientX-ev.clientX, dy=e.clientY-ev.clientY;
      const useX = axis==="x" || (axis==="free" && Math.abs(dx)>=Math.abs(dy));
      if(useX){ const steps=Math.round(dx/cellW); slide(i,0,steps>0?1:-1,Math.abs(steps)); }
      else { const steps=Math.round(dy/cellH); slide(i,steps>0?1:-1,0,Math.abs(steps)); }
      el.style.left=(pieces[i].c/level().cols*100)+"%";
      el.style.top=(pieces[i].r/level().rows*100)+"%";
    }
    function cleanup(){el.removeEventListener("pointermove",move);el.removeEventListener("pointerup",up);el.removeEventListener("pointercancel",cancel);if(el.hasPointerCapture(ev.pointerId))el.releasePointerCapture(ev.pointerId);cancelDrag=null;dragSnapshot=null;}
    function cancel(){pieces=before;cleanup();render();}
    function up(e){if(e.pointerId!==ev.pointerId)return;cleanup();if(!SistersRound.canInteract()){pieces=before;render();return;}if(pieces[i].r!==origin.r||pieces[i].c!==origin.c){history.push(before);moves++;SistersPlay.playSound('ok');}render();SistersRound.checkpoint();}
    cancelDrag=cancel;el.addEventListener("pointermove",move);el.addEventListener("pointerup",up);el.addEventListener("pointercancel",cancel);
  }
  function finish(){
    SistersPlay.showComplete(`紅車開出去了。你用了 ${moves} 步，最少 ${level().minimumMoves} 步`);
    SistersPlay.recordResult({game:"sliding", difficulty:level().tier, level:level().name, startedAt, moves, hintsUsed:hints, restartCount:restarts});
  }
  function hint(){
    if(!SistersRound.canInteract())return;
    if(hints>=3 || won()) return;
    const t=pieces.findIndex(p=>p.target);
    const L=level();
    const prefs = pieces[t].c+pieces[t].w<L.cols && pieces[t].r===L.exitRow ? [[0,1]] : [[0,1],[1,0],[-1,0],[0,-1]];
    for(const [dr,dc] of prefs) if(can(t,dr,dc)){ hints++; history.push(clone(pieces)); slide(t,dr,dc,1); moves++; render();SistersRound.checkpoint(); return; }
    hints++;
    document.getElementById("status").textContent="提示：先把擋住紅車的車移開";SistersRound.checkpoint();
  }
  function chips(){
    const tierRow=document.getElementById("tier-row"); tierRow.replaceChildren();
    ["all","tutorial","easy","medium","hard","challenge","master"].forEach(t=>{ const b=document.createElement("button"); b.type="button"; b.className="chip"+(filter===t?" selected":""); b.textContent=t==="all"?"全部":tierName[t]; b.onclick=()=>{filter=t; chips();}; tierRow.append(b); });
    const row=document.getElementById("level-row"); row.replaceChildren();
    levels.forEach((L,i)=>{ if(filter!=="all" && L.tier!==filter) return; const b=document.createElement("button"); b.type="button"; b.className="chip"+(i===index?" selected":""); b.textContent=(i+1)+" "+L.name; b.onclick=()=>load(i); row.append(b); });
  }
  document.getElementById("hint").onclick=hint;
  document.getElementById("undo").onclick=()=>{ if(!SistersRound.canInteract()||!history.length) return; pieces=history.pop(); moves=Math.max(0,moves-1); render();SistersRound.checkpoint(); };
  document.getElementById("overlay-next").onclick=()=>{ load((index+1)%levels.length); chips(); };
  SistersPlay.showCoach("sliding", [{demo:"🚗➡️🚪", line:"抓住紅車，拖到右邊出口"},{demo:"🚙", line:"其他車要先讓路"}]);
  SistersPlay.mount({ title:"滑塊闖關", onRestart: () => load(index,"restart") });
  chips();if(!await SistersRound.attach({snapshot:()=>dragSnapshot||({filter,index,pieces,moves,hints,restarts,startedAt,history}),cancel:()=>cancelDrag?.(),restore:p=>{if(!levels[p.index]||p.pieces.length!==levels[p.index].pieces.length)throw Error("滑塊存檔格式錯誤");({filter,index,pieces,moves,hints,restarts,startedAt,history}=p);chips();render();}}))await load(0);
})();
