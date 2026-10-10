(async () => {
  "use strict";
  const scenes = [
    { name: "花園", a: "art/garden.jpg", b: "art/garden-b.jpg", spots: [{ id: "moon", x: 6, y: 4, w: 22, h: 22 }, { id: "bowl", x: 60, y: 62, w: 22, h: 24 }, { id: "bug", x: 16, y: 64, w: 16, h: 16 }] },
    { name: "房間", a: "art/room.jpg", b: "art/room-b.jpg", spots: [{ id: "lamp", x: 2, y: 30, w: 16, h: 26 }, { id: "book", x: 20, y: 74, w: 16, h: 16 }, { id: "bow", x: 66, y: 52, w: 16, h: 24 }] },
    { name: "海底", a: "art/sea.jpg", b: "art/sea-b.jpg", spots: [{ id: "fish", x: 14, y: 24, w: 28, h: 28 }, { id: "crab", x: 60, y: 62, w: 26, h: 26 }, { id: "star", x: 64, y: 74, w: 16, h: 16 }] },
    { name: "野餐", a: "art/picnic.jpg", b: "art/picnic-b.jpg", spots: [{ id: "apple", x: 44, y: 62, w: 14, h: 18 }, { id: "kite", x: 60, y: 2, w: 20, h: 22 }, { id: "collar", x: 70, y: 58, w: 18, h: 24 }] },
    { name: "廚房", a: "art/kitchen.jpg", b: "art/kitchen-b.jpg", spots: [{ id: "apple", x: 12, y: 46, w: 16, h: 22 }, { id: "cup", x: 28, y: 44, w: 16, h: 20 }, { id: "bow", x: 66, y: 40, w: 20, h: 36 }] }
  ];
  let scene = 0, found = new Set(), startedAt = Date.now();
  async function start(reason="new",nextScene=scene) {return SistersRound.start(()=>{scene=nextScene;
    found = new Set(); startedAt = Date.now();
    document.getElementById("complete").hidden = true;
    const s = scenes[scene];
    document.getElementById("scene").innerHTML = `<div class="pair"><figure><figcaption>原圖</figcaption><img src="${s.a}" alt="${s.name}"></figure><figure><figcaption>找不同 · ${s.name}</figcaption><div class="find"><img src="${s.b}" alt="${s.name}找不同"><div class="hits"></div></div></figure></div>`;
    const hits = document.querySelector(".hits");
    s.spots.forEach(sp => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "hit" + (found.has(sp.id) ? " found" : "");
      b.style.left = sp.x + "%"; b.style.top = sp.y + "%"; b.style.width = sp.w + "%"; b.style.height = sp.h + "%";
      b.setAttribute("aria-label",`找不同區域 ${s.spots.indexOf(sp)+1}`); b.onclick = () => mark(sp.id);
      hits.append(b);
    });
    document.getElementById("status").textContent = `點右邊不一樣的地方 · ${found.size}/3`;
    chips();
  },reason);}
  function mark(id) {
    if(!SistersRound.canInteract())return;
    if (found.has(id)) return;
    found.add(id);
    SistersPlay.playSound("ok");
    startKeep(); SistersRound.checkpoint();
  }
  function startKeep() {
    const keep = found;
    const s = scenes[scene];
    document.getElementById("scene").innerHTML = `<div class="pair"><figure><figcaption>原圖</figcaption><img src="${s.a}" alt="${s.name}"></figure><figure><figcaption>找不同 · ${s.name}</figcaption><div class="find"><img src="${s.b}" alt="${s.name}找不同"><div class="hits"></div></div></figure></div>`;
    document.querySelector(".hits").replaceChildren();
    s.spots.forEach(sp => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "hit" + (keep.has(sp.id) ? " found" : "");
      b.style.left = sp.x + "%"; b.style.top = sp.y + "%"; b.style.width = sp.w + "%"; b.style.height = sp.h + "%";
      b.setAttribute("aria-label",`找不同區域 ${s.spots.indexOf(sp)+1}`); b.onclick = () => mark(sp.id);
      document.querySelector(".hits").append(b);
    });
    document.getElementById("status").textContent = `點右邊不一樣的地方 · ${keep.size}/3`;
    if (keep.size === 3) {
      SistersPlay.showComplete(s.name + "找到了");
      SistersPlay.recordResult({ game: "spot", difficulty: "3", level: s.name, startedAt, moves: 3 });
    }
  }
  function chips() {
    const row = document.getElementById("diff-row");
    if (!row) return;
    row.replaceChildren();
    scenes.forEach((s, i) => {
      const b = document.createElement("button");
      b.type = "button"; b.className = "chip" + (i === scene ? " selected" : ""); b.textContent = s.name;
      b.onclick = () => start("new",i);
      row.append(b);
    });
  }
  SistersPlay.showCoach("spot", [{ demo: "👀", line: "左邊原圖，點右邊不一樣的" }]);
  SistersPlay.mount({ title: "找不同", onRestart: ()=>start("restart") });
  document.getElementById("overlay-next").onclick = () => start("new",(scene+1)%scenes.length);
  if(!await SistersRound.attach({snapshot:()=>({scene,found:[...found],startedAt}),restore:p=>{scene=p.scene;found=new Set(p.found);startedAt=p.startedAt;chips();startKeep();}})) await start();
})();
