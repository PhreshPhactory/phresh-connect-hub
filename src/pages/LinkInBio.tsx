import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import { ExternalLink, Play } from "lucide-react";
import { Link } from "react-router-dom";
import phreshLogo from "@/assets/phresh-phactory-logo.png";
import backgroundImage from "@/assets/link-bio-background.png";

const LinkInBio = () => {
  const brandLinks = [
    { name: "No Guilt Bakes", url: "https://noguiltbakes.co.uk/?_ef_transaction_id=&oid=50&affid=53" },
    { name: "Big Up Street Greets", url: "https://www.arjdj2msd.com/3DCFHG/2HKTT6J/" },
    { name: "Name Your Ballz", url: "https://www.arjdj2msd.com/3DCFHG/23W5CH8/" },
  ];

  const upNextBrands = [
    { name: "PetPlate", url: "https://www.arjdj2msd.com/3DCFHG/PETPLATE" },
    { name: "Be Rooted", url: "https://www.arjdj2msd.com/3DCFHG/R74QP1/" },
    { name: "All Shades Cards", url: "https://www.arjdj2msd.com/3DCFHG/9F3647" },
  ];

  const workLinks = [
    { name: "Feature Your Brand", url: "/brands" },
    { name: "Work With Us", url: "/contact" },
    { name: "Become an Afrofiliate", url: "/contact" },
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

          {/* Watch & Shop Button */}
          <Link to="/shop" className="block mb-10">
            <Button className="w-full py-14 px-8 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] rounded-xl">
              <div className="flex items-center gap-6 w-full justify-center">
                <div className="bg-white/20 rounded-xl p-4 flex items-center justify-center">
                  <Play className="w-24 h-24 flex-shrink-0 text-white fill-white" />
                </div>
                <div className="flex flex-col items-start -space-y-2">
                  <span className="text-3xl font-bold leading-none">Watch & Shop</span>
                  <span className="text-3xl font-bold leading-none">Phresh Phactory TV</span>
                </div>
              </div>
            </Button>
          </Link>

          {/* Main CTA with Brand Links */}
          <div className="p-[2px] bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl shadow-lg mb-8">
            <div className="bg-white/95 backdrop-blur-sm text-gray-900 p-6 rounded-2xl">
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
              
              {/* Up Next Divider */}
              <div className="py-2 text-center">
                <span className="text-lg font-bold text-gray-700 font-heading">Up Next</span>
              </div>
              
              {upNextBrands.map((link, index) => (
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
          </div>

          {/* Work With Us Section */}
          <div className="p-[2px] bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl shadow-lg mb-8">
            <div className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl">
              <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 font-heading">Work With Us</h2>
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
