(() => {
  "use strict";
  const levels = window.StrokeLevels;
  let index=0, used=new Set(), last=null, moves=0, startedAt=Date.now(), restarts=0;
  function load(i){ index=i; used=new Set(); last=null; moves=0; startedAt=Date.now(); document.getElementById("complete").hidden=true; render(); }
  function render(){
    const L=levels[index]; const svg=document.getElementById("board");
    const edges=L.edges.map((e,i)=>{
      const a=L.nodes[e[0]], b=L.nodes[e[1]];
      return `<line data-i="${i}" x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="${used.has(i)?"#2f6f4e":"#d7c9cf"}" stroke-width="${used.has(i)?14:8}" stroke-linecap="round"/>`;
    }).join("");
    const nodes=L.nodes.map((n,i)=>`<circle data-n="${i}" cx="${n[0]}" cy="${n[1]}" r="${last===i?20:16}" fill="${last===i?"#d25b6a":"#fff"}" stroke="#8d5b73" stroke-width="3"/>`).join("");
    svg.innerHTML=edges+nodes;
    svg.querySelectorAll("circle").forEach(c=>c.addEventListener("click",()=>tap(+c.dataset.n)));
    document.getElementById("status").textContent=last==null?`點一個點開始 · ${L.name}`:`從紅點走到相連的點 · 已走 ${used.size}/${L.edges.length}`;
    if (used.size===L.edges.length) {
      SistersPlay.showComplete("整張圖走完了");
      SistersPlay.recordResult({game:"stroke", difficulty:L.tier, level:L.name, startedAt, moves, restartCount:restarts});
    }
  }
  function tap(n){
    if (last==null) { last=n; render(); return; }
    const L=levels[index];
    const ei=L.edges.findIndex((e,i)=>!used.has(i) && ((e[0]===last && e[1]===n) || (e[1]===last && e[0]===n)));
    if (ei<0) { document.getElementById("status").textContent="這條線沒有，或已經走過"; return; }
    used.add(ei); last=n; moves++; render();
  }
  function chips(){ const row=document.getElementById("level-row"); row.replaceChildren(); levels.forEach((L,i)=>{const b=document.createElement("button"); b.type="button"; b.className="chip"+(i===index?" selected":""); b.textContent=String(i+1); b.onclick=()=>{load(i); chips();}; row.append(b);}); }
  SistersPlay.showCoach("stroke", [{demo:"✏️", line:"沿著線走，每條只走一次"}]);
  SistersPlay.mount({title:"一筆畫", onRestart:()=>{restarts++; load(index);}});
  document.getElementById("overlay-next").onclick=()=>{load((index+1)%levels.length); chips();};
  chips(); load(0);
})();
