import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Check, ArrowLeft, Utensils, ShoppingBag } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import fnbImage from "@/assets/live-shopping-fnb.jpg";
import catalogImage from "@/assets/live-shopping-catalog.jpg";

type Category = "food_beverage" | "general_catalog";

const LiveShoppingWaitlist = () => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [joinBoth, setJoinBoth] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [phone, setPhone] = useState("");
  const [affiliateProgram, setAffiliateProgram] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    const categories: string[] = joinBoth
      ? ["food_beverage", "general_catalog"]
      : selectedCategory
        ? [selectedCategory]
        : [];

    if (categories.length === 0) return;

    setSubmitting(true);
    const { error } = await supabase.from("live_shopping_waitlist").insert({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      categories,
      website: website.trim() || null,
      phone: phone.trim() || null,
      affiliate_program: affiliateProgram || null,
    } as any);

    setSubmitting(false);

    if (error) {
      if (error.code === "23505") {
        toast({ title: "You're already on the list!", description: "We'll be in touch soon." });
        setSubmitted(true);
      } else {
        toast({ title: "Something went wrong", description: "Please try again.", variant: "destructive" });
      }
      return;
    }

    setSubmitted(true);
    toast({ title: "You're in!", description: "Welcome to the waitlist." });
  };

  const categoryLabel = joinBoth
    ? "Food & Beverage + General Catalog"
    : selectedCategory === "food_beverage"
      ? "Food & Beverage"
      : "General Catalog";

  if (submitted) {
    return (
      <>
        <SEOHead
          title="Live Shopping Waitlist | Phresh Phactory"
          description="Join the waitlist for our upcoming live shopping experiences featuring curated Afro-descendant diaspora brands."
        />
        <div className="min-h-screen bg-foreground flex items-center justify-center px-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center max-w-md"
          >
            <div className="w-16 h-16 rounded-full bg-background flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-foreground" />
            </div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-background mb-4">
              You're on the list.
            </h1>
            <p className="text-background/70 text-lg">
              We'll notify you when live shopping goes live. Get ready for something special.
            </p>
          </motion.div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHead
        title="Live Shopping Waitlist | Phresh Phactory"
        description="Join the waitlist for our upcoming live shopping experiences featuring curated Afro-descendant diaspora brands."
      />
      <div className="min-h-screen bg-foreground">
        {/* Header */}
        <div className="text-center pt-20 pb-10 px-4">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-[11px] tracking-[0.4em] uppercase text-background/40 mb-6"
          >
            Coming Soon
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-background mb-5 leading-[0.9]"
          >
            Live Shopping
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-background/50 text-base md:text-lg max-w-md mx-auto font-light leading-relaxed"
          >
            Curated experiences. Afro-descendant diaspora brands. Real-time discovery.
          </motion.p>
        </div>

        <AnimatePresence mode="wait">
          {!selectedCategory ? (
            /* Category Selection */
            <motion.div
              key="selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.3 }}
              className="max-w-5xl mx-auto px-4 pb-16"
            >
              <h2 className="text-center text-background/80 font-heading text-xl md:text-2xl font-medium mb-2">
                Choose your category
              </h2>
              <p className="text-center text-background/35 text-xs tracking-wide uppercase mb-10">
                Select one to join the waitlist
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Food & Beverage Card */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedCategory("food_beverage")}
                  className="group relative overflow-hidden rounded-2xl aspect-[4/5] md:aspect-[3/4] text-left"
                >
                  <img
                    src={fnbImage}
                    alt="Gourmet food and beverages"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                   <div className="absolute bottom-0 left-0 right-0 p-8">
                     <span className="font-heading text-[10px] tracking-[0.3em] uppercase text-background/40 block mb-3">
                       Category
                     </span>
                     <h3 className="font-heading text-3xl md:text-4xl font-bold text-background mb-3">
                       Food & Beverage
                     </h3>
                     <p className="text-background/50 text-sm leading-relaxed max-w-xs font-light">
                       Artisan snacks, craft drinks, gourmet sauces, and specialty ingredients from Black-owned food brands.
                     </p>
                   </div>
                </motion.button>

                {/* General Catalog Card */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedCategory("general_catalog")}
                  className="group relative overflow-hidden rounded-2xl aspect-[4/5] md:aspect-[3/4] text-left"
                >
                  <img
                    src={catalogImage}
                    alt="Curated lifestyle products"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                   <div className="absolute bottom-0 left-0 right-0 p-8">
                     <span className="font-heading text-[10px] tracking-[0.3em] uppercase text-background/40 block mb-3">
                       Category
                     </span>
                     <h3 className="font-heading text-3xl md:text-4xl font-bold text-background mb-3">
                       General Catalog
                     </h3>
                     <p className="text-background/50 text-sm leading-relaxed max-w-xs font-light">
                       Beauty, wellness, home goods, accessories, and lifestyle products across every category.
                     </p>
                   </div>
                </motion.button>
              </div>
            </motion.div>
          ) : (
            /* Form */
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-md mx-auto px-4 pb-16"
            >
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setJoinBoth(false);
                }}
                className="flex items-center gap-2 text-background/50 hover:text-background transition-colors font-heading text-sm tracking-wider uppercase mb-8"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>

              <div className="mb-10">
                <div className="inline-block px-4 py-1.5 rounded-full border border-background/15 mb-5">
                  <span className="font-heading text-[10px] tracking-[0.3em] uppercase text-background/60">
                    {categoryLabel}
                  </span>
                </div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-background mb-3">
                  Join the Waitlist
                </h2>
                <p className="text-background/40 text-sm font-light">
                  Be first to know when we go live.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-background/60 font-heading text-xs tracking-wider uppercase mb-2">
                    Name
                  </label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    required
                    className="bg-transparent border-background/20 text-background placeholder:text-background/30 focus-visible:ring-background/40 h-12"
                  />
                </div>
                <div>
                  <label className="block text-background/60 font-heading text-xs tracking-wider uppercase mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    required
                    className="bg-transparent border-background/20 text-background placeholder:text-background/30 focus-visible:ring-background/40 h-12"
                  />
                </div>
                <div>
                  <label className="block text-background/60 font-heading text-xs tracking-wider uppercase mb-2">
                    Business Website
                  </label>
                  <Input
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://yourbrand.com"
                    className="bg-transparent border-background/20 text-background placeholder:text-background/30 focus-visible:ring-background/40 h-12"
                  />
                </div>
                <div>
                  <label className="block text-background/60 font-heading text-xs tracking-wider uppercase mb-2">
                    Telephone
                  </label>
                  <Input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="bg-transparent border-background/20 text-background placeholder:text-background/30 focus-visible:ring-background/40 h-12"
                  />
                </div>
                <div>
                  <label className="block text-background/60 font-heading text-xs tracking-wider uppercase mb-2">
                    Do you have an affiliate program?
                  </label>
                  <select
                    value={affiliateProgram}
                    onChange={(e) => setAffiliateProgram(e.target.value)}
                    className="flex h-12 w-full rounded-md border border-background/20 bg-transparent px-3 py-2 text-base text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background/40 focus-visible:ring-offset-2 ring-offset-foreground"
                  >
                    <option value="" className="bg-foreground text-background">Select your platform...</option>
                    <option value="none" className="bg-foreground text-background">No, not yet</option>
                    <option value="Shopify Affiliate & Referral Programs" className="bg-foreground text-background">Shopify Affiliate & Referral Programs</option>
                    <option value="Impact" className="bg-foreground text-background">Impact</option>
                    <option value="CJ Affiliate" className="bg-foreground text-background">CJ Affiliate (Commission Junction)</option>
                    <option value="ShareASale" className="bg-foreground text-background">ShareASale</option>
                    <option value="Refersion" className="bg-foreground text-background">Refersion</option>
                    <option value="UpPromote" className="bg-foreground text-background">UpPromote (Shopify)</option>
                    <option value="GoAffPro" className="bg-foreground text-background">GoAffPro</option>
                    <option value="Awin" className="bg-foreground text-background">Awin</option>
                    <option value="Rakuten Advertising" className="bg-foreground text-background">Rakuten Advertising</option>
                    <option value="Amazon Associates" className="bg-foreground text-background">Amazon Associates</option>
                    <option value="Pepperjam" className="bg-foreground text-background">Pepperjam</option>
                    <option value="Skimlinks" className="bg-foreground text-background">Skimlinks</option>
                    <option value="LTK" className="bg-foreground text-background">LTK (LIKEtoKNOW.it)</option>
                    <option value="ShopStyle Collective" className="bg-foreground text-background">ShopStyle Collective</option>
                    <option value="CashBlack" className="bg-foreground text-background">CashBlack</option>
                    <option value="Afrofiliate" className="bg-foreground text-background">Afrofiliate</option>
                    <option value="Other" className="bg-foreground text-background">Other</option>
                  </select>
                </div>
                <div className="flex items-center gap-3 pt-1">
                  <Checkbox
                    id="joinBoth"
                    checked={joinBoth}
                    onCheckedChange={(v) => setJoinBoth(v === true)}
                    className="border-background/30 data-[state=checked]:bg-background data-[state=checked]:text-foreground"
                  />
                  <label htmlFor="joinBoth" className="text-background/60 text-sm cursor-pointer">
                    I'm interested in both categories
                  </label>
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full h-12 bg-background text-foreground hover:bg-background/90 font-heading tracking-wider uppercase text-sm mt-4"
                >
                  {submitting ? "Joining..." : "Join Waitlist"}
                </Button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default LiveShoppingWaitlist;
