(() => {
  'use strict';
  function rng(seed){let n=seed>>>0||1;return()=>{n^=n<<13;n^=n>>>17;n^=n<<5;return(n>>>0)/4294967296;};}
  function shuffle(a,random){a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
  async function draw(key,items){
    if(!Array.isArray(items)||items.length<50)throw Error('有效題庫未達 50 題；已停止開局');
    return SistersFamily.transact(s=>{
      const player=SistersRound.player(),all=s.cycles[player]||(s.cycles[player]={});let c=all[key];
      if(!c||c.size!==items.length||c.cursor>=c.order.length){const seed=crypto.getRandomValues(new Uint32Array(1))[0],order=shuffle(items.map((_,i)=>i),rng(seed));if(c?.last===order[0])[order[0],order[1]]=[order[1],order[0]];c={size:items.length,seed,cycle:(c?.cycle||0)+1,order,cursor:0,last:null};all[key]=c;}
      const index=c.order[c.cursor++];c.last=index;return structuredClone(items[index]);
    });
  }
  function selector(row,options,value,onChange,label='選擇難度'){
    row.replaceChildren();const select=document.createElement('select');select.className='challenge-select';select.setAttribute('aria-label',label);select.dataset.roundSwitch='true';
    for(const opt of options){const el=document.createElement('option');el.value=String(opt.value);el.textContent=opt.label;select.append(el);}select.value=String(value);select.onchange=()=>onChange(select.value);row.append(select);
  }
  window.SistersChallenges=Object.freeze({rng,shuffle,draw,selector});
})();
