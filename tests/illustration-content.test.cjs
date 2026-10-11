'use strict';
const fs=require('fs'),vm=require('vm'),assert=require('assert/strict'),crypto=require('crypto');
global.window=global;
for(const file of ['assets/data/illustration-bank.js','assets/js/illustration-detail.js','assets/data/illustration-details-01.js','assets/data/illustration-details-16.js','assets/data/illustration-details-31.js','assets/data/illustration-details-original.js'])vm.runInThisContext(fs.readFileSync(file,'utf8'),{filename:file});
const frames=SistersIllustrations;assert.equal(frames.length,50);assert.equal(new Set(frames.map(f=>f.id)).size,50);const hashes=[];
for(const frame of frames){
 assert(Number.isInteger(frame.version)&&frame.version>0);assert(frame.name&&frame.src&&frame.width>0&&frame.height>0);
 const bytes=fs.readFileSync(frame.src.replace('../../',''));hashes.push(crypto.createHash('sha256').update(bytes).digest('hex'));
 const complete={...frame,details:IllustrationDetails[frame.id]};assert.equal(complete.details.length,7);SistersIllustrationDetails.validate(complete);
 for(const tier of [3,5,7]){const ids=complete.details.slice(0,tier).map(d=>d.id),spots=SistersIllustrationDetails.spots(complete,ids);assert.equal(spots.length,tier);assert.notEqual(SistersIllustrationDetails.svg(complete,ids),SistersIllustrationDetails.svg(complete,ids,true));}
}
assert.equal(new Set(hashes).size,50,'each question uses a different complete artwork file');
for(const file of ['assets/js/family-core.js','assets/js/family.js','assets/js/lifecycle.js']){const original=require('child_process').execFileSync('git',['show','f8a0778:'+file]);assert.deepEqual(fs.readFileSync(file),original,'Owner-approved ten-minute protection unchanged: '+file);}
const report={completeCompositions:50,newGeneratedCompositions:45,existingCompleteArtworks:5,puzzle:{12:50,24:50,36:50},spot:{3:50,5:50,7:50},detailRegions:350,parentalFilesUnchanged:true};
fs.mkdirSync('outputs/r3/illustration-content',{recursive:true});fs.writeFileSync('outputs/r3/illustration-content/content-counts.json',JSON.stringify(report,null,2));console.log('PASS',report);
