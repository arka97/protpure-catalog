import { useEffect, useRef, useState } from "react";

function usePersistedState<T>(storage: () => Storage, key: string, initial: T, validate?: (value: unknown) => T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") return initial;
    try {
      const raw = storage().getItem(key);
      if (!raw) return initial;
      const parsed = JSON.parse(raw) as unknown;
      return validate ? validate(parsed) : (parsed as T);
    } catch {
      return initial;
    }
  });
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    try {
      storage().setItem(key, JSON.stringify(value));
    } catch {
      /* ignore quota and privacy-mode errors */
    }
  }, [key, value]); // eslint-disable-line react-hooks/exhaustive-deps -- `storage` is a stable accessor
  return [value, setValue] as const;
}

/**
 * useState that mirrors to sessionStorage. Survives page reload, cleared on tab close.
 */
export function useSessionState<T>(key: string, initial: T) {
  return usePersistedState<T>(() => sessionStorage, key, initial);
}

/**
 * useState that mirrors to localStorage. Survives closing the tab.
 * `validate` turns whatever was stored into a safe value (stored data may be stale or hand-edited).
 */
export function useLocalState<T>(key: string, initial: T, validate?: (value: unknown) => T) {
  return usePersistedState<T>(() => localStorage, key, initial, validate);
}
