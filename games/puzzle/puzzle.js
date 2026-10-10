(async () => {
  "use strict";
  const arts = [
    { id: "garden", name: "花園", src: "art/garden.jpg" },
    { id: "room", name: "房間", src: "art/room.jpg" },
    { id: "sea", name: "海底", src: "art/sea.jpg" }
  ];
  const sizes = [12, 24, 36];
  const state = { pieces: 12, art: arts[0], placed: [], hints: 0, moves: 0, restarts: 0, startedAt: Date.now(), cols: 4, rows: 3, image: null, trayOrder: [] };
  const board = document.getElementById("board");
  const tray = document.getElementById("tray");
  function dims(n) { return { 12: [4, 3], 24: [6, 4], 36: [6, 6] }[n]; }
  const imageCache=new Map(),sliceCache=new Map();
  function loadImage(src) {
    if(imageCache.has(src))return imageCache.get(src);
    const promise=new Promise((resolve,reject)=>{const img=new Image();img.onload=()=>resolve(img);img.onerror=()=>{imageCache.delete(src);reject(new Error("拼圖圖片載入失敗，請檢查連線後重試；原局尚未覆寫。"));};img.src=src;});
    imageCache.set(src,promise);return promise;
  }
  let cancelDrag=null,selected=null,suppressClick=false,initializing=true,switching=false,wanted=null,loadingTarget=null;
  async function start(reason="new",pieces=wanted?.pieces??loadingTarget?.pieces??state.pieces,art=wanted?.art??loadingTarget?.art??state.art) {
    wanted={reason,pieces,art};chips();
    if(initializing||switching)return;
    switching=true;
    try{while(wanted){const next=wanted;wanted=null;loadingTarget=next;
      const ok=await SistersRound.start(async()=>{
        // Load before changing the logical state so failures preserve the old board.
        const image=await loadImage(next.art.src);cancelDrag?.();selected=null;
        state.pieces=next.pieces;state.art=next.art;state.image=image;
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
    const w=Math.floor(Math.min(available,560)/state.cols);
    return {w:Math.max(20,w),h:Math.max(20,Math.round(w*state.image.height*state.cols/(state.image.width*state.rows)))};
  }
  function slice(i, w, h) {
    const key=[state.art.id,state.pieces,i,w,h].join(":");if(sliceCache.has(key))return sliceCache.get(key);
    const img = state.image;
    const c = i % state.cols, r = Math.floor(i / state.cols);
    const out = document.createElement("canvas");
    out.width = w; out.height = h;
    const g = out.getContext("2d");
    g.save();
    g.beginPath();
    g.moveTo(2, 2);
    g.lineTo(w - 2, 2);
    if (c < state.cols - 1) g.arc(w - 10, h / 2, 8, -1.1, 1.1);
    g.lineTo(w - 2, h - 2);
    g.lineTo(2, h - 2);
    if (r < state.rows - 1) g.arc(w / 2, h - 10, 8, 0.4, 2.7);
    g.closePath();
    g.clip();
    g.drawImage(img, c * img.width / state.cols, r * img.height / state.rows, img.width / state.cols, img.height / state.rows, 0, 0, w, h);
    g.restore();
    const url=out.toDataURL();sliceCache.set(key,url);return url;
  }
  function render() {
    const size = cellSize();
    board.style.display = "grid";
    board.style.gridTemplateColumns = `repeat(${state.cols}, ${size.w}px)`;
    board.style.width = "max-content";
    board.style.margin = "0 auto";
    board.replaceChildren();
    const ref = document.getElementById("reference");
    if (ref) ref.style.backgroundImage = `url(${state.art.src})`;
    for (let i = 0; i < state.placed.length; i++) {
      const cell = document.createElement("div");
      cell.style.width = size.w + "px";
      cell.style.height = size.h + "px";
      cell.className="puzzle-slot";cell.style.backgroundImage=state.placed[i]?`url(${slice(i,size.w,size.h)})`:"none";cell.style.backgroundSize="cover";
      cell.style.transition = "transform .18s ease";cell.tabIndex=0;cell.setAttribute("role","button");cell.setAttribute("aria-label",`第 ${i+1} 格`);const place=()=>{if(selected!==null){drop(selected,i);selected=null;}};cell.onclick=place;cell.onkeydown=e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();place();}};
      board.append(cell);
    }
    tray.replaceChildren();
    (state.trayOrder.length===state.pieces?state.trayOrder:Array.from({length:state.pieces},(_,i)=>i)).forEach(i => {
      const on=state.placed[i];
      if (on) return;
      const el = document.createElement("button");
      el.type = "button";
      el.className = "piece";el.dataset.piece=String(i);
      el.style.width = size.w + "px";
      el.style.height = size.h + "px";
      el.style.background = `url(${slice(i, size.w, size.h)}) center/cover`;
      el.style.border = "0";
      el.style.borderRadius = "10px";
      el.style.cursor = "grab";
      el.setAttribute("aria-label",`拼圖片 ${(state.trayOrder.length===state.pieces?state.trayOrder.indexOf(i):i)+1}，選取後再選目標格`);el.onclick=()=>{if(SistersRound.canInteract()&&!suppressClick){selected=i;document.getElementById("status").textContent="已選一片，請點目標格";SistersRound.checkpoint();}};el.addEventListener("pointerdown", ev => begin(ev, i, el));
      tray.append(el);
    });
    document.getElementById("status").textContent = `參考完成圖，拖曳或點選碎片後放進空格 · ${state.placed.filter(Boolean).length} / ${state.placed.length}`;
  }
  function finish(){if(state.placed.every(Boolean)){SistersPlay.showComplete("拼好了");SistersPlay.recordResult({difficulty:String(state.pieces),level:state.art.id,startedAt:state.startedAt,moves:state.moves,hintsUsed:state.hints,restartCount:state.restarts});}}
  function drop(index,hit){if(!SistersRound.canInteract()||state.placed[index])return;state.moves++;if(hit===index){state.placed[index]=true;SistersPlay.playSound("ok");}render();finish();SistersRound.checkpoint();}
  function begin(ev,index,el){
    if(!SistersRound.canInteract()||cancelDrag||ev.button!==0)return;ev.preventDefault();
    const rect=el.getBoundingClientRect(),w=rect.width,h=rect.height,ox=ev.clientX-rect.left,oy=ev.clientY-rect.top;
    const ghost=el.cloneNode();Object.assign(ghost.style,{position:"fixed",zIndex:9,pointerEvents:"none",width:w+"px",height:h+"px",left:rect.left+"px",top:rect.top+"px"});document.body.append(ghost);el.setPointerCapture(ev.pointerId);let moved=false;
    function cleanup(){el.removeEventListener("pointermove",move);el.removeEventListener("pointerup",up);el.removeEventListener("pointercancel",cancel);if(el.hasPointerCapture(ev.pointerId))el.releasePointerCapture(ev.pointerId);ghost.remove();cancelDrag=null;}
    function cancel(){cleanup();suppressClick=true;setTimeout(()=>suppressClick=false,300);}
    function move(e){if(e.pointerId!==ev.pointerId||!SistersRound.canInteract())return;moved=moved||Math.hypot(e.clientX-ev.clientX,e.clientY-ev.clientY)>5;ghost.style.left=e.clientX-ox+"px";ghost.style.top=e.clientY-oy+"px";}
    function up(e){if(e.pointerId!==ev.pointerId)return;const x=e.clientX-ox+w/2,y=e.clientY-oy+h/2;cleanup();suppressClick=true;setTimeout(()=>suppressClick=false,0);if(!moved){selected=index;document.getElementById("status").textContent="已選一片，請點目標格";return;}const cells=[...board.children],hit=cells.findIndex(c=>{const r=c.getBoundingClientRect();return x>=r.left&&x<=r.right&&y>=r.top&&y<=r.bottom;});drop(index,hit);}
    cancelDrag=cancel;el.addEventListener("pointermove",move);el.addEventListener("pointerup",up);el.addEventListener("pointercancel",cancel);
  }
  function chips() {
    const sizeRow = document.getElementById("size-row");
    sizeRow.replaceChildren();
    sizes.forEach(n => {
      const b = document.createElement("button");
      b.type = "button"; b.className = "chip" + (n === (wanted?.pieces??loadingTarget?.pieces??state.pieces) ? " selected" : ""); b.textContent = n + " 片";
      b.dataset.roundSwitch="true";b.disabled=initializing;b.onclick = () => start("new",n,wanted?.art??loadingTarget?.art??state.art);
      sizeRow.append(b);
    });
    const artRow = document.getElementById("art-row");
    artRow.replaceChildren();
    arts.forEach(a => {
      const b = document.createElement("button");
      b.type = "button"; b.className = "chip" + (a.id === (wanted?.art??loadingTarget?.art??state.art).id ? " selected" : ""); b.textContent = a.name;
      b.dataset.roundSwitch="true";b.disabled=initializing;b.onclick = () => start("new",wanted?.pieces??loadingTarget?.pieces??state.pieces,a);
      artRow.append(b);
    });
  }
  SistersPlay.showCoach("puzzle", [{ demo: "🧩", line: "看完成圖，把碎片拖進正確空格" }]);
  SistersPlay.mount({ title: "拼圖", onRestart: () => start("restart") });
  document.getElementById("hint").onclick = () => {
    if(!SistersRound.canInteract())return;
    const i = state.placed.findIndex(v => !v);
    if (i < 0 || state.hints >= 3) return;
    state.hints++; state.placed[i] = true; SistersPlay.playSound("ok"); render();finish();SistersRound.checkpoint();
  };
  document.getElementById("overlay-next").onclick = ()=>start();
  chips();const restored=await SistersRound.attach({snapshot:()=>{const {image,...saved}=state;return {...saved,selected};},cancel:()=>cancelDrag?.(),restore:async p=>{if(!sizes.includes(p.pieces)||!arts.some(a=>a.id===p.art.id))throw Error("拼圖存檔格式錯誤");Object.assign(state,p);selected=p.selected;state.image=await loadImage(state.art.src);chips();render();}});initializing=false;if(!restored)await start();else chips();
  window.addEventListener("resize",()=>{cancelDrag?.();if(state.image)render();});
})();
