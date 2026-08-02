(() => {
  "use strict";

  // 0 是通道，1 是牆。固定關卡讓遊戲可完全離線且每次都有解。
  const layout = [
    "111111111111111",
    "100000100000001",
    "101110101111101",
    "101000100000101",
    "101011111110101",
    "101000000010101",
    "101111101010101",
    "100000001000001",
    "111111111111111"
  ];
  const start = Object.freeze({ row: 1, col: 1 });
  const goal = Object.freeze({ row: 7, col: 13 });
  const directions = Object.freeze({
    up: [-1, 0], down: [1, 0], left: [0, -1], right: [0, 1]
  });
  const keyDirections = Object.freeze({
    ArrowUp: "up", ArrowDown: "down", ArrowLeft: "left", ArrowRight: "right"
  });

  const maze = document.querySelector("#maze");
  const status = document.querySelector("#status");
  const winPanel = document.querySelector("#win-panel");
  const moveButtons = [...document.querySelectorAll(".move-button")];
  let player = { ...start };
  let won = false;
  let moveLocked = false;

  function isWalkable(row, col) {
    return Number.isInteger(row) && Number.isInteger(col) &&
      row >= 0 && row < layout.length && col >= 0 && col < layout[0].length &&
      layout[row][col] === "0";
  }

  function render() {
    const fragment = document.createDocumentFragment();
    layout.forEach((line, row) => {
      [...line].forEach((tile, col) => {
        const cell = document.createElement("div");
        const isGoal = row === goal.row && col === goal.col;
        cell.className = `cell ${tile === "1" ? "wall" : "path"}${isGoal ? " goal" : ""}`;
        cell.setAttribute("role", "gridcell");
        if (tile === "1") cell.setAttribute("aria-label", "牆壁");

        if (isGoal) cell.append(makeToken("🥕", "goal-token", "胡蘿蔔終點"));
        if (row === player.row && col === player.col) cell.append(makeToken("🐰", "player", "玩家兔兔"));
        fragment.append(cell);
      });
    });
    maze.replaceChildren(fragment);
  }

  function makeToken(symbol, className, label) {
    const token = document.createElement("span");
    token.className = `token ${className}`;
    token.textContent = symbol;
    token.setAttribute("role", "img");
    token.setAttribute("aria-label", label);
    return token;
  }

  function move(direction) {
    if (won || moveLocked || !directions[direction]) return false;
    moveLocked = true;
    const [rowChange, colChange] = directions[direction];
    const nextRow = player.row + rowChange;
    const nextCol = player.col + colChange;

    if (isWalkable(nextRow, nextCol)) {
      player = { row: nextRow, col: nextCol };
      status.textContent = "走得很好，繼續找胡蘿蔔！";
      render();
      if (player.row === goal.row && player.col === goal.col) finishGame();
    } else {
      status.textContent = "前面是牆，換個方向試試看！";
    }

    // 每次事件只處理一格；下一個畫面才接受下一步，避免同幀連點造成狀態錯亂。
    requestAnimationFrame(() => { moveLocked = false; });
    return true;
  }

  function finishGame() {
    won = true;
    moveButtons.forEach(button => { button.disabled = true; });
    status.textContent = "恭喜！兔兔找到胡蘿蔔了！";
    winPanel.hidden = false;
    document.querySelector("#play-again").focus();
  }

  function resetGame() {
    player = { ...start };
    won = false;
    moveLocked = false;
    winPanel.hidden = true;
    moveButtons.forEach(button => { button.disabled = false; });
    status.textContent = "兔兔準備好了！";
    render();
  }

  document.addEventListener("keydown", event => {
    const direction = keyDirections[event.key];
    if (!direction) return;
    event.preventDefault();
    move(direction);
  }, { passive: false });

  moveButtons.forEach(button => {
    button.addEventListener("pointerdown", event => {
      event.preventDefault();
      move(button.dataset.direction);
    });
  });
  document.querySelector("#restart").addEventListener("click", resetGame);
  document.querySelector("#play-again").addEventListener("click", resetGame);

  window.MazeGame = Object.freeze({ move, reset: resetGame, isWalkable, getState: () => ({ ...player, won }) });
  render();
})();
