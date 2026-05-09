import { createContext, useContext, ReactNode, useState } from "react";
import type { Product, PackSize } from "@/types/product";
import { useSessionState } from "@/lib/persisted-state";

export interface RFQItem {
  id: string; // unique per product+pack
  product: Product;
  pack: PackSize;
  quantity: number;
  notes: string;
}

interface Ctx {
  items: RFQItem[];
  count: number;
  isOpen: boolean;
  setOpen: (v: boolean) => void;
  addItem: (product: Product, pack: PackSize) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, q: number) => void;
  updateNotes: (id: string, n: string) => void;
  updatePack: (id: string, pack: PackSize) => void;
  clearCart: () => void;
}

const RFQCtx = createContext<Ctx | null>(null);
const STORAGE_KEY = "protpure_rfq_items";

export function RFQProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useSessionState<RFQItem[]>(STORAGE_KEY, []);
  const [isOpen, setOpen] = useState(false);

  const addItem = (product: Product, pack: PackSize) => {
    setItems((state) => {
      const id = `${product.id}__${pack.catNo}`;
      const existing = state.find((i) => i.id === id);
      if (existing) {
        return state.map((i) =>
          i.id === id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...state, { id, product, pack, quantity: 1, notes: "" }];
    });
    setOpen(true);
  };

  const removeItem = (id: string) =>
    setItems((s) => s.filter((i) => i.id !== id));

  const updateQuantity = (id: string, quantity: number) =>
    setItems((s) =>
      s.map((i) => (i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i)),
    );

  const updateNotes = (id: string, notes: string) =>
    setItems((s) => s.map((i) => (i.id === id ? { ...i, notes } : i)));

  const updatePack = (id: string, pack: PackSize) =>
    setItems((state) => {
      const item = state.find((i) => i.id === id);
      if (!item) return state;
      const newId = `${item.product.id}__${pack.catNo}`;
      if (newId === id) return state;
      const existing = state.find((i) => i.id === newId);
      if (existing) {
        return state
          .filter((i) => i.id !== id)
          .map((i) =>
            i.id === newId ? { ...i, quantity: i.quantity + item.quantity } : i,
          );
      }
      return state.map((i) => (i.id === id ? { ...i, id: newId, pack } : i));
    });

  const clearCart = () => setItems([]);

  const value: Ctx = {
    items,
    count: items.reduce((s, i) => s + i.quantity, 0),
    isOpen,
    setOpen,
    addItem,
    removeItem,
    updateQuantity,
    updateNotes,
    updatePack,
    clearCart,
  };
  return <RFQCtx.Provider value={value}>{children}</RFQCtx.Provider>;
}

export function useRFQ() {
  const ctx = useContext(RFQCtx);
  if (!ctx) throw new Error("useRFQ must be used within RFQProvider");
  return ctx;
}