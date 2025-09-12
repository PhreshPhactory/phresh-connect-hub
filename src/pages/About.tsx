import React from 'react';
import SEOHead from '@/components/SEOHead';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  return (
    <>
      <SEOHead
        title="About Phresh Phactory | Business Transformation Experts"
        description="Learn about Phresh Phactory's mission to empower businesses through strategic transformation, fractional leadership, and innovative solutions."
        keywords="about phresh phactory, business transformation experts, fractional leadership team, global talent specialists"
      />

      <div className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6 text-center">
              About Phresh Phactory
            </h1>
            <p className="text-xl text-muted-foreground text-center mb-12">
              We're passionate about helping businesses unlock their full potential through strategic transformation and innovative solutions.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              <Card className="bg-muted/50">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                  <p className="text-muted-foreground">
                    To empower businesses of all sizes to achieve exponential growth through strategic transformation, 
                    fractional leadership, and access to world-class global talent. We believe every company deserves 
                    C-suite expertise and cutting-edge solutions.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-muted/50">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
                  <p className="text-muted-foreground">
                    To be the leading catalyst for business transformation globally, creating a world where every 
                    organization has access to the strategic leadership and innovative solutions needed to thrive 
                    in the modern economy.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold font-heading mb-8">Why Choose Phresh Phactory?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-tertiary mb-2">500+</div>
                  <p className="text-muted-foreground">Successful Transformations</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-teal mb-2">98%</div>
                  <p className="text-muted-foreground">Client Satisfaction Rate</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">50+</div>
                  <p className="text-muted-foreground">Countries Served</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;