
(() => {
  "use strict";
  const RESULT_KEY = "sistersGameResultsV1";
  function player() {
    try { return window.SistersShared.loadPlayer() || "guest"; } catch (_) { return "guest"; }
  }
  function loadResults() {
    try {
      const raw = JSON.parse(localStorage.getItem(RESULT_KEY) || "[]");
      return Array.isArray(raw) ? raw : [];
    } catch (_) { return []; }
  }
  function recordResult(entry) {
    const row = {
      player: entry.player || player(),
      game: entry.game,
      difficulty: entry.difficulty || "",
      level: entry.level ?? "",
      startedAt: entry.startedAt || Date.now(),
      completedAt: entry.completedAt || Date.now(),
      duration: entry.duration ?? Math.max(0, (entry.completedAt || Date.now()) - (entry.startedAt || Date.now())),
      moves: entry.moves ?? 0,
      attempts: entry.attempts ?? 1,
      hintsUsed: entry.hintsUsed ?? 0,
      restartCount: entry.restartCount ?? 0
    };
    const all = loadResults();
    all.push(row);
    try { localStorage.setItem(RESULT_KEY, JSON.stringify(all.slice(-400))); } catch (_) {}
    return row;
  }
  function mount(opts) {
    const title = document.getElementById("play-title");
    if (title) title.textContent = opts.title;
    const badge = document.getElementById("player-badge");
    if (badge) {
      const id = player();
      const p = window.SISTERS_CONTENT && window.SISTERS_CONTENT.players[id];
      badge.textContent = p ? `${p.icon} ${p.name.zh}` : "客人";
    }
    const back = document.getElementById("back-home");
    if (back) back.onclick = () => { location.href = "../../index.html#games/logic"; };
    const restart = document.getElementById("restart");
    if (restart && opts.onRestart) restart.onclick = opts.onRestart;
  }
  function showComplete(text) {
    const el = document.getElementById("complete");
    if (!el) return;
    el.hidden = false;
    const p = el.querySelector("p");
    if (p) p.textContent = text;
  }
  window.SistersPlay = Object.freeze({ RESULT_KEY, player, loadResults, recordResult, mount, showComplete });
})();
