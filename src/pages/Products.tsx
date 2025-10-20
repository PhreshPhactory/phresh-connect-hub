import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Star, BookOpen, ShoppingCart } from "lucide-react";
import YouTubeSection from "@/components/home/YouTubeSection";

const Products = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-background">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
              Our Products
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover our curated collection of resources and tools to help you build successful remote teams and scale your business.
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-muted">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Featured Book */}
              <Card className="col-span-full lg:col-span-2 p-8 bg-card border border-border">
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
                      <div className="flex items-center gap-2 mb-4">
                        <Badge variant="secondary" className="text-teal">
                          <BookOpen className="h-4 w-4 mr-1" />
                          Featured Book
                        </Badge>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <h2 className="text-3xl font-bold mb-4 text-teal">
                        "Virtual. Freelance. Work from Home."
                      </h2>
                      <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                        Create Highly Productive Teams by Learning to Become or Hire Remote Workers, Correctly. This comprehensive guide provides practical insights into building and managing remote teams, understanding the gig economy, and implementing effective remote work strategies.
                      </p>
                      
                      <div className="space-y-4 mb-6">
                        <h3 className="text-xl font-semibold text-teal">What You'll Learn:</h3>
                        <ul className="space-y-2 text-muted-foreground">
                          <li className="flex items-start">
                            <span className="text-teal mr-2">•</span>
                            How to identify and hire the right remote workers
                          </li>
                          <li className="flex items-start">
                            <span className="text-teal mr-2">•</span>
                            Effective communication strategies for remote teams
                          </li>
                          <li className="flex items-start">
                            <span className="text-teal mr-2">•</span>
                            Best practices for remote workforce management
                          </li>
                          <li className="flex items-start">
                            <span className="text-teal mr-2">•</span>
                            Understanding the freelance economy and its benefits
                          </li>
                        </ul>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button size="lg" className="text-lg px-8 py-4" asChild>
                          <a href="https://www.amazon.com/Virtual-Freelance-Work-Home-Productive-ebook/dp/B0C6JB32S4" target="_blank" rel="noopener noreferrer">
                            <ShoppingCart className="h-5 w-5 mr-2" />
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
            </div>

            {/* Coming Soon Section */}
            <div className="mt-16">
              <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Coming Soon</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="p-6 opacity-75 bg-card border border-border">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-xl text-foreground">Remote Team Templates</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="text-muted-foreground mb-4">
                      Ready-to-use templates and frameworks for building effective remote teams.
                    </p>
                    <Badge variant="outline">Coming Soon</Badge>
                  </CardContent>
                </Card>

                <Card className="p-6 opacity-75 bg-card border border-border">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-xl text-foreground">Digital Courses</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="text-muted-foreground mb-4">
                      Comprehensive online courses on remote work best practices and team management.
                    </p>
                    <Badge variant="outline">Coming Soon</Badge>
                  </CardContent>
                </Card>

                <Card className="p-6 opacity-75 bg-card border border-border">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-xl text-foreground">Consultation Packages</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="text-muted-foreground mb-4">
                      Tailored consultation packages for businesses looking to transition to remote work.
                    </p>
                    <Badge variant="outline">Coming Soon</Badge>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* YouTube Section */}
      <YouTubeSection />
    </div>
  );
};

export default Products;