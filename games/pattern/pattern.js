(async()=>{
  'use strict';
  const types=[{value:'repeat',label:'重複一組'},{value:'add',label:'固定加法'},{value:'groups',label:'分組增加'}];
  let kind='repeat',question=null,answer=0,startedAt=0,attempts=0,legacyRound=null,done=false;
  // Exact old progress retains its remaining original sequence and answers.
  const old=[
    [['●','▲','●','▲'],['●','■','★'],'每兩個一組，● ▲ 從頭重複'],
    [['1','2','3','4'],['5','6','1'],'每次加 1'],
    [['紅','紅','藍','藍'],['紅','藍','綠'],'紅 紅 藍 藍 這組從頭重複'],
    [['小','中','大'],['更大','小','中'],'依大小順序，每次更大一級'],
    [['★','★','★★','★★'],['★★★','★','●'],'同樣星數連續 2 次，再多 1 顆'],
    [['🐱','🐟','🐱','🐟'],['🐱','🐶','🐟'],'🐱 🐟 從頭重複'],
    [['2','4','6','8'],['10','9','12'],'每次加 2'],
    [['○','○○','○○○'],['○○○○','○','●'],'每次多 1 個圈'],
    [['上','下','上','下'],['上','左','下'],'上 下 從頭重複'],
    [['A','B','A','B'],['A','C','B'],'A B 從頭重複'],
    [['1','1','2','3'],['5','4','8'],'後一個數字等於前兩個相加'],
    [['🌙','⭐','🌙','⭐'],['🌙','☀','⭐'],'🌙 ⭐ 從頭重複']
  ];
  function legacy(){const q=old[Math.min(legacyRound,11)];return{items:q[0],choices:q[1],answer:q[1][0],rule:q[2],example:'依這一題上方的明確規則，選下一個。'};}
  async function start(reason='new',next=kind){return SistersRound.start(async()=>{kind=next;question=await SistersChallenges.draw('pattern:'+kind,SistersBanks.pattern[kind]);legacyRound=null;startedAt=Date.now();attempts=0;done=false;document.getElementById('complete').hidden=true;render();},reason);}
  function render(){const q=legacyRound===null?question:legacy();answer=q.choices.indexOf(q.answer);const seq=document.getElementById('seq');seq.replaceChildren();for(const item of[...q.items,'?']){const d=document.createElement('div');d.className='token';d.textContent=item;seq.append(d);}document.getElementById('pattern-rule').textContent=q.rule;document.getElementById('pattern-example').textContent=q.example;const choices=document.getElementById('choices');choices.replaceChildren();q.choices.forEach((item,i)=>{const b=document.createElement('button');b.type='button';b.className='token';b.textContent=item;b.disabled=done;b.onclick=()=>pick(i);choices.append(b);});document.getElementById('status').textContent=legacyRound===null?'依上方規則，選下一個；答對這題就完成':`保留舊局第 ${Math.min(legacyRound+1,12)} / 12 題`;SistersChallenges.selector(document.getElementById('tier-row'),types,kind,v=>start('new',v),'規律類型');}
  function pick(i){if(!SistersRound.canInteract()||done)return;attempts++;if(i!==answer){SistersPlay.playSound('soft');document.getElementById('status').textContent='再依上方的規則看看';SistersRound.checkpoint();return;}SistersPlay.playSound('ok');if(legacyRound!==null&&++legacyRound<12){render();SistersRound.checkpoint();return;}done=true;render();SistersPlay.showComplete(legacyRound===null?'找到了規律':'完成保留的十二題');SistersPlay.recordResult({difficulty:legacyRound===null?kind:'mixed',level:question?.id||12,startedAt,moves:legacyRound===null?1:12,attempts});}
  SistersPlay.showCoach('pattern',[{demo:'● ▲｜● ▲｜?',line:'先讀規則，再選下一個'},{demo:'1 → 3 → 5',line:'例如每次加 2，下一個是 7'}]);SistersPlay.mount({title:'規律接龍',onRestart:()=>start('restart')});document.getElementById('overlay-next').onclick=()=>start();
  if(!await SistersRound.attach({snapshot:()=>({kind,question,answer,startedAt,attempts,legacyRound,done}),restore:p=>{kind=p.kind||'repeat';question=p.question||null;answer=p.answer;startedAt=p.startedAt;attempts=p.attempts||0;legacyRound=p.question?(p.legacyRound??null):(p.round??0);done=p.done||legacyRound===12;render();}}))await start();
})();
