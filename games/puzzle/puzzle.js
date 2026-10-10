(async () => {
  "use strict";
  const arts = [
    { id: "garden", name: "花園", src: "art/garden.jpg" },
    { id: "room", name: "房間", src: "art/room.jpg" },
    { id: "sea", name: "海底", src: "art/sea.jpg" }
  ];
  const sizes = [12, 24, 36];
  const state = { pieces: 12, art: arts[0], placed: [], hints: 0, moves: 0, restarts: 0, startedAt: Date.now(), cols: 4, rows: 3, image: null };
  const board = document.getElementById("board");
  const tray = document.getElementById("tray");
  function dims(n) { return { 12: [4, 3], 24: [6, 4], 36: [6, 6] }[n]; }
  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = ()=>reject(new Error("拼圖圖片載入失敗，請檢查連線後重試；原局尚未覆寫。"));
      img.src = src;
    });
  }
  let cancelDrag=null,selected=null,suppressClick=false;
  async function start(reason="new",pieces=state.pieces,art=state.art) {return SistersRound.start(async()=>{state.pieces=pieces;state.art=art;if(reason==="restart")state.restarts++;selected=null;
    const [cols, rows] = dims(state.pieces);
    state.cols = cols; state.rows = rows;
    state.placed = Array(cols * rows).fill(false);
    state.hints = 0; state.moves = 0; state.startedAt = Date.now();
    document.getElementById("complete").hidden = true;
    state.image = await loadImage(state.art.src);
    chips();render();
  },reason);}
  function cellSize() {
    const w = Math.floor(Math.min(board.parentElement.clientWidth || 520, Math.max(24,innerWidth-48), 560) / state.cols);
    return { w: Math.max(24, w), h: Math.max(24, Math.floor(w * 0.72)) };
  }
  function slice(i, w, h, solid) {
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
    if (!solid) { g.fillStyle = "rgba(255,253,249,.7)"; g.fillRect(0, 0, w, h); }
    return out.toDataURL();
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
      cell.style.background = `url(${slice(i, size.w, size.h, state.placed[i])}) center/cover`;
      cell.style.transition = "transform .18s ease";cell.tabIndex=0;cell.setAttribute("role","button");cell.setAttribute("aria-label",`第 ${i+1} 格`);const place=()=>{if(selected!==null){drop(selected,i);selected=null;}};cell.onclick=place;cell.onkeydown=e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();place();}};
      board.append(cell);
    }
    tray.replaceChildren();
    state.placed.forEach((on, i) => {
      if (on) return;
      const el = document.createElement("button");
      el.type = "button";
      el.className = "piece";
      el.style.width = size.w + "px";
      el.style.height = size.h + "px";
      el.style.background = `url(${slice(i, size.w, size.h, true)}) center/cover`;
      el.style.border = "0";
      el.style.borderRadius = "10px";
      el.style.cursor = "grab";
      el.setAttribute("aria-label",`第 ${i+1} 片，選取後再選目標格`);el.onclick=()=>{if(SistersRound.canInteract()&&!suppressClick){selected=i;document.getElementById("status").textContent=`已選第 ${i+1} 片，請點目標格`;SistersRound.checkpoint();}};el.addEventListener("pointerdown", ev => begin(ev, i, el));
      tray.append(el);
    });
    document.getElementById("status").textContent = `拖到淡色的同一格，放對會變亮 · ${state.placed.filter(Boolean).length} / ${state.placed.length}`;
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
    function up(e){if(e.pointerId!==ev.pointerId)return;const x=e.clientX-ox+w/2,y=e.clientY-oy+h/2;cleanup();suppressClick=true;setTimeout(()=>suppressClick=false,0);if(!moved){selected=index;document.getElementById("status").textContent=`已選第 ${index+1} 片，請點目標格`;return;}const cells=[...board.children],hit=cells.findIndex(c=>{const r=c.getBoundingClientRect();return x>=r.left&&x<=r.right&&y>=r.top&&y<=r.bottom;});drop(index,hit);}
    cancelDrag=cancel;el.addEventListener("pointermove",move);el.addEventListener("pointerup",up);el.addEventListener("pointercancel",cancel);
  }
  function chips() {
    const sizeRow = document.getElementById("size-row");
    sizeRow.replaceChildren();
    sizes.forEach(n => {
      const b = document.createElement("button");
      b.type = "button"; b.className = "chip" + (n === state.pieces ? " selected" : ""); b.textContent = n + " 片";
      b.onclick = () => start("new",n,state.art);
      sizeRow.append(b);
    });
    const artRow = document.getElementById("art-row");
    artRow.replaceChildren();
    arts.forEach(a => {
      const b = document.createElement("button");
      b.type = "button"; b.className = "chip" + (a.id === state.art.id ? " selected" : ""); b.textContent = a.name;
      b.onclick = () => start("new",state.pieces,a);
      artRow.append(b);
    });
  }
  SistersPlay.showCoach("puzzle", [{ demo: "🧩", line: "把碎片拖到同樣的格子" }]);
  SistersPlay.mount({ title: "拼圖", onRestart: () => start("restart") });
  document.getElementById("hint").onclick = () => {
    if(!SistersRound.canInteract())return;
    const i = state.placed.findIndex(v => !v);
    if (i < 0 || state.hints >= 3) return;
    state.hints++; state.placed[i] = true; SistersPlay.playSound("ok"); render();finish();SistersRound.checkpoint();
  };
  document.getElementById("overlay-next").onclick = ()=>start();
  chips();if(!await SistersRound.attach({snapshot:()=>{const {image,...saved}=state;return {...saved,selected};},cancel:()=>cancelDrag?.(),restore:async p=>{if(!sizes.includes(p.pieces)||!arts.some(a=>a.id===p.art.id))throw Error("拼圖存檔格式錯誤");Object.assign(state,p);selected=p.selected;state.image=await loadImage(state.art.src);chips();render();}}))await start();
  window.addEventListener("resize",()=>{cancelDrag?.();if(state.image)render();});
})();
