
(() => {
  "use strict";
  const colors=["#f4a3b5","#8ecae6","#b7e4c7","#f7c56b"];
  const shapes=["●","▲","■","◆"];
  const sizes=["18px","28px","38px"];
  const tiers=["easy","normal","hard","challenge"];
  let tier="easy", puzzle=null, startedAt=Date.now(), attempts=0;
  function seq(kind) {
    if (kind==="ABAB") return [0,1,0,1,0];
    if (kind==="AABAAB") return [0,0,1,0,0,1,0];
    if (kind==="ABCABC") return [0,1,2,0,1,2,0];
    if (kind==="AABB") return [0,0,1,1,0,0,1];
    return [0,1,1,0,1,1,0];
  }
  function make() {
    const kind = {easy:["ABAB","AABB"], normal:["AABAAB","ABCABC"], hard:["ABBABB","ABCABC"], challenge:["AABAAB","ABBABB"]}[tier];
    const pattern = kind[Math.floor(Math.random()*kind.length)];
    const base = seq(pattern);
    const answer = base[base.length-1];
    const shown = base.slice(0,-1);
    const dual = tier==="hard" || tier==="challenge";
    puzzle = {pattern, shown, answer, dual, colorMap:[0,1,2], shapeMap:[0,1,2], sizeMap:[0,2]};
    startedAt=Date.now(); attempts++;
    document.getElementById("complete").hidden=true;
    render();
  }
  function token(v, dual) {
    const el=document.createElement("div"); el.className="token";
    el.style.color = colors[puzzle.colorMap[v%puzzle.colorMap.length]];
    el.style.fontSize = dual ? sizes[puzzle.sizeMap[v%2]] : "32px";
    el.textContent = shapes[dual ? puzzle.shapeMap[v%puzzle.shapeMap.length] : 0];
    if (!dual) el.textContent = shapes[v%shapes.length];
    return el;
  }
  function render() {
    const seqEl=document.getElementById("seq"); seqEl.replaceChildren();
    puzzle.shown.forEach(v=>seqEl.append(token(v,puzzle.dual)));
    const q=document.createElement("div"); q.className="token"; q.textContent="?"; seqEl.append(q);
    const choices=document.getElementById("choices"); choices.replaceChildren();
    const opts=[...new Set([puzzle.answer, (puzzle.answer+1)%3, (puzzle.answer+2)%3])];
    opts.sort(()=>Math.random()-.5);
    opts.forEach(v=>{ const b=token(v,puzzle.dual); b.onclick=()=>choose(v); choices.append(b); });
    document.getElementById("status").textContent=`${tier} · 規律 ${puzzle.pattern}`+ (puzzle.dual?" · 顏色和形狀一起看":"");
  }
  function choose(v) {
    if (v===puzzle.answer) {
      SistersPlay.showComplete("規律找對了");
      SistersPlay.recordResult({game:"pattern", difficulty:tier, level:puzzle.pattern, startedAt, attempts, moves:1});
    } else document.getElementById("status").textContent="再看看重複的部分";
  }
  function chips(){ const row=document.getElementById("tier-row"); row.replaceChildren(); tiers.forEach(t=>{const b=document.createElement("button"); b.type="button"; b.className="chip"+(t===tier?" selected":""); b.textContent=t; b.onclick=()=>{tier=t; chips(); make();}; row.append(b);}); }
  SistersPlay.mount({title:"規律接龍", onRestart:make});
  document.getElementById("overlay-next").onclick=make;
  chips(); make();
})();
