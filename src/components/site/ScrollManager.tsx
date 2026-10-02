import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scroll and focus handling for client-side navigation:
 * a new page starts at the top with focus on <main>; a URL with a #hash scrolls to that element
 * (retrying briefly, because pages are loaded lazily).
 */
export function ScrollManager() {
  const { pathname, hash } = useLocation();
  const first = useRef(true);

  useEffect(() => {
    const isFirst = first.current;
    first.current = false;

    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      let tries = 0;
      let timer: number | undefined;
      const attempt = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ block: "start" });
          return;
        }
        if (tries++ < 20) timer = window.setTimeout(attempt, 60);
      };
      attempt();
      return () => window.clearTimeout(timer);
    }
    if (isFirst) return;
    window.scrollTo(0, 0);
    document.getElementById("main")?.focus({ preventScroll: true });
  }, [pathname, hash]);

  return null;
}
