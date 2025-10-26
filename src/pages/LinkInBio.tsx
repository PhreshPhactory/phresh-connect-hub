import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import { ExternalLink } from "lucide-react";
import phreshLogo from "@/assets/phresh-phactory-logo.png";

const LinkInBio = () => {
  const brandLinks = [
    { name: "Name Your Ballz", url: "https://www.arjdj2msd.com/3DCFHG/23W5CH8/" },
    { name: "No Guilt Bakes", url: "https://noguiltbakes.co.uk/?_ef_transaction_id=&oid=50&affid=53" },
    { name: "All Shades Cards", url: "https://www.arjdj2msd.com/3DCFHG/9F3647" },
    { name: "BigUp Street Greets", url: "https://www.arjdj2msd.com/3DCFHG/2HKTT6J/" },
    { name: "Be Rooted", url: "https://www.arjdj2msd.com/3DCFHG/R74QP1/" },
    { name: "Affiliates", url: "#" },
  ];

  const workLinks = [
    { name: "Feature Your Brand", url: "/brand-partnership" },
    { name: "Become an Affiliate", url: "#" },
    { name: "Work With Us", url: "/contact" },
    { name: "Book Kiera H.", url: "/kiera" },
  ];

  return (
    <>
      <SEOHead
        title="Links | Phresh Phactory"
        description="Explore our curated collection of Black-owned brands and business opportunities. Shop, partner with us, or book a consultation."
        keywords="link in bio, Black-owned brands, business partnerships, affiliate program, fractional COO"
      />
      
      <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background py-12 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Profile Section */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-white">
              <img 
                src={phreshLogo} 
                alt="Phresh Phactory Inc Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-3xl font-bold mb-2 text-foreground">Phresh Phactory Inc</h1>
            <p className="text-muted-foreground">Your Source for Black Excellence</p>
          </div>

          {/* Main CTA */}
          <a 
            href="/buyblack" 
            className="block mb-8 group"
          >
            <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02]">
              <h2 className="text-2xl font-bold text-center mb-2">SHOP BUY BLACK</h2>
              <p className="text-center text-sm opacity-90">Discover Black-Owned Brands</p>
            </div>
          </a>

          {/* Brand Links */}
          <div className="space-y-3 mb-8">
            {brandLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                className="block w-full p-4 bg-card hover:bg-accent border border-border rounded-xl transition-all duration-200 hover:shadow-md hover:scale-[1.02] group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground">{link.name}</span>
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>
              </a>
            ))}
          </div>

          {/* Work With Us Section */}
          <div className="bg-gradient-to-br from-secondary/20 to-secondary/5 p-6 rounded-2xl border border-secondary/20 mb-8">
            <h2 className="text-2xl font-bold text-center mb-6 text-foreground">WORK WITH US</h2>
            <div className="space-y-3">
              {workLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="block w-full p-4 bg-background hover:bg-accent border border-border rounded-xl transition-all duration-200 hover:shadow-md hover:scale-[1.02] group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-foreground">{link.name}</span>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Phresh Phactory Inc. All rights reserved.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LinkInBio;
