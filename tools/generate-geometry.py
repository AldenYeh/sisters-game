"""Original reproducible geometry banks; optional generation-only Shapely 2.2.0.
PYTHONPATH=/workspace/scratch/r3-python-libs python tools/generate-geometry.py
No runtime dependency. Seed 20261011. Solutions are rechecked independently.
"""
import json,random,collections,itertools,sys
from pathlib import Path
R=random.Random(20261011)
def emit(game,bank):
 assert all(len(a)==50 for a in bank.values())
 seed=20261011+['stroke','sliding','sokoban','tangram'].index(game)*1000
 Path('assets/data/'+game+'-bank.js').write_text('/* tools/generate-geometry.py, seed '+str(seed)+' */\nwindow.SistersBanks=window.SistersBanks||{};SistersBanks.'+game+'='+json.dumps(bank,separators=(',',':'),ensure_ascii=False)+';\n')
 print(game,{k:len(v) for k,v in bank.items()},flush=True)
def canon(points,edges=None):
 out=[]
 for swap in [False,True]:
  for sx,sy in itertools.product([-1,1],repeat=2):
   ps=[((y if swap else x)*sx,(x if swap else y)*sy) for x,y in points];mx=min(x for x,y in ps);my=min(y for x,y in ps);ps=[(round(x-mx,5),round(y-my,5)) for x,y in ps]
   if edges is None:out.append(str(sorted(ps)))
   else:out.append(str(sorted(tuple(sorted([ps[a],ps[b]])) for a,b in edges)))
 return min(out)
def stroke():
 import networkx as nx
 bank={k:[] for k in ['easy','normal','hard']};seen=set();graphs={};attempt=0
 while any(len(v)<50 for v in bank.values()):
  attempt+=1;cells=R.sample(list(itertools.product(range(5),repeat=2)),R.randint(4,20));es=set()
  for x,y in cells:
   p=[(x,y),(x+1,y),(x+1,y+1),(x,y+1)]
   for a,b in zip(p,p[1:]+p[:1]):
    e=tuple(sorted([a,b]));es.symmetric_difference_update([e])
  nodes=sorted(set(itertools.chain.from_iterable(es)))
  extra=[tuple(sorted([a,b])) for a,b in itertools.combinations(nodes,2) if abs(a[0]-b[0])+abs(a[1]-b[1])==1 and tuple(sorted([a,b])) not in es]
  if extra and R.random()<.65:es.add(R.choice(extra))
  ids={p:i for i,p in enumerate(nodes)};edges=sorted([sorted([ids[a],ids[b]]) for a,b in es]);adj={i:[] for i in range(len(nodes))}
  for i,(a,b) in enumerate(edges):adj[a].append((b,i));adj[b].append((a,i))
  odds=[i for i in adj if len(adj[i])%2]
  if len(odds) not in [0,2]:continue
  remaining=set(range(len(edges)));stack=[odds[0] if odds else 0];route=[]
  while stack:
   v=stack[-1];next_edge=next(((w,e) for w,e in adj[v] if e in remaining),None)
   if next_edge:w,e=next_edge;remaining.remove(e);stack.append(w)
   else:route.append(stack.pop())
  if remaining or max(map(len,adj.values()))<3:continue
  count=len(edges);tier='easy' if 8<=count<=24 else 'normal' if 26<=count<=40 else 'hard' if 42<=count<=60 else None
  if tier is None or len(bank[tier])>=50:continue
  key=canon(nodes,edges)
  if key in seen:continue
  graph=nx.Graph();graph.add_edges_from(edges);signature=nx.weisfeiler_lehman_graph_hash(graph,iterations=7)
  if any(nx.is_isomorphic(graph,old) for old in graphs.get(signature,[])):continue
  graphs.setdefault(signature,[]).append(graph)
  seen.add(key);mx=min(x for x,y in nodes);my=min(y for x,y in nodes);span=max(max(x for x,y in nodes)-mx,max(y for x,y in nodes)-my);coords=[[round(25+(x-mx)*150/span,4),round(25+(y-my)*150/span,4)] for x,y in nodes]
  bank[tier].append(dict(id=tier+'-'+str(len(bank[tier])),name='隨機線圖',tier=tier,nodes=coords,edges=edges,odds=len(odds),solution=list(reversed(route))))
 emit('stroke',bank)
def sliding():
 bank={str(i):[] for i in range(1,5)};seen=set();attempt=0
 def solve(ps,exitrow,limit=4):
  start=tuple((p['r'] if p['h']>p['w'] else p['c']) for p in ps);queue=collections.deque([start]);prev={start:None};steps={start:0}
  while queue:
   v=queue.popleft()
   if v[0]+ps[0]['w']==6:
    route=[]
    while prev[v] is not None:v0,move=prev[v];route.append(move);v=v0
    return list(reversed(route))
   if steps[v]>=limit:continue
   occ=set()
   for p,at in zip(ps,v):
    r=at if p['h']>p['w'] else p['r'];c=at if p['w']>p['h'] else p['c'];occ.update((r+y,c+x) for x in range(p['w']) for y in range(p['h']))
   for i,p in enumerate(ps):
    vertical=p['h']>p['w'];r=v[i] if vertical else p['r'];c=p['c'] if vertical else v[i];own={(r+y,c+x) for x in range(p['w']) for y in range(p['h'])};used=occ-own
    for sign in [-1,1]:
     for distance in range(1,6):
      nr=r+sign*distance if vertical else r;nc=c if vertical else c+sign*distance
      if nr<0 or nc<0 or nr+p['h']>6 or nc+p['w']>6 or any((nr+y,nc+x) in used for x in range(p['w']) for y in range(p['h'])):break
      q=list(v);q[i]+=sign*distance;q=tuple(q)
      if q not in prev:prev[q]=(v,[i,nr-r,nc-c]);steps[q]=steps[v]+1;queue.append(q)
   if len(prev)>30000:return None
  return None
 while any(len(v)<50 for v in bank.values()):
  attempt+=1;er=R.choice([2,3]);ps=[dict(w=2,h=1,r=er,c=R.choice([0,1]),target=True)];used={(er,c) for c in range(ps[0]['c'],ps[0]['c']+2)}
  for _ in range(R.randint(5,10)):
   for _ in range(20):
    w,h=R.choice([(2,1),(3,1),(1,2),(1,3)]);r=R.randrange(7-h);c=R.randrange(7-w);cells={(r+y,c+x) for x in range(w) for y in range(h)}
    if not cells&used:ps.append(dict(w=w,h=h,r=r,c=c,target=False));used|=cells;break
  key=min(str(sorted((p['w'],p['h'],5-p['r']-p['h']+1 if flip else p['r'],p['c'],p['target']) for p in ps)) for flip in [False,True])
  if key in seen:continue
  solution=solve(ps,er)
  if not solution:continue
  tier=str(len(solution))
  if len(bank[tier])>=50:continue
  seen.add(key);bank[tier].append(dict(id=tier+'-'+str(len(bank[tier])),name='隨機紅車',tier=tier,rows=6,cols=6,exitRow=er,pieces=ps,minimumMoves=len(solution),solution=solution))
 emit('sliding',bank)
def sokoban():
 bank={str(i):[] for i in range(1,4)};seen=set();directions=[(1,0),(-1,0),(0,1),(0,-1)]
 def solve(floor,goals,p,bs):
  start=(p,tuple(sorted(bs)));queue=collections.deque([start]);prev={start:None}
  while queue:
   p,bs=queue.popleft()
   if set(bs)==goals:
    route=[];v=(p,bs)
    while prev[v] is not None:v0,d=prev[v];route.append(d);v=v0
    return list(reversed(route))
   for dx,dy in directions:
    np=(p[0]+dx,p[1]+dy)
    if np not in floor:continue
    new=set(bs)
    if np in new:
     b=(np[0]+dx,np[1]+dy)
     if b not in floor or b in new:continue
     # Reject static corners unless they are a goal.
     if b not in goals and any((b[0]+ax,b[1]+ay) not in floor and (b[0]+bx,b[1]+by) not in floor for (ax,ay),(bx,by) in [((1,0),(0,1)),((1,0),(0,-1)),((-1,0),(0,1)),((-1,0),(0,-1))]):continue
     new.remove(np);new.add(b)
    q=(np,tuple(sorted(new)))
    if q not in prev:prev[q]=((p,bs),[dx,dy]);queue.append(q)
   if len(prev)>30000:return None
  return None
 for n in [1,2,3]:
  tries=0
  while len(bank[str(n)])<50:
   tries+=1
   floor={(x,y) for x in range(1,6) for y in range(1,6) if R.random()>.16}
   if len(floor)<15:continue
   reachable={next(iter(floor))};queue=list(reachable)
   for at in queue:
    for dx,dy in directions:
     p0=(at[0]+dx,at[1]+dy)
     if p0 in floor and p0 not in reachable:reachable.add(p0);queue.append(p0)
   if reachable!=floor:continue
   goals=set(R.sample(sorted(floor),n));bs=goals.copy();p=R.choice(sorted(floor-bs));pulls=0
   for _ in range(R.randint(25,65)):
    dx,dy=R.choice(directions);np=(p[0]+dx,p[1]+dy);behind=(p[0]-dx,p[1]-dy)
    if np not in floor or np in bs:continue
    if behind in bs and R.random()<.8:bs.remove(behind);bs.add(p);pulls+=1
    p=np
   if bs&goals or pulls<n:continue
   rows=[]
   for y in range(7):
    rows.append(''.join('#' if (x,y) not in floor else '+' if (x,y)==p and (x,y) in goals else '@' if (x,y)==p else '*' if (x,y) in bs and (x,y) in goals else '$' if (x,y) in bs else '.' if (x,y) in goals else ' ' for x in range(7)))
   # Keep complete playable wall/goal/box/player geometry in canonical D4 key.
   grids=[]
   for flip in [False,True]:
    a=rows[:]
    if flip:a=[r[::-1] for r in a]
    for _ in range(4):grids.append(''.join(a));a=[''.join(r) for r in zip(*a[::-1])]
   key=min(grids)
   if key in seen:continue
   solution=solve(floor,goals,p,bs)
   if not solution or len(solution)<3*n:continue
   seen.add(key);bank[str(n)].append(dict(id=str(n)+'-'+str(len(bank[str(n)])),name=str(n)+' 箱',tier=str(n),boxes=n,rows=rows,minimumMoves=len(solution),solution=solution))
  print('sokoban-progress',n,tries,flush=True)
 emit('sokoban',bank)
def tangram():
 from shapely.geometry import Polygon,Point
 from shapely.ops import unary_union
 base={'L1':[(0,0),(0,2),(2,0)],'L2':[(0,0),(0,2),(2,0)],'M':[(0,0),(2,0),(1,1)],'S1':[(0,0),(1,0),(0,1)],'S2':[(0,0),(1,0),(0,1)],'SQ':[(0,0),(1,0),(1,1),(0,1)],'P':[(0,0),(1,0),(2,1),(1,1)]}
 def geometry(id,k,flip=False):
  p=base[id][:]
  if flip:p=[(-x,y) for x,y in p]
  for _ in range(k):p=[(y,-x) for x,y in p]
  mx=min(x for x,y in p);my=min(y for x,y in p);return [(x-mx,y-my) for x,y in p]
 bank={'assemblies':[]};seen=set();tries=0
 while len(bank['assemblies'])<50:
  tries+=1;parts={'L1':[0,0,0,False]};polys=[Polygon(geometry('L1',0))];points=[geometry('L1',0)];union=polys[0]
  for id in R.sample(list(base)[1:],6):
   options=[]
   for k in range(4):
    for flipped in ([False,True] if id=='P' else [False]):
     poly=geometry(id,k,flipped)
     for x,y in set(itertools.chain.from_iterable(points)):
      for a,b in poly:
       tx,ty=x-a,y-b;pp=Polygon([(xx+tx,yy+ty) for xx,yy in poly]);bounds=union.union(pp).bounds
       if bounds[2]-bounds[0]>5 or bounds[3]-bounds[1]>5:continue
       if pp.intersection(union).area>1e-8 or pp.boundary.intersection(union.boundary).length<.49:continue
       options.append((tx,ty,k,flipped,pp,[(xx+tx,yy+ty) for xx,yy in poly]))
   if not options:break
   tx,ty,k,flipped,pp,ps=R.choice(options);parts[id]=[tx,ty,k,flipped];polys.append(pp);points.append(ps);union=unary_union(polys)
  if len(parts)!=7 or union.geom_type!='Polygon':continue
  mx,my,_,_=union.bounds
  for t in parts.values():t[0]-=mx;t[1]-=my
  outline=[(x-mx,y-my) for x,y in list(union.exterior.coords)[:-1]]
  # Remove collinear vertices before exact D4 silhouette identity.
  cleaned=[]
  for i,p in enumerate(outline):
   a=outline[i-1];b=outline[(i+1)%len(outline)]
   if abs((p[0]-a[0])*(b[1]-p[1])-(p[1]-a[1])*(b[0]-p[0]))>1e-8:cleaned.append(p)
  if union.interiors:continue
  key=canon(cleaned)
  if key in seen:continue
  seen.add(key);bank['assemblies'].append(dict(id='assembly-'+str(len(bank['assemblies'])),name='圖形 '+str(len(bank['assemblies'])+1),parts=parts,outline=cleaned,area=union.area))
 print('tangram-attempts',tries,flush=True);emit('tangram',bank)
if __name__=='__main__':
 names=['stroke','sliding','sokoban','tangram']
 for name in (sys.argv[1:] or names):R.seed(20261011+names.index(name)*1000);globals()[name]()
