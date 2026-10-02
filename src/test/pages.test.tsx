import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import App from "@/App";
import { APPLICATIONS } from "@/data/applications";
import { PRODUCTS } from "@/data/catalog";

/*
  Smoke test: every route renders its own <h1> without throwing.
  The edge functions are never called here; the Supabase client is replaced by a stub.
*/

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    functions: { invoke: vi.fn().mockResolvedValue({ data: { source: "fallback", posts: [] }, error: null }) },
  },
}));

beforeAll(() => {
  window.scrollTo = vi.fn() as unknown as typeof window.scrollTo;
  Element.prototype.scrollIntoView = vi.fn();
});

afterEach(() => {
  cleanup();
  localStorage.clear();
  sessionStorage.clear();
});

async function visit(path: string) {
  window.history.pushState({}, "", path);
  render(<App />);
  return screen.findByRole("heading", { level: 1 }, { timeout: 8000 });
}

const ROUTES: [path: string, heading: RegExp][] = [
  ["/", /Purity,\s*resolved\./],
  ["/products", /Resins, columns and kits\./],
  ["/applications", /Find the resin for your molecule\./],
  ["/services", /From clarified sample to purified protein\./],
  ["/technology", /Agarose, engineered bead by bead\./],
  ["/about", /chromatography resin platform\./],
  ["/resources", /Datasheets, data and definitions\./],
  ["/contact", /Talk to a scientist\./],
  ["/quote", /Your quote list\./],
  ["/no-such-page", /Nothing eluted at this address\./],
  ["/products/no-such-resin", /Nothing eluted at this address\./],
];

describe("pages", () => {
  it.each(ROUTES)("%s renders", async (path, heading) => {
    const h1 = await visit(path);
    expect(h1.textContent).toMatch(heading);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it.each(PRODUCTS.map((p) => [p.slug, p.name] as const))("product page %s renders", async (slug, name) => {
    const h1 = await visit(`/products/${slug}`);
    expect(h1).toHaveTextContent(name);
    // Every product can be put on the quote list from its own page.
    const order = document.getElementById("order")!;
    expect(within(order).getAllByRole("button", { name: /^Add/ }).length).toBeGreaterThan(0);
  });

  it.each(APPLICATIONS.map((a) => [a.slug, a.title] as const))("application page %s renders", async (slug, title) => {
    const h1 = await visit(`/applications/${slug}`);
    expect(h1).toHaveTextContent(title);
  });

  it("keeps old /products?type= links working", async () => {
    await visit("/products?type=iec");
    expect(await screen.findByRole("heading", { level: 2, name: "Ion exchange chromatography" })).toBeInTheDocument();
    expect(window.location.search).toBe("?family=iex");
  });

  it("redirects /procurement to the company page", async () => {
    const h1 = await visit("/procurement");
    expect(h1.textContent).toMatch(/chromatography resin platform\./);
    expect(window.location.pathname).toBe("/about");
  });
});
