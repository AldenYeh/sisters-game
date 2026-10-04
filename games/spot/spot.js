
(() => {
  "use strict";
  const scenes=["公園","房間","動物園","太空","海底"];
  const counts=[3,5,8,10];
  let count=3, found=new Set(), diffs=[], startedAt=Date.now();
  function start(){
    found=new Set(); startedAt=Date.now();
    diffs=[];
    const kinds=["color","missing","extra","flip","size","pattern"];
    while(diffs.length<count){
      diffs.push({id:diffs.length, x:30+Math.random()*280, y:30+Math.random()*160, kind:kinds[diffs.length%kinds.length], r:16});
    }
    document.getElementById("complete").hidden=true; render();
  }
  function render(){
    const scene=scenes[count%scenes.length];
    const bg={公園:"#cdeac0",房間:"#fff1d6",動物園:"#ffe0b5",太空:"#d7e3ff",海底:"#c7f0f4"}[scene];
    let svg=`<rect width="360" height="240" rx="16" fill="${bg}"/>`;
    svg+=`<text x="16" y="28" font-size="18" fill="#543c4e">${scene}</text>`;
    svg+=`<circle cx="70" cy="70" r="22" fill="#f4a3b5"/><rect x="140" y="90" width="40" height="30" fill="#8ecae6"/><polygon points="250,60 270,100 230,100" fill="#f7c56b"/>`;
    diffs.forEach(d=>{
      const mark=found.has(d.id);
      svg+=`<circle class="hit" data-id="${d.id}" cx="${d.x}" cy="${d.y}" r="${d.r+8}" fill="${mark?"#b7e4c7":"transparent"}" stroke="${mark?"#2f6f4e":"transparent"}"/>`;
      if(d.kind==="extra") svg+=`<circle cx="${d.x}" cy="${d.y}" r="8" fill="#8d5b73"/>`;
      if(d.kind==="color") svg+=`<rect x="${d.x-8}" y="${d.y-8}" width="16" height="16" fill="#e35d6a"/>`;
      if(d.kind==="size") svg+=`<circle cx="${d.x}" cy="${d.y}" r="12" fill="none" stroke="#543c4e"/>`;
      if(d.kind==="flip") svg+=`<polygon points="${d.x},${d.y-10} ${d.x+10},${d.y+8} ${d.x-10},${d.y+8}" fill="#6d8f71"/>`;
      if(d.kind==="pattern") svg+=`<text x="${d.x-6}" y="${d.y+4}" font-size="14">★</text>`;
      if(d.kind==="missing") svg+=`<text x="${d.x-8}" y="${d.y+4}" font-size="12">空</text>`;
    });
    const el=document.getElementById("scene"); el.innerHTML=svg;
    el.querySelectorAll(".hit").forEach(n=>n.addEventListener("click",()=>hit(+n.dataset.id)));
    document.getElementById("status").textContent=`${scene} · 找到 ${found.size}/${count}`;
  }
  function hit(id){ found.add(id); render(); if(found.size===count){ SistersPlay.showComplete(`找到 ${count} 處不同`); SistersPlay.recordResult({game:"spot", difficulty:String(count), level:scenes[count%scenes.length], startedAt, moves:found.size}); } }
  function chips(){ const row=document.getElementById("diff-row"); row.replaceChildren(); counts.forEach(c=>{const b=document.createElement("button"); b.type="button"; b.className="chip"+(c===count?" selected":""); b.textContent=c+" 處"; b.onclick=()=>{count=c; chips(); start();}; row.append(b);}); }
  SistersPlay.mount({title:"找不同", onRestart:start});
  document.getElementById("overlay-next").onclick=start;
  chips(); start();
})();
