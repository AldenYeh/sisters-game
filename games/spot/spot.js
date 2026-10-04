(() => {
  "use strict";
  const scenes = [
    {name:"公園", bg:"#d7f0c8", items:[{k:"tree",x:50,y:150,d:"🌳"},{k:"sun",x:250,y:40,d:"☀️"},{k:"ball",x:160,y:170,d:"⚽"},{k:"kid",x:200,y:140,d:"🧒"},{k:"flower",x:90,y:180,d:"🌸"},{k:"bird",x:300,y:70,d:"🐦"}]},
    {name:"房間", bg:"#fff1d6", items:[{k:"bed",x:70,y:150,d:"🛏️"},{k:"lamp",x:250,y:80,d:"💡"},{k:"book",x:180,y:160,d:"📘"},{k:"cat",x:140,y:120,d:"🐱"},{k:"clock",x:300,y:50,d:"🕒"},{k:"plant",x:40,y:80,d:"🪴"}]},
    {name:"海底", bg:"#c7f0f4", items:[{k:"fish",x:80,y:80,d:"🐟"},{k:"star",x:200,y:150,d:"starfish"},{k:"shell",x:140,y:180,d:"🐚"},{k:"crab",x:260,y:160,d:"🦀"},{k:"weed",x:40,y:170,d:"🌿"},{k:"bubble",x:300,y:60,d:"🫧"}]}
  ];
  const counts=[3,5,8];
  let scene=0, count=3, found=new Set(), diffs=[], startedAt=Date.now();
  function start(){
    found=new Set(); startedAt=Date.now();
    const items=scenes[scene].items;
    diffs=items.slice(0, Math.min(count, items.length)).map((item,i)=>({...item, id:i, change:["missing","color","extra"][i%3]}));
    document.getElementById("complete").hidden=true; render();
  }
  function panel(changed){
    const s=scenes[scene];
    let svg=`<svg viewBox="0 0 340 220"><rect width="340" height="220" rx="16" fill="${s.bg}"/>`;
    svg+=`<text x="12" y="24" font-size="16" fill="#543c4e">${changed?"找這裡":"原圖"} · ${s.name}</text>`;
    s.items.forEach(item=>{
      const diff=diffs.find(d=>d.k===item.k);
      if(changed && diff && diff.change==="missing") return;
      const color = changed && diff && diff.change==="color" ? "#d45d6b" : "#543c4e";
      svg+=`<text x="${item.x}" y="${item.y}" font-size="32" fill="${color}">${item.d}</text>`;
    });
    if(changed) diffs.filter(d=>d.change==="extra").forEach(d=>{ svg+=`<text class="hit" data-id="${d.id}" x="${d.x+28}" y="${d.y-20}" font-size="28">⭐</text>`; });
    if(changed) diffs.forEach(d=>{ if(d.change==="extra") return; svg+=`<rect class="hit" data-id="${d.id}" x="${d.x-8}" y="${d.y-28}" width="48" height="42" fill="transparent"/>`; });
    return svg+"</svg>";
  }
  function render(){
    const host=document.getElementById("scene");
    host.innerHTML=`<div class="pair">${panel(false)}${panel(true)}</div>`;
    host.querySelectorAll(".hit").forEach(n=>n.addEventListener("click",()=>hit(+n.dataset.id)));
    document.getElementById("status").textContent=`左邊是原圖，點右邊不一樣的地方 · ${found.size}/${diffs.length}`;
  }
  function hit(id){ if(found.has(id)) return; found.add(id); render(); if(found.size===diffs.length){ SistersPlay.showComplete(`找到 ${diffs.length} 處不同`); SistersPlay.recordResult({game:"spot", difficulty:String(count), level:scenes[scene].name, startedAt, moves:found.size}); } }
  function chips(){
    const row=document.getElementById("diff-row"); row.replaceChildren();
    counts.forEach(c=>{ const b=document.createElement("button"); b.type="button"; b.className="chip"+(c===count?" selected":""); b.textContent=c+" 處"; b.onclick=()=>{count=c; chips(); start();}; row.append(b); });
    scenes.forEach((s,i)=>{ const b=document.createElement("button"); b.type="button"; b.className="chip"+(i===scene?" selected":""); b.textContent=s.name; b.onclick=()=>{scene=i; chips(); start();}; row.append(b); });
  }
  SistersPlay.showCoach("spot", [{demo:"👀➡️", line:"左邊原圖，點右邊不一樣的"}]);
  SistersPlay.mount({title:"找不同", onRestart:start});
  document.getElementById("overlay-next").onclick=()=>{ scene=(scene+1)%scenes.length; start(); };
  chips(); start();
})();
