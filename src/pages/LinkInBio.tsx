import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import { ExternalLink, Play, Youtube, Instagram, Grid3x3 } from "lucide-react";
import { Link } from "react-router-dom";
import phreshLogo from "@/assets/phresh-phactory-logo.png";
import backgroundImage from "@/assets/link-bio-background.png";
import { supabase } from "@/integrations/supabase/client";

interface BrandLink {
  id: string;
  name: string;
  url: string;
  display_order: number;
  is_featured: boolean;
}

const LinkInBio = () => {
  const [brandLinks, setBrandLinks] = useState<BrandLink[]>([]);
  const [upNextBrands, setUpNextBrands] = useState<BrandLink[]>([]);
  const [loading, setLoading] = useState(true);

  const workLinks = [
    { name: "Feature Your Brand", url: "/brands" },
    { name: "Work With Us", url: "/contact" },
    { name: "Become an Afrofiliate", url: "/contact" },
    { name: "Book Kiera H.", url: "https://phreshphactory.com/kierah" },
  ];

  useEffect(() => {
    fetchBrandLinks();
  }, []);

  const fetchBrandLinks = async () => {
    try {
      const { data, error } = await supabase
        .from('brand_links')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      
      const featured = (data || []).filter(link => link.is_featured);
      const upNext = (data || []).filter(link => !link.is_featured);
      
      setBrandLinks(featured);
      setUpNextBrands(upNext);
    } catch (error) {
      console.error('Error fetching brand links:', error);
    } finally {
      setLoading(false);
    }
  };

  const trackClick = async (linkName: string, linkUrl: string) => {
    try {
      // Truncate values to match DB column limits
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
            
            {/* Social Media Links */}
            <div className="flex justify-center gap-4 mt-6">
              <a
                href="https://www.youtube.com/@phreshphactoryTV"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackClick("YouTube - @PhreshPhactoryTV", "https://www.youtube.com/@phreshphactoryTV")}
                className="w-12 h-12 bg-white/95 backdrop-blur-sm hover:bg-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg"
              >
                <Youtube className="w-6 h-6 text-red-600" />
              </a>
              <a
                href="https://www.instagram.com/phreshphactorytv/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackClick("Instagram - @PhreshPhactoryTV", "https://www.instagram.com/phreshphactorytv/")}
                className="w-12 h-12 bg-white/95 backdrop-blur-sm hover:bg-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg"
              >
                <Instagram className="w-6 h-6 text-pink-600" />
              </a>
              <a
                href="https://www.pinterest.com/phreshphactorytv/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackClick("Pinterest - @PhreshPhactoryTV", "https://www.pinterest.com/phreshphactorytv/")}
                className="w-12 h-12 bg-white/95 backdrop-blur-sm hover:bg-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg"
              >
                <Grid3x3 className="w-6 h-6 text-red-600" />
              </a>
              <a
                href="https://www.tiktok.com/@PhreshPhactoryTV"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackClick("TikTok - @PhreshPhactoryTV", "https://www.tiktok.com/@PhreshPhactoryTV")}
                className="w-12 h-12 bg-white/95 backdrop-blur-sm hover:bg-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg"
              >
                <Play className="w-6 h-6 text-gray-900" />
              </a>
            </div>
          </div>

          {/* Watch & Shop Button */}
          <Link 
            to="/shop" 
            className="block mb-10"
            onClick={() => trackClick("Watch & Shop - Phresh Phactory TV", "/shop")}
          >
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
          {loading ? (
            <div className="p-[2px] bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl shadow-lg mb-8">
              <div className="bg-white/95 backdrop-blur-sm text-gray-900 p-6 rounded-2xl text-center">
                <p className="text-gray-600">Loading brands...</p>
              </div>
            </div>
          ) : (
            <div className="p-[2px] bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl shadow-lg mb-8">
              <div className="bg-white/95 backdrop-blur-sm text-gray-900 p-6 rounded-2xl">
                <h2 className="text-2xl font-bold text-center mb-6 font-heading">Shop the Brands</h2>
              <div className="space-y-3">
                {brandLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackClick(link.name, link.url)}
                    className="block w-full p-4 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl transition-all duration-200 hover:shadow-md hover:scale-[1.02] group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-900 font-heading">{link.name}</span>
                      <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-gray-900 transition-colors" />
                    </div>
                  </a>
                ))}
                
                {upNextBrands.length > 0 && (
                  <>
                    {/* Up Next Divider */}
                    <div className="py-2 text-center">
                      <span className="text-lg font-bold text-gray-700 font-heading">Up Next</span>
                    </div>
                    
                    {upNextBrands.map((link) => (
                      <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackClick(link.name, link.url)}
                        className="block w-full p-4 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl transition-all duration-200 hover:shadow-md hover:scale-[1.02] group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-gray-900 font-heading">{link.name}</span>
                          <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-gray-900 transition-colors" />
                        </div>
                      </a>
                    ))}
                  </>
                )}
              </div>
              </div>
            </div>
          )}

          {/* Work With Us Section */}
          <div className="p-[2px] bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl shadow-lg mb-8">
            <div className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl">
              <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 font-heading">Work With Us</h2>
            <div className="space-y-3">
              {workLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  onClick={() => trackClick(link.name, link.url)}
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
