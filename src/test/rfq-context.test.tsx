import type { ReactNode } from "react";
import { act, renderHook } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { RFQProvider, useRFQ } from "@/context/RFQContext";

vi.mock("sonner", () => ({ toast: vi.fn() }));

const wrapper = ({ children }: { children: ReactNode }) => (
  <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <RFQProvider>{children}</RFQProvider>
  </MemoryRouter>
);

const resin = {
  id: "SPFF01",
  kind: "product" as const,
  name: "SP Agarose Fast Flow",
  catNo: "SPFF01",
  pack: "25 mL",
  variantId: "sp-agarose-ff",
};
const bigger = { ...resin, id: "SPFF02", catNo: "SPFF02", pack: "50 mL" };
const service = { id: "svc-SC001", kind: "service" as const, name: "Precision column packing", catNo: "SC001" };

describe("quote list", () => {
  beforeEach(() => localStorage.clear());

  it("adds an item, and raises the quantity when it is added again", () => {
    const { result } = renderHook(() => useRFQ(), { wrapper });
    act(() => result.current.addItem(resin));
    act(() => result.current.addItem(resin));
    expect(result.current.count).toBe(1);
    expect(result.current.items[0]).toMatchObject({ id: "SPFF01", quantity: 2, notes: "" });
    expect(result.current.has("SPFF01")).toBe(true);
  });

  it("lists a service once however often it is added", () => {
    const { result } = renderHook(() => useRFQ(), { wrapper });
    act(() => result.current.addItem(service));
    act(() => result.current.addItem(service));
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(1);
  });

  it("keeps quantities between 1 and 999", () => {
    const { result } = renderHook(() => useRFQ(), { wrapper });
    act(() => result.current.addItem(resin));
    act(() => result.current.updateQuantity("SPFF01", 0));
    expect(result.current.items[0].quantity).toBe(1);
    act(() => result.current.updateQuantity("SPFF01", 5000));
    expect(result.current.items[0].quantity).toBe(999);
    act(() => result.current.updateQuantity("SPFF01", Number.NaN));
    expect(result.current.items[0].quantity).toBe(1);
  });

  it("swaps a pack and keeps the quantity and note", () => {
    const { result } = renderHook(() => useRFQ(), { wrapper });
    act(() => result.current.addItem({ ...resin, quantity: 3, notes: "urgent" }));
    act(() => result.current.replaceItem("SPFF01", bigger));
    expect(result.current.items).toEqual([{ ...bigger, quantity: 3, notes: "urgent" }]);
  });

  it("merges quantities when the other pack is already listed", () => {
    const { result } = renderHook(() => useRFQ(), { wrapper });
    act(() => result.current.addItem({ ...resin, quantity: 2 }));
    act(() => result.current.addItem({ ...bigger, quantity: 1 }));
    act(() => result.current.replaceItem("SPFF01", bigger));
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0]).toMatchObject({ id: "SPFF02", quantity: 3 });
  });

  it("stores the list, but never the contact details", () => {
    const { result } = renderHook(() => useRFQ(), { wrapper });
    act(() => result.current.addItem(resin));
    act(() => result.current.setContact({ ...result.current.contact, name: "Asha Rao", email: "asha@example.com" }));
    const stored = localStorage.getItem("protpure_quote_list_v2") ?? "";
    expect(stored).toContain("SPFF01");
    expect(JSON.stringify({ ...localStorage })).not.toContain("asha@example.com");
  });

  it("ignores malformed stored data", () => {
    localStorage.setItem(
      "protpure_quote_list_v2",
      JSON.stringify([
        { id: "SPFF01", kind: "product", name: "SP Agarose Fast Flow", quantity: "7", notes: 4 },
        { id: 3 },
        "x",
        null,
      ]),
    );
    const { result } = renderHook(() => useRFQ(), { wrapper });
    expect(result.current.items).toEqual([
      { id: "SPFF01", kind: "product", name: "SP Agarose Fast Flow", quantity: 7, notes: "" },
    ]);
  });

  it("clears", () => {
    const { result } = renderHook(() => useRFQ(), { wrapper });
    act(() => result.current.addItem(resin));
    act(() => result.current.clear());
    expect(result.current.count).toBe(0);
  });
});
