
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import { emailSchema, createRateLimiter, validateHoneypot } from '@/utils/security';

const rateLimiter = createRateLimiter(5, 300000);

const PRODUCT_CATEGORIES = [
  'Food & Beverage',
  'Beauty & Skincare',
  'Hair Care',
  'Health & Wellness',
  'Fashion & Apparel',
  'Home & Lifestyle',
  'Kids & Baby',
  'Art & Culture',
  'Tech & Gadgets',
  'Books & Education',
  'Fitness & Sports',
  'Jewelry & Accessories',
];

const AffiliateNewsletter = () => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    whatsapp: '',
    textContact: '',
    instagram: '',
    tiktok: '',
    youtube: '',
    facebook: '',
    twitter: '',
    country: '',
  });
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [agreed, setAgreed] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const updateField = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateHoneypot(honeypot)) return;

    if (!form.fullName.trim()) {
      toast({ title: 'Name required', description: 'Please enter your full name.', variant: 'destructive' });
      return;
    }

    if (!rateLimiter(form.email)) {
      toast({ title: 'Too many attempts', description: 'Please wait before submitting again.', variant: 'destructive' });
      return;
    }

    try {
      emailSchema.parse(form.email);
    } catch {
      toast({ title: 'Invalid Email', description: 'Please enter a valid email address.', variant: 'destructive' });
      return;
    }

    if (selectedCategories.length === 0) {
      toast({ title: 'Select categories', description: 'Please select at least one product category.', variant: 'destructive' });
      return;
    }

    setLoading(true);
    try {
      const country = form.country.trim() || 'Unknown';

      const { error } = await supabase.from('affiliate_signups' as any).insert({
        full_name: form.fullName.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim() || null,
        whatsapp: form.whatsapp.trim() || null,
        text_contact: form.textContact.trim() || null,
        instagram: form.instagram.trim() || null,
        tiktok: form.tiktok.trim() || null,
        youtube: form.youtube.trim() || null,
        facebook: form.facebook.trim() || null,
        twitter: form.twitter.trim() || null,
        product_categories: selectedCategories,
        country,
        newsletter_opt_in: true,
      } as any);

      if (error) throw error;
      setSubmitted(true);
    } catch (error) {
      console.error('Error:', error);
      toast({ title: 'Something went wrong', description: 'Please try again later.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEOHead
        title="Become an Affiliate | Phresh Phactory, Inc."
        description="Join as an affiliate to sell products you love and receive our product newsletter with the latest brands and opportunities."
      />
      <div className="min-h-screen bg-background flex items-center justify-center px-4 py-16">
        <div className="max-w-2xl w-full">
          <Link to="/shop" className="text-sm text-muted-foreground hover:text-primary mb-8 inline-block">
            ← Back to Shop
          </Link>

          {submitted ? (
            <div className="text-center space-y-6 py-12">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">Welcome to the team!</h1>
              <p className="text-lg text-muted-foreground max-w-md mx-auto">
                You're now signed up as an affiliate. Watch your inbox for the latest product spotlights and partnership opportunities.
              </p>
              <Button asChild size="lg" className="mt-4">
                <Link to="/shop">Continue Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                  Become an Affiliate
                </h1>
                <p className="text-lg text-muted-foreground">
                  Sign up to sell the products you love and earn commissions.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 p-6 md:p-8 rounded-2xl border bg-card shadow-sm">
                {/* Basic Info */}
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-foreground">Your Info</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input id="fullName" required value={form.fullName} onChange={e => updateField('fullName', e.target.value)} placeholder="Your full name" maxLength={100} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" type="email" required value={form.email} onChange={e => updateField('email', e.target.value)} placeholder="you@example.com" maxLength={255} />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="country">Country *</Label>
                      <Input id="country" required value={form.country} onChange={e => updateField('country', e.target.value)} placeholder="e.g. United States, Nigeria, Brazil" maxLength={100} />
                    </div>
                  </div>
                </div>

                {/* Contact Methods */}
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-foreground">Contact Methods</h2>
                  <p className="text-sm text-muted-foreground">How can we reach you? Fill in any that apply.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telephone</Label>
                      <Input id="phone" type="tel" value={form.phone} onChange={e => updateField('phone', e.target.value)} placeholder="+1 (555) 000-0000" maxLength={20} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="whatsapp">WhatsApp</Label>
                      <Input id="whatsapp" type="tel" value={form.whatsapp} onChange={e => updateField('whatsapp', e.target.value)} placeholder="+1 (555) 000-0000" maxLength={20} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="textContact">Text / iMessage / iCloud</Label>
                      <Input id="textContact" value={form.textContact} onChange={e => updateField('textContact', e.target.value)} placeholder="Number or iCloud email" maxLength={100} />
                    </div>
                  </div>
                </div>

                {/* Social Handles */}
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-foreground">Social Media</h2>
                  <p className="text-sm text-muted-foreground">Share your handles so we can connect.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="instagram">Instagram</Label>
                      <Input id="instagram" value={form.instagram} onChange={e => updateField('instagram', e.target.value)} placeholder="@yourhandle" maxLength={100} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tiktok">TikTok</Label>
                      <Input id="tiktok" value={form.tiktok} onChange={e => updateField('tiktok', e.target.value)} placeholder="@yourhandle" maxLength={100} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="youtube">YouTube</Label>
                      <Input id="youtube" value={form.youtube} onChange={e => updateField('youtube', e.target.value)} placeholder="Channel name or URL" maxLength={200} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="facebook">Facebook</Label>
                      <Input id="facebook" value={form.facebook} onChange={e => updateField('facebook', e.target.value)} placeholder="Profile or page URL" maxLength={200} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="twitter">X (Twitter)</Label>
                      <Input id="twitter" value={form.twitter} onChange={e => updateField('twitter', e.target.value)} placeholder="@yourhandle" maxLength={100} />
                    </div>
                  </div>
                </div>

                {/* Product Categories */}
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-foreground">Product Categories *</h2>
                  <p className="text-sm text-muted-foreground">What do you specialize in? Select all that apply.</p>
                  <div className="flex flex-wrap gap-2">
                    {PRODUCT_CATEGORIES.map(category => {
                      const selected = selectedCategories.includes(category);
                      return (
                        <button
                          key={category}
                          type="button"
                          onClick={() => toggleCategory(category)}
                          className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                            selected
                              ? 'bg-primary text-primary-foreground border-primary'
                              : 'bg-background text-foreground border-border hover:border-primary/50'
                          }`}
                        >
                          {selected && <Check className="w-3 h-3 inline mr-1.5" />}
                          {category}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Affiliate Agreement */}
                <div className="p-5 rounded-lg bg-muted/50 border space-y-4">
                  <h2 className="text-lg font-semibold text-foreground">Affiliate Agreement</h2>
                  <div className="text-sm text-muted-foreground space-y-3 leading-relaxed">
                    <p>By submitting this application, you acknowledge and agree to the following:</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>All information provided in this application is accurate and truthful. Providing false or misleading information may result in immediate removal from the program.</li>
                      <li>As an affiliate, you will represent featured brands with integrity, professionalism, and in alignment with Phresh Phactory, Inc.'s standards and values.</li>
                      <li>You consent to receive our product newsletter, which includes curated brand spotlights, new partnership opportunities, and program updates. You may unsubscribe at any time.</li>
                      <li>Commission structures, rates, and terms will be communicated on a per-partnership basis. Phresh Phactory, Inc. reserves the right to modify commission terms with prior notice.</li>
                      <li>Your personal information will be used solely for affiliate program administration and newsletter delivery. We do not sell or share your data with third parties.</li>
                      <li>Phresh Phactory, Inc. reserves the right to approve or decline any application, and to revoke affiliate status at any time for conduct that does not align with our brand standards.</li>
                    </ul>
                  </div>
                  <div className="flex items-start gap-3 pt-2">
                    <Checkbox
                      id="agree"
                      checked={agreed}
                      onCheckedChange={(checked) => setAgreed(checked === true)}
                      className="mt-0.5"
                    />
                    <label htmlFor="agree" className="text-sm text-foreground cursor-pointer leading-relaxed font-medium">
                      I have read and agree to the terms outlined above.
                    </label>
                  </div>
                </div>

                {/* Honeypot */}
                <div style={{ display: 'none' }}>
                  <input type="text" value={honeypot} onChange={e => setHoneypot(e.target.value)} tabIndex={-1} autoComplete="off" />
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={loading || !agreed}>
                  {loading ? 'Signing up...' : 'Join as an Affiliate'}
                  {!loading && <ArrowRight className="w-4 h-4 ml-2" />}
                </Button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AffiliateNewsletter;
