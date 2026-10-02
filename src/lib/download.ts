/** Quote a CSV cell when it contains a separator, a quote or a line break. */
const cell = (value: string | number) => {
  const text = String(value);
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
};

export function toCsv(header: string[], rows: (string | number)[][]) {
  return [header, ...rows].map((row) => row.map(cell).join(",")).join("\r\n");
}

/** Offer a generated text file as a download. The BOM keeps "µ" and "×" intact when the CSV is opened in Excel. */
export function downloadText(filename: string, text: string, type = "text/csv;charset=utf-8") {
  const blob = new Blob(["﻿", text], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
