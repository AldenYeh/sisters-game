
(() => {
  "use strict";
  const levels = [
    {name:"熱身", tier:"warmup", n:3, k:2, sec:3},
    {name:"簡單", tier:"easy", n:3, k:4, sec:3},
    {name:"普通", tier:"normal", n:4, k:5, sec:3},
    {name:"困難", tier:"hard", n:5, k:7, sec:3.5},
    {name:"挑戰", tier:"challenge", n:5, k:10, sec:4},
    {name:"大師", tier:"master", n:6, k:12, sec:4.5}
  ];
  let idx=0, targets=new Set(), picks=new Set(), phase="show", startedAt=Date.now(), attempts=0;
  function start() {
    const L=levels[idx];
    targets=new Set();
    while (targets.size<L.k) targets.add(Math.floor(Math.random()*L.n*L.n));
    picks=new Set(); phase="show"; startedAt=Date.now(); attempts++;
    document.getElementById("complete").hidden=true;
    render();
    setTimeout(()=>{ if(phase==="show"){ phase="play"; render(); } }, L.sec*1000);
  }
  function render() {
    const L=levels[idx]; const grid=document.getElementById("grid");
    grid.style.gridTemplateColumns=`repeat(${L.n},1fr)`; grid.replaceChildren();
    for (let i=0;i<L.n*L.n;i++) {
      const b=document.createElement("button"); b.type="button"; b.className="cell";
      if (phase==="show" && targets.has(i)) { b.classList.add("on"); b.textContent="🐱"; }
      if (phase==="play" && picks.has(i)) b.classList.add("pick");
      b.onclick=()=>pick(i); grid.append(b);
    }
    document.getElementById("status").textContent = phase==="show" ? `記住 ${L.k} 隻貓 · ${L.n}×${L.n}` : `點剛剛有貓的格子 · ${picks.size}/${L.k}`;
  }
  function pick(i) {
    if (phase!=="play") return;
    if (picks.has(i)) picks.delete(i); else if (picks.size<levels[idx].k) picks.add(i);
    render();
    if (picks.size===levels[idx].k) {
      const ok=[...picks].every(x=>targets.has(x));
      if (ok) {
        SistersPlay.showComplete(`${levels[idx].name} 記得住`);
        SistersPlay.recordResult({game:"visual", difficulty:levels[idx].tier, level:levels[idx].name, startedAt, attempts, moves:picks.size});
      } else document.getElementById("status").textContent="有一格不一樣，可以再看一次";
    }
  }
  function chips(){ const row=document.getElementById("level-row"); row.replaceChildren(); levels.forEach((L,i)=>{const b=document.createElement("button"); b.type="button"; b.className="chip"+(i===idx?" selected":""); b.textContent=L.name; b.onclick=()=>{idx=i; chips(); start();}; row.append(b);}); }
  SistersPlay.showCoach("visual", [{demo:"🐱", line:"先記住貓在哪裡"},{demo:"👆", line:"消失後點回來"}]);
  SistersPlay.mount({title:"視覺記憶", onRestart:start});
  document.getElementById("overlay-next").onclick=()=>{idx=(idx+1)%levels.length; chips(); start();};
  chips(); start();
})();
