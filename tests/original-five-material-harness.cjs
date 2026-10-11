'use strict';
// Synthetic document only: all artwork, immutable frames and rendering come
// from the canonical production catalog/helper, never ignored evidence files.
module.exports=async function openMaterialHarness(page){
  const base=process.env.TEST_URL||'http://127.0.0.1:8005';
  const url=base+'/games/spot/__original-five-material-test.html';
  await page.route(url,route=>route.fulfill({contentType:'text/html',body:`<!doctype html><html lang="zh-Hant"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>正式原插畫材質測試</title><style>body{margin:0;padding:12px;background:#f7f3ec;color:#59483c;font:16px system-ui}#pair{display:grid;grid-template-columns:1fr 1fr;gap:16px}canvas{display:block;width:100%;height:auto;border-radius:12px}h2{font-size:16px}@media(max-width:650px){#pair{grid-template-columns:1fr}}</style><h1>正式圖庫 A / B 材質檢查</h1><div id="pair"></div><ol id="labels"></ol><script src="../../assets/data/natural-illustrations-v2.js"></script><script src="../../assets/js/illustration-patches.js"></script><script>
window.ready=Promise.resolve().then(()=>{if(!Array.isArray(window.SistersNaturalIllustrations))throw Error('Canonical natural illustration catalog missing');window.frames=SistersNaturalIllustrations;window.show=async id=>{const f=frames.find(f=>f.id===id||new URL(f.src,location.href).pathname.endsWith('/'+id+'.webp'));if(!f)throw Error('Canonical natural illustration not integrated: '+id);window.current=f;const h=SistersIllustrationPatches,ids=f.details.map(d=>d.id);window.original=await h.canvas(f,ids,false);window.changed=await h.canvas(f,ids,true);pair.replaceChildren();for(const [label,c] of [['A 原插畫',original],['B 原物件換色',changed]]){const box=document.createElement('div'),t=document.createElement('h2');t.textContent=label;box.append(t,c);pair.append(box);c.onclick=e=>{const r=c.getBoundingClientRect();window.lastHit=h.hitPoint(current,current.details.map(d=>d.id),original,(e.clientX-r.left)*current.width/r.width,(e.clientY-r.top)*current.height/r.height);}}labels.replaceChildren(...current.details.map(d=>{const e=document.createElement('li');e.textContent=d.label;return e}));return true;};return true;});
</script></html>`}));
  await page.goto(url);
  await page.evaluate(()=>ready);
};
