
(() => {
  "use strict";
  const themes = {
    animal:["🐱","🐶","🐰","🦊","🐻","🐼","🐸","🐷","🐵","🦁","🐮","🐯","🐨","🐔","🐧","🦄","🐹","🐤"],
    fruit:["🍎","🍊","🍋","🍇","🍓","🍑","🍒","🥝","🍉","🍌","🍍","🥭","🍈","🍏","🍐","🫐","🥥","🍅"],
    car:["🚗","🚕","🚌","🚎","🚓","🚑","🚒","🚚","🚜","🚲","🛵","🏍️","✈️","🚀","⛵","🚁","🚂","🚙"],
    food:["🍜","🍣","🍩","🍪","🍰","🍦","🍿","🥨","🥐","🥖","🧀","🍔","🍟","🌮","🥗","🍱","🥟","🍙"],
    shape:["●","▲","■","◆","★","✚","✿","♥","☀","☂","☾","♫","⚑","✦","⬟","⬡","◈","◉"]
  };
  const sizes = [[4,3],[4,4],[6,4],[6,6]];
  let size = sizes[0], theme="animal", deck=[], open=[], lock=false, flips=0, startedAt=Date.now(), restarts=0;
  function start() {
    const n = size[0]*size[1]/2;
    const icons = themes[theme].slice(0,n);
    deck = icons.concat(icons).map((icon,i)=>({id:i, icon, up:false, gone:false}));
    for (let i=deck.length-1;i>0;i--) { const j=Math.floor(Math.random()*(i+1)); [deck[i],deck[j]]=[deck[j],deck[i]]; }
    open=[]; lock=false; flips=0; startedAt=Date.now();
    document.getElementById("complete").hidden=true;
    render();
  }
  function render() {
    const grid=document.getElementById("grid");
    grid.style.gridTemplateColumns=`repeat(${size[0]},minmax(0,1fr))`;
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
    const card=deck[i];
    if (lock || card.up || card.gone) return;
    card.up=true; open.push(i); flips++; SistersPlay.playSound('ok'); render();
    if (open.length===2) {
      const [a,b]=open;
      if (deck[a].icon===deck[b].icon) { deck[a].gone=deck[b].gone=true; open=[]; if (deck.every(c=>c.gone)) finish(); }
      else { lock=true; setTimeout(()=>{ SistersPlay.playSound('soft'); deck[a].up=deck[b].up=false; open=[]; lock=false; render(); }, 700); }
    }
  }
  function finish() {
    const sec=Math.round((Date.now()-startedAt)/1000);
    SistersPlay.showComplete(`翻了 ${flips} 次，用了 ${sec} 秒`);
    SistersPlay.recordResult({game:"memory", difficulty:`${size[0]}x${size[1]}`, level:theme, startedAt, moves:flips, restartCount:restarts, duration:Date.now()-startedAt});
  }
  function chips() {
    const s=document.getElementById("size-row"); s.replaceChildren();
    sizes.forEach(sz=>{ const b=document.createElement("button"); b.type="button"; b.className="chip"+(sz===size?" selected":""); b.textContent=`${sz[0]}×${sz[1]}`; b.onclick=()=>{size=sz; chips(); start();}; s.append(b); });
    const t=document.getElementById("theme-row"); t.replaceChildren();
    Object.keys(themes).forEach(name=>{ const b=document.createElement("button"); b.type="button"; b.className="chip"+(name===theme?" selected":""); b.textContent=name; b.onclick=()=>{theme=name; chips(); start();}; t.append(b); });
  }
  SistersPlay.showCoach("memory", [{demo:"🃏🃏", line:"翻兩張，一樣的留著"}]);
  SistersPlay.mount({title:"記憶翻牌", onRestart:()=>{restarts++; start();}});
  document.getElementById("overlay-next").onclick=start;
  chips(); start();
})();
