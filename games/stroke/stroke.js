(async () => {
  'use strict';
  const levels=window.StrokeLevels,svg=document.getElementById('board'),status=document.getElementById('status');
  let question=null,tier='easy',index=0,used=new Set(),last=null,moves=0,startedAt=Date.now(),restarts=0,completed=false;
  let radius=8,gesture=null,queue=[],draining=false,checkpointing=false,generation=0;
  const level=()=>question||levels[index];
  async function load(i=index,reason='new',nextTier=tier){return SistersRound.start(async()=>{
    if(reason==='restart')restarts++;
    const old=level();tier=nextTier;question=reason==='restart'?structuredClone(old):await SistersChallenges.draw('stroke:'+tier,SistersBanks.stroke[tier]);
    index=i;used=new Set();last=null;moves=0;startedAt=Date.now();completed=false;document.getElementById('complete').hidden=true;chips();render();
  },reason);}
  function render(){
    const L=level();let spacing=Infinity;
    L.nodes.forEach((a,i)=>L.nodes.slice(i+1).forEach(b=>spacing=Math.min(spacing,Math.hypot(a[0]-b[0],a[1]-b[1]))));
    // Touching circles concealed real edges and made unconnected nodes look connected.
    radius=Math.min(12,spacing*.24);
    const xs=L.nodes.map(n=>n[0]),ys=L.nodes.map(n=>n[1]),pad=radius+12;
    svg.setAttribute('viewBox',[Math.min(...xs)-pad,Math.min(...ys)-pad,Math.max(...xs)-Math.min(...xs)+2*pad,Math.max(...ys)-Math.min(...ys)+2*pad].join(' '));
    const edges=L.edges.map((e,i)=>{const a=L.nodes[e[0]],b=L.nodes[e[1]],done=used.has(i);return `<line data-i="${i}" class="${done?'used':'unused'}" x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}"/>`;}).join('');
    const nodes=L.nodes.map((n,i)=>`<circle tabindex="0" role="button" aria-label="節點 ${i+1}${last===i?'，目前位置':''}" data-n="${i}" cx="${n[0]}" cy="${n[1]}" r="${radius+(last===i?1.5:0)}" class="${last===i?'current':''}"/>`).join('');
    svg.innerHTML=edges+nodes;
    status.textContent=last==null?'點一個點開始；可連續拖曳，或逐點點選。每條線只走一次':`從紅點沿紫線走 · 綠色虛線已走過 · 還剩 ${L.edges.length-used.size} 條`;
  }
  function cancel(){generation++;queue=[];releaseGesture();}
  function releaseGesture(){const g=gesture;gesture=null;if(g&&svg.hasPointerCapture(g.id))svg.releasePointerCapture(g.id);}
  function allowed(id){return SistersRound.current()?.id===id&&SistersRound.owns()&&SistersFamily.canPlay(SistersRound.current())&&!SistersFamily.fault()&&!document.querySelector('.coach,.family-dialog[open]');}
  function enqueue(n){if(n==null||queue.at(-1)===n||(!queue.length&&last===n))return;queue.push(n);void drain();}
  function straightNodes(from,to){
    const ns=level().nodes,a=ns[from],b=ns[to],dx=b[0]-a[0],dy=b[1]-a[1],length=dx*dx+dy*dy;
    if(!length)return[];
    return ns.map((p,n)=>({n,t:((p[0]-a[0])*dx+(p[1]-a[1])*dy)/length,d:Math.abs((p[0]-a[0])*dy-(p[1]-a[1])*dx)/Math.sqrt(length)}))
      .filter(p=>p.t>0&&p.t<=1&&p.d<.5).sort((p,q)=>p.t-q.t).map(p=>p.n);
  }
  function advance(n){
    if(last==null){last=n;return{changed:true};}if(n===last)return{changed:false};
    const L=level();let changed=false;
    // Visit collinear junctions on a fast movement; never invent a missing edge.
    const direct=L.edges.some(([a,b])=>a===last&&b===n||b===last&&a===n);
    for(const next of direct?[n]:straightNodes(last,n)){
      const edge=L.edges.findIndex(([a,b])=>a===last&&b===next||b===last&&a===next);
      if(edge<0)return{changed,message:'這兩點之間沒有連線；請沿紫線從紅點走'};
      if(used.has(edge))return{changed,message:'這條綠色虛線已經走過，不能重複走'};
      used.add(edge);last=next;moves++;changed=true;
    }
    return{changed};
  }
  async function drain(){
    if(draining||!queue.length)return;
    if(!SistersRound.canInteract()){queue=[];return;}
    draining=true;const token=generation,id=SistersRound.current().id;
    try{
      while(queue.length&&token===generation&&allowed(id)&&SistersRound.canInteract()){
        let changed=false,message='';const batch=queue;queue=[];
        for(const n of batch){const result=advance(n);changed=changed||result.changed;if(result.message)message=result.message;if(used.size===level().edges.length)break;}
        if(changed){render();if(message)status.textContent=message;checkpointing=true;const ok=await SistersRound.checkpoint();checkpointing=false;if(!ok||token!==generation)break;}
        else if(message)status.textContent=message;
        if(used.size===level().edges.length&&!completed&&allowed(id)){
          completed=true;cancel();SistersPlay.showComplete('整張圖走完了');
          SistersPlay.recordResult({game:'stroke',difficulty:level().tier,level:level().name,startedAt,moves,restartCount:restarts});break;
        }
      }
    }finally{checkpointing=false;draining=false;queue=[];}
  }
  function point(e){const p=svg.createSVGPoint();p.x=e.clientX;p.y=e.clientY;return p.matrixTransform(svg.getScreenCTM().inverse());}
  function near(p){let best=null,distance=radius+2;level().nodes.forEach((n,i)=>{const d=Math.hypot(p.x-n[0],p.y-n[1]);if(d<=distance){distance=d;best=i;}});return best;}
  function along(a,b){
    const dx=b.x-a.x,dy=b.y-a.y,len=dx*dx+dy*dy;if(!len){enqueue(near(b));return;}
    const hits=level().nodes.map((n,i)=>{const t=Math.max(0,Math.min(1,((n[0]-a.x)*dx+(n[1]-a.y)*dy)/len));return{i,t,d:Math.hypot(n[0]-a.x-t*dx,n[1]-a.y-t*dy)};})
      .filter(n=>n.d<=radius+2).sort((p,q)=>p.t-q.t);
    hits.forEach(n=>enqueue(n.i));
  }
  svg.addEventListener('pointerdown',e=>{
    if(gesture||!SistersRound.canInteract()||e.button!==0)return;
    const p=point(e),n=near(p);if(n==null)return;
    e.preventDefault();gesture={id:e.pointerId,round:SistersRound.current().id,point:p};svg.setPointerCapture(e.pointerId);enqueue(n);
  });
  // Buffer only an already authorised gesture during its own checkpoint.
  // The shared blocker continues to gate all new board interactions.
  for(const type of ['pointermove','pointerup','pointercancel'])window.addEventListener(type,e=>{
    if(!gesture||e.pointerId!==gesture.id)return;
    if(!allowed(gesture.round)||(!SistersRound.canInteract()&&!checkpointing)){cancel();return;}
    e.preventDefault();e.stopImmediatePropagation();
    if(type==='pointercancel'){cancel();return;}
    const p=point(e),previous=gesture.point;gesture.point=p;along(previous,p);
    if(type==='pointerup')releaseGesture();
  },{capture:true,passive:false});
  svg.addEventListener('lostpointercapture',()=>{if(gesture)cancel();});
  svg.addEventListener('click',e=>{if(e.detail===0&&SistersRound.canInteract()){const n=e.target.closest('[data-n]');if(n)enqueue(+n.dataset.n);}});
  svg.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.hasAttribute('data-n')&&SistersRound.canInteract()){e.preventDefault();enqueue(+e.target.dataset.n);}});
  function chips(){SistersChallenges.selector(document.getElementById('level-row'),[{value:'easy',label:'8–24 條線'},{value:'normal',label:'26–40 條線'},{value:'hard',label:'42–60 條線'}],tier,v=>load(index,'new',v),'線圖大小');}
  SistersPlay.showCoach('stroke',[{demo:'✏️',line:'從紅點沿紫線拖曳或逐點點選；綠色虛線已走過'}]);
  SistersPlay.mount({title:'一筆畫',onRestart:()=>load(index,'restart')});
  document.getElementById('overlay-next').onclick=()=>load((index+1)%levels.length);
  chips();if(!await SistersRound.attach({snapshot:()=>({question,tier,index,used:[...used],last,moves,startedAt,restarts}),cancel,restore:(p,r)=>{question=p.question||null;tier=p.tier||'easy';({index,last,moves,startedAt,restarts}=p);used=new Set(p.used);completed=r.status==='completed';chips();render();}}))await load(0);
})();
