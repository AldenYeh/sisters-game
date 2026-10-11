(async () => {
  "use strict";
  const levels = window.SlidingLevels;
  const tiers=[{value:"basic",label:"讓車先行 · 3–5 步"},{value:"planning",label:"安排順序 · 6–9 步"},{value:"challenge",label:"連環解鎖 · 10 步以上"}];
  let question=null,tier="basic",filter="all", index=0, pieces=[], moves=0, hints=0, restarts=0, startedAt=Date.now(), history=[],cancelDrag=null,dragSnapshot=null;
  const board=document.getElementById("board");
  const level=()=>question||levels[index];
  const clone=ps=>ps.map(p=>({...p}));
  // Artwork stays inside the existing grid button; it never handles pointer events.
  function vehicleArt(p,i){
    const vertical=p.h>p.w,free=p.h===p.w,long=Math.max(p.w,p.h)>=3;
    const kind=free?'cart':p.target?'car':long?(i%2?'bus':'truck'):(i%2?'van':'car');
    const paint=p.target?'#d94b51':['#457fb4','#d6a443','#5c9f82','#9376b5','#d18750'][Math.max(0,i-1)%5];
    const ink='#354452',glass='#badce9',length=long?240:160;
    const wheel=(x,y)=>`<rect x="${x}" y="${y}" width="23" height="8" rx="3" fill="${ink}"/>`;
    const tires=wheel(27,8)+wheel(27,64)+wheel(length-51,8)+wheel(length-51,64);
    const shell=`<rect x="10" y="14" width="${length-20}" height="52" rx="14" fill="${paint}" stroke="${ink}" stroke-width="2.4"/><path d="M25 19 H${length-28}" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="3" stroke-linecap="round"/>`;
    const lights=`<rect x="${length-16}" y="22" width="5" height="9" rx="2" fill="#fff3bd"/><rect x="${length-16}" y="49" width="5" height="9" rx="2" fill="#fff3bd"/><rect x="12" y="24" width="3" height="7" rx="1" fill="#a93641"/><rect x="12" y="49" width="3" height="7" rx="1" fill="#a93641"/>`;
    let body;
    if(kind==='cart'){
      body=`<g stroke="${ink}" stroke-width="2"><rect x="7" y="17" width="7" height="16" rx="3" fill="${ink}"/><rect x="66" y="17" width="7" height="16" rx="3" fill="${ink}"/><rect x="7" y="49" width="7" height="16" rx="3" fill="${ink}"/><rect x="66" y="49" width="7" height="16" rx="3" fill="${ink}"/><rect x="14" y="8" width="52" height="64" rx="12" fill="${paint}"/><path d="M23 17 H57 L60 31 H20 Z" fill="${glass}"/><rect x="23" y="37" width="34" height="25" rx="5" fill="#fff" fill-opacity=".3"/><path d="M40 39 V60" stroke-opacity=".35"/></g>`;
      return {kind,name:'工作車',svg:`<svg class="vehicle-art" viewBox="0 0 80 80" aria-hidden="true" focusable="false">${body}</svg>`};
    }
    if(kind==='bus'){
      const sideWindows=Array.from({length:5},(_,n)=>`<rect x="${43+n*28}" y="16" width="20" height="6" rx="2" fill="${ink}"/><rect x="${43+n*28}" y="58" width="20" height="6" rx="2" fill="${ink}"/>`).join('');
      body=tires+shell+sideWindows+`<rect x="23" y="25" width="12" height="30" rx="3" fill="${glass}" stroke="${ink}" stroke-width="1.5"/><rect x="43" y="26" width="137" height="28" rx="5" fill="#fff6df" stroke="${ink}" stroke-width="1.5"/><path d="M87 28 V52 M134 28 V52" stroke="#bdc4be" stroke-width="2"/><rect x="101" y="34" width="19" height="12" rx="3" fill="#d4ddd6"/><path d="M106 38 H115 M106 42 H115" stroke="#748982" stroke-width="1.5"/><path d="M190 24 L218 27 V53 L190 56 Z" fill="${glass}" stroke="${ink}" stroke-width="2"/>`+lights;
    }else if(kind==='truck'){
      body=tires+`<rect x="14" y="17" width="143" height="46" rx="6" fill="${paint}" stroke="${ink}" stroke-width="2.4"/><rect x="21" y="23" width="129" height="34" rx="3" fill="#fff2d8"/><path d="M41 26 V54 M64 26 V54 M87 26 V54 M110 26 V54 M133 26 V54" stroke="#d9c8ad" stroke-width="2"/><rect x="157" y="23" width="11" height="34" fill="${ink}"/><rect x="167" y="14" width="63" height="52" rx="13" fill="${paint}" stroke="${ink}" stroke-width="2.4"/><path d="M185 24 L210 28 V52 L185 56 Z" fill="${glass}" stroke="${ink}" stroke-width="2"/><path d="M173 21 V59" stroke="#fff" stroke-opacity=".4" stroke-width="3"/>`+lights;
    }else if(kind==='van'){
      body=tires+shell+`<rect x="25" y="23" width="69" height="34" rx="7" fill="#fff" fill-opacity=".3" stroke="${ink}" stroke-opacity=".4" stroke-width="1.5"/><path d="M60 25 V55" stroke="${ink}" stroke-opacity=".3" stroke-width="1.5"/><path d="M104 23 L126 28 V52 L104 57 Z" fill="${glass}" stroke="${ink}" stroke-width="2"/>`+lights;
    }else{
      body=tires+shell+`<path d="M34 27 L49 23 V57 L34 53 Z" fill="${glass}" stroke="${ink}" stroke-width="2"/><rect x="52" y="23" width="46" height="34" rx="6" fill="#fff" fill-opacity=".25"/><path d="M102 23 L124 28 V52 L102 57 Z" fill="${glass}" stroke="${ink}" stroke-width="2"/><path d="M130 25 V55" stroke="${ink}" stroke-opacity=".3" stroke-width="1.5"/>`+lights;
    }
    const viewBox=vertical?`0 0 80 ${length}`:`0 0 ${length} 80`;
    return {kind,name:{car:'汽車',van:'廂型車',bus:'巴士',truck:'貨車'}[kind],svg:`<svg class="vehicle-art" viewBox="${viewBox}" aria-hidden="true" focusable="false"><g${vertical?` transform="translate(0 ${length}) rotate(-90)"`:''}>${body}</g></svg>`};
  }
  async function load(i=index,reason="new",nextTier=tier){return SistersRound.start(async()=>{if(reason==="restart")restarts++;const old=level();tier=reason==="restart"?nextTier:(SistersBanks.sliding[nextTier]?nextTier:"basic");question=reason==="restart"?structuredClone(old):await SistersChallenges.draw('sliding:curated-v1:'+tier,SistersBanks.sliding[tier]);index=i;pieces=clone(level().pieces);moves=0;hints=0;startedAt=Date.now();history=[];document.getElementById("complete").hidden=true;chips();render();},reason);}
  function occ(skip){ const m=new Set(); pieces.forEach((p,i)=>{ if(i===skip)return; for(let y=0;y<p.h;y++) for(let x=0;x<p.w;x++) m.add((p.r+y)+","+(p.c+x)); }); return m; }
  function can(i,dr,dc){ const L=level(), p=pieces[i], nr=p.r+dr, nc=p.c+dc; if(nr<0||nc<0||nr+p.h>L.rows||nc+p.w>L.cols) return false; const used=occ(i); for(let y=0;y<p.h;y++) for(let x=0;x<p.w;x++) if(used.has((nr+y)+","+(nc+x))) return false; return true; }
  function slide(i,dr,dc,steps){ let n=0; while(n<steps && can(i,dr,dc)){ pieces[i].r+=dr; pieces[i].c+=dc; n++; } return n; }
  function won(){ const L=level(); const row=L.exitRow; return pieces.some(p=>p.target && p.r===row && p.c+p.w===L.cols); }
  function render(){
    const L=level();
    board.style.aspectRatio=L.cols+"/"+L.rows;
    board.style.setProperty("--cols", L.cols);
    board.style.setProperty("--rows", L.rows);
    board.replaceChildren();
    for(let r=0;r<L.rows;r++) for(let c=0;c<L.cols;c++){ const cell=document.createElement("div"); cell.className="cell"+(r===L.exitRow&&c===L.cols-1?" exit":""); board.append(cell); }
    const door=document.createElement("div"); door.className="door"; door.innerHTML='<span>出口</span><span aria-hidden="true">→</span>'; door.style.top=(L.exitRow/L.rows*100)+"%"; door.style.height=(100/L.rows)+"%"; board.append(door);
    pieces.forEach((p,i)=>{
      const el=document.createElement("button");
      el.type="button"; el.className="block illustrated"+(p.target?" target":"")+(p.w>=p.h?" hcar":" vcar");
      el.style.left=(p.c/L.cols*100)+"%"; el.style.top=(p.r/L.rows*100)+"%";
      el.style.width=(p.w/L.cols*100)+"%"; el.style.height=(p.h/L.rows*100)+"%";
      const art=vehicleArt(p,i);el.innerHTML=art.svg;el.dataset.vehicle=art.kind;el.dataset.axis = p.w===p.h?"free":(p.w>p.h?"x":"y");
      el.setAttribute("aria-label",`${p.target?"紅色目標車":art.name}，${el.dataset.axis==='x'?'左右':el.dataset.axis==='y'?'上下':'四方向'}移動，可用方向鍵`);el.onkeydown=e=>{const delta={ArrowLeft:[0,-1],ArrowRight:[0,1],ArrowUp:[-1,0],ArrowDown:[1,0]}[e.key];if(!delta||!SistersRound.canInteract())return;e.preventDefault();const [dr,dc]=delta;if((p.w>p.h&&dr)||(p.h>p.w&&dc)||!can(i,dr,dc))return;history.push(clone(pieces));slide(i,dr,dc,1);moves++;render();board.querySelectorAll(".block")[i]?.focus();SistersRound.checkpoint();};el.addEventListener("pointerdown", ev=>startDrag(ev,i,el));
      board.append(el);
    });
    document.getElementById("status").textContent=`把紅車拖到右邊「出口」 · ${question?"隨機題":"保留舊第 "+(index+1)+" 關"} · 最短解 ${L.minimumMoves} 步 · ${moves} 步`;
    if(won()) finish();
  }
  function startDrag(ev,i,el){
    if(!SistersRound.canInteract()||cancelDrag)return;
    if(ev.button!=null && ev.button!==0) return;
    ev.preventDefault();
    el.setPointerCapture(ev.pointerId);
    el.classList.add("selected");
    const origin={r:pieces[i].r,c:pieces[i].c};
    const rect=board.getBoundingClientRect();
    const cellW=rect.width/level().cols, cellH=rect.height/level().rows;
    const p=pieces[i];
    const axis = p.w===p.h ? "free" : (p.w>p.h ? "x" : "y");
    const before=clone(pieces);dragSnapshot={question,tier,filter,index,pieces:clone(pieces),moves,hints,restarts,startedAt,history:structuredClone(history)};
    function move(e){
      if(e.pointerId!==ev.pointerId||!SistersRound.canInteract()) return;
      pieces[i].r=origin.r; pieces[i].c=origin.c;
      const dx=e.clientX-ev.clientX, dy=e.clientY-ev.clientY;
      const useX = axis==="x" || (axis==="free" && Math.abs(dx)>=Math.abs(dy));
      if(useX){ const steps=Math.round(dx/cellW); slide(i,0,steps>0?1:-1,Math.abs(steps)); }
      else { const steps=Math.round(dy/cellH); slide(i,steps>0?1:-1,0,Math.abs(steps)); }
      el.style.left=(pieces[i].c/level().cols*100)+"%";
      el.style.top=(pieces[i].r/level().rows*100)+"%";
    }
    function cleanup(){el.removeEventListener("pointermove",move);el.removeEventListener("pointerup",up);el.removeEventListener("pointercancel",cancel);if(el.hasPointerCapture(ev.pointerId))el.releasePointerCapture(ev.pointerId);cancelDrag=null;dragSnapshot=null;}
    function cancel(){pieces=before;cleanup();render();}
    function up(e){if(e.pointerId!==ev.pointerId)return;cleanup();if(!SistersRound.canInteract()){pieces=before;render();return;}if(pieces[i].r!==origin.r||pieces[i].c!==origin.c){history.push(before);moves++;SistersPlay.playSound('ok');}render();SistersRound.checkpoint();}
    cancelDrag=cancel;el.addEventListener("pointermove",move);el.addEventListener("pointerup",up);el.addEventListener("pointercancel",cancel);
  }
  function finish(){
    SistersPlay.showComplete(`紅車開出去了。你用了 ${moves} 步，最少 ${level().minimumMoves} 步`);
    SistersPlay.recordResult({game:"sliding", difficulty:"最短解 "+level().minimumMoves+" 步", level:index+1, startedAt, moves, hintsUsed:hints, restartCount:restarts});
  }
  function hint(){
    if(!SistersRound.canInteract())return;
    if(hints>=3 || won()) return;
    const t=pieces.findIndex(p=>p.target);
    const L=level();
    const prefs = pieces[t].c+pieces[t].w<L.cols && pieces[t].r===L.exitRow ? [[0,1]] : [[0,1],[1,0],[-1,0],[0,-1]];
    for(const [dr,dc] of prefs) if(can(t,dr,dc)){ hints++; history.push(clone(pieces)); slide(t,dr,dc,1); moves++; render();SistersRound.checkpoint(); return; }
    hints++;
    document.getElementById("status").textContent="提示：先把擋住紅車的車移開";SistersRound.checkpoint();
  }
  function chips(){const options=[...tiers];if(!SistersBanks.sliding[tier])options.unshift({value:tier,label:"保留舊關卡 · 最短 "+level().minimumMoves+" 步"});SistersChallenges.selector(document.getElementById('tier-row'),options,tier,v=>load(index,'new',v),'解題難度');if(!SistersBanks.sliding[tier])document.querySelector('#tier-row option').disabled=true;document.getElementById('level-row').replaceChildren();}
  document.getElementById("hint").onclick=hint;
  document.getElementById("undo").onclick=()=>{ if(!SistersRound.canInteract()||!history.length) return; pieces=history.pop(); moves=Math.max(0,moves-1); render();SistersRound.checkpoint(); };
  document.getElementById("overlay-next").onclick=()=>{ load((index+1)%levels.length); chips(); };
  SistersPlay.showCoach("sliding", [{demo:"🚗➡️🚪", line:"抓住紅車，拖到右邊出口"},{demo:"🚙", line:"其他車要先讓路"}]);
  SistersPlay.mount({ title:"滑塊闖關", onRestart: () => load(index,"restart") });
  chips();if(!await SistersRound.attach({snapshot:()=>dragSnapshot||({question,tier,filter,index,pieces,moves,hints,restarts,startedAt,history}),cancel:()=>cancelDrag?.(),restore:p=>{if(!(p.question||levels[p.index])||p.pieces.length!==(p.question||levels[p.index]).pieces.length)throw Error("滑塊存檔格式錯誤");question=p.question||null;tier=p.tier||"legacy";({filter,index,pieces,moves,hints,restarts,startedAt,history}=p);chips();render();}}))await load(0);
})();
