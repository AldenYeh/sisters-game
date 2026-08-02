// 不需安裝套件的靜態完整性測試：執行 node tests.js
const fs = require("fs");
const assert = require("assert");

const html = fs.readFileSync("index.html", "utf8");
const css = fs.readFileSync("styles.css", "utf8");
const js = fs.readFileSync("game.js", "utf8");

assert.match(html, /data-direction="up"/);
assert.match(html, /aria-live="polite"/);
assert.match(css, /width:\s*76px/);
assert.match(css, /gap:\s*12px/);
assert.match(css, /overflow:\s*hidden/);
assert.match(css, /@media \(max-width: 820px\)/);
assert.match(js, /event\.preventDefault\(\)/);
assert.match(js, /if \(won \|\| moveLocked/);
assert.match(js, /moveButtons\.forEach\(button => \{ button\.disabled = true/);
assert.match(js, /layout\[row\]\[col\] === "0"/);
new Function(js);
console.log("全部靜態測試通過。離線資源、控制鍵、響應式樣式及移動安全機制均存在。");
