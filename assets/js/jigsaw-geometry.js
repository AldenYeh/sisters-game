(function(root){
 'use strict';
 const sign=(a,b)=>(a*13+b*7)%2?1:-1;
 function commands(cols,rows,index,w,h){const c=index%cols,r=Math.floor(index/cols),depth=Math.min(w,h)*.18,out=[['M',0,0]];
  function edge(x,y,dx,dy,s){const len=Math.hypot(dx,dy),nx=dy/len,ny=-dx/len,p=(t,d)=>[x+t*dx+nx*d*depth*s,y+t*dy+ny*d*depth*s];if(!s){out.push(['L',x+dx,y+dy]);return;}out.push(['L',...p(.34,0)],['C',...p(.43,0),...p(.40,.28),...p(.39,.48)],['C',...p(.34,1),...p(.66,1),...p(.61,.48)],['C',...p(.60,.28),...p(.57,0),...p(.66,0)],['L',x+dx,y+dy]);}
  edge(0,0,w,0,r?-sign(r-1,c):0);edge(w,0,0,h,c<cols-1?sign(r,c):0);edge(w,h,-w,0,r<rows-1?sign(r,c):0);edge(0,h,0,-h,c?-sign(r,c-1):0);out.push(['Z']);return out;
 }
 const api={commands};if(typeof module!=='undefined')module.exports=api;else root.SistersJigsaw=Object.freeze(api);
})(typeof window==='undefined'?globalThis:window);
