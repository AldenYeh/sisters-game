(() => {
  "use strict";
  const configs = Object.freeze({
    4: Object.freeze({ size: 4, boxRows: 2, boxCols: 2, clues: { practice: 12, easy: 10, challenge: 8 } }),
    6: Object.freeze({ size: 6, boxRows: 2, boxCols: 3, clues: { practice: 28, easy: 24, challenge: 20 } })
  });
  const range = n => Array.from({ length: n }, (_, i) => i);
  const shuffle = values => { const a = [...values]; for (let i=a.length-1;i>0;i-=1){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; };
  function getConfig(size){const config=configs[size];if(!config)throw new Error("Unsupported Sudoku size");return config;}
  function pattern(row,col,config){return (config.boxCols*(row%config.boxRows)+Math.floor(row/config.boxRows)+col)%config.size;}
  function makeSolvedBoard(size){
    const c=getConfig(size),rowBands=shuffle(range(c.size/c.boxRows)),colStacks=shuffle(range(c.size/c.boxCols));
    const rows=rowBands.flatMap(b=>shuffle(range(c.boxRows)).map(r=>b*c.boxRows+r));
    const cols=colStacks.flatMap(s=>shuffle(range(c.boxCols)).map(col=>s*c.boxCols+col));
    const nums=shuffle(range(c.size).map(i=>i+1));
    return rows.map(r=>cols.map(col=>nums[pattern(r,col,c)]));
  }
  function isValidBoard(board,size,allowEmpty=false){
    const c=getConfig(size);if(!Array.isArray(board)||board.length!==size||board.some(row=>!Array.isArray(row)||row.length!==size))return false;
    const valid=values=>{const filled=values.filter(Boolean);return filled.every(v=>Number.isInteger(v)&&v>=1&&v<=size)&&new Set(filled).size===filled.length&&(allowEmpty||filled.length===size);};
    for(let r=0;r<size;r+=1)if(!valid(board[r]))return false;
    for(let col=0;col<size;col+=1)if(!valid(board.map(row=>row[col])))return false;
    for(let br=0;br<size;br+=c.boxRows)for(let bc=0;bc<size;bc+=c.boxCols){const values=[];for(let r=0;r<c.boxRows;r+=1)for(let col=0;col<c.boxCols;col+=1)values.push(board[br+r][bc+col]);if(!valid(values))return false;}
    return true;
  }
  function candidates(board,row,col,c){const used=new Set(board[row]);for(let r=0;r<c.size;r+=1)used.add(board[r][col]);const br=Math.floor(row/c.boxRows)*c.boxRows,bc=Math.floor(col/c.boxCols)*c.boxCols;for(let r=br;r<br+c.boxRows;r+=1)for(let cc=bc;cc<bc+c.boxCols;cc+=1)used.add(board[r][cc]);return range(c.size).map(i=>i+1).filter(v=>!used.has(v));}
  function countSolutions(source,size,limit=2){const c=getConfig(size),board=source.map(row=>[...row]);let count=0;function solve(){let best=null,bestValues=null;for(let r=0;r<size;r+=1)for(let col=0;col<size;col+=1)if(board[r][col]===0){const values=candidates(board,r,col,c);if(!values.length)return;if(!best||values.length<bestValues.length){best=[r,col];bestValues=values;}}if(!best){count+=1;return;}for(const value of bestValues){board[best[0]][best[1]]=value;solve();board[best[0]][best[1]]=0;if(count>=limit)return;}}solve();return count;}
  function generatePuzzle(size,difficulty="easy"){
    const c=getConfig(size),solution=makeSolvedBoard(size),puzzle=solution.map(row=>[...row]),target=c.clues[difficulty]??c.clues.easy;
    for(const index of shuffle(range(size*size))){if(puzzle.flat().filter(Boolean).length<=target)break;const r=Math.floor(index/size),col=index%size,old=puzzle[r][col];puzzle[r][col]=0;if(countSolutions(puzzle,size,2)!==1)puzzle[r][col]=old;}
    return { size, boxRows:c.boxRows, boxCols:c.boxCols, puzzle, solution, difficulty };
  }
  window.SudokuEngine=Object.freeze({ configs, makeSolvedBoard, isValidBoard, countSolutions, generatePuzzle });
})();
