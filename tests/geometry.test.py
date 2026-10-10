"""Generation-only verification of silhouette geometry and graph identity."""
import json,itertools,collections,sys
from pathlib import Path
from shapely.geometry import Polygon
from shapely.ops import unary_union
import networkx as nx
sys.path.insert(0,str(Path('tools').resolve()))
import importlib.util
spec=importlib.util.spec_from_file_location('gen','tools/generate-geometry.py');gen=importlib.util.module_from_spec(spec);spec.loader.exec_module(gen)
def bank(game):
 text=Path('assets/data/'+game+'-bank.js').read_text();return json.loads(text[text.index('='+ '{',text.index('SistersBanks.'+game))+1:].rstrip(';\n'))
base={'L1':[(0,0),(0,2),(2,0)],'L2':[(0,0),(0,2),(2,0)],'M':[(0,0),(2,0),(1,1)],'S1':[(0,0),(1,0),(0,1)],'S2':[(0,0),(1,0),(0,1)],'SQ':[(0,0),(1,0),(1,1),(0,1)],'P':[(0,0),(1,0),(2,1),(1,1)]}
seen=set()
for q in bank('tangram')['assemblies']:
 polygons=[]
 for id,(tx,ty,turn,flip) in q['parts'].items():
  points=base[id]
  if flip:points=[(-x,y) for x,y in points]
  for _ in range(turn):points=[(y,-x) for x,y in points]
  mx=min(x for x,y in points);my=min(y for x,y in points)
  polygons.append(Polygon([(x-mx+tx,y-my+ty) for x,y in points]))
 assert len(polygons)==7
 for a,b in itertools.combinations(polygons,2):assert a.intersection(b).area<1e-9
 union=unary_union(polygons);assert union.geom_type=='Polygon';assert not union.interiors;assert abs(union.area-8)<1e-9
 assert Polygon(q['outline']).symmetric_difference(union).area<1e-9
 assert max(union.bounds[2:])<=5
 key=gen.canon(q['outline']);assert key not in seen;seen.add(key)
print('PASS 50 connected, nonoverlapping, distinct tangram silhouettes, area 8')
graphs={};count=0
for tier,items in bank('stroke').items():
 for q in items:
  graph=nx.Graph();graph.add_edges_from(q['edges']);assert nx.is_connected(graph);assert sum(d%2 for _,d in graph.degree()) in [0,2];assert max(dict(graph.degree()).values())>=3
  key=nx.weisfeiler_lehman_graph_hash(graph,iterations=7)
  assert not any(nx.is_isomorphic(graph,old) for old in graphs.get(key,[]));graphs.setdefault(key,[]).append(graph);count+=1
print('PASS',count,'stroke graphs distinct even under node relabelling')
# Independently solve every Sokoban board in moves, including player position.
count=0
for tier,items in bank('sokoban').items():
 for q in items:
  floor=set();goals=set();boxes=set();player=None
  for y,row in enumerate(q['rows']):
   for x,ch in enumerate(row):
    p=(x,y)
    if ch!='#':floor.add(p)
    if ch in '.*+':goals.add(p)
    if ch in '$*':boxes.add(p)
    if ch in '@+':player=p
  initial=(player,tuple(sorted(boxes)));queue=collections.deque([(initial,0)]);visited={initial};answer=None
  while queue:
   (p,bs),distance=queue.popleft()
   if set(bs)==goals:answer=distance;break
   for dx,dy in [(1,0),(-1,0),(0,1),(0,-1)]:
    np=(p[0]+dx,p[1]+dy)
    if np not in floor:continue
    new=set(bs)
    if np in new:
     target=(np[0]+dx,np[1]+dy)
     if target not in floor or target in new:continue
     new.remove(np);new.add(target)
    state=(np,tuple(sorted(new)))
    if state not in visited:visited.add(state);queue.append((state,distance+1))
  assert answer==q['minimumMoves'],(q['id'],answer,q['minimumMoves']);count+=1
print('PASS',count,'Sokoban exact shortest solutions')
