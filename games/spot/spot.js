(() => {
  "use strict";
  const scenes = [
    { name: "花園", src: "art/garden.jpg", spots: [
      { id: "moon", x: 4, y: 2, w: 22, h: 24, paint(g, w, h) { g.fillStyle = "#8d7ad8"; g.beginPath(); g.arc(w * 0.14, h * 0.14, h * 0.07, 0.4, 5.4); g.lineWidth = 10; g.strokeStyle = "#8d7ad8"; g.stroke(); } },
      { id: "bowl", x: 58, y: 58, w: 26, h: 28, paint(g, w, h) { g.fillStyle = "#9fd0ef"; g.beginPath(); g.ellipse(w * 0.73, h * 0.74, w * 0.045, h * 0.04, 0, 0, 7); g.fill(); } },
      { id: "bug", x: 14, y: 60, w: 18, h: 20, paint(g, w, h) { g.fillStyle = "#4aa3d8"; g.beginPath(); g.ellipse(w * 0.24, h * 0.72, 16, 10, 0, 0, 7); g.fill(); g.beginPath(); g.ellipse(w * 0.24 - 14, h * 0.72, 10, 7, 0, 0, 7); g.fill(); } }
    ] },
    { name: "房間", src: "art/room.jpg", spots: [
      { id: "lamp", x: 3, y: 30, w: 14, h: 24, paint(g, w, h) { g.fillStyle = "#3d3338"; g.fillRect(w * 0.05, h * 0.38, w * 0.06, h * 0.1); } },
      { id: "book", x: 20, y: 74, w: 16, h: 16, paint(g, w, h) { g.fillStyle = "#e7d3bc"; g.fillRect(w * 0.22, h * 0.8, w * 0.08, h * 0.07); } },
      { id: "bow", x: 68, y: 54, w: 14, h: 18, paint(g, w, h) { g.fillStyle = "#f4a3b5"; g.beginPath(); g.arc(w * 0.74, h * 0.62, 10, 0, 7); g.fill(); } }
    ] },
    { name: "海底", src: "art/sea.jpg", spots: [
      { id: "fish", x: 16, y: 26, w: 26, h: 26, paint(g, w, h) { g.fillStyle = "rgba(244,163,181,.55)"; g.beginPath(); g.ellipse(w * 0.28, h * 0.4, w * 0.08, h * 0.08, 0, 0, 7); g.fill(); } },
      { id: "crab", x: 62, y: 64, w: 24, h: 24, paint(g, w, h) { g.fillStyle = "#f0d7a8"; g.beginPath(); g.ellipse(w * 0.74, h * 0.78, w * 0.06, h * 0.05, 0, 0, 7); g.fill(); } },
      { id: "star", x: 66, y: 76, w: 14, h: 14, paint(g, w, h) { g.fillStyle = "#e07a3d"; g.beginPath(); g.arc(w * 0.72, h * 0.84, 12, 0, 7); g.fill(); } }
    ] },
    { name: "野餐", src: "art/picnic.jpg", spots: [
      { id: "apple", x: 44, y: 62, w: 14, h: 18, paint(g, w, h) { g.fillStyle = "#7dbb6a"; g.beginPath(); g.arc(w * 0.51, h * 0.72, 16, 0, 7); g.fill(); } },
      { id: "kite", x: 60, y: 2, w: 20, h: 22, paint(g, w, h) { g.fillStyle = "#b7e3f5"; g.fillRect(w * 0.62, h * 0.04, w * 0.12, h * 0.14); } },
      { id: "collar", x: 72, y: 60, w: 16, h: 20, paint(g, w, h) { g.strokeStyle = "#d25b6a"; g.lineWidth = 6; g.beginPath(); g.arc(w * 0.8, h * 0.7, 18, 0.2, 2.8); g.stroke(); } }
    ] }
  ];
  let scene = 0, found = new Set(), startedAt = Date.now();
  function start() {
    found = new Set(); startedAt = Date.now();
    document.getElementById("complete").hidden = true;
    const s = scenes[scene];
    document.getElementById("scene").innerHTML = `<div class="pair"><figure><figcaption>原圖 · ${s.name}</figcaption><img src="${s.src}" alt="${s.name}"></figure><figure><figcaption>找這裡</figcaption><div class="find"><canvas id="changed" width="640" height="420"></canvas><div class="hits"></div></div></figure></div>`;
    const img = new Image();
    img.onload = () => draw(img);
    img.src = s.src;
  }
  function draw(img) {
    const canvas = document.getElementById("changed");
    const g = canvas.getContext("2d");
    g.drawImage(img, 0, 0, canvas.width, canvas.height);
    scenes[scene].spots.forEach(sp => { if (!found.has(sp.id)) sp.paint(g, canvas.width, canvas.height); });
    const hits = document.querySelector(".hits");
    hits.replaceChildren();
    scenes[scene].spots.forEach(sp => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "hit" + (found.has(sp.id) ? " found" : "");
      b.style.left = sp.x + "%"; b.style.top = sp.y + "%"; b.style.width = sp.w + "%"; b.style.height = sp.h + "%";
      b.onclick = () => mark(sp.id, img);
      hits.append(b);
    });
    document.getElementById("status").textContent = `同一張圖，點右邊不一樣的 · ${found.size}/3`;
    chips();
  }
  function mark(id, img) {
    if (found.has(id)) return;
    found.add(id);
    SistersPlay.playSound("ok");
    draw(img);
    if (found.size === 3) {
      SistersPlay.showComplete(scenes[scene].name + "找到了");
      SistersPlay.recordResult({ game: "spot", difficulty: "3", level: scenes[scene].name, startedAt, moves: 3 });
    }
  }
  function chips() {
    const row = document.getElementById("diff-row");
    if (!row) return;
    row.replaceChildren();
    scenes.forEach((s, i) => {
      const b = document.createElement("button");
      b.type = "button"; b.className = "chip" + (i === scene ? " selected" : ""); b.textContent = s.name;
      b.onclick = () => { scene = i; start(); };
      row.append(b);
    });
  }
  SistersPlay.showCoach("spot", [{ demo: "👀", line: "左邊原圖，點右邊不一樣的" }]);
  SistersPlay.mount({ title: "找不同", onRestart: start });
  document.getElementById("overlay-next").onclick = () => { scene = (scene + 1) % scenes.length; start(); };
  start();
})();
