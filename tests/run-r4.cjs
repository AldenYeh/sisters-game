'use strict';
const fs=require('fs'),cp=require('child_process'),crypto=require('crypto');
const groups={
 baseline:['tests.js','sliding-tests.js','sudoku-tests.js','tests/family-core.test.cjs','tests/banks.test.cjs'],
 art:['tests/illustration-content.test.cjs','tests/art-quality-expanded-browser.cjs','tests/natural-touch-browser.cjs'],
 puzzle:['tests/illustration-puzzle-browser.cjs'],
 migration:['tests/illustration-100-migration-browser.cjs','tests/illustration-100-failure-browser.cjs','tests/illustration-100-loading-browser.cjs','tests/natural-legacy-layer-browser.cjs','tests/art-quality-legacy.cjs','tests/art-quality-load-failure.cjs'],
 parental:['tests/parent-browser.cjs','tests/games-browser.cjs','tests/cutoff-browser.cjs','tests/cutoff-progress-browser.cjs','tests/renew-transition-browser.cjs','tests/parent-edge-browser.cjs','tests/relaunch-browser.cjs','tests/migration-browser.cjs'],
 mobile:['tests/game-flow-browser.cjs','tests/shared-layout-reviewer-browser.cjs','tests/puzzle-mobile-reference-browser.cjs','tests/puzzle-mobile-save-browser.cjs','tests/maze-sokoban-tap-browser.cjs','tests/sliding-vehicle-browser.cjs','tests/tangram-flip-browser.cjs','tests/tangram-release-browser.cjs','tests/spot-replay-layout-reviewer-browser.cjs','tests/mobile-family-text-browser.cjs'],
 interaction:['tests/touch-browser.cjs','tests/viewport-all-games-browser.cjs','tests/zoom-browser.cjs','tests/original-five-material-browser.cjs','tests/original-five-material-touch.cjs','tests/natural-renderer-guards-browser.cjs','tests/art-quality-parent-touch.cjs']
};
const requested=process.argv[2],selected=requested?[requested]:Object.keys(groups);if(selected.some(g=>!groups[g]))throw Error('Unknown suite group: '+requested);
const selectedGroups=selected.map(group=>({group,jobs:groups[group]}));
const out='outputs/r4-100/suite';fs.mkdirSync(out,{recursive:true});let failed=false;
const sha=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const productionFiles=['assets/js/game-layout.js','assets/css/game-layout.css','assets/js/family-core.js','assets/js/family.js','assets/js/lifecycle.js','assets/data/illustration-bank.js','assets/data/natural-illustrations-v2.js',...fs.readdirSync('games').flatMap(g=>fs.readdirSync('games/'+g).filter(f=>/\.(html|js|css)$/.test(f)).map(f=>'games/'+g+'/'+f))];
const productionHashes=()=>Object.fromEntries(productionFiles.map(p=>[p,sha(p)]));
for(const{group,jobs}of selectedGroups){let rows=[];for(const file of jobs){const startedAt=new Date().toISOString(),sourceSHA256AtStart=sha(file),productionHashesAtStart=productionHashes();const r=cp.spawnSync('node',[file],{encoding:'utf8',env:{...process.env,OLD_URL:process.env.OLD_URL||'http://127.0.0.1:8007'},maxBuffer:16e6});const log=out+'/'+file.replaceAll('/','-')+'.log';fs.writeFileSync(log,(r.stdout||'')+(r.stderr||''));const productionHashesAtEnd=productionHashes(),sourceStable=sourceSHA256AtStart===sha(file)&&JSON.stringify(productionHashesAtStart)===JSON.stringify(productionHashesAtEnd);const row={file,sourceSHA256:sha(file),sourceSHA256AtStart,productionHashesAtStart,productionHashesAtEnd,sourceStable,startedAt,finishedAt:new Date().toISOString(),exitCode:r.status,pass:r.status===0&&sourceStable,log,logSHA256:sha(log),catalogSHA256:sha('assets/data/natural-illustrations-v2.js')};rows.push(row);fs.writeFileSync(out+'/'+group+'.json',JSON.stringify(rows,null,2));console.log(row.pass?'PASS':'FAIL',file);if(!row.pass){console.log(r.stdout,r.stderr);break;}}
if(rows.length!==jobs.length||rows.some(r=>!r.pass)){failed=true;break;}}if(failed)process.exitCode=1;
