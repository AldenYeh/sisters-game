"""Package a validated R3 source and offline, synthetic-data review evidence."""
import datetime, hashlib, html, json, pathlib, subprocess, zipfile
root=pathlib.Path.cwd(); out=root/'outputs/r3'; target=out/'delivery'; target.mkdir(exist_ok=True)
read=lambda name:json.loads((out/name).read_text())
checks={'suite':read('final-suite.json'),'parent':read('parent-browser.json'),'edges':read('parent-edge-browser.json'),'games':read('games-browser.json'),'cutoff':read('cutoff-browser.json'),'migration':read('migration-browser.json'),'zoom':read('zoom-browser.json'),'touch':read('touch-browser.json'),'relaunch':read('relaunch-browser.json'),'modes':read('modes-browser.json')}
assert len(checks['suite'])==12 and all(x['pass'] for x in checks['suite'])
assert len(checks['parent']['passed'])==9 and not checks['parent']['errors']
assert len(checks['edges'])==13 and all(x['pass'] for x in checks['edges'])
assert len(checks['games']['passed'])==12 and not checks['games']['errors']
for k,n in [('cutoff',12),('migration',12),('zoom',24),('relaunch',3)]: assert len(checks[k])==n and all(x['pass'] for x in checks[k])
assert len(checks['touch']['rows'])==12 and all(x['pass'] for x in checks['touch']['rows']) and not checks['touch']['errors']
assert len(checks['modes']['rows'])==85 and all(x['pass'] and x['completed'] and len(x['views'])==7 for x in checks['modes']['rows']) and not checks['modes']['errors']
assert not read('original-draft-integrity.json')['mismatches']
files=subprocess.check_output(['git','ls-files','--cached','--others','--exclude-standard','-z']).decode().split('\0');files=[p for p in files if p and (root/p).is_file()]
manifest={p:hashlib.sha256((root/p).read_bytes()).hexdigest() for p in sorted(files)}
head=subprocess.check_output(['git','rev-parse','HEAD']).decode().strip();report={'generatedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'commit':head,'baseline':'ea6ca62c2767ae139762ee71808e9ff01304c45e','sourceSha256':manifest,'checks':checks,'productionInteractiveVerified':False,'productionBlocker':'Cloud proxy CONNECT 403 for GitHub Pages','realDeviceVerified':False,'screenshots':'Synthetic isolated Chromium test data only'}
(target/'verification.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
names={'maze':'迷宮','sudoku':'數獨','puzzle':'拼圖','memory':'記憶翻牌','hanoi':'河內塔','sliding':'滑塊','sokoban':'推箱子','stroke':'一筆畫','tangram':'七巧板','visual':'視覺記憶','pattern':'規律接龍','spot':'找不同'}
parts=['<!doctype html><html lang="zh-Hant"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>姐妹益智樂園 R3 驗收</title><style>body{font-family:system-ui,sans-serif;margin:24px auto;max-width:1100px;padding:0 16px;background:#f7f3ed;color:#453443;line-height:1.7}h1{line-height:1.3}img{width:100%;height:auto;border:1px solid #ddd;border-radius:12px}details{margin:24px 0;padding:16px;background:white;border-radius:14px}summary{font-size:22px;cursor:pointer}figure{margin:20px 0}figcaption{font-weight:bold}code{overflow-wrap:anywhere}.pass{padding:16px;background:#e4f4e8;border-radius:12px}a{color:#604261}</style><h1>姐妹益智樂園 R3 驗收證據</h1>',f'<p>版本 <code>{head}</code>，以 R2 為基線。全程在雲端隔離測試，原始 33 個草稿檔逐一 SHA256 比對一致。</p>','<p class="pass">85 種新模式實際通關、595 次視窗尺寸檢查；十二遊戲到期完成／強制截止保存／R2 遷移／觸控通關；24 次真實瀏覽器縮放；9 項家長流程、13 項邊界案例、3 項整個瀏覽器重啟檢查；既有三個基線測試、核心 14 個案例、完整題庫及幾何解題驗證通過。</p>','<p>長密碼、隨機鹽及 PBKDF2 驗證；到期僅原局可繼續，10 分鐘絕對寬限後保存鎖定；前景可操作超時計入下次授權，精確毫秒、一次結算。返回一次放棄，另有保存續玩。</p>','<p>每個新難度 50 題，以邏輯結構／構圖去重；85 模式含提示及主題共用庫，不能將 4,250 個模式題位稱為全新邏輯題。詳見 <a href="../source/R3_REVIEW.md">維護說明</a>、<a href="verification.json">完整驗證結果與來源指紋</a>。</p>','<p>這是本機靜態保護，清除／修改瀏覽器資料、改時鐘或換裝置可繞過。手機為 Chromium 觸控模擬；真實手機、Safari 和背景分頁待裝置驗收。雲端正式 Pages 互動受 CONNECT 403 限制，部署成功不能等同正式網站互動實測。</p>']
for game,title in names.items():
 parts.append(f'<details><summary>{title}：棋盤、完成提示與觸控</summary>')
 for label,path in [('PC 遊玩畫面',f'games/{game}-before.png'),('時間到後完成當局',f'games/{game}-completed-grace.png'),('390×844 coarse pointer 觸控完成',f'touch/{game}.png')]:parts.append(f'<figure><figcaption>{label}</figcaption><img loading="lazy" src="screens/{path}" alt="{html.escape(title+label)}"></figure>')
 parts.append('</details>')
parts.append('<details><summary>家長設定及倒數</summary>')
for path in ['parent-settings.png','parent-grace-memory.png','parent-renewed-memory.png']:parts.append(f'<img loading="lazy" src="screens/{path}" alt="家長控制虛構測試畫面">')
parts.append('</details></html>');(target/'index.html').write_text('\n'.join(parts))
archive=out/'sisters-game-R3-review.zip'
with zipfile.ZipFile(archive,'w',zipfile.ZIP_DEFLATED) as z:
 for p in files:z.write(root/p,'source/'+p)
 for p in target.iterdir():z.write(p,'review/'+p.name)
 for p in out.glob('*.json'):z.write(p,'review/results/'+p.name)
 for p in out.glob('*.log'):z.write(p,'review/results/'+p.name)
 for folder in ['games','modes','zoom','touch']:
  for p in (out/folder).glob('*.png'):
   if p.name!='failure.png':z.write(p,'review/screens/'+folder+'/'+p.name)
 for p in ['parent-settings.png','parent-grace-memory.png','parent-renewed-memory.png']:
  if(out/p).exists():z.write(out/p,'review/screens/'+p)
print(archive,archive.stat().st_size,'bytes',len(manifest),'source files')
