
(() => {
  "use strict";
  const levels = window.SlidingLevels;
  const tiers = ["tutorial","easy","medium","hard","challenge","master"];
  const tierName = {tutorial:"教學",easy:"簡單",medium:"普通",hard:"困難",challenge:"挑戰",master:"大師"};
  let filter = "all", index = 0, pieces = [], moves = 0, hints = 0, restarts = 0, startedAt = Date.now(), selected = null, history = [];
  const board = document.getElementById("board");
  function level() { return levels[index]; }
  function clone(ps) { return ps.map(p => ({...p})); }
  function load(i) {
    index = i; pieces = clone(level().pieces); moves = 0; hints = 0; startedAt = Date.now(); history = []; selected = null;
    document.getElementById("complete").hidden = true; render();
  }
  function occ(skip) {
    const m = new Set();
    pieces.forEach((p,i) => { if (i===skip) return; for (let y=0;y<p.h;y++) for (let x=0;x<p.w;x++) m.add((p.r+y)+","+(p.c+x)); });
    return m;
  }
  function can(i, dr, dc) {
    const L = level(), p = pieces[i], nr = p.r+dr, nc = p.c+dc;
    if (nr<0||nc<0||nr+p.h>L.rows||nc+p.w>L.cols) return false;
    const used = occ(i);
    for (let y=0;y<p.h;y++) for (let x=0;x<p.w;x++) if (used.has((nr+y)+","+(nc+x))) return false;
    return true;
  }
  function won() { const L = level(); return pieces.some(p => p.target && p.c+p.w===L.cols && p.r===L.rows-1); }
  function render() {
    const L = level();
    board.style.aspectRatio = L.cols+"/"+L.rows; board.replaceChildren();
    pieces.forEach((p,i) => {
      const el = document.createElement("button");
      el.type = "button"; el.className = "block"+(p.target?" target":"")+(selected===i?" selected":"");
      el.style.left = (p.c/L.cols*100)+"%"; el.style.top = (p.r/L.rows*100)+"%";
      el.style.width = (p.w/L.cols*100)+"%"; el.style.height = (p.h/L.rows*100)+"%";
      el.textContent = p.target ? "🐱" : "●";
      el.onclick = () => { selected = i; render(); };
      board.append(el);
    });
    document.getElementById("status").textContent = `${L.name} · ${tierName[L.tier]||L.tier} · ${moves} 步 · 最少 ${L.minimumMoves} 步 · 提示 ${hints}/3`;
  }
  function move(i, dr, dc) {
    if (!can(i,dr,dc)) return;
    history.push(clone(pieces)); pieces[i].r += dr; pieces[i].c += dc; moves++; render();
    if (won()) {
      SistersPlay.showComplete(`你用了 ${moves} 步，最少可以 ${level().minimumMoves} 步喔！`);
      SistersPlay.recordResult({game:"sliding", difficulty:level().tier, level:level().name, startedAt, moves, hintsUsed:hints, restartCount:restarts});
    }
  }
  function hint() {
    if (hints>=3 || won()) return;
    const t = pieces.findIndex(p => p.target);
    for (const [dr,dc] of [[0,1],[1,0],[-1,0],[0,-1]]) if (can(t,dr,dc)) { hints++; move(t,dr,dc); return; }
    for (let i=0;i<pieces.length;i++) for (const [dr,dc] of [[0,1],[1,0],[-1,0],[0,-1]]) if (can(i,dr,dc)) { hints++; selected=i; render(); document.getElementById("status").textContent="提示：先看看選中的這塊，能不能讓出一條路"; return; }
  }
  function chips() {
    const tierRow = document.getElementById("tier-row"); tierRow.replaceChildren();
    ["all", ...tiers].forEach(t => { const b=document.createElement("button"); b.className="chip"+(filter===t?" selected":""); b.type="button"; b.textContent=t==="all"?"全部":tierName[t]; b.onclick=()=>{filter=t; chips();}; tierRow.append(b); });
    const row = document.getElementById("level-row"); row.replaceChildren();
    levels.forEach((L,i) => { if (filter!=="all" && L.tier!==filter) return; const b=document.createElement("button"); b.type="button"; b.className="chip"+(i===index?" selected":""); b.textContent=(i+1)+" "+L.name; b.onclick=()=>load(i); row.append(b); });
  }
  window.addEventListener("keydown", ev => { if (selected==null) return; const map={ArrowUp:[-1,0],ArrowDown:[1,0],ArrowLeft:[0,-1],ArrowRight:[0,1]}; if (map[ev.key]) { ev.preventDefault(); move(selected, ...map[ev.key]); } });
  document.getElementById("hint").onclick = hint;
  document.getElementById("undo").onclick = () => { if (!history.length) return; pieces = history.pop(); moves=Math.max(0,moves-1); render(); };
  document.getElementById("overlay-next").onclick = () => { load((index+1)%levels.length); chips(); };
  SistersPlay.mount({ title:"滑塊闖關", onRestart: () => { restarts++; load(index); } });
  chips(); load(0);
})();
