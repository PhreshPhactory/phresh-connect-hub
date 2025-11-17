import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CheckCircle2 } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const AffiliateCourseWaitlist = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    brand: '',
    timeline: ''
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.timeline) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert({
          email: formData.email,
          name: formData.name,
          source: `Affiliate Course Waitlist - ${formData.timeline}${formData.brand ? ` - ${formData.brand}` : ''}`
        });

      if (error) throw error;

      setIsSubmitted(true);
      toast({
        title: "Success!",
        description: "You've been added to the waitlist.",
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEOHead
        title="Affiliate Sales Starter Course | Waitlist"
        description="Join the waitlist for the beginner-friendly affiliate sales course by Phresh Phactory, Inc. Learn how to set up, prepare, and activate your affiliate program the right way."
        keywords="affiliate marketing course, affiliate program setup, beginner affiliate course, brand affiliate training"
        canonicalUrl="/affiliate-starter-course-waitlist"
      />

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-ink-black via-teal-700 to-ink-black">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(212,175,55,0.3),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(0,108,108,0.3),transparent_50%)]" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-bright-white mb-6 leading-tight">
                Affiliate Sales<br />Starter Course
              </h1>
              
              <p className="text-xl md:text-2xl text-bright-white/90 mb-6 max-w-3xl mx-auto leading-relaxed">
                Coming Soon — Join the Waitlist
              </p>
              
              <p className="text-lg md:text-xl text-bright-white/80 max-w-3xl mx-auto leading-relaxed">
                A beginner-friendly, self-paced version of my full affiliate system designed for small brands and new founders who want to prepare their affiliate program without investing in a full Bootcamp or a Holiday Sprint.
              </p>
            </div>
          </div>
        </section>

        {/* What You'll Learn Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
                  What You'll Learn
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-teal via-strategic-gold to-rust mx-auto" />
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <Card className="border-2 border-teal/30 hover:border-teal transition-all duration-300">
                  <CardContent className="p-8 text-center">
                    <h3 className="text-xl font-heading font-bold text-foreground mb-4">
                      How to set up your affiliate program the right way
                    </h3>
                  </CardContent>
                </Card>

                <Card className="border-2 border-strategic-gold/30 hover:border-strategic-gold transition-all duration-300">
                  <CardContent className="p-8 text-center">
                    <h3 className="text-xl font-heading font-bold text-foreground mb-4">
                      How to prepare your products for affiliate selling
                    </h3>
                  </CardContent>
                </Card>

                <Card className="border-2 border-rust/30 hover:border-rust transition-all duration-300">
                  <CardContent className="p-8 text-center">
                    <h3 className="text-xl font-heading font-bold text-foreground mb-4">
                      What creators need to confidently sell your brand
                    </h3>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* What's Included Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
                  What's Included in the Course
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-strategic-gold to-rust mx-auto" />
              </div>

              <Card className="border-2 border-border shadow-xl">
                <CardContent className="p-10 md:p-12">
                  <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-strategic-gold mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">Affiliate program setup fundamentals</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-strategic-gold mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">How to choose the right hero products</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-strategic-gold mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">How to create messaging, hooks & talking points</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-strategic-gold mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">How to build a mini content kit</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-strategic-gold mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">How to create a deep link map</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-strategic-gold mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">How to prepare affiliates for selling</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-strategic-gold mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">Templates, prompts, and worksheets</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Waitlist Form Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
                  Join the Waitlist
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-strategic-gold to-rust mx-auto" />
              </div>

              {!isSubmitted ? (
                <Card className="border-2 border-strategic-gold/30 shadow-xl">
                  <CardContent className="p-10">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-foreground font-semibold">
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                          className="border-2"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-foreground font-semibold">
                          Email *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                          className="border-2"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="brand" className="text-foreground font-semibold">
                          Brand Name <span className="text-muted-foreground">(optional)</span>
                        </Label>
                        <Input
                          id="brand"
                          type="text"
                          value={formData.brand}
                          onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                          className="border-2"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="timeline" className="text-foreground font-semibold">
                          How soon do you want to start your affiliate program? *
                        </Label>
                        <Select
                          value={formData.timeline}
                          onValueChange={(value) => setFormData({ ...formData, timeline: value })}
                          required
                        >
                          <SelectTrigger className="border-2">
                            <SelectValue placeholder="Select timeline" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="asap">ASAP</SelectItem>
                            <SelectItem value="30-days">Within 30 days</SelectItem>
                            <SelectItem value="3-months">In the next 3 months</SelectItem>
                            <SelectItem value="exploring">Just exploring</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-strategic-gold hover:bg-strategic-gold/90 text-ink-black font-heading font-semibold text-lg py-6 h-auto"
                      >
                        {isSubmitting ? 'Joining...' : 'Join the Waitlist'}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-2 border-teal shadow-xl">
                  <CardContent className="p-16 text-center">
                    <div className="flex justify-center mb-6">
                      <CheckCircle2 className="w-16 h-16 text-teal" />
                    </div>
                    <h3 className="text-3xl font-heading font-bold text-foreground mb-4">
                      You're on the list!
                    </h3>
                    <p className="text-lg text-muted-foreground">
                      You'll be the first to know when the course opens.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AffiliateCourseWaitlist;
