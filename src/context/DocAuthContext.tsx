import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface DocAuthCtx {
  unlocked: boolean;
  unlock: () => void;
  lock: () => void;
}

const KEY = "protpure_docs_unlocked";
const Ctx = createContext<DocAuthCtx | null>(null);

export function DocAuthProvider({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(KEY) === "1") setUnlocked(true);
  }, []);

  const unlock = () => {
    sessionStorage.setItem(KEY, "1");
    setUnlocked(true);
  };
  const lock = () => {
    sessionStorage.removeItem(KEY);
    setUnlocked(false);
  };

  return <Ctx.Provider value={{ unlocked, unlock, lock }}>{children}</Ctx.Provider>;
}

export function useDocAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useDocAuth must be used inside DocAuthProvider");
  return ctx;
}