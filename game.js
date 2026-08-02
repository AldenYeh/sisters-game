(() => {
  "use strict";

  const STORAGE_KEY = "mazeAdventureRecordsV1";
  const PLAYERS = Object.freeze({ sister: "姊姊", youngerSister: "妹妹" });
  const DIFFICULTIES = Object.freeze({
    easy: { label: "簡單", size: 7, minPath: 20 },
    normal: { label: "普通", size: 11, minPath: 48 },
    hard: { label: "困難", size: 15, minPath: 85 }
  });
  const DIRECTIONS = Object.freeze({ up: [-1, 0], down: [1, 0], left: [0, -1], right: [0, 1] });
  const KEY_DIRECTIONS = Object.freeze({ ArrowUp: "up", ArrowDown: "down", ArrowLeft: "left", ArrowRight: "right" });

  const elements = {
    screens: { home: byId("home-screen"), game: byId("game-screen"), records: byId("records-screen") },
    start: byId("start-game"), reminder: byId("player-reminder"), maze: byId("maze"), status: byId("status"),
    currentPlayer: byId("current-player"), currentDifficulty: byId("current-difficulty"), timer: byId("timer"),
    togglePath: byId("toggle-path"), winPanel: byId("win-panel"), winDetails: byId("win-details"),
    newRecord: byId("new-record"), recordsBody: byId("records-body")
  };

  const gameState = {
    page: "home", playerId: null, difficultyId: "easy", maze: [], mazeSnapshot: [],
    start: null, goal: null, playerPosition: null, visited: new Set(), showPath: true,
    completed: false, moveLocked: false, timerStartedAt: null, elapsedMs: 0,
    timerId: null, records: loadRecords(), lastPathLength: 0,
    swipe: { pointerId: null, startX: 0, startY: 0 }
  };

  function byId(id) { return document.getElementById(id); }
  function cellKey(row, col) { return `${row},${col}`; }

  function createEmptyRecords() {
    const records = { version: 1, players: {} };
    Object.keys(PLAYERS).forEach(playerId => {
      records.players[playerId] = {};
      Object.keys(DIFFICULTIES).forEach(difficultyId => {
        records.players[playerId][difficultyId] = { completions: 0, bestMs: null };
      });
    });
    return records;
  }

  function normalizeRecords(value) {
    const safe = createEmptyRecords();
    if (!value || typeof value !== "object" || !value.players || typeof value.players !== "object") return safe;
    Object.keys(PLAYERS).forEach(playerId => {
      Object.keys(DIFFICULTIES).forEach(difficultyId => {
        const item = value.players?.[playerId]?.[difficultyId];
        if (!item || typeof item !== "object") return;
        const completions = Number(item.completions);
        const bestMs = item.bestMs === null ? null : Number(item.bestMs);
        safe.players[playerId][difficultyId] = {
          completions: Number.isInteger(completions) && completions >= 0 ? completions : 0,
          bestMs: Number.isFinite(bestMs) && bestMs >= 0 ? Math.round(bestMs) : null
        };
      });
    });
    return safe;
  }

  function loadRecords() {
    try { return normalizeRecords(JSON.parse(localStorage.getItem(STORAGE_KEY))); }
    catch (_) { return createEmptyRecords(); }
  }

  function saveRecords() {
    gameState.records = normalizeRecords(gameState.records);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState.records)); return true; }
    catch (_) { return false; }
  }

  function updateRecords(elapsedMs) {
    const record = gameState.records.players[gameState.playerId][gameState.difficultyId];
    const isNewBest = record.bestMs === null || elapsedMs < record.bestMs;
    record.completions += 1;
    if (isNewBest) record.bestMs = elapsedMs;
    saveRecords();
    return { isNewBest, completions: record.completions };
  }

  function setPage(page) {
    gameState.page = page;
    Object.entries(elements.screens).forEach(([name, screen]) => { screen.hidden = name !== page; });
  }

  function showHome() {
    stopTimer();
    setPage("home");
    elements.winPanel.hidden = true;
    updateHomeSelection();
  }

  function goHome() {
    stopTimer();
    gameState.completed = false;
    showHome();
  }

  function selectPlayer(playerId) {
    if (!PLAYERS[playerId]) return;
    gameState.playerId = playerId;
    updateHomeSelection();
  }

  function selectDifficulty(difficultyId) {
    if (!DIFFICULTIES[difficultyId]) return;
    gameState.difficultyId = difficultyId;
    updateHomeSelection();
  }

  function updateHomeSelection() {
    document.querySelectorAll(".player-choice").forEach(button => {
      const selected = button.dataset.player === gameState.playerId;
      button.classList.toggle("selected", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    document.querySelectorAll(".difficulty-choice").forEach(button => {
      const selected = button.dataset.difficulty === gameState.difficultyId;
      button.classList.toggle("selected", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    elements.start.disabled = !gameState.playerId;
    elements.reminder.textContent = gameState.playerId ? `準備好了，${PLAYERS[gameState.playerId]}！` : "請先選擇玩家";
  }

  function makeGrid(logicalSize) {
    const side = logicalSize * 2 + 1;
    const grid = Array.from({ length: side }, () => Array(side).fill(1));
    const visited = Array.from({ length: logicalSize }, () => Array(logicalSize).fill(false));
    const stack = [[0, 0]];
    visited[0][0] = true;
    grid[1][1] = 0;
    const steps = [[-1, 0], [1, 0], [0, -1], [0, 1]];

    while (stack.length) {
      const [row, col] = stack[stack.length - 1];
      const choices = steps.map(([dr, dc]) => [row + dr, col + dc, dr, dc])
        .filter(([nr, nc]) => nr >= 0 && nr < logicalSize && nc >= 0 && nc < logicalSize && !visited[nr][nc]);
      if (!choices.length) { stack.pop(); continue; }
      const [nextRow, nextCol, dr, dc] = choices[Math.floor(Math.random() * choices.length)];
      visited[nextRow][nextCol] = true;
      grid[row * 2 + 1 + dr][col * 2 + 1 + dc] = 0;
      grid[nextRow * 2 + 1][nextCol * 2 + 1] = 0;
      stack.push([nextRow, nextCol]);
    }
    return grid;
  }

  function bfs(grid, start) {
    const queue = [start];
    const distances = new Map([[cellKey(start.row, start.col), 0]]);
    let farthest = start;
    for (let index = 0; index < queue.length; index += 1) {
      const current = queue[index];
      const distance = distances.get(cellKey(current.row, current.col));
      if (distance > distances.get(cellKey(farthest.row, farthest.col))) farthest = current;
      Object.values(DIRECTIONS).forEach(([dr, dc]) => {
        const row = current.row + dr;
        const col = current.col + dc;
        const key = cellKey(row, col);
        if (grid[row]?.[col] === 0 && !distances.has(key)) {
          distances.set(key, distance + 1);
          queue.push({ row, col });
        }
      });
    }
    return { distances, farthest, distance: distances.get(cellKey(farthest.row, farthest.col)) };
  }

  function generateAndValidateMaze(difficultyId) {
    const config = DIFFICULTIES[difficultyId];
    const start = { row: 1, col: 1 };
    let best = null;
    for (let attempt = 0; attempt < 14; attempt += 1) {
      const grid = makeGrid(config.size);
      const result = bfs(grid, start);
      const candidate = { grid, start, goal: { ...result.farthest }, pathLength: result.distance };
      if (!best || candidate.pathLength > best.pathLength) best = candidate;
      if (candidate.pathLength >= config.minPath && result.distances.has(cellKey(candidate.goal.row, candidate.goal.col))) return candidate;
    }
    return best;
  }

  function startGame(options = {}) {
    if (!gameState.playerId) { updateHomeSelection(); return false; }
    stopTimer();
    const generated = generateAndValidateMaze(gameState.difficultyId);
    gameState.maze = generated.grid;
    gameState.mazeSnapshot = generated.grid.map(row => [...row]);
    gameState.start = { ...generated.start };
    gameState.goal = { ...generated.goal };
    gameState.playerPosition = { ...generated.start };
    gameState.lastPathLength = generated.pathLength;
    gameState.visited = new Set([cellKey(generated.start.row, generated.start.col)]);
    gameState.completed = false;
    gameState.moveLocked = false;
    setTouchControlsDisabled(false);
    elements.winPanel.hidden = true;
    elements.currentPlayer.textContent = `玩家：${PLAYERS[gameState.playerId]}`;
    elements.currentDifficulty.textContent = `難度：${DIFFICULTIES[gameState.difficultyId].label}`;
    elements.status.textContent = options.replay ? "新的迷宮，出發！" : "兔兔準備好了！";
    setPage("game");
    renderMaze();
    startTimer();
    return true;
  }

  function restartGame() {
    if (!gameState.mazeSnapshot.length) return;
    stopTimer();
    gameState.maze = gameState.mazeSnapshot.map(row => [...row]);
    gameState.playerPosition = { ...gameState.start };
    gameState.visited = new Set([cellKey(gameState.start.row, gameState.start.col)]);
    gameState.completed = false;
    gameState.moveLocked = false;
    setTouchControlsDisabled(false);
    elements.winPanel.hidden = true;
    elements.status.textContent = "重新出發！";
    renderMaze();
    startTimer();
  }

  function isWalkable(row, col) { return Number.isInteger(row) && Number.isInteger(col) && gameState.maze[row]?.[col] === 0; }

  function makeToken(symbol, className, label) {
    const token = document.createElement("span");
    token.className = `token ${className}`;
    token.textContent = symbol;
    token.setAttribute("role", "img");
    token.setAttribute("aria-label", label);
    return token;
  }

  function renderMaze() {
    const rows = gameState.maze.length;
    const cols = gameState.maze[0]?.length || 0;
    document.documentElement.style.setProperty("--maze-rows", rows);
    document.documentElement.style.setProperty("--maze-cols", cols);
    const fragment = document.createDocumentFragment();
    gameState.maze.forEach((line, row) => {
      line.forEach((tile, col) => {
        const cell = document.createElement("div");
        const isGoal = row === gameState.goal.row && col === gameState.goal.col;
        const isPlayer = row === gameState.playerPosition.row && col === gameState.playerPosition.col;
        const wasVisited = gameState.showPath && gameState.visited.has(cellKey(row, col)) && !isGoal && !isPlayer;
        cell.className = `cell ${tile === 1 ? "wall" : "path"}${isGoal ? " goal" : ""}${wasVisited ? " visited" : ""}`;
        cell.setAttribute("role", "gridcell");
        if (tile === 1) cell.setAttribute("aria-label", "牆壁");
        if (isGoal) cell.append(makeToken("🥕", "goal-token", "胡蘿蔔終點"));
        if (isPlayer) cell.append(makeToken("🐰", "player", "玩家兔兔"));
        fragment.append(cell);
      });
    });
    elements.maze.replaceChildren(fragment);
    elements.togglePath.setAttribute("aria-pressed", String(gameState.showPath));
    elements.togglePath.textContent = gameState.showPath ? "隱藏路徑" : "顯示路徑";
  }

  function movePlayer(direction) {
    if (gameState.page !== "game" || gameState.completed || gameState.moveLocked || !DIRECTIONS[direction]) return false;
    gameState.moveLocked = true;
    const [dr, dc] = DIRECTIONS[direction];
    const row = gameState.playerPosition.row + dr;
    const col = gameState.playerPosition.col + dc;
    if (isWalkable(row, col)) {
      gameState.playerPosition = { row, col };
      gameState.visited.add(cellKey(row, col));
      elements.status.textContent = "繼續找胡蘿蔔！";
      renderMaze();
      if (row === gameState.goal.row && col === gameState.goal.col) handleWin();
    } else {
      elements.status.textContent = "前面是牆，換個方向！";
    }
    requestAnimationFrame(() => { gameState.moveLocked = false; });
    return true;
  }

  function togglePathDisplay() {
    gameState.showPath = !gameState.showPath;
    renderMaze();
  }

  function setTouchControlsDisabled(disabled) {
    document.querySelectorAll(".touch-direction").forEach(button => { button.disabled = disabled; });
  }

  function handleSwipeStart(event) {
    if (gameState.page !== "game" || gameState.completed || event.target.closest("button")) return;
    gameState.swipe = { pointerId: event.pointerId, startX: event.clientX, startY: event.clientY };
    if (event.currentTarget.setPointerCapture) event.currentTarget.setPointerCapture(event.pointerId);
    event.preventDefault();
  }

  function handleSwipeEnd(event) {
    if (gameState.swipe.pointerId !== event.pointerId) return;
    const deltaX = event.clientX - gameState.swipe.startX;
    const deltaY = event.clientY - gameState.swipe.startY;
    gameState.swipe.pointerId = null;
    const distance = Math.hypot(deltaX, deltaY);
    if (distance < 28 || gameState.completed) return;
    const direction = Math.abs(deltaX) > Math.abs(deltaY)
      ? (deltaX > 0 ? "right" : "left")
      : (deltaY > 0 ? "down" : "up");
    event.preventDefault();
    movePlayer(direction);
  }

  function cancelSwipe(event) {
    if (gameState.swipe.pointerId === event.pointerId) gameState.swipe.pointerId = null;
  }

  function startTimer() {
    stopTimer();
    gameState.elapsedMs = 0;
    gameState.timerStartedAt = Date.now();
    updateTimer();
    gameState.timerId = window.setInterval(updateTimer, 250);
  }

  function updateTimer() {
    if (gameState.timerStartedAt !== null) gameState.elapsedMs = Date.now() - gameState.timerStartedAt;
    elements.timer.textContent = formatTime(gameState.elapsedMs);
    elements.timer.dateTime = `PT${Math.floor(gameState.elapsedMs / 1000)}S`;
  }

  function stopTimer() {
    if (gameState.timerStartedAt !== null) gameState.elapsedMs = Date.now() - gameState.timerStartedAt;
    gameState.timerStartedAt = null;
    if (gameState.timerId !== null) window.clearInterval(gameState.timerId);
    gameState.timerId = null;
    if (elements.timer) elements.timer.textContent = formatTime(gameState.elapsedMs);
  }

  function formatTime(milliseconds) {
    const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  function handleWin() {
    if (gameState.completed) return;
    gameState.completed = true;
    setTouchControlsDisabled(true);
    stopTimer();
    const result = updateRecords(gameState.elapsedMs);
    const playerName = PLAYERS[gameState.playerId];
    const difficultyName = DIFFICULTIES[gameState.difficultyId].label;
    elements.status.textContent = "恭喜！兔兔找到胡蘿蔔了！";
    elements.winDetails.innerHTML = `<p>玩家：${playerName}</p><p>難度：${difficultyName}</p><p>完成時間：${formatTime(gameState.elapsedMs)}</p><p>累計完成：${result.completions} 次</p>`;
    elements.newRecord.hidden = !result.isNewBest;
    elements.winPanel.hidden = false;
    byId("play-again").focus();
  }

  function showScoreboard() {
    stopTimer();
    gameState.records = loadRecords();
    elements.recordsBody.replaceChildren();
    Object.entries(PLAYERS).forEach(([playerId, playerName]) => {
      Object.entries(DIFFICULTIES).forEach(([difficultyId, config]) => {
        const record = gameState.records.players[playerId][difficultyId];
        const row = document.createElement("tr");
        [playerName, config.label, `${record.completions} 次`, record.bestMs === null ? "尚無紀錄" : formatTime(record.bestMs)]
          .forEach(value => { const cell = document.createElement("td"); cell.textContent = value; row.append(cell); });
        elements.recordsBody.append(row);
      });
    });
    byId("clear-confirm").hidden = true;
    setPage("records");
  }

  function requestClearRecords() {
    byId("clear-confirm").hidden = false;
    byId("cancel-clear").focus();
  }

  function cancelClearRecords() {
    byId("clear-confirm").hidden = true;
    byId("clear-records").focus();
  }

  function clearRecords() {
    gameState.records = createEmptyRecords();
    saveRecords();
    showScoreboard();
    return true;
  }

  document.querySelectorAll(".player-choice").forEach(button => button.addEventListener("click", () => selectPlayer(button.dataset.player)));
  document.querySelectorAll(".difficulty-choice").forEach(button => button.addEventListener("click", () => selectDifficulty(button.dataset.difficulty)));
  elements.start.addEventListener("click", () => startGame());
  byId("show-records").addEventListener("click", showScoreboard);
  byId("home-from-game").addEventListener("click", goHome);
  byId("home-from-win").addEventListener("click", goHome);
  byId("records-home").addEventListener("click", showHome);
  byId("restart").addEventListener("click", restartGame);
  byId("play-again").addEventListener("click", () => startGame({ replay: true }));
  elements.togglePath.addEventListener("click", togglePathDisplay);
  byId("clear-records").addEventListener("click", requestClearRecords);
  byId("cancel-clear").addEventListener("click", cancelClearRecords);
  byId("confirm-clear").addEventListener("click", clearRecords);
  document.querySelectorAll(".touch-direction").forEach(button => {
    button.addEventListener("click", event => {
      event.preventDefault();
      movePlayer(button.dataset.move);
    });
  });
  byId("maze-wrap").addEventListener("pointerdown", handleSwipeStart, { passive: false });
  byId("maze-wrap").addEventListener("pointerup", handleSwipeEnd, { passive: false });
  byId("maze-wrap").addEventListener("pointercancel", cancelSwipe);

  document.addEventListener("keydown", event => {
    const direction = KEY_DIRECTIONS[event.key];
    if (!direction) return;
    event.preventDefault();
    movePlayer(direction);
  }, { passive: false });

  window.MazeGame = Object.freeze({
    startGame, restartGame, goHome, selectPlayer, selectDifficulty, move: movePlayer,
    togglePath: togglePathDisplay, generateMaze: generateAndValidateMaze, bfs,
    showRecords: showScoreboard, requestClearRecords, clearRecords, loadRecords, updateRecords,
    handleSwipeStart, handleSwipeEnd,
    getState: () => ({ ...gameState, maze: gameState.maze.map(row => [...row]), visited: [...gameState.visited] }),
    constants: { PLAYERS, DIFFICULTIES, STORAGE_KEY }
  });

  showHome();
})();
