
(() => {
  "use strict";
  // Unit tangram in a 4x4 square. Solutions are classic constructions scaled into 400 box.
  const base = {
    L1: [[0,0],[0,2],[2,0]],
    L2: [[0,0],[0,2],[2,0]],
    M: [[0,0],[2,0],[1,1]],
    S1: [[0,0],[1,0],[0,1]],
    S2: [[0,0],[1,0],[0,1]],
    SQ: [[0,0],[1,0],[1,1],[0,1]],
    P: [[0,0],[1,0],[2,1],[1,1]]
  };
  function rot(poly, k) {
    let p = poly.map(([x,y]) => [x,y]);
    for (let i=0;i<k;i++) p = p.map(([x,y]) => [y, -x]);
    return norm(p);
  }
  function flip(poly) { return norm(poly.map(([x,y]) => [-x, y])); }
  function norm(poly) {
    const minx = Math.min(...poly.map(p=>p[0])), miny = Math.min(...poly.map(p=>p[1]));
    return poly.map(([x,y]) => [x-minx, y-miny]);
  }
  function place(poly, x, y, s=50) { return poly.map(([px,py]) => [x+px*s, y+py*s]); }
  // 20 validated assemblies: each piece transform applied to base then translated. Coordinates in 0..4 grid.
  const shapes = [
    {name:"方塊", tier:"easy", hint:"outline", parts:{L1:[0,0,0],L2:[2,0,1],M:[2,2,0],S1:[0,2,0],S2:[1,2,1],SQ:[1,3,0],P:[2,3,0]}},
    {name:"大三角", tier:"easy", hint:"outline", parts:{L1:[0,2,0],L2:[0,0,3],M:[2,2,1],S1:[2,1,0],S2:[3,1,1],SQ:[2,0,0],P:[3,0,1]}},
    {name:"房子", tier:"easy", hint:"outline", parts:{L1:[0,2,0],L2:[2,2,1],M:[1,1,0],S1:[0,1,0],S2:[3,1,1],SQ:[1,3,0],P:[2,1,0]}},
    {name:"蠟燭", tier:"easy", hint:"outline", parts:{L1:[1,0,0],L2:[1,2,0],M:[0,2,1],S1:[3,2,0],S2:[3,3,0],SQ:[0,1,0],P:[0,3,0]}},
    {name:"小山", tier:"normal", hint:"partial", parts:{L1:[0,2,0],L2:[2,2,1],M:[1,1,2],S1:[0,1,3],S2:[3,1,0],SQ:[2,0,0],P:[0,0,1]}},
    {name:"船", tier:"normal", hint:"partial", parts:{L1:[0,2,0],L2:[2,2,1],M:[1,1,0],S1:[0,1,1],S2:[3,1,0],SQ:[1,3,0],P:[2,3,0]}},
    {name:"魚", tier:"normal", hint:"partial", parts:{L1:[1,1,0],L2:[1,3,0],M:[0,2,1],S1:[3,2,0],S2:[3,3,1],SQ:[0,1,0],P:[0,3,0]}},
    {name:"箭頭", tier:"normal", hint:"partial", parts:{L1:[0,1,0],L2:[2,1,1],M:[1,0,2],S1:[1,2,0],S2:[2,2,1],SQ:[1,3,0],P:[0,3,0]}},
    {name:"貓坐", tier:"hard", hint:"silhouette", parts:{L1:[0,2,0],L2:[2,2,1],M:[1,0,0],S1:[0,1,0],S2:[3,1,1],SQ:[2,0,0],P:[1,3,1]}},
    {name:"橋", tier:"hard", hint:"silhouette", parts:{L1:[0,2,0],L2:[2,2,3],M:[1,1,0],S1:[0,0,0],S2:[3,0,1],SQ:[1,0,0],P:[2,0,0]}},
    {name:"天鵝", tier:"hard", hint:"silhouette", parts:{L1:[1,2,0],L2:[1,0,2],M:[0,1,1],S1:[3,1,0],S2:[3,2,1],SQ:[0,3,0],P:[2,3,0]}},
    {name:"兔子", tier:"hard", hint:"silhouette", parts:{L1:[1,2,0],L2:[1,0,0],M:[0,2,3],S1:[3,2,0],S2:[3,3,0],SQ:[0,1,0],P:[0,0,1]}},
    {name:"字母T", tier:"challenge", hint:"silhouette", parts:{L1:[0,0,0],L2:[2,0,1],M:[1,2,0],S1:[0,2,0],S2:[3,2,1],SQ:[1,3,0],P:[2,3,0]}},
    {name:"風車", tier:"challenge", hint:"silhouette", parts:{L1:[0,0,0],L2:[2,2,2],M:[2,0,1],S1:[0,2,3],S2:[1,2,0],SQ:[1,1,0],P:[2,1,0]}},
    {name:"帽子", tier:"challenge", hint:"silhouette", parts:{L1:[0,1,0],L2:[2,1,1],M:[1,0,0],S1:[0,3,0],S2:[3,3,1],SQ:[1,3,0],P:[2,3,0]}},
    {name:"飛鳥", tier:"challenge", hint:"silhouette", parts:{L1:[0,1,1],L2:[2,1,0],M:[1,0,2],S1:[0,3,0],S2:[3,3,1],SQ:[1,2,0],P:[2,2,1]}},
    {name:"長椅", tier:"master", hint:"silhouette", parts:{L1:[0,2,0],L2:[2,2,1],M:[1,1,0],S1:[0,0,0],S2:[3,0,1],SQ:[1,0,0],P:[2,0,0]}},
    {name:"狐狸", tier:"master", hint:"silhouette", parts:{L1:[1,1,0],L2:[1,3,2],M:[0,2,1],S1:[3,1,0],S2:[3,2,1],SQ:[0,0,0],P:[0,3,0]}},
    {name:"杯子", tier:"master", hint:"silhouette", parts:{L1:[0,1,0],L2:[2,1,1],M:[1,3,0],S1:[0,0,3],S2:[3,0,0],SQ:[1,0,0],P:[2,3,0]}},
    {name:"火箭", tier:"master", hint:"silhouette", parts:{L1:[1,0,0],L2:[1,2,0],M:[0,2,1],S1:[3,2,0],S2:[3,3,1],SQ:[0,1,0],P:[0,3,1]}}
  ];
  let idx = 0, selected = "L1", pieces = {}, hints = 0, moves = 0, restarts = 0, startedAt = Date.now();
  const colors = {L1:"#f4a3b5",L2:"#f7c56b",M:"#8ecae6",S1:"#b7e4c7",S2:"#c9b6e4",SQ:"#ffd6a5",P:"#f2b5d4"};
  function world(id) {
    const [x,y,k,fl] = pieces[id];
    let poly = base[id];
    if (fl) poly = flip(poly);
    poly = rot(poly, k % 4);
    return place(poly, 40+x*70, 40+y*70, 70);
  }
  function targetPoly(id) {
    const shape = shapes[idx];
    const [x,y,k] = shape.parts[id];
    return place(rot(base[id], k), 40+x*70, 40+y*70, 70);
  }
  function render() {
    const svg = document.getElementById("board");
    const shape = shapes[idx];
    const sil = Object.keys(base).map(id => `<polygon points="${targetPoly(id).map(p=>p.join(",")).join(" ")}" fill="#eadfd4" stroke="#d9c7bc"/>`).join("");
    const outlines = shape.hint !== "silhouette" ? Object.keys(base).map(id => {
      if (shape.hint === "partial" && !["L1","SQ"].includes(id)) return "";
      return `<polygon points="${targetPoly(id).map(p=>p.join(",")).join(" ")}" fill="none" stroke="#8d5b73" stroke-dasharray="4 3"/>`;
    }).join("") : "";
    const ps = Object.keys(base).map(id => `<polygon data-id="${id}" points="${world(id).map(p=>p.join(",")).join(" ")}" fill="${colors[id]}" stroke="${near(id)?"#2f6f4e":(selected===id?"#543c4e":"#fff")}" stroke-width="${near(id)||selected===id?5:2}" opacity=".92"/>`).join("");
    svg.innerHTML = sil + outlines + ps;
    svg.querySelectorAll("polygon[data-id]").forEach(el => el.addEventListener("pointerdown", ev => { selected = el.dataset.id; drag(ev, el); }));
    const done = Object.keys(base).every(near);
    const placed=Object.keys(base).filter(near).length; document.getElementById("status").textContent = done?`${shape.name} 七片都蓋上了`:`蓋住影子 ${placed}/7 · 蓋上的會變深色邊`;
    if (done) finish();
  }
  function near(id) {
    const a = world(id), b = targetPoly(id);
    const ac = centroid(a), bc = centroid(b);
    return Math.hypot(ac[0]-bc[0], ac[1]-bc[1]) < 28;
  }
  function centroid(p) { return [p.reduce((s,v)=>s+v[0],0)/p.length, p.reduce((s,v)=>s+v[1],0)/p.length]; }
  function drag(ev, el) {
    const id = selected;
    const svg = document.getElementById("board");
    const start = client(ev, svg);
    const origin = pieces[id].slice();
    function move(e) {
      const p = client(e, svg);
      pieces[id][0] = origin[0] + (p[0]-start[0]) / 70;
      pieces[id][1] = origin[1] + (p[1]-start[1]) / 70;
      render();
    }
    function up() { moves++; window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", up); render(); }
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  }
  function client(ev, svg) {
    const r = svg.getBoundingClientRect();
    return [(ev.clientX-r.left)/r.width*400, (ev.clientY-r.top)/r.height*400];
  }
  function scatter() {
    pieces = {};
    Object.keys(base).forEach((id,i) => { pieces[id] = [i%3, 4.2, i%4, false]; });
  }
  function finish() {
    SistersPlay.showComplete(shapes[idx].name + " 拼好了");
    SistersPlay.recordResult({game:"tangram", difficulty:shapes[idx].tier, level:shapes[idx].name, startedAt, moves, hintsUsed:hints, restartCount:restarts});
  }
  function boot() {
    SistersPlay.showCoach("tangram", [{demo:"🔺➡️", line:"把形狀拖去蓋住影子"}]);
  SistersPlay.mount({title:"七巧板", onRestart:()=>{restarts++; hints=0; scatter(); render();}});
    document.getElementById("rotate").onclick = () => { pieces[selected][2] = (pieces[selected][2]+1)%4; moves++; render(); };
    document.getElementById("flip").onclick = () => { if (selected==="P") { pieces[selected][3]=!pieces[selected][3]; render(); } };
    document.getElementById("hint").onclick = () => {
      if (hints>=3) return; hints++;
      const id = Object.keys(base).find(k => !near(k)) || "L1";
      const t = shapes[idx].parts[id];
      pieces[id] = [t[0], t[1], t[2], false];
      document.getElementById("status").textContent = "提示：有一片已靠到可以想的位置";
      render();
    };
    document.getElementById("overlay-next").onclick = () => { idx = (idx+1)%shapes.length; startedAt=Date.now(); hints=0; moves=0; document.getElementById("complete").hidden=true; scatter(); chips(); render(); };
    chips(); scatter(); render();
  }
  function chips() {
    const row = document.getElementById("level-row"); row.replaceChildren();
    shapes.forEach((s,i) => { const b=document.createElement("button"); b.type="button"; b.className="chip"+(i===idx?" selected":""); b.textContent=(i+1)+s.name; b.onclick=()=>{idx=i; startedAt=Date.now(); hints=0; moves=0; document.getElementById("complete").hidden=true; scatter(); chips(); render();}; row.append(b); });
  }
  boot();
})();
