(() => {
  "use strict";
  const scenes = [
    { name: "花園", src: "art/garden.jpg", spots: [{ id: "sun", x: 70, y: 40, w: 90, h: 80 }, { id: "bowl", x: 430, y: 250, w: 110, h: 100 }, { id: "flower", x: 40, y: 300, w: 90, h: 90 }] },
    { name: "房間", src: "art/room.jpg", spots: [{ id: "lamp", x: 40, y: 160, w: 90, h: 90 }, { id: "book", x: 140, y: 300, w: 90, h: 70 }, { id: "cat", x: 470, y: 230, w: 100, h: 100 }] }
  ];
  let scene = 0, found = new Set(), startedAt = Date.now();
  function start() {
    found = new Set(); startedAt = Date.now();
    document.getElementById("complete").hidden = true;
    const s = scenes[scene];
    const host = document.getElementById("scene");
    host.innerHTML = `<div class="pair"><figure><figcaption>原圖 · ${s.name}</figcaption><img src="${s.src}" alt="${s.name}"></figure><figure><figcaption>找這裡</figcaption><canvas id="changed" width="640" height="420"></canvas></figure></div>`;
    const img = new Image();
    img.onload = () => draw(img);
    img.src = s.src;
    document.getElementById("status").textContent = "左邊原圖，點右邊不一樣的 · 0/3";
  }
  function draw(img) {
    const canvas = document.getElementById("changed");
    const g = canvas.getContext("2d");
    const s = scenes[scene];
    g.drawImage(img, 0, 0, canvas.width, canvas.height);
    s.spots.forEach(spot => {
      if (found.has(spot.id)) return;
      g.fillStyle = "rgba(109,91,208,.85)";
      g.beginPath();
      g.arc(spot.x + spot.w / 2, spot.y + spot.h / 2, 16, 0, 7);
      g.fill();
    });
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
  SistersPlay.showCoach("spot", [{ demo: "👀", line: "左邊原圖，點右邊紫色的不同" }]);
  SistersPlay.mount({ title: "找不同", onRestart: start });
  document.getElementById("overlay-next").onclick = () => { scene = (scene + 1) % scenes.length; start(); };
  start();
})();
