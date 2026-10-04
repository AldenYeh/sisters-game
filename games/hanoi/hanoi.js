(() => {
  "use strict";
  let n = 3, pegs = [], moves = 0, startedAt = Date.now(), restarts = 0;
  function start() {
    pegs = [Array.from({ length: n }, (_, i) => n - i), [], []];
    moves = 0; startedAt = Date.now();
    document.getElementById("complete").hidden = true;
    render();
  }
  function render() {
    const host = document.getElementById("pegs");
    host.replaceChildren();
    pegs.forEach((peg, i) => {
      const col = document.createElement("div");
      col.className = "peg";
      col.dataset.i = String(i);
      const tag = document.createElement("span");
      tag.className = "peg-tag";
      tag.textContent = peg.length ? "" : "空柱";
      col.append(tag);
      peg.forEach((d, idx) => {
        const el = document.createElement("div");
        el.className = "disc";
        el.style.width = (42 + d * 24) + "px";
        el.style.background = `hsl(${d * 36},70%,72%)`;
        if (idx === peg.length - 1) el.addEventListener("pointerdown", ev => drag(ev, i, d, el));
        col.append(el);
      });
      host.append(col);
    });
    document.getElementById("status").textContent = `抓住最上面的圓盤，拖到右邊 · ${n} 層 · ${moves} 步`;
  }
  function legal(from, to, disc) {
    if (from === to) return true;
    const peg = pegs[to];
    return !peg.length || peg[peg.length - 1] > disc;
  }
  function drag(ev, from, disc, el) {
    ev.preventDefault();
    const ghost = el.cloneNode();
    ghost.style.position = "fixed";
    ghost.style.zIndex = "9";
    ghost.style.pointerEvents = "none";
    ghost.style.left = ev.clientX - el.offsetWidth / 2 + "px";
    ghost.style.top = ev.clientY - 16 + "px";
    document.body.append(ghost);
    el.style.opacity = ".35";
    function move(e) {
      ghost.style.left = e.clientX - el.offsetWidth / 2 + "px";
      ghost.style.top = e.clientY - 16 + "px";
      document.querySelectorAll(".peg").forEach(col => {
        const i = +col.dataset.i;
        col.classList.toggle("legal", legal(from, i, disc));
        col.classList.toggle("illegal", !legal(from, i, disc));
      });
    }
    function up(e) {
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerup", up);
      ghost.remove();
      const cols = [...document.querySelectorAll(".peg")];
      const hit = cols.findIndex(col => {
        const r = col.getBoundingClientRect();
        return e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      });
      if (hit >= 0 && hit !== from && legal(from, hit, disc)) {
        pegs[hit].push(pegs[from].pop());
        moves++;
        SistersPlay.playSound("ok");
      } else if (hit >= 0 && hit !== from) SistersPlay.playSound("soft");
      render();
      if (pegs[2].length === n) {
        SistersPlay.showComplete(`圓盤都到右邊了，用了 ${moves} 步`);
        SistersPlay.recordResult({ game: "hanoi", difficulty: String(n), level: n, startedAt, moves, restartCount: restarts });
      }
    }
    document.addEventListener("pointermove", move);
    document.addEventListener("pointerup", up);
  }
  function chips() {
    const row = document.getElementById("disc-row");
    row.replaceChildren();
    [3, 4, 5, 6, 7].forEach(d => {
      const b = document.createElement("button");
      b.type = "button"; b.className = "chip" + (d === n ? " selected" : ""); b.textContent = d + " 層";
      b.onclick = () => { n = d; chips(); start(); };
      row.append(b);
    });
  }
  SistersPlay.showCoach("hanoi", [{ demo: "🔴➡️", line: "抓住圓盤，拖到右邊柱子" }]);
  SistersPlay.mount({ title: "河內塔", onRestart: () => { restarts++; start(); } });
  document.getElementById("overlay-next").onclick = () => start();
  chips(); start();
})();
