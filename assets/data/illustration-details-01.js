/* Hand-placed surface details for scenes 01–15. Coordinates are native 512px artwork pixels.
   The first five anchors are the clearer set; the final two are smaller, still visible details.
   Original artwork is immutable. Both variants share all pixels outside these disjoint bounds. */
(() => {
'use strict';
const make=SistersIllustrationDetails.makeDetails;
function d(kind,id,label,anchor,x,y,scale=1,colors,under='') {
 const extent=kind==='weave'?21:kind==='glass'?17:16;
 return make([{kind,id,label,anchor,at:[x,y],scale,colors,under,bounds:[Math.floor(x-extent*scale),Math.floor(y-16*scale),Math.ceil(extent*scale*2),Math.ceil(32*scale)]}])[0];
}
function flower(id,label,anchor,x,y,color,scale=1){
 const petals=count=>Array.from({length:count},(_,i)=>`<ellipse cx="0" cy="-8" rx="3.6" ry="6" transform="rotate(${i*360/count})" fill="${color}" stroke="#c19a61" stroke-width=".65"/>`).join('')+'<circle r="4" fill="#edbc4f" stroke="#b7874a" stroke-width=".8"/>';
 return {id,label,anchor,bounds:[Math.floor(x-17*scale),Math.floor(y-17*scale),Math.ceil(34*scale),Math.ceil(34*scale)],a:`<g transform="translate(${x} ${y}) scale(${scale})">${petals(6)}</g>`,b:`<g transform="translate(${x} ${y}) scale(${scale})">${petals(4)}</g>`};
}
const blue={fill:'#688eaf',edge:'#3d6486',accent:'#eac36b'},cream={fill:'#fff1cb',edge:'#be965d',accent:'#d99c68'},rose={fill:'#d97985',edge:'#a45b69',accent:'#f0cc87'},green={fill:'#82a560',edge:'#567c45',accent:'#f0d063'},gold={fill:'#e6bc67',edge:'#a3783f',accent:'#fff1cc'};
const details={
'scene-01':[
 d('seal','cup-print','杯上的心形與花朵','陶瓷杯正面',118,277,1,rose,'<ellipse cx="118" cy="275" rx="11.6" ry="12.8" fill="url(#cream)"/>'),
 d('cover','book-print','書封上的星星與月亮','狐狸手持藍色書本封面',273,226,1,gold,'<path d="M259 211L283 211 286 240 260 240Z" fill="url(#ink)"/>'),
 {...d('stitch','cushion-stitch','靠墊刺繡的形狀','狐狸身後粉紅靠墊',304,234,1,cream),bounds:[291,217,30,39]},
 d('weave','rug-weave','地毯的葉形與花形織紋','座墊前方金色地毯',240,306,1,gold),
 d('leaf','pot-flower','花盆上的一片與兩片葉子','右側書架小花盆表面',379,151,1,green),
 d('spine','book-spine','書脊的圓環與橫紋','最左側藍色書脊',21.5,123,.95,gold),
 d('glass','lamp-glass','燈罩的一顆與兩顆星紋','上方左側吊燈玻璃',115,42,.95,cream)
],
'scene-02':[
 d('seal','bowl-print','麵粉碗上的心形與花朵','左下藍白麵粉碗的陶瓷正面',44,317,1.1,blue,'<ellipse cx="44" cy="316" rx="16" ry="14" fill="#f5e9d3"/>'),
 d('stitch','apron-stitch','圍裙刺繡的形狀','大兔兔胸前粉紅圍裙',304,216,1.05,cream),
 d('seal','jug-print','牛奶壺上的心形與花朵','右側陶瓷牛奶壺正面',493,289,1,blue,'<ellipse cx="493" cy="289" rx="14" ry="14" fill="#f3e5cf"/>'),
 d('weave','basket-weave','麵包籃的葉形與花形編紋','左側麵包籃外側',56,235,1,gold),
 d('stitch','shirt-stitch','黃衣上的刺繡形狀','右邊小兔胸前黃色衣服',411,263,.95,rose),
 d('glass','light-glass','吊燈的一顆與兩顆星紋','右上吊燈玻璃',430,36,.8,cream),
 d('seal','jar-seal','瓶標的心形與花朵','左中層藍色玻璃罐標籤',170,149,.75,blue)
],
'scene-03':[
 d('cover','sail-print','帆上的星星與月亮','船帆中央的米色帆布',350,150,1.3,gold),
 d('weave','hull-carving','船身的葉形與花形雕紋','右側船身木板',345,260,1.05,gold),
 d('cover','flag-print','船旗上的星星與月亮','桅杆頂端紅色旗面',337,34,.8,cream),
 d('stitch','shirt-stitch','水手服的刺繡形狀','小熊胸前藍白水手服',222,225,.85,blue),
 flower('lotus-petals','右邊蓮花的花心的花蕊數量','右下方粉紅蓮花',470,310,'#f4b0c3',1.1),
 d('leaf','willow-leaves','柳枝上的一片與兩片葉子','左上垂下的柳枝末端',139,155,1.1,green),
 d('spine','hull-lines','船板上的圓環與橫紋','船身左側的木板雕刻',195,271,.8,gold)
],
'scene-04':[
 d('seal','can-print','澆水壺上的心形與花朵','右側藍色澆水壺正面',456,280,1.15,cream,'<ellipse cx="456" cy="280" rx="18" ry="17" fill="#8fc6db"/>'),
 d('stitch','overalls-stitch','工作服刺繡的形狀','小貓左胸藍色工作服',194,240,1,cream),
 d('weave','planter-weave','木箱的葉形與花形雕紋','前方長方形育苗木箱正面',141,308,1.1,gold),
 d('cover','pot-mark','花盆上的星星與月亮印紋','右下陶製花盆正面',364,313,1.05,cream),
 flower('daisy-petals','左側白花的花心的花蕊數量','左下大朵白色雛菊',24,288,'#fff4d1',1.05),
 d('glass','glass-pot','吊盆上的一顆與兩顆星紋','溫室右上小吊盆的陶瓷表面',386,46,.75,cream),
 d('leaf','bench-leaves','盆栽的一片與兩片葉子','小貓右後方矮桌盆栽的新葉',351,152,1,green)
],
'scene-05':[
 d('stitch','red-scarf','紅圍巾刺繡的形狀','大企鵝頸上紅色圍巾',128,152,1.05,cream),
 d('stitch','blue-scarf','藍圍巾刺繡的形狀','小企鵝胸前藍色圍巾',170,250,1,cream),
 d('weave','hat-knit','毛帽的葉形與花形編紋','後方企鵝黃色毛帽的翻邊',275,111,.9,{fill:'#bd8648',edge:'#9d713c',accent:'#fff0bd'}),
 d('cover','flag-print','旗面的星星與月亮','右側紅色旗面',391,140,.95,cream,'<ellipse cx="391" cy="140" rx="13" ry="13" fill="#e47872"/>'),
 d('glass','lantern-glass','燈籠的一顆與兩顆星紋','右下金色燈籠的玻璃',425,245,1,cream),
 d('glass','ice-upper','冰磚的一顆與兩顆結晶紋','冰堡上方正面冰磚',313,184,.85,{fill:'#e7f5ff',edge:'#77a7d9',accent:'#c9e6ff'}),
 d('glass','ice-side','冰磚側面的一顆與兩顆結晶紋','冰堡右下冰磚側面',374,234,.85,{fill:'#e7f5ff',edge:'#77a7d9',accent:'#c9e6ff'})
],
'scene-06':[
 d('seal','satchel-print','郵差包上的心形與花朵','小狗藍色郵差包正面',191,241,1.1,cream),
 d('cover','letter-stamp','郵票上的星星與月亮','小狗叼著的信封右側郵票位置',293,213,.7,rose),
 d('seal','mailbox-letter','郵筒信封圖案的心形與花朵','右側紅郵筒前方信封圖案中央',446,217,.85,rose),
 d('seal','sign-letter','信件招牌的心形與花朵','上方郵局招牌信封圖案中央',375,98,.9,rose),
 d('weave','door-carving','木門的葉形與花形雕紋','郵局木門下半部',359,199,.9,gold),
 d('leaf','door-plant','門邊植物的一片與兩片葉子','門前左側花叢枝梢',324,216,.85,green),
 d('spine','window-mullion','小窗的圓形與直線裝飾','門邊小窗的藍色玻璃中央',334,147,.7,cream)
],
'scene-07':[
 d('stitch','beret-stitch','貝雷帽的刺繡形狀','刺蝟頭頂紅色貝雷帽',305,111,1.05,cream),
 d('seal','palette-paint','調色盤的心形與花形顏料','木製調色盤左側空白表面',238,213,.9,rose),
 d('weave','pink-cushion','靠墊的葉形與花形織紋','睡貓右側粉紅圓形座墊',157,318,.9,rose),
 d('stitch','tablecloth-stitch','桌巾的刺繡形狀','右側桌面垂下的粉紅桌巾',442,241,1.05,rose),
 d('cover','chest-print','木箱的星星與月亮裝飾','左側深綠畫具箱正面',83,203,1,gold),
 d('seal','jar-print','顏料罐標籤的心形與花朵','左側櫃子上的藍色小罐正面',75,160,.75,cream),
 d('spine','book-spine','書脊的圓環與橫紋','右下書堆最底層紅色書脊',420,318,.85,gold)
],
'scene-08':[
 d('cover','telescope-print','望遠鏡的星星與月亮刻紋','上方黃銅望遠鏡筒身',275,93,1.1,gold),
 d('glass','lantern-glass','燈籠的一顆與兩顆星紋','右下桌上燈籠的玻璃',397,240,1,cream),
 d('cover','book-print','星圖書的星星與月亮','右下最上層紅色書脊的裝飾',470,241,.8,gold),
 d('weave','rug-weave','地毯的葉形與花形織紋','右下藍色圓形地毯表面',351,310,1,gold),
 d('cover','front-book','直立書的星星與月亮','左側深藍色書本封面',50,223,1,gold),
 d('spine','telescope-leg','望遠鏡腳架的圓環與橫紋','中間木製腳架下半部',252,268,.7,gold),
 d('leaf','table-plant','小盆栽的一片與兩片葉子','左下小桌的攀葉植物',36,303,.85,green)
],
'scene-09':[
 d('seal','pot-print','果醬鍋上的心形與花朵','中央深藍大鍋正面',292,254,1.2,cream),
 d('stitch','apron-stitch','圍裙刺繡的形狀','松鼠胸前米白色圍裙',204,239,1,rose),
 d('weave','basket-weave','蘋果籃的葉形與花形編紋','左下水果籃正面',127,312,1.05,gold),
 d('stitch','jar-cloth','果醬瓶蓋布的刺繡形狀','前方果醬瓶蓋紅白格布',393,235,.85,rose),
 d('seal','berry-bowl','藍莓碗上的心形與花朵','右下條紋陶瓷碗正面',358,300,.9,blue),
 d('leaf','tree-leaves','蘋果樹的一片與兩片葉子','上方右側蘋果旁的小枝葉',364,30,.85,green),
 d('cover','jar-label','小果醬瓶的星星與月亮標記','後方小果醬瓶紅色玻璃正面',454,231,.8,cream)
],
'scene-10':[
 d('stitch','coat-stitch','雨衣的刺繡形狀','小馬黃色雨衣下擺',191,263,1.05,cream),
 d('seal','bag-print','背包上的心形與花朵','小馬左側藍色背包正面',118,241,1.05,cream,'<ellipse cx="118" cy="241" rx="15" ry="15" fill="#527da9"/>'),
 d('cover','umbrella-print','傘面的星星與月亮印花','左上紅色雨傘的中央傘面',176,75,1.1,cream),
 d('weave','bench-carving','長椅的葉形與花形雕紋','左側車站木長椅靠背',28,206,.95,gold),
 d('glass','near-lamp','近處吊燈的一顆與兩顆星紋','左上大型站燈的玻璃',85,65,1,cream),
 d('glass','far-lamp','遠處吊燈的一顆與兩顆星紋','右上站燈的玻璃',362,53,.8,cream),
 d('spine','tram-panel','電車飾板的圓環與橫紋','電車前方窗戶左侧黃銅飾板',397,164,.85,gold)
],
'scene-11':[
 d('stitch','apron-stitch','工作服口袋的刺繡形狀','浣熊胸前藍色工作服口袋',241,246,1.05,cream),
 d('glass','desk-lamp','檯燈罩的一顆與兩顆星紋','右上綠色檯燈金屬罩面',436,127,1,gold),
 d('glass','parts-jar','零件罐的一顆與兩顆星紋','右下玻璃零件罐前側',460,283,1,{fill:'#fcebb4',edge:'#9d7859',accent:'#efc77c'}),
 d('weave','clock-base','座鐘的葉形與花形雕紋','中間大座鐘底部木框',351,263,1,gold),
 d('cover','clock-side','座鐘側面的星星與月亮刻紋','大座鐘右側木質外殼',397,213,.95,gold),
 d('seal','paint-tin','小鐵罐上的心形與花朵','左上櫃子第二層藍色鐵罐',58,106,.7,cream),
 {id:'clock-rim',label:'小座鐘底框的兩條與三條飾紋',anchor:'上方中間小座鐘的木製底框',bounds:[169,63,32,14],a:'<path d="M175 65V75M195 65V75" stroke="#e6bc67" stroke-width="2"/><circle cx="185" cy="70" r="3" fill="none" stroke="#e6bc67" stroke-width="1"/>',b:'<path d="M175 65V75M185 65V75M195 65V75" stroke="#e6bc67" stroke-width="2"/>'}
],
'scene-12':[
 d('weave','flower-basket','花籃的葉形與花形編紋','左下竹編花籃正面',131,308,1.1,gold),
 flower('crown-flower','花冠白花的花心的花蕊數量','小鹿花冠左側白花',255,124,'#fff4d5',1),
 flower('front-daisy','前方白花的花心的花蕊數量','小鹿右前方白色雛菊',315,269,'#fff5da',1.05),
 flower('left-flower','左側黃花的花心的花蕊數量','小鹿左邊黃色野花',52,204,'#ffd967',1),
 d('leaf','right-leaves','岩石後紫花枝的一片與兩片葉子','右下岩石後方的紫色野花枝',431,290,1.1,{fill:'#82a560',edge:'#567c45',accent:'#d998b1'}),
 d('leaf','basket-leaves','花籃綠葉的一片與兩片葉子','左下花籃左側外伸的綠葉',98,257,.85,green),
 flower('fence-flower','柵欄前白花的花心的花蕊數量','右下柵欄前白色小野花',386,313,'#fff5da',.85)
],
'scene-13':[
 d('stitch','star-pillow','星星抱枕上的刺繡形狀','熊貓身後黃色星形抱枕',345,146,1.1,rose),
 d('seal','blue-pot','盆栽上的心形與花朵','左上藍色陶瓷花盆正面',48,36,.9,cream),
 d('seal','yellow-car','火車車廂上的心形與花朵','中央玩具火車黃色車廂側面',289,200,.75,rose),
 d('weave','green-cushion','座墊的葉形與花形織紋','右後方粉紅座墊的布面',437,156,1.05,cream),
 d('stitch','rug-stitch','地毯的刺繡形狀','左下藍白格子地毯',91,316,1.05,blue),
 d('cover','toy-house','玩具屋的星星與月亮印花','前方玩具車站門旁的木牆',319,281,.65,rose),
 d('spine','shelf-box','收納盒的圓環與橫紋','左側書架上的小方形盒子',126,141,.85,gold)
],
'scene-14':[
 d('stitch','pink-apron','兔兔圍裙的刺繡形狀','大兔左肩粉紅布圍裙',151,198,1.1,cream),
 d('seal','green-square','格布片上的心形與花朵','拼布被前方黃色格紋布片',272,314,1.1,rose),
 d('weave','pink-square','粉紅布片的葉形與花形織紋','拼布被右前方粉紅布片',349,294,1.05,rose),
 d('stitch','white-square','白布片上的刺繡形狀','大兔手前白色拼布片',245,233,1.05,rose),
 d('cover','machine-print','縫紉機的星星與月亮飾紋','左側縫紉機黑色底座表面',78,175,.85,gold),
 d('seal','bow-print','蝴蝶結上的心形與花朵','小兔耳邊粉紅蝴蝶結',416,166,.7,cream),
 d('spine','thread-label','線軸標籤的圓環與橫紋','左下綠色線軸的紙標',140,285,.85,cream)
],
'scene-15':[
 d('stitch','mother-hat','大帽子上的刺繡形狀','大鴨米色草帽的帽簷',314,91,1,blue),
 d('weave','scarf-weave','領巾的葉形與花形織紋','大鴨胸前藍色領巾',285,170,.85,cream),
 d('stitch','white-apron','圍裙上的刺繡形狀','大鴨胸前白色圍裙',307,219,1.05,blue),
 d('cover','berry-sign','草莓牌上的星星與月亮標記','左下草莓木牌的下半部',233,327,.8,cream),
 d('cover','blueberry-sign','藍莓牌上的星星與月亮標記','右側藍莓木牌的空白側面',493,171,.8,cream),
 d('stitch','child-hat','小帽子上的刺繡形狀','左邊小鴨米色草帽帽簷',170,193,.75,blue),
 d('seal','pink-bow','蝴蝶結上的心形與花朵','右邊小鴨粉紅蝴蝶結',367,206,.65,cream)
]
};
window.IllustrationDetails ||= {};
Object.assign(window.IllustrationDetails,details);
})();
