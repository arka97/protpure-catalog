
- Product catalogue source of truth is the `catalog_products` table (full Product JSON in `data`); `src/data/catalog.ts` is the first-paint/offline fallback and is hydrated at startup via `hydrateCatalog`. Why: editing products must not require a code change.
