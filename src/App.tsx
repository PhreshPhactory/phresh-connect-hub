
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Layout from "@/components/Layout";
import React, { Suspense, lazy } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { SecurityHeaders } from "@/components/SecurityHeaders";
import CacheHeaders from '@/components/CacheHeaders';
import { useScrollAnimations } from '@/hooks/useScrollAnimations';

// Import critical pages normally for faster loading
import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Contact from "@/pages/Contact";

// Import all pages normally to avoid SSR hydration issues
import Packages from "@/pages/Packages";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Admin from "@/pages/Admin";
import Auth from "@/pages/Auth";
import Privacy from "@/pages/Privacy";
import NotFound from "@/pages/NotFound";
import FractionalLeadership from "@/pages/services/FractionalLeadership";
import GlobalTalent from "@/pages/services/GlobalTalent";
import LegacyTransformation from "@/pages/services/LegacyTransformation";
import SystemsDesign from "@/pages/services/SystemsDesign";
import RemoteTeams from "@/pages/RemoteTeams";
import KieraProfile from "@/pages/KieraProfile";
import Products from "@/pages/Products";
import ProductSpotlights from "@/pages/ProductSpotlights";
import ProductSpotlight from "@/pages/ProductSpotlight";

// Simplified loading fallback component
const PageSkeleton = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="container-custom py-16">
      <Skeleton className="h-8 w-48 mx-auto mb-4" />
      <Skeleton className="h-4 w-32 mx-auto" />
    </div>
  </div>
);

// Create a client with optimized settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * 60 * 1000, // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

const App: React.FC = () => {
  useScrollAnimations();
  
  return (
    <HelmetProvider>
      <SecurityHeaders />
      <CacheHeaders cacheType="html" />
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/fractional-leadership" element={<FractionalLeadership />} />
              <Route path="/services/global-talent" element={<GlobalTalent />} />
              <Route path="/services/legacy-transformation" element={<LegacyTransformation />} />
              <Route path="/services/systems-design" element={<SystemsDesign />} />
              <Route path="/remote-teams" element={<RemoteTeams />} />
              <Route path="/packages" element={<Packages />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product-spotlights" element={<ProductSpotlights />} />
              <Route path="/product-spotlights/:slug" element={<ProductSpotlight />} />
              <Route path="/KieraH" element={<KieraProfile />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/privacy" element={<Privacy />} />
              
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
          </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
