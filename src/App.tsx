import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Contact from "@/pages/Contact";
import Packages from "@/pages/Packages";
import Blog from "@/pages/Blog";
import NotFound from "@/pages/NotFound";
import FractionalLeadership from "@/pages/services/FractionalLeadership";
import GlobalTalent from "@/pages/services/GlobalTalent";
import LegacyTransformation from "@/pages/services/LegacyTransformation";
import SystemsDesign from "@/pages/services/SystemsDesign";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <HelmetProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/fractional-leadership" element={<FractionalLeadership />} />
              <Route path="/services/global-talent" element={<GlobalTalent />} />
              <Route path="/services/legacy-transformation" element={<LegacyTransformation />} />
              <Route path="/services/systems-design" element={<SystemsDesign />} />
              <Route path="/packages" element={<Packages />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </TooltipProvider>
      </HelmetProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
