/* R3: pure session rules. No password, clock or storage bypass. */
(function(root){
  'use strict';
  const GRACE_MS=600000;
  const empty=()=>({version:3,revision:0,credential:null,players:{},rounds:{},active:null,session:null,settlements:{},cycles:{},events:[]});
  function player(s,id){return s.players[id]||(s.players[id]={debtMs:0});}
  function active(s){const a=s.active;return a&&s.rounds[a.player]?.[a.game]?.id===a.id?s.rounds[a.player][a.game]:null;}
  function event(s,type,r,at,extra={}){const id=type+':'+r.id;if(!s.events.some(e=>e.id===id))s.events.push({id,type,roundId:r.id,game:r.game,player:r.player,at,...extra});}
  function round(s,r){(s.rounds[r.player]||(s.rounds[r.player]={}))[r.game]=r;}
  function settle(s,at,reason){
    const a=s.session;if(!a)return false;
    if(a.phase==='locked'&&s.settlements[a.id])return false;
    if(!s.settlements[a.id]){const debt=a.overtimeMs;player(s,a.player).debtMs+=debt;s.settlements[a.id]={id:a.id,player:a.player,debtMs:debt,at:Math.min(at,a.graceUntil),reason};}
    a.phase='locked';a.endedAt=Math.min(at,a.graceUntil);return true;
  }
  function observe(s,o){
    const a=s.session,r=active(s);
    if(!o||!a||a.id!==o.sessionId||a.phase==='locked'||!r||r.status!=='active'||r.id!==o.roundId||r.sessionId!==a.id)return 0;
    if(!Number.isFinite(o.from)||!Number.isFinite(o.to)||o.to<o.from)return 0;
    const end=Math.min(o.to,a.graceUntil),start=Math.max(o.from,a.deadline,a.observedThrough||a.startedAt);
    const delta=Math.max(0,end-start);
    a.overtimeMs+=delta;a.observedThrough=Math.max(a.observedThrough||a.startedAt,end);return delta;
  }
  function advance(s,now){
    const a=s.session;if(!a||a.phase==='locked')return;
    if(now>=a.deadline&&a.phase==='normal'){
      const r=active(s);
      if(r?.status==='active'&&r.sessionId===a.id&&r.startedAt<a.deadline){a.phase='grace';a.graceRoundId=r.id;}
      else settle(s,a.deadline,'expiry-without-round');
    }
    if(a.phase==='grace'&&now>=a.graceUntil){
      const r=active(s);if(r?.sessionId===a.id&&r.status==='active'){r.status='saved';r.savedAt=a.graceUntil;s.active=null;}
      settle(s,a.graceUntil,'grace-cutoff');
    }
  }
  function grant(s,id,duration,now,newId){
    if(!Number.isSafeInteger(duration)||duration<=0||!Number.isSafeInteger(now+duration+GRACE_MS))throw Error('授權時間無效');
    settle(s,now,'parent-renewal');
    const p=player(s,id),deducted=Math.min(duration,p.debtMs);p.debtMs-=deducted;
    const available=duration-deducted;
    s.session={id:newId,player:id,startedAt:now,deadline:now+available,graceUntil:now+available+GRACE_MS,phase:available?'normal':'locked',graceRoundId:null,overtimeMs:0,observedThrough:now,notices:[],endedAt:available?null:now};
    const r=active(s);
    if(r){if(r.player===id&&available){r.sessionId=newId;s.session.roundId=r.id;}else{r.status='saved';r.savedAt=now;s.active=null;}}
    if(!available)s.settlements[newId]={id:newId,player:id,debtMs:0,at:now,reason:'zero-after-debt'};
    return {available,deducted,debtMs:p.debtMs};
  }
  function canStart(s,id,now){return !!s.credential&&s.session?.player===id&&s.session.phase==='normal'&&now<s.session.deadline;}
  function canPlay(s,r,now){
    const a=s.session;if(!a||!r||r.status!=='active'||r.player!==a.player||r.sessionId!==a.id||a.phase==='locked')return false;
    if(active(s)?.id!==r.id||active(s)?.status!=='active')return false;
    if(now<a.deadline)return true;
    return now<a.graceUntil&&r.startedAt<a.deadline&&(!a.graceRoundId||a.graceRoundId===r.id);
  }
  function endRound(s,r,kind,now){
    const a=s.session;round(s,r);s.active=null;
    if(kind==='completed')event(s,'GameCompleted',r,now);
    if(kind==='abandoned')event(s,'GameAbandoned',r,now,{reason:'return'});
    if(a){a.roundId=null;if(now>=a.deadline||a.phase==='grace')settle(s,now,kind);}
  }
  function validate(s){
    if(s.version!==3||!Number.isSafeInteger(s.revision)||s.revision<0||!s.players||!s.rounds||!s.settlements||!s.cycles||!Array.isArray(s.events))throw Error('家庭資料格式錯誤；沒有清除原資料。');
    for(const p of Object.values(s.players))if(!Number.isSafeInteger(p.debtMs)||p.debtMs<0)throw Error('扣抵資料格式錯誤');
    if(s.session){const a=s.session;if(!a.id||!a.player||!['normal','grace','locked'].includes(a.phase)||!['startedAt','deadline','graceUntil','overtimeMs','observedThrough'].every(k=>Number.isSafeInteger(a[k]))||a.overtimeMs<0||a.graceUntil!==a.deadline+GRACE_MS)throw Error('授權資料格式錯誤');}
    if(s.credential){const c=s.credential;if(c.algorithm!=='PBKDF2-SHA256'||c.iterations!==600000||!/^[0-9a-f]{32}$/.test(c.salt)||!/^[0-9a-f]{64}$/.test(c.hash))throw Error('家長驗證資料格式錯誤');}
    for(const [p,rs]of Object.entries(s.rounds))for(const [g,r]of Object.entries(rs))if(r.player!==p||r.game!==g||!r.id||!['active','saved','completed','abandoned'].includes(r.status)||!r.payload)throw Error('遊戲進度格式錯誤；沒有清除原局。');
    return s;
  }
  const api=Object.freeze({GRACE_MS,empty,player,active,event,round,settle,observe,advance,grant,canStart,canPlay,endRound,validate});
  if(typeof module!=='undefined')module.exports=api;else root.SistersFamilyCore=api;
})(typeof window==='undefined'?globalThis:window);
