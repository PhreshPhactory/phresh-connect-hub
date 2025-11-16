import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Upload, Loader2 } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import NewsletterSignup from "@/components/NewsletterSignup";

const formSchema = z.object({
  // Section 1: Brand Information
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  brandName: z.string().min(2, "Brand name is required"),
  email: z.string().email("Invalid email address"),
  brandWebsite: z.string().url("Invalid URL"),
  socialHandle: z.string().min(1, "Social handle is required"),
  brandDescription: z.string().min(10, "Please provide a short description"),
  brandCategory: z.string().min(1, "Please select a category"),
  
  // Section 2: Affiliate Program Details
  hasAffiliateProgram: z.enum(["yes", "no", "not-sure"]),
  affiliatePlatform: z.string().optional(),
  affiliateSignupLink: z.string().optional(),
  sampleTrackingLinks: z.string().optional(),
  hasDeepLinks: z.string().optional(),
  needDeepLinksCreated: z.string().optional(),
  
  // Section 3: Product Details
  productsDescription: z.string().min(20, "Please list all products with URLs"),
  highestMarginProducts: z.string().optional(),
  bestSellingProducts: z.string().optional(),
  priorityProducts: z.string().optional(),
  specialInstructions: z.string().optional(),
  
  // Section 4: Pricing & Margin Details
  retailPrices: z.string().min(1, "Please provide retail prices"),
  costPerProduct: z.string().optional(),
  mostProfitableProducts: z.string().optional(),
  holidayDiscounts: z.string().optional(),
  
  // Section 5: Brand Assets - handled via file uploads
  
  // Section 6: Brand Voice & Messaging
  brandVoice: z.string().min(1, "Please select a brand voice"),
  productBenefits: z.string().min(10, "Please list 3-5 key benefits"),
  emotionsToEvoke: z.string().optional(),
  
  // Section 7: Customer Targeting
  idealBuyer: z.string().min(10, "Please describe the ideal buyer"),
  idealGiftRecipient: z.string().optional(),
  problemSolved: z.string().optional(),
  competitiveAdvantage: z.string().optional(),
  
  // Section 8: Affiliate Goals
  affiliateCount: z.string().optional(),
  creatorsInMind: z.string().optional(),
  campaignPlatforms: z.string().optional(),
  mainGoal: z.string().optional(),
  
  // Section 9: Logistics
  preferredStartDate: z.string().min(1, "Please select a start date"),
  blackoutDates: z.string().optional(),
  deliveryFormat: z.string().optional(),
  
  // Section 10: Final Submission
  anythingElse: z.string().optional(),
  authorization: z.boolean().refine((val) => val === true, {
    message: "You must confirm authorization",
  }),
});

type FormData = z.infer<typeof formSchema>;

export default function HolidaySprint() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [brandAssets, setBrandAssets] = useState<{
    logo: File[];
    productPhotos: File[];
    lifestylePhotos: File[];
    creatorContent: File[];
    affiliateMaterials: File[];
    brandGuidelines: File[];
  }>({
    logo: [],
    productPhotos: [],
    lifestylePhotos: [],
    creatorContent: [],
    affiliateMaterials: [],
    brandGuidelines: [],
  });
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: new URLSearchParams(window.location.search).get('email') || '',
    },
  });

  const hasAffiliateProgram = watch("hasAffiliateProgram");

  const handleFileUpload = (category: keyof typeof brandAssets) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setBrandAssets((prev) => ({
        ...prev,
        [category]: [...prev[category], ...newFiles],
      }));
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Upload all files from different categories
      let materialsUrls: string[] = [];
      const allFiles = [
        ...brandAssets.logo,
        ...brandAssets.productPhotos,
        ...brandAssets.lifestylePhotos,
        ...brandAssets.creatorContent,
        ...brandAssets.affiliateMaterials,
        ...brandAssets.brandGuidelines,
      ];

      if (allFiles.length > 0) {
        for (const file of allFiles) {
          const fileExt = file.name.split(".").pop();
          const fileName = `${Math.random()}.${fileExt}`;
          const filePath = `${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from("holiday-sprint-materials")
            .upload(filePath, file);

          if (uploadError) throw uploadError;

          const { data: urlData } = supabase.storage
            .from("holiday-sprint-materials")
            .getPublicUrl(filePath);

          materialsUrls.push(urlData.publicUrl);
        }
      }

      // Compile comprehensive data
      const comprehensiveData = {
        // Section 2-4 Details
        affiliateDetails: {
          signupLink: data.affiliateSignupLink,
          sampleLinks: data.sampleTrackingLinks,
          hasDeepLinks: data.hasDeepLinks,
          needDeepLinksCreated: data.needDeepLinksCreated,
        },
        productDetails: {
          highestMargin: data.highestMarginProducts,
          bestSelling: data.bestSellingProducts,
          priority: data.priorityProducts,
          specialInstructions: data.specialInstructions,
        },
        pricingDetails: {
          retailPrices: data.retailPrices,
          costPerProduct: data.costPerProduct,
          mostProfitable: data.mostProfitableProducts,
          holidayDiscounts: data.holidayDiscounts,
        },
        // Section 6-8 Details
        brandVoice: {
          voice: data.brandVoice,
          benefits: data.productBenefits,
          emotions: data.emotionsToEvoke,
        },
        targeting: {
          idealBuyer: data.idealBuyer,
          giftRecipient: data.idealGiftRecipient,
          problemSolved: data.problemSolved,
          competitiveAdvantage: data.competitiveAdvantage,
        },
        goals: {
          affiliateCount: data.affiliateCount,
          creatorsInMind: data.creatorsInMind,
          platforms: data.campaignPlatforms,
          mainGoal: data.mainGoal,
        },
        logistics: {
          startDate: data.preferredStartDate,
          blackoutDates: data.blackoutDates,
          deliveryFormat: data.deliveryFormat,
          anythingElse: data.anythingElse,
        },
      };

      // Insert application with comprehensive data stored in existing fields
      const { error } = await supabase.from("holiday_sprint_applications").insert({
        full_name: data.fullName,
        brand_name: data.brandName,
        email: data.email,
        brand_website: data.brandWebsite || null,
        social_handle: data.socialHandle,
        has_affiliate_program: data.hasAffiliateProgram === "yes",
        affiliate_platform: data.affiliatePlatform || null,
        products_description: `${data.brandDescription}\n\n${data.productsDescription}\n\nCOMPREHENSIVE DATA:\n${JSON.stringify(comprehensiveData, null, 2)}`,
        desired_results: `Brand Category: ${data.brandCategory}\n\n${JSON.stringify(comprehensiveData.goals, null, 2)}`,
        biggest_challenge: JSON.stringify(comprehensiveData, null, 2),
        materials_urls: materialsUrls,
      });

      if (error) throw error;

      toast({
        title: "Application Submitted!",
        description: "Redirecting to payment...",
      });

      navigate("/holiday-sprint-thank-you");
    } catch (error) {
      console.error("Error submitting application:", error);
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEOHead
        title="Apply for THE HOLIDAY AFFILIATE SALES SPRINT™"
        description="Limited-time 1:1 bootcamp for brands who want affiliate sales before Christmas. Apply now to secure your spot."
        keywords="affiliate marketing, holiday sales, affiliate bootcamp, brand partnerships, Christmas sales"
      />

      <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/10 py-12 px-4">
        <div className="container mx-auto max-w-3xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
              Apply for THE HOLIDAY AFFILIATE SALES SPRINT™
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Tell us about your brand so we can prepare your custom affiliate sales system.
              This is a limited-time holiday offer.
            </p>
            <Button
              onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-strategic-gold hover:bg-strategic-gold/90 text-background font-bold text-lg px-8 py-6 rounded-lg"
            >
              Start Your Application
            </Button>
          </div>

          {/* Form Card */}
          <Card id="application-form" className="border-2 border-strategic-gold/30 shadow-xl bg-card">
            <CardContent className="p-8 md:p-12">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-foreground font-semibold">
                    Full Name *
                  </Label>
                  <Input
                    id="fullName"
                    {...register("fullName")}
                    className="border-border focus:border-strategic-gold"
                    placeholder="Your full name"
                  />
                  {errors.fullName && (
                    <p className="text-sm text-destructive">{errors.fullName.message}</p>
                  )}
                </div>

                {/* Brand Name */}
                <div className="space-y-2">
                  <Label htmlFor="brandName" className="text-foreground font-semibold">
                    Brand Name *
                  </Label>
                  <Input
                    id="brandName"
                    {...register("brandName")}
                    className="border-border focus:border-strategic-gold"
                    placeholder="Your brand name"
                  />
                  {errors.brandName && (
                    <p className="text-sm text-destructive">{errors.brandName.message}</p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground font-semibold">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    className="border-border focus:border-strategic-gold"
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email.message}</p>
                  )}
                </div>

                {/* Brand Website */}
                <div className="space-y-2">
                  <Label htmlFor="brandWebsite" className="text-foreground font-semibold">
                    Brand Website
                  </Label>
                  <Input
                    id="brandWebsite"
                    type="url"
                    {...register("brandWebsite")}
                    className="border-border focus:border-strategic-gold"
                    placeholder="https://yourbrand.com"
                  />
                  {errors.brandWebsite && (
                    <p className="text-sm text-destructive">{errors.brandWebsite.message}</p>
                  )}
                </div>

                {/* Social Handle */}
                <div className="space-y-2">
                  <Label htmlFor="socialHandle" className="text-foreground font-semibold">
                    Instagram or TikTok Handle *
                  </Label>
                  <Input
                    id="socialHandle"
                    {...register("socialHandle")}
                    className="border-border focus:border-strategic-gold"
                    placeholder="@yourbrand"
                  />
                  {errors.socialHandle && (
                    <p className="text-sm text-destructive">{errors.socialHandle.message}</p>
                  )}
                </div>

                {/* Affiliate Program */}
                <div className="space-y-2">
                  <Label htmlFor="hasAffiliateProgram" className="text-foreground font-semibold">
                    Do you currently have an affiliate program? *
                  </Label>
                  <Select
                    onValueChange={(value) => setValue("hasAffiliateProgram", value as "yes" | "no")}
                  >
                    <SelectTrigger className="border-border focus:border-strategic-gold">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.hasAffiliateProgram && (
                    <p className="text-sm text-destructive">{errors.hasAffiliateProgram.message}</p>
                  )}
                </div>

                {/* Conditional Affiliate Platform */}
                {hasAffiliateProgram === "yes" && (
                  <div className="space-y-2">
                    <Label htmlFor="affiliatePlatform" className="text-foreground font-semibold">
                      Which platform?
                    </Label>
                    <Select
                      onValueChange={(value) => setValue("affiliatePlatform", value)}
                    >
                      <SelectTrigger className="border-border focus:border-strategic-gold">
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="afrofiliate">Afrofiliate</SelectItem>
                        <SelectItem value="cashblack">CashBlack</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Products Description */}
                <div className="space-y-2">
                  <Label htmlFor="productsDescription" className="text-foreground font-semibold">
                    What products are you trying to get affiliates to sell this season? *
                  </Label>
                  <Textarea
                    id="productsDescription"
                    {...register("productsDescription")}
                    className="border-border focus:border-strategic-gold min-h-[120px]"
                    placeholder="Tell us about the products you want to promote..."
                  />
                  {errors.productsDescription && (
                    <p className="text-sm text-destructive">{errors.productsDescription.message}</p>
                  )}
                </div>


                {/* Mid-form CTA */}
                <div className="bg-muted/50 p-6 rounded-lg border border-strategic-gold/20 text-center">
                  <p className="text-foreground font-semibold mb-4">
                    Almost there! Complete your application to secure your spot.
                  </p>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-strategic-gold hover:bg-strategic-gold/90 text-background font-bold px-8 py-3"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Application Now"
                    )}
                  </Button>
                </div>



                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-strategic-gold hover:bg-strategic-gold/90 text-background font-bold text-lg py-6 rounded-lg transition-all"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Apply Now"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
          
          {/* Newsletter Section */}
          <div className="mt-16">
            <NewsletterSignup 
              source="holiday-application"
              title="Get Strategic Insights While You Wait"
              description="Join brand founders receiving weekly insights on affiliate marketing and holiday strategies."
            />
          </div>
        </div>
      </div>
    </>
  );
}
