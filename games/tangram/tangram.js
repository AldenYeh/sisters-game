
(async () => {
  "use strict";
  // Existing seven-piece geometry; target transforms use logical coordinates.
  const base = {
    L1: [[0,0],[0,2],[2,0]],
    L2: [[0,0],[0,2],[2,0]],
    M: [[0,0],[2,0],[1,1]],
    S1: [[0,0],[1,0],[0,1]],
    S2: [[0,0],[1,0],[0,1]],
    SQ: [[0,0],[1,0],[1,1],[0,1]],
    P: [[0,0],[1,0],[2,1],[1,1]]
  };
  function rot(poly, k) {
    let p = poly.map(([x,y]) => [x,y]);
    for (let i=0;i<k;i++) p = p.map(([x,y]) => [y, -x]);
    return norm(p);
  }
  function flip(poly) { return norm(poly.map(([x,y]) => [-x, y])); }
  function norm(poly) {
    const minx = Math.min(...poly.map(p=>p[0])), miny = Math.min(...poly.map(p=>p[1]));
    return poly.map(([x,y]) => [x-minx, y-miny]);
  }
  function place(poly, x, y, s=50) { return poly.map(([px,py]) => [x+px*s, y+py*s]); }
  // 20 existing assemblies, with audited overlap repairs: each piece transform applied to base then translated. Coordinates in the audited 0..5 logical grid.
  const shapes = [
    {name:"方塊", tier:"easy", hint:"outline", parts:{L1:[0,0,0],L2:[2,0,1],M:[2,2,0],S1:[0,2,0],S2:[1,2,1],SQ:[1,3,0],P:[2,3,0]}},
    {name:"大三角", tier:"easy", hint:"outline", parts:{L1:[0,2,0],L2:[0,0,3],M:[2,2,1],S1:[2,1,0],S2:[2.5,1.5,1],SQ:[2,0,0],P:[3,0,1]}},
    {name:"房子", tier:"easy", hint:"outline", parts:{L1:[0,2,0],L2:[2,2,1],M:[1,1,0],S1:[0,1,0],S2:[3,1,1],SQ:[1,3,0],P:[2,0,0]}},
    {name:"蠟燭", tier:"easy", hint:"outline", parts:{L1:[1,0,0],L2:[1,2,0],M:[0,2,1],S1:[3,2,0],S2:[3,3,0],SQ:[0,1,0],P:[0,4,0]}},
    {name:"小山", tier:"normal", hint:"partial", parts:{L1:[0,2,0],L2:[2,2,1],M:[1,1,2],S1:[0,1,3],S2:[3,1,0],SQ:[2,0,0],P:[1,0,1]}},
    {name:"船", tier:"normal", hint:"partial", parts:{L1:[0,2,0],L2:[2,3,1],M:[1,1,0],S1:[0,1,1],S2:[3,1,0],SQ:[1,3,0],P:[2,3,0]}},
    {name:"魚", tier:"normal", hint:"partial", parts:{L1:[1,1,0],L2:[1,3,0],M:[0,3,1],S1:[3,2,0],S2:[3,3,1],SQ:[0,1,0],P:[0,0,0]}},
    {name:"箭頭", tier:"normal", hint:"partial", parts:{L1:[0,1,0],L2:[3,1,1],M:[1,0,2],S1:[1,2,0],S2:[2,2,1],SQ:[1,4,0],P:[0,3,0]}},
    {name:"貓坐", tier:"hard", hint:"silhouette", parts:{L1:[0,2,0],L2:[2,2,1],M:[0,0,0],S1:[0,1,0],S2:[3,1,1],SQ:[2,0,0],P:[1,3,1]}},
    {name:"橋", tier:"hard", hint:"silhouette", parts:{L1:[0,2,0],L2:[2,2,3],M:[1,1,0],S1:[0,0,0],S2:[2,0,1],SQ:[1,0,0],P:[2,0,0]}},
    {name:"天鵝", tier:"hard", hint:"silhouette", parts:{L1:[1,2,0],L2:[1,0,2],M:[0,1,1],S1:[3,1,0],S2:[3,2,1],SQ:[0,3,0],P:[2,3,0]}},
    {name:"兔子", tier:"hard", hint:"silhouette", parts:{L1:[1,2,0],L2:[1,0,0],M:[0,2,3],S1:[3,2,0],S2:[3,3,0],SQ:[2,1,0],P:[0,0,1]}},
    {name:"字母T", tier:"challenge", hint:"silhouette", parts:{L1:[0,0,0],L2:[2,0,1],M:[1,2,0],S1:[0,2,0],S2:[3,2,1],SQ:[1,3,0],P:[2,3,0]}},
    {name:"風車", tier:"challenge", hint:"silhouette", parts:{L1:[0,0,0],L2:[2,2,2],M:[2,1,1],S1:[0,2,3],S2:[1,2,0],SQ:[1,1,0],P:[2,1,0]}},
    {name:"帽子", tier:"challenge", hint:"silhouette", parts:{L1:[0,1,0],L2:[2,1,1],M:[1,0,0],S1:[0,3,0],S2:[2,3,1],SQ:[1,3,0],P:[2,3,0]}},
    {name:"飛鳥", tier:"challenge", hint:"silhouette", parts:{L1:[0,0,1],L2:[2,1,0],M:[1,0,2],S1:[0,3,0],S2:[3,3,1],SQ:[1,2,0],P:[2,2,1]}},
    {name:"長椅", tier:"master", hint:"silhouette", parts:{L1:[0,2,0],L2:[2,2,1],M:[1,1,0],S1:[0,0,0],S2:[2,0,1],SQ:[1,0,0],P:[2,0,0]}},
    {name:"狐狸", tier:"master", hint:"silhouette", parts:{L1:[1,1,0],L2:[1,3,2],M:[0,1,1],S1:[3,1,0],S2:[3,2,1],SQ:[0,0,0],P:[0,3,0]}},
    {name:"杯子", tier:"master", hint:"silhouette", parts:{L1:[0,1,0],L2:[2,1,1],M:[0,3,0],S1:[0,0,3],S2:[3,0,0],SQ:[1,0,0],P:[2,3,0]}},
    {name:"火箭", tier:"master", hint:"silhouette", parts:{L1:[1,0,0],L2:[1,2,0],M:[0,2,1],S1:[3,2,0],S2:[3,3,1],SQ:[0,1,0],P:[0,3,1]}}
  ];
  const SCALE=60, ids=Object.keys(base), colors={L1:'#f4a3b5',L2:'#f7c56b',M:'#8ecae6',S1:'#b7e4c7',S2:'#c9b6e4',SQ:'#ffd6a5',P:'#f2b5d4'};
  let question=null,hintMode='outline',legacyView=false;const shape=()=>question||shapes[idx];
  let idx=0,selected='L1',pieces={},hints=0,moves=0,restarts=0,startedAt=0,cancelDrag=null,dragSnapshot=null;
  function geometry(id,t){let p=t[3]?flip(base[id]):base[id];return place(rot(p,t[2]%4),40+t[0]*SCALE,40+t[1]*SCALE,SCALE);}
  const world=id=>geometry(id,pieces[id]),targetPoly=id=>geometry(id,shape().parts[id]);
  function kind(id){return ['L1','L2'].includes(id)?'L':['S1','S2'].includes(id)?'S':id;}
  function fits(a,b,tolerance=8){if(a.length!==b.length)return false;const used=new Set();return a.every(p=>{const j=b.findIndex((q,i)=>!used.has(i)&&Math.hypot(p[0]-q[0],p[1]-q[1])<=tolerance);if(j<0)return false;used.add(j);return true;});}
  // Assign every physical piece to a different geometrically matching slot.
  function assignment(ps=pieces,target=shape()){const candidates=Object.fromEntries(ids.map(id=>[id,ids.filter(slot=>kind(id)===kind(slot)&&fits(geometry(id,ps[id]),geometry(slot,target.parts[slot])))]));let best={};function visit(i,used,found){if(i===ids.length){if(Object.keys(found).length>Object.keys(best).length)best={...found};return;}const id=ids[i];for(const slot of candidates[id])if(!used.has(slot)){used.add(slot);found[id]=slot;visit(i+1,used,found);delete found[id];used.delete(slot);}visit(i+1,used,found);}visit(0,new Set(),{});return best;}
  function render(){const svg=document.getElementById('board'),current=shape(),mapped=assignment();svg.setAttribute('viewBox',legacyView?'0 0 760 640':'0 0 760 460');svg.style.aspectRatio=legacyView?'760 / 640':'760 / 460';const coords=p=>p.map(v=>v.join(',')).join(' ');const silhouette=current.outline?`<polygon points="${coords(current.outline.map(([x,y])=>[40+x*SCALE,40+y*SCALE]))}" fill="#eadfd4"/>`:'';const targets=ids.map(id=>`<polygon points="${coords(targetPoly(id))}" fill="#eadfd4" stroke="${(current.hint||hintMode)==='outline'||(current.hint||hintMode)==='partial'&&['L1','SQ'].includes(id)?'#8d5b73':'none'}" stroke-dasharray="4 3"/>`).join('');svg.innerHTML=silhouette+targets+ids.map(id=>`<polygon tabindex="0" role="button" aria-label="${id} 圖塊，方向鍵移動，R 旋轉，F 翻面" data-id="${id}" points="${coords(world(id))}" fill="${colors[id]}" stroke="${mapped[id]?'#2f6f4e':selected===id?'#543c4e':'#fff'}" stroke-width="${mapped[id]||selected===id?4:2}"/>`).join('');svg.querySelectorAll('[data-id]').forEach(el=>{el.onpointerdown=e=>drag(e,el);el.onfocus=()=>{selected=el.dataset.id;};el.onkeydown=e=>{if(!SistersRound.canInteract())return;selected=el.dataset.id;const d={ArrowLeft:[-.1,0],ArrowRight:[.1,0],ArrowUp:[0,-.1],ArrowDown:[0,.1]}[e.key];if(d){e.preventDefault();pieces[selected][0]+=d[0];pieces[selected][1]+=d[1];moves++;}else if(e.key.toLowerCase()==='r'){e.preventDefault();pieces[selected][2]=(pieces[selected][2]+1)%4;moves++;}else if(e.key.toLowerCase()==='f'&&selected==='P'){pieces[selected][3]=!pieces[selected][3];moves++;}else return;clamp(selected);render();svg.querySelector(`[data-id="${selected}"]`).focus();check();SistersRound.checkpoint();};});document.getElementById('status').textContent=`${current.name} · ${Object.keys(mapped).length}/7 · 已選 ${selected} · 選圖塊後旋轉或翻面，方向鍵可微調`;}
  function clamp(id){const p=world(id),maxX=Math.max(...p.map(v=>v[0])),maxY=Math.max(...p.map(v=>v[1]));pieces[id][0]=Math.max(-40/SCALE,Math.min(pieces[id][0],pieces[id][0]+(755-maxX)/SCALE));pieces[id][1]=Math.max(-40/SCALE,Math.min(pieces[id][1],pieces[id][1]+((legacyView?635:455)-maxY)/SCALE));}
  function check(){const matched=assignment();if(Object.keys(matched).length===7){for(const [id,slot]of Object.entries(matched)){const a=world(id),b=targetPoly(slot);pieces[id][0]+=(b.reduce((s,p)=>s+p[0],0)/b.length-a.reduce((s,p)=>s+p[0],0)/a.length)/SCALE;pieces[id][1]+=(b.reduce((s,p)=>s+p[1],0)/b.length-a.reduce((s,p)=>s+p[1],0)/a.length)/SCALE;}render();SistersPlay.showComplete(shape().name+' 拼好了');SistersPlay.recordResult({difficulty:question?hintMode:shape().tier,level:shape().id||shape().name,startedAt,moves,hintsUsed:hints,restartCount:restarts});}}
  const client=(e,svg)=>{const p=new DOMPoint(e.clientX,e.clientY).matrixTransform(svg.getScreenCTM().inverse());return [p.x,p.y];};
  function drag(ev,el){if(!SistersRound.canInteract()||cancelDrag||ev.button!==0)return;ev.preventDefault();selected=el.dataset.id;const id=selected,svg=document.getElementById('board'),start=client(ev,svg),origin=pieces[id].slice();dragSnapshot={question,hintMode,legacyView,idx,selected,pieces:structuredClone(pieces),hints,moves,restarts,startedAt};el.setPointerCapture(ev.pointerId);
    function cleanup(){el.removeEventListener('pointermove',move);el.removeEventListener('pointerup',up);el.removeEventListener('pointercancel',cancel);if(el.hasPointerCapture(ev.pointerId))el.releasePointerCapture(ev.pointerId);cancelDrag=null;dragSnapshot=null;}
    function cancel(){pieces[id]=origin;cleanup();render();}
    function move(e){if(e.pointerId!==ev.pointerId||!SistersRound.canInteract())return;const p=client(e,svg);pieces[id][0]=origin[0]+(p[0]-start[0])/SCALE;pieces[id][1]=origin[1]+(p[1]-start[1])/SCALE;clamp(id);el.setAttribute('points',world(id).map(p=>p.join(',')).join(' '));}
    function up(e){if(e.pointerId!==ev.pointerId)return;cleanup();if(!SistersRound.canInteract()){pieces[id]=origin;render();return;}const current=world(id),center=p=>[p.reduce((s,v)=>s+v[0],0)/p.length,p.reduce((s,v)=>s+v[1],0)/p.length],a=center(current);let candidate=null,distance=20;const occupied=new Set(Object.entries(assignment()).filter(([key])=>key!==id).map(([,slot])=>slot));for(const slot of ids){if(kind(id)!==kind(slot)||occupied.has(slot))continue;const b=center(targetPoly(slot)),dx=b[0]-a[0],dy=b[1]-a[1],d=Math.hypot(dx,dy);if(d<distance&&fits(current.map(([x,y])=>[x+dx,y+dy]),targetPoly(slot),.01)){candidate={dx,dy};distance=d;}}if(candidate){pieces[id][0]+=candidate.dx/SCALE;pieces[id][1]+=candidate.dy/SCALE;SistersPlay.playSound('ok');}if(String(origin)!==String(pieces[id]))moves++;render();check();SistersRound.checkpoint();}
    cancelDrag=cancel;el.addEventListener('pointermove',move);el.addEventListener('pointerup',up);el.addEventListener('pointercancel',cancel);
  }
  function scatter(){const positions=[[6.2,0],[9,0],[6.2,2.4],[9,2.4],[10.3,3.6],[6.2,4],[8.1,4]];pieces=Object.fromEntries(ids.map((id,i)=>[id,[...positions[i],0,false]]));}
  async function start(reason='new',nextMode=hintMode){return SistersRound.start(async()=>{if(reason==='restart')restarts++;hintMode=nextMode;if(reason!=='restart'||!question)question=await SistersChallenges.draw('tangram:'+hintMode,SistersBanks.tangram.assemblies);legacyView=false;selected='L1';hints=0;moves=0;startedAt=Date.now();document.getElementById('complete').hidden=true;scatter();chips();render();},reason);}
  function chips(){SistersChallenges.selector(document.getElementById('level-row'),[{value:'outline',label:'分塊線'},{value:'partial',label:'部分線'},{value:'silhouette',label:'只看輪廓'}],hintMode,v=>start('new',v),'提示難度');}
  SistersPlay.showCoach('tangram',[{demo:'🔺➡️',line:'拖到影子，旋轉或翻面；方向鍵可微調'}]);SistersPlay.mount({title:'七巧板',onRestart:()=>start('restart')});document.getElementById('rotate').onclick=()=>{if(!SistersRound.canInteract())return;pieces[selected][2]=(pieces[selected][2]+1)%4;clamp(selected);moves++;render();check();SistersRound.checkpoint();};document.getElementById('flip').onclick=()=>{if(!SistersRound.canInteract()||selected!=='P')return;pieces.P[3]=!pieces.P[3];moves++;render();check();SistersRound.checkpoint();};document.getElementById('hint').onclick=()=>{if(!SistersRound.canInteract()||hints>=3)return;const mapped=assignment(),id=ids.find(id=>!mapped[id]);if(!id)return;const used=new Set(Object.values(mapped)),slot=ids.find(slot=>kind(slot)===kind(id)&&!used.has(slot));hints++;pieces[id]=[...shape().parts[slot]];render();check();SistersRound.checkpoint();};document.getElementById('overlay-next').onclick=()=>start();
  window.TangramRules=Object.freeze({base,shapes,geometry,fits,assignment});
  chips();if(!await SistersRound.attach({snapshot:()=>dragSnapshot||({question,hintMode,legacyView,idx,selected,pieces,hints,moves,restarts,startedAt}),cancel:()=>cancelDrag?.(),restore:p=>{if(!(p.question||shapes[p.idx])||ids.some(id=>!Array.isArray(p.pieces[id])))throw Error('七巧板存檔格式錯誤');question=p.question||null;hintMode=p.hintMode||shapes[p.idx].hint;legacyView=p.legacyView??!p.question;({idx,selected,pieces,hints,moves,restarts,startedAt}=p);chips();render();}}))await start();
})();
