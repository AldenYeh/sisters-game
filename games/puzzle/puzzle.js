
(() => {
  "use strict";
  const arts = [
    ["cat", "貓咪", "🐱", "#f7c5ce"],
    ["dog", "小狗", "🐶", "#d9b082"],
    ["fruit", "水果", "🍓", "#ffd6a5"],
    ["car", "車子", "🚗", "#bde0fe"],
    ["fish", "小魚", "🐟", "#bfe8ef"]
  ];
  const sizes = [12, 24, 36, 48, 64, 80];
  const state = { pieces: 12, art: arts[0], placed: [], hints: 0, moves: 0, restarts: 0, startedAt: Date.now(), drag: null };
  const board = document.getElementById("board");
  const tray = document.getElementById("tray");
  function dims(n) {
    const map = {12:[4,3],24:[6,4],36:[6,6],48:[8,6],64:[8,8],80:[10,8]};
    return map[n];
  }
  function svgUrl(art) {
    const [, name, emoji, color] = art;
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'><rect width='400' height='300' fill='${color}'/><circle cx='80' cy='70' r='42' fill='#ffe08a'/><rect x='40' y='170' width='120' height='80' rx='12' fill='#fff'/><circle cx='280' cy='160' r='54' fill='#ffffff'/><text x='280' y='178' text-anchor='middle' font-size='64'>${emoji}</text><text x='70' y='250' font-size='28' fill='#543c4e'>${name}</text></svg>`;
    return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  }
  function pieceSize(){ const w=Math.min(board.clientWidth||420, 460)/state.cols; return {w:Math.max(56,w), h:Math.max(48,w*0.75)}; }
  function start(keepRestart) {
    const [cols, rows] = dims(state.pieces);
    state.cols = cols; state.rows = rows;
    state.placed = Array(cols * rows).fill(false);
    state.hints = keepRestart ? state.hints : 0;
    if (!keepRestart) { state.moves = 0; state.startedAt = Date.now(); }
    document.getElementById("complete").hidden = true;
    renderBoard();
    renderTray();
    status();
  }
  function renderBoard() {
    board.style.backgroundImage = "none";
    board.style.background = "#f6efe6";
    board.style.opacity = "1";
    const ref = document.getElementById("reference");
    if (ref) { ref.style.backgroundImage = svgUrl(state.art); ref.style.backgroundSize = "cover"; }
    board.replaceChildren();
    const showGhost = state.pieces <= 36;
    for (let i = 0; i < state.cols * state.rows; i++) {
      if (!showGhost && !state.placed[i]) continue;
      const g = document.createElement("div");
      g.className = "cell-ghost";
      placeBox(g, i, true);
      if (state.pieces > 24 && !state.placed[i]) g.style.opacity = ".25";
      board.append(g);
    }
    state.placed.forEach((on, i) => { if (on) board.append(makePiece(i, true)); });
  }
  function placeBox(el, index, ghost) {
    const w = 100 / state.cols, h = 100 / state.rows;
    const c = index % state.cols, r = Math.floor(index / state.cols);
    el.style.left = c * w + "%";
    el.style.top = r * h + "%";
    el.style.width = w + "%";
    el.style.height = h + "%";
    if (!ghost) {
      const size=pieceSize();
      el.style.backgroundImage = svgUrl(state.art);
      el.style.backgroundRepeat = "no-repeat";
      el.style.backgroundSize = (size.w*state.cols)+"px "+(size.h*state.rows)+"px";
      el.style.backgroundPosition = (-c*size.w)+"px "+(-r*size.h)+"px";
      el.style.border = "2px solid #fff";
      el.style.boxShadow = "0 0 0 2px #8d5b73";
      if(!ghost){ el.style.width=size.w+"px"; el.style.height=size.h+"px"; }
    }
  }
  function makePiece(index, snapped) {
    const el = document.createElement("div");
    el.className = "piece" + (snapped ? " snapped" : "");
    el.dataset.index = index;
    const [cols, rows] = [state.cols, state.rows];
    if (!snapped) {
      const size = pieceSize();
      el.style.width = size.w + "px";
      el.style.height = size.h + "px";
    }
    placeBox(el, index, false);
    if (!snapped) {
      el.style.left = ""; el.style.top = ""; el.style.width = el.style.width; el.style.height = el.style.height;
      el.addEventListener("pointerdown", onDown);
    }
    return el;
  }
  function renderTray() {
    tray.replaceChildren();
    const order = state.placed.map((on, i) => on ? null : i).filter(v => v !== null);
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    order.forEach(i => tray.append(makePiece(i, false)));
  }
  function onDown(ev) {
    const piece = ev.currentTarget;
    piece.setPointerCapture(ev.pointerId);
    const rect = piece.getBoundingClientRect();
    state.drag = { piece, dx: ev.clientX - rect.left, dy: ev.clientY - rect.top, index: Number(piece.dataset.index) };
    piece.style.position = "fixed";
    piece.style.zIndex = 20;
    piece.style.left = rect.left + "px";
    piece.style.top = rect.top + "px";
    piece.addEventListener("pointermove", onMove);
    piece.addEventListener("pointerup", onUp);
  }
  function onMove(ev) {
    if (!state.drag) return;
    state.drag.piece.style.left = (ev.clientX - state.drag.dx) + "px";
    state.drag.piece.style.top = (ev.clientY - state.drag.dy) + "px";
  }
  function cellAt(x, y) {
    const rect = board.getBoundingClientRect();
    if (x < rect.left || y < rect.top || x > rect.right || y > rect.bottom) return -1;
    const c = Math.floor((x - rect.left) / rect.width * state.cols);
    const r = Math.floor((y - rect.top) / rect.height * state.rows);
    return r * state.cols + c;
  }
  function onUp(ev) {
    const drag = state.drag;
    if (!drag) return;
    drag.piece.removeEventListener("pointermove", onMove);
    drag.piece.removeEventListener("pointerup", onUp);
    const hit = cellAt(ev.clientX, ev.clientY);
    state.moves++;
    if (hit === drag.index && !state.placed[hit]) {
      state.placed[hit] = true;
    }
    state.drag = null;
    renderBoard();
    renderTray();
    status();
    if (state.placed.every(Boolean)) finish();
  }
  function status() {
    const done = state.placed.filter(Boolean).length;
    document.getElementById("status").textContent = `已放好 ${done} / ${state.placed.length}　移動 ${state.moves}`;
  }
  function finish() {
    const text = `你放好了 ${state.pieces} 片`;
    SistersPlay.showComplete(text);
    SistersPlay.recordResult({ game: "puzzle", difficulty: String(state.pieces), level: state.art[0], startedAt: state.startedAt, moves: state.moves, hintsUsed: state.hints, restartCount: state.restarts });
  }
  function hint() {
    if (state.hints >= 3) return;
    const missing = state.placed.findIndex(v => !v);
    if (missing < 0) return;
    state.hints++;
    state.placed[missing] = true;
    state.moves++;
    renderBoard(); renderTray(); status();
    document.getElementById("status").textContent = "提示：已幫你放上一片，剩下的再試試看";
    if (state.placed.every(Boolean)) finish();
  }
  function chips(row, items, current, onPick) {
    const host = document.getElementById(row);
    host.replaceChildren();
    items.forEach(item => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "chip" + (item.value === current ? " selected" : "");
      b.textContent = item.label;
      b.onclick = () => onPick(item.value);
      host.append(b);
    });
  }
  function boot() {
    SistersPlay.showCoach("puzzle", [{demo:"🧩➡️🖼", line:"抓住碎片，拖到圖上"}]);
  SistersPlay.mount({ title: "拼圖", onRestart: () => { state.restarts++; start(true); } });
    chips("size-row", sizes.map(n => ({ value: n, label: n + " 片" })), state.pieces, n => { state.pieces = n; state.restarts = 0; start(false); bootChips(); });
    chips("art-row", arts.map(a => ({ value: a[0], label: a[2] + a[1] })), state.art[0], id => { state.art = arts.find(a => a[0] === id); start(false); bootChips(); });
    document.getElementById("hint").onclick = hint;
    document.getElementById("overlay-next").onclick = () => start(false);
    start(false);
  }
  function bootChips() {
    chips("size-row", sizes.map(n => ({ value: n, label: n + " 片" })), state.pieces, n => { state.pieces = n; start(false); bootChips(); });
    chips("art-row", arts.map(a => ({ value: a[0], label: a[2] + a[1] })), state.art[0], id => { state.art = arts.find(a => a[0] === id); start(false); bootChips(); });
  }
  boot();
})();
