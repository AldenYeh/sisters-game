"""Package the single-tab renewal fix while preserving both previous evidence sets."""
import datetime,hashlib,html,json,pathlib,subprocess,zipfile
root=pathlib.Path.cwd();out=root/'outputs/r3';archive=out/'sisters-game-R3-review.zip'
with zipfile.ZipFile(archive)as z:prior=json.loads(z.read('review/renew-baseline-verification.json'if'review/renew-baseline-verification.json'in z.namelist()else'review/verification.json'))
assert prior['commit']=='624975ef739ef773989fbe868a0c0b553c01ca3b'
read=lambda name:json.loads((out/name).read_text())
checks={k:read(v)for k,v in {'transition':'renew-transition-browser.json','parent':'parent-browser.json','edges':'parent-edge-browser.json','cutoff':'cutoff-browser.json','games':'games-browser.json','migration':'migration-browser.json'}.items()}
assert len(checks['transition'])==11 and all(x['pass']for x in checks['transition'])
assert len(checks['parent']['passed'])==9 and not checks['parent']['errors']
assert len(checks['edges'])==13 and all(x['pass']for x in checks['edges'])
assert len(checks['cutoff'])==12 and all(x['pass']for x in checks['cutoff'])
assert len(checks['games']['passed'])==12 and not checks['games']['errors']
assert len(checks['migration'])==12 and all(x['pass']for x in checks['migration'])
files=subprocess.check_output(['git','ls-files','--cached','--others','--exclude-standard','-z']).decode().split('\0');files=sorted(p for p in files if p and(root/p).is_file());manifest={p:hashlib.sha256((root/p).read_bytes()).hexdigest()for p in files}
changed=[p for p in files if(p=='index.html'or p.startswith(('assets/','games/')))and prior['sourceSha256'].get(p)!=manifest[p]];assert changed==['assets/js/lifecycle.js']
head=subprocess.check_output(['git','rev-parse','HEAD']).decode().strip();report={'generatedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'commit':head,'baseCommit':prior['commit'],'sourceSha256':manifest,'changedRuntime':changed,'checks':checks,'unchangedEvidence':'renew-baseline-verification.json','scope':'Single-tab grace → parent approval → difficulty start/save race only; stale ID guard retained.','notRetested':'Prior full mode/layout/zoom/touch/progress runs retained with their original commit.','timeConditions':'Synthetic Date.now grace; actual single Chromium tab and normal parent UI.','productionInteractiveVerified':False}
body='''<!doctype html><html lang="zh-Hant"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>R3 同分頁續時修正</title><style>body{font:16px/1.7 system-ui;max-width:1100px;margin:24px auto;padding:16px;color:#453443;background:#f7f3ed}img{width:100%;height:auto}pre{white-space:pre-wrap;overflow-wrap:anywhere;font-size:12px}details{padding:16px;background:white;margin:16px 0;border-radius:12px}</style><h1>同分頁家長續時修正</h1>'''+f'<p>版本 <code>{head}</code>；相較 624975e，網站僅 assets/js/lifecycle.js 改動。</p>'+'<p>三個舊腳本單分頁錯誤重現；八個修正流程通過，包括取消、只續原局、連續換難度、刷新與保存返回、401 筆舊紀錄及精確一次扣抵。不需要額外按重試；原有版本保護保留。</p><p>回歸：9 項家長、13 項邊界、12 款截止保存、12 款到期完成、12 款舊局遷移，另 14 核心及三個既有 Node 測試均通過。時間用虛構時鐘。尚未在本雲端直接測最新正式站互動。</p><p><a href="verification.json">本次結果及來源指紋</a> · <a href="renew-release-evidence.json">發布證據</a> · <a href="renew-baseline-verification.json">624975e 補驗結果</a> · <a href="baseline-verification.json">52f240e 原全量結果</a> · <a href="previous-followup-index.html">前次圖像及非零進度證據</a></p>'
for k,v in checks.items():body+='<details><summary>'+k+'</summary><pre>'+html.escape(json.dumps(v,ensure_ascii=False,indent=2))+'</pre></details>'
for p in sorted((out/'renew-transition').glob('*.png')):
 if'failure'not in p.name:body+='<details><summary>'+html.escape(p.name)+'</summary><img loading="lazy" src="screens/renew-transition/'+p.name+'"></details>'
body+='</html>';temp=out/'renew.tmp.zip'
with zipfile.ZipFile(archive)as old,zipfile.ZipFile(temp,'w',zipfile.ZIP_DEFLATED)as new:
 if'review/previous-followup-index.html'not in old.namelist():new.writestr('review/previous-followup-index.html',old.read('review/index.html'))
 for info in old.infolist():
  if info.filename.startswith(('source/','review/renew-results/','review/screens/renew-transition/'))or info.filename in['review/index.html','review/verification.json','review/renew-baseline-verification.json','review/renew-release-evidence.json']:continue
  new.writestr(info,old.read(info.filename))
 new.writestr('review/index.html',body);new.writestr('review/verification.json',json.dumps(report,ensure_ascii=False,indent=2));new.writestr('review/renew-baseline-verification.json',json.dumps(prior,ensure_ascii=False,indent=2))
 for p in files:new.write(root/p,'source/'+p)
 for k,v in checks.items():new.writestr('review/renew-results/'+k+'.json',json.dumps(v,ensure_ascii=False,indent=2))
 for p in(out/'renew-transition').glob('*.png'):
  if'failure'not in p.name:new.write(p,'review/screens/renew-transition/'+p.name)
 if(out/'renew-release-evidence.json').exists():new.write(out/'renew-release-evidence.json','review/renew-release-evidence.json')
temp.replace(archive)
with zipfile.ZipFile(archive)as z:
 assert z.testzip()is None
 for p,h in manifest.items():assert hashlib.sha256(z.read('source/'+p)).hexdigest()==h
print('Renewal ZIP verified:',head,len(files),'source files',archive.stat().st_size,'bytes')
