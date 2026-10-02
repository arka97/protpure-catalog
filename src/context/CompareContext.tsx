import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { productBySlug } from "@/data/catalog";
import { useSessionState } from "@/lib/persisted-state";

/*
  Side-by-side comparison of product lines (up to three). The selection is kept for the browser tab.
*/

interface Ctx {
  /** Product slugs, in the order they were added. */
  slugs: string[];
  isOpen: boolean;
  setOpen: (v: boolean) => void;
  toggle: (slug: string) => void;
  remove: (slug: string) => void;
  clear: () => void;
  has: (slug: string) => boolean;
  canAdd: boolean;
}

export const COMPARE_MAX = 3;
const CompareCtx = createContext<Ctx | null>(null);

export function CompareProvider({ children }: { children: ReactNode }) {
  const [stored, setStored] = useSessionState<string[]>("protpure_compare_v2", []);
  const [isOpen, setOpen] = useState(false);

  // Stored data may be stale: keep only slugs that still exist.
  const slugs = useMemo(
    () =>
      Array.isArray(stored)
        ? stored.filter((s) => typeof s === "string" && productBySlug(s)).slice(0, COMPARE_MAX)
        : [],
    [stored],
  );

  const value = useMemo<Ctx>(
    () => ({
      slugs,
      isOpen,
      setOpen,
      has: (slug) => slugs.includes(slug),
      canAdd: slugs.length < COMPARE_MAX,
      toggle: (slug) => {
        if (slugs.includes(slug)) {
          setStored(slugs.filter((s) => s !== slug));
          return;
        }
        if (slugs.length >= COMPARE_MAX) {
          toast(`You can compare up to ${COMPARE_MAX} products`, { description: "Remove one to add another." });
          return;
        }
        setStored([...slugs, slug]);
      },
      remove: (slug) => setStored(slugs.filter((s) => s !== slug)),
      clear: () => {
        setStored([]);
        setOpen(false);
      },
    }),
    [slugs, isOpen, setStored],
  );

  return <CompareCtx.Provider value={value}>{children}</CompareCtx.Provider>;
}

export function useCompare() {
  const ctx = useContext(CompareCtx);
  if (!ctx) throw new Error("useCompare must be used within CompareProvider");
  return ctx;
}
