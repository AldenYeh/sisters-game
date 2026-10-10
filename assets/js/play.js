
(() => {
  "use strict";
  const RESULT_KEY = "sistersGameResultsV1";
  function player() {
    try { return window.SistersRound?.player() || window.SistersShared.loadPlayer() || "guest"; } catch (_) { return "guest"; }
  }
  function loadResults() {
    try {
      const raw = JSON.parse(localStorage.getItem(RESULT_KEY) || "[]");
      return Array.isArray(raw) ? raw : [];
    } catch (_) { return []; }
  }
  function recordResult(entry) {
    return window.SistersRound.complete(entry);
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
    if (back) back.onclick = () => { SistersRound.leave("../../index.html#games/logic"); };
    const restart = document.getElementById("restart");
    if (restart && opts.onRestart) restart.onclick = opts.onRestart;
    if (restart && !document.getElementById("mute")) {
      const mute = document.createElement("button");
      mute.id = "mute"; mute.type = "button"; mute.className = "secondary-button";
      mute.textContent = muted() ? "開聲音" : "靜音";
      mute.onclick = () => { try { localStorage.setItem("sistersMuted", muted() ? "0" : "1"); } catch (_) {} mute.textContent = muted() ? "開聲音" : "靜音"; };
      restart.after(mute);
    }
  }
  function showComplete(text) {
    const el = document.getElementById("complete");
    if (!el) return;
    el.hidden = false;
    const p = el.querySelector("p");
    if (p) p.textContent = text;
  }
  
  function muted(){ try { return localStorage.getItem('sistersMuted')==='1'; } catch(_) { return false; } }
  function tone(freq, dur, type) {
    if (muted()) return;
    try {
      const ctx = tone.ctx || (tone.ctx = new (window.AudioContext || window.webkitAudioContext)());
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = type || "sine";
      o.frequency.value = freq;
      g.gain.setValueAtTime(0.0001, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
      o.connect(g); g.connect(ctx.destination);
      o.start(); o.stop(ctx.currentTime + dur);
    } catch (_) {}
  }
  function playSound(name) {
    if (name === "ok") { tone(520, 0.12); tone(680, 0.16); }
    else if (name === "win") { tone(523, 0.12); setTimeout(() => tone(659, 0.12), 90); setTimeout(() => tone(784, 0.2), 180); }
    else if (name === "soft") tone(300, 0.06, "triangle");
    else tone(240, 0.08, "triangle");
  }
function showCoach(gameId, steps) {
    if (!steps || !steps.length) return;
    const key = "sistersCoachSeenV1:" + gameId;
    try { if (localStorage.getItem(key)) return; } catch (_) {}
    const overlay = document.createElement("div");
    overlay.className = "coach";
    let i = 0;
    function draw() {
      const step = steps[i];
      overlay.innerHTML = `<div class="coach-card"><div class="coach-demo">${step.demo}</div><p>${step.line}</p><button type="button" class="primary-button">${i === steps.length-1 ? "開始" : "下一步"}</button></div>`;
      overlay.querySelector("button").onclick = () => {
        i++;
        if (i >= steps.length) { try { localStorage.setItem(key, "1"); } catch (_) {} overlay.remove(); }
        else draw();
      };
    }
    draw();
    document.body.append(overlay);
  }
  window.SistersPlay = Object.freeze({ RESULT_KEY, player, loadResults, recordResult, mount, showComplete, showCoach, playSound });
})();
