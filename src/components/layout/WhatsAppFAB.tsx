const WA_NUMBER = "919426596644";
const WA_TEXT = encodeURIComponent("Hi ProtPure, I'd like to enquire about...");

export function WhatsAppFAB() {
  return (
    <a
      href={`https://wa.me/${WA_NUMBER}?text=${WA_TEXT}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 group"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping" aria-hidden />
      <span className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-[0_8px_24px_rgba(37,211,102,0.45)] hover:bg-[#1ebe57] transition-colors">
        <svg viewBox="0 0 24 24" className="w-7 h-7 text-white" fill="currentColor" aria-hidden>
          <path d="M19.11 4.91A10.07 10.07 0 0 0 12 2C6.48 2 2 6.48 2 12c0 1.76.46 3.46 1.32 4.96L2 22l5.2-1.36A10 10 0 0 0 12 22c5.52 0 10-4.48 10-10 0-2.67-1.04-5.18-2.89-7.09zM12 20.13a8.13 8.13 0 0 1-4.14-1.13l-.3-.18-3.08.81.82-3-.2-.31A8.13 8.13 0 1 1 20.13 12 8.14 8.14 0 0 1 12 20.13zm4.46-6.1c-.24-.12-1.45-.71-1.67-.79-.22-.08-.39-.12-.55.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.95-1.2-.72-.64-1.21-1.43-1.35-1.67-.14-.24-.02-.37.11-.49.11-.11.24-.28.37-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.32-.75-1.81-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.7 2.6 4.11 3.65.57.25 1.02.4 1.37.51.58.18 1.1.16 1.51.1.46-.07 1.45-.59 1.66-1.16.21-.57.21-1.06.14-1.16-.07-.1-.22-.16-.46-.28z" />
        </svg>
      </span>
      <span className="sr-only">WhatsApp</span>
    </a>
  );
}