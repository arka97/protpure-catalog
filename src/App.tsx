import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Products from "./pages/Products.tsx";
import About from "./pages/About.tsx";
import Technology from "./pages/Technology.tsx";
import Resources from "./pages/Resources.tsx";
import Applications from "./pages/Applications.tsx";
import Contact from "./pages/Contact.tsx";
import NotFound from "./pages/NotFound.tsx";
import { RFQProvider } from "./context/RFQContext";
import { RFQDrawer } from "./components/rfq/RFQDrawer";
import { CompareProvider } from "./context/CompareContext";
import { WhatsAppFAB } from "./components/layout/WhatsAppFAB";
import { Navigate } from "react-router-dom";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <RFQProvider>
          <CompareProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/products" element={<Products />} />
              <Route path="/applications" element={<Applications />} />
              <Route path="/about" element={<About />} />
              <Route path="/technology" element={<Technology />} />
              <Route path="/procurement" element={<Navigate to="/about" replace />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <RFQDrawer />
            <WhatsAppFAB />
          </CompareProvider>
        </RFQProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
