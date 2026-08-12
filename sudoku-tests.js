const fs=require("fs"),vm=require("vm"),assert=require("assert");
const context={window:{},Math,console};vm.createContext(context);vm.runInContext(fs.readFileSync("games/sudoku/engine.js","utf8"),context);const engine=context.window.SudokuEngine;
for(const size of [4,6]){
 const config=engine.configs[size];assert.strictEqual(config.boxRows,2);assert.strictEqual(config.boxCols,size===4?2:3);
 for(let run=0;run<40;run+=1){const solved=engine.makeSolvedBoard(size);assert.ok(engine.isValidBoard(solved,size));assert.strictEqual(engine.countSolutions(solved,size),1);}
 for(const difficulty of ["practice","easy","challenge"]){for(let run=0;run<18;run+=1){const result=engine.generatePuzzle(size,difficulty);assert.ok(engine.isValidBoard(result.solution,size));assert.ok(engine.isValidBoard(result.puzzle,size,true));assert.strictEqual(engine.countSolutions(result.puzzle,size,2),1);result.puzzle.forEach((row,r)=>row.forEach((value,c)=>{if(value)assert.strictEqual(value,result.solution[r][c]);}));}}
}
const bad4=[[1,1,3,4],[3,4,1,2],[2,3,4,1],[4,2,2,3]];assert.strictEqual(engine.isValidBoard(bad4,4),false);
const bad6=engine.makeSolvedBoard(6);bad6[1][0]=bad6[0][0];assert.strictEqual(engine.isValidBoard(bad6,6),false);
console.log("Sudoku Engine 測試通過：4×4、6×6、2×2／2×3 區塊、唯一解與三種難度皆正常。");
