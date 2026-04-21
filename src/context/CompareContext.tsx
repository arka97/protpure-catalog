import { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "@/data/products";

interface Ctx {
  ids: string[];
  isOpen: boolean;
  setOpen: (v: boolean) => void;
  toggle: (id: string) => boolean; // returns whether it was added
  remove: (id: string) => void;
  clear: () => void;
  has: (id: string) => boolean;
  canAdd: boolean;
}

const MAX = 3;
const CompareCtx = createContext<Ctx | null>(null);

export function CompareProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);
  const [isOpen, setOpen] = useState(false);
  const value: Ctx = {
    ids,
    isOpen,
    setOpen,
    has: (id) => ids.includes(id),
    canAdd: ids.length < MAX,
    toggle: (id) => {
      if (ids.includes(id)) {
        setIds(ids.filter((x) => x !== id));
        return false;
      }
      if (ids.length >= MAX) return false;
      setIds([...ids, id]);
      return true;
    },
    remove: (id) => setIds(ids.filter((x) => x !== id)),
    clear: () => {
      setIds([]);
      setOpen(false);
    },
  };
  return <CompareCtx.Provider value={value}>{children}</CompareCtx.Provider>;
}

export function useCompare() {
  const ctx = useContext(CompareCtx);
  if (!ctx) throw new Error("useCompare must be used within CompareProvider");
  return ctx;
}

export const COMPARE_MAX = MAX;