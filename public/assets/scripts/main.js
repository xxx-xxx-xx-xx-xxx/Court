/* hardening.js — drop‑in, self‑executing */
(() => {
    const stop = e => {             // short helper
      e.preventDefault();
      e.stopPropagation();
      return false;
    };
  
    /* Block DevTools / view‑source hotkeys */
    const keyGuard = e => {
      const k = e.key.toLowerCase();
      const cmd = e.ctrlKey || e.metaKey;
  
      if (
        k === "f12" ||                              // F12
        (cmd && ["u", "s", "p"].includes(k)) ||     // ⌘/Ctrl + U,S,P
        (cmd && e.shiftKey && ["i", "c", "j"].includes(k)) // +Shift + I,C,J
      ) stop(e);
    };
  
    /* Capture phase, non‑passive (so we can preventDefault) */
    const opts = { capture: true, passive: false };
  
    ["contextmenu", "dragstart", "copy"].forEach(ev =>
      addEventListener(ev, stop, opts)
    );
    addEventListener("keydown", keyGuard, opts);
  })();
  