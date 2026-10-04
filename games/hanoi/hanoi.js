
(() => {
  "use strict";
  let n=3, pegs=[], selected=null, moves=0, startedAt=Date.now(), restarts=0;
  function start(){ pegs=[Array.from({length:n},(_,i)=>n-i),[],[]]; selected=null; moves=0; startedAt=Date.now(); document.getElementById("complete").hidden=true; render(); }
  function render(){
    const host=document.getElementById("pegs"); host.replaceChildren();
    pegs.forEach((peg,i)=>{
      const col=document.createElement("button"); col.type="button"; col.className="peg"; col.onclick=()=>pick(i);
      peg.forEach(d=>{ const el=document.createElement("div"); el.className="disc"; el.style.width=(30+d*18)+"px"; el.style.background=`hsl(${d*30},70%,75%)`; col.append(el); });
      host.append(col);
    });
    document.getElementById("status").textContent=`${n} 層 · ${moves} 步 · 最少 ${2**n-1} 步`;
  }
  function pick(i){
    if (selected==null) { if (pegs[i].length) selected=i; return; }
    if (selected===i) { selected=null; return; }
    const from=pegs[selected], to=pegs[i];
    if (!from.length) { selected=null; return; }
    const disc=from[from.length-1];
    if (to.length && to[to.length-1] < disc) { document.getElementById("status").textContent="大的不能放在小的上面"; selected=null; return; }
    to.push(from.pop()); moves++; selected=null; render();
    if (pegs[2].length===n) {
      SistersPlay.showComplete(`你用了 ${moves} 步，最少可以 ${2**n-1} 步喔！`);
      SistersPlay.recordResult({game:"hanoi", difficulty:String(n), level:n, startedAt, moves, restartCount:restarts});
    }
  }
  function chips(){ const row=document.getElementById("disc-row"); row.replaceChildren(); [3,4,5,6,7].forEach(d=>{const b=document.createElement("button"); b.type="button"; b.className="chip"+(d===n?" selected":""); b.textContent=d+" 層"; b.onclick=()=>{n=d; chips(); start();}; row.append(b);}); }
  SistersPlay.showCoach("hanoi", [{demo:"🔴➡️", line:"把圓盤搬到右邊柱子"},{demo:"🚫", line:"大的不能放在小的上面"}]);
  SistersPlay.mount({title:"河內塔", onRestart:()=>{restarts++; start();}});
  document.getElementById("overlay-next").onclick=()=>{ n=Math.min(7,n+1); chips(); start(); };
  chips(); start();
})();
