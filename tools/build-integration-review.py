"""Bundle the morning corrections with current source and distinctly dated prior evidence."""
import datetime,hashlib,html,json,pathlib,subprocess,zipfile
root=pathlib.Path.cwd();out=root/'outputs/r3';archive=out/'sisters-game-R3-review.zip'
read=lambda name:json.loads((out/name).read_text())
checks={k:read(v)for k,v in {
 'modes':'modes-browser.json','parent':'parent-browser.json','parentEdges':'parent-edge-browser.json','renewal':'renew-transition-browser.json',
 'games':'games-browser.json','cutoff':'cutoff-browser.json','touch':'touch-browser.json','relaunch':'relaunch-browser.json','migration':'migration-browser.json','zoom':'zoom-browser.json',
 'reference':'reference-browser.json','legacySea':'legacy-sea-browser.json','sokoban':'sokoban-controls-browser.json','hanoi':'hanoi-classic-browser.json','stroke':'stroke-input-browser.json',
 'strokeGeometry':'stroke-input/geometry.json','sliding':'sliding-quality/browser.json','slidingData':'sliding-quality/data.json','art':'art-quality/results.json',
 'artLegacy':'art-quality/legacy-results.json','artParentTouch':'art-quality/parent-touch-results.json','artLoadFailure':'art-quality/load-failure-results.json','loading':'art-quality/loading-results.json','banks':'bank-counts.json'
}.items()}
assert len(checks['modes']['rows'])==79 and all(r['pass']and r['completed']and len(r['views'])==7 for r in checks['modes']['rows'])and not checks['modes']['errors']
for key,n in [('parent',9),('games',12)]:assert len(checks[key]['passed'])==n and not checks[key]['errors'],key
for key,n in [('parentEdges',13),('renewal',11),('cutoff',12),('migration',12),('zoom',24),('legacySea',3),('sokoban',7),('hanoi',16),('stroke',13),('sliding',7),('artLoadFailure',2)]:assert len(checks[key])==n and all(r['pass']for r in checks[key]),key
for key,n in [('touch',12),('reference',12)]:assert len(checks[key]['rows'])==n and all(r['pass']for r in checks[key]['rows']) and not checks[key]['errors'],key
for key,n in [('art',19),('artLegacy',10),('artParentTouch',4)]:assert sum(bool(r.get('pass'))for r in checks[key]['rows'])==n and not checks[key]['errors'],key
assert checks['slidingData']['pass']and checks['slidingData']['boards']==150 and checks['strokeGeometry']['graphs']==150
assert len(checks['loading'])==18
assert len(checks['relaunch'])==3 and all(r['pass']for r in checks['relaunch'])
for f in ['integration-banks.log','integration-geometry.log']:assert 'PASS' in(out/f).read_text()
files=subprocess.check_output(['git','ls-files','--cached','--others','--exclude-standard','-z']).decode().split('\0');files=sorted(p for p in files if p and(root/p).is_file());manifest={p:hashlib.sha256((root/p).read_bytes()).hexdigest()for p in files}
head=subprocess.check_output(['git','rev-parse','HEAD']).decode().strip()
with zipfile.ZipFile(archive)as z:prior=json.loads(z.read('review/prior-renewal-verification.json'if'review/prior-renewal-verification.json'in z.namelist()else'review/verification.json'))
assert prior['commit']=='33f27fc41dea5443ecc28db3a11d57bc3ca077e6'
changed=[p for p in files if(p=='index.html'or p.startswith(('assets/','games/')))and prior['sourceSha256'].get(p)!=manifest[p]]
assert len(changed)==16 and not any(p.startswith(('assets/js/family','assets/js/lifecycle'))for p in changed)
report={'generatedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'commit':head,'baseCommit':prior['commit'],'sourceSha256':manifest,'changedRuntime':changed,'checks':checks,
 'scope':'Classic Hanoi, board-swipe Sokoban, visible continuous one-stroke input, meaningful Sliding blockers, restored full illustrations and on-demand compressed art/Canvas slices.',
 'activeCounts':{'modes':79,'layoutChecks':553,'puzzleIllustrations':3,'spotIllustrationPairs':5,'classicHanoiDifficulties':5,'slidingBoards':150,'strokeGraphs':150},
 'limits':['Curated art has 3 puzzle illustrations and 5 spot pairs, below 50 illustrations per theme.','LocalStorage protection can be bypassed by clearing/editing local data, code, device/browser, or clock.','Real phones/Safari/real background behavior unverified; expiry uses fictional Date.now.','Own cloud direct Pages HTTP is proxy CONNECT403; successful deployment is not production interaction verification.','Local raw-byte/CPU metrics are not a home-network/CDN speed guarantee.'],
 'timeConditions':'Synthetic credentials and Date.now; real isolated Chromium mouse/touch/keyboard input, true profile relaunch, original401 records preserved.',
 'productionInteractiveVerified':False,'unchangedEvidence':'prior-renewal-verification.json'}
selected=['sokoban-controls/layout-1180x757.png','sokoban-controls/layout-390x844.png','sokoban-controls/touch-cutoff-saved.png','hanoi-classic/classic-7-completed.png','hanoi-classic/touch-7-resumed.png','hanoi-classic/legacy-all-right-before-choice.png','stroke-input/baseline-easy20.png','stroke-input/easy20-missing-link-visible.png','stroke-input/hard-touch-complete.png','sliding-quality/challenge-touch-before.png','sliding-quality/basic-mouse-completed.png','art-quality/puzzle-before-procedural.png','art-quality/puzzle-garden-36-complete.png','art-quality/puzzle-room-24-complete.png','art-quality/puzzle-sea-36-complete.png','art-quality/puzzle-mobile-390.png','art-quality/spot-before-procedural.png','art-quality/spot-0-play.png','art-quality/spot-2-complete.png','art-quality/touch-cutoff-saved.png']
assert all((out/p).is_file()for p in selected),[p for p in selected if not(out/p).is_file()]
body='''<!doctype html><html lang="zh-Hant"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>R3 遊玩與插畫修正驗收</title><style>body{font:16px/1.7 system-ui;max-width:1100px;margin:24px auto;padding:16px;color:#453443;background:#f7f3ed}img{max-width:100%;height:auto}pre{white-space:pre-wrap;overflow-wrap:anywhere;font-size:12px}details{padding:16px;background:white;margin:16px 0;border-radius:12px}code{overflow-wrap:anywhere}</style><h1>早晨回饋整合驗收</h1>'''+f'<p>版本 <code>{head}</code>；基線 <code>33f27fc</code>，16 個網站檔案修改，共用家長規則／保存格式未改。</p>'
body+='<p>推箱子移除方向按鈕；河內塔回到左柱→右柱；一筆畫連線可辨識且支援连续鼠標／觸控；滑塊三難度各50實際受阻題；拼圖與找不同恢复完整原插畫，按需 WebP 與 Canvas 碎片降低載入／編碼工作。</p><p>目前插畫實際3張拼圖／5組找不同，尚未達50張，沒有湊數。最新79模式逐一實際完成、553版面檢查；12款到期完成／截止保存／touch／舊局遷移及全部家長回歸通過。時間使用虛構時鐘；非實體手機或正式站互動測試。</p><p><a href="verification.json">完整測試與來源SHA256</a> · <a href="integration-release-evidence.json">發布證據</a> · <a href="prior-renewal-verification.json">33f27fc前次證據</a> · <a href="prior-renewal-index.html">前次驗收頁</a> · <a href="../source/R3_REVIEW.md">說明與重現指示</a></p><p>離線遊玩請在解壓後以 localhost HTTP 服務 source 目錄；不要直接以file://開遊戲。線上與不同port的本機保存各自獨立。review頁是可檢視證據，不是另一個正式網站。</p>'
for p in selected:body+='<details><summary>'+html.escape(p)+'</summary><img loading="lazy" src="screens/integration/'+p+'"></details>'
for key,value in checks.items():body+='<details><summary>'+html.escape(key)+'</summary><pre>'+html.escape(json.dumps(value,ensure_ascii=False,indent=2))+'</pre></details>'
body+='</html>';temp=out/'integration.tmp.zip'
with zipfile.ZipFile(archive)as old,zipfile.ZipFile(temp,'w',zipfile.ZIP_DEFLATED)as new:
 if'review/prior-renewal-index.html'not in old.namelist():new.writestr('review/prior-renewal-index.html',old.read('review/index.html'))
 for info in old.infolist():
  if info.filename.startswith(('source/','review/integration-results/','review/screens/integration/'))or info.filename in['review/index.html','review/verification.json','review/prior-renewal-verification.json','review/integration-release-evidence.json']:continue
  new.writestr(info,old.read(info.filename))
 new.writestr('review/index.html',body);new.writestr('review/verification.json',json.dumps(report,ensure_ascii=False,indent=2));new.writestr('review/prior-renewal-verification.json',json.dumps(prior,ensure_ascii=False,indent=2))
 for p in files:new.write(root/p,'source/'+p)
 for key,value in checks.items():new.writestr('review/integration-results/'+key+'.json',json.dumps(value,ensure_ascii=False,indent=2))
 for p in selected:new.write(out/p,'review/screens/integration/'+p)
 for p in out.glob('integration-*.log'):new.write(p,'review/integration-results/logs/'+p.name)
 if(out/'integration-release-evidence.json').exists():new.write(out/'integration-release-evidence.json','review/integration-release-evidence.json')
temp.replace(archive)
with zipfile.ZipFile(archive)as z:
 assert z.testzip()is None
 for p,h in manifest.items():assert hashlib.sha256(z.read('source/'+p)).hexdigest()==h
print(json.dumps({'commit':head,'sourceFiles':len(files),'runtimeChanged':len(changed),'bytes':archive.stat().st_size,'modesCompleted':79,'layoutChecks':553}))
