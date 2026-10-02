import { Fragment } from "react";

/**
 * Renders scientific notation written as plain text: `^{…}` becomes a superscript and `_{…}` a subscript.
 * "0.18–0.25 mmol H^{+}/mL" → 0.18–0.25 mmol H⁺/mL, typeset with real <sup>/<sub> elements.
 */
export function Sci({ children }: { children: string }) {
  const parts = children.split(/(\^\{[^}]*\}|_\{[^}]*\})/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("^{")) return <sup key={i}>{part.slice(2, -1)}</sup>;
        if (part.startsWith("_{")) return <sub key={i}>{part.slice(2, -1)}</sub>;
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}

/** Plain-text version for emails, titles and search: "Ni^{2+}" → "Ni2+". */
export function sciToText(value: string) {
  return value.replace(/[\^_]\{([^}]*)\}/g, "$1");
}
