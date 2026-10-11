/* New natural surface details for the five approved original full illustrations.
   These are independent layers, not the old 2–3 answers relabeled as seven. */
(() => {
'use strict';window.IllustrationDetails ||= {};
const M=SistersIllustrationDetails.makeDetails;
const raw=(id,label,anchor,bounds,a,b)=>({id,label,anchor,bounds,a,b});
const dots=(points,color,r=3)=>points.map(([x,y])=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${color}"/>`).join('');
const curves=(paths,color,w=2)=>paths.map(d=>`<path d="${d}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round"/>`).join('');
Object.assign(window.IllustrationDetails,{
 garden:[
  raw('fish-scales','魚身上的鱗片數量','魚缸裡的橘色魚',[650,480,59,49],curves(['M659 490q9 7 0 14','M674 490q9 7 0 14','M689 490q9 7 0 14'],'#b95a38',2.7),curves(['M659 490q9 7 0 14','M689 490q9 7 0 14'],'#b95a38',2.7)),
  raw('cat-whisker','貓咪鬍鬚的數量','貓咪左側臉頰',[295,292,78,40],curves(['M365 313Q332 307 303 312','M365 322Q333 324 305 330'],'#fff4de',2.5),curves(['M365 313Q332 307 303 312'],'#fff4de',2.5)),
  raw('flower-stamen','大花朵的花蕊','右下大花的黃色花心',[862,470,39,38],dots([[873,481],[885,481],[879,492]],'#b99049',3.6),dots([[873,481],[885,481]],'#b99049',3.6)),
  raw('flower-veins','左邊花瓣的紋路','左邊高花的粉紅花瓣',[75,386,39,36],curves(['M80 409q13-13 25-12','M83 415q14-4 23-2'],'#bf7290',2),curves(['M80 409q13-13 25-12'],'#bf7290',2)),
  raw('sun-freckles','太陽臉頰上的雀斑','太陽的左邊粉紅臉頰',[107,127,30,29],dots([[115,138],[127,138],[121,148]],'#ecae75',2.6),dots([[115,138],[127,138]],'#ecae75',2.6)),
  raw('bowl-glints','魚缸的反光紋','魚缸右側玻璃',[748,465,38,69],curves(['M763 475q12 16 3 31','M770 509l-6 13'],'#fff8e9',2.8),curves(['M763 475q12 16 3 31'],'#fff8e9',2.8)),
  raw('bush-flower','小花上的花心點數','上方綠叢中的粉紅花',[692,235,31,31],dots([[702,246],[712,246],[707,255]],'#e4ad69',2.7),dots([[702,246],[712,246]],'#e4ad69',2.7))
 ],
 room:[
  ...M([
   {id:'book-cover',label:'書封的星星與月亮',anchor:'地上的藍色書封',kind:'cover',at:[283,553],scale:1.7,bounds:[258,527,51,48]},
   {id:'blue-cushion',label:'藍枕頭的刺繡形狀',anchor:'藍色枕頭表面',kind:'stitch',at:[201,263],scale:1.8,bounds:[174,237,51,51],colors:{fill:'#f4dbb3'}},
   {id:'drawer-mark',label:'抽屜雕花的葉子與花朵',anchor:'床頭櫃的木抽屜',kind:'weave',at:[53,390],scale:1.7,bounds:[20,363,64,57],colors:{fill:'#c79572',edge:'#ac7b5c',accent:'#e7ba90'}},
   {id:'yellow-cushion',label:'黃枕頭上的心形與花朵',anchor:'黃色枕頭表面',kind:'seal',at:[346,256],scale:1.9,bounds:[318,227,54,53],colors:{fill:'#efd49c',edge:'#cbaa77',accent:'#fff0c6'}},
   {id:'rug-pattern',label:'地毯上的織紋形狀',anchor:'貓咪旁的藍色地毯',kind:'weave',at:[842,543],scale:1.9,bounds:[805,512,72,59],colors:{fill:'#f0d9b6',edge:'#a58a88',accent:'#e6b1b5'}},
   {id:'lamp-pattern',label:'燈罩上的一顆與兩顆星星',anchor:'黃色檯燈罩',kind:'glass',at:[77,253],scale:1.5,bounds:[51,231,48,45],colors:{fill:'#fff0bb',edge:'#d4b169'}},
   {id:'curtain-stitch',label:'窗簾的刺繡形狀',anchor:'右邊粉紅窗簾',kind:'stitch',at:[883,282],scale:1.7,bounds:[857,256,51,52],colors:{fill:'#f8d5c5'}}
  ])
 ],
 sea:[
  raw('fish-scales','黃魚鱗片的數量','左邊黃色魚身',[305,298,69,54],curves(['M317 312q13 10 0 20','M337 312q13 10 0 20','M357 312q13 10 0 20'],'#d7b270',3),curves(['M317 312q13 10 0 20','M357 312q13 10 0 20'],'#d7b270',3)),
  raw('blue-fin','藍魚魚鰭的紋路','右邊藍魚的魚鰭',[573,318,53,52],curves(['M584 329l30 9','M584 340l30 9','M584 351l27 8'],'#7aabd0',2.8),curves(['M584 329l30 9','M584 351l27 8'],'#7aabd0',2.8)),
  raw('crab-shell','螃蟹殼上的斑點','粉紅螃蟹的背殼',[710,489,57,38],dots([[723,503],[741,501],[753,513]],'#d7869a',4.5),dots([[723,503],[741,501]],'#d7869a',4.5)),
  raw('orange-coral','橙色珊瑚的環紋','左側橙色管珊瑚',[115,531,37,59],curves(['M121 543h25','M121 557h25','M121 571h25'],'#b97951',2.8),curves(['M121 543h25','M121 571h25'],'#b97951',2.8)),
  raw('purple-coral','紫色珊瑚的環紋','右側紫色管珊瑚',[874,469,35,59],curves(['M881 481h20','M881 496h20','M881 511h20'],'#9c82b4',2.5),curves(['M881 481h20','M881 511h20'],'#9c82b4',2.5)),
  raw('kelp-vein','海草葉脈的數量','下方綠色海草',[534,568,44,45],curves(['M541 603l25-24','M548 597l-1-15','M555 588l16 1'],'#76b485',2.5),curves(['M541 603l25-24','M555 588l16 1'],'#76b485',2.5)),
  raw('bubble-glint','泡泡反光的一点與兩點','左上圓泡泡的反光',[116,84,31,30],dots([[127,92],[137,101]],'#eafcff',3),dots([[127,92]],'#eafcff',3))
 ],
 picnic:[
  ...M([
   {id:'cup-print',label:'杯子的心形與花朵',anchor:'野餐藍色杯子正面',kind:'seal',at:[598,486],scale:1.8,bounds:[570,460,55,55],colors:{fill:'#d5eff2',edge:'#88b9cb',accent:'#f8e9b8'}},
   {id:'blanket-weave',label:'野餐墊的葉子與花朵圖案',anchor:'野餐墊前方白色格子',kind:'weave',at:[435,580],scale:2,bounds:[395,548,78,61],colors:{fill:'#dda5ae',edge:'#be8b97',accent:'#f0c6b1'}},
   {id:'collar-mark',label:'項圈的星星與月亮圖案',anchor:'狗狗的藍色項圈',kind:'cover',at:[766,489],scale:.9,bounds:[751,472,29,30],colors:{fill:'#f6e1ad',edge:'#c9a867'}},
   {id:'kite-pattern',label:'風箏布面的刺繡圖案',anchor:'右上風箏的粉紅布面',kind:'stitch',at:[705,127],scale:2,bounds:[673,98,60,61],colors:{fill:'#f3d4ba'}}
  ]),
  raw('apple-leaf','蘋果葉脈的數量','野餐蘋果上方綠葉',[493,426,36,31],curves(['M499 450l20-17','M505 444l1-8','M511 438l10 3'],'#649751',3),curves(['M499 450l20-17','M511 438l10 3'],'#649751',3)),
  raw('sandwich-seeds','三明治吐司上的芝麻','三明治上方的吐司面',[307,442,59,38],dots([[319,453],[340,452],[354,464]],'#ceb381',3.3),dots([[319,453],[340,452]],'#ceb381',3.3)),
  raw('tree-veins','樹葉的紋路數量','左上大樹的綠葉',[125,106,54,42],curves(['M133 135l33-18','M143 130l-2-14','M151 125l15 7'],'#8bac59',2.5),curves(['M133 135l33-18','M151 125l15 7'],'#8bac59',2.5))
 ],
 kitchen:[
  ...M([
   {id:'cup-print',label:'杯子上的星星與月亮',anchor:'桌上藍色杯子正面',kind:'cover',at:[326,357],scale:1.8,bounds:[297,329,58,54],colors:{fill:'#e4edf0',edge:'#88acbe'}},
   {id:'bread-jam',label:'吐司上的心形與花朵果醬',anchor:'桌上吐司中央',kind:'seal',at:[486,375],scale:2,bounds:[454,346,61,60],colors:{fill:'#e6ba89',edge:'#cca275',accent:'#f5d6a4'}},
   {id:'pot-print',label:'花盆上的葉子與花朵',anchor:'窗臺的陶土花盆',kind:'weave',at:[175,235],scale:1.6,bounds:[144,208,60,51],colors:{fill:'#ccaf87',edge:'#ae8762',accent:'#efd2a0'}},
   {id:'table-carving',label:'桌面雕刻的刺繡形狀',anchor:'桌面前方的木紋區',kind:'stitch',at:[346,477],scale:1.9,bounds:[315,447,59,59],colors:{fill:'#cfac7d'}}
  ]),
  raw('apple-leaf','蘋果葉脈的數量','紅蘋果的綠色葉子',[173,300,50,37],curves(['M181 324l30-17','M188 320l-2-12','M200 314l13 7'],'#6c9457',2.5),curves(['M181 324l30-17','M200 314l13 7'],'#6c9457',2.5)),
  raw('bowl-rim','架上碗沿的飾紋數量','後方藍色碗的外壁',[597,112,65,40],curves(['M607 122h42','M607 133h42','M607 144h42'],'#a9d0da',2.7),curves(['M607 122h42','M607 144h42'],'#a9d0da',2.7)),
  raw('cat-whisker','貓咪鬍鬚的數量','右側貓咪的臉頰',[775,358,82,43],curves(['M782 372Q816 363 845 368','M782 386Q816 390 845 389'],'#f4e8d5',2.5),curves(['M782 372Q816 363 845 368'],'#f4e8d5',2.5))
 ]
});
// Larger separated touch targets around these carefully positioned surface details.
for(const id of ['garden','room','sea','picnic','kitchen'])for(const d of IllustrationDetails[id]){const[x,y,w,h]=d.bounds,cx=x+w/2,cy=y+h/2;d.bounds=[Math.max(0,cx-40),Math.max(0,cy-35),80,70];}
})();
