import { useCallback, useRef } from "react";

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

  const remember = useCallback(() => {
    opener.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    openedAt.current = window.location.href;
  }, []);

  const restore = useCallback((event: Event) => {
    const navigated = window.location.href !== openedAt.current;
    const target = navigated ? document.getElementById("main") : opener.current;
    if (!target || !target.isConnected || target === document.body) return;
    event.preventDefault();
    target.focus({ preventScroll: navigated });
  }, []);

  return { remember, restore };
}
