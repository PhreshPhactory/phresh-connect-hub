import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import { Play, Youtube, Instagram, Grid3x3, ArrowRight, ShoppingBag, Star, Briefcase, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import kieraPhoto from "@/assets/kiera-linkinbio.jpeg";

const LinkInBio = () => {
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
      transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
    }),
  };

  const links = [
    {
      to: "/brands",
      label: "Get Your Brand Featured",
      subtitle: "Apply for content, affiliate, and live commerce placement",
      icon: Star,
      gradient: "from-yellow-500 to-amber-600",
      isPrimary: true,
    },
    {
      to: "/shop",
      label: "Watch & Shop",
      subtitle: "Discover and buy from diaspora brands",
      icon: Play,
      gradient: "from-red-500 to-rose-600",
    },
    {
      to: "/AffiliateApplication",
      label: "Become an Affiliate",
      subtitle: "Earn commission promoting culturally rooted products",
      icon: ShoppingBag,
      gradient: "from-emerald-500 to-teal-600",
    },
    {
      to: "/cultureandcommerce",
      label: "Culture & Commerce",
      subtitle: "The editorial series spotlighting visionaries",
      icon: BookOpen,
      gradient: "from-violet-500 to-purple-600",
    },
    {
      to: "/growthnotes",
      label: "Growth Notes",
      subtitle: "Commerce insights for brand founders",
      icon: Briefcase,
      gradient: "from-sky-500 to-blue-600",
    },
    {
      to: "/socially-selling-food",
      label: "Socially Selling Food Workshop",
      subtitle: "Build zero-cost revenue for your food business",
      icon: ShoppingBag,
      gradient: "from-orange-500 to-red-500",
    },
  ];

  return (
    <>
      <SEOHead
        title="Kiera H. | Phresh Phactory"
        description="Scaling culture into commerce. Strategic leadership, live shopping, affiliate networks, and content systems built for Afro-descendant created brands."
        keywords="Kiera H, Phresh Phactory, Black-owned brands, live shopping, affiliate network, brand partnership"
      />

      <div className="min-h-screen bg-[#0a0a0a] text-white font-heading overflow-hidden relative">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-amber-500/10 via-amber-500/3 to-transparent rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-t from-violet-500/5 to-transparent rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 px-4 pt-10 pb-12">
          <div className="max-w-[420px] mx-auto">
            {/* Profile Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              {/* Photo with gold ring */}
              <div className="relative w-28 h-28 mx-auto mb-5">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400 via-amber-500 to-yellow-600 p-[3px]">
                  <div className="w-full h-full rounded-full overflow-hidden bg-[#0a0a0a] p-[2px]">
                    <img
                      src={kieraPhoto}
                      alt="Kiera H., Founder of Phresh Phactory"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>
                {/* Verified badge */}
                <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              <h1 className="text-xl font-bold tracking-tight mb-1">Kiera H.</h1>
              <p className="text-xs uppercase tracking-[0.25em] text-white/40 mb-4">Founder, Phresh Phactory Inc.</p>
              
              <p className="text-sm text-white/60 max-w-[320px] mx-auto leading-relaxed">
                Scaling culture into commerce.
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-400 font-semibold">
                  Strategic leadership, content systems, and sales channels
                </span>
                {" "}for Afro-descendant created brands.
              </p>
            </motion.div>

            {/* Links */}
            <div className="space-y-3 mb-8">
              {links.map((link, i) => (
                <motion.div
                  key={link.to}
                  custom={i + 1}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                >
                  {link.isPrimary ? (
                    <Link
                      to={link.to}
                      onClick={() => trackClick(link.label, link.to)}
                      className="block"
                    >
                      <div className="relative group">
                        <div className="absolute -inset-[1px] bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 rounded-2xl opacity-80 group-hover:opacity-100 blur-[1px] transition-opacity" />
                        <div className="relative flex items-center gap-4 p-4 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-2xl transition-all duration-300 group-hover:shadow-[0_0_50px_rgba(234,179,8,0.3)]">
                          <div className="bg-black/20 rounded-xl p-3 flex-shrink-0">
                            <link.icon className="w-6 h-6 text-black" />
                          </div>
                          <div className="flex-1 text-left">
                            <p className="font-bold text-black text-sm">{link.label}</p>
                            <p className="text-black/60 text-xs">{link.subtitle}</p>
                          </div>
                          <ArrowRight className="w-5 h-5 text-black/60 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <Link
                      to={link.to}
                      onClick={() => trackClick(link.label, link.to)}
                      className="block"
                    >
                      <div className="flex items-center gap-4 p-4 bg-white/[0.04] border border-white/[0.08] rounded-2xl hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-300 group">
                        <div className={`bg-gradient-to-br ${link.gradient} rounded-xl p-3 flex-shrink-0`}>
                          <link.icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="font-bold text-white text-sm">{link.label}</p>
                          <p className="text-white/40 text-xs">{link.subtitle}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-white/50 group-hover:translate-x-1 transition-all" />
                      </div>
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Social Icons */}
            <motion.div custom={8} variants={fadeUp} initial="hidden" animate="visible" className="mb-8">
              <div className="flex justify-center gap-3">
                {[
                  { icon: Youtube, href: "https://www.youtube.com/@phreshphactoryTV", name: "YouTube" },
                  { icon: Instagram, href: "https://www.instagram.com/phreshphactorytv/", name: "Instagram" },
                  { icon: Grid3x3, href: "https://www.pinterest.com/phreshphactorytv/", name: "Pinterest" },
                  { icon: Play, href: "https://www.tiktok.com/@PhreshPhactoryTV", name: "TikTok" },
                ].map(({ icon: Icon, href, name }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackClick(`${name} - Social`, href)}
                    className="w-11 h-11 bg-white/[0.04] border border-white/[0.08] rounded-full flex items-center justify-center text-white/30 hover:text-white hover:bg-white/[0.1] hover:border-white/20 transition-all duration-300 hover:scale-110"
                  >
                    <Icon className="w-[18px] h-[18px]" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Footer */}
            <motion.div custom={9} variants={fadeUp} initial="hidden" animate="visible">
              <div className="text-center text-[10px] text-white/15 tracking-[0.15em] uppercase">
                <p>© {new Date().getFullYear()} Phresh Phactory, Inc.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LinkInBio;
