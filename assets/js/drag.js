(() => {
  "use strict";
  function track(el, handlers) {
    el.addEventListener("pointerdown", (ev) => {
      if (ev.button != null && ev.button !== 0) return;
      ev.preventDefault();
      el.setPointerCapture(ev.pointerId);
      const start = { x: ev.clientX, y: ev.clientY, id: ev.pointerId };
      handlers.start && handlers.start(ev, start);
      function move(e) {
        if (e.pointerId !== start.id) return;
        handlers.move && handlers.move(e, { x: e.clientX - start.x, y: e.clientY - start.y });
      }
      function up(e) {
        if (e.pointerId !== start.id) return;
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerup", up);
        el.removeEventListener("pointercancel", up);
        handlers.end && handlers.end(e, { x: e.clientX - start.x, y: e.clientY - start.y });
      }
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerup", up);
      el.addEventListener("pointercancel", up);
    });
  }
  window.SistersDrag = { track };
})();
