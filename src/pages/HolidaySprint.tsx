import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { Upload, Loader2, Plus, Trash2 } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import NewsletterSignup from "@/components/NewsletterSignup";

const productSchema = z.object({
  productName: z.string().min(2, "Product name is required"),
  productUrl: z.string().url("Invalid product URL").or(z.literal("")),
  retailPrice: z.string().min(1, "Retail price is required"),
  costPerUnit: z.string().optional(),
  isHighMargin: z.boolean().default(false),
  sellsWellHistorically: z.boolean().default(false),
  isPriorityForHoliday: z.boolean().default(false),
  specialInstructions: z.string().optional(),
});

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
  
  // Section 3: Products (restructured)
  products: z.array(productSchema).min(1, "At least one product is required"),
  holidayDiscounts: z.string().optional(),
  
  // Section 4: Brand Assets - handled via file uploads
  
  // Section 5: Brand Voice & Messaging
  brandVoice: z.string().min(1, "Please select a brand voice"),
  productBenefits: z.string().min(10, "Please list 3-5 key benefits"),
  emotionsToEvoke: z.string().optional(),
  
  // Section 6: Customer Targeting
  idealBuyer: z.string().min(10, "Please describe the ideal buyer"),
  idealGiftRecipient: z.string().optional(),
  problemSolved: z.string().optional(),
  competitiveAdvantage: z.string().optional(),
  
  // Section 7: Affiliate Goals
  affiliateCount: z.string().optional(),
  creatorsInMind: z.string().optional(),
  campaignPlatforms: z.string().optional(),
  mainGoal: z.string().optional(),
  
  // Section 8: Logistics
  preferredStartDate: z.string().min(1, "Please select a start date"),
  blackoutDates: z.string().optional(),
  deliveryFormat: z.string().optional(),
  
  // Section 9: Final Submission
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
    lifestylePhotos: File[];
    creatorContent: File[];
    affiliateMaterials: File[];
    brandGuidelines: File[];
  }>({
    logo: [],
    lifestylePhotos: [],
    creatorContent: [],
    affiliateMaterials: [],
    brandGuidelines: [],
  });
  
  const [productPhotos, setProductPhotos] = useState<Record<number, File[]>>({});
  
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

  const getTotalFileCount = (category: keyof typeof brandAssets): number => {
    return brandAssets[category].length;
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
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
                {/* SECTION 1: Brand Information */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-heading font-bold text-foreground border-b-2 border-strategic-gold pb-2">
                    Section 1: Brand Information
                  </h2>
                  
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

                  <div className="space-y-2">
                    <Label htmlFor="brandWebsite" className="text-foreground font-semibold">
                      Brand Website URL *
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

                  <div className="space-y-2">
                    <Label htmlFor="brandDescription" className="text-foreground font-semibold">
                      Short Brand Description (1-2 sentences) *
                    </Label>
                    <Textarea
                      id="brandDescription"
                      {...register("brandDescription")}
                      className="border-border focus:border-strategic-gold min-h-[100px]"
                      placeholder="Describe your brand in 1-2 sentences"
                    />
                    {errors.brandDescription && (
                      <p className="text-sm text-destructive">{errors.brandDescription.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="brandCategory" className="text-foreground font-semibold">
                      Brand Category *
                    </Label>
                    <Select onValueChange={(value) => setValue("brandCategory", value)}>
                      <SelectTrigger className="border-border focus:border-strategic-gold bg-background">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-border z-50">
                        <SelectItem value="beauty">Beauty</SelectItem>
                        <SelectItem value="wellness">Wellness</SelectItem>
                        <SelectItem value="lifestyle">Lifestyle</SelectItem>
                        <SelectItem value="apparel">Apparel</SelectItem>
                        <SelectItem value="home-goods">Home Goods</SelectItem>
                        <SelectItem value="food-cpg">Food/CPG</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.brandCategory && (
                      <p className="text-sm text-destructive">{errors.brandCategory.message}</p>
                    )}
                  </div>
                </div>

                {/* SECTION 2: Affiliate Program Details */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-heading font-bold text-foreground border-b-2 border-strategic-gold pb-2">
                    Section 2: Affiliate Program Details
                  </h2>

                  <div className="space-y-2">
                    <Label htmlFor="hasAffiliateProgram" className="text-foreground font-semibold">
                      Do you currently have an affiliate program? *
                    </Label>
                    <Select onValueChange={(value) => setValue("hasAffiliateProgram", value as "yes" | "no" | "not-sure")}>
                      <SelectTrigger className="border-border focus:border-strategic-gold bg-background">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-border z-50">
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                        <SelectItem value="not-sure">Not sure</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.hasAffiliateProgram && (
                      <p className="text-sm text-destructive">{errors.hasAffiliateProgram.message}</p>
                    )}
                  </div>

                  {hasAffiliateProgram === "yes" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="affiliatePlatform" className="text-foreground font-semibold">
                          Which affiliate platform do you use?
                        </Label>
                        <Select onValueChange={(value) => setValue("affiliatePlatform", value)}>
                          <SelectTrigger className="border-border focus:border-strategic-gold bg-background">
                            <SelectValue placeholder="Select platform" />
                          </SelectTrigger>
                          <SelectContent className="bg-background border-border z-50">
                            <SelectItem value="afrofiliate">Afrofiliate</SelectItem>
                            <SelectItem value="cashblack">CashBlack</SelectItem>
                            <SelectItem value="shopify-referral">Shopify Referral/UpPromote</SelectItem>
                            <SelectItem value="impact">Impact</SelectItem>
                            <SelectItem value="cj-affiliate">CJ Affiliate</SelectItem>
                            <SelectItem value="shareasale">ShareASale</SelectItem>
                            <SelectItem value="refersion">Refersion</SelectItem>
                            <SelectItem value="goaffpro">GoAffPro</SelectItem>
                            <SelectItem value="awin">Awin</SelectItem>
                            <SelectItem value="rakuten">Rakuten</SelectItem>
                            <SelectItem value="amazon-associates">Amazon Associates</SelectItem>
                            <SelectItem value="pepperjam">Pepperjam</SelectItem>
                            <SelectItem value="skimlinks">Skimlinks</SelectItem>
                            <SelectItem value="ltk">LTK</SelectItem>
                            <SelectItem value="shopstyle">ShopStyle Collective</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="affiliateSignupLink" className="text-foreground font-semibold">
                          Link to your affiliate program sign-up page
                        </Label>
                        <Input
                          id="affiliateSignupLink"
                          {...register("affiliateSignupLink")}
                          className="border-border focus:border-strategic-gold"
                          placeholder="https://yourbrand.com/affiliates"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="sampleTrackingLinks" className="text-foreground font-semibold">
                          Paste 1–3 sample affiliate tracking links
                        </Label>
                        <Textarea
                          id="sampleTrackingLinks"
                          {...register("sampleTrackingLinks")}
                          className="border-border focus:border-strategic-gold min-h-[100px]"
                          placeholder="Paste your sample tracking links here (one per line)"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="hasDeepLinks" className="text-foreground font-semibold">
                          Do you already have deep links set up?
                        </Label>
                        <Select onValueChange={(value) => setValue("hasDeepLinks", value)}>
                          <SelectTrigger className="border-border focus:border-strategic-gold bg-background">
                            <SelectValue placeholder="Select an option" />
                          </SelectTrigger>
                          <SelectContent className="bg-background border-border z-50">
                            <SelectItem value="yes">Yes</SelectItem>
                            <SelectItem value="no">No</SelectItem>
                            <SelectItem value="not-sure">Not sure</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="needDeepLinksCreated" className="text-foreground font-semibold">
                          Do you want us to create your deep links?
                        </Label>
                        <Select onValueChange={(value) => setValue("needDeepLinksCreated", value)}>
                          <SelectTrigger className="border-border focus:border-strategic-gold bg-background">
                            <SelectValue placeholder="Select an option" />
                          </SelectTrigger>
                          <SelectContent className="bg-background border-border z-50">
                            <SelectItem value="yes">Yes, please</SelectItem>
                            <SelectItem value="no">No, I'll provide them</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}
                </div>

                {/* SECTION 3: Product Details */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-heading font-bold text-foreground border-b-2 border-strategic-gold pb-2">
                    Section 3: Product Details
                  </h2>

                  <div className="space-y-2">
                    <Label htmlFor="productsDescription" className="text-foreground font-semibold">
                      List ALL products you want considered for holiday selling (with product URLs) *
                    </Label>
                    <Textarea
                      id="productsDescription"
                      {...register("productsDescription")}
                      className="border-border focus:border-strategic-gold min-h-[150px]"
                      placeholder="List your products with URLs (e.g., Product Name - https://yourbrand.com/product)"
                    />
                    {errors.productsDescription && (
                      <p className="text-sm text-destructive">{errors.productsDescription.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="highestMarginProducts" className="text-foreground font-semibold">
                      Which products have your highest margins?
                    </Label>
                    <Textarea
                      id="highestMarginProducts"
                      {...register("highestMarginProducts")}
                      className="border-border focus:border-strategic-gold min-h-[100px]"
                      placeholder="List your highest margin products"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bestSellingProducts" className="text-foreground font-semibold">
                      Which products historically sell the best?
                    </Label>
                    <Textarea
                      id="bestSellingProducts"
                      {...register("bestSellingProducts")}
                      className="border-border focus:border-strategic-gold min-h-[100px]"
                      placeholder="List your best-selling products"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priorityProducts" className="text-foreground font-semibold">
                      Which products would you prefer to prioritize for holiday?
                    </Label>
                    <Textarea
                      id="priorityProducts"
                      {...register("priorityProducts")}
                      className="border-border focus:border-strategic-gold min-h-[100px]"
                      placeholder="List your priority products for the holiday season"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialInstructions" className="text-foreground font-semibold">
                      Do any products require special instructions, disclaimers, or care?
                    </Label>
                    <Textarea
                      id="specialInstructions"
                      {...register("specialInstructions")}
                      className="border-border focus:border-strategic-gold min-h-[100px]"
                      placeholder="Any special handling instructions or disclaimers"
                    />
                  </div>
                </div>

                {/* SECTION 4: Pricing & Margin Details */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-heading font-bold text-foreground border-b-2 border-strategic-gold pb-2">
                    Section 4: Pricing & Margin Details
                  </h2>

                  <div className="space-y-2">
                    <Label htmlFor="retailPrices" className="text-foreground font-semibold">
                      Retail price for each product listed above *
                    </Label>
                    <Textarea
                      id="retailPrices"
                      {...register("retailPrices")}
                      className="border-border focus:border-strategic-gold min-h-[100px]"
                      placeholder="List retail prices for each product (e.g., Product Name - $XX.XX)"
                    />
                    {errors.retailPrices && (
                      <p className="text-sm text-destructive">{errors.retailPrices.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="costPerProduct" className="text-foreground font-semibold">
                      Cost per product (optional, confidential)
                    </Label>
                    <Textarea
                      id="costPerProduct"
                      {...register("costPerProduct")}
                      className="border-border focus:border-strategic-gold min-h-[100px]"
                      placeholder="Your cost per product (kept confidential)"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mostProfitableProducts" className="text-foreground font-semibold">
                      Which products are the most profitable?
                    </Label>
                    <Textarea
                      id="mostProfitableProducts"
                      {...register("mostProfitableProducts")}
                      className="border-border focus:border-strategic-gold min-h-[100px]"
                      placeholder="List your most profitable products"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="holidayDiscounts" className="text-foreground font-semibold">
                      Are you planning holiday discounts?
                    </Label>
                    <Textarea
                      id="holidayDiscounts"
                      {...register("holidayDiscounts")}
                      className="border-border focus:border-strategic-gold min-h-[100px]"
                      placeholder="Describe your holiday discount plans (or type 'No' if not applicable)"
                    />
                  </div>
                </div>

                {/* SECTION 5: Brand Assets */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-heading font-bold text-foreground border-b-2 border-strategic-gold pb-2">
                    Section 5: Brand Assets
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Upload JPG, PNG, PDF, and video clips (under 100MB each)
                  </p>

                  <div className="space-y-2">
                    <Label className="text-foreground font-semibold">Brand Logo Upload</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-strategic-gold transition-colors">
                      <input
                        type="file"
                        id="logo"
                        multiple
                        accept="image/*"
                        onChange={handleFileUpload("logo")}
                        className="hidden"
                      />
                      <label htmlFor="logo" className="cursor-pointer">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Click to upload brand logo</p>
                      </label>
                      {getTotalFileCount("logo") > 0 && (
                        <div className="mt-4 text-sm text-foreground">
                          {getTotalFileCount("logo")} file(s) selected
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-foreground font-semibold">
                      Product Photos (minimum 3 per potential hero product) *
                    </Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-strategic-gold transition-colors">
                      <input
                        type="file"
                        id="productPhotos"
                        multiple
                        accept="image/*"
                        onChange={handleFileUpload("productPhotos")}
                        className="hidden"
                      />
                      <label htmlFor="productPhotos" className="cursor-pointer">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Click to upload product photos</p>
                      </label>
                      {getTotalFileCount("productPhotos") > 0 && (
                        <div className="mt-4 text-sm text-foreground">
                          {getTotalFileCount("productPhotos")} file(s) selected
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-foreground font-semibold">Lifestyle Photos (optional)</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-strategic-gold transition-colors">
                      <input
                        type="file"
                        id="lifestylePhotos"
                        multiple
                        accept="image/*"
                        onChange={handleFileUpload("lifestylePhotos")}
                        className="hidden"
                      />
                      <label htmlFor="lifestylePhotos" className="cursor-pointer">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Click to upload lifestyle photos</p>
                      </label>
                      {getTotalFileCount("lifestylePhotos") > 0 && (
                        <div className="mt-4 text-sm text-foreground">
                          {getTotalFileCount("lifestylePhotos")} file(s) selected
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-foreground font-semibold">
                      Upload any past creator content, UGC clips, or examples (optional)
                    </Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-strategic-gold transition-colors">
                      <input
                        type="file"
                        id="creatorContent"
                        multiple
                        accept="image/*,video/*"
                        onChange={handleFileUpload("creatorContent")}
                        className="hidden"
                      />
                      <label htmlFor="creatorContent" className="cursor-pointer">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          Click to upload creator content, UGC clips
                        </p>
                      </label>
                      {getTotalFileCount("creatorContent") > 0 && (
                        <div className="mt-4 text-sm text-foreground">
                          {getTotalFileCount("creatorContent")} file(s) selected
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-foreground font-semibold">
                      Upload any current affiliate materials (optional)
                    </Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-strategic-gold transition-colors">
                      <input
                        type="file"
                        id="affiliateMaterials"
                        multiple
                        accept="image/*,.pdf"
                        onChange={handleFileUpload("affiliateMaterials")}
                        className="hidden"
                      />
                      <label htmlFor="affiliateMaterials" className="cursor-pointer">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          Click to upload affiliate materials (images, PDFs)
                        </p>
                      </label>
                      {getTotalFileCount("affiliateMaterials") > 0 && (
                        <div className="mt-4 text-sm text-foreground">
                          {getTotalFileCount("affiliateMaterials")} file(s) selected
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* SECTION 6: Brand Voice & Messaging */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-heading font-bold text-foreground border-b-2 border-strategic-gold pb-2">
                    Section 6: Brand Voice & Messaging
                  </h2>

                  <div className="space-y-2">
                    <Label htmlFor="brandVoice" className="text-foreground font-semibold">
                      How would you describe your brand voice? *
                    </Label>
                    <Select onValueChange={(value) => setValue("brandVoice", value)}>
                      <SelectTrigger className="border-border focus:border-strategic-gold bg-background">
                        <SelectValue placeholder="Select your brand voice" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-border z-50">
                        <SelectItem value="fun">Fun</SelectItem>
                        <SelectItem value="educational">Educational</SelectItem>
                        <SelectItem value="elegant">Elegant</SelectItem>
                        <SelectItem value="bold">Bold</SelectItem>
                        <SelectItem value="minimal">Minimal</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.brandVoice && (
                      <p className="text-sm text-destructive">{errors.brandVoice.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="productBenefits" className="text-foreground font-semibold">
                      Top 3–5 product benefits to highlight *
                    </Label>
                    <Textarea
                      id="productBenefits"
                      {...register("productBenefits")}
                      className="border-border focus:border-strategic-gold min-h-[120px]"
                      placeholder="List 3-5 key benefits your products offer"
                    />
                    {errors.productBenefits && (
                      <p className="text-sm text-destructive">{errors.productBenefits.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emotionsToEvoke" className="text-foreground font-semibold">
                      What emotions should the holiday messaging evoke?
                    </Label>
                    <Textarea
                      id="emotionsToEvoke"
                      {...register("emotionsToEvoke")}
                      className="border-border focus:border-strategic-gold min-h-[100px]"
                      placeholder="e.g., giftable, luxury, self-care, practical, last-minute shopping"
                    />
                  </div>
                </div>

                {/* SECTION 7: Customer Targeting */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-heading font-bold text-foreground border-b-2 border-strategic-gold pb-2">
                    Section 7: Customer Targeting
                  </h2>

                  <div className="space-y-2">
                    <Label htmlFor="idealBuyer" className="text-foreground font-semibold">
                      Who is the ideal holiday buyer? *
                    </Label>
                    <Textarea
                      id="idealBuyer"
                      {...register("idealBuyer")}
                      className="border-border focus:border-strategic-gold min-h-[120px]"
                      placeholder="Describe your ideal holiday buyer (demographics, interests, behaviors)"
                    />
                    {errors.idealBuyer && (
                      <p className="text-sm text-destructive">{errors.idealBuyer.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="idealGiftRecipient" className="text-foreground font-semibold">
                      Who is the ideal holiday gift recipient?
                    </Label>
                    <Textarea
                      id="idealGiftRecipient"
                      {...register("idealGiftRecipient")}
                      className="border-border focus:border-strategic-gold min-h-[100px]"
                      placeholder="Describe the ideal person receiving your product as a gift"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="problemSolved" className="text-foreground font-semibold">
                      What problem does your product solve?
                    </Label>
                    <Textarea
                      id="problemSolved"
                      {...register("problemSolved")}
                      className="border-border focus:border-strategic-gold min-h-[100px]"
                      placeholder="What specific problem or pain point does your product address?"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="competitiveAdvantage" className="text-foreground font-semibold">
                      Why do customers choose your brand over competitors?
                    </Label>
                    <Textarea
                      id="competitiveAdvantage"
                      {...register("competitiveAdvantage")}
                      className="border-border focus:border-strategic-gold min-h-[100px]"
                      placeholder="What makes your brand unique and preferred?"
                    />
                  </div>
                </div>

                {/* SECTION 8: Affiliate Goals */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-heading font-bold text-foreground border-b-2 border-strategic-gold pb-2">
                    Section 8: Affiliate Goals
                  </h2>

                  <div className="space-y-2">
                    <Label htmlFor="affiliateCount" className="text-foreground font-semibold">
                      How many affiliates do you plan to activate this season?
                    </Label>
                    <Input
                      id="affiliateCount"
                      {...register("affiliateCount")}
                      className="border-border focus:border-strategic-gold"
                      placeholder="e.g., 10-20 affiliates"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="creatorsInMind" className="text-foreground font-semibold">
                      Do you already have creators in mind?
                    </Label>
                    <Textarea
                      id="creatorsInMind"
                      {...register("creatorsInMind")}
                      className="border-border focus:border-strategic-gold min-h-[100px]"
                      placeholder="List any specific creators or type 'No'"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="campaignPlatforms" className="text-foreground font-semibold">
                      Which platforms should your Sell-This-Week Micro Campaign cover?
                    </Label>
                    <Textarea
                      id="campaignPlatforms"
                      {...register("campaignPlatforms")}
                      className="border-border focus:border-strategic-gold min-h-[100px]"
                      placeholder="e.g., Instagram, TikTok, YouTube Shorts, Email, All of the above"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mainGoal" className="text-foreground font-semibold">
                      Main holiday goal
                    </Label>
                    <Select onValueChange={(value) => setValue("mainGoal", value)}>
                      <SelectTrigger className="border-border focus:border-strategic-gold bg-background">
                        <SelectValue placeholder="Select your main goal" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-border z-50">
                        <SelectItem value="increase-sales">Increase sales</SelectItem>
                        <SelectItem value="increase-awareness">Increase brand awareness</SelectItem>
                        <SelectItem value="strengthen-relationships">Strengthen affiliate relationships</SelectItem>
                        <SelectItem value="prepare-q1">Prepare for Q1</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* SECTION 9: Logistics */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-heading font-bold text-foreground border-b-2 border-strategic-gold pb-2">
                    Section 9: Logistics
                  </h2>

                  <div className="space-y-2">
                    <Label htmlFor="preferredStartDate" className="text-foreground font-semibold">
                      Preferred Sprint Start Date *
                    </Label>
                    <Input
                      id="preferredStartDate"
                      type="date"
                      {...register("preferredStartDate")}
                      className="border-border focus:border-strategic-gold"
                    />
                    {errors.preferredStartDate && (
                      <p className="text-sm text-destructive">{errors.preferredStartDate.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="blackoutDates" className="text-foreground font-semibold">
                      Any blackout dates we should know about?
                    </Label>
                    <Textarea
                      id="blackoutDates"
                      {...register("blackoutDates")}
                      className="border-border focus:border-strategic-gold min-h-[100px]"
                      placeholder="List any dates when you're unavailable"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="deliveryFormat" className="text-foreground font-semibold">
                      Preferred delivery format
                    </Label>
                    <Select onValueChange={(value) => setValue("deliveryFormat", value)}>
                      <SelectTrigger className="border-border focus:border-strategic-gold bg-background">
                        <SelectValue placeholder="Select delivery format" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-border z-50">
                        <SelectItem value="pdf-only">PDF only</SelectItem>
                        <SelectItem value="google-drive">PDF + Google Drive folder</SelectItem>
                        <SelectItem value="both">Both</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* SECTION 10: Final Submission */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-heading font-bold text-foreground border-b-2 border-strategic-gold pb-2">
                    Section 10: Final Submission
                  </h2>

                  <div className="space-y-2">
                    <Label className="text-foreground font-semibold">Upload brand guidelines (optional)</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-strategic-gold transition-colors">
                      <input
                        type="file"
                        id="brandGuidelines"
                        multiple
                        accept=".pdf"
                        onChange={handleFileUpload("brandGuidelines")}
                        className="hidden"
                      />
                      <label htmlFor="brandGuidelines" className="cursor-pointer">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          Click to upload brand guidelines (PDF)
                        </p>
                      </label>
                      {getTotalFileCount("brandGuidelines") > 0 && (
                        <div className="mt-4 text-sm text-foreground">
                          {getTotalFileCount("brandGuidelines")} file(s) selected
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <input
                        type="checkbox"
                        id="authorization"
                        {...register("authorization")}
                        className="mt-1"
                      />
                      <Label htmlFor="authorization" className="text-foreground font-semibold cursor-pointer">
                        I confirm I have the authority to approve this system for our brand. *
                      </Label>
                    </div>
                    {errors.authorization && (
                      <p className="text-sm text-destructive">{errors.authorization.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="anythingElse" className="text-foreground font-semibold">
                      Anything else we should know before we begin? (optional)
                    </Label>
                    <Textarea
                      id="anythingElse"
                      {...register("anythingElse")}
                      className="border-border focus:border-strategic-gold min-h-[120px]"
                      placeholder="Any additional information, special requests, or notes"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
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
                      "Submit Application Now"
                    )}
                  </Button>
                </div>
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
