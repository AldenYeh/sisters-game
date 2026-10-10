"""Retain R3 baseline evidence while packaging the narrowly tested follow-up."""
import datetime, hashlib, html, json, pathlib, subprocess, zipfile
root=pathlib.Path.cwd();out=root/'outputs/r3';archive=out/'sisters-game-R3-review.zip'
with zipfile.ZipFile(archive) as old:base=json.loads(old.read('review/baseline-verification.json'if 'review/baseline-verification.json'in old.namelist()else'review/verification.json'))
assert base['commit']=='52f240ec36b09124fe82219dcdb7e544e3ed1246'
read=lambda name:json.loads((out/name).read_text())
checks={k:read(v)for k,v in {'progress':'cutoff-progress-browser.json','legacySea':'legacy-sea-browser.json','reference':'reference-browser.json','hanoiDrag':'hanoi-drag-browser.json','modes':'modes-browser-affected.json','games':'games-browser-affected.json','zoom':'zoom-browser-affected.json','touch':'touch-browser-affected.json','migration':'migration-browser.json'}.items()}
assert len(checks['progress'])==20 and all(x['pass'] and x['reload'] and x['browserRelaunch'] and x['renewExact']for x in checks['progress'])
assert len(checks['migration'])==12 and all(x['pass']for x in checks['migration'])
assert len(checks['legacySea'])==3 and all(x['pass']for x in checks['legacySea'])
assert len(checks['reference']['rows'])==12 and all(x['pass']for x in checks['reference']['rows']) and not checks['reference']['errors']
assert len(checks['hanoiDrag'])==6 and all(x['pass']for x in checks['hanoiDrag'])
assert len(checks['modes']['rows'])==19 and all(x['pass'] and x['completed'] and len(x['views'])==7 for x in checks['modes']['rows'])and not checks['modes']['errors']
assert set(checks['games']['passed'])=={'puzzle','hanoi','visual'} and not checks['games']['errors']
assert len(checks['zoom'])==4 and all(x['pass']for x in checks['zoom'])
assert len(checks['touch']['rows'])==2 and all(x['pass']for x in checks['touch']['rows']) and not checks['touch']['errors']
files=subprocess.check_output(['git','ls-files','--cached','--others','--exclude-standard','-z']).decode().split('\0');files=[p for p in files if p and(root/p).is_file()]
manifest={p:hashlib.sha256((root/p).read_bytes()).hexdigest()for p in sorted(files)}
runtime=lambda p:p=='index.html'or p.startswith(('games/','assets/'))
changed=[p for p,h in manifest.items()if runtime(p)and base['sourceSha256'].get(p)!=h]
assert set(changed)=={'games/hanoi/hanoi.js','games/puzzle/index.html','games/puzzle/puzzle.js','games/puzzle/puzzle.css','games/visual/visual.css'}
head=subprocess.check_output(['git','rev-parse','HEAD']).decode().strip();report={'generatedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'commit':head,'baseCommit':base['commit'],'sourceSha256':manifest,'changedRuntime':changed,'checks':checks,'baselineEvidence':'baseline-verification.json','notRetested':'Full 85-mode suite belongs to baseline; 19 affected modes rerun here. Other runtime files unchanged.','timeConditions':'Cutoff uses synthetic Date.now; browser relaunch and mouse/touch events actual Chromium.','realDeviceVerified':False,'realBackgroundVerified':False,'productionInteractiveVerified':False}
(out/'followup-verification.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
labels={'progress':'20 個非零進度截止／刷新／瀏覽器重啟／續時','legacySea':'3 種 R2 舊海底存檔：兩舊區域只計一個差異','reference':'九種拼圖參考圖與短視窗／手機版面','hanoiDrag':'河內塔舊版錯誤重現與修正滑鼠／觸控拖放','modes':'19 受影響模式通關、133 次版面檢查'}
parts=['<!doctype html><html lang="zh-Hant"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>R3 補驗證據</title><style>body{font-family:system-ui,sans-serif;margin:24px auto;max-width:1100px;padding:0 16px;line-height:1.7;background:#f7f3ed;color:#453443}img{width:100%;height:auto}details{margin:20px 0;padding:16px;background:white;border-radius:12px}summary{font-size:22px;cursor:pointer}pre{white-space:pre-wrap;overflow-wrap:anywhere;font-size:12px}</style><h1>R3 補驗與修正</h1>',f'<p>版本 <code>{head}</code>。五個網站檔案改動，家長規則及題庫未改。</p>','<p>20 個非零進度截止案例、3 個舊海底遷移、9 組參考圖、19 個受影響模式／133 次版面檢查通過。河內塔基線拖放錯誤確實重現，修正後滑鼠與模擬觸控各測 3／7 盤通過；視覺記憶短視窗按鈕可見。</p>','<p>基線 52f240e 的 85 模式／595 次檢查保留為基線證據；本次僅重跑受影響流程。截止時間用虛構時鐘，重啟真的關閉／啟動 Chromium。實體手機、Safari、真實背景仍待驗收；正式站點互動受 CONNECT 403 阻擋。</p>','<p><a href="verification.json">本次來源指紋與完整結果</a> · <a href="baseline-verification.json">基線結果</a> · <a href="../source/R3_REVIEW.md">維護說明</a> · <a href="followup-release-evidence.json">發布證據</a></p>']
for k,label in labels.items():parts.append('<details><summary>'+label+'</summary><pre>'+html.escape(json.dumps(checks[k],ensure_ascii=False,indent=2))+'</pre></details>')
for folder in ['reference','legacy-sea','cutoff-progress']:
 parts.append('<details><summary>'+folder+' 實際畫面</summary>')
 for p in sorted((out/folder).glob('*.png')):
  if 'failure'not in p.name:parts.append('<p>'+html.escape(p.name)+'</p><img loading="lazy" src="screens/'+folder+'/'+p.name+'">')
 parts.append('</details>')
parts.append('</html>');(out/'followup-index.html').write_text('\n'.join(parts))
temp=out/'followup.tmp.zip'
with zipfile.ZipFile(archive)as old,zipfile.ZipFile(temp,'w',zipfile.ZIP_DEFLATED)as new:
 for info in old.infolist():
  if info.filename.startswith(('source/','review/followup-results/','review/screens/reference/','review/screens/legacy-sea/','review/screens/cutoff-progress/'))or info.filename in ['review/index.html','review/verification.json','review/baseline-verification.json','review/followup-release-evidence.json']:continue
  new.writestr(info,old.read(info.filename))
 new.writestr('review/baseline-verification.json',json.dumps(base,ensure_ascii=False,indent=2));new.write(out/'followup-verification.json','review/verification.json');new.write(out/'followup-index.html','review/index.html')
 for p in files:new.write(root/p,'source/'+p)
 for k in checks:new.writestr('review/followup-results/'+k+'.json',json.dumps(checks[k],ensure_ascii=False,indent=2))
 for folder in ['reference','legacy-sea','cutoff-progress']:
  for p in (out/folder).glob('*.png'):
   if 'failure'not in p.name:new.write(p,'review/screens/'+folder+'/'+p.name)
 if(out/'followup-release-evidence.json').exists():new.write(out/'followup-release-evidence.json','review/followup-release-evidence.json')
temp.replace(archive)
with zipfile.ZipFile(archive)as z:
 assert z.testzip()is None
 for p,h in manifest.items():assert hashlib.sha256(z.read('source/'+p)).hexdigest()==h
print('Follow-up ZIP validated:',head,len(manifest),'files',archive.stat().st_size,'bytes; baseline retained; five runtime changes')
