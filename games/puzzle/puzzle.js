(() => {
  "use strict";
  const arts = [
    ["cat", "貓咪", "#f7c5ce"],
    ["park", "公園", "#c9ecff"],
    ["room", "房間", "#fff4d6"]
  ];
  const sizes = [12, 24, 36];
  const state = { pieces: 12, art: arts[0], placed: [], hints: 0, moves: 0, restarts: 0, startedAt: Date.now(), drag: null, cols: 4, rows: 3 };
  const board = document.getElementById("board");
  const tray = document.getElementById("tray");
  function dims(n) { return {12:[4,3],24:[6,4],36:[6,6]}[n]; }
  function paint(color, name) {
    const c = document.createElement("canvas");
    c.width = 480; c.height = 360;
    const g = c.getContext("2d");
    g.fillStyle = color; g.fillRect(0, 0, 480, 360);
    g.fillStyle = "#ffe08a"; g.beginPath(); g.arc(90, 70, 42, 0, 7); g.fill();
    g.fillStyle = "#fff"; g.fillRect(40, 190, 130, 80);
    g.fillStyle = "#7aa7c7"; g.beginPath(); g.arc(330, 150, 50, 0, 7); g.fill();
    g.fillStyle = "#3d3338"; g.font = "28px sans-serif"; g.fillText(name, 48, 250);
    return c;
  }
  function start() {
    const [cols, rows] = dims(state.pieces);
    state.cols = cols; state.rows = rows;
    state.placed = Array(cols * rows).fill(false);
    state.hints = 0; state.moves = 0; state.startedAt = Date.now();
    document.getElementById("complete").hidden = true;
    render();
  }
  function cellSize() {
    const w = Math.floor((board.clientWidth || 420) / state.cols);
    return { w: Math.max(48, w), h: Math.max(40, Math.floor(w * 0.75)) };
  }
  function slice(i, w, h) {
    const src = paint(state.art[2], state.art[1]);
    const c = i % state.cols, r = Math.floor(i / state.cols);
    const out = document.createElement("canvas");
    out.width = w; out.height = h;
    const g=out.getContext("2d");
    g.drawImage(src, c * src.width / state.cols, r * src.height / state.rows, src.width / state.cols, src.height / state.rows, 0, 0, w, h);
    g.strokeStyle="#fff"; g.lineWidth=3; g.strokeRect(1,1,w-2,h-2);
    if(c<state.cols-1){ g.fillStyle="#fff"; g.beginPath(); g.arc(w-2,h/2,6,0,7); g.fill(); }
    return out;
  }
  function render() {
    const size = cellSize();
    board.style.display = "grid";
    board.style.gridTemplateColumns = `repeat(${state.cols}, ${size.w}px)`;
    board.style.width = "max-content";
    board.replaceChildren();
    const ref = document.getElementById("reference");
    if (ref) ref.style.backgroundImage = `url(${paint(state.art[2], state.art[1]).toDataURL()})`;
    for (let i = 0; i < state.placed.length; i++) {
      const cell = document.createElement("div");
      cell.style.width = size.w + "px";
      cell.style.height = size.h + "px";
      cell.style.background = state.placed[i] ? `url(${slice(i, size.w, size.h).toDataURL()}) center/cover` : `linear-gradient(rgba(255,253,249,.55), rgba(255,253,249,.55)), url(${slice(i, size.w, size.h).toDataURL()}) center/cover`;
      cell.style.boxShadow = "inset 0 0 0 1px #eadfd6";
      board.append(cell);
    }
    tray.replaceChildren();
    state.placed.forEach((on, i) => {
      if (on) return;
      const el = document.createElement("button");
      el.type = "button";
      el.className = "piece";
      el.style.width = size.w + "px";
      el.style.height = size.h + "px";
      el.style.background = `url(${slice(i, size.w, size.h).toDataURL()}) center/cover`;
      el.style.border = "0";
      el.style.borderRadius = "8px";
      el.addEventListener("pointerdown", ev => begin(ev, i, el));
      tray.append(el);
    });
    document.getElementById("status").textContent = `已放好 ${state.placed.filter(Boolean).length} / ${state.placed.length}`;
  }
  function begin(ev, index, el) {
    ev.preventDefault();
    const ghost = el.cloneNode();
    ghost.style.position = "fixed";
    ghost.style.zIndex = "9";
    ghost.style.pointerEvents = "none";
    ghost.style.left = ev.clientX - el.offsetWidth / 2 + "px";
    ghost.style.top = ev.clientY - el.offsetHeight / 2 + "px";
    document.body.append(ghost);
    state.drag = { index, ghost, w: el.offsetWidth, h: el.offsetHeight };
    function move(e) {
      ghost.style.left = e.clientX - state.drag.w / 2 + "px";
      ghost.style.top = e.clientY - state.drag.h / 2 + "px";
    }
    function up(e) {
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerup", up);
      const rect = board.getBoundingClientRect();
      const c = Math.floor((e.clientX - rect.left) / state.drag.w);
      const r = Math.floor((e.clientY - rect.top) / state.drag.h);
      const hit = r * state.cols + c;
      state.moves++;
      if (c >= 0 && r >= 0 && c < state.cols && r < state.rows && hit === index) state.placed[index] = true;
      ghost.remove();
      state.drag = null;
      render();
      if (state.placed.every(Boolean)) {
        SistersPlay.showComplete("拼好了");
        SistersPlay.recordResult({ game: "puzzle", difficulty: String(state.pieces), level: state.art[0], startedAt: state.startedAt, moves: state.moves, hintsUsed: state.hints, restartCount: state.restarts });
      }
    }
    document.addEventListener("pointermove", move);
    document.addEventListener("pointerup", up);
  }
  function chips() {
    const sizeRow = document.getElementById("size-row");
    sizeRow.replaceChildren();
    sizes.forEach(n => {
      const b = document.createElement("button");
      b.type = "button"; b.className = "chip" + (n === state.pieces ? " selected" : ""); b.textContent = n + " 片";
      b.onclick = () => { state.pieces = n; chips(); start(); };
      sizeRow.append(b);
    });
    const artRow = document.getElementById("art-row");
    artRow.replaceChildren();
    arts.forEach(a => {
      const b = document.createElement("button");
      b.type = "button"; b.className = "chip" + (a[0] === state.art[0] ? " selected" : ""); b.textContent = a[1];
      b.onclick = () => { state.art = a; chips(); start(); };
      artRow.append(b);
    });
  }
  SistersPlay.showCoach("puzzle", [{ demo: "🧩", line: "把碎片拖到同樣的格子" }]);
  SistersPlay.mount({ title: "拼圖", onRestart: () => { state.restarts++; start(); } });
  document.getElementById("hint").onclick = () => {
    const i = state.placed.findIndex(v => !v);
    if (i < 0 || state.hints >= 3) return;
    state.hints++; state.placed[i] = true; render();
  };
  document.getElementById("overlay-next").onclick = start;
  chips(); start();
})();
