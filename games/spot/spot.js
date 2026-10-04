(() => {
  "use strict";
  const scenes = [
    { name: "花園", a: "art/garden.jpg", b: "art/garden-b.jpg", spots: [{ id: "moon", x: 4, y: 4, w: 24, h: 22 }, { id: "bowl", x: 60, y: 60, w: 24, h: 28 }, { id: "butterfly", x: 16, y: 62, w: 18, h: 18 }] },
    { name: "房間", a: "art/room.jpg", b: "art/room-b.jpg", spots: [{ id: "lamp", x: 2, y: 28, w: 16, h: 28 }, { id: "book", x: 20, y: 76, w: 18, h: 18 }, { id: "bow", x: 66, y: 52, w: 18, h: 28 }] },
    { name: "海底", a: "art/sea.jpg", b: "art/sea-b.jpg", spots: [{ id: "fish", x: 14, y: 24, w: 28, h: 28 }, { id: "crab", x: 60, y: 62, w: 28, h: 28 }, { id: "star", x: 66, y: 76, w: 16, h: 16 }] },
    { name: "野餐", a: "art/picnic.jpg", b: "art/picnic-b.jpg", spots: [{ id: "apple", x: 44, y: 62, w: 16, h: 20 }, { id: "kite", x: 60, y: 2, w: 22, h: 24 }, { id: "collar", x: 70, y: 58, w: 20, h: 28 }] }
  ];
  let scene = 0, found = new Set(), startedAt = Date.now();
  function start() {
    found = new Set(); startedAt = Date.now();
    document.getElementById("complete").hidden = true;
    render();
  }
  function render() {
    const s = scenes[scene];
    const host = document.getElementById("scene");
    host.innerHTML = `<div class="pair"><figure><figcaption>原圖 · ${s.name}</figcaption><img src="${s.a}" alt="${s.name}"></figure><figure><figcaption>找這裡</figcaption><div class="find"><img src="${s.b}" alt="${s.name}找不同"><div class="hits"></div></div></figure></div>`;
    const hits = host.querySelector(".hits");
    s.spots.forEach(sp => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "hit" + (found.has(sp.id) ? " found" : "");
      b.style.left = sp.x + "%"; b.style.top = sp.y + "%"; b.style.width = sp.w + "%"; b.style.height = sp.h + "%";
      b.onclick = () => mark(sp.id);
      hits.append(b);
    });
    chips();
    document.getElementById("status").textContent = `左邊原圖，點右邊不一樣的 · ${found.size}/${s.spots.length}`;
  }
  function mark(id) {
    if (found.has(id)) return;
    found.add(id);
    SistersPlay.playSound("ok");
    render();
    if (found.size === scenes[scene].spots.length) {
      SistersPlay.showComplete(`${scenes[scene].name}找到了`);
      SistersPlay.recordResult({ game: "spot", difficulty: "3", level: scenes[scene].name, startedAt, moves: found.size });
    }
  }
  function chips() {
    let row = document.getElementById("diff-row");
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
