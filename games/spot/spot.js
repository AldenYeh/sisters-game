(async()=>{
"use strict";
const scenes=window.SpotScenes,cache=new Map();
let scene=0,found=new Set(),startedAt=Date.now(),initializing=true,switching=false,wanted=null,loadingScene=null;
function image(src){
 if(cache.has(src))return cache.get(src);
 const promise=new Promise((resolve,reject)=>{const img=new Image();img.onload=()=>resolve(img);img.onerror=()=>{cache.delete(src);reject(Error("找不同圖片載入失敗；原局保留，請重試保存。"));};img.src=src;});cache.set(src,promise);return promise;
}
async function load(i){await Promise.all([image(scenes[i].a),image(scenes[i].b)]);}
async function start(reason="new",nextScene=wanted?.i??loadingScene??scene){
 wanted={reason,i:nextScene};chips();if(initializing||switching)return;
 switching=true;
 try{while(wanted){const next=wanted;wanted=null;loadingScene=next.i;
 const ok=await SistersRound.start(async()=>{await load(next.i);scene=next.i;found=new Set();startedAt=Date.now();document.getElementById("complete").hidden=true;render();chips();},next.reason);
 if(!ok){wanted=null;break;}
 }}finally{switching=false;loadingScene=null;chips();if(!document.querySelector('.round-bar[data-error=true]'))preloadNext();}
}
function preloadNext(){const i=(scene+1)%scenes.length;const task=()=>load(i).catch(()=>{});if(window.requestIdleCallback)requestIdleCallback(task,{timeout:1500});else setTimeout(task,0);}
function render(){
 const data=scenes[scene],root=document.getElementById("scene");root.replaceChildren();
 const pair=document.createElement("div");pair.className="pair";
 for(const [i,src] of [data.a,data.b].entries()){
  const figure=document.createElement("figure"),caption=document.createElement("figcaption"),img=document.createElement("img");
  caption.textContent=i?("找不同 · "+data.name):"原圖";img.src=src;img.alt=data.name+(i?"找不同":"原圖");img.width=960;img.height=644;img.decoding="async";figure.append(caption);
  if(!i)figure.append(img);
  else{const find=document.createElement("div"),hits=document.createElement("div");find.className="find";hits.className="hits";find.append(img,hits);
   data.spots.forEach((sp,index)=>{const button=document.createElement("button");button.type="button";button.className="hit";button.dataset.spot=sp.id;Object.assign(button.style,{left:sp.x+"%",top:sp.y+"%",width:sp.w+"%",height:sp.h+"%"});button.setAttribute("aria-label","找不同區域 "+(index+1));button.onclick=()=>mark(sp.id);hits.append(button);});
   figure.append(find);
  }pair.append(figure);
 }root.append(pair);syncFound();
}
function syncFound(){
 for(const button of document.querySelectorAll(".hit")){const yes=found.has(button.dataset.spot);button.classList.toggle("found",yes);button.setAttribute("aria-pressed",String(yes));}
 document.getElementById("status").textContent="第 "+(scene+1)+" / "+scenes.length+" 景 · 點右邊不一樣的地方 · "+found.size+"/"+scenes[scene].spots.length;
}
function mark(id){
 if(!SistersRound.canInteract()||found.has(id))return;found.add(id);SistersPlay.playSound("ok");syncFound();SistersRound.checkpoint();
 if(found.size===scenes[scene].spots.length){SistersPlay.showComplete(scenes[scene].name+"找到了");SistersPlay.recordResult({difficulty:String(found.size),level:scenes[scene].name,startedAt,moves:found.size});}
}
function chips(){
 const row=document.getElementById("diff-row");row.replaceChildren();
 scenes.forEach((data,i)=>{const b=document.createElement("button");b.type="button";b.className="chip"+(i===(wanted?.i??loadingScene??scene)?" selected":"");b.textContent=(i+1)+" "+data.name;b.disabled=initializing;b.dataset.roundSwitch="true";b.onclick=()=>start("new",i);row.append(b);});
}
const next=()=>start("new",((wanted?.i??loadingScene??scene)+1)%scenes.length);
SistersPlay.showCoach("spot",[{demo:"👀",line:"左邊原圖，點右邊不一樣的地方"}]);SistersPlay.mount({title:"找不同",onRestart:next});
document.getElementById("retry-scene").onclick=()=>start("restart",scene);document.getElementById("overlay-next").onclick=next;
for(const id of ["restart","overlay-next"])document.getElementById(id).dataset.roundSwitch="true";
chips();const restored=await SistersRound.attach({snapshot:()=>({scene,found:[...found],startedAt}),restore:async p=>{if(!scenes[p.scene]||!Array.isArray(p.found)||p.found.some(id=>!scenes[p.scene].spots.some(sp=>sp.id===id)))throw Error("找不同存檔格式錯誤");await load(p.scene);scene=p.scene;found=new Set(p.found);startedAt=p.startedAt;render();chips();}});
initializing=false;if(!restored)await start();else{chips();preloadNext();}
})();
