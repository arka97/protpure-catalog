/*
  Builds the whole site as one self-contained file: dist-preview/protpure-preview.html

    npm run build:preview

  The file opens by double-click in any browser and can be sent to someone for review. It needs no server
  and makes no network requests: fonts and photographs are embedded, routing is kept in memory, forms
  confirm without sending ("Preview mode: nothing was sent"), and the pages that need the backend
  (documents hub, unsubscribe) are left out. See src/lib/env.ts for what VITE_PREVIEW switches off.
*/
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "vite";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outFile = path.join(root, "dist-preview", "protpure-preview.html");

process.env.VITE_PREVIEW = "true";

/** The preview has no backend: every call is answered with an error instead of bundling the client. */
const noBackend = {
  name: "preview-no-backend",
  enforce: "pre",
  resolveId(id) {
    // The "@" alias is resolved before this hook runs, so match the path rather than the specifier.
    if (/[\\/]integrations[\\/]supabase[\\/]client(\.ts)?$/.test(id)) return "\0preview-backend";
  },
  load(id) {
    if (id !== "\0preview-backend") return;
    return [
      'const offline = async () => ({ data: null, error: new Error("Preview build: no backend") });',
      "export const supabase = { functions: { invoke: offline } };",
    ].join("\n");
  },
};

const result = await build({
  root,
  logLevel: "warn",
  plugins: [noBackend],
  build: {
    write: false,
    assetsInlineLimit: Number.MAX_SAFE_INTEGER, // fonts and photographs become data: URIs
    cssCodeSplit: false,
    modulePreload: false,
    rollupOptions: { output: { inlineDynamicImports: true } },
  },
});

const files = (Array.isArray(result) ? result : [result]).flatMap((r) => r.output);
const scripts = files.filter((f) => f.type === "chunk");
const styles = files.filter((f) => f.type === "asset" && f.fileName.endsWith(".css"));
const loose = files.filter((f) => f.type === "asset" && !/\.(css|html|xml)$/.test(f.fileName));
if (scripts.length !== 1 || styles.length !== 1) {
  throw new Error(`Expected one script and one stylesheet, got ${scripts.length} and ${styles.length}.`);
}
if (loose.length) {
  throw new Error(`Not embedded: ${loose.map((f) => f.fileName).join(", ")}`);
}

/*
  Inside an inline <script>, "</script" ends the element and "<!--" changes how the parser reads what
  follows. Both only occur in string and regular-expression literals, where \x3C means the same as "<".
*/
const js = scripts[0].code.replace(/<(\/script|!--)/gi, "\\x3C$1");
const css = String(styles[0].source);
if (/<\/style/i.test(css)) throw new Error("The stylesheet contains </style.");
if (/supabase\.co\b/.test(js)) throw new Error("The backend client is in the preview bundle.");

const favicon = fs.readFileSync(path.join(root, "public", "favicon.svg")).toString("base64");

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>ProtPure website preview</title>
<link rel="icon" href="data:image/svg+xml;base64,${favicon}">
<style>${css}</style>
</head>
<body>
<div id="root"></div>
<script type="module">${js}</script>
</body>
</html>
`;

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, html);
console.log(`${path.relative(root, outFile)}  ${(Buffer.byteLength(html) / 1024 / 1024).toFixed(1)} MB`);
