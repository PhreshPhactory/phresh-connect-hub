import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import { ExternalLink, Play } from "lucide-react";
import { Link } from "react-router-dom";
import phreshLogo from "@/assets/phresh-phactory-logo.png";
import backgroundImage from "@/assets/link-bio-background.png";

const LinkInBio = () => {
  const brandLinks = [
    { name: "Big Up Street Greets", url: "https://www.arjdj2msd.com/3DCFHG/2HKTT6J/" },
    { name: "Be Rooted", url: "https://www.arjdj2msd.com/3DCFHG/R74QP1/" },
    { name: "All Shades Cards", url: "https://www.arjdj2msd.com/3DCFHG/9F3647" },
    { name: "No Guilt Bakes", url: "https://noguiltbakes.co.uk/?_ef_transaction_id=&oid=50&affid=53" },
    { name: "Name Your Ballz", url: "https://www.arjdj2msd.com/3DCFHG/23W5CH8/" },
  ];

  const workLinks = [
    { name: "Feature Your Brand", url: "/brands" },
    { name: "Work With Us", url: "/contact" },
    { name: "Book Kiera H.", url: "https://phreshphactory.com/kierah" },
  ];

  return (
    <>
      <SEOHead
        title="Links | Phresh Phactory, Inc."
        description="Explore our curated collection of Black-owned brands and business opportunities. Shop, partner with us, or book a consultation."
        keywords="link in bio, Black-owned brands, business partnerships, affiliate program, fractional COO"
      />
      
      <div 
        className="min-h-screen py-12 px-4 bg-cover bg-center bg-no-repeat relative font-heading"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="max-w-md mx-auto relative z-10">
          {/* Profile Section */}
          <div className="text-center mb-8">
            <div className="w-36 h-36 mx-auto mb-4 rounded-full overflow-hidden bg-white">
              <img 
                src={phreshLogo} 
                alt="Phresh Phactory, Inc. Logo" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Watch & Shop Buy Black Button */}
          <Link to="/BuyBlack" className="block mb-6">
            <Button className="w-full py-14 px-8 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] rounded-xl">
              <div className="flex flex-col items-center gap-1 w-full">
                <div className="flex items-center gap-3">
                  <Play className="w-12 h-12" />
                  <span className="text-3xl font-bold">Watch & Shop</span>
                </div>
                <span className="text-4xl font-bold leading-tight">Buy Black</span>
              </div>
            </Button>
          </Link>

          {/* Main CTA with Brand Links */}
          <div className="bg-white/95 backdrop-blur-sm text-gray-900 p-6 rounded-2xl shadow-lg mb-8 border-2 border-yellow-400">
            <h2 className="text-2xl font-bold text-center mb-6 font-heading">Shop the Brands</h2>
            <div className="space-y-3">
              {brandLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="block w-full p-4 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl transition-all duration-200 hover:shadow-md hover:scale-[1.02] group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-900 font-heading">{link.name}</span>
                    <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-gray-900 transition-colors" />
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Work With Us Section */}
          <div className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl border-2 border-green-600 mb-8 shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 font-heading">WORK WITH US</h2>
            <div className="space-y-3">
              {workLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="block w-full p-4 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl transition-all duration-200 hover:shadow-md hover:scale-[1.02] group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-900 font-heading">{link.name}</span>
                    <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-gray-900 transition-colors" />
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-white drop-shadow-lg font-medium font-heading">
            <p>© {new Date().getFullYear()} Phresh Phactory, Inc. All rights reserved.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LinkInBio;
