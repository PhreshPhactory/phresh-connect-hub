import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Briefcase, GraduationCap, Award, ExternalLink } from "lucide-react";
import SEOHead from '@/components/SEOHead';
import kieraProfileImage from '@/assets/kiera-profile-hero.png';

const KieraProfile = () => {
  return (
    <>
      <SEOHead
        title="Kiera H. - Strategic Advisor & Fractional Executive | Phresh Phactory"
        description="Meet Kiera H., results-driven business strategist and Fractional Executive with 20+ years of experience helping startups and Black-owned businesses scale sustainably."
        keywords="Kiera H, Business Strategist, Fractional Executive, Operations Consulting, Remote Teams, EatOkra, Afrofiliate"
        canonicalUrl="https://phreshphactory.co/KieraH"
      />
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
        {/* Hero Section */}
        <section className="py-16 md:py-20">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-6">
                <img 
                  src={kieraProfileImage} 
                  alt="Kiera H. Profile"
                  className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-primary/20"
                />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-foreground">
                Kiera H.
              </h1>
              <h2 className="text-xl md:text-2xl font-semibold mb-3 text-primary">
                Strategic Advisor & Fractional Executive
              </h2>
              <h3 className="text-lg md:text-xl mb-4 text-muted-foreground">
                Growth Development in Food & Tech
              </h3>
              <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
                Seasoned strategic advisor with a deep understanding of business operations, marketplace development, and digital transformation in the food and tech industries.
              </p>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-12 md:py-16">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <Card className="p-6 md:p-8 mb-8">
                <CardContent className="p-0">
                  <h2 className="text-2xl md:text-3xl font-bold mb-6 text-primary">Professional Background</h2>
                  <div className="space-y-4 text-base md:text-lg leading-relaxed text-muted-foreground">
                    <p>
                      Kiera H. is a results-driven business strategist, Fractional Executive, and Founder of Phresh Phactory, Inc., a global operations and systems consultancy that helps vision-led startups, Black-owned businesses, and remote-first companies streamline operations, scale sustainably, and build high-performing virtual teams.
                    </p>
                    <p>
                      With over 20 years of experience spanning the U.S., the Caribbean, and Africa, Kiera is widely recognized for helping CEOs and Founders turn scattered efforts into structured, profitable operations.
                    </p>
                    <p>
                      A leading voice in the world of remote workforce development and diaspora business strategy, Kiera takes on Fractional Executive roles that create immediate and measurable impact.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Current Roles Detail */}
              <Card className="p-6 md:p-8 mb-8">
                <CardContent className="p-0">
                  <h2 className="text-2xl md:text-3xl font-bold mb-6 text-primary">Current Roles</h2>
                  <div className="space-y-6 text-base md:text-lg leading-relaxed text-muted-foreground">
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">Supplier Relationship Manager at EatOkra</h3>
                      <p>
                        Supporting Black-owned food and drink brands through partnerships, visibility strategies, and technology integration. Strengthening vendor relationships, enhancing marketplace performance, and developing strategies to increase brand visibility and revenue.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">Strategic Advisor to Afrofiliate</h3>
                      <p>
                        Developing a performance-based marketing framework to help brands equip affiliates with the tools they need to effectively promote culturally relevant products. Implementing affiliate marketing strategies, optimizing digital sales, and building remote sales teams.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">Fractional Executive at Phresh Phactory, Inc.</h3>
                      <p>
                        Leading client engagements that drive digital transformation, automated systems implementation, and global talent development, with a focus on helping consumer product companies, food entrepreneurs, and tech-enabled platforms scale without burnout.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Thought Leadership */}
              <Card className="p-6 md:p-8 mb-8">
                <CardContent className="p-0">
                  <h2 className="text-2xl md:text-3xl font-bold mb-6 text-primary">Thought Leadership</h2>
                  <p className="text-base md:text-lg text-muted-foreground mb-4">
                    Kiera is a published thought leader who writes two weekly newsletters:
                  </p>
                  <ul className="space-y-3 text-base md:text-lg text-muted-foreground">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span><strong>"EatOkra for Business"</strong> – Offering practical advice and grant resources for Black-owned food and beverage brands listed on the EatOkra app.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span><strong>"Phresh Phactory: Growth Notes"</strong> – A LinkedIn newsletter offering bold, no-fluff guidance to startup CEOs and founders focused on sustainable growth and operational excellence.</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Key Focus Areas */}
              <Card className="p-6 md:p-8 mb-8">
                <CardContent className="p-0">
                  <h3 className="text-2xl md:text-3xl font-bold mb-6 text-primary">Key Areas of Focus</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="text-base md:text-lg font-semibold mb-2 text-foreground">Marketplace Growth & Vendor Strategy</h4>
                      <p className="text-sm md:text-base text-muted-foreground">Strengthening digital platforms to boost sales and visibility.</p>
                    </div>
                    <div>
                      <h4 className="text-base md:text-lg font-semibold mb-2 text-foreground">Business Development & Strategic Partnerships</h4>
                      <p className="text-sm md:text-base text-muted-foreground">Connecting brands with resources and opportunities to scale.</p>
                    </div>
                    <div>
                      <h4 className="text-base md:text-lg font-semibold mb-2 text-foreground">Remote Team Development & Operations</h4>
                      <p className="text-sm md:text-base text-muted-foreground">Providing businesses with skilled talent and efficient structures.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Experience Cards */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <Card className="p-6">
                  <CardContent className="p-0">
                    <div className="flex items-center mb-3">
                      <Award className="h-5 w-5 text-primary mr-2" />
                      <h3 className="text-lg font-semibold">Military Background</h3>
                    </div>
                    <p className="text-sm md:text-base text-muted-foreground">
                      <strong>U.S. Army Veteran</strong> - Brings a disciplined, solutions-oriented approach to business challenges
                    </p>
                  </CardContent>
                </Card>

                <Card className="p-6">
                  <CardContent className="p-0">
                    <div className="flex items-center mb-3">
                      <GraduationCap className="h-5 w-5 text-primary mr-2" />
                      <h3 className="text-lg font-semibold">Innovation History</h3>
                    </div>
                    <p className="text-sm md:text-base text-muted-foreground">
                      Developed and sold multiple <strong>patented innovations to ExxonMobil</strong>, gaining experience in research, analysis, and commercialization
                    </p>
                  </CardContent>
                </Card>

                <Card className="p-6">
                  <CardContent className="p-0">
                    <div className="flex items-center mb-3">
                      <Briefcase className="h-5 w-5 text-primary mr-2" />
                      <h3 className="text-lg font-semibold">Strategic Collaborator</h3>
                    </div>
                    <p className="text-sm md:text-base text-muted-foreground">
                      Partner to award-winning platforms and has supported initiatives with CS Connect through partnership development and operational insight
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Book Section */}
              <Card className="p-6 md:p-8 mb-8 bg-gradient-to-r from-primary/5 to-secondary/5">
                <CardContent className="p-0">
                  <div className="flex flex-col lg:flex-row items-center gap-6 md:gap-8">
                    <div className="lg:w-1/3">
                      <img 
                        src="/lovable-uploads/5ed3b302-59d8-4819-ad61-811bf7dd4381.png" 
                        alt="Virtual. Freelance. Work from Home. - Create Highly Productive Teams by Learning to Become or Hire Remote Workers, Correctly"
                        className="w-full max-w-sm mx-auto rounded-lg shadow-lg"
                      />
                    </div>
                    <div className="lg:w-2/3 text-left">
                      <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-primary">
                        "Virtual. Freelance. Work from Home."
                      </h3>
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4 md:mb-6">
                        Create Highly Productive Teams by Learning to Become or Hire Remote Workers, Correctly. This insightful book delves into the world of freelancers, exploring who they are, how they can benefit individuals and businesses, and most importantly, how to successfully integrate them into your workforce.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button asChild>
                          <a href="https://www.amazon.com/Virtual-Freelance-Work-Home-Productive-ebook/dp/B0C6JB32S4" target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Buy on Amazon
                          </a>
                        </Button>
                        <Button variant="outline" asChild>
                          <a href="https://phreshphactoryinc.gumroad.com/l/GigEconomyBook" target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Buy on Gumroad
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Phresh Phactory TV Section */}
              <Card className="p-6 md:p-8 mb-8 bg-gradient-to-r from-secondary/10 to-primary/10">
                <CardContent className="p-0 text-center">
                  <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-primary">Phresh Phactory TV</h3>
                  <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
                    Subscribe to see more content on Fire TV, Apple Podcasts, Spotify, YouTube and more
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button variant="outline" asChild>
                      <a href="https://www.youtube.com/@PhreshPhactoryTV" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Watch on YouTube
                      </a>
                    </Button>
                    <Button variant="outline" asChild>
                      <a href="http://www.phreshphactory.tv/episodes" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Learn About Freelancing
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Section */}
              <Card className="p-6 md:p-8">
                <CardContent className="p-0 text-center">
                  <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-primary">Connect with Kiera</h3>
                  <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
                    Ready to transform your business with strategic expertise and remote team solutions?
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button asChild>
                      <a href="http://calendly.com/PhreshPhactory" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Book a Chat
                      </a>
                    </Button>
                    <Button variant="outline" asChild>
                      <a href="/brands">
                        Apply as a Brand
                      </a>
                    </Button>
                    <Button variant="outline" asChild>
                      <a href="https://www.linkedin.com/in/kieraphreshphactory/" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        LinkedIn
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default KieraProfile;