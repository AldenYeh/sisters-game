(() => {
  "use strict";
  let found = new Set(), startedAt = Date.now();
  const diffs = [
    { id: "ball", title: "球變色" },
    { id: "tree", title: "少一棵樹" },
    { id: "house", title: "房子挪了" }
  ];
  function shape(id, changed) {
    if (id === "ball") return `<circle cx="${changed ? 210 : 70}" cy="120" r="18" fill="${changed ? "#6d5bd0" : "#f4a3b5"}"/>`;
    if (id === "tree") return changed ? "" : `<rect x="150" y="120" width="10" height="28" fill="#8d5b46"/><circle cx="155" cy="108" r="16" fill="#2f6f4e"/>`;
    return `<rect x="${changed ? 250 : 40}" y="130" width="36" height="26" fill="#d45d6b"/>`;
  }
  function panel(changed) {
    let body = `<rect width="320" height="200" fill="#d7eef8"/><rect y="150" width="320" height="50" fill="#b7e4c7"/>`;
    ["ball", "tree", "house"].forEach(id => { body += shape(id, changed); });
    if (changed) diffs.forEach(d => { body += `<rect class="hit" data-id="${d.id}" x="${d.id==="ball"?190:d.id==="tree"?130:230}" y="80" width="70" height="70" fill="transparent"/>`; });
    return `<svg viewBox="0 0 320 200">${body}<text x="12" y="22" font-size="14" fill="#3d3338">${changed ? "找這裡" : "原圖"}</text></svg>`;
  }
  function start() {
    found = new Set(); startedAt = Date.now();
    document.getElementById("complete").hidden = true;
    const host = document.getElementById("scene");
    host.innerHTML = `<div class="pair">${panel(false)}${panel(true)}</div>`;
    host.querySelectorAll(".hit").forEach(n => n.addEventListener("click", () => {
      found.add(n.dataset.id);
      n.setAttribute("fill", "#b7e4c788");
      document.getElementById("status").textContent = `左邊原圖，點右邊不一樣的 · ${found.size}/3`;
      if (found.size === 3) {
        SistersPlay.showComplete("找到了");
        SistersPlay.recordResult({ game: "spot", difficulty: "3", level: "公園", startedAt, moves: 3 });
      }
    }));
    document.getElementById("status").textContent = "左邊原圖，點右邊不一樣的 · 0/3";
  }
  SistersPlay.mount({ title: "找不同", onRestart: start });
  document.getElementById("overlay-next").onclick = start;
  start();
})();
