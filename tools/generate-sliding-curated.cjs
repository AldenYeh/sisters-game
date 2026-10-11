'use strict';
// Seeded structural boards; a move is one uninterrupted slide by any distance.
const fs=require('fs');let seed=0x534c4934;function rand(n){seed^=seed<<13;seed^=seed>>>17;seed^=seed<<5;return(seed>>>0)%n;}
function solve(ps,limit=18,cap=45000){
 const pow=ps.map((_,i)=>7**i),encode=v=>v.reduce((s,x,i)=>s+x*pow[i],0),start=ps.map(p=>p.h>p.w?p.r:p.c),queue=[start],parent=[-1],move=[null],depth=[0],seen=new Set([encode(start)]);
 for(let at=0;at<queue.length;at++){
  const v=queue[at];if(v[0]+ps[0].w===6){const route=[];for(let j=at;parent[j]>=0;j=parent[j])route.push(move[j]);return route.reverse();}if(depth[at]>=limit)continue;
  const occ=new Int8Array(36).fill(-1);ps.forEach((p,i)=>{const r=p.h>p.w?v[i]:p.r,c=p.w>p.h?v[i]:p.c;for(let y=0;y<p.h;y++)for(let x=0;x<p.w;x++)occ[(r+y)*6+c+x]=i;});
  for(let i=0;i<ps.length;i++){const p=ps[i],vert=p.h>p.w,r=vert?v[i]:p.r,c=vert?p.c:v[i];for(const sign of[-1,1])for(let dist=1;dist<6;dist++){const nr=r+(vert?sign*dist:0),nc=c+(vert?0:sign*dist);if(nr<0||nc<0||nr+p.h>6||nc+p.w>6)break;let blocked=false;for(let y=0;y<p.h;y++)for(let x=0;x<p.w;x++)if(occ[(nr+y)*6+nc+x]>=0&&occ[(nr+y)*6+nc+x]!==i)blocked=true;if(blocked)break;const q=v.slice();q[i]+=sign*dist;const key=encode(q);if(seen.has(key))continue;seen.add(key);queue.push(q);parent.push(at);move.push([i,nr-r,nc-c]);depth.push(depth[at]+1);if(queue.length>cap)return null;}}
 }return null;
}
function canonical(ps){return[false,true].map(f=>JSON.stringify(ps.map(p=>[p.w,p.h,f?6-p.r-p.h:p.r,p.c,+p.target]).sort((a,b)=>JSON.stringify(a).localeCompare(JSON.stringify(b))))).sort()[0];}
function blockers(ps){const t=ps[0];return ps.flatMap((p,i)=>i&&p.r<=t.r&&p.r+p.h>t.r&&p.c>=t.c+t.w?[i]:[]);}
function generate(){const bank={basic:[],planning:[],challenge:[]},seen=new Set();let attempts=0;
 while(Object.values(bank).some(a=>a.length<50)&&attempts<200000){attempts++;const er=2,ps=[{w:2,h:1,r:er,c:rand(2),target:true}],used=new Set([er*6+ps[0].c,er*6+ps[0].c+1]);
  for(let count=7+rand(5),i=0;i<count;i++)for(let a=0;a<30;a++){const shape=[[2,1],[3,1],[1,2],[1,3]][rand(4)],[w,h]=shape,r=rand(7-h),c=rand(7-w),cells=[];for(let y=0;y<h;y++)for(let x=0;x<w;x++)cells.push((r+y)*6+c+x);if(cells.some(v=>used.has(v)))continue;ps.push({w,h,r,c,target:false});cells.forEach(v=>used.add(v));break;}
  if(!blockers(ps).length)continue;let solution=solve(ps);if(!solution||solution.length<3)continue;
  // Remove decorative vehicles that are neither needed nor moved in this optimal route.
  let core=ps;for(let loop=0;loop<4;loop++){const moved=new Set(solution.map(m=>m[0]));const next=core.filter((_,i)=>!i||moved.has(i));if(next.length===core.length)break;const s=solve(next);if(!s)break;core=next;solution=s;}
  const initial=blockers(core),moved=new Set(solution.map(m=>m[0]).filter(Boolean)),indirect=[...moved].filter(i=>!initial.includes(i)).length;
  const n=solution.length,tier=n>=3&&n<=5&&moved.size>=2?'basic':n>=6&&n<=9&&moved.size>=3&&indirect>=1?'planning':n>=10&&n<=18&&moved.size>=4&&indirect>=2?'challenge':null;
  if(!tier||bank[tier].length>=50)continue;const key=canonical(core);if(seen.has(key))continue;seen.add(key);
  bank[tier].push({id:'curated-'+tier+'-'+bank[tier].length,name:{basic:'讓車先行',planning:'安排順序',challenge:'連環解鎖'}[tier],tier,rows:6,cols:6,exitRow:er,pieces:core,minimumMoves:n,solution,initialBlockers:initial.length,requiredOtherCars:moved.size,indirectCars:indirect});
  if(bank[tier].length%10===0)console.log(tier,bank[tier].length,'attempt',attempts);
 }
 const report={seed:'0x534c4934',attempts,tiers:Object.fromEntries(Object.entries(bank).map(([k,v])=>[k,{count:v.length,minMoves:Math.min(...v.map(x=>x.minimumMoves)),maxMoves:Math.max(...v.map(x=>x.minimumMoves)),minMovedOtherCars:Math.min(...v.map(x=>x.requiredOtherCars)),minIndirectCars:Math.min(...v.map(x=>x.indirectCars))}]))};console.log(JSON.stringify(report));if(Object.values(bank).some(a=>a.length<50))throw Error('Useful structural pool shortfall; no filler emitted');
 fs.writeFileSync('assets/data/sliding-bank.js','/* tools/generate-sliding-curated.cjs; seed 0x534c4934. Legacy saved questions remain embedded. */\nwindow.SistersBanks=window.SistersBanks||{};SistersBanks.sliding='+JSON.stringify(bank)+';\n');fs.mkdirSync('outputs/r3/sliding-quality',{recursive:true});fs.writeFileSync('outputs/r3/sliding-quality/generation.json',JSON.stringify(report,null,2));return bank;
}
module.exports={solve,canonical,blockers};if(require.main===module)generate();
