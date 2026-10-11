(async()=>{
"use strict";
const scenes=window.SpotScenes,cache=new Map();
let question=null,tier=3,pair=null;
const layered=q=>q?.kind==='illustration-layers-v1';
const frame=q=>q.frame;
function availableFrames(){return SistersIllustrations.map(f=>({...f,details:window.IllustrationDetails?.[f.id]})).filter(f=>Array.isArray(f.details)&&f.details.length>=7);}
const curated=scenes.slice(0,5);
let legacyArtLoad=null;
async function legacyArt(){if(window.SistersSceneArt)return;if(!legacyArtLoad)legacyArtLoad=new Promise((resolve,reject)=>{const script=document.createElement('script');script.src='../../assets/js/scene-art.js';script.onload=resolve;script.onerror=()=>{legacyArtLoad=null;script.remove();reject(Error('舊題圖片載入失敗；存檔保留，請重試。'));};document.head.append(script);});await legacyArtLoad;}
const data=()=>layered(question)?{name:question.frame.name,spots:SistersIllustrationDetails.spots(frame(question),question.selectedIDs),pair}:question?{...scenes[scene],a:SistersSceneArt.make(question.theme,question),b:SistersSceneArt.make(question.theme,question,true),spots:SistersSceneArt.spots(question)}:scenes[scene];
let scene=0,found=new Set(),startedAt=Date.now(),initializing=true,switching=false,wanted=null,loadingScene=null;
function image(src){
 if(cache.has(src))return cache.get(src);
 const promise=new Promise((resolve,reject)=>{const img=new Image();img.onload=()=>resolve(img);img.onerror=()=>{cache.delete(src);reject(Error("找不同圖片載入失敗；原局保留，請重試保存。"));};img.src=src;});cache.set(src,promise);return promise;
}
async function load(i,q=null){if(layered(q)){const f=frame(q);SistersIllustrationDetails.validate(f);if(![3,5,7].includes(q.tier)||q.selectedIDs.length!==q.tier||new Set(q.selectedIDs).size!==q.tier)throw Error('差異題格式錯誤');return Promise.all([SistersIllustrationDetails.canvas(f,q.selectedIDs),SistersIllustrationDetails.canvas(f,q.selectedIDs,true)]);}if(q)await legacyArt();const a=q?SistersSceneArt.make(q.theme,q):scenes[i].a,b=q?SistersSceneArt.make(q.theme,q,true):scenes[i].b;await Promise.all([image(a),image(b)]);while(cache.size>24)cache.delete(cache.keys().next().value);}
async function start(reason="new",nextTier=wanted?.tier??loadingScene??tier){
 wanted={reason,tier:nextTier};chips();if(initializing||switching)return;
 switching=true;
 try{while(wanted){const next=wanted;wanted=null;loadingScene=next.tier;
 const ok=await SistersRound.start(async()=>{
  if(!Object.prototype.hasOwnProperty.call(next,'choice')){let q=next.reason==='restart'?question:null;
  if(next.reason!=='restart'){const frames=availableFrames();if(frames.length!==50)throw Error('完整插畫題庫尚未就緒；原局保留');const f=await SistersChallenges.draw('spot:illustrations:v1:'+next.tier,frames);q={kind:'illustration-layers-v1',id:f.id+':'+next.tier,frame:f,tier:next.tier,selectedIDs:f.details.slice(0,next.tier).map(d=>d.id)};}next.choice=q;}
  const q=next.choice;const loaded=await load(scene,q);pair=layered(q)?loaded:null;question=q;tier=layered(q)?q.tier:next.tier;found=new Set();startedAt=Date.now();document.getElementById('complete').hidden=true;render();chips();
 },next.reason);if(!ok){wanted=null;break;}
 }}finally{switching=false;loadingScene=null;chips();}
}
function render(){
 const current=data(),root=document.getElementById("scene");root.replaceChildren();
 const pair=document.createElement("div");pair.className="pair";
 for(const [i,src] of (current.pair||[current.a,current.b]).entries()){
  const figure=document.createElement("figure"),caption=document.createElement("figcaption"),img=current.pair?SistersIllustrationDetails.copy(src):document.createElement("img");
  caption.textContent=i?("找不同 · "+current.name):"原圖";if(!current.pair){img.src=src;img.alt=current.name+(i?"找不同":"原圖");img.width=960;img.height=644;img.decoding="async";}else{img.setAttribute("role","img");img.setAttribute("aria-label",current.name+(i?"找不同":"原圖"));}figure.append(caption);
  if(!i)figure.append(img);
  else{const find=document.createElement("div"),hits=document.createElement("div");find.className="find";hits.className="hits";find.append(img,hits);
   current.spots.forEach((sp,index)=>{const button=document.createElement("button");button.type="button";button.className="hit";button.dataset.spot=sp.id;Object.assign(button.style,{left:sp.x+"%",top:sp.y+"%",width:sp.w+"%",height:sp.h+"%"});button.setAttribute("aria-label","找不同區域 "+(index+1));button.onclick=()=>mark(sp.id);hits.append(button);});
   figure.append(find);
  }pair.append(figure);
 }root.append(pair);syncFound();
}
function syncFound(){
 for(const button of document.querySelectorAll(".hit")){const yes=found.has(button.dataset.spot);button.classList.toggle("found",yes);button.setAttribute("aria-pressed",String(yes));}
 document.getElementById("status").textContent=layered(question)?question.frame.name+" · 點右邊不一樣的地方 · "+found.size+"/"+question.tier:"第 "+(scene+1)+" / "+(scene<curated.length?curated.length:scenes.length)+" 景 · 點右邊不一樣的地方 · "+found.size+"/"+data().spots.length;
}
function mark(id){
 if(!SistersRound.canInteract()||found.has(id))return;found.add(id);SistersPlay.playSound("ok");syncFound();SistersRound.checkpoint();
 if(found.size===data().spots.length){SistersPlay.showComplete(data().name+"找到了");SistersPlay.recordResult({difficulty:String(found.size),level:layered(question)?question.frame.id:scenes[scene].name,startedAt,moves:found.size});}
}
function chips(){
 const row=document.getElementById('diff-row');
 SistersChallenges.selector(row,[3,5,7].map(value=>({value,label:value+' 個不同'})),wanted?.tier??loadingScene??tier,v=>start('new',+v),'找不同難度');row.querySelector('select').disabled=initializing;
}
const next=()=>start('new',tier);
SistersPlay.showCoach("spot",[{demo:"👀",line:"左邊原圖，點右邊不一樣的地方"}]);SistersPlay.mount({title:"找不同",onRestart:next});
document.getElementById("retry-scene").onclick=()=>start("restart",tier);document.getElementById("overlay-next").onclick=next;
for(const id of ["restart","overlay-next"])document.getElementById(id).dataset.roundSwitch="true";
chips();const restored=await SistersRound.attach({snapshot:()=>({question,scene,found:[...found],startedAt,...(layered(question)?{tier}:{})}),restore:async p=>{
 if(!Array.isArray(p.found)||!layered(p.question)&&!scenes[p.scene])throw Error('找不同存檔格式錯誤');
 const savedFound=p.scene===2&&!p.question?p.found.map(id=>id==='star'?'crab':id):p.found;
 scene=p.scene;question=p.question||null;tier=layered(question)?question.tier:3;const loaded=await load(scene,question);pair=layered(question)?loaded:null;
 if(savedFound.some(id=>!data().spots.some(sp=>sp.id===id)))throw Error('差異記錄格式錯誤');found=new Set(savedFound);startedAt=p.startedAt;render();chips();
}});initializing=false;if(!restored)await start();else chips();
})();
