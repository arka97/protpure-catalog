import { useEffect } from "react";
import { SITE } from "@/data/site";

interface SeoOptions {
  /** Page title without the site name. */
  title: string;
  description: string;
  /** Structured data (schema.org) for this page. */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  /** Keep the page out of search results (utility pages). */
  noindex?: boolean;
}

function setMeta(selector: string, attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/**
 * Sets the document title, description, canonical URL, Open Graph tags and JSON-LD for the current route.
 * The app is client-rendered, so this runs in an effect; search engines that execute JavaScript pick it up.
 */
export function useSeo({ title, description, jsonLd, noindex }: SeoOptions) {
  const json = jsonLd ? JSON.stringify(jsonLd) : "";
  useEffect(() => {
    const fullTitle = title.includes(SITE.name) ? title : `${title} | ${SITE.name}`;
    const url = SITE.url + window.location.pathname.replace(/\/$/, "") || SITE.url;
    document.title = fullTitle;
    setMeta('meta[name="description"]', "name", "description", description);
    setMeta('meta[property="og:title"]', "property", "og:title", fullTitle);
    setMeta('meta[property="og:description"]', "property", "og:description", description);
    setMeta('meta[property="og:url"]', "property", "og:url", url);
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", fullTitle);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    setMeta('meta[name="robots"]', "name", "robots", noindex ? "noindex, nofollow" : "index, follow");

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    const existing = document.getElementById("route-jsonld");
    if (existing) existing.remove();
    if (json) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = "route-jsonld";
      script.textContent = json;
      document.head.appendChild(script);
    }
  }, [title, description, json, noindex]);
}
