/*
  Build-time switches. Both are off on the live site.

  VITE_ENQUIRY_DEMO=true  Forms confirm without sending; nothing is requested from the backend.
                          For clicking through the enquiry flow on localhost.
  VITE_PREVIEW=true       Set by `npm run build:preview` (scripts/build-preview.mjs), which writes the site as one
                          HTML file that runs from disk or inside a sandboxed frame, with no server or backend:
                          routing is kept in memory, demo mode is on, and what such a frame refuses or cannot
                          reach (file downloads, the print dialog, the backend pages) is left out.
*/
export const PREVIEW = import.meta.env.VITE_PREVIEW === "true";
export const DEMO = PREVIEW || import.meta.env.VITE_ENQUIRY_DEMO === "true";
