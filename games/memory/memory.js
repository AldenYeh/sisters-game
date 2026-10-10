
(async () => {
  "use strict";
  const themes = {
    animal:["🐱","🐶","🐰","🦊","🐻","🐼","🐸","🐷","🐵","🦁","🐮","🐯","🐨","🐔","🐧","🦄","🐹","🐤"],
    fruit:["🍎","🍊","🍋","🍇","🍓","🍑","🍒","🥝","🍉","🍌","🍍","🥭","🍈","🍏","🍐","🫐","🥥","🍅"],
    car:["🚗","🚕","🚌","🚎","🚓","🚑","🚒","🚚","🚜","🚲","🛵","🏍️","✈️","🚀","⛵","🚁","🚂","🚙"],
    food:["🍜","🍣","🍩","🍪","🍰","🍦","🍿","🥨","🥐","🥖","🧀","🍔","🍟","🌮","🥗","🍱","🥟","🍙"],
    shape:["●","▲","■","◆","★","✚","✿","♥","☀","☂","☾","♫","⚑","✦","⬟","⬡","◈","◉"]
  };
  const sizes = [[4,3],[4,4],[6,4],[6,6]];
  let size = sizes[0], theme="animal", deck=[], open=[], lock=false, flips=0, startedAt=Date.now(), restarts=0, mismatchTimer=null;
  async function start(reason="new", nextSize=size, nextTheme=theme) {
    return SistersRound.start(()=>{
    size=nextSize; theme=nextTheme; if(reason==="restart") restarts++; chips();
    const n = size[0]*size[1]/2;
    const icons = themes[theme].slice(0,n);
    deck = icons.concat(icons).map((icon,i)=>({id:i, icon, up:false, gone:false}));
    for (let i=deck.length-1;i>0;i--) { const j=Math.floor(Math.random()*(i+1)); [deck[i],deck[j]]=[deck[j],deck[i]]; }
    open=[]; lock=false; flips=0; startedAt=Date.now();
    document.getElementById("complete").hidden=true;
    render();
    },reason);
  }
  function render() {
    const grid=document.getElementById("grid");
    grid.style.setProperty("--memory-cols",size[0]);grid.style.gridTemplateColumns=`repeat(${size[0]},minmax(0,1fr))`;
    grid.replaceChildren();
    deck.forEach((card,i)=>{
      const b=document.createElement("button");
      b.type="button"; b.className="card"+(card.up?" up":"")+(card.gone?" gone":"");
      b.textContent=card.up||card.gone?card.icon:"🐾";
      b.onclick=()=>flip(i);
      grid.append(b);
    });
    document.getElementById("status").textContent=`翻牌 ${flips} 次 · 時間只給家長看，不扣分`;
  }
  function flip(i) {
    if(!SistersRound.canInteract()) return;
    const card=deck[i];
    if (lock || card.up || card.gone) return;
    card.up=true; open.push(i); flips++; SistersPlay.playSound('ok'); render();
    if (open.length===2) {
      const [a,b]=open;
      if (deck[a].icon===deck[b].icon) { deck[a].gone=deck[b].gone=true; open=[]; if (deck.every(c=>c.gone)) finish(); }
      else { lock=true; mismatchTimer=setTimeout(()=>{ mismatchTimer=null; if(!SistersRound.canInteract()) return; SistersPlay.playSound('soft'); deck[a].up=deck[b].up=false; open=[]; lock=false; render(); SistersRound.checkpoint(); }, 700); }
    }
    render(); SistersRound.checkpoint();
  }
  function finish() {
    const sec=Math.round((Date.now()-startedAt)/1000);
    SistersPlay.showComplete(`翻了 ${flips} 次，用了 ${sec} 秒`);
    SistersPlay.recordResult({game:"memory", difficulty:`${size[0]}x${size[1]}`, level:theme, startedAt, moves:flips, restartCount:restarts, duration:Date.now()-startedAt});
  }
  function chips() {
    const s=document.getElementById("size-row"); s.replaceChildren();
    sizes.forEach(sz=>{ const b=document.createElement("button"); b.type="button"; b.className="chip"+(sz===size?" selected":""); b.textContent=`${sz[0]}×${sz[1]}`; b.onclick=()=>start("new",sz,theme); s.append(b); });
    const t=document.getElementById("theme-row"); t.replaceChildren();
    Object.keys(themes).forEach(name=>{ const b=document.createElement("button"); b.type="button"; b.className="chip"+(name===theme?" selected":""); b.textContent=({animal:"動物",fruit:"水果",car:"交通工具",food:"食物",shape:"形狀"})[name]; b.onclick=()=>start("new",size,name); t.append(b); });
  }
  SistersPlay.showCoach("memory", [{demo:"🃏🃏", line:"翻兩張，一樣的留著"}]);
  SistersPlay.mount({title:"記憶翻牌", onRestart:()=>start("restart")});
  document.getElementById("overlay-next").onclick=()=>start();
  function cancel(){ clearTimeout(mismatchTimer); mismatchTimer=null; if(lock){open.forEach(i=>{if(deck[i]&&!deck[i].gone)deck[i].up=false;});open=[];lock=false;render();} }
  function snapshot(){const cards=deck.map(c=>({...c}));const showing=lock?[]:[...open];if(lock)open.forEach(i=>{if(!cards[i].gone)cards[i].up=false;});return {size,theme,deck:cards,open:showing,flips,startedAt,restarts};}
  chips(); if(!await SistersRound.attach({snapshot,cancel,restore:p=>{size=sizes.find(sz=>String(sz)===String(p.size));if(!size||!themes[p.theme]||p.deck.length!==size[0]*size[1])throw Error("翻牌存檔格式錯誤");theme=p.theme;deck=p.deck;open=p.open;flips=p.flips;startedAt=p.startedAt;restarts=p.restarts;lock=false;chips();render();}})) await start();
})();
