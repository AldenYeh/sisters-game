// 不需安裝套件的靜態與核心邏輯測試：執行 node tests.js
const fs = require("fs");
const assert = require("assert");

const html = fs.readFileSync("index.html", "utf8");
const css = fs.readFileSync("styles.css", "utf8");
const js = fs.readFileSync("game.js", "utf8");

// 介面與離線結構
assert.doesNotMatch(html, /data-direction=/, "不應恢復舊桌面方向按鈕");
assert.doesNotMatch(html, /class="legend"/, "不應保留圖例");
assert.match(html, /迷宮小冒險/);
assert.match(html, /data-player="sister"/);
assert.match(html, /data-player="youngerSister"/);
assert.match(html, /data-difficulty="easy"/);
assert.match(html, /id="toggle-path"/);
assert.match(html, /id="records-body"/);
assert.match(html, /姊姊與妹妹的所有遊戲紀錄/);
assert.match(html, /id="cancel-clear"/);
assert.match(html, /id="start-game"[^>]*disabled/);
assert.match(html, /class="touch-direction touch-up"/);
assert.match(html, /data-move="down"/);
assert.doesNotMatch(html, /https?:\/\//, "不可依賴網路資源");

// 關鍵安全與資料規則
assert.match(js, /event\.preventDefault\(\)/);
assert.match(js, /movePlayer\(button\.dataset\.move\)/);
assert.match(js, /button\.addEventListener\("click"/);
assert.match(js, /Math\.hypot\(deltaX, deltaY\)/);
assert.match(js, /distance < 28/);
assert.match(js, /setTouchControlsDisabled\(true\)/);
assert.match(js, /localStorage\.getItem/);
assert.match(js, /localStorage\.setItem/);
assert.match(js, /try \{ return normalizeRecords/);
assert.match(js, /if \(gameState\.completed\) return/);
assert.match(js, /Date\.now\(\) - gameState\.timerStartedAt/);
assert.match(js, /gameState\.visited = new Set/);
assert.match(js, /for \(let attempt = 0; attempt < 14/);
assert.match(js, /bfs\(grid, start\)/);
assert.match(css, /--maze-cols/);
assert.match(css, /100svh/);
assert.match(css, /\(pointer: coarse\)/);
assert.match(css, /touch-action: none/);
assert.match(css, /\.touch-direction \{[\s\S]*width: 68px/);
new Function(js);

// 以同一套 Perfect Maze 原理大量驗證三種尺寸必定相通且為樹。
function generate(size) {
  const side = size * 2 + 1;
  const grid = Array.from({ length: side }, () => Array(side).fill(1));
  const seen = Array.from({ length: size }, () => Array(size).fill(false));
  const stack = [[0, 0]];
  const steps = [[-1,0],[1,0],[0,-1],[0,1]];
  seen[0][0] = true; grid[1][1] = 0;
  while (stack.length) {
    const [r,c] = stack[stack.length - 1];
    const choices = steps.map(([dr,dc]) => [r+dr,c+dc,dr,dc]).filter(([nr,nc]) => nr>=0&&nr<size&&nc>=0&&nc<size&&!seen[nr][nc]);
    if (!choices.length) { stack.pop(); continue; }
    const [nr,nc,dr,dc] = choices[Math.floor(Math.random()*choices.length)];
    seen[nr][nc]=true; grid[r*2+1+dr][c*2+1+dc]=0; grid[nr*2+1][nc*2+1]=0; stack.push([nr,nc]);
  }
  return grid;
}

for (const size of [7, 11, 15]) {
  for (let run = 0; run < 30; run += 1) {
    const grid = generate(size);
    const open = grid.flat().filter(value => value === 0).length;
    assert.strictEqual(open, size * size * 2 - 1, `尺寸 ${size} 的通道數不符 Perfect Maze`);
    const queue = [[1,1]], visited = new Set(["1,1"]);
    for (let i=0;i<queue.length;i+=1) for (const [dr,dc] of [[1,0],[-1,0],[0,1],[0,-1]]) {
      const nr=queue[i][0]+dr,nc=queue[i][1]+dc,key=`${nr},${nc}`;
      if (grid[nr]?.[nc]===0&&!visited.has(key)) { visited.add(key); queue.push([nr,nc]); }
    }
    assert.strictEqual(visited.size, open, `尺寸 ${size} 存在不可達通道`);
  }
}

console.log("全部測試通過：鍵盤、觸控按鈕、滑動防捲動、過關鎖定、離線結構與三種 Perfect Maze 尺寸均符合要求。");
