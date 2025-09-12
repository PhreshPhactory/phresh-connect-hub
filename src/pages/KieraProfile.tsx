import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Briefcase, GraduationCap, Award, ExternalLink } from "lucide-react";

const KieraProfile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <img 
                src="/lovable-uploads/5ed3b302-59d8-4819-ad61-811bf7dd4381.png" 
                alt="Kiera H. Profile"
                className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-primary/20"
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              Kiera H.
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-primary-600">
              Strategic Advisor
            </h2>
            <h3 className="text-xl md:text-2xl mb-6 text-muted-foreground">
              Growth Development in Food & Tech
            </h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Seasoned strategic advisor with a deep understanding of business operations, marketplace development, and digital transformation in the food and tech industries.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 mb-8">
              <CardContent className="p-0">
                <h2 className="text-3xl font-bold mb-6 text-primary-600">About Kiera</h2>
                <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
                  <p>
                    Kiera H. is a strategic advisor and operational expert specializing in marketplace growth, vendor relations, and digital transformation for food and tech businesses. As a <strong>Fractional Executive from Phresh Phactory, Inc.</strong>, she not only provides high-level strategy but also builds <strong>remote teams and operational frameworks</strong> that help businesses scale efficiently and sustainably.
                  </p>
                  <p>
                    Currently serving as <strong>Supplier Relationship Manager at EatOkra</strong>, the leading discovery platform for Black-owned food businesses, Kiera strengthens vendor relationships, enhances marketplace performance, and develops strategies to increase brand visibility and revenue.
                  </p>
                  <p>
                    Beyond her work with EatOkra, Kiera is a <strong>Strategic Advisor for Afrofiliate</strong>, an initiative that connects Black-owned CPG brands with community-driven sales opportunities. She helps brands <strong>implement affiliate marketing strategies, optimize digital sales, and build their own remote sales teams</strong>.
                  </p>
                  <p>
                    With expertise in <strong>business development, remote workforce management, and digital ecosystems</strong>, Kiera equips businesses with the tools, structure, and manpower they need to compete and thrive.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Key Focus Areas */}
            <Card className="p-8 mb-8">
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold mb-6 text-primary-600">Key Areas of Focus</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-primary-600">Marketplace Growth & Vendor Strategy</h4>
                    <p className="text-muted-foreground">Strengthening digital platforms to boost sales and visibility.</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-primary-600">Business Development & Strategic Partnerships</h4>
                    <p className="text-muted-foreground">Connecting brands with resources, each other and opportunities to scale.</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-primary-600">Remote Team Development & Operations</h4>
                    <p className="text-muted-foreground">Providing businesses with skilled talent and efficient structures.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Experience Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <Card className="p-6">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    <Briefcase className="h-6 w-6 text-primary-600 mr-3" />
                    <h3 className="text-xl font-semibold">Current Roles</h3>
                  </div>
                  <div className="space-y-3 text-muted-foreground">
                    <p><strong>Supplier Relationship Manager</strong> at EatOkra</p>
                    <p><strong>Strategic Advisor</strong> for Afrofiliate</p>
                    <p><strong>Fractional Executive</strong> at Phresh Phactory, Inc.</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    <Award className="h-6 w-6 text-primary-600 mr-3" />
                    <h3 className="text-xl font-semibold">Military Background</h3>
                  </div>
                  <p className="text-muted-foreground">
                    <strong>U.S. Army Veteran</strong> - Brings a disciplined, solutions-oriented approach to business challenges
                  </p>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    <GraduationCap className="h-6 w-6 text-primary-600 mr-3" />
                    <h3 className="text-xl font-semibold">Innovation History</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Developed and sold multiple <strong>patented innovations to ExxonMobil</strong>, gaining experience in research, analysis, and commercialization
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Book Section */}
            <Card className="p-8 mb-8 bg-gradient-to-r from-primary/5 to-secondary/5">
              <CardContent className="p-0">
                <div className="flex flex-col lg:flex-row items-center gap-8">
                  <div className="lg:w-1/3">
                    <img 
                      src="/lovable-uploads/5ed3b302-59d8-4819-ad61-811bf7dd4381.png" 
                      alt="Virtual. Freelance. Work from Home. - Create Highly Productive Teams by Learning to Become or Hire Remote Workers, Correctly"
                      className="w-full max-w-sm mx-auto rounded-lg shadow-lg"
                    />
                  </div>
                  <div className="lg:w-2/3 text-left">
                    <h3 className="text-2xl font-bold mb-4 text-primary-600">
                      My Book: "Virtual. Freelance. Work from Home."
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      Create Highly Productive Teams by Learning to Become or Hire Remote Workers, Correctly. This insightful book delves into the world of freelancers, exploring who they are, how they can benefit individuals and businesses, and most importantly, how to successfully integrate them into your workforce.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button size="lg" className="text-lg px-8 py-4" asChild>
                        <a href="https://www.amazon.com/Virtual-Freelance-Work-Home-Productive-ebook/dp/B0C6JB32S4" target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-5 w-5 mr-2" />
                          Buy on Amazon
                        </a>
                      </Button>
                      <Button variant="outline" size="lg" className="text-lg px-8 py-4" asChild>
                        <a href="https://phreshphactoryinc.gumroad.com/l/GigEconomyBook" target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-5 w-5 mr-2" />
                          Buy on Gumroad
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Phresh Phactory TV Section */}
            <Card className="p-8 mb-8 bg-gradient-to-r from-secondary/10 to-primary/10">
              <CardContent className="p-0 text-center">
                <h3 className="text-2xl font-bold mb-4 text-primary-600">Phresh Phactory TV</h3>
                <p className="text-muted-foreground mb-6">
                  Subscribe to see more content on Fire TV, Apple Podcasts, Spotify, YouTube and more
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" size="lg" asChild>
                    <a href="https://www.youtube.com/@PhreshPhactoryTV" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-5 w-5 mr-2" />
                      Watch on YouTube
                    </a>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <a href="http://www.phreshphactory.tv/episodes" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-5 w-5 mr-2" />
                      Learn About Freelancing
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Contact Section */}
            <Card className="p-8">
              <CardContent className="p-0 text-center">
                <h3 className="text-2xl font-bold mb-4 text-primary-600">Connect with Kiera</h3>
                <p className="text-muted-foreground mb-6">
                  Ready to transform your business with strategic expertise and remote team solutions?
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="text-lg px-8 py-4" asChild>
                    <a href="http://calendly.com/PhreshPhactory" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-5 w-5 mr-2" />
                      Book a Chat
                    </a>
                  </Button>
                  <Button variant="outline" size="lg" className="text-lg px-8 py-4" asChild>
                    <a href="mailto:kiera@phreshphactory.co">
                      Send a Message
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default KieraProfile;