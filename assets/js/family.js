/* Family settings and durable single-device session transactions. */
(() => {
  'use strict';
  const C=window.SistersFamilyCore,KEY='sistersFamilyV3',MUTEX=KEY+':write',OWNER='sistersRoundOwnerV1',JOURNAL=KEY+':observed:';
  const capable=!!(isSecureContext&&crypto.subtle&&crypto.randomUUID&&navigator.locks);
  let fault='',verified=null,authBusy=false,promptResolve=null,switchTarget=null,previous=null,ticking=false;
  const channel=typeof BroadcastChannel!=='undefined'?new BroadcastChannel('sisters-family-v3'):null;
  const HISTORY_KEY='sistersHistoryDepartureV3';
  const selected=()=>SistersShared.loadPlayer()||'guest';
  function read(){const raw=localStorage.getItem(KEY);if(!raw)throw Error('家庭設定尚未載入');return C.validate(JSON.parse(raw));}
  function durable(s){s.revision++;const raw=JSON.stringify(s);localStorage.setItem(KEY,raw);if(localStorage.getItem(KEY)!==raw)throw Error('無法確認資料已保存');}
  function fail(e){fault=e.message||String(e);document.dispatchEvent(new Event('sisters:family-fault'));refresh();}
  function sample(){
    const now=Date.now();let s,r,visible=false;
    try{s=read();r=window.SistersRound?.current();visible=document.visibilityState==='visible'&&document.hasFocus()&&!dialog.open&&window.SistersRound?.canInteract();}catch{}
    const o=previous?.visible&&previous.roundId&&now-previous.at>=0&&now-previous.at<=2000?{sessionId:previous.sessionId,roundId:previous.roundId,from:previous.at,to:now}:null;
    previous={at:now,sessionId:s?.session?.id,roundId:r?.id,visible};return o;
  }
  function mergeJournals(s){const applied=[];for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(!k.startsWith(JOURNAL))continue;const o=JSON.parse(localStorage.getItem(k));if(!o||typeof o.sessionId!=='string')throw Error('可見遊玩記錄格式錯誤');C.observe(s,o);applied.push(k);}return applied;}
  async function transact(fn,{observe=true,stopAt=null}={}){
    if(!capable)throw Error('需以 HTTPS、Web Crypto 與 Web Locks 的瀏覽器開啟');
    const observation=observe?sample():null;if(observation&&stopAt!==null)observation.to=Math.min(observation.to,stopAt);
    return navigator.locks.request(MUTEX,async()=>{const s=read(),journals=mergeJournals(s);C.observe(s,observation);C.advance(s,Date.now());const value=await fn(s);C.validate(s);durable(s);for(const k of journals)localStorage.removeItem(k);channel?.postMessage({type:'changed'});refresh();document.dispatchEvent(new Event('sisters:family-changed'));return value;});
  }
  const ready=(async()=>{
    if(!capable)throw Error('請使用支援 Web Crypto／Web Locks 的 HTTPS 瀏覽器');
    await navigator.locks.request(MUTEX,()=>{
      const existing=localStorage.getItem(KEY);if(existing){C.validate(JSON.parse(existing));return;}
      const s=C.empty(),legacy=localStorage.getItem('sistersRoundLifecycleV1');
      if(legacy){const old=JSON.parse(legacy);if(old.version!==1||!Array.isArray(old.events)||!Number.isInteger(old.revision))throw Error('既有局資料無法讀取；沒有覆寫');s.events=old.events;
        if(old.round){const r=old.round;if(!r.id||!r.game||!r.player||!r.payload||!['active','completed','abandoned'].includes(r.status))throw Error('既有局面格式錯誤');C.round(s,r);if(r.status==='active')s.active={player:r.player,game:r.game,id:r.id};}}
      C.validate(s);durable(s);
    });
    if(performance.getEntriesByType('navigation')[0]?.type==='back_forward')await reconcileHistoryReturn();
    refresh();return true;
  })().catch(e=>{fail(e);return false;});
  const hex=a=>Array.from(a,v=>v.toString(16).padStart(2,'0')).join('');
  async function derive(password,salt){const key=await crypto.subtle.importKey('raw',new TextEncoder().encode(password),'PBKDF2',false,['deriveBits']);return hex(new Uint8Array(await crypto.subtle.deriveBits({name:'PBKDF2',hash:'SHA-256',salt:Uint8Array.from(salt.match(/../g),x=>parseInt(x,16)),iterations:600000},key,256)));}
  function equal(a,b){if(a.length!==b.length)return false;let d=0;for(let i=0;i<a.length;i++)d|=a.charCodeAt(i)^b.charCodeAt(i);return d===0;}
  const clock=ms=>{const n=Math.ceil(Math.max(0,ms)/1000);return Math.floor(n/60)+':'+String(n%60).padStart(2,'0');};
  const strip=document.createElement('aside');strip.className='family-bar';strip.innerHTML='<span id="family-time" role="timer" aria-label="遊玩剩餘時間"></span><span id="family-note" role="status"></span><button id="family-open" type="button">家長</button><button id="family-end" type="button" hidden>結束本次</button>';
  document.body.prepend(strip);
  const dialog=document.createElement('dialog');dialog.className='family-dialog';dialog.innerHTML=`<h2 id="parent-title">家長設定</h2>
    <form id="parent-auth"><label>家長密碼<input id="parent-password" type="password" autocomplete="current-password" required></label><button type="button" data-show="parent-password" aria-pressed="false">顯示密碼</button>
    <label id="parent-confirm-row" hidden>再次輸入密碼<input id="parent-confirm" type="password" autocomplete="new-password"></label>
    <p id="parent-first-note" hidden>至少 8 個字元；可使用長密碼、文字、數字與符號，不限短 PIN。</p><button type="submit">驗證家長</button><button type="button" data-cancel>取消</button></form>
    <section id="parent-authorized" hidden><p id="parent-player"></p><form id="parent-duration"><label>本次時間<select id="parent-minutes"><option value="10">10 分鐘</option><option value="15">15 分鐘</option><option value="20" selected>20 分鐘</option><option value="30">30 分鐘</option><option value="custom">自訂</option></select></label><label id="parent-custom-row" hidden>自訂分鐘數<input id="parent-custom" type="number" min="0.001" step="any" inputmode="decimal"></label><p id="parent-debt"></p><p>先精確扣抵超時；未扣完的部分留到下次。零可用時間不會開始。</p><button type="submit">授權／續時</button></form>
    <button id="parent-clear-debt" type="button">清除此玩家超時</button><details><summary>更改家長密碼</summary><form id="parent-change"><label>原密碼<input id="parent-old" type="password" autocomplete="current-password" required></label><label>新密碼<input id="parent-new" type="password" autocomplete="new-password" required></label><button type="button" data-show="parent-new" aria-pressed="false">顯示密碼</button><label>再次輸入新密碼<input id="parent-new-confirm" type="password" autocomplete="new-password" required></label><button type="submit">確認更改</button></form></details><button type="button" data-cancel>關閉</button></section>
    <p id="parent-message" role="alert"></p><details><summary>時間與保存說明</summary><p>授權倒數依截止時間跨頁、刷新、背景與關閉再開持續。到期只允許完成已開始的這一局，最多再給 10 分鐘；完成或返回即休息。沒有當局立即鎖定。寬限到期會保存目前進度；下次家長授權可續玩，保存失敗會停止操作並顯示重試。</p><p>超時只計此裝置前景可見且能操作的遊玩區段，背景時間仍消耗寬限上限。一般返回會放棄當局；要保留進度請用「保存並返回」。每位玩家分開保存與扣抵，一個裝置同時只開一局。</p><p>密碼以隨機鹽與 PBKDF2 驗證值保存在此瀏覽器，沒有明文或通用密碼。這是靜態網站：清除儲存、修改程式／資料、更改本機時鐘、换瀏覽器或裝置都可繞過或丟失資料。請家長自行設定及保管密碼。</p></details>`;
  document.body.append(dialog);const el=id=>document.getElementById(id);
  function refresh(){
    try{const s=read(),a=s.session,now=Date.now(),left=(a?.deadline||0)-now;
      el('family-time').textContent=fault?'保存暫停：'+fault:!s.credential?'請家長先設定':!a||a.phase==='locked'?'休息時間 · 請家長授權':left>0?'剩餘 '+clock(left):'完成當局 · 寬限 '+clock(a.graceUntil-now);
      el('family-note').textContent=a?.phase==='normal'&&left<=60000&&left>0?'快休息了，剩下不到 1 分鐘':a?.phase==='normal'&&left<=300000&&left>0?'剩下不到 5 分鐘':a?.phase==='grace'?'時間到，這一局完成後休息':'';
      el('family-end').hidden=!a||a.phase==='locked';strip.dataset.locked=String(!a||a.phase==='locked'||!!fault);document.body.classList.toggle('family-locked',!a||a.phase==='locked'||!!fault);
      if(dialog.open&&verified){const id=selected(),debt=(s.players[id]?.debtMs||0)+(a?.player===id&&a.phase!=='locked'?a.overtimeMs:0);el('parent-debt').textContent='此玩家待扣抵：'+(debt/1000).toFixed(3)+' 秒';}
    }catch(e){el('family-time').textContent=fault||e.message;}
  }
  function busy(value){authBusy=value;dialog.querySelectorAll('button').forEach(b=>b.disabled=value);}
  function authorized(s){if(!verified||Date.now()>verified.until||verified.hash!==s.credential?.hash)throw Error('請重新驗證家長');}
  function openParent(target=null){
    if(dialog.open)return;sample();switchTarget=target;verified=null;el('parent-auth').reset();el('parent-authorized').hidden=true;el('parent-auth').hidden=false;el('parent-message').textContent=fault;
    try{const c=read().credential;el('parent-confirm-row').hidden=!!c;el('parent-first-note').hidden=!!c;el('parent-title').textContent=c?(target?'驗證家長以更換玩家':'家長驗證'):'首次設定家長密碼';el('parent-password').autocomplete=c?'current-password':'new-password';}catch(e){el('parent-message').textContent=e.message;}
    dialog.showModal();el('parent-password').focus();
  }
  dialog.addEventListener('close',()=>{verified=null;switchTarget=null;for(const input of dialog.querySelectorAll('input[type=password],input[data-unmasked]')){input.value='';input.type='password';delete input.dataset.unmasked;}dialog.querySelectorAll('[data-show]').forEach(b=>{b.textContent='顯示密碼';b.setAttribute('aria-pressed','false')});const r=promptResolve;promptResolve=null;r?.(false);sample();refresh();});
  dialog.addEventListener('cancel',e=>{if(authBusy)e.preventDefault()});dialog.querySelectorAll('[data-cancel]').forEach(b=>b.onclick=()=>{if(!authBusy)dialog.close()});
  dialog.querySelectorAll('[data-show]').forEach(b=>b.onclick=()=>{const input=el(b.dataset.show),show=input.type==='password';input.type=show?'text':'password';if(show)input.dataset.unmasked='1';else delete input.dataset.unmasked;b.textContent=show?'隱藏密碼':'顯示密碼';b.setAttribute('aria-pressed',String(show));});
  async function prepareParent(){
    if(window.SistersRound?.hasLease()){if(!await SistersRound.checkpoint())throw Error('請先重試保存，再操作家長設定');return;}
    // Ask a live owner to durably pause before another tab changes the session.
    let available=false;await navigator.locks.request(OWNER,{ifAvailable:true},l=>{available=!!l;});
    if(!available){const id=crypto.randomUUID();channel?.postMessage({type:'pause-owner',id});for(let i=0;i<20&&!available;i++){await new Promise(r=>setTimeout(r,50));await navigator.locks.request(OWNER,{ifAvailable:true},l=>{available=!!l;});}if(!available)throw Error('請在正在遊玩的分頁完成保存，再操作家長設定');}
  }
  el('parent-auth').onsubmit=async e=>{
    e.preventDefault();if(authBusy)return;busy(true);el('parent-message').textContent='正在驗證…';
    try{const c=read().credential,password=el('parent-password').value;
      if(c){if(!equal(await derive(password,c.salt),c.hash))throw Error('密碼不正確');if(read().credential?.hash!==c.hash)throw Error('密碼已在另一分頁更新，請重試');verified={hash:c.hash,until:Date.now()+120000};}
      else{if(password.length<8)throw Error('請使用至少 8 個字元的密碼');if(password!==el('parent-confirm').value)throw Error('兩次密碼不同');const salt=hex(crypto.getRandomValues(new Uint8Array(16))),hash=await derive(password,salt);await transact(s=>{if(s.credential)throw Error('另一分頁已完成首次設定，請用新密碼驗證');s.credential={algorithm:'PBKDF2-SHA256',iterations:600000,salt,hash};});verified={hash,until:Date.now()+120000};}
      el('parent-password').value='';el('parent-confirm').value='';
      if(switchTarget){await prepareParent();const target=switchTarget;await transact(s=>{authorized(s);const r=C.active(s);if(r){r.status='saved';r.savedAt=Date.now();C.round(s,r);s.active=null;}C.settle(s,Date.now(),'parent-player-switch');if(!SistersShared.savePlayer(target))throw Error('玩家無法保存');});const resolve=promptResolve;promptResolve=null;dialog.close();resolve?.(true);}
      else{el('parent-auth').hidden=true;el('parent-authorized').hidden=false;el('parent-player').textContent='玩家：'+(SISTERS_CONTENT.players[selected()]?.name.zh||selected());el('parent-message').textContent='';refresh();}
    }catch(e){el('parent-message').textContent=e.message;}finally{busy(false);}
  };
  el('parent-minutes').onchange=()=>el('parent-custom-row').hidden=el('parent-minutes').value!=='custom';
  el('parent-duration').onsubmit=async e=>{
    e.preventDefault();if(authBusy)return;busy(true);
    try{const raw=el('parent-minutes').value==='custom'?el('parent-custom').value:el('parent-minutes').value,duration=Math.round(Number(raw)*60000);if(!raw||!Number.isSafeInteger(duration)||duration<=0)throw Error('請輸入大於零的有效時間');await prepareParent();const result=await transact(s=>{authorized(s);return C.grant(s,selected(),duration,Date.now(),crypto.randomUUID());});fault='';if(!result.available){el('parent-message').textContent='本次時間全數扣抵；剩餘超時 '+(result.debtMs/1000).toFixed(3)+' 秒，尚不能開始';refresh();return;}
      document.dispatchEvent(new Event('sisters:family-granted'));const resolve=promptResolve;promptResolve=null;dialog.close();resolve?.(true);
    }catch(e){el('parent-message').textContent=e.message;}finally{busy(false);}
  };
  el('parent-clear-debt').onclick=async()=>{if(authBusy)return;busy(true);try{await prepareParent();await transact(s=>{authorized(s);C.player(s,selected()).debtMs=0;if(s.session?.player===selected()){s.session.overtimeMs=0;s.session.observedThrough=Date.now();}s.events.push({id:crypto.randomUUID(),type:'ParentDebtCleared',player:selected(),at:Date.now()});});el('parent-message').textContent='已清除此玩家目前超時';}catch(e){el('parent-message').textContent=e.message;}finally{busy(false);}};
  el('parent-change').onsubmit=async e=>{e.preventDefault();if(authBusy)return;busy(true);try{const c=read().credential;authorized(read());if(!equal(await derive(el('parent-old').value,c.salt),c.hash))throw Error('原密碼不正確');const password=el('parent-new').value;if(password.length<8||password!==el('parent-new-confirm').value)throw Error('新密碼至少 8 個字元，兩次輸入需相同');const salt=hex(crypto.getRandomValues(new Uint8Array(16))),hash=await derive(password,salt);await transact(s=>{authorized(s);if(s.credential.hash!==c.hash)throw Error('密碼已更新，請重新驗證');s.credential={algorithm:'PBKDF2-SHA256',iterations:600000,salt,hash};});el('parent-change').reset();verified={hash,until:Date.now()+120000};el('parent-message').textContent='密碼已更改';}catch(e){el('parent-message').textContent=e.message;}finally{busy(false);}};
  el('family-open').onclick=()=>openParent();
  el('family-end').onclick=async()=>{try{await window.SistersRound?.saveForLock();await transact(s=>C.settle(s,Date.now(),'child-end'));refresh();}catch(e){fail(e)}};
  async function requireTime(){await ready;if(fault)return false;try{if(C.canStart(read(),selected(),Date.now()))return true;}catch(e){fail(e);return false;}openParent();return new Promise(resolve=>{promptResolve=resolve;});}
  async function switchPlayer(id){await ready;const a=read().session;if(!a||a.phase==='locked'||a.player===id)return SistersShared.savePlayer(id);openParent(id);return new Promise(resolve=>{promptResolve=resolve;});}
  function markActive(){if(previous?.visible)return;sample();}
  async function tick(){
    if(ticking||fault)return;ticking=true;
    try{const s=read(),a=s.session,now=Date.now();if(a&&a.phase!=='locked'&&now>=a.deadline||a?.phase==='locked'&&C.active(s)?.status==='active'){
      if(a&&now>=a.graceUntil&&window.SistersRound?.owns())await SistersRound.saveForLock();
      else await transact(x=>C.advance(x,Date.now()));
      const next=read();if(next.session?.phase==='locked'&&window.SistersRound?.owns())await SistersRound.saveForLock();
    }else if(a?.phase==='grace')await transact(()=>{});else sample();refresh();}catch(e){fail(e);}finally{ticking=false;}
  }
  for(const type of ['visibilitychange','focus','blur'])window.addEventListener(type,()=>{const o=sample();if(o)transact(s=>C.observe(s,o),{observe:false}).catch(fail);refresh();});
  async function reconcileHistoryReturn(){
    // Native traversal is handled before departure when cancelable. The
    // fallback also covers browser traversals that cannot be canceled. A
    // restored browser tab at the same address must preserve its round.
    const raw=sessionStorage.getItem(HISTORY_KEY);if(!raw)return;
    const departure=JSON.parse(raw);if(!departure?.id||departure.href===location.href)return;
    const id=departure.id;
    await navigator.locks.request(OWNER,{ifAvailable:true},async lock=>{if(!lock)return;await transact(s=>{const r=C.active(s);if(r?.id!==id)return;r.status='abandoned';r.endedAt=Date.now();C.endRound(s,r,'abandoned',r.endedAt);});sessionStorage.removeItem(HISTORY_KEY);});
  }
  window.addEventListener('pageshow',e=>{if(e.persisted)reconcileHistoryReturn().catch(fail);});
  window.addEventListener('pagehide',()=>{try{if(window.SistersRound?.owns())sessionStorage.setItem(HISTORY_KEY,JSON.stringify({id:SistersRound.current().id,href:location.href}));}catch(e){fail(e);}const o=sample();if(o){try{const k=JOURNAL+crypto.randomUUID(),raw=JSON.stringify(o);localStorage.setItem(k,raw);if(localStorage.getItem(k)!==raw)throw Error('最後可見時間未能保存');}catch(e){fail(e);}}});
  window.addEventListener('storage',e=>{if(e.key===KEY){refresh();document.dispatchEvent(new Event('sisters:family-changed'));}});
  if(channel)channel.onmessage=e=>{if(e.data.type==='changed')refresh();if(e.data.type==='pause-owner'&&window.SistersRound?.owns())SistersRound.saveForLock().then(()=>channel.postMessage({type:'paused',id:e.data.id})).catch(fail);};
  setInterval(tick,250);
  window.SistersFamily=Object.freeze({KEY,OWNER,ready,read,transact,fail,requireTime,switchPlayer,openParent,refresh,markActive,
    canStart:()=>{try{return !fault&&C.canStart(read(),selected(),Date.now())}catch{return false;}},
    canPlay:r=>{try{return !fault&&C.canPlay(read(),r,Date.now())}catch{return false;}},
    fault:()=>fault,clearFault:()=>{fault='';refresh();},locked:()=>!read().session||read().session.phase==='locked'});
})();
