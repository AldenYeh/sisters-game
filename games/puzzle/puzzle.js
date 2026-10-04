(() => {
  "use strict";
  const arts = [
    { id: "garden", name: "花園", src: "art/garden.jpg" },
    { id: "room", name: "房間", src: "art/room.jpg" },
    { id: "sea", name: "海底", src: "art/sea.jpg" }
  ];
  const sizes = [12, 24, 36];
  const state = { pieces: 12, art: arts[0], placed: [], hints: 0, moves: 0, restarts: 0, startedAt: Date.now(), cols: 4, rows: 3, image: null };
  const board = document.getElementById("board");
  const tray = document.getElementById("tray");
  function dims(n) { return { 12: [4, 3], 24: [6, 4], 36: [6, 6] }[n]; }
  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }
  async function start() {
    const [cols, rows] = dims(state.pieces);
    state.cols = cols; state.rows = rows;
    state.placed = Array(cols * rows).fill(false);
    state.hints = 0; state.moves = 0; state.startedAt = Date.now();
    document.getElementById("complete").hidden = true;
    state.image = await loadImage(state.art.src);
    render();
  }
  function cellSize() {
    const w = Math.floor(Math.min(board.parentElement.clientWidth || 520, 560) / state.cols);
    return { w: Math.max(52, w), h: Math.max(42, Math.floor(w * 0.72)) };
  }
  function slice(i, w, h, solid) {
    const img = state.image;
    const c = i % state.cols, r = Math.floor(i / state.cols);
    const out = document.createElement("canvas");
    out.width = w; out.height = h;
    const g = out.getContext("2d");
    g.save();
    g.beginPath();
    g.moveTo(2, 2);
    g.lineTo(w - 2, 2);
    if (c < state.cols - 1) g.arc(w - 10, h / 2, 8, -1.1, 1.1);
    g.lineTo(w - 2, h - 2);
    g.lineTo(2, h - 2);
    if (r < state.rows - 1) g.arc(w / 2, h - 10, 8, 0.4, 2.7);
    g.closePath();
    g.clip();
    g.drawImage(img, c * img.width / state.cols, r * img.height / state.rows, img.width / state.cols, img.height / state.rows, 0, 0, w, h);
    g.restore();
    if (!solid) { g.fillStyle = "rgba(255,253,249,.7)"; g.fillRect(0, 0, w, h); }
    return out.toDataURL();
  }
  function render() {
    const size = cellSize();
    board.style.display = "grid";
    board.style.gridTemplateColumns = `repeat(${state.cols}, ${size.w}px)`;
    board.style.width = "max-content";
    board.style.margin = "0 auto";
    board.replaceChildren();
    const ref = document.getElementById("reference");
    if (ref) ref.style.backgroundImage = `url(${state.art.src})`;
    for (let i = 0; i < state.placed.length; i++) {
      const cell = document.createElement("div");
      cell.style.width = size.w + "px";
      cell.style.height = size.h + "px";
      cell.style.background = `url(${slice(i, size.w, size.h, state.placed[i])}) center/cover`;
      cell.style.transition = "transform .18s ease";
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
      el.style.background = `url(${slice(i, size.w, size.h, true)}) center/cover`;
      el.style.border = "0";
      el.style.borderRadius = "10px";
      el.style.cursor = "grab";
      el.addEventListener("pointerdown", ev => begin(ev, i, el));
      tray.append(el);
    });
    document.getElementById("status").textContent = `拖到淡色的同一格，放對會變亮 · ${state.placed.filter(Boolean).length} / ${state.placed.length}`;
  }
  function begin(ev, index, el) {
    ev.preventDefault();
    const ghost = el.cloneNode();
    ghost.style.position = "fixed";
    ghost.style.zIndex = "9";
    ghost.style.pointerEvents = "none";
    ghost.style.width = el.offsetWidth + "px";
    ghost.style.height = el.offsetHeight + "px";
    ghost.style.left = ev.clientX - el.offsetWidth / 2 + "px";
    ghost.style.top = ev.clientY - el.offsetHeight / 2 + "px";
    document.body.append(ghost);
    const w = el.offsetWidth, h = el.offsetHeight;
    function move(e) { ghost.style.left = e.clientX - w / 2 + "px"; ghost.style.top = e.clientY - h / 2 + "px"; }
    function up(e) {
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerup", up);
      const rect = board.getBoundingClientRect();
      const c = Math.round((e.clientX - rect.left) / w - 0.5);
      const r = Math.round((e.clientY - rect.top) / h - 0.5);
      const hit = r * state.cols + c;
      state.moves++;
      if (c >= 0 && r >= 0 && c < state.cols && r < state.rows && hit === index) {
        state.placed[index] = true;
        SistersPlay.playSound("ok");
      }
      ghost.remove();
      render();
      if (state.placed.every(Boolean)) {
        SistersPlay.showComplete("拼好了");
        SistersPlay.recordResult({ game: "puzzle", difficulty: String(state.pieces), level: state.art.id, startedAt: state.startedAt, moves: state.moves, hintsUsed: state.hints, restartCount: state.restarts });
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
      b.type = "button"; b.className = "chip" + (a.id === state.art.id ? " selected" : ""); b.textContent = a.name;
      b.onclick = () => { state.art = a; chips(); start(); };
      artRow.append(b);
    });
  }
  SistersPlay.showCoach("puzzle", [{ demo: "🧩", line: "把碎片拖到同樣的格子" }]);
  SistersPlay.mount({ title: "拼圖", onRestart: () => { state.restarts++; start(); } });
  document.getElementById("hint").onclick = () => {
    const i = state.placed.findIndex(v => !v);
    if (i < 0 || state.hints >= 3) return;
    state.hints++; state.placed[i] = true; SistersPlay.playSound("ok"); render();
  };
  document.getElementById("overlay-next").onclick = start;
  chips(); start();
})();
