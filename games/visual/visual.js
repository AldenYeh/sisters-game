(async () => {
  "use strict";
  const levels = [
    { name: "兩格", n: 6, k: 2, sec: 2 },
    { name: "三格", n: 6, k: 3, sec: 2.5 },
    { name: "四格", n: 6, k: 4, sec: 3 },
    { name: "五格", n: 6, k: 5, sec: 3 },
    { name: "六格", n: 6, k: 6, sec: 3.5 }
  ];
  let idx = 0, targets = [], picks = new Set(), phase = "show", timer = 0, startedAt = Date.now(), hideAt=0,gridN=6,challengeId=null;
  async function start(reason="new",nextIdx=idx) {return SistersRound.start(async()=>{idx=nextIdx;
    clearTimeout(timer);
    const L = levels[idx];
    const q=await SistersChallenges.draw('visual:'+L.k,SistersBanks.visual[L.k]);targets=q.targets.slice();gridN=q.n;challengeId=q.id;
    picks = new Set(); phase = "show"; startedAt = Date.now();
    document.getElementById("complete").hidden = true;
    render();
    hideAt=document.querySelector('.coach')?null:Date.now()+L.sec*1000; resume();
  },reason);}
  function resume(){clearTimeout(timer);if(document.querySelector('.coach'))return;if(hideAt===null)hideAt=Date.now()+levels[idx].sec*1000;if(phase==="show")timer=setTimeout(()=>{if(!SistersRound.canInteract()){if(SistersFamily.canPlay(SistersRound.current())){hideAt=Date.now()+100;resume();}return;}phase="play";render();SistersRound.checkpoint();},Math.max(0,hideAt-Date.now()));}
  function render() {
    const L = levels[idx];
    const grid = document.getElementById("grid");
    grid.style.gridTemplateColumns = `repeat(${gridN}, 1fr)`;
    grid.replaceChildren();
    for (let i = 0; i < gridN * gridN; i++) {
      const b = document.createElement("button");
      b.type = "button"; b.className = "cell";
      if (phase === "show" && targets.includes(i)) { b.classList.add("on"); b.textContent = "●"; }
      if (phase === "play" && picks.has(i)) b.classList.add(targets.includes(i) ? "ok" : "no");
      b.onclick = () => pick(i);
      grid.append(b);
    }
    document.getElementById("status").textContent = phase === "show" ? `先看亮起來的 ${L.k} 格` : `點回剛才亮的格子 ${picks.size}/${L.k} · 點錯可再點取消`;
    chips();
  }
  function pick(i) {
    if(!SistersRound.canInteract()||phase!=="play")return;
    if(picks.has(i))picks.delete(i);else picks.add(i);
    SistersPlay.playSound(targets.includes(i) ? "ok" : "soft");
    render();
    if ([...picks].filter(n => targets.includes(n)).length === targets.length && [...picks].every(n => targets.includes(n))) {
      SistersPlay.showComplete("記得住");
      SistersPlay.recordResult({ game: "visual", difficulty: levels[idx].name, level: levels[idx].k, startedAt, moves: picks.size });
    }
    SistersRound.checkpoint();
  }
  function chips() {
    const row = document.getElementById("level-row");
    if (!row) return;
    SistersChallenges.selector(row,levels.map((L,i)=>({value:i,label:L.name})),idx,value=>start('new',+value),'記住格數');
  }
  SistersPlay.showCoach("visual", [{ demo: "●", line: "先記住亮起來的格子" }, { demo: "👆", line: "消失後點回來" }]);
  SistersPlay.mount({ title: "視覺記憶", onRestart: ()=>start("restart") });
  document.getElementById("overlay-next").onclick = () => start();
  chips();if(!await SistersRound.attach({snapshot:()=>({idx,targets,picks:[...picks],phase,startedAt,hideAt,gridN,challengeId}),cancel:()=>clearTimeout(timer),resume,restore:p=>{({idx,targets,phase,startedAt,hideAt}=p);gridN=p.gridN||[3,3,4,4,5][idx];challengeId=p.challengeId||null;picks=new Set(p.picks);chips();render();}}))await start();
})();
