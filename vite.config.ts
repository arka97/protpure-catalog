import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { APPLICATIONS } from "./src/data/applications";
import { PRODUCTS } from "./src/data/catalog";

const SITE_URL = "https://protpure.com";

/**
 * Writes sitemap.xml at build time from the same data the pages are built from,
 * so a new product or application can never be missing from it.
 */
function sitemap(): Plugin {
  return {
    name: "protpure-sitemap",
    apply: "build",
    generateBundle() {
      const today = new Date().toISOString().slice(0, 10);
      const pages: [path: string, priority: string][] = [
        ["/", "1.0"],
        ["/products", "0.9"],
        ...PRODUCTS.map((p): [string, string] => [`/products/${p.slug}`, "0.8"]),
        ["/applications", "0.8"],
        ...APPLICATIONS.map((a): [string, string] => [`/applications/${a.slug}`, "0.7"]),
        ["/services", "0.8"],
        ["/technology", "0.7"],
        ["/about", "0.6"],
        ["/resources", "0.6"],
        ["/contact", "0.6"],
      ];
      const xml = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...pages.map(
          ([route, priority]) =>
            `  <url><loc>${SITE_URL}${route === "/" ? "/" : route}</loc><lastmod>${today}</lastmod><priority>${priority}</priority></url>`,
        ),
        "</urlset>",
        "",
      ].join("\n");
      this.emitFile({ type: "asset", fileName: "sitemap.xml", source: xml });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger(), sitemap()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@tanstack/react-query",
      "@tanstack/query-core",
    ],
  },
}));
