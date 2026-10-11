(async () => {
  "use strict";
  const arts = window.SistersIllustrations;
  if(!Array.isArray(arts)||arts.length<50)throw Error('完整插畫題庫未達 50 張');
  const sizes = [12, 24, 36];
  const state = { pieces: 12, art: arts[0], placed: [], hints: 0, moves: 0, restarts: 0, startedAt: Date.now(), cols: 4, rows: 3, image: null, trayOrder: [], question:null,referenceShown:false };
  const board = document.getElementById("board");
  const tray = document.getElementById("tray");
  function dims(n) { return { 12: [4, 3], 24: [6, 4], 36: [6, 6] }[n]; }
  const imageCache=new Map(),sliceCache=new Map();
  function loadImage(src) {
    if(imageCache.has(src))return imageCache.get(src);
    const promise=new Promise((resolve,reject)=>{const img=new Image();img.onload=()=>resolve(img);img.onerror=()=>{imageCache.delete(src);reject(new Error("拼圖圖片載入失敗，請檢查連線後重試；原局尚未覆寫。"));};img.src=src;});
    imageCache.set(src,promise);while(imageCache.size>8)imageCache.delete(imageCache.keys().next().value);return promise;
  }
  let cancelDrag=null,selected=null,suppressClick=false,initializing=true,switching=false,wanted=null,loadingTarget=null;
  async function start(reason="new",pieces=wanted?.pieces??loadingTarget?.pieces??state.pieces,art=wanted?.art??loadingTarget?.art??state.art,draw=true) {
    wanted={reason,pieces,art,draw};chips();
    if(initializing||switching)return;
    switching=true;
    try{while(wanted){const next=wanted;wanted=null;loadingTarget=next;
      const ok=await SistersRound.start(async()=>{
        // Load before changing the logical state so failures preserve the old board.
        // Each difficulty draws from 50 complete compositions. Cache the choice
        // on this factory so a failed image load retries the same question.
        const keep=next.reason==='restart'&&state.art.id===next.art.id&&state.pieces===next.pieces;
        if(!next.choice){const frame=keep?state.art:next.draw?await SistersChallenges.draw('puzzle:illustrated-v1:'+next.pieces,arts):arts.find(a=>a.id===next.art.id);if(!frame)throw Error('插畫不在題庫，原局保留');next.choice={actualArt:structuredClone(frame),question:keep?state.question:{id:'illustrated-v1/'+frame.id,kind:'complete-illustration-v1',frameVersion:frame.version,frame:structuredClone(frame)}};}
        const {question,actualArt}=next.choice;
        const image=await loadImage(actualArt.src);cancelDrag?.();selected=null;sliceCache.clear();
        state.pieces=next.pieces;state.art=actualArt;state.question=question;state.image=image;
        if(next.reason==="restart")state.restarts++;
        [state.cols,state.rows]=dims(state.pieces);state.placed=Array(state.pieces).fill(false);
        state.trayOrder=Array.from({length:state.pieces},(_,i)=>i);
        for(let i=state.trayOrder.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[state.trayOrder[i],state.trayOrder[j]]=[state.trayOrder[j],state.trayOrder[i]];}
        state.hints=0;state.moves=0;state.startedAt=Date.now();document.getElementById("complete").hidden=true;chips();render();
      },next.reason);
      if(!ok){wanted=null;break;}
    }}finally{switching=false;loadingTarget=null;chips();}
  }
  function cellSize() {
    const parent=board.parentElement,style=getComputedStyle(parent);
    const available=parent.clientWidth-parseFloat(style.paddingLeft)-parseFloat(style.paddingRight);
    const ratio=state.image.width/state.image.height;
    const heightBudget=Math.max(180,window.innerHeight-parent.getBoundingClientRect().top-76);
    const preferred=window.innerWidth>760?Math.min(available,heightBudget*ratio):available;
    const w=Math.floor(preferred/state.cols);
    return {w:Math.max(20,w),h:Math.max(20,Math.round(w*state.image.height*state.cols/(state.image.width*state.rows)))};
  }
  function slice(i, w, h) {
    const key=[state.question?.id||state.art.id,state.pieces,i,w,h].join(":");if(sliceCache.has(key))return sliceCache.get(key);
    const img = state.image;
    const c = i % state.cols, r = Math.floor(i / state.cols);
    const out = document.createElement("canvas");
    const pad=Math.ceil(Math.min(w,h)*.20);out.width=w+2*pad;out.height=h+2*pad;
    const g=out.getContext('2d');g.translate(pad,pad);g.beginPath();
    for(const [op,...p]of SistersJigsaw.commands(state.cols,state.rows,i,w,h)){if(op==='M')g.moveTo(...p);else if(op==='L')g.lineTo(...p);else if(op==='C')g.bezierCurveTo(...p);else g.closePath();}
    g.save();g.clip();g.drawImage(img,-c*w,-r*h,w*state.cols,h*state.rows);g.restore();g.strokeStyle='rgba(91,63,67,.4)';g.lineWidth=.75;g.stroke();
    sliceCache.set(key,out);return out;
  }
  function pieceCanvas(i,w,h){const original=slice(i,w,h),copy=document.createElement('canvas');copy.width=original.width;copy.height=original.height;copy.getContext('2d').drawImage(original,0,0);copy.setAttribute('aria-hidden','true');return copy;}
  function render() {
    const size = cellSize(),pad=Math.ceil(Math.min(size.w,size.h)*.20);
    board.style.display = "grid";
    board.style.gridTemplateColumns = `repeat(${state.cols}, ${size.w}px)`;
    board.style.width = "max-content";
    board.style.margin = "0 auto";
    board.replaceChildren();
    const ref = document.getElementById("reference");
    if(ref){ref.querySelector('img').src=state.art.src;ref.hidden=!state.referenceShown;document.getElementById('reference-toggle').checked=state.referenceShown;}
    for (let i = 0; i < state.placed.length; i++) {
      const cell = document.createElement("div");
      cell.style.width = size.w + "px";
      cell.style.height = size.h + "px";
      cell.className="puzzle-slot";if(state.placed[i]){const piece=pieceCanvas(i,size.w,size.h);Object.assign(piece.style,{position:'absolute',left:-pad+'px',top:-pad+'px',width:size.w+2*pad+'px',height:size.h+2*pad+'px',maxWidth:'none',pointerEvents:'none',zIndex:2});cell.append(piece);}
      cell.style.transition = "transform .18s ease";cell.tabIndex=0;cell.setAttribute("role","button");cell.setAttribute("aria-label",`第 ${i+1} 格`);const place=()=>{if(selected!==null){drop(selected,i);selected=null;}};cell.onclick=place;cell.onkeydown=e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();place();}};
      board.append(cell);
    }
    tray.replaceChildren();
    const side=document.querySelector('.puzzle-side');
    side.style.height='auto';side.style.maxHeight=(size.h*state.rows+16)+'px';
    const trayStyle=getComputedStyle(tray),gap=parseFloat(trayStyle.gap)||8,trayPadding=parseFloat(trayStyle.getPropertyValue('--tray-padding'))||10;
    const gutter=Math.max(0,tray.offsetWidth-tray.clientWidth-parseFloat(trayStyle.borderLeftWidth)-parseFloat(trayStyle.borderRightWidth));
    const trayWidth=side.clientWidth-2-2*trayPadding-gutter;
    const tileRatio=(size.w+2*pad)/(size.h+2*pad);
    const trayHeight=size.h*state.rows+16-document.querySelector('.ref-row').getBoundingClientRect().height-6-2*trayPadding;
    let columns=1,pieceWidth=44;
    const maxColumns=Math.min(state.pieces,8,Math.max(1,Math.floor((trayWidth+gap)/(44+gap))));
    for(let count=1;count<=maxColumns;count++){
      const rows=Math.ceil(state.pieces/count);
      const width=Math.min((size.w+2*pad)*.68,(trayWidth-gap*(count-1))/count,Math.max(44,((trayHeight-gap*(rows-1))/rows)*tileRatio));
      if(width>pieceWidth){columns=count;pieceWidth=width;}
    }
    if(pieceWidth===44)columns=maxColumns;
    tray.style.display='grid';tray.style.gridTemplateColumns=`repeat(${columns}, ${Math.floor(pieceWidth)}px)`;
    (state.trayOrder.length===state.pieces?state.trayOrder:Array.from({length:state.pieces},(_,i)=>i)).forEach(i => {
      const on=state.placed[i];
      if (on) return;
      const el = document.createElement("button");
      el.type = "button";
      el.className = "piece";el.dataset.piece=String(i);
      el.style.width = Math.floor(pieceWidth) + "px";
      el.style.height = Math.round(pieceWidth/tileRatio) + "px";
      const art=pieceCanvas(i,size.w,size.h);Object.assign(art.style,{display:'block',width:'100%',height:'100%',pointerEvents:'none'});el.append(art);el.style.background='transparent';el.style.padding='0';
      el.style.border = "0";
      el.style.borderRadius = "0";
      el.style.cursor = "grab";
      el.setAttribute("aria-label",`拼圖片 ${(state.trayOrder.length===state.pieces?state.trayOrder.indexOf(i):i)+1}，選取後再選目標格`);el.onclick=()=>{if(SistersRound.canInteract()&&!suppressClick){selected=i;document.getElementById("status").textContent="已選一片，請點目標格";SistersRound.checkpoint();}};el.addEventListener("pointerdown", ev => begin(ev, i, el));
      tray.append(el);
    });
    document.getElementById("status").textContent = `${state.art.name} · 拖曳或點選碎片後放進空格；可勾選完成圖 · ${state.placed.filter(Boolean).length} / ${state.placed.length}`;
  }
  function finish(){if(state.placed.every(Boolean)){SistersPlay.showComplete("拼好了");SistersPlay.recordResult({difficulty:String(state.pieces),level:state.art.id,startedAt:state.startedAt,moves:state.moves,hintsUsed:state.hints,restartCount:state.restarts});}}
  function drop(index,hit){if(!SistersRound.canInteract()||state.placed[index])return;state.moves++;if(hit===index){state.placed[index]=true;SistersPlay.playSound("ok");}render();finish();SistersRound.checkpoint();}
  function begin(ev,index,el){
    if(!SistersRound.canInteract()||cancelDrag||ev.button!==0)return;ev.preventDefault();
    const rect=el.getBoundingClientRect(),w=rect.width,h=rect.height,ox=ev.clientX-rect.left,oy=ev.clientY-rect.top;
    const ghost=el.cloneNode();const original=el.querySelector('canvas'),copy=document.createElement('canvas');copy.width=original.width;copy.height=original.height;copy.getContext('2d').drawImage(original,0,0);Object.assign(copy.style,{display:'block',width:'100%',height:'100%'});ghost.append(copy);Object.assign(ghost.style,{position:"fixed",zIndex:9,pointerEvents:"none",width:w+"px",height:h+"px",left:rect.left+"px",top:rect.top+"px"});document.body.append(ghost);el.setPointerCapture(ev.pointerId);let moved=false;
    function cleanup(){el.removeEventListener("pointermove",move);el.removeEventListener("pointerup",up);el.removeEventListener("pointercancel",cancel);if(el.hasPointerCapture(ev.pointerId))el.releasePointerCapture(ev.pointerId);ghost.remove();cancelDrag=null;}
    function cancel(){cleanup();suppressClick=true;setTimeout(()=>suppressClick=false,300);}
    function move(e){if(e.pointerId!==ev.pointerId||!SistersRound.canInteract())return;moved=moved||Math.hypot(e.clientX-ev.clientX,e.clientY-ev.clientY)>5;ghost.style.left=e.clientX-ox+"px";ghost.style.top=e.clientY-oy+"px";}
    function up(e){if(e.pointerId!==ev.pointerId)return;const x=e.clientX-ox+w/2,y=e.clientY-oy+h/2;cleanup();suppressClick=true;setTimeout(()=>suppressClick=false,0);if(!moved){selected=index;document.getElementById("status").textContent="已選一片，請點目標格";return;}const cells=[...board.children],hit=cells.findIndex(c=>{const r=c.getBoundingClientRect();return x>=r.left&&x<=r.right&&y>=r.top&&y<=r.bottom;});drop(index,hit);}
    cancelDrag=cancel;el.addEventListener("pointermove",move);el.addEventListener("pointerup",up);el.addEventListener("pointercancel",cancel);
  }
  function chips(){SistersChallenges.selector(document.getElementById('size-row'),sizes.map(n=>({value:n,label:n+' 片'})),wanted?.pieces??loadingTarget?.pieces??state.pieces,v=>start('new',+v,wanted?.art??loadingTarget?.art??state.art,false),'拼圖片數');SistersChallenges.selector(document.getElementById('art-row'),arts.map(a=>({value:a.id,label:a.name})),(wanted?.art??loadingTarget?.art??state.art).id,v=>start('new',wanted?.pieces??loadingTarget?.pieces??state.pieces,arts.find(a=>a.id===v),false),'選擇完整插畫');document.querySelectorAll('#size-row select,#art-row select').forEach(s=>s.disabled=initializing);}
  SistersPlay.showCoach("puzzle", [{ demo: "🧩", line: "看完成圖，把碎片拖進正確空格" }]);
  SistersPlay.mount({ title: "拼圖", onRestart: () => start("restart") });
  document.getElementById("hint").onclick = () => {
    if(!SistersRound.canInteract())return;
    const i = state.placed.findIndex(v => !v);
    if (i < 0 || state.hints >= 3) return;
    state.hints++; state.placed[i] = true; SistersPlay.playSound("ok"); render();finish();SistersRound.checkpoint();
  };
  document.getElementById('reference-toggle').onchange=e=>{state.referenceShown=e.target.checked;render();SistersRound.checkpoint();};
  document.getElementById("overlay-next").onclick = ()=>start();
  chips();const restored=await SistersRound.attach({snapshot:()=>{const {image,...saved}=state;return {...saved,selected};},cancel:()=>cancelDrag?.(),restore:async p=>{if(!sizes.includes(p.pieces)||!arts.some(a=>a.id===p.art.id))throw Error("拼圖存檔格式錯誤");Object.assign(state,p);selected=p.selected;state.image=await loadImage(state.art.src);chips();render();}});initializing=false;if(!restored)await start();else chips();
  let resizeFrame=0,lastSize='';window.addEventListener('resize',()=>{cancelDrag?.();cancelAnimationFrame(resizeFrame);resizeFrame=requestAnimationFrame(()=>{if(!state.image)return;const size=cellSize(),key=size.w+':'+size.h;if(key!==lastSize){lastSize=key;sliceCache.clear();render();}});});
})();
