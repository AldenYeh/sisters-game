(() => {
  "use strict";
  let found = new Set(), startedAt = Date.now();
  const spots = [
    { id: "sun", x: 70, y: 40, w: 90, h: 80, label: "太陽變了" },
    { id: "bowl", x: 430, y: 250, w: 110, h: 100, label: "魚缸不見了" },
    { id: "flower", x: 40, y: 300, w: 90, h: 90, label: "花多了一朵" }
  ];
  function start() {
    found = new Set(); startedAt = Date.now();
    document.getElementById("complete").hidden = true;
    const host = document.getElementById("scene");
    host.innerHTML = `<div class="pair"><figure><figcaption>原圖</figcaption><img src="art/garden.jpg" alt="花園原圖"></figure><figure><figcaption>找這裡</figcaption><canvas id="changed" width="640" height="420"></canvas></figure></div>`;
    const img = new Image();
    img.onload = () => draw(img);
    img.src = "art/garden.jpg";
    document.getElementById("status").textContent = "左邊原圖，點右邊不一樣的 · 0/3";
  }
  function draw(img) {
    const canvas = document.getElementById("changed");
    const g = canvas.getContext("2d");
    g.drawImage(img, 0, 0, canvas.width, canvas.height);
    if (!found.has("sun")) { g.fillStyle = "#6d5bd0"; g.beginPath(); g.arc(105, 78, 28, 0, 7); g.fill(); }
    if (!found.has("bowl")) { g.fillStyle = "#7dbb6a"; g.fillRect(500, 280, 90, 70); }
    if (!found.has("flower")) { g.fillStyle = "#f4a3b5"; g.beginPath(); g.arc(80, 340, 18, 0, 7); g.fill(); }
    canvas.onclick = (ev) => {
      const rect = canvas.getBoundingClientRect();
      const x = (ev.clientX - rect.left) / rect.width * canvas.width;
      const y = (ev.clientY - rect.top) / rect.height * canvas.height;
      const hit = spots.find(s => x > s.x && x < s.x + s.w && y > s.y && y < s.y + s.h);
      if (!hit || found.has(hit.id)) return;
      found.add(hit.id);
      SistersPlay.playSound("ok");
      draw(img);
      document.getElementById("status").textContent = `左邊原圖，點右邊不一樣的 · ${found.size}/3`;
      if (found.size === 3) {
        SistersPlay.showComplete("找到了");
        SistersPlay.recordResult({ game: "spot", difficulty: "3", level: "花園", startedAt, moves: 3 });
      }
    };
  }
  SistersPlay.showCoach("spot", [{ demo: "👀", line: "左邊原圖，點右邊不一樣的" }]);
  SistersPlay.mount({ title: "找不同", onRestart: start });
  document.getElementById("overlay-next").onclick = start;
  start();
})();
