(() => {
  "use strict";
  const scenes = ["公園", "房間"];
  let scene = 0, found = new Set(), marks = [], startedAt = Date.now();
  function start() {
    found = new Set(); startedAt = Date.now();
    marks = [
      { id: "ball", label: "球", change: "顏色不同" },
      { id: "tree", label: "樹", change: "少一棵" },
      { id: "house", label: "房子", change: "位置不同" }
    ];
    document.getElementById("complete").hidden = true;
    render();
  }
  function card(changed) {
    const box = document.createElement("div");
    box.className = "spot-card";
    box.innerHTML = `<p>${changed ? "找這裡" : "原圖"} · ${scenes[scene]}</p>`;
    const items = [
      { id: "ball", text: "球", color: "#f4a3b5" },
      { id: "tree", text: "樹", color: "#2f6f4e" },
      { id: "house", text: "房子", color: "#d45d6b" }
    ];
    items.forEach(item => {
      const mark = marks.find(m => m.id === item.id);
      if (changed && mark && mark.change === "少一棵") return;
      const el = document.createElement("button");
      el.type = "button";
      el.textContent = item.text;
      el.style.background = changed && mark && mark.change === "顏色不同" ? "#6d5bd0" : item.color;
      el.style.marginLeft = changed && mark && mark.change === "位置不同" ? "28px" : "0";
      if (changed) el.onclick = () => hit(item.id);
      box.append(el);
    });
    return box;
  }
  function render() {
    const host = document.getElementById("scene");
    host.replaceChildren();
    const pair = document.createElement("div");
    pair.className = "pair";
    pair.append(card(false), card(true));
    host.append(pair);
    document.getElementById("status").textContent = `左邊原圖，點右邊不一樣的 · ${found.size}/3`;
  }
  function hit(id) {
    found.add(id); render();
    if (found.size === 3) {
      SistersPlay.showComplete("找到了");
      SistersPlay.recordResult({ game: "spot", difficulty: "3", level: scenes[scene], startedAt, moves: 3 });
    }
  }
  SistersPlay.mount({ title: "找不同", onRestart: start });
  document.getElementById("overlay-next").onclick = () => { scene = (scene + 1) % scenes.length; start(); };
  start();
})();
