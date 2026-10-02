import { lazy, Suspense } from "react";
import { BrowserRouter, MemoryRouter, Navigate, Route, Routes } from "react-router-dom";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Toaster } from "@/components/ui/sonner";
import { CompareProvider } from "@/context/CompareContext";
import { RFQProvider } from "@/context/RFQContext";
import Home from "@/pages/Home";

/* The home page ships in the main bundle; every other page is loaded when it is first visited. */
const Products = lazy(() => import("@/pages/Products"));
const ProductDetail = lazy(() => import("@/pages/ProductDetail"));
const Applications = lazy(() => import("@/pages/Applications"));
const ApplicationDetail = lazy(() => import("@/pages/ApplicationDetail"));
const Services = lazy(() => import("@/pages/Services"));
const Technology = lazy(() => import("@/pages/Technology"));
const About = lazy(() => import("@/pages/About"));
const Resources = lazy(() => import("@/pages/Resources"));
const Contact = lazy(() => import("@/pages/Contact"));
const Quote = lazy(() => import("@/pages/Quote"));
const NotFound = lazy(() => import("@/pages/NotFound"));

/*
  The preview build (VITE_PREVIEW=true, see lib/env.ts) has no server and no backend: it keeps routing in
  memory and leaves out the pages that need the backend. The check is written inline so the bundler can
  drop their code from that build.
*/
const PREVIEW = import.meta.env.VITE_PREVIEW === "true";
const Router = PREVIEW ? MemoryRouter : BrowserRouter;
const Backend = PREVIEW
  ? null
  : {
      DocsLayout: lazy(() => import("@/pages/docs/DocsLayout")),
      DocsHub: lazy(() => import("@/pages/docs/DocumentsHub")),
      DocPage: lazy(() => import("@/pages/docs/DocPage")),
    };

const App = () => (
  <>
    <Toaster />
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <RFQProvider>
        <CompareProvider>
          <Routes>
            <Route element={<SiteLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:slug" element={<ProductDetail />} />
              <Route path="/applications" element={<Applications />} />
              <Route path="/applications/:slug" element={<ApplicationDetail />} />
              <Route path="/services" element={<Services />} />
              <Route path="/technology" element={<Technology />} />
              <Route path="/about" element={<About />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/quote" element={<Quote />} />
              {/* Addresses from the previous site */}
              <Route path="/procurement" element={<Navigate to="/about" replace />} />
              <Route path="/company" element={<Navigate to="/about" replace />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            {Backend && (
              <Route
                element={
                  <Suspense fallback={null}>
                    <Backend.DocsLayout />
                  </Suspense>
                }
              >
                <Route path="/documents" element={<Backend.DocsHub />} />
                <Route path="/documents/:slug" element={<Backend.DocPage />} />
              </Route>
            )}
          </Routes>
        </CompareProvider>
      </RFQProvider>
    </Router>
  </>
);

export default App;
