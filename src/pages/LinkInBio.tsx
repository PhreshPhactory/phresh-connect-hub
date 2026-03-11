import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import { ExternalLink, Play, Youtube, Instagram, Grid3x3, ArrowRight, ShoppingBag, Tv, Star } from "lucide-react";
import { Link } from "react-router-dom";
import phreshLogo from "@/assets/phresh-phactory-logo.png";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";

interface BrandLink {
  id: string;
  name: string;
  url: string;
  display_order: number;
  is_featured: boolean;
}

const LinkInBio = () => {
  const [brandLinks, setBrandLinks] = useState<BrandLink[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBrandLinks();
  }, []);

  const fetchBrandLinks = async () => {
    try {
      const { data, error } = await supabase
        .from('brand_links')
        .select('*')
        .eq('is_featured', true)
        .order('display_order', { ascending: true })
        .limit(4);

      if (error) throw error;
      setBrandLinks(data || []);
    } catch (error) {
      console.error('Error fetching brand links:', error);
    } finally {
      setLoading(false);
    }
  };

  const trackClick = async (linkName: string, linkUrl: string) => {
    try {
      await supabase.from('link_clicks').insert({
        link_name: linkName.slice(0, 200),
        link_url: linkUrl.slice(0, 1000),
        referrer: (document.referrer || '').slice(0, 500) || null,
        user_agent: navigator.userAgent.slice(0, 500),
      });
    } catch (error) {
      console.error('Error tracking click:', error);
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
    }),
  };

  return (
    <>
      <SEOHead
        title="We Sell Your Product | Phresh Phactory"
        description="We put Afro-descendant created products in front of buyers through live shopping, content, and our affiliate network. Apply to get featured."
        keywords="sell my product, brand partnership, live shopping, affiliate network, Black-owned brands"
      />

      <div className="min-h-screen bg-black text-white font-heading overflow-hidden">
        {/* Hero Section */}
        <div className="relative px-4 pt-12 pb-8">
          {/* Subtle gradient accent */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-b from-primary/20 via-primary/5 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-md mx-auto relative z-10">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-6"
            >
              <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-white/20 shadow-2xl">
                <img
                  src={phreshLogo}
                  alt="Phresh Phactory"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/50 mb-2">@phreshphactorytv</p>
            </motion.div>

            {/* Value Proposition */}
            <motion.div
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-center mb-10"
            >
              <h1 className="text-3xl sm:text-4xl font-black leading-tight mb-3">
                We Put Your Product
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">
                  In Front of Buyers
                </span>
              </h1>
              <p className="text-white/60 text-sm max-w-xs mx-auto leading-relaxed">
                Live shopping. Content. Affiliate network.
                <br />
                Built for Afro-descendant created brands.
              </p>
            </motion.div>

            {/* Primary CTA — Feature Your Brand */}
            <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible">
              <Link
                to="/brands"
                onClick={() => trackClick("Feature Your Brand - CTA", "/brands")}
                className="block mb-4"
              >
                <Button className="w-full py-7 text-lg font-bold bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black rounded-2xl shadow-[0_0_40px_rgba(234,179,8,0.3)] hover:shadow-[0_0_60px_rgba(234,179,8,0.4)] transition-all duration-300 hover:scale-[1.02]">
                  <span>Get Your Brand Featured</span>
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </motion.div>

            {/* Social Proof Stats */}
            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-3 gap-3 mb-10"
            >
              {[
                { icon: Tv, label: "Live Shows", value: "Weekly" },
                { icon: ShoppingBag, label: "Brands Featured", value: "50+" },
                { icon: Star, label: "Products Sold", value: "1000+" },
              ].map(({ icon: Icon, label, value }, i) => (
                <div
                  key={label}
                  className="bg-white/5 border border-white/10 rounded-xl p-3 text-center backdrop-blur-sm"
                >
                  <Icon className="w-4 h-4 mx-auto mb-1 text-yellow-400/80" />
                  <p className="text-lg font-black text-white">{value}</p>
                  <p className="text-[10px] uppercase tracking-wider text-white/40">{label}</p>
                </div>
              ))}
            </motion.div>

            {/* Watch & Shop */}
            <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible" className="mb-6">
              <Link
                to="/shop"
                onClick={() => trackClick("Watch & Shop", "/shop")}
                className="block"
              >
                <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300 hover:scale-[1.01] group">
                  <div className="bg-red-600 rounded-xl p-3 flex-shrink-0">
                    <Play className="w-6 h-6 text-white fill-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-white text-sm">Watch & Shop</p>
                    <p className="text-white/50 text-xs">See the products in action</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white/60 transition-colors" />
                </div>
              </Link>
            </motion.div>

            {/* Featured Brands (compact) */}
            {!loading && brandLinks.length > 0 && (
              <motion.div custom={5} variants={fadeUp} initial="hidden" animate="visible" className="mb-6">
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-3 text-center">Shop the Brands</p>
                <div className="space-y-2">
                  {brandLinks.map((link) => (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackClick(link.name, link.url)}
                      className="flex items-center justify-between p-3.5 bg-white/5 border border-white/8 rounded-xl hover:bg-white/10 transition-all duration-200 group"
                    >
                      <span className="font-semibold text-sm text-white/90">{link.name}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-white/30 group-hover:text-white/60 transition-colors" />
                    </a>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Quick Links */}
            <motion.div custom={6} variants={fadeUp} initial="hidden" animate="visible" className="mb-8">
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  { name: "Culture & Commerce", url: "/cultureandcommerce" },
                  { name: "Growth Notes", url: "/growthnotes" },
                  { name: "About", url: "/about" },
                ].map((link) => (
                  <Link
                    key={link.name}
                    to={link.url}
                    onClick={() => trackClick(link.name, link.url)}
                    className="px-4 py-2 text-xs text-white/50 hover:text-white/80 border border-white/10 hover:border-white/20 rounded-full transition-all duration-200"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Social Icons */}
            <motion.div custom={7} variants={fadeUp} initial="hidden" animate="visible" className="mb-8">
              <div className="flex justify-center gap-3">
                {[
                  { icon: Youtube, href: "https://www.youtube.com/@phreshphactoryTV", name: "YouTube", color: "hover:text-red-500" },
                  { icon: Instagram, href: "https://www.instagram.com/phreshphactorytv/", name: "Instagram", color: "hover:text-pink-500" },
                  { icon: Grid3x3, href: "https://www.pinterest.com/phreshphactorytv/", name: "Pinterest", color: "hover:text-red-400" },
                  { icon: Play, href: "https://www.tiktok.com/@PhreshPhactoryTV", name: "TikTok", color: "hover:text-white" },
                ].map(({ icon: Icon, href, name, color }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackClick(`${name} - Social`, href)}
                    className={`w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white/40 ${color} transition-all duration-200 hover:scale-110 hover:border-white/20`}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Footer */}
            <div className="text-center text-[10px] text-white/20 tracking-wider">
              <p>© {new Date().getFullYear()} PHRESH PHACTORY, INC.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LinkInBio;
