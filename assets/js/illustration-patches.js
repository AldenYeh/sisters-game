/* Versioned, masked edits of existing objects. The unmarked A is always the original artwork.
   Saved v1 decorative layers retain their separate immutable renderer. */
(() => {
  'use strict';
  const bases=new Map(),masks=new Map(),pairs=new Map(),supports=new Map();
  function bounded(cache,key,value,limit){cache.set(key,value);while(cache.size>limit)cache.delete(cache.keys().next().value);return value;}
  function validate(frame){
    if(!frame?.id||!frame.src||frame.version!==2||!Number.isInteger(frame.width)||!Number.isInteger(frame.height)||frame.width<1||frame.height<1||!Array.isArray(frame.details)||frame.details.length!==7)throw Error('自然物件插畫格式錯誤');
    const ids=new Set();
    for(const d of frame.details){
      if(!d.id||ids.has(d.id)||!d.label||!d.material||d.patch!==undefined||!Array.isArray(d.bounds)||d.bounds.length!==4||!Array.isArray(d.mask?.paths)||!d.mask.paths.length||!Array.isArray(d.mask.holes))throw Error('自然物件差異格式錯誤');
      ids.add(d.id);const[x,y,w,h]=d.bounds;
      if(![x,y,w,h].every(Number.isFinite)||x<0||y<0||w<=0||h<=0||x+w>frame.width||y+h>frame.height)throw Error('自然物件點擊範圍超出插畫');
      for(const path of [...d.mask.paths,...d.mask.holes]){if(typeof path!=='string'||path.length>20000)throw Error('物件遮罩格式錯誤');new Path2D(path);}
      if(d.material){const m=d.material;if(!Number.isFinite(m.targetHue)||m.targetHue<0||m.targetHue>=360||!Array.isArray(m.sourceHue)||!m.sourceHue.length||m.sourceHue.some(r=>!Array.isArray(r)||r.length!==2||r.some(v=>!Number.isFinite(v)||v<0||v>360)||r[0]>r[1]))throw Error('材質色系格式錯誤');for(const k of ['minSat','maxSat','minLight','maxLight'])if(!Number.isFinite(m[k])||m[k]<0||m[k]>1)throw Error('材質範圍格式錯誤');if(m.minSat>m.maxSat||m.minLight>m.maxLight)throw Error('材質範圍格式錯誤');if(m.satModel!==undefined&&!['hsl','hsv'].includes(m.satModel))throw Error('材質色系格式錯誤');for(const[k,lo,hi]of[['targetSat',0,1],['lightnessScale',0,2],['lightnessDelta',-1,1]])if(m[k]!==undefined&&(!Number.isFinite(m[k])||m[k]<lo||m[k]>hi))throw Error('材質色系格式錯誤');}
    }
    // Object bounding boxes can overlap at occlusions. Pointer input resolves
    // against the actual material alpha; the final masks are checked in QA.
    return true;
  }
  function surface(frame){const c=document.createElement('canvas');c.width=frame.width;c.height=frame.height;return c;}
  function mask(frame,detail){
    const key=frame.width+'x'+frame.height+'|'+JSON.stringify(detail.mask);
    if(masks.has(key))return masks.get(key);
    const c=surface(frame),g=c.getContext('2d');g.fillStyle='#fff';
    for(const path of detail.mask.paths)g.fill(new Path2D(path));
    g.globalCompositeOperation='destination-out';for(const path of detail.mask.holes)g.fill(new Path2D(path));
    return bounded(masks,key,c,7);
  }
  function image(src,cache,limit){
    if(cache.has(src))return cache.get(src);
    const promise=new Promise((resolve,reject)=>{const img=new Image();img.decoding='async';img.onload=()=>resolve(img);img.onerror=()=>{cache.delete(src);reject(Error('自然物件圖片載入失敗；原局保留，請重試。'));};img.src=src;});
    return bounded(cache,src,promise,limit);
  }
  function hsl(r,g,b){r/=255;g/=255;b/=255;const hi=Math.max(r,g,b),lo=Math.min(r,g,b),chroma=hi-lo,l=(hi+lo)/2;let h=0,s=0;if(chroma){s=chroma/(1-Math.abs(2*l-1));h=60*(hi===r?((g-b)/chroma)%6:hi===g?(b-r)/chroma+2:(r-g)/chroma+4);if(h<0)h+=360;}return{h,s,l,v:hi,sv:hi?chroma/hi:0};}
  function rgb(h,s,l){const c=(1-Math.abs(2*l-1))*s,x=c*(1-Math.abs((h/60)%2-1)),m=l-c/2;const a=h<60?[c,x,0]:h<120?[x,c,0]:h<180?[0,c,x]:h<240?[0,x,c]:h<300?[x,0,c]:[c,0,x];return a.map(v=>Math.round((v+m)*255));}
  function eligible(color,m){const sat=m.satModel==='hsv'?color.sv:color.s;return color.h>=0&&m.sourceHue.some(([lo,hi])=>color.h>=lo&&color.h<=hi)&&sat>=m.minSat&&sat<=m.maxSat&&color.l>=m.minLight&&color.l<=m.maxLight;}
  // Original material pixels supply the geometry, ink, prints and shading. Generated
  // colour studies never replace the whole scene or redraw the source's contours.
  function material(frame,d,base){
    const key=JSON.stringify([frame.src,frame.width,frame.height,d.mask,d.material]);if(supports.has(key))return supports.get(key);
    const source=base.getContext('2d').getImageData(0,0,frame.width,frame.height),alpha=mask(frame,d).getContext('2d').getImageData(0,0,frame.width,frame.height).data,piece=surface(frame),g=piece.getContext('2d'),pixels=g.createImageData(frame.width,frame.height),supportAlpha=new Uint8Array(frame.width*frame.height),m=d.material;
    let changedPixels=0,minX=frame.width,minY=frame.height,maxX=0,maxY=0;
    for(let i=0;i<alpha.length;i+=4){if(!alpha[i+3])continue;const color=hsl(source.data[i],source.data[i+1],source.data[i+2]);if(!eligible(color,m))continue;const s=m.targetSat??color.s,l=Math.max(0,Math.min(1,color.l*(m.lightnessScale??1)+(m.lightnessDelta||0))),next=rgb(m.targetHue,s,l),x=(i/4)%frame.width,y=Math.floor(i/4/frame.width);pixels.data[i]=next[0];pixels.data[i+1]=next[1];pixels.data[i+2]=next[2];pixels.data[i+3]=alpha[i+3];supportAlpha[i/4]=alpha[i+3];minX=Math.min(minX,x);minY=Math.min(minY,y);maxX=Math.max(maxX,x);maxY=Math.max(maxY,y);if(alpha[i+3]>=128&&Math.max(Math.abs(next[0]-source.data[i]),Math.abs(next[1]-source.data[i+1]),Math.abs(next[2]-source.data[i+2]))>=2)changedPixels++;}
    if(!changedPixels)throw Error('自然物件差異沒有變化；原局保留，請重試。');
    const x=Math.max(0,minX-2),y=Math.max(0,minY-2),bounds=[x,y,Math.min(frame.width,maxX+3)-x,Math.min(frame.height,maxY+3)-y];
    g.putImageData(pixels,0,0);return bounded(supports,key,{canvas:piece,alpha:supportAlpha,bounds},7);
  }
  function selectedDetails(frame,selected){validate(frame);if(!Array.isArray(selected)||new Set(selected).size!==selected.length)throw Error('差異答案格式錯誤');return selected.map(id=>{const d=frame.details.find(d=>d.id===id);if(!d)throw Error('差異答案不在當局');return d;});}
  async function canvas(frame,selected=[],changed=false){
    const details=selectedDetails(frame,selected),key=JSON.stringify([frame,selected,changed]);
    if(pairs.has(key))return pairs.get(key);
    const promise=(async()=>{
      const base=await image(frame.src,bases,4),out=surface(frame),g=out.getContext('2d');g.drawImage(base,0,0,out.width,out.height);
      const original=changed?copy(out):out,occupied=changed?new Uint8Array(frame.width*frame.height):null;
      if(changed)for(const d of details){
        const piece=material(frame,d,original);for(let i=0;i<piece.alpha.length;i++)if(piece.alpha[i]){if(occupied[i])throw Error('自然物件差異重疊；原局保留，請重試。');occupied[i]=1;}g.drawImage(piece.canvas,0,0);
      }
      return out;
    })();
    bounded(pairs,key,promise,4);try{return await promise;}catch(e){pairs.delete(key);throw e;}
  }
  function copy(source){const c=document.createElement('canvas');c.width=source.width;c.height=source.height;c.getContext('2d').drawImage(source,0,0);return c;}
  function spots(frame,selected,base){return selectedDetails(frame,selected).map(d=>{const[x,y,w,h]=base?material(frame,d,base).bounds:d.bounds;return{id:d.id,label:d.label,x:100*x/frame.width,y:100*y/frame.height,w:100*w/frame.width,h:100*h/frame.height};});}
  function hitPoint(frame,selected,base,x,y,radius=9){if(![x,y,radius].every(Number.isFinite)||radius<0)return null;let winner=null,best=Infinity;for(const d of selectedDetails(frame,selected)){const alpha=material(frame,d,base).alpha;for(let py=Math.max(0,Math.floor(y-radius));py<=Math.min(frame.height-1,Math.ceil(y+radius));py++)for(let px=Math.max(0,Math.floor(x-radius));px<=Math.min(frame.width-1,Math.ceil(x+radius));px++){const i=py*frame.width+px;if(!alpha[i])continue;const distance=Math.hypot(px+.5-x,py+.5-y);if(distance<best&&distance<=radius){best=distance;winner=d.id;}}}return winner;}
  function support(frame,detail,base){return material(frame,detail,base).canvas;}
  window.SistersIllustrationPatches=Object.freeze({validate,canvas,copy,spots,mask,support,hitPoint});
})();
