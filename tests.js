// 不需安裝套件的網站架構與迷宮核心測試：執行 node tests.js
const fs = require("fs");
const assert = require("assert");

const read = path => fs.readFileSync(path, "utf8");
const homeHtml = read("index.html");
const mazeHtml = read("games/maze/index.html");
const siteCss = read("assets/css/site.css");
const mazeCss = read("games/maze/maze.css");
const contentJs = read("assets/js/content.js");
const sharedJs = read("assets/js/shared.js");
const homeJs = read("assets/js/home.js");
const mazeJs = read("games/maze/maze.js");

// 資料夾、共用資料與 GitHub Pages 相對路徑。
for (const file of ["assets/js/content.js", "assets/js/shared.js", "assets/js/home.js", "assets/css/site.css", "games/maze/index.html", "games/maze/maze.js", "games/maze/maze.css", "games/sudoku/index.html", "games/sudoku/engine.js", "games/sudoku/sudoku.js", "games/sudoku/sudoku.css"]) {
  assert.ok(fs.existsSync(file), `缺少 ${file}`);
}
assert.match(homeHtml, /assets\/js\/content\.js/);
assert.match(homeHtml, /assets\/js\/shared\.js/);
assert.match(mazeHtml, /\.\.\/\.\.\/assets\/js\/content\.js/);
assert.match(mazeJs, /window\.location\.href = "\.\.\/\.\.\/index\.html#games\/logic"/);
assert.doesNotMatch(homeHtml + mazeHtml, /https?:\/\//, "不可依賴 CDN 或網路資源");

// 首頁由共用資料產生，HTML 不直接寫死產品文字。
assert.match(contentJs, /姊妹益智樂園/);
assert.doesNotMatch(contentJs, /和爸爸一起玩，一起長大/);
assert.match(contentJs, /姊妹益智樂園", "ㄐㄧㄝˇ ㄇㄟˋ ㄧˋ ㄓˋ ㄌㄜˋ ㄩㄢˊ/);
assert.match(contentJs, /姊姊", "ㄐㄧㄝˇ ㄐㄧㄝˇ/);
assert.match(contentJs, /妹妹", "ㄇㄟˋ ㄇㄟˋ/);
assert.match(contentJs, /sister: \{ id: "sister"/);
assert.match(contentJs, /youngerSister: \{ id: "youngerSister"/);
assert.match(contentJs, /guest: \{ id: "guest"/);
assert.match(contentJs, /兒童數獨/);
assert.match(contentJs, /記憶翻牌/);
assert.match(contentJs, /href: "games\/maze\/index\.html"/);
assert.match(contentJs, /href: "games\/sudoku\/index\.html"/);
assert.match(contentJs, /學習遊戲/);
assert.match(contentJs, /創作遊戲/);
assert.match(contentJs, /bopomofo/);
assert.doesNotMatch(homeHtml, /姊妹益智樂園|姊姊|妹妹|迷宮|數獨|翻牌/);
assert.doesNotMatch(mazeHtml, /姊妹益智樂園|姊姊|妹妹|迷宮|簡單|普通|困難/);
assert.match(sharedJs, /sistersPuzzleCurrentPlayerV1/);
assert.match(sharedJs, /localStorage\.getItem/);
assert.match(sharedJs, /localStorage\.setItem/);
assert.match(homeJs, /content\.categories\.forEach/);
assert.match(homeJs, /setPage\("category"\)/);
assert.match(homeJs, /setPage\("games"\)/);
assert.match(homeHtml, /id="player-screen"/);
assert.match(homeHtml, /id="category-screen"/);
assert.match(homeHtml, /id="games-screen"/);
assert.doesNotMatch(homeHtml + contentJs + homeJs + mazeHtml + mazeJs, /🐰|兔兔/);

// 既有迷宮功能不可退化。
assert.match(mazeJs, /ArrowUp: "up"/);
assert.match(mazeJs, /event\.preventDefault\(\)/);
assert.match(mazeJs, /movePlayer\(button\.dataset\.move\)/);
assert.match(mazeJs, /Math\.hypot\(dx,dy\)<28/);
assert.match(mazeJs, /setTouchControlsDisabled\(true\)/);
assert.match(mazeJs, /localStorage\.getItem\(STORAGE_KEY\)/);
assert.match(mazeJs, /Date\.now\(\)-gameState\.timerStartedAt/);
assert.match(mazeJs, /gameState\.visited=new Set/);
assert.match(mazeJs, /attempt<14/);
assert.match(mazeJs, /bfs\(grid,start\)/);
assert.match(mazeHtml, /data-move="up"/);
assert.match(mazeCss, /touch-action:none/);
assert.match(mazeCss, /orientation:landscape/);
assert.match(siteCss, /grid-template-columns:repeat\(3,minmax\(0,1fr\)\)/);

for (const source of [contentJs, sharedJs, homeJs, mazeJs]) new Function(source);

// 以相同遞迴回溯原理驗證三個尺寸的 Perfect Maze 全部相通。
function generate(size) {
  const side=size*2+1,grid=Array.from({length:side},()=>Array(side).fill(1));
  const seen=Array.from({length:size},()=>Array(size).fill(false)),stack=[[0,0]],steps=[[-1,0],[1,0],[0,-1],[0,1]];
  seen[0][0]=true;grid[1][1]=0;
  while(stack.length){const[r,c]=stack[stack.length-1];const choices=steps.map(([dr,dc])=>[r+dr,c+dc,dr,dc]).filter(([nr,nc])=>nr>=0&&nr<size&&nc>=0&&nc<size&&!seen[nr][nc]);if(!choices.length){stack.pop();continue;}const[nr,nc,dr,dc]=choices[Math.floor(Math.random()*choices.length)];seen[nr][nc]=true;grid[r*2+1+dr][c*2+1+dc]=0;grid[nr*2+1][nc*2+1]=0;stack.push([nr,nc]);}
  return grid;
}
for(const size of [7,11,15])for(let run=0;run<30;run+=1){const grid=generate(size),open=grid.flat().filter(v=>v===0).length,queue=[[1,1]],seen=new Set(["1,1"]);for(let i=0;i<queue.length;i+=1)for(const[dr,dc]of[[1,0],[-1,0],[0,1],[0,-1]]){const nr=queue[i][0]+dr,nc=queue[i][1]+dc,key=`${nr},${nc}`;if(grid[nr]?.[nc]===0&&!seen.has(key)){seen.add(key);queue.push([nr,nc]);}}assert.strictEqual(open,size*size*2-1);assert.strictEqual(seen.size,open);}

console.log("全部測試通過：網站架構、共用玩家、共用中注音文字、相對路徑與迷宮既有功能均符合要求。");
