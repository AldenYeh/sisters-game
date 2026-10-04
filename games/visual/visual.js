(() => {
  "use strict";
  const levels = [
    { name: "兩格", n: 3, k: 2, sec: 2 },
    { name: "三格", n: 3, k: 3, sec: 2.5 },
    { name: "四格", n: 4, k: 4, sec: 3 },
    { name: "五格", n: 4, k: 5, sec: 3 },
    { name: "六格", n: 5, k: 6, sec: 3.5 }
  ];
  let idx = 0, targets = [], picks = new Set(), phase = "show", timer = 0, startedAt = Date.now();
  function start() {
    clearTimeout(timer);
    const L = levels[idx];
    targets = [];
    while (targets.length < L.k) {
      const n = Math.floor(Math.random() * L.n * L.n);
      if (!targets.includes(n)) targets.push(n);
    }
    picks = new Set(); phase = "show"; startedAt = Date.now();
    document.getElementById("complete").hidden = true;
    render();
    timer = setTimeout(() => { phase = "play"; render(); }, L.sec * 1000);
  }
  function render() {
    const L = levels[idx];
    const grid = document.getElementById("grid");
    grid.style.gridTemplateColumns = `repeat(${L.n}, 1fr)`;
    grid.replaceChildren();
    for (let i = 0; i < L.n * L.n; i++) {
      const b = document.createElement("button");
      b.type = "button"; b.className = "cell";
      if (phase === "show" && targets.includes(i)) { b.classList.add("on"); b.textContent = "●"; }
      if (phase === "play" && picks.has(i)) b.classList.add(targets.includes(i) ? "ok" : "no");
      b.onclick = () => pick(i);
      grid.append(b);
    }
    document.getElementById("status").textContent = phase === "show" ? `先看亮起來的 ${L.k} 格` : `點回剛才亮的格子 ${picks.size}/${L.k}`;
    chips();
  }
  function pick(i) {
    if (phase !== "play" || picks.has(i)) return;
    picks.add(i);
    SistersPlay.playSound(targets.includes(i) ? "ok" : "soft");
    render();
    if ([...picks].filter(n => targets.includes(n)).length === targets.length && [...picks].every(n => targets.includes(n))) {
      SistersPlay.showComplete("記得住");
      SistersPlay.recordResult({ game: "visual", difficulty: levels[idx].name, level: levels[idx].k, startedAt, moves: picks.size });
    }
  }
  function chips() {
    const row = document.getElementById("level-row");
    if (!row) return;
    row.replaceChildren();
    levels.forEach((L, i) => {
      const b = document.createElement("button");
      b.type = "button"; b.className = "chip" + (i === idx ? " selected" : ""); b.textContent = L.name;
      b.onclick = () => { idx = i; start(); };
      row.append(b);
    });
  }
  SistersPlay.showCoach("visual", [{ demo: "●", line: "先記住亮起來的格子" }, { demo: "👆", line: "消失後點回來" }]);
  SistersPlay.mount({ title: "視覺記憶", onRestart: start });
  document.getElementById("overlay-next").onclick = () => { idx = (idx + 1) % levels.length; start(); };
  start();
})();
