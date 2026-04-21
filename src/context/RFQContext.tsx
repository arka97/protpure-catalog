import { createContext, useContext, useReducer, ReactNode, useState } from "react";
import { Product, PackSize } from "@/data/products";

export interface RFQItem {
  id: string; // unique per product+pack
  product: Product;
  pack: PackSize;
  quantity: number;
  notes: string;
}

type Action =
  | { type: "ADD_ITEM"; product: Product; pack: PackSize }
  | { type: "REMOVE_ITEM"; id: string }
  | { type: "UPDATE_QUANTITY"; id: string; quantity: number }
  | { type: "UPDATE_NOTES"; id: string; notes: string }
  | { type: "CLEAR_CART" };

function reducer(state: RFQItem[], action: Action): RFQItem[] {
  switch (action.type) {
    case "ADD_ITEM": {
      const id = `${action.product.id}__${action.pack.catNo}`;
      const existing = state.find((i) => i.id === id);
      if (existing) {
        return state.map((i) =>
          i.id === id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...state,
        { id, product: action.product, pack: action.pack, quantity: 1, notes: "" },
      ];
    }
    case "REMOVE_ITEM":
      return state.filter((i) => i.id !== action.id);
    case "UPDATE_QUANTITY":
      return state.map((i) =>
        i.id === action.id ? { ...i, quantity: Math.max(1, action.quantity) } : i
      );
    case "UPDATE_NOTES":
      return state.map((i) => (i.id === action.id ? { ...i, notes: action.notes } : i));
    case "CLEAR_CART":
      return [];
  }
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
  clearCart: () => void;
}

const RFQCtx = createContext<Ctx | null>(null);

export function RFQProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(reducer, []);
  const [isOpen, setOpen] = useState(false);
  const value: Ctx = {
    items,
    count: items.reduce((s, i) => s + i.quantity, 0),
    isOpen,
    setOpen,
    addItem: (product, pack) => {
      dispatch({ type: "ADD_ITEM", product, pack });
      setOpen(true);
    },
    removeItem: (id) => dispatch({ type: "REMOVE_ITEM", id }),
    updateQuantity: (id, quantity) => dispatch({ type: "UPDATE_QUANTITY", id, quantity }),
    updateNotes: (id, notes) => dispatch({ type: "UPDATE_NOTES", id, notes }),
    clearCart: () => dispatch({ type: "CLEAR_CART" }),
  };
  return <RFQCtx.Provider value={value}>{children}</RFQCtx.Provider>;
}

export function useRFQ() {
  const ctx = useContext(RFQCtx);
  if (!ctx) throw new Error("useRFQ must be used within RFQProvider");
  return ctx;
}