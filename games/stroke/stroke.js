(async () => {
  "use strict";
  const levels = window.StrokeLevels;
  let question=null,tier="easy";const level=()=>question||levels[index];
  let index=0, used=new Set(), last=null, moves=0, startedAt=Date.now(), restarts=0;
  async function load(i=index,reason="new",nextTier=tier){return SistersRound.start(async()=>{if(reason==="restart")restarts++;const old=level();tier=nextTier;question=reason==="restart"?structuredClone(old):await SistersChallenges.draw('stroke:'+tier,SistersBanks.stroke[tier]);index=i;used=new Set();last=null;moves=0;startedAt=Date.now();document.getElementById('complete').hidden=true;chips();render();},reason);}
  function render(){
    const L=level(); const svg=document.getElementById("board");
    const edges=L.edges.map((e,i)=>{
      const a=L.nodes[e[0]], b=L.nodes[e[1]];
      return `<line data-i="${i}" x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="${used.has(i)?"#2f6f4e":"#d7c9cf"}" stroke-width="${used.has(i)?14:8}" stroke-linecap="round"/>`;
    }).join("");
    const nodes=L.nodes.map((n,i)=>`<circle tabindex="0" role="button" aria-label="節點 ${i+1}" data-n="${i}" cx="${n[0]}" cy="${n[1]}" r="${last===i?20:16}" fill="${last===i?"#d25b6a":"#fff"}" stroke="#8d5b73" stroke-width="3"/>`).join("");
    svg.innerHTML=edges+nodes;
    svg.querySelectorAll("circle").forEach(c=>{c.addEventListener("click",()=>tap(+c.dataset.n));c.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();tap(+c.dataset.n);}});});
    document.getElementById("status").textContent=last==null?`點一個點開始，每條線只走一次`:`從紅點走到相連的點 · 還剩 ${L.edges.length-used.size} 條 · 走不下時可重開或放棄當局`;
    if (used.size===L.edges.length) {
      SistersPlay.showComplete("整張圖走完了");
      SistersPlay.recordResult({game:"stroke", difficulty:L.tier, level:L.name, startedAt, moves, restartCount:restarts});
    }
  }
  function tap(n){
    if(!SistersRound.canInteract())return;
    if (last==null) { last=n; render();SistersRound.checkpoint(); return; }
    const L=level();
    const ei=L.edges.findIndex((e,i)=>!used.has(i) && ((e[0]===last && e[1]===n) || (e[1]===last && e[0]===n)));
    if (ei<0) { document.getElementById("status").textContent="這條線沒有，或已經走過"; return; }
    used.add(ei); last=n; moves++; render();SistersRound.checkpoint();
  }
  function chips(){SistersChallenges.selector(document.getElementById('level-row'),[{value:'easy',label:'8–24 條線'},{value:'normal',label:'26–40 條線'},{value:'hard',label:'42–60 條線'}],tier,v=>load(index,'new',v),'線圖大小');}
  SistersPlay.showCoach("stroke", [{demo:"✏️", line:"沿著線走，每條只走一次"}]);
  SistersPlay.mount({title:"一筆畫", onRestart:()=>load(index,"restart")});
  document.getElementById("overlay-next").onclick=()=>{load((index+1)%levels.length); chips();};
  chips();if(!await SistersRound.attach({snapshot:()=>({question,tier,index,used:[...used],last,moves,startedAt,restarts}),restore:p=>{question=p.question||null;tier=p.tier||"easy";({index,last,moves,startedAt,restarts}=p);used=new Set(p.used);chips();render();}}))await load(0);
})();
