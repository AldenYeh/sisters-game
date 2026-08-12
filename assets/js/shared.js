(() => {
  "use strict";
  const PLAYER_KEY = "sistersPuzzleCurrentPlayerV1";

  function makeReading(text, options = {}) {
    const wrapper = document.createElement(options.block ? "span" : "span");
    wrapper.className = `reading${options.compact ? " compact" : ""}`;
    if (options.icon) {
      const icon = document.createElement("span");
      icon.className = "reading-icon";
      icon.setAttribute("aria-hidden", "true");
      icon.textContent = options.icon;
      wrapper.append(icon);
    }
    const words = document.createElement("span");
    words.className = "reading-words";
    const zh = document.createElement("span");
    zh.className = "reading-zh";
    zh.textContent = text.zh;
    const bopomofo = document.createElement("small");
    bopomofo.className = "reading-bopomofo";
    bopomofo.textContent = text.bopomofo;
    words.append(zh, bopomofo);
    wrapper.append(words);
    return wrapper;
  }

  function setReading(element, text, options = {}) {
    element.replaceChildren(makeReading(text, options));
    return element;
  }

  function loadPlayer() {
    try {
      const id = localStorage.getItem(PLAYER_KEY);
      return window.SISTERS_CONTENT.players[id] ? id : null;
    } catch (_) { return null; }
  }

  function savePlayer(id) {
    if (!window.SISTERS_CONTENT.players[id]) return false;
    try { localStorage.setItem(PLAYER_KEY, id); return true; }
    catch (_) { return false; }
  }

  window.SistersShared = Object.freeze({ PLAYER_KEY, makeReading, setReading, loadPlayer, savePlayer });
})();
