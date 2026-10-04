(() => {
  "use strict";
  const scenes = [
    {
      name: "花園", src: "art/garden.jpg",
      spots: [{ id: "sun", x: 40, y: 20, w: 120, h: 110 }, { id: "bowl", x: 470, y: 240, w: 130, h: 120 }, { id: "flower", x: 20, y: 280, w: 110, h: 110 }],
      paint(g, found) {
        if (!found.has("sun")) { g.fillStyle = "#6d5bd0"; g.beginPath(); g.arc(105, 78, 34, 0, 7); g.fill(); }
        if (!found.has("bowl")) { g.fillStyle = "#7dbb6a"; g.beginPath(); g.arc(545, 300, 42, 0, 7); g.fill(); }
        if (!found.has("flower")) { g.fillStyle = "#f4a3b5"; g.beginPath(); g.arc(78, 330, 22, 0, 7); g.fill(); g.fillStyle = "#ffe08a"; g.beginPath(); g.arc(78, 330, 8, 0, 7); g.fill(); }
      }
    },
    {
      name: "房間", src: "art/room.jpg",
      spots: [{ id: "lamp", x: 20, y: 150, w: 110, h: 120 }, { id: "book", x: 120, y: 280, w: 110, h: 90 }, { id: "cat", x: 450, y: 210, w: 120, h: 120 }],
      paint(g, found) {
        if (!found.has("lamp")) { g.fillStyle = "#f7c56b"; g.fillRect(48, 175, 36, 48); }
        if (!found.has("book")) { g.fillStyle = "#e7d7c3"; g.fillRect(145, 310, 70, 36); }
        if (!found.has("cat")) { g.fillStyle = "#d7c4ae"; g.beginPath(); g.arc(520, 270, 36, 0, 7); g.fill(); }
      }
    }
  ];
  let scene = 0, found = new Set(), startedAt = Date.now();
  function start() {
    found = new Set(); startedAt = Date.now();
    document.getElementById("complete").hidden = true;
    const s = scenes[scene];
    document.getElementById("scene").innerHTML = `<div class="pair"><figure><figcaption>原圖 · ${s.name}</figcaption><img src="${s.src}" alt="${s.name}"></figure><figure><figcaption>找這裡</figcaption><canvas id="changed" width="640" height="420"></canvas></figure></div>`;
    const img = new Image();
    img.onload = () => draw(img);
    img.src = s.src;
    document.getElementById("status").textContent = "左邊原圖，點右邊不一樣的 · 0/3";
  }
  function draw(img) {
    const canvas = document.getElementById("changed");
    const s = scenes[scene];
    const g = canvas.getContext("2d");
    g.drawImage(img, 0, 0, canvas.width, canvas.height);
    s.paint(g, found);
    canvas.onclick = (ev) => {
      const rect = canvas.getBoundingClientRect();
      const x = (ev.clientX - rect.left) / rect.width * canvas.width;
      const y = (ev.clientY - rect.top) / rect.height * canvas.height;
      const hit = s.spots.find(sp => x > sp.x && x < sp.x + sp.w && y > sp.y && y < sp.y + sp.h);
      if (!hit || found.has(hit.id)) return;
      found.add(hit.id);
      SistersPlay.playSound("ok");
      draw(img);
      document.getElementById("status").textContent = `左邊原圖，點右邊不一樣的 · ${found.size}/3`;
      if (found.size === 3) {
        SistersPlay.showComplete(`${s.name}找到了`);
        SistersPlay.recordResult({ game: "spot", difficulty: "3", level: s.name, startedAt, moves: 3 });
      }
    };
  }
  SistersPlay.showCoach("spot", [{ demo: "👀", line: "左邊原圖，點右邊不一樣的" }]);
  SistersPlay.mount({ title: "找不同", onRestart: start });
  document.getElementById("overlay-next").onclick = () => { scene = (scene + 1) % scenes.length; start(); };
  start();
})();
