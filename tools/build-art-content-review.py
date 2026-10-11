"""Package the cloud-only illustration expansion, preserving dated prior evidence."""
import datetime, hashlib, html, json, pathlib, subprocess, zipfile

root = pathlib.Path.cwd()
out = root / 'outputs/r3'
archive = out / 'sisters-game-R3-review.zip'
baseline = 'f8a0778fa77aa18cd113f0691837807741117849'
checks = {}
names = ['illustration-content/content-counts.json', 'illustration-content/decoded-images.json',
         'illustration-content/puzzle-browser.json', 'art-expanded/results.json',
         'art-original-details/results.json', 'art-details-01/results.json',
         'art-details-01/input-results.json', 'art-details-16/results.json', 'art-details-31/results.json',
         'art-quality/results.json', 'art-quality/legacy-results.json', 'art-quality/parent-touch-results.json',
         'art-quality/load-failure-results.json', 'art-quality/loading-results.json',
         'modes-browser-affected.json', 'zoom-browser-affected.json', 'parent-browser.json',
         'renew-transition-browser.json', 'games-browser.json', 'cutoff-browser.json',
         'migration-browser.json', 'legacy-sea-browser.json', 'bank-counts.json']
for name in names:
    checks[name] = json.loads((out / name).read_text())
for name, count in [('illustration-content/puzzle-browser.json',158), ('art-expanded/results.json',150), ('modes-browser-affected.json',12)]:
    data = checks[name]
    assert len(data['rows']) == count and all(r['pass'] for r in data['rows']) and not data['errors'], name
for name, count in [('cutoff-browser.json',12), ('migration-browser.json',12), ('legacy-sea-browser.json',3), ('renew-transition-browser.json',11), ('art-quality/load-failure-results.json',2), ('zoom-browser-affected.json',4)]:
    assert len(checks[name]) == count and all(r['pass'] for r in checks[name]), name
for name, count in [('parent-browser.json',9), ('games-browser.json',12)]:
    assert len(checks[name]['passed']) == count and not checks[name]['errors'], name
assert checks['illustration-content/content-counts.json']['detailRegions'] == 350
assert all(r['pixels']['outside'] == 0 for r in checks['art-expanded/results.json']['rows'])
assert all(r['resources'] and sum(x['transfer'] for x in r['resources']) == 0 for r in checks['art-quality/loading-results.json'] if r['version'] == 'restored' and r['cache'] == 'warm')
files = sorted(p for p in subprocess.check_output(['git','ls-files','--cached','--others','--exclude-standard','-z']).decode().split('\0') if p and (root/p).is_file())
manifest = {p: hashlib.sha256((root/p).read_bytes()).hexdigest() for p in files}
head = subprocess.check_output(['git','rev-parse','HEAD']).decode().strip()
for p in ['assets/js/family-core.js','assets/js/family.js','assets/js/lifecycle.js']:
    assert (root/p).read_bytes() == subprocess.check_output(['git','show',baseline+':'+p]), p
runtime = [p for p in files if p == 'index.html' or p.startswith(('assets/','games/'))]
old_paths = set(subprocess.check_output(['git','ls-tree','-r','--name-only',baseline]).decode().splitlines())
changed = [p for p in runtime if p not in old_paths or (root/p).read_bytes() != subprocess.check_output(['git','show',baseline+':'+p])]
report = {'generatedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(), 'commit':head, 'baseCommit':baseline,
          'publication':'Cloud-only review; no new push, merge or deployment.', 'sourceSha256':manifest,
          'changedRuntime':changed, 'checks':checks, 'counts':checks['illustration-content/content-counts.json'],
          'limits':['The 50 compositions are shared across game difficulties; not 150 different paintings or 50 per theme.',
                    'New panels are native512×341/342; advanced details can be small.',
                    'Synthetic credentials/clocks and emulated mobile Chromium; real phone/Safari/background testing remains.',
                    'Static local protection can be bypassed by clearing/editing local data, code, clocks or changing browser/device.',
                    'Local loading metrics do not predict a household network or CDN.',
                    'Unapproved isolated2cede36 parental variant excluded.'], 'approvedGraceMinutes':10,
          'unchangedEvidence':'history/f8a0778/', 'productionInteractiveVerified':False}
(out/'art-content-verification.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
body = '''<!doctype html><html lang="zh-Hant"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>完整插畫雲端驗收</title><style>body{font:16px/1.7 system-ui;max-width:1100px;margin:24px auto;padding:16px;color:#453443;background:#f7f3ed}img,canvas{max-width:100%;height:auto}pre{white-space:pre-wrap;overflow-wrap:anywhere;font-size:12px}details{padding:16px;background:white;margin:16px 0;border-radius:12px}code{overflow-wrap:anywhere}.pair{display:grid;grid-template-columns:1fr 1fr;gap:12px}@media(max-width:650px){.pair{grid-template-columns:1fr}}</style><h1>50 張完整插畫雲端驗收</h1>'''
body += f'<p>版本 <code>{head}</code>，基線 <code>f8a0778</code>。本次未推送或部署。<a href="verification.json">測試／來源清單</a> · <a href="../source/R3_REVIEW.md">說明</a> · <a href="history/f8a0778/index.html">歷史驗收</a></p>'
body += '<p>5 張既有完整圖＋45 張新構圖；拼圖每片數 50 張、找不同每難度 50 張，共用插畫不重複計數。每圖七個人工定位局部差異，共 350 區。150 組找不同真正 UI 完成，所選區域外像素一致；150 組拼圖載入＋各片數完成，合計158專項案例。家長三核心檔案與批准的10分鐘寬限保持。</p><p>解壓後以 localhost HTTP 服務整個解壓目錄，開 source/index.html 遊玩或此頁看證據；進度依網站來源儲存。時間／密碼為虛構測試資料，手機為Chromium模擬。細差異與實體手機辨識尚需人工驗收。</p><p>下方可切換全部50張原圖與差異對照；此檢視器不保存進度、不控制家長設定。</p><select id="art"></select> <select id="tier"><option>3</option><option>5</option><option>7</option></select><p id="status"></p><div class="pair" id="pair"></div>'
for script in ['assets/data/illustration-bank.js','assets/js/illustration-detail.js','assets/data/illustration-details-original.js','assets/data/illustration-details-01.js','assets/data/illustration-details-16.js','assets/data/illustration-details-31.js']:
    body += '<script src="../source/'+script+'"></script>'
body += '''<script>const picker=document.querySelector('#art'),tier=document.querySelector('#tier');for(const f of SistersIllustrations){const o=document.createElement('option');o.value=f.id;o.textContent=f.name;picker.append(o)}let token=0;async function render(){const n=++token,base=SistersIllustrations.find(f=>f.id===picker.value),f={...base,src:new URL('../source/games/spot/'+base.src,location.href).href,details:IllustrationDetails[base.id]},ids=f.details.slice(0,+tier.value).map(d=>d.id);document.querySelector('#status').textContent=f.name+' · '+tier.value+' 個差異 · '+f.width+'×'+f.height;try{const pair=await Promise.all([SistersIllustrationDetails.canvas(f,ids),SistersIllustrationDetails.canvas(f,ids,true)]);if(n!==token)return;document.querySelector('#pair').replaceChildren(...pair.map(SistersIllustrationDetails.copy))}catch(e){document.querySelector('#status').textContent=e.message}}picker.onchange=tier.onchange=render;render()</script>'''
screens = sorted(set(list(out.glob('art-expanded/*.png')) + list(out.glob('illustration-content/*.png')) + [out/'art-quality/touch-cutoff-saved.png']))
screens = [p for p in screens if p.exists() and 'failure' not in p.name]
for p in screens:
    name=str(p.relative_to(out))
    body += '<details><summary>'+html.escape(name)+'</summary><img loading="lazy" src="screens/'+name+'"></details>'
for name,data in checks.items():
    body += '<details><summary>'+html.escape(name)+'</summary><pre>'+html.escape(json.dumps(data,ensure_ascii=False,indent=2))+'</pre></details>'
body += '</html>'
temp = out/'art-content.tmp.zip'
with zipfile.ZipFile(archive) as prior, zipfile.ZipFile(temp,'w',zipfile.ZIP_DEFLATED) as new:
    already_versioned = 'review/history/f8a0778/index.html' in prior.namelist()
    for info in prior.infolist():
        if already_versioned and info.filename.startswith('review/history/f8a0778/'):
            new.writestr(info,prior.read(info.filename))
        elif not already_versioned and info.filename.startswith('review/'):
            new.writestr('review/history/f8a0778/'+info.filename.removeprefix('review/'),prior.read(info.filename))
    for p in files: new.write(root/p,'source/'+p)
    new.writestr('review/index.html',body)
    new.writestr('review/verification.json',json.dumps(report,ensure_ascii=False,indent=2))
    for name in names:new.write(out/name,'review/results/'+name)
    for p in screens:new.write(p,'review/screens/'+str(p.relative_to(out)))
    for p in out.glob('*-final.log'):new.write(p,'review/logs/'+p.name)
    for p in out.glob('art-quality/*-final.log'):new.write(p,'review/logs/'+p.name)
    for p in out.glob('illustration-content/*-final.log'):new.write(p,'review/logs/'+p.name)
with zipfile.ZipFile(temp) as check:
    assert check.testzip() is None
    for p,digest in manifest.items():assert hashlib.sha256(check.read('source/'+p)).hexdigest()==digest,p
temp.replace(archive)
print(json.dumps({'commit':head,'sourceFiles':len(files),'changedRuntime':len(changed),'bytes':archive.stat().st_size,'spotActualCompletions':150,'puzzleCases':158}))
