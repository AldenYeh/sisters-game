(() => {
  "use strict";
  const scenes = [
    {name:"公園", sky:"#c9ecff", ground:"#b7e4c7"},
    {name:"房間", sky:"#fff4d6", ground:"#f3d7b5"},
    {name:"海底", sky:"#b7e0f2", ground:"#7ec8d4"}
  ];
  let scene=0, count=3, found=new Set(), marks=[], startedAt=Date.now();
  function start(){
    found=new Set(); startedAt=Date.now();
    const pool=[
      {id:"ball", x:70, y:120, kind:"circle", fill:"#f4a3b5"},
      {id:"sun", x:250, y:40, kind:"circle", fill:"#f7c56b"},
      {id:"tree", x:180, y:130, kind:"tree", fill:"#2f6f4e"},
      {id:"house", x:40, y:90, kind:"house", fill:"#d45d6b"},
      {id:"cloud", x:120, y:36, kind:"cloud", fill:"#fff"}
    ];
    marks=pool.slice(0, count).map((item,i)=>({...item, change:["hide","recolor","move"][i%3]}));
    document.getElementById("complete").hidden=true; render();
  }
  function draw(changed){
    const s=scenes[scene];
    let body=`<rect width="320" height="200" fill="${s.sky}"/><rect y="140" width="320" height="60" fill="${s.ground}"/>`;
    const items=[
      {id:"ball", x:70, y:120, kind:"circle", fill:"#f4a3b5"},
      {id:"sun", x:250, y:40, kind:"circle", fill:"#f7c56b"},
      {id:"tree", x:180, y:130, kind:"tree", fill:"#2f6f4e"},
      {id:"house", x:40, y:90, kind:"house", fill:"#d45d6b"},
      {id:"cloud", x:120, y:36, kind:"cloud", fill:"#fff"}
    ];
    items.forEach(item=>{
      const mark=marks.find(m=>m.id===item.id);
      let x=item.x, fill=item.fill, show=true;
      if(changed && mark){
        if(mark.change==="hide") show=false;
        if(mark.change==="recolor") fill="#6d5bd0";
        if(mark.change==="move") x+=36;
      }
      if(!show) return;
      if(item.kind==="circle") body+=`<circle cx="${x+16}" cy="${item.y}" r="16" fill="${fill}"/>`;
      if(item.kind==="tree") body+=`<rect x="${x+10}" y="${item.y}" width="8" height="28" fill="#8d5b46"/><circle cx="${x+14}" cy="${item.y-6}" r="16" fill="${fill}"/>`;
      if(item.kind==="house") body+=`<rect x="${x}" y="${item.y}" width="36" height="28" fill="${fill}"/><polygon points="${x}, ${item.y} ${x+18},${item.y-16} ${x+36},${item.y}" fill="#543c4e"/>`;
      if(item.kind==="cloud") body+=`<ellipse cx="${x+20}" cy="${item.y}" rx="22" ry="12" fill="${fill}"/>`;
    });
    if(changed) marks.forEach(m=>{
      const hit=found.has(m.id);
      body+=`<rect class="hit" data-id="${m.id}" x="${m.x-6}" y="${m.y-28}" width="70" height="58" fill="${hit?"#b7e4c788":"transparent"}" stroke="${hit?"#2f6f4e":"transparent"}"/>`;
    });
    return `<svg viewBox="0 0 320 200">${body}<text x="10" y="18" font-size="14" fill="#543c4e">${changed?"找這裡":"原圖"}</text></svg>`;
  }
  function render(){
    document.getElementById("scene").innerHTML=`<div class="pair">${draw(false)}${draw(true)}</div>`;
    document.querySelectorAll(".hit").forEach(n=>n.addEventListener("click",()=>hit(n.dataset.id)));
    document.getElementById("status").textContent=`左邊原圖，點右邊不一樣的 · ${found.size}/${marks.length}`;
  }
  function hit(id){ found.add(id); render(); if(found.size===marks.length){ SistersPlay.showComplete("找到了"); SistersPlay.recordResult({game:"spot", difficulty:String(count), level:scenes[scene].name, startedAt, moves:found.size}); } }
  function chips(){ const row=document.getElementById("diff-row"); row.replaceChildren(); [3,5].forEach(c=>{const b=document.createElement("button"); b.type="button"; b.className="chip"+(c===count?" selected":""); b.textContent=c+" 處"; b.onclick=()=>{count=c; chips(); start();}; row.append(b);}); scenes.forEach((s,i)=>{const b=document.createElement("button"); b.type="button"; b.className="chip"+(i===scene?" selected":""); b.textContent=s.name; b.onclick=()=>{scene=i; chips(); start();}; row.append(b);}); }
  SistersPlay.mount({title:"找不同", onRestart:start});
  document.getElementById("overlay-next").onclick=start;
  chips(); start();
})();
