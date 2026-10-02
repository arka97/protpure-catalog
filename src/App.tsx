import { lazy, Suspense } from "react";
import { BrowserRouter, HashRouter, Navigate, Route, Routes } from "react-router-dom";
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
const Unsubscribe = lazy(() => import("@/pages/Unsubscribe"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const DocsLayout = lazy(() => import("@/pages/docs/DocsLayout"));
const DocumentsHub = lazy(() => import("@/pages/docs/DocumentsHub"));
const DocPage = lazy(() => import("@/pages/docs/DocPage"));

/* Static previews (a single HTML file with no server) set VITE_ROUTER=hash; the live site uses clean URLs. */
const Router = import.meta.env.VITE_ROUTER === "hash" ? HashRouter : BrowserRouter;

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
              <Route path="/unsubscribe" element={<Unsubscribe />} />
              {/* Addresses from the previous site */}
              <Route path="/procurement" element={<Navigate to="/about" replace />} />
              <Route path="/company" element={<Navigate to="/about" replace />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route
              element={
                <Suspense fallback={null}>
                  <DocsLayout />
                </Suspense>
              }
            >
              <Route path="/documents" element={<DocumentsHub />} />
              <Route path="/documents/:slug" element={<DocPage />} />
            </Route>
          </Routes>
        </CompareProvider>
      </RFQProvider>
    </Router>
  </>
);

export default App;
