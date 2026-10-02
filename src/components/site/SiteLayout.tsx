import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { CompareTray } from "@/components/catalog/CompareTray";
import { RFQDrawer } from "@/components/rfq/RFQDrawer";
import { AnchorLink } from "./AnchorLink";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { ScrollManager } from "./ScrollManager";
import { WhatsAppButton } from "./WhatsAppButton";

function PageFallback() {
  return (
    <div className="shell py-24" role="status" aria-live="polite">
      <span className="sr-only">Loading page</span>
      <div className="h-3 w-28 animate-pulse rounded-full bg-paper-2" />
      <div className="mt-6 h-12 w-2/3 max-w-xl animate-pulse rounded-lg bg-paper-2" />
      <div className="mt-4 h-5 w-1/2 max-w-md animate-pulse rounded-lg bg-paper-2" />
    </div>
  );
}

/** Frame shared by every public page: header, routed content, footer and the global overlays. */
export function SiteLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <AnchorLink
        target="main"
        className="sr-only z-[60] rounded-full bg-ink px-5 py-3 text-sm font-semibold text-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </AnchorLink>
      <Header />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        <Suspense fallback={<PageFallback />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <RFQDrawer />
      <CompareTray />
      <WhatsAppButton />
      <ScrollManager />
    </div>
  );
}
