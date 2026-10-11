/* Hand-placed surface details for the 15 inspected full illustrations, native 512px coordinates. */
(() => {
'use strict';
const make=window.SistersIllustrationDetails.makeDetails;
const c={warm:{fill:'#d9b77d',edge:'#926b48',accent:'#f1d69b'},pink:{fill:'#edb9ac',edge:'#b77c78',accent:'#f9e6ce'},blue:{fill:'#b9d5e0',edge:'#668ba6',accent:'#e5f3f4'},gold:{fill:'#e8c570',edge:'#b58c42',accent:'#fff0ba'},green:{fill:'#8cad75',edge:'#557b55',accent:'#cee0a4'}};
const p=(id,label,anchor,kind,x,y,bounds,colors='warm',scale=1,under)=>make([{id,label,anchor,kind,at:[x,y],scale,bounds,colors:c[colors],under}])[0];
const raw=(id,label,anchor,bounds,a,b,under)=>({id,label,anchor,bounds,a,b,under});
const lines=(x,y,color,count=2,kind='grain')=>`<g transform="translate(${x} ${y})" fill="none" stroke="${color}" stroke-width="2.4">${Array.from({length:count},(_,i)=>kind==='ribs'?`<path d="M${(i-(count-1)/2)*7} 10Q${(i-(count-1)/2)*4} -3 ${(i-(count-1)/2)*9} -12"/>`:`<path d="M-11 ${i*7-(count-1)*3.5}Q-3 ${i*7-(count-1)*3.5-3} 11 ${i*7-(count-1)*3.5}"/>`).join('')}</g>`;
const grain=(id,label,anchor,x,y,bounds,color='#9d724b',kind='grain')=>raw(id,label,anchor,bounds,lines(x,y,color,2,kind),lines(x,y,color,3,kind));
const circles=(x,y,n,fill,edge,r=3.2)=>`<g fill="${fill}" stroke="${edge}" stroke-width="1.1">${Array.from({length:n},(_,i)=>`<circle cx="${x+(i-(n-1)/2)*10}" cy="${y+(i%2)*3}" r="${r}"/>`).join('')}</g>`;
const dots=(id,label,anchor,x,y,bounds,fill='#f4d5a4',edge='#ad8262',r=3.2)=>raw(id,label,anchor,bounds,circles(x,y,2,fill,edge,r),circles(x,y,3,fill,edge,r));
const sun=(x,y)=>`<g transform="translate(${x} ${y})" fill="#e8b860" stroke="#bc8750" stroke-width="1.6"><circle r="6"/>${Array.from({length:8},(_,i)=>`<path d="M${Math.cos(i*Math.PI/4)*9} ${Math.sin(i*Math.PI/4)*9}L${Math.cos(i*Math.PI/4)*13} ${Math.sin(i*Math.PI/4)*13}"/>`).join('')}</g>`;
const cloud=(x,y)=>`<path d="M${x-12} ${y+5}C${x-19} ${y-2} ${x-11} ${y-9} ${x-5} ${y-5}C${x-3} ${y-16} ${x+13} ${y-13} ${x+12} ${y-4}C${x+22} ${y-1} ${x+15} ${y+8} ${x+7} ${y+6}H${x-12}Z" fill="#dce8e8" stroke="#7d929e" stroke-width="1.5"/>`;
const ice=(x,y,n)=>`<path d="M${x-7} ${y+3}L${x+7} ${y+3} ${x} ${y+17}Z" fill="#d9a75d" stroke="#946e47" stroke-width="1"/><g fill="#f2b4c5" stroke="#a36e88" stroke-width="1">${Array.from({length:n},(_,i)=>`<circle cx="${x}" cy="${y-i*9}" r="8"/>`).join('')}</g>`;
window.IllustrationDetails||={};
Object.assign(window.IllustrationDetails,{
'scene-31':[
 grain('shell-rays','珍珠貝的兩條與三條放射紋','珍珠後方大貝殼的內面',355,206,[332,186,46,37],'#e6b696','ribs'),
 dots('star-spots','左下海星的斑點數','左下粉紅海星表面',45,274,[24,258,42,32],'#f4c0ad','#b87585',3.6),
 grain('small-shell','右下貝殼的放射紋數','右下扇形貝殼表面',451,301,[431,284,40,32],'#d8a396','ribs'),
 p('kelp-leaf','海草的一片與兩片葉子','左側岩石上的綠色海草','leaf',30,229,[9,208,42,42],'green',1.5),
 p('coral-leaf','珊瑚分枝的葉狀數','右側粉色珊瑚分枝','leaf',473,194,[453,174,42,42],'pink',1.5),
 dots('water-bubbles','海豚旁的氣泡數','海豚右側上升的水泡',315,128,[296,110,38,37],'#d2f7f8','#7dc6db',4.5),
 dots('upper-star','上方海星的斑點數','左上粉色海星表面',28,107,[10,92,36,31],'#fac7b8','#a77391',3.5)
],
'scene-32':[
 p('cloak-emblem','披風繡出的星星與月亮','貓頭鷹紫色披風下襬','cover',126,239,[108,221,37,37],'gold',1.2),
 grain('held-crystal','手中寶石的刻線數','貓頭鷹手中藍寶石表面',222,201,[205,183,34,36],'#c9f0fa','ribs'),
 grain('display-box','展示盒的木紋數','右側寶石展示盒前面',402,275,[380,262,44,26],'#ac774b'),
 p('main-lamp','燈罩上一顆與兩顆星','左上金色燈罩玻璃','glass',115,77,[99,59,33,37],'gold',1.1),
 p('cloth-embroidery','桌布織出的葉子與花','前方紫色桌布','weave',216,312,[195,297,43,33],'gold',1.15),
 grain('purple-crystal','吊掛寶石的刻線數','右上紫色吊墜內部',390,86,[375,69,30,35],'#edc9ff','ribs'),
 p('plant-pot','花盆上的心形與花形','左側桌上小花盆正面','seal',54,191,[40,174,29,34],'gold',.95)
],
'scene-33':[
 p('mug-print','杯子上的心形與花形','山羊手中的白色陶瓷杯','seal',229,231,[212,213,35,36],'blue',1.1,'<ellipse cx="229" cy="231" rx="12" ry="14" fill="#f1f3e8"/>'),
 p('sweater-stitch','毛衣上的心形與星形刺繡','山羊紅色毛衣胸前','stitch',172,225,[152,210,40,31],'pink',1.15),
 p('backpack-print','背包口袋的星星與月亮','左側藍色背包前袋','cover',44,223,[25,205,38,36],'gold',1.15),
 grain('bench-grain','長椅的木紋數','山羊坐著的長椅前面',172,303,[150,292,44,24],'#a47148'),
 grain('ski-emblem','滑雪板上的兩條與三條飾紋','左側長滑雪板表面',77,158,[63,138,29,40],'#d2e8e8'),
 p('porch-lamp','吊燈的一顆與兩顆星','木屋左上吊燈玻璃','glass',44,48,[28,28,34,41],'gold',1.1),
 p('second-ski','另一塊雪板的心形與花形','右側較窄的滑雪板下段','seal',108,287,[95,270,28,33],'blue',.95)
],
'scene-34':[
 p('blue-gift','藍色禮物盒上的心形與花形','雪橇上藍色包裝盒','seal',158,176,[139,158,38,36],'blue',1.15),
 grain('green-gift','綠色禮物的兩條與三條包裝紋','左上綠色禮物盒',118,146,[99,132,38,29],'#d6e2a1'),
 grain('sled-wood','雪橇前板上的木紋數','狐狸雪橇的木製側板',105,250,[83,237,44,29],'#ad7546'),
 p('sled-lamp','雪橇燈罩一顆與兩顆星','狐狸前方金色提燈','glass',307,260,[290,240,36,39],'gold',1.2),
 p('scarf-stitch','圍巾的葉子與花朵織紋','狐狸紅色圍巾前面','weave',244,183,[225,170,40,27],'pink',1.05),
 raw('sign-tree','木牌上樹的枝層數','右上掛牌原有的杉樹圖樣',[408,108,37,39],'<path d="M425 113L415 125H420L412 135H421V143H430V135H437L430 125H435Z" fill="#efd0ac"/>','<path d="M425 115L414 131H421V143H430V131H436Z" fill="#efd0ac"/>','<rect x="410" y="110" width="33" height="35" rx="3" fill="#9c704f"/>'),
 raw('snowman-buttons','雪人的两顆與三顆鈕扣','狐狸後方雪人的白色身體',[317,177,26,38],'<g fill="#536579"><circle cx="329" cy="188" r="2.7"/><circle cx="329" cy="204" r="2.7"/></g>','<g fill="#536579"><circle cx="329" cy="186" r="2.7"/><circle cx="329" cy="196" r="2.7"/><circle cx="329" cy="206" r="2.7"/></g>','<ellipse cx="329" cy="197" rx="7" ry="17" fill="#e9f2f5"/>')
],
'scene-35':[
 grain('gold-planet','黃色星球的兩條與三條雲帶','上方黃色行星表面',248,48,[229,32,39,32],'#f7e1a1'),
 p('cloak-print','披風上的心形與花形繡紋','熊老師蓝色披風下段','seal',102,205,[83,187,38,37],'gold',1.15),
 grain('red-planet','大行星的雲帶數','右上棕紅色行星表面',365,53,[349,39,33,29],'#f1d4b4'),
 grain('bench-front','長椅前面木紋的數量','學生座椅的木製前板',249,316,[228,304,43,25],'#9c724c'),
 p('astronomy-book','桌上書本的星星與月亮','左側桌上的蓝色書本封面','cover',34,239,[17,224,34,32],'gold',1),
 grain('sphere-rings','右側天球儀的刻線數','右側天球儀中央的球面',479,158,[464,142,30,34],'#d6bc75','ribs'),
 p('cloak-sleeve','袖口一顆與兩顆星','熊老師舉起的蓝色袖口','glass',214,168,[198,150,33,37],'gold',1.05)
],
'scene-36':[
 p('bodice-stitch','舞衣心形與星形的刺繡','兔子粉色舞衣胸前','stitch',265,160,[247,143,36,34],'pink',1.1),
 p('dance-bag','舞蹈包上的心形與花形','左側粉色舞蹈包前袋','seal',65,269,[47,251,36,36],'pink',1.1),
 p('curtain-stitch','窗簾的葉子與花朵織紋','左側垂下的粉色窗簾','weave',26,120,[10,101,33,38],'pink',1.1),
 p('pink-towel','毛巾上的心形與星形刺繡','右側舞蹈桿上的粉色毛巾','stitch',473,247,[457,230,32,35],'pink',1.1),
 p('flower-vase','花瓶上的心形與花形','右側白花下的绿色花瓶','seal',477,192,[462,176,31,32],'green',1),
 p('shoe-stitch','舞鞋上的心形與星形刺繡','兔子脚上的粉色芭蕾舞鞋','stitch',240,297,[227,280,27,34],'pink',.9),
 grain('spare-shoe','備用舞鞋的兩條與三條縫線','右下備用粉色芭蕾舞鞋表面',437,319,[423,304,29,30],'#ba8b8f')
],
'scene-37':[
 grain('birdhouse-roof','鳥屋屋頂木紋數','熊正在制作的鳥屋屋頂',253,221,[231,208,44,28],'#bb8b53'),
 grain('toy-bird','木鳥身上的羽紋數','工作桌上的木製小鳥身體',264,286,[247,273,35,28],'#b18755','ribs'),
 p('overalls-print','工作服口袋的心形與花形','熊的蓝色工作服前袋','seal',137,236,[120,219,35,35],'gold',1.05),
 grain('tool-box','工具箱上的木紋數','左下木製工具箱前板',138,311,[117,298,42,28],'#a87b4d'),
 dots('wood-rabbit','木兔玩偶的鈕扣數','右下木製兔子玩偶腹部',354,323,[338,310,32,27],'#c59759','#986c3f',3),
 p('tree-lamp','提燈一顆與兩顆星','樹上吊掛的金色燈罩','glass',265,73,[250,56,31,36],'gold',1),
 raw('triangle-block','積木上的兩條與三條刻紋','桌面三角木積木',[299,309,24,24],'<path d="M306 316H314M303 323H317" stroke="#9e7547" stroke-width="2.5"/>','<path d="M306 313H313M304 320H316M302 327H319" stroke="#9e7547" stroke-width="2.5"/>')
],
'scene-38':[
 p('held-book','書封上星星與月亮的燙金圖案','鴨子手中的紅色書本封面','cover',291,209,[274,191,36,37],'gold',1.1),
 p('book-boat-cloth','船邊桌布的葉子與花形織紋','船側垂下的白色花布','weave',301,285,[280,270,43,33],'pink',1.15),
 p('upper-lamp','上方燈罩一顆與兩顆星','鴨子左側黑框吊燈玻璃','glass',101,118,[85,101,33,37],'gold',1.05),
 p('lower-lamp','下方燈罩一顆與兩顆星','船頭金色燈罩玻璃','glass',150,311,[134,293,33,38],'gold',1.1),
 p('daisy-pot','花盆上的心形與花形','船左側雛菊的陶製花盆','seal',102,251,[86,235,33,32],'warm',1),
 p('blue-book','藍色書封的星星與月亮','鴨子右側直立的蓝色書本','cover',370,183,[356,166,29,34],'gold',.95),
 p('awning-stitch','遮陽篷葉子與花形織紋','書船頂上白色帆布遮陽篷','weave',245,43,[224,26,43,35],'warm',1.15)
],
'scene-39':[
 p('watering-can','水壺上的心形與花形','右下蓝色澆水壺前面','seal',425,310,[408,292,35,36],'blue',1.1,'<ellipse cx="425" cy="311" rx="13" ry="14" fill="#8faec4"/>'),
 p('dress-stitch','裙子心形與星形的刺繡','兔子粉色裙子下段','stitch',218,247,[197,230,42,35],'pink',1.25),
 p('hat-stitch','草帽葉子與花朵的織紋','兔子頭頂草帽帽檐','weave',251,104,[233,88,37,32],'warm',1.05),
 grain('flower-cart','花車前板的木紋數','右側花車的木製前板',451,252,[431,239,40,27],'#b58755'),
 p('flower-pot','陶盆上的心形與花形','右側花車上的陶製花盆','seal',486,229,[472,213,29,32],'warm',1),
 dots('door-glass','小窗玻璃的兩顆與三顆亮點','右上木門的小玻璃窗',462,84,[447,69,30,31],'#ecdba3','#ad9366',3.5),
 grain('white-fence','矮籬木板的木紋數','左下白色木籬竪板',14,278,[2,262,25,33],'#c5b89a')
],
'scene-40':[
 raw('weather-notes','筆記本上的太陽與雲','柯基手中氣象筆記本的空白頁',[275,166,37,35],sun(292,181),cloud(292,180)),
 p('blue-backpack','背包口袋的心形與花形','柯基蓝色背包前袋','seal',167,223,[150,205,35,36],'gold',1.1),
 p('balloon-weave','氣球布面的葉子與花朵紋','左上熱氣球黄色布面','weave',78,75,[57,58,42,34],'warm',1.2),
 grain('weather-stand','觀測架上的木紋數','溫度計下方木製觀測架',368,221,[352,207,32,29],'#a4794b'),
 grain('weather-box','木箱兩條與三條木紋','右下木製箱子前面',430,247,[409,233,42,30],'#aa8257'),
 p('yellow-scarf','圍巾心形與星形的刺繡','柯基黄色圍巾結','stitch',181,178,[165,165,33,27],'warm',1),
 grain('red-flag','旗子的两條與三條布紋','氣象架頂上的紅旗',389,77,[373,66,34,22],'#f4b294')
],
'scene-41':[
 p('basket-weave','果籃葉子與花朵的編織紋','左側莓果籃前面','weave',120,224,[99,209,43,31],'warm',1.15),
 p('shirt-stitch','上衣的心形與星形刺繡','松鼠蓝色花布上衣胸前','stitch',245,178,[229,161,33,35],'pink',1.05),
 dots('rock-berries','石頭上兩顆與三顆藍莓','籃子前方石頭上原有的莓果群',136,274,[115,260,42,29],'#5976a0','#344d78',4.6),
 dots('held-berry-seeds','手中草莓的種子數','松鼠手中紅色草莓表面',258,216,[242,202,32,29],'#f4dc96','#bf9958',2.8),
 p('moss-leaf','苔蘚上葉子的數量','右上岩石原有的绿色苔蘚植物','leaf',447,83,[428,62,39,42],'green',1.5),
 grain('stream-rock','溪流石頭的兩條與三條天然刻紋','前方溪水中石頭表面',326,304,[306,290,40,29],'#7e8060'),
 p('canopy-leaf','樹枝上的葉子數','右上樹枝的绿色葉群','leaf',457,39,[441,22,34,36],'green',1.1)
],
'scene-42':[
 p('father-coat','爸爸外套的心形與星形刺繡','大鼠爸爸蓝色外套前面','stitch',348,236,[329,218,38,37],'blue',1.2),
 p('child-shirt','黄色上衣上的心形與花形','左側小鼠黄色上衣前面','seal',270,252,[254,235,33,34],'warm',1),
 p('girl-skirt','小鼠裙子葉子與花朵織紋','右側小鼠粉色裙子下段','weave',427,293,[407,277,41,34],'pink',1.15),
 p('table-book','桌上書封的星星與月亮','桌上的紅色書本封面','cover',207,298,[190,282,34,33],'gold',1),
 p('flower-vase','花瓶上的心形與花形','桌面雛菊的绿色小花瓶','seal',144,299,[130,283,29,32],'green',.95),
 p('seat-stitch','椅背心形與星形的刺繡','右上绿色火車座椅靠背','stitch',493,159,[478,141,30,37],'green',1.05),
 grain('luggage-lines','行李箱上的两條與三條裝飾線','上方行李架的棕色皮箱',431,28,[411,15,40,28],'#b58c53')
],
'scene-43':[
 p('beach-bucket','小桶上的心形與花形','左側紅色沙灘桶前面','seal',104,233,[85,215,38,37],'gold',1.2),
 grain('foreground-shell','大貝殼的两條與三條放射紋','左下紫色扇形貝殼表面',119,296,[99,278,40,36],'#ede0cc','ribs'),
 dots('sand-starfish','紅色海星上的斑點數','右下紅色海星表面',407,272,[386,254,42,36],'#f7d19a','#b87b54',3.8),
 p('hedgehog-shirt','上衣心形與星形的刺繡','刺蝟蓝色上衣胸前','stitch',205,199,[188,182,35,35],'pink',1.05),
 grain('castle-carving','沙堡前面的兩條與三條貝殼壓紋','沙堡右側平整的城牆',380,214,[365,200,30,29],'#d0aa6c','ribs'),
 grain('boat-sail','帆船的两條與三條布紋','右上白色帆船船帆',477,72,[463,58,28,29],'#c4c9ba'),
 grain('castle-flag','城堡旗子的两條與三條布紋','沙堡頂上的紅色小旗',342,33,[327,23,31,22],'#f7b997')
],
'scene-44':[
 p('fox-apron','圍裙上的心形與花形','狐狸白色圍裙胸前','seal',305,163,[287,146,36,35],'pink',1.1),
 p('ice-cart-cloth','冰淇淋車的葉子與花朵紋','冰淇淋車左側粉色裝飾布','weave',273,220,[253,204,41,33],'pink',1.15),
 p('customer-bag','背包上的心形與花形','小客人蓝色背包前面','seal',191,261,[173,244,36,35],'gold',1.1),
 raw('chalk-scoops','黑板上一球與兩球冰淇淋','攤位前黑板原有的冰淇淋畫',[84,229,32,49],ice(100,250,1),ice(100,250,2),'<path d="M85 231H115V277H85Z" fill="#625849"/>'),
 p('street-lamp','街燈一顆與兩顆星','左側黑框街燈玻璃','glass',44,49,[28,29,33,41],'gold',1.1),
 dots('ice-poster','招牌冰淇淋的糖粒數','右上冰淇淋招牌上粉色球面',420,67,[403,51,34,32],'#f8e1ab','#cba980',3.5),
 p('shop-window','玻璃上一顆與兩顆星','右上店面黄色小窗玻璃','glass',462,101,[447,84,31,36],'gold',1)
],
'scene-45':[
 p('pilot-seat','駕駛座心形與星形的刺繡','貓咪座椅黄色靠背','stitch',112,221,[96,204,33,35],'gold',1.05),
 p('uniform-patch','太空衣臂章的心形與花形','貓咪左臂白色太空衣表面','seal',201,257,[185,242,33,31],'blue',1),
 p('robot-emblem','機器人胸口星星與月亮','小機器人蓝色胸前面板','cover',323,291,[306,273,35,36],'gold',1.15,'<ellipse cx="323" cy="291" rx="13" ry="14" fill="#9ed5ed"/>'),
 p('left-panel','左下控制台的星星與月亮','左下蓝色控制台面板','cover',30,281,[12,262,37,38],'gold',1.2,'<ellipse cx="30" cy="281" rx="14" ry="15" fill="#435276"/>'),
 grain('right-controls','右邊兩條與三條儀表刻度','右侧蓝色控制台空白面板',487,257,[472,242,30,31],'#77b6d5'),
 p('rear-console','後方控制台心形與花形標記','機器人後方绿色控制台面板','seal',318,213,[302,195,33,36],'gold',1.05),
 grain('front-controls','前方兩條與三條儀表刻度','座椅旁前方蓝色控制板',218,319,[198,307,41,25],'#94c9e2')
]
});
})();
