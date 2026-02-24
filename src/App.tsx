
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Layout from "@/components/Layout";
import LandingPageLayout from "@/components/LandingPageLayout";
import { Suspense, lazy, type FC, type ReactNode } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useScrollAnimations } from '@/hooks/useScrollAnimations';

// Import critical pages normally for faster initial load
const BusinessHome = lazy(() => import("@/pages/BusinessHome"));
import NotFound from "@/pages/NotFound";

// Lazy load all other pages for faster initial bundle
const About = lazy(() => import("@/pages/About"));
const Services = lazy(() => import("@/pages/Services"));
const Contact = lazy(() => import("@/pages/Contact"));
const Packages = lazy(() => import("@/pages/Packages"));
const Blog = lazy(() => import("@/pages/Blog"));
const BlogPost = lazy(() => import("@/pages/BlogPost"));
const Admin = lazy(() => import("@/pages/Admin"));
const Auth = lazy(() => import("@/pages/Auth"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const FractionalLeadership = lazy(() => import("@/pages/services/FractionalLeadership"));
const GlobalTalent = lazy(() => import("@/pages/services/GlobalTalent"));
const LegacyTransformation = lazy(() => import("@/pages/services/LegacyTransformation"));
const SystemsDesign = lazy(() => import("@/pages/services/SystemsDesign"));
const RemoteTeams = lazy(() => import("@/pages/RemoteTeams"));
const KieraProfile = lazy(() => import("@/pages/KieraProfile"));
const Products = lazy(() => import("@/pages/Products"));
const ProductSpotlights = lazy(() => import("@/pages/ProductSpotlights"));
const ProductSpotlight = lazy(() => import("@/pages/ProductSpotlight"));
const Compro = lazy(() => import("@/pages/Compro"));
const BlackOwnedHolidayGuide = lazy(() => import("@/pages/BlackOwnedHolidayGuide"));
const BrandPartnership = lazy(() => import("@/pages/BrandPartnership"));
const BrandLinksAdmin = lazy(() => import("@/pages/BrandLinksAdmin"));
const LinkInBio = lazy(() => import("@/pages/LinkInBio"));
const TV = lazy(() => import("@/pages/TV"));
const AffiliateSalesBlueprint = lazy(() => import("@/pages/AffiliateSalesBlueprint"));
const AffiliateCourseWaitlist = lazy(() => import("@/pages/AffiliateCourseWaitlist"));
const HolidaySprint = lazy(() => import("@/pages/HolidaySprint"));
const HolidaySprintLanding = lazy(() => import("@/pages/HolidaySprintLanding"));
const HolidaySprintExplained = lazy(() => import("@/pages/HolidaySprintExplained"));
const HolidaySprintPayment = lazy(() => import("@/pages/HolidaySprintPayment"));
const HolidaySprintPaymentSuccess = lazy(() => import("@/pages/HolidaySprintPaymentSuccess"));
const HolidaySprintThankYou = lazy(() => import("@/pages/HolidaySprintThankYou"));
const NewsletterAdmin = lazy(() => import("@/pages/NewsletterAdmin"));
const BrandContactsAdmin = lazy(() => import("@/pages/BrandContactsAdmin"));
const VideoReelAdmin = lazy(() => import("@/pages/VideoReelAdmin"));
const PressContactsAdmin = lazy(() => import("@/pages/PressContactsAdmin"));
const SociallySellingFood = lazy(() => import("@/pages/SociallySellingFood"));
const SSFInvoiceAdmin = lazy(() => import("@/pages/SSFInvoiceAdmin"));
const AffiliateNewsletter = lazy(() => import("@/pages/AffiliateNewsletter"));
const DistributionAgreement = lazy(() => import("@/pages/DistributionAgreement"));
const Unsubscribe = lazy(() => import("@/pages/Unsubscribe"));

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

// Move scroll animations to a component inside the provider tree
const ScrollAnimationsProvider = ({ children }: { children: ReactNode }) => {
  useScrollAnimations();
  return <>{children}</>;
};

const App = () => {
  return (
    <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <BrowserRouter>
              <ScrollAnimationsProvider>
                <Toaster />
                <Sonner />
                <Suspense fallback={<PageSkeleton />}>
                  <Routes>
                    <Route element={<Layout />}>
                    <Route path="/" element={<ProductSpotlights />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/startups" element={<BusinessHome />} />
                      <Route path="/business" element={<Navigate to="/startups" replace />} />
                      <Route path="/shop" element={<Navigate to="/" replace />} />
                      <Route path="/buyblack" element={<Navigate to="/shop" replace />} />
                      <Route path="/shop/:slug" element={<ProductSpotlight />} />
                      <Route path="/compro" element={<Compro />} />
                      <Route path="/holiday-gift-guide" element={<BlackOwnedHolidayGuide />} />
                      <Route path="/KieraH" element={<KieraProfile />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/brands" element={<BrandPartnership />} />
                      <Route path="/blog" element={<Blog />} />
                      <Route path="/blog/:slug" element={<BlogPost />} />
                      <Route path="/admin" element={<Admin />} />
                      <Route path="/admin/brand-links" element={<BrandLinksAdmin />} />
                      <Route path="/admin/newsletter" element={<NewsletterAdmin />} />
                      <Route path="/admin/brand-contacts" element={<BrandContactsAdmin />} />
                      <Route path="/admin/video-reels" element={<VideoReelAdmin />} />
                      <Route path="/admin/press-contacts" element={<PressContactsAdmin />} />
                      <Route path="/admin/ssf-invoices" element={<SSFInvoiceAdmin />} />
                      <Route path="/auth" element={<Auth />} />
                      <Route path="/privacy" element={<Privacy />} />
                      <Route path="/links" element={<LinkInBio />} />
                      <Route path="/tv" element={<TV />} />
                      <Route path="/affiliate-sales-blueprint" element={<AffiliateSalesBlueprint />} />
                      <Route path="/affiliate-starter-course-waitlist" element={<AffiliateCourseWaitlist />} />
                      <Route path="/Affiliate" element={<AffiliateNewsletter />} />
                      <Route path="/AffiliateApplication" element={<Navigate to="/Affiliate" replace />} />
                      <Route path="/holiday-explained" element={<HolidaySprintExplained />} />
                      <Route path="/holiday-sprint-landing" element={<HolidaySprintLanding />} />
                      <Route path="/holiday-sprint-payment" element={<HolidaySprintPayment />} />
                      <Route path="/holiday-sprint-payment-success" element={<HolidaySprintPaymentSuccess />} />
                      <Route path="/holiday" element={<HolidaySprint />} />
                      <Route path="/holiday-sprint-thank-you" element={<HolidaySprintThankYou />} />
                      <Route path="/DistributionAgreement" element={<DistributionAgreement />} />
                      <Route path="/unsubscribe" element={<Unsubscribe />} />
                      <Route path="*" element={<NotFound />} />
                    </Route>
                    
                    {/* Landing pages without main navigation */}
                    <Route element={<LandingPageLayout />}>
                      <Route path="/socially-selling-food" element={<SociallySellingFood />} />
                    </Route>
                  </Routes>
                </Suspense>
              </ScrollAnimationsProvider>
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
