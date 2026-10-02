import type { AnchorHTMLAttributes } from "react";

interface AnchorLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  /** Id of the element on the current page. */
  target: string;
}

/**
 * Link to a section of the current page. It scrolls with JavaScript instead of changing the URL hash,
 * so it works the same under the browser router and under the hash router used for static previews.
 */
export function AnchorLink({ target, onClick, children, ...props }: AnchorLinkProps) {
  return (
    <a
      href={`#${target}`}
      onClick={(e) => {
        onClick?.(e);
        const el = document.getElementById(target);
        if (!el) return;
        e.preventDefault();
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        el.scrollIntoView({ block: "start", behavior: reduce ? "auto" : "smooth" });
        if (el.tabIndex >= -1 && el.hasAttribute("tabindex")) el.focus({ preventScroll: true });
      }}
      {...props}
    >
      {children}
    </a>
  );
}
