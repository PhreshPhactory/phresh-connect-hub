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
  productUrl: z.string().optional(),
  retailPrice: z.string().min(1, "Retail price is required"),
  costPerUnit: z.string().optional(),
  isHighMargin: z.boolean().default(false),
  sellsWellHistorically: z.boolean().default(false),
  isPriorityForHoliday: z.boolean().default(false),
  specialInstructions: z.string().optional(),
});

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  brandName: z.string().min(2, "Brand name is required"),
  email: z.string().email("Invalid email address"),
  brandWebsite: z.string().url("Invalid URL"),
  socialHandle: z.string().min(1, "Social handle is required"),
  brandDescription: z.string().min(10, "Please provide a short description"),
  brandCategory: z.string().min(1, "Please select a category"),
  hasAffiliateProgram: z.enum(["yes", "no", "not-sure"]),
  affiliatePlatform: z.string().optional(),
  affiliateSignupLink: z.string().optional(),
  sampleTrackingLinks: z.string().optional(),
  hasDeepLinks: z.string().optional(),
  needDeepLinksCreated: z.string().optional(),
  products: z.array(productSchema).min(1, "At least one product is required"),
  holidayDiscounts: z.string().optional(),
  brandVoice: z.string().min(1, "Please select a brand voice"),
  productBenefits: z.string().min(10, "Please list 3-5 key benefits"),
  emotionsToEvoke: z.string().optional(),
  idealBuyer: z.string().min(10, "Please describe the ideal buyer"),
  idealGiftRecipient: z.string().optional(),
  problemSolved: z.string().optional(),
  competitiveAdvantage: z.string().optional(),
  affiliateCount: z.string().optional(),
  creatorsInMind: z.string().optional(),
  campaignPlatforms: z.string().optional(),
  mainGoal: z.string().optional(),
  preferredStartDate: z.string().min(1, "Please select a start date"),
  blackoutDates: z.string().optional(),
  deliveryFormat: z.string().optional(),
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
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: new URLSearchParams(window.location.search).get('email') || '',
      products: [{
        productName: "",
        productUrl: "",
        retailPrice: "",
        costPerUnit: "",
        isHighMargin: false,
        sellsWellHistorically: false,
        isPriorityForHoliday: false,
        specialInstructions: "",
      }],
    },
  });
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
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
  
  const handleProductPhotoUpload = (productIndex: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setProductPhotos((prev) => ({
        ...prev,
        [productIndex]: [...(prev[productIndex] || []), ...newFiles],
      }));
    }
  };

  const getTotalFileCount = (category: keyof typeof brandAssets): number => {
    return brandAssets[category]?.length || 0;
  };
  
  const getProductPhotoCount = (productIndex: number): number => {
    return productPhotos[productIndex]?.length || 0;
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      let materialsUrls: string[] = [];
      const allFiles = [
        ...brandAssets.logo,
        ...Object.values(productPhotos).flat(),
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

      const productsDescription = data.products.map((product, index) => ({
        name: product.productName,
        url: product.productUrl || "",
        retailPrice: product.retailPrice,
        cost: product.costPerUnit || "",
        isHighMargin: product.isHighMargin,
        sellsWell: product.sellsWellHistorically,
        isPriority: product.isPriorityForHoliday,
        specialInstructions: product.specialInstructions || "",
        photoCount: getProductPhotoCount(index),
      })).map((p, i) => 
        `Product ${i + 1}: ${p.name}\nURL: ${p.url}\nPrice: ${p.retailPrice}\nCost: ${p.cost}\nHigh Margin: ${p.isHighMargin}\nSells Well: ${p.sellsWell}\nPriority: ${p.isPriority}\nSpecial Instructions: ${p.specialInstructions}\n`
      ).join("\n---\n");

      const comprehensiveData = {
        affiliateDetails: {
          signupLink: data.affiliateSignupLink,
          sampleLinks: data.sampleTrackingLinks,
          hasDeepLinks: data.hasDeepLinks,
          needDeepLinksCreated: data.needDeepLinksCreated,
        },
        products: data.products,
        holidayDiscounts: data.holidayDiscounts,
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

      const { error } = await supabase.from("holiday_sprint_applications").insert({
        full_name: data.fullName,
        brand_name: data.brandName,
        email: data.email,
        brand_website: data.brandWebsite || null,
        social_handle: data.socialHandle,
        has_affiliate_program: data.hasAffiliateProgram === "yes",
        affiliate_platform: data.affiliatePlatform || null,
        products_description: productsDescription,
        desired_results: JSON.stringify(comprehensiveData),
        biggest_challenge: `Brand: ${data.brandDescription}\nCategory: ${data.brandCategory}`,
        materials_urls: materialsUrls.length > 0 ? materialsUrls : null,
      });

      if (error) throw error;

      toast({
        title: "Application Submitted!",
        description: "We'll review your application and get back to you soon.",
      });

      navigate("/holiday-sprint-thank-you");
    } catch (error: any) {
      console.error("Submission error:", error);
      toast({
        title: "Submission Failed",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEOHead
        title="Holiday Sprint Application - Phresh Phactory"
        description="Apply for the Holiday Sprint program to boost your holiday affiliate sales with proven strategies."
      />
      
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
              Holiday Sprint Application
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Ready to make this your best holiday season yet? Fill out this comprehensive application so we can create your custom Holiday Affiliate Sales System.
            </p>
          </div>

          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
                
                {/* SECTION 1: Brand Information */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-heading font-bold text-foreground border-b-2 border-strategic-gold pb-2">
                    Section 1: Brand Information
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-foreground font-semibold">Full Name *</Label>
                      <Input id="fullName" {...register("fullName")} className="border-border focus:border-strategic-gold" />
                      {errors.fullName && <p className="text-sm text-destructive">{errors.fullName.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="brandName" className="text-foreground font-semibold">Brand Name *</Label>
                      <Input id="brandName" {...register("brandName")} className="border-border focus:border-strategic-gold" />
                      {errors.brandName && <p className="text-sm text-destructive">{errors.brandName.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-foreground font-semibold">Email Address *</Label>
                      <Input id="email" type="email" {...register("email")} className="border-border focus:border-strategic-gold" />
                      {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="brandWebsite" className="text-foreground font-semibold">Brand Website URL *</Label>
                      <Input id="brandWebsite" type="url" {...register("brandWebsite")} className="border-border focus:border-strategic-gold" />
                      {errors.brandWebsite && <p className="text-sm text-destructive">{errors.brandWebsite.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="socialHandle" className="text-foreground font-semibold">Instagram or TikTok Handle *</Label>
                    <Input id="socialHandle" {...register("socialHandle")} placeholder="@yourbrand" className="border-border focus:border-strategic-gold" />
                    {errors.socialHandle && <p className="text-sm text-destructive">{errors.socialHandle.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="brandDescription" className="text-foreground font-semibold">Short Brand Description (1-2 sentences) *</Label>
                    <Textarea id="brandDescription" {...register("brandDescription")} className="border-border focus:border-strategic-gold" placeholder="Describe your brand in 1-2 sentences" />
                    {errors.brandDescription && <p className="text-sm text-destructive">{errors.brandDescription.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="brandCategory" className="text-foreground font-semibold">Brand Category *</Label>
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
                    {errors.brandCategory && <p className="text-sm text-destructive">{errors.brandCategory.message}</p>}
                  </div>
                </div>

                {/* SECTION 2: Affiliate Program Details */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-heading font-bold text-foreground border-b-2 border-strategic-gold pb-2">
                    Section 2: Affiliate Program Details
                  </h2>

                  <div className="space-y-2">
                    <Label htmlFor="hasAffiliateProgram" className="text-foreground font-semibold">Do you currently have an affiliate program? *</Label>
                    <Select onValueChange={(value: any) => setValue("hasAffiliateProgram", value)}>
                      <SelectTrigger className="border-border focus:border-strategic-gold bg-background">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-border z-50">
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                        <SelectItem value="not-sure">Not sure</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.hasAffiliateProgram && <p className="text-sm text-destructive">{errors.hasAffiliateProgram.message}</p>}
                  </div>

                  {hasAffiliateProgram === "yes" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="affiliatePlatform" className="text-foreground font-semibold">Which affiliate platform do you use?</Label>
                        <Select onValueChange={(value) => setValue("affiliatePlatform", value)}>
                          <SelectTrigger className="border-border focus:border-strategic-gold bg-background">
                            <SelectValue placeholder="Select a platform" />
                          </SelectTrigger>
                          <SelectContent className="bg-background border-border z-50">
                            <SelectItem value="afrofiliate">Afrofiliate</SelectItem>
                            <SelectItem value="cashblack">CashBlack</SelectItem>
                            <SelectItem value="shopify">Shopify Referral/UpPromote</SelectItem>
                            <SelectItem value="impact">Impact</SelectItem>
                            <SelectItem value="cj">CJ Affiliate</SelectItem>
                            <SelectItem value="shareasale">ShareASale</SelectItem>
                            <SelectItem value="refersion">Refersion</SelectItem>
                            <SelectItem value="goaffpro">GoAffPro</SelectItem>
                            <SelectItem value="awin">Awin</SelectItem>
                            <SelectItem value="rakuten">Rakuten</SelectItem>
                            <SelectItem value="amazon">Amazon Associates</SelectItem>
                            <SelectItem value="pepperjam">Pepperjam</SelectItem>
                            <SelectItem value="skimlinks">Skimlinks</SelectItem>
                            <SelectItem value="ltk">LTK</SelectItem>
                            <SelectItem value="shopstyle">ShopStyle Collective</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="affiliateSignupLink" className="text-foreground font-semibold">Link to your affiliate program sign-up page</Label>
                        <Input id="affiliateSignupLink" type="url" {...register("affiliateSignupLink")} className="border-border focus:border-strategic-gold" placeholder="https://" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="sampleTrackingLinks" className="text-foreground font-semibold">Paste 1-3 sample affiliate tracking links</Label>
                        <Textarea id="sampleTrackingLinks" {...register("sampleTrackingLinks")} className="border-border focus:border-strategic-gold min-h-[100px]" placeholder="Paste your sample tracking links here (one per line)" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="hasDeepLinks" className="text-foreground font-semibold">Do you already have deep links set up?</Label>
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
                        <Label htmlFor="needDeepLinksCreated" className="text-foreground font-semibold">Do you want us to create your deep links?</Label>
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

                {/* SECTION 3: Products */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-heading font-bold text-foreground border-b-2 border-strategic-gold pb-2">
                      Section 3: Product Details
                    </h2>
                    <Button
                      type="button"
                      onClick={() => append({
                        productName: "",
                        productUrl: "",
                        retailPrice: "",
                        costPerUnit: "",
                        isHighMargin: false,
                        sellsWellHistorically: false,
                        isPriorityForHoliday: false,
                        specialInstructions: "",
                      })}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Add Another Product
                    </Button>
                  </div>

                  {fields.map((field, index) => (
                    <Card key={field.id} className="p-6 bg-muted/30 border-border">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-semibold text-foreground">Product {index + 1}</h3>
                          {fields.length > 1 && (
                            <Button
                              type="button"
                              onClick={() => remove(index)}
                              variant="ghost"
                              size="sm"
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`products.${index}.productName`} className="text-foreground font-semibold">Product Name *</Label>
                            <Input {...register(`products.${index}.productName`)} className="border-border focus:border-strategic-gold" placeholder="Enter product name" />
                            {errors.products?.[index]?.productName && <p className="text-sm text-destructive">{errors.products[index]?.productName?.message}</p>}
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`products.${index}.productUrl`} className="text-foreground font-semibold">Product URL</Label>
                            <Input {...register(`products.${index}.productUrl`)} className="border-border focus:border-strategic-gold" placeholder="https://yourbrand.com/product" />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`products.${index}.retailPrice`} className="text-foreground font-semibold">Retail Price *</Label>
                            <Input {...register(`products.${index}.retailPrice`)} className="border-border focus:border-strategic-gold" placeholder="$29.99" />
                            {errors.products?.[index]?.retailPrice && <p className="text-sm text-destructive">{errors.products[index]?.retailPrice?.message}</p>}
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`products.${index}.costPerUnit`} className="text-foreground font-semibold">Cost Per Unit (Optional, Confidential)</Label>
                            <Input {...register(`products.${index}.costPerUnit`)} className="border-border focus:border-strategic-gold" placeholder="$10.00" />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Label className="text-foreground font-semibold">Product Characteristics</Label>
                          
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id={`products.${index}.isHighMargin`}
                              checked={watch(`products.${index}.isHighMargin`)}
                              onCheckedChange={(checked) => setValue(`products.${index}.isHighMargin`, checked as boolean)}
                            />
                            <Label htmlFor={`products.${index}.isHighMargin`} className="cursor-pointer">This is a high margin product</Label>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id={`products.${index}.sellsWellHistorically`}
                              checked={watch(`products.${index}.sellsWellHistorically`)}
                              onCheckedChange={(checked) => setValue(`products.${index}.sellsWellHistorically`, checked as boolean)}
                            />
                            <Label htmlFor={`products.${index}.sellsWellHistorically`} className="cursor-pointer">This product historically sells well</Label>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id={`products.${index}.isPriorityForHoliday`}
                              checked={watch(`products.${index}.isPriorityForHoliday`)}
                              onCheckedChange={(checked) => setValue(`products.${index}.isPriorityForHoliday`, checked as boolean)}
                            />
                            <Label htmlFor={`products.${index}.isPriorityForHoliday`} className="cursor-pointer">Priority for holiday season</Label>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`products.${index}.specialInstructions`} className="text-foreground font-semibold">Special Instructions, Disclaimers, or Care</Label>
                          <Textarea {...register(`products.${index}.specialInstructions`)} className="border-border focus:border-strategic-gold min-h-[100px]" placeholder="Any special handling, disclaimers, or care instructions for this product" />
                        </div>

                        <div className="space-y-2">
                          <Label className="text-foreground font-semibold">Product Photos (Minimum 3 per product) *</Label>
                          <div className="border-2 border-dashed border-border rounded-lg p-6 hover:border-strategic-gold transition-colors">
                            <input
                              type="file"
                              multiple
                              accept="image/*"
                              onChange={handleProductPhotoUpload(index)}
                              className="hidden"
                              id={`product-photos-${index}`}
                            />
                            <label htmlFor={`product-photos-${index}`} className="flex flex-col items-center cursor-pointer">
                              <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                              <p className="text-sm text-muted-foreground text-center">
                                Click to upload product photos
                                {getProductPhotoCount(index) > 0 && (
                                  <span className="block mt-2 text-strategic-gold font-semibold">
                                    {getProductPhotoCount(index)} file(s) selected
                                  </span>
                                )}
                              </p>
                            </label>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}

                  <div className="space-y-2">
                    <Label htmlFor="holidayDiscounts" className="text-foreground font-semibold">Are you planning holiday discounts?</Label>
                    <Textarea id="holidayDiscounts" {...register("holidayDiscounts")} className="border-border focus:border-strategic-gold min-h-[100px]" placeholder="Describe any planned holiday discounts or promotions" />
                  </div>
                </div>

                {/* SECTION 4: Brand Assets */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-heading font-bold text-foreground border-b-2 border-strategic-gold pb-2">
                    Section 4: Brand Assets
                  </h2>

                  <div className="space-y-2">
                    <Label className="text-foreground font-semibold">Brand Logo *</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 hover:border-strategic-gold transition-colors">
                      <input type="file" accept="image/*,.pdf" onChange={handleFileUpload("logo")} className="hidden" id="logo-upload" />
                      <label htmlFor="logo-upload" className="flex flex-col items-center cursor-pointer">
                        <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground text-center">
                          Click to upload your brand logo
                          {getTotalFileCount("logo") > 0 && (
                            <span className="block mt-2 text-strategic-gold font-semibold">{getTotalFileCount("logo")} file(s) selected</span>
                          )}
                        </p>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-foreground font-semibold">Lifestyle Photos (Optional)</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 hover:border-strategic-gold transition-colors">
                      <input type="file" multiple accept="image/*" onChange={handleFileUpload("lifestylePhotos")} className="hidden" id="lifestyle-upload" />
                      <label htmlFor="lifestyle-upload" className="flex flex-col items-center cursor-pointer">
                        <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground text-center">
                          Click to upload lifestyle photos
                          {getTotalFileCount("lifestylePhotos") > 0 && (
                            <span className="block mt-2 text-strategic-gold font-semibold">{getTotalFileCount("lifestylePhotos")} file(s) selected</span>
                          )}
                        </p>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-foreground font-semibold">Creator Content / UGC Clips (Optional)</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 hover:border-strategic-gold transition-colors">
                      <input type="file" multiple accept="image/*,video/*" onChange={handleFileUpload("creatorContent")} className="hidden" id="creator-upload" />
                      <label htmlFor="creator-upload" className="flex flex-col items-center cursor-pointer">
                        <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground text-center">
                          Click to upload creator content or UGC clips (under 100MB)
                          {getTotalFileCount("creatorContent") > 0 && (
                            <span className="block mt-2 text-strategic-gold font-semibold">{getTotalFileCount("creatorContent")} file(s) selected</span>
                          )}
                        </p>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-foreground font-semibold">Current Affiliate Materials (Optional)</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 hover:border-strategic-gold transition-colors">
                      <input type="file" multiple accept="image/*,.pdf,video/*" onChange={handleFileUpload("affiliateMaterials")} className="hidden" id="affiliate-upload" />
                      <label htmlFor="affiliate-upload" className="flex flex-col items-center cursor-pointer">
                        <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground text-center">
                          Click to upload any current affiliate materials
                          {getTotalFileCount("affiliateMaterials") > 0 && (
                            <span className="block mt-2 text-strategic-gold font-semibold">{getTotalFileCount("affiliateMaterials")} file(s) selected</span>
                          )}
                        </p>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-foreground font-semibold">Brand Guidelines (Optional)</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 hover:border-strategic-gold transition-colors">
                      <input type="file" accept=".pdf,image/*" onChange={handleFileUpload("brandGuidelines")} className="hidden" id="guidelines-upload" />
                      <label htmlFor="guidelines-upload" className="flex flex-col items-center cursor-pointer">
                        <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground text-center">
                          Click to upload brand guidelines
                          {getTotalFileCount("brandGuidelines") > 0 && (
                            <span className="block mt-2 text-strategic-gold font-semibold">{getTotalFileCount("brandGuidelines")} file(s) selected</span>
                          )}
                        </p>
                      </label>
                    </div>
                  </div>
                </div>

                {/* SECTION 5: Brand Voice & Messaging */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-heading font-bold text-foreground border-b-2 border-strategic-gold pb-2">
                    Section 5: Brand Voice & Messaging
                  </h2>

                  <div className="space-y-2">
                    <Label htmlFor="brandVoice" className="text-foreground font-semibold">How would you describe your brand voice? *</Label>
                    <Select onValueChange={(value) => setValue("brandVoice", value)}>
                      <SelectTrigger className="border-border focus:border-strategic-gold bg-background">
                        <SelectValue placeholder="Select a brand voice" />
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
                    {errors.brandVoice && <p className="text-sm text-destructive">{errors.brandVoice.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="productBenefits" className="text-foreground font-semibold">Top 3-5 product benefits to highlight *</Label>
                    <Textarea id="productBenefits" {...register("productBenefits")} className="border-border focus:border-strategic-gold min-h-[120px]" placeholder="List the top 3-5 benefits of your products" />
                    {errors.productBenefits && <p className="text-sm text-destructive">{errors.productBenefits.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emotionsToEvoke" className="text-foreground font-semibold">What emotions should the holiday messaging evoke?</Label>
                    <Textarea id="emotionsToEvoke" {...register("emotionsToEvoke")} className="border-border focus:border-strategic-gold min-h-[100px]" placeholder="E.g., giftable, luxury, self-care, practical, last-minute shopping" />
                  </div>
                </div>

                {/* SECTION 6: Customer Targeting */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-heading font-bold text-foreground border-b-2 border-strategic-gold pb-2">
                    Section 6: Customer Targeting
                  </h2>

                  <div className="space-y-2">
                    <Label htmlFor="idealBuyer" className="text-foreground font-semibold">Who is the ideal holiday buyer? *</Label>
                    <Textarea id="idealBuyer" {...register("idealBuyer")} className="border-border focus:border-strategic-gold min-h-[120px]" placeholder="Describe your ideal customer" />
                    {errors.idealBuyer && <p className="text-sm text-destructive">{errors.idealBuyer.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="idealGiftRecipient" className="text-foreground font-semibold">Who is the ideal holiday gift recipient?</Label>
                    <Textarea id="idealGiftRecipient" {...register("idealGiftRecipient")} className="border-border focus:border-strategic-gold min-h-[100px]" placeholder="Describe who would receive this as a gift" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="problemSolved" className="text-foreground font-semibold">What problem does your product solve?</Label>
                    <Textarea id="problemSolved" {...register("problemSolved")} className="border-border focus:border-strategic-gold min-h-[100px]" placeholder="Describe the problem your product addresses" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="competitiveAdvantage" className="text-foreground font-semibold">Why do customers choose your brand over competitors?</Label>
                    <Textarea id="competitiveAdvantage" {...register("competitiveAdvantage")} className="border-border focus:border-strategic-gold min-h-[100px]" placeholder="What makes your brand unique?" />
                  </div>
                </div>

                {/* SECTION 7: Affiliate Goals */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-heading font-bold text-foreground border-b-2 border-strategic-gold pb-2">
                    Section 7: Affiliate Goals
                  </h2>

                  <div className="space-y-2">
                    <Label htmlFor="affiliateCount" className="text-foreground font-semibold">How many affiliates do you plan to activate this season?</Label>
                    <Input id="affiliateCount" {...register("affiliateCount")} className="border-border focus:border-strategic-gold" placeholder="E.g., 5-10, 20+, etc." />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="creatorsInMind" className="text-foreground font-semibold">Do you already have creators in mind?</Label>
                    <Textarea id="creatorsInMind" {...register("creatorsInMind")} className="border-border focus:border-strategic-gold min-h-[100px]" placeholder="List any creators you're already working with or have in mind" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="campaignPlatforms" className="text-foreground font-semibold">Which platforms should your Sell-This-Week Micro Campaign cover?</Label>
                    <Textarea id="campaignPlatforms" {...register("campaignPlatforms")} className="border-border focus:border-strategic-gold min-h-[100px]" placeholder="E.g., Instagram, TikTok, YouTube Shorts, Email, All of the above" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mainGoal" className="text-foreground font-semibold">Main holiday goal</Label>
                    <Select onValueChange={(value) => setValue("mainGoal", value)}>
                      <SelectTrigger className="border-border focus:border-strategic-gold bg-background">
                        <SelectValue placeholder="Select your main goal" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-border z-50">
                        <SelectItem value="increase-sales">Increase sales</SelectItem>
                        <SelectItem value="brand-awareness">Increase brand awareness</SelectItem>
                        <SelectItem value="strengthen-relationships">Strengthen affiliate relationships</SelectItem>
                        <SelectItem value="prepare-q1">Prepare for Q1</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* SECTION 8: Logistics */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-heading font-bold text-foreground border-b-2 border-strategic-gold pb-2">
                    Section 8: Logistics
                  </h2>

                  <div className="space-y-2">
                    <Label htmlFor="preferredStartDate" className="text-foreground font-semibold">Preferred Sprint Start Date *</Label>
                    <Input id="preferredStartDate" type="date" {...register("preferredStartDate")} className="border-border focus:border-strategic-gold" />
                    {errors.preferredStartDate && <p className="text-sm text-destructive">{errors.preferredStartDate.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="blackoutDates" className="text-foreground font-semibold">Any blackout dates we should know about?</Label>
                    <Textarea id="blackoutDates" {...register("blackoutDates")} className="border-border focus:border-strategic-gold min-h-[100px]" placeholder="List any dates when your team is unavailable" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="deliveryFormat" className="text-foreground font-semibold">Preferred delivery format</Label>
                    <Select onValueChange={(value) => setValue("deliveryFormat", value)}>
                      <SelectTrigger className="border-border focus:border-strategic-gold bg-background">
                        <SelectValue placeholder="Select delivery format" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-border z-50">
                        <SelectItem value="pdf">PDF only</SelectItem>
                        <SelectItem value="google-drive">PDF + Google Drive folder</SelectItem>
                        <SelectItem value="both">Both</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* SECTION 9: Final Submission */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-heading font-bold text-foreground border-b-2 border-strategic-gold pb-2">
                    Section 9: Final Submission
                  </h2>

                  <div className="space-y-2">
                    <Label htmlFor="anythingElse" className="text-foreground font-semibold">Anything else we should know before we begin?</Label>
                    <Textarea id="anythingElse" {...register("anythingElse")} className="border-border focus:border-strategic-gold min-h-[150px]" placeholder="Share any additional information that would be helpful" />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="authorization"
                      checked={watch("authorization")}
                      onCheckedChange={(checked) => setValue("authorization", checked as boolean)}
                    />
                    <Label htmlFor="authorization" className="cursor-pointer">
                      I confirm I have the authority to approve this system for our brand. *
                    </Label>
                  </div>
                  {errors.authorization && <p className="text-sm text-destructive">{errors.authorization.message}</p>}
                </div>

                {/* Submit Button */}
                <div className="flex justify-center pt-6">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-strategic-gold hover:bg-strategic-gold/90 text-foreground font-heading font-bold text-lg px-12 py-6 rounded-lg"
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
        </div>

        <NewsletterSignup source="holiday-sprint" />
      </div>
    </>
  );
}
