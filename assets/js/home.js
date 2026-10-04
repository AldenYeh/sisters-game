(() => {
  "use strict";
  const content = window.SISTERS_CONTENT;
  const ui = window.SistersShared;
  const screens = {
    player: document.getElementById("player-screen"),
    category: document.getElementById("category-screen"),
    games: document.getElementById("games-screen")
  };
  let currentPlayer = ui.loadPlayer();
  let currentCategory = null;

  function setPage(page) {
    Object.entries(screens).forEach(([name, element]) => { element.hidden = name !== page; });
    history.replaceState(null, "", page === "player" ? location.pathname : `#${page}${currentCategory ? `/${currentCategory}` : ""}`);
    const heading = screens[page].querySelector("h1, h2");
    if (heading) heading.focus({ preventScroll: true });
  }

  function setPlayerBadge(element) {
    element.replaceChildren(
      ui.makeReading(content.site.currentPlayer, { compact: true }),
      document.createTextNode("："),
      ui.makeReading(content.players[currentPlayer].name, { compact: true })
    );
  }

  function configureText() {
    document.title = content.site.title.zh;
    ui.setReading(document.getElementById("site-title"), content.site.title);
    ui.setReading(document.getElementById("player-title"), content.site.choosePlayer);
    ui.setReading(document.getElementById("category-title"), content.site.today);
    ui.setReading(document.getElementById("games-title"), content.site.chooseGame);
    ui.setReading(document.getElementById("back-to-players"), content.common.backToPlayers, { icon: "←", compact: true });
    ui.setReading(document.getElementById("back-to-categories"), content.common.backToCategories, { icon: "←", compact: true });
  }

  function renderPlayers() {
    const list = document.getElementById("player-list");
    list.replaceChildren();
    Object.values(content.players).forEach(player => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `hub-player player-${player.id}`;
      button.dataset.player = player.id;
      button.setAttribute("aria-pressed", String(player.id === currentPlayer));
      button.classList.toggle("selected", player.id === currentPlayer);
      button.append(ui.makeReading(player.name, { icon: player.icon }));
      button.addEventListener("click", () => selectPlayer(player.id));
      list.append(button);
    });
    const status = document.getElementById("player-status");
    status.replaceChildren();
    if (!currentPlayer) status.append(ui.makeReading(content.site.choosePlayerFirst, { compact: true }));
    else status.append(ui.makeReading(content.site.currentPlayer, { compact: true }), document.createTextNode("："), ui.makeReading(content.players[currentPlayer].name, { compact: true }));
  }

  function selectPlayer(id) {
    if (!content.players[id]) return;
    currentPlayer = id;
    ui.savePlayer(id);
    renderPlayers();
    renderCategories();
    setPlayerBadge(document.getElementById("category-player"));
    setPage("category");
  }

  function makeState(text) {
    const state = document.createElement("span");
    state.className = "choice-state";
    state.append(ui.makeReading(text, { compact: true }));
    return state;
  }

  function renderCategories() {
    const list = document.getElementById("category-list");
    list.replaceChildren();
    content.categories.forEach(category => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `choice-card category-${category.id}`;
      button.disabled = !category.available;
      button.append(ui.makeReading(category.name, { icon: category.icon }), makeState(category.available ? content.site.available : content.site.developing));
      if (category.available) button.addEventListener("click", () => showGames(category.id));
      list.append(button);
    });
  }

  function showGames(categoryId) {
    const category = content.categories.find(item => item.id === categoryId && item.available);
    if (!category || !currentPlayer) return;
    currentCategory = category.id;
    setPlayerBadge(document.getElementById("games-player"));
    const list = document.getElementById("game-list");
    list.replaceChildren();
    category.games.forEach(game => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `choice-card game-${game.id}`;
      button.disabled = !game.available;
      button.append(ui.makeReading(game.name, { icon: game.icon }), makeState(game.available ? content.site.available : content.site.developing));
      if (game.how) { const how = document.createElement("span"); how.className = "game-how"; how.textContent = game.how; button.append(how); }
      if (game.available) button.addEventListener("click", () => { window.location.href = game.href; });
      list.append(button);
    });
    setPage("games");
  }

  function showPlayers() { currentCategory = null; setPage("player"); }
  function showCategories() { currentCategory = null; setPlayerBadge(document.getElementById("category-player")); setPage("category"); }
  document.getElementById("back-to-players").addEventListener("click", showPlayers);
  document.getElementById("back-to-categories").addEventListener("click", showCategories);

  configureText();
  renderPlayers();
  renderCategories();
  if (location.hash.startsWith("#games/logic") && currentPlayer) showGames("logic");
  else if (location.hash.startsWith("#category") && currentPlayer) showCategories();
  else showPlayers();
})();
