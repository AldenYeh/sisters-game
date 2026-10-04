const fs=require("fs"),vm=require("vm"),assert=require("assert");
const context={window:{}};
vm.createContext(context);
vm.runInContext(fs.readFileSync("games/sliding/levels.js","utf8"),context);
const levels=context.window.SlidingLevels;
assert.ok(levels.length>=24, "need 24 sliding levels");
const tiers=new Set(levels.map(l=>l.tier));
for (const t of ["tutorial","easy","medium","hard","challenge","master"]) assert.ok(tiers.has(t), t);
levels.forEach((level,i)=>{
  assert.ok(level.minimumMoves>=1, i);
  assert.ok(level.pieces.some(p=>p.target), i);
  const occ=new Set();
  level.pieces.forEach(p=>{
    for(let y=0;y<p.h;y++) for(let x=0;x<p.w;x++){
      const k=(p.r+y)+","+(p.c+x);
      assert.ok(!occ.has(k), "overlap "+level.name);
      occ.add(k);
    }
  });
});
console.log("Sliding metadata ok:", levels.length);
