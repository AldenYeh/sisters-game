/* R3 rounds: per-player/per-game saves, verified storage, one live owner. */
(() => {
  'use strict';
  const F=SistersFamily,C=SistersFamilyCore,KEY='sistersRoundLifecycleV1',LOCK_KEY='sistersRoundLockedV1',OWNER=F.OWNER;
  const game=location.pathname.match(/\/games\/([^/]+)\//)?.[1]||null;
  let adapter,round=null,release=null,busy=false,resuming=false,restoring=false,saving=false,completing=false,ending=false,pendingEnd=null,error='',pending=null,operation=0,leaving=false,skipNavigation=false;
  const player=()=>round?.player||SistersShared.loadPlayer()||'guest';
  const source=()=>F.read().rounds[player()]?.[game];
  function owns(){try{return !!release&&!!round&&C.active(F.read())?.id===round.id;}catch{return false;}}
  function canInteract(){return !document.querySelector('.coach,.family-dialog[open]')&&!busy&&!resuming&&!restoring&&!saving&&!completing&&!ending&&!error&&!leaving&&owns()&&F.canPlay(round);}
  function cancel(){try{adapter?.cancel?.();}catch(e){fail(e);}}
  function snapshot(){const p=JSON.parse(JSON.stringify(adapter.snapshot()));if(!p||typeof p!=='object')throw Error('此遊戲無法保存完整進度');return p;}
  function fail(e){error=e.message||String(e);F.fail(e);refresh();}
  async function acquire(){if(release)return true;return new Promise(resolve=>navigator.locks.request(OWNER,{ifAvailable:true},lock=>{if(!lock){resolve(false);return;}return new Promise(done=>{release=done;resolve(true)});})).catch(e=>{fail(e);return false;});}
  function relinquish(){release?.();release=null;}
  function verifiedWrite(key,value){const raw=JSON.stringify(value);localStorage.setItem(key,raw);if(localStorage.getItem(key)!==raw)throw Error('無法確認紀錄已保存');}
  function mirrorState(r){const s=F.read();verifiedWrite(KEY,{version:1,revision:s.revision,round:r?{...r,status:r.status==='saved'?'active':r.status}:null,events:s.events});}
  function mirrorResult(r){
    if(!r.result)return;
    if(r.game==='maze'){
      const key='mazeAdventureRecordsV1',raw=localStorage.getItem(key),records=raw?JSON.parse(raw):{version:1,players:{}};
      if(records.version!==1||!records.players)throw Error('既有迷宮紀錄格式錯誤；沒有覆寫');
      const applied=records.lifecycleRoundIds||[];if(!Array.isArray(applied))throw Error('既有迷宮結算格式錯誤');if(applied.includes(r.id))return;
      const p=records.players[r.player]||(records.players[r.player]={}),old=p[r.result.difficulty]||{completions:0,bestMs:null};
      if(!Number.isInteger(old.completions)||old.completions<0||!(old.bestMs===null||Number.isFinite(old.bestMs)))throw Error('既有迷宮紀錄值錯誤');
      p[r.result.difficulty]={...old,completions:old.completions+1,bestMs:old.bestMs===null?r.result.duration:Math.min(old.bestMs,r.result.duration)};
      records.lifecycleRoundIds=[...applied,r.id];verifiedWrite(key,records);
    }else{const raw=localStorage.getItem('sistersGameResultsV1'),all=raw?JSON.parse(raw):[];if(!Array.isArray(all))throw Error('既有通關紀錄格式錯誤；沒有覆寫');if(all.some(x=>x.roundId===r.id))return;all.push(r.result);verifiedWrite('sistersGameResultsV1',all);}
  }
  async function reconcile(){if(!round||round.status!=='completed'||round.resultSynced)return true;try{mirrorResult(round);await F.transact(s=>{const r=s.rounds[round.player]?.[round.game];if(r?.id!==round.id)throw Error('完成資料版本已改變');r.resultSynced=true;round=structuredClone(r);});mirrorState(round);return true;}catch(e){pending={kind:'result'};fail(Error('完成紀錄尚未保存：'+e.message));return false;}}
  async function checkpoint(){
    if(saving)return false;if(error)return false;
    if(!adapter||busy||restoring||ending||round?.status!=='active'||!owns())return true;
    const id=round.id;let p;try{p=snapshot();}catch(e){fail(e);return false;}
    saving=true;
    try{await F.transact(s=>{const r=s.rounds[round.player]?.[game];if(r?.id!==id||!['active','saved'].includes(r.status))throw Error('原局已由另一頁更新，沒有覆寫');r.payload=p;round=structuredClone(r);});mirrorState(round);return true;}
    catch(e){pending={kind:'snapshot',payload:p,id};fail(Error('進度保存失敗，操作已停止：'+e.message));cancel();return false;}finally{saving=false;if(round?.status!=='active'){cancel();relinquish();}F.markActive();refresh();}
  }
  async function start(factory,reason='new'){
    if(busy||resuming||saving||restoring||ending||error||leaving)return false;
    busy=true;const token=++operation,old=round&&structuredClone(round);refresh();
    try{
      if(!await F.requireTime()||token!==operation||leaving)return false;
      if(!await acquire()){message='另一分頁正在遊玩，請回到該頁或先保存／返回';return false;}
      if(!F.canStart())return false;
      cancel();
      const r={id:crypto.randomUUID(),game,player:SistersShared.loadPlayer()||'guest',href:location.pathname+location.hash,status:'active',startedAt:Date.now(),endedAt:null,payload:null,result:null,resultSynced:false};
      round=r;await factory();
      if(token!==operation||leaving)return false;
      r.payload=snapshot();
      await F.transact(s=>{
        if(!C.canStart(s,r.player,Date.now()))throw Error('時間已到，沒有開始新局');
        const previous=C.active(s);
        if(previous&&previous.id===old?.id){previous.status='abandoned';previous.endedAt=Date.now();C.event(s,'GameAbandoned',previous,previous.endedAt,{reason});}
        else if(previous){previous.status='saved';previous.savedAt=Date.now();C.round(s,previous);}
        r.sessionId=s.session.id;r.startedAt=Date.now();C.round(s,r);s.active={player:r.player,game,id:r.id};s.session.roundId=r.id;
        C.event(s,'GameStarted',r,r.startedAt,{reason});C.event(s,'GameActive',r,r.startedAt);if(reason==='restart')C.event(s,'GameRestarted',r,r.startedAt,{previousRoundId:old?.id});
      });round=structuredClone(source());mirrorState(round);pending=null;message='';return true;
    }catch(e){
      if(token!==operation||leaving)return false;
      const stored=F.read().rounds[old?.player||player()]?.[game];round=stored?structuredClone(stored):old;
      if(round&&adapter){restoring=true;try{await adapter.restore(round.payload,round);}finally{restoring=false;}}
      if(!F.canStart()&&!F.fault()){message='時間到，只能完成原局';return false;}
      pending={kind:'factory',factory,reason};fail(e);return false;
    }finally{busy=false;if(round?.status!=='active'||!C.active(F.read()))relinquish();F.markActive();refresh();}
  }
  async function complete(entry={}){
    if(completing||busy||restoring||error||!owns()||!F.canPlay(round))return false;
    const endedAt=Date.now();completing=true;
    for(let i=0;i<500&&saving;i++)await new Promise(r=>setTimeout(r,10));
    if(saving||error){completing=false;return false;}
    cancel();saving=true;
    const r={...round,status:'completed',endedAt,payload:snapshot(),summary:document.querySelector('#complete p')?.textContent||'',resultSynced:false};
    r.result={...entry,roundId:r.id,player:r.player,game,startedAt:r.startedAt,completedAt:endedAt,duration:entry.duration??Math.max(0,endedAt-r.startedAt),moves:entry.moves??0,attempts:entry.attempts??1,hintsUsed:entry.hintsUsed??0,restartCount:entry.restartCount??0};round=r;
    try{await F.transact(s=>{const current=s.rounds[r.player]?.[game];if(current?.id!==r.id)throw Error('原局版本已改變');C.endRound(s,r,'completed',endedAt);},{stopAt:endedAt});mirrorState(round);if(!await reconcile())return false;pending=null;relinquish();return true;}
    catch(e){pending={kind:'complete',round:r};fail(Error('完成狀態未保存，請重試：'+e.message));return false;}finally{saving=completing=false;refresh();}
  }
  async function resume(){
    // A start waiting for parent approval owns the transition to its new round.
    // Resuming the old round at the same time would race that factory/commit.
    if(busy||resuming||saving||restoring||ending||error||leaving)return false;
    if(!round||round.status==='completed'||round.status==='abandoned')return false;
    if(!F.canStart()&&!F.canPlay(round)){F.openParent();return false;}
    const id=round.id,roundPlayer=round.player;resuming=true;
    try{if(!await acquire()){message='原局正在另一分頁操作';return false;}
      await F.transact(s=>{const r=s.rounds[roundPlayer]?.[game];if(r?.id!==id)throw Error('保存版本已改變');if(r.status==='saved'){if(!C.canStart(s,r.player,Date.now()))throw Error('需家長重新授權才能續玩');const old=C.active(s);if(old&&old.id!==r.id){old.status='saved';old.savedAt=Date.now();}r.status='active';r.sessionId=s.session.id;s.active={player:r.player,game,id:r.id};}round=structuredClone(r);});adapter.resume?.();return true;
    }catch(e){fail(e);return false;}finally{resuming=false;F.markActive();refresh();}
  }
  async function attach(next){
    adapter=next;await F.ready;
    try{const r=F.read().rounds[SistersShared.loadPlayer()||'guest']?.[game];if(!r||r.status==='abandoned')return false;
      round=structuredClone(r);restoring=true;await adapter.restore(round.payload,round);restoring=false;
      if(round.status==='completed'){const panel=document.getElementById('complete');if(panel){panel.hidden=false;const p=panel.querySelector('p');if(p)p.textContent=round.summary;}await reconcile();}
      else if(F.canPlay(round)||F.canStart())await resume();
      refresh();return true;
    }catch(e){restoring=false;pending={kind:'restore'};fail(Error('原局恢復失敗；没有產生新局：'+e.message));return true;}
  }
  function end(kind,destination){if(pendingEnd)return pendingEnd;ending=true;pendingEnd=performEnd(kind,destination).finally(()=>{ending=false;pendingEnd=null;refresh();});return pendingEnd;}
  async function performEnd(kind,destination){
    if(error)return false;operation++;cancel();
    for(let i=0;i<500&&(saving||completing||resuming);i++)await new Promise(r=>setTimeout(r,10));if(saving||completing||resuming||error){message='保存尚未完成，請保留此頁並重試';refresh();return false;}
    if(!await acquire()){message='請在正在操作的分頁保存或返回';refresh();return false;}
    try{
      const existing=C.active(F.read());let p=null;if(existing&&round&&adapter&&existing.id===round.id&&!busy&&!restoring)p=snapshot();
      await F.transact(s=>{const r=C.active(s);if(r){if(p&&r.id===round?.id)r.payload=p;r.status=kind;r.endedAt=kind==='abandoned'?Date.now():null;if(kind==='saved')r.savedAt=Date.now();C.endRound(s,r,kind,Date.now());round=structuredClone(r);}
        else if(kind==='saved'&&p&&existing){const saved=s.rounds[existing.player]?.[existing.game];if(saved?.id===existing.id&&saved.status==='saved'){saved.payload=p;round=structuredClone(saved);}}
      });
      if(round)mirrorState(round);relinquish();refresh();if(destination){leaving=true;skipNavigation=true;location.href=destination;}return true;
    }catch(e){pending={kind:'end',status:kind,destination};fail(Error('返回前無法確認進度已保存：'+e.message));return false;}
  }
  const abandon=destination=>end('abandoned',destination),leave=abandon;
  const saveAndLeave=destination=>end('saved',destination);
  async function saveForLock(){if(!round||!release)return true;const ok=await end('saved');if(!ok)throw Error(error||'寬限結束時保存未完成');return true;}
  async function retry(){
    const item=pending;error='';F.clearFault();pending=null;
    try{if(!item){refresh();return true;}if(item.kind==='factory')return start(item.factory,item.reason);if(item.kind==='restore')return attach(adapter);if(item.kind==='result'){const ok=await reconcile();if(ok)relinquish();return ok;}if(item.kind==='end')return end(item.status,item.destination);
      if(item.kind==='complete'){round=item.round;await F.transact(s=>{const r=s.rounds[round.player]?.[game];if(r?.id!==round.id)throw Error('保存版本已改變');C.endRound(s,round,'completed',round.endedAt);});mirrorState(round);const ok=await reconcile();if(ok)relinquish();return ok;}
      if(item.kind==='snapshot'){await F.transact(s=>{const r=s.rounds[round.player]?.[game];if(r?.id!==item.id)throw Error('保存版本已改變');r.payload=item.payload;round=structuredClone(r);});mirrorState(round);adapter.resume?.();}
      refresh();return true;
    }catch(e){pending=item;fail(e);return false;}
  }
  const bar=document.createElement('aside');bar.className='round-bar';bar.innerHTML='<span id="round-status" role="status"></span><button id="round-save" type="button" hidden>保存並返回</button><button id="round-resume" type="button" hidden>繼續已保存遊戲</button><button id="round-retry" type="button" hidden>重試保存</button>';
  document.querySelector('.family-bar').after(bar);const el=id=>document.getElementById(id);let message='';
  function refresh(){
    try{const s=F.read(),r=game?s.rounds[player()]?.[game]:C.active(s);
      el('round-status').textContent=error||message||(busy?'載入中…':saving?'保存中…':r?.status==='saved'?'進度已保存；授權後可接續':r?.status==='active'?'自動保存 · 返回會放棄本局':r?.status==='completed'?'完成紀錄已保存':'返回放棄當局；保存可留待續玩');
      el('round-save').hidden=!game||round?.status!=='active'||!release;el('round-retry').hidden=!error;bar.dataset.error=String(!!error);
      const saved=Object.values(s.rounds[SistersShared.loadPlayer()||'guest']||{}).find(x=>x.status==='saved'||x.status==='active');el('round-resume').hidden=!saved||!!game&&round?.id===saved.id&&(round.status==='active'||!F.canStart());el('round-resume').onclick=()=>{if(saved)location.href=saved.href;};
    }catch(e){el('round-status').textContent=e.message;el('round-retry').hidden=false;}
  }
  el('round-save').onclick=()=>saveAndLeave('../../index.html#games/logic');el('round-retry').onclick=retry;
  for(const type of ['click','pointerdown','pointermove','pointerup','keydown'])document.addEventListener(type,e=>{
    if(!game||e.target.closest?.('.family-bar,.family-dialog,.round-bar,.coach'))return;
    if(type==='keydown'&&['Tab','Escape'].includes(e.key))return;
    const back=e.target.closest?.('#back-home,#back-list,#setup-home,#home-from-game,#home-from-win,#back-setup,#overlay-list');if(back)return;
    const setting=e.target.closest?.('.toolbar,.game-controls,.game-actions,#setup,#setup-screen,#records-screen,[data-setting],[data-round-switch],.difficulty-choice,#win-panel,#complete');
    if((!canInteract()&&!setting)||((!F.canStart()&&round?.status==='active'||error||F.fault()||saving||busy||resuming)&&setting)) {e.preventDefault();e.stopImmediatePropagation();}
  },true);
  // Each adapter checkpoints its accepted moves and timed transitions. A second
  // blanket event save can race the next input or a return and save a stale round.
  document.addEventListener('sisters:family-granted',async()=>{try{const stored=source();if(round&&stored?.id===round.id){round=structuredClone(stored);if(round.status==='saved'||round.status==='active')await resume();}refresh();}catch(e){fail(e)}});
  document.addEventListener('sisters:coach-ended',()=>{if(owns()&&F.canPlay(round)){adapter?.resume?.();F.markActive();}});
  document.addEventListener('sisters:family-changed',()=>{if(round){try{const s=source();if(s?.id===round.id&&s.status!==round.status){cancel();round=structuredClone(s);if(round.status!=='active')relinquish();}}catch{}}refresh();});
  window.addEventListener('pagehide',()=>{operation++;leaving=true;cancel();relinquish();});
  window.addEventListener('pageshow',e=>{if(e.persisted){leaving=false;busy=saving=false;round=null;attach(adapter);}});
  if(window.navigation)navigation.addEventListener('navigate',e=>{
    if(skipNavigation){skipNavigation=false;return;}
    if(!e.cancelable||!game||!round||round.status!=='active')return;
    if(e.navigationType==='traverse'){
      const delta=e.destination.index-navigation.currentEntry.index;e.preventDefault();abandon().then(ok=>{if(ok){skipNavigation=true;history.go(delta);}});
    }
  });
  window.SistersRound=Object.freeze({KEY,LOCK_KEY,attach,start,complete,abandon,checkpoint,leave,saveAndLeave,saveForLock,canInteract,retry,owns,hasLease:()=>!!release,
    current:()=>round&&structuredClone(round),isRestoring:()=>restoring,player,
    setLocked:async value=>{if(value)await saveForLock();else if(F.canStart())await resume();}});
  new ResizeObserver(()=>document.documentElement.style.setProperty('--round-bar-height',(bar.getBoundingClientRect().height+document.querySelector('.family-bar').getBoundingClientRect().height)+'px')).observe(bar);
  F.ready.then(refresh);
})();
