import { useCallback, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * Puts keyboard focus in the right place when an overlay closes.
 *
 * Radix dialogs restore focus to their own <Trigger>. The overlays on this site are opened from several
 * places (header button, product pages, keyboard shortcut), so there is no single trigger: call `remember()`
 * just before opening and pass `restore` to the content's `onCloseAutoFocus`.
 *
 * If the visitor followed a link inside the overlay, focus goes to the new page's <main> instead of back
 * to the control that opened the overlay.
 */
export function useFocusReturn() {
  const opener = useRef<HTMLElement | null>(null);
  const openedAt = useRef("");

  /*
    "Where the visitor is" has two signals, and either can move first: the address bar changes at once
    while a lazily loaded page is still on its way, and it never changes under a memory router
    (the preview build). The rendered route covers that case.
  */
  const { key } = useLocation();
  const route = useRef(key);
  useEffect(() => {
    route.current = key;
  }, [key]);
  const here = useCallback(() => `${route.current} ${window.location.href}`, []);

  const remember = useCallback(() => {
    opener.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    openedAt.current = here();
  }, [here]);

  const restore = useCallback(
    (event: Event) => {
      const navigated = here() !== openedAt.current;
      const target = navigated ? document.getElementById("main") : opener.current;
      if (!target || !target.isConnected || target === document.body) return;
      event.preventDefault();
      // Never scroll: the opener is where the visitor left it, and a new page has already been positioned.
      target.focus({ preventScroll: true });
    },
    [here],
  );

  return { remember, restore };
}
