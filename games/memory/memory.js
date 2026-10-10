
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
  let size = sizes[0], theme="animal", deck=[], open=[], lock=false, flips=0, startedAt=Date.now(), restarts=0, mismatchTimer=null,mismatchHideAt=0;
  async function start(reason="new", nextSize=size, nextTheme=theme) {
    return SistersRound.start(async()=>{
    size=nextSize; theme=nextTheme; if(reason==="restart") restarts++; chips();
    const n = size[0]*size[1]/2;
    const icons = themes[theme].slice(0,n);
    const q=await SistersChallenges.draw('memory:'+size.join('x')+':'+theme,SistersBanks.memory[n*2]);
    deck=q.layout.map((pair,i)=>({id:i,icon:icons[pair],up:false,gone:false}));
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
    document.getElementById("status").textContent=`翻牌 ${flips} 次 · 找出所有配對`;
  }
  function flip(i) {
    if(!SistersRound.canInteract()) return;
    const card=deck[i];
    if (lock || card.up || card.gone) return;
    card.up=true; open.push(i); flips++; SistersPlay.playSound('ok'); render();
    if (open.length===2) {
      const [a,b]=open;
      if (deck[a].icon===deck[b].icon) { deck[a].gone=deck[b].gone=true; open=[]; if (deck.every(c=>c.gone)) finish(); }
      else { lock=true;mismatchHideAt=Date.now()+700;hideMismatch(); }
    }
    render(); SistersRound.checkpoint();
  }
  function hideMismatch(){clearTimeout(mismatchTimer);mismatchTimer=setTimeout(()=>{mismatchTimer=null;if(!SistersRound.canInteract()){if(SistersFamily.canPlay(SistersRound.current()))hideMismatch();return;}open.forEach(i=>{if(deck[i]&&!deck[i].gone)deck[i].up=false;});open=[];lock=false;SistersPlay.playSound('soft');render();SistersRound.checkpoint();},Math.max(100,mismatchHideAt-Date.now()));}
  function finish() {
    const sec=Math.round((Date.now()-startedAt)/1000);
    SistersPlay.showComplete(`翻了 ${flips} 次，用了 ${sec} 秒`);
    SistersPlay.recordResult({game:"memory", difficulty:`${size[0]}x${size[1]}`, level:theme, startedAt, moves:flips, restartCount:restarts, duration:Date.now()-startedAt});
  }
  function chips(){SistersChallenges.selector(document.getElementById('size-row'),sizes.map((sz,i)=>({value:i,label:sz[0]+'×'+sz[1]})),sizes.findIndex(sz=>String(sz)===String(size)),v=>start('new',sizes[+v],theme),'棋盤大小');SistersChallenges.selector(document.getElementById('theme-row'),Object.keys(themes).map(value=>({value,label:({animal:'動物',fruit:'水果',car:'交通工具',food:'食物',shape:'形狀'})[value]})),theme,v=>start('new',size,v),'圖案主題');}
  SistersPlay.showCoach("memory", [{demo:"🃏🃏", line:"翻兩張，一樣的留著"}]);
  SistersPlay.mount({title:"記憶翻牌", onRestart:()=>start("restart")});
  document.getElementById("overlay-next").onclick=()=>start();
  function cancel(){clearTimeout(mismatchTimer);mismatchTimer=null;}
  function snapshot(){return{size,theme,deck:deck.map(c=>({...c})),open:[...open],lock,mismatchHideAt,flips,startedAt,restarts};}
  function resume(){if(lock)hideMismatch();}
  chips(); if(!await SistersRound.attach({snapshot,cancel,resume,restore:p=>{size=sizes.find(sz=>String(sz)===String(p.size));if(!size||!themes[p.theme]||p.deck.length!==size[0]*size[1])throw Error("翻牌存檔格式錯誤");theme=p.theme;deck=p.deck;open=p.open;flips=p.flips;startedAt=p.startedAt;restarts=p.restarts;lock=!!p.lock;mismatchHideAt=p.mismatchHideAt||0;chips();render();}})) await start();
})();
