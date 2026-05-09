import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface DocAuthCtx {
  token: string | null;
  unlocked: boolean;
  unlock: (token: string, expiresAt: number) => void;
  lock: () => void;
}

const TOKEN_KEY = "protpure_docs_token";
const EXP_KEY = "protpure_docs_token_exp";
const Ctx = createContext<DocAuthCtx | null>(null);

function readStoredToken(): string | null {
  try {
    const t = sessionStorage.getItem(TOKEN_KEY);
    const exp = Number(sessionStorage.getItem(EXP_KEY) ?? "0");
    if (!t || !exp) return null;
    if (exp * 1000 < Date.now()) {
      sessionStorage.removeItem(TOKEN_KEY);
      sessionStorage.removeItem(EXP_KEY);
      return null;
    }
    return t;
  } catch {
    return null;
  }
}

export function DocAuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const t = readStoredToken();
    if (t) setToken(t);
  }, []);

  const unlock = (newToken: string, expiresAt: number) => {
    sessionStorage.setItem(TOKEN_KEY, newToken);
    sessionStorage.setItem(EXP_KEY, String(expiresAt));
    setToken(newToken);
  };
  const lock = () => {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(EXP_KEY);
    setToken(null);
  };

  return (
    <Ctx.Provider value={{ token, unlocked: !!token, unlock, lock }}>{children}</Ctx.Provider>
  );
}

export function useDocAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useDocAuth must be used inside DocAuthProvider");
  return ctx;
}