/* R1: durable rounds only. No passwords, authorization budgets or grace periods. */
(() => {
  'use strict';
  const KEY='sistersRoundLifecycleV1', LOCK_KEY='sistersRoundLockedV1', OWNER='sistersRoundOwnerV1';
  const game=location.pathname.match(/\/games\/([^/]+)\//)?.[1] || null;
  let adapter, round=null, release, busy=false, restoring=false, error='', pending=null, canceled=false;
  const capable=!!(window.isSecureContext && navigator.locks && crypto.randomUUID);
  const empty=()=>({version:1,revision:0,round:null,events:[]});
  function read(){
    const raw=localStorage.getItem(KEY); if(!raw)return empty();
    const s=JSON.parse(raw);
    if(s.version!==1 || !Number.isInteger(s.revision) || !Array.isArray(s.events) ||
      (s.round && (!s.round.id || !s.round.game || !s.round.player || !['active','completed','abandoned'].includes(s.round.status) || !s.round.payload)))
      throw new Error('當局資料無法讀取；已停止操作，沒有清除紀錄或生成新局。');
    return s;
  }
  function rawLocked(){return localStorage.getItem(LOCK_KEY)==='1';}
  function owns(){return !!release && !!round && read().round?.id===round.id;}
  function canInteract(){try{return !busy&&!restoring&&!error&&!rawLocked()&&round?.status==='active'&&owns();}catch(e){fail(e);return false;}}
  function emit(s,type,id,detail={}){
    const eventId=type+':'+id;
    if(s.events.some(e=>e.id===eventId))return;
    const event={id:eventId,type,roundId:id,at:Date.now(),...detail};
    s.events.push(event);s.events=s.events.slice(-400);
  }
  function write(s){localStorage.setItem(KEY,JSON.stringify(s));}
  function publish(before,s){for(const e of s.events)if(!before.events.some(old=>old.id===e.id))document.dispatchEvent(new CustomEvent('sisters:round',{detail:e}));}
  function persist(s){const before=read();s.revision=before.revision+1;write(s);publish(before,s);}
  function payload(){return JSON.parse(JSON.stringify(adapter.snapshot()));}
  function fail(e){error=e.message||String(e);refresh();}
  async function acquire(){
    if(release)return true;
    if(!capable){fail(new Error('當局保存需要 HTTPS 與支援 Web Locks 的瀏覽器。'));return false;}
    return new Promise(resolve=>navigator.locks.request(OWNER,{ifAvailable:true},lock=>{
      if(!lock){resolve(false);return;}
      return new Promise(done=>{release=done;resolve(true);});
    }).catch(e=>{fail(e);resolve(false);}));
  }
  function relinquish(){if(release)release();release=null;}
  function cancelTransient(){if(canceled)return;canceled=true;try{adapter?.cancel?.();}finally{canceled=false;}}
  function checkpoint(){
    if(!adapter||busy||restoring||!round||round.status!=='active'||!release||error)return false;
    try{if(!owns())return false;const nextPayload=payload();if(JSON.stringify(nextPayload)===JSON.stringify(round.payload))return true;round.payload=nextPayload;const s=read();s.round=round;persist(s);refresh();return true;}
    catch(e){pending={kind:'snapshot',round:structuredClone(round)};fail(new Error('當局存檔失敗，操作已暫停。請保留此頁並重試保存。'));cancelTransient();return false;}
  }
  function legacyResults(){const raw=localStorage.getItem('sistersGameResultsV1');if(!raw)return [];const data=JSON.parse(raw);if(!Array.isArray(data))throw new Error('既有通關紀錄格式錯誤，沒有覆寫。');return data;}
  function mirror(r){
    if(!r.result)return;
    if(r.game==='maze'){
      const key='mazeAdventureRecordsV1',raw=localStorage.getItem(key);
      const records=raw?JSON.parse(raw):{version:1,players:{}};
      if(records.version!==1||!records.players||typeof records.players!=='object')throw new Error('迷宮紀錄格式錯誤，沒有覆寫。');
      const applied=records.lifecycleRoundIds||[];
      if(!Array.isArray(applied))throw new Error('迷宮結算識別資料錯誤。');
      if(applied.includes(r.id))return;
      const p=records.players[r.player]||(records.players[r.player]={});
      const old=p[r.result.difficulty]||{completions:0,bestMs:null};
      if(!Number.isInteger(old.completions)||old.completions<0||!(old.bestMs===null||Number.isFinite(old.bestMs)))throw new Error('迷宮紀錄值錯誤，沒有覆寫。');
      const isNewBest=old.bestMs===null||r.result.duration<old.bestMs;
      p[r.result.difficulty]={...old,completions:old.completions+1,bestMs:isNewBest?r.result.duration:old.bestMs};
      records.lifecycleRoundIds=[...applied,r.id];
      localStorage.setItem(key,JSON.stringify(records));
    }else{
      const all=legacyResults();if(all.some(x=>x.roundId===r.id))return;
      all.push(r.result);localStorage.setItem('sistersGameResultsV1',JSON.stringify(all));
    }
  }
  function reconcile(){
    if(!round||round.status!=='completed'||round.resultSynced)return true;
    try{mirror(round);round.resultSynced=true;const s=read();if(s.round?.id!==round.id)throw new Error('另一頁已更新當局。');s.round=round;persist(s);return true;}
    catch(e){pending={kind:'result',round:structuredClone(round)};fail(new Error('通關紀錄尚未保存：'+e.message+' 請保留此頁並重試。'));return false;}
  }
  async function start(factory,reason='new'){
    if(busy||error)return false;
    try{if(rawLocked())return false;}catch(e){fail(e);return false;}
    busy=true;const previousLocal=round;
    try{
      if(!await acquire()){notice('原局正在另一分頁操作，請回到該分頁或先關閉它。');return false;}
      const s=read();
      if(s.round?.status==='active'&&s.round.id!==round?.id){notice('尚有未完成的原局；請繼續原局，或明確放棄後再開始。');relinquish();return false;}
      if(s.round?.status==='completed'&&!s.round.resultSynced){round=s.round;if(!reconcile())return false;}
      cancelTransient();
      const previous=s.round;
      const player=window.SistersShared.loadPlayer()||'guest';
      round={id:crypto.randomUUID(),game,player,href:location.pathname+location.hash,status:'active',startedAt:Date.now(),endedAt:null,payload:null,result:null,resultSynced:false};
      await factory();round.payload=payload();
      const next=read();
      if(previous?.status==='active')emit(next,'GameAbandoned',previous.id,{game:previous.game,player:previous.player,reason});
      next.round=round;
      emit(next,'GameStarted',round.id,{game,player,reason});emit(next,'GameActive',round.id,{game,player});
      if(reason==='restart')emit(next,'GameRestarted',round.id,{previousRoundId:previous?.id,game,player});
      try{persist(next);}catch(e){pending={kind:'start',state:next,round:structuredClone(round)};throw new Error('新局無法保存，操作已暫停。請保留此頁並重試。');}
      pending=null;message='';refresh();return true;
    }catch(e){if(!pending){round=previousLocal;pending={kind:"factory",factory,reason};}fail(e);return false;}finally{busy=false;refresh();}
  }
  function complete(entry={}){
    if(restoring||!round||round.status!=='active'||!owns()||error||rawLocked())return false;
    cancelTransient();
    round.status='completed';round.endedAt=Date.now();round.payload=payload();
    round.summary=document.querySelector('#complete p')?.textContent||'';
    round.result={...entry,roundId:round.id,player:round.player,game,startedAt:round.startedAt,completedAt:round.endedAt,
      duration:entry.duration??Math.max(0,round.endedAt-round.startedAt),moves:entry.moves??0,attempts:entry.attempts??1,hintsUsed:entry.hintsUsed??0,restartCount:entry.restartCount??0};
    round.resultSynced=false;
    try{const s=read();s.round=round;emit(s,'GameCompleted',round.id,{game,player:round.player});persist(s);if(!reconcile())return false;relinquish();refresh();return true;}
    catch(e){pending={kind:'complete',round:structuredClone(round)};fail(new Error('完成狀態尚未保存，請保留此頁並重試。'));return false;}
  }
  async function attach(nextAdapter){
    adapter=nextAdapter;
    try{
      const s=read();if(s.round?.game!==game||s.round.status==='abandoned')return false;
      if(!await acquire()){notice('原局正在另一分頁操作。');return false;}
      if(read().round?.id!==s.round.id){relinquish();return false;}
      round=structuredClone(s.round);restoring=true;
      await adapter.restore(round.payload,round);
      restoring=false;
      if(round.status==='completed'){
        const panel=document.getElementById('complete');if(panel){panel.hidden=false;const p=panel.querySelector('p');if(p)p.textContent=round.summary;}
        if(reconcile())relinquish();else return true;
      }
      pending=null;message='';refresh();return true;
    }catch(e){restoring=false;pending={kind:'restore'};fail(new Error('原局無法恢復：'+e.message+' 沒有生成新局。'));return true;}
  }
  async function abandon(destination){
    if(busy||error)return false;
    if(!await acquire()){notice('請先在正在遊玩的分頁放棄原局。');return false;}
    try{
      const s=read();if(s.round?.status==='active'){
        if(round?.id===s.round.id){cancelTransient();round.payload=payload();s.round=round;}
        s.round.status='abandoned';s.round.endedAt=Date.now();emit(s,'GameAbandoned',s.round.id,{game:s.round.game,player:s.round.player,reason:'explicit'});persist(s);round=s.round;
      }
      relinquish();refresh();if(destination)location.href=destination;return true;
    }catch(e){fail(new Error('放棄狀態未保存，原局仍保留：'+e.message));return false;}
  }
  function leave(destination){cancelTransient();if(round?.status==='active'&&!checkpoint())return false;location.href=destination;return true;}
  function retry(){
    if(!pending){error='';refresh();return;}
    try{
      const item=pending;error='';
      if(item.kind==='restore'){pending=null;return attach(adapter);}
      if(item.kind==='factory'){pending=null;return start(item.factory,item.reason);}
      if(item.kind==='start'){round=item.round;persist(item.state);}
      else{round=item.round;if(adapter&&round.status==='active')round.payload=payload();const s=read();if(s.round?.id!==round.id)throw new Error('保存版本已改變，請勿覆寫另一頁的局面。');s.round=round;if(round.status==='completed')emit(s,'GameCompleted',round.id,{game,player:round.player});persist(s);}
      if(round.status==='completed'&&!reconcile())return;
      pending=null;if(round.status!=='active')relinquish();refresh();
    }catch(e){fail(new Error('重試保存仍失敗：'+e.message));}
  }
  const bar=document.createElement('aside');bar.className='round-bar';
  bar.innerHTML='<span id="round-status" role="status"></span><button id="round-resume" type="button" hidden>繼續原局</button><button id="round-abandon" type="button" hidden>放棄當局</button><button id="round-retry" type="button" hidden>重試保存</button>';
  document.body.prepend(bar);new ResizeObserver(()=>document.documentElement.style.setProperty('--round-bar-height',bar.getBoundingClientRect().height+'px')).observe(bar);const el=id=>document.getElementById(id);
  let message='';function notice(text){message=text;refresh();}
  function refresh(){
    try{const s=read(),r=s.round;el('round-status').textContent=error||message||(rawLocked()?'當局已暫停；解鎖後可接續。':r?.status==='active'?`當局已保存 · ${window.SISTERS_CONTENT.players[r.player]?.name.zh||r.player}`:r?.status==='completed'?'完成當局 · 紀錄已保存':'遊戲進度會自動保存');
      el('round-resume').hidden=!r||r.status!=='active'||(round?.id===r.id&&release);
      el('round-abandon').hidden=!r||r.status!=='active';el('round-retry').hidden=!error;
      bar.dataset.error=String(!!error);
    }catch(e){error=e.message;el('round-status').textContent=error;el('round-retry').hidden=false;}
  }
  el('round-resume').onclick=()=>{const r=read().round;if(r)location.href=r.href;};
  el('round-abandon').onclick=()=>abandon(game?'../../index.html#games/logic':'index.html#games/logic');
  el('round-retry').onclick=retry;
  function setLocked(value){localStorage.setItem(LOCK_KEY,value?'1':'0');if(value){cancelTransient();checkpoint();}else if(round?.status==='active')adapter?.resume?.();refresh();}
  for(const type of ['click','pointerdown','pointermove','pointerup','keydown'])document.addEventListener(type,event=>{
    if(!game||event.target.closest?.('.round-bar,.coach'))return;
    if(type==='keydown'&&['Tab','Escape'].includes(event.key))return;
    const settings=event.target.closest?.('.toolbar,.game-controls,.play-top,#setup,#setup-screen,#records-screen,[data-setting],.difficulty-choice,#back-setup,#home-from-game,#home-from-win,#win-panel,#complete');
    const operation=event.target.closest?.('#hint,#undo,#rotate,#flip,#toggle-path');
    if((!canInteract()&&(!settings||operation||(type==='keydown'&&!settings)))||((busy||error||rawLocked())&&event.target.closest?.('button')&&!event.target.closest?.('#back-home,#back-list,#setup-home,#home-from-game,#home-from-win,#overlay-list'))){event.preventDefault();event.stopImmediatePropagation();}
  },true);
  for(const type of ['click','pointerup','keydown'])document.addEventListener(type,()=>queueMicrotask(checkpoint));
  window.addEventListener('pagehide',()=>{cancelTransient();checkpoint();relinquish();});
  window.addEventListener('pageshow',e=>{if(e.persisted&&adapter){message='';attach(adapter);}});
  window.addEventListener('storage',e=>{if(e.key===LOCK_KEY){if(rawLocked()){cancelTransient();checkpoint();}else if(round?.status==='active')adapter?.resume?.();}refresh();});
  window.SistersRound=Object.freeze({KEY,LOCK_KEY,attach,start,complete,abandon,checkpoint,leave,canInteract,setLocked,retry,
    current:()=>round&&structuredClone(round),isRestoring:()=>restoring,
    player:()=>{try{const r=round||read().round;return r?.game===game?r.player:window.SistersShared.loadPlayer()||'guest';}catch{return window.SistersShared.loadPlayer()||'guest';}}});
  if(!capable)fail(new Error('請在 HTTPS 與支援 Web Locks 的瀏覽器使用當局保存。'));refresh();
})();
