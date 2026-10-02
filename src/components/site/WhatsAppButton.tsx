import { useLocation } from "react-router-dom";
import { whatsappUrl } from "@/data/site";

/** Floating link to WhatsApp, a common enquiry channel for Indian buyers. */
export function WhatsAppButton() {
  const { pathname } = useLocation();
  // The quote and contact pages already offer WhatsApp inside the form.
  if (pathname === "/quote" || pathname === "/contact") return null;
  return (
    <aside aria-label="WhatsApp">
      <a
        href={whatsappUrl("Hello ProtPure, I would like to enquire about ")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with ProtPure on WhatsApp (opens in a new tab)"
        className="no-print group fixed bottom-5 right-5 z-30 flex h-12 items-center gap-2 rounded-full bg-ink pl-3.5 pr-3.5 text-paper shadow-[0_10px_30px_-10px_hsl(var(--ink)/0.6)] transition-colors hover:bg-ink/90 sm:bottom-6 sm:right-6"
      >
        <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5 fill-current">
          <path d="M19.11 4.91A10.07 10.07 0 0 0 12 2C6.48 2 2 6.48 2 12c0 1.76.46 3.46 1.32 4.96L2 22l5.2-1.36A10 10 0 0 0 12 22c5.52 0 10-4.48 10-10 0-2.67-1.04-5.18-2.89-7.09zM12 20.13a8.13 8.13 0 0 1-4.14-1.13l-.3-.18-3.08.81.82-3-.2-.31A8.13 8.13 0 1 1 20.13 12 8.14 8.14 0 0 1 12 20.13zm4.46-6.1c-.24-.12-1.45-.71-1.67-.79-.22-.08-.39-.12-.55.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.95-1.2-.72-.64-1.21-1.43-1.35-1.67-.14-.24-.02-.37.11-.49.11-.11.24-.28.37-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.32-.75-1.81-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.7 2.6 4.11 3.65.57.25 1.02.4 1.37.51.58.18 1.1.16 1.51.1.46-.07 1.45-.59 1.66-1.16.21-.57.21-1.06.14-1.16-.07-.1-.22-.16-.46-.28z" />
        </svg>
        <span className="hidden text-sm font-semibold sm:inline">WhatsApp</span>
      </a>
    </aside>
  );
}
