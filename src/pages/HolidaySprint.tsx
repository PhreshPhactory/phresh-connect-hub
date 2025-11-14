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

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  brandName: z.string().min(2, "Brand name is required"),
  email: z.string().email("Invalid email address"),
  brandWebsite: z.string().url("Invalid URL").optional().or(z.literal("")),
  socialHandle: z.string().min(1, "Social handle is required"),
  hasAffiliateProgram: z.enum(["yes", "no"]),
  affiliatePlatform: z.string().optional(),
  productsDescription: z.string().min(20, "Please provide more detail (minimum 20 characters)"),
  desiredResults: z.string().min(20, "Please provide more detail (minimum 20 characters)"),
  biggestChallenge: z.string().min(20, "Please provide more detail (minimum 20 characters)"),
});

type FormData = z.infer<typeof formSchema>;

export default function HolidaySprint() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const hasAffiliateProgram = watch("hasAffiliateProgram");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setUploadedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Upload files if any
      let materialsUrls: string[] = [];
      if (uploadedFiles.length > 0) {
        for (const file of uploadedFiles) {
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

      // Insert application
      const { error } = await supabase.from("holiday_sprint_applications").insert({
        full_name: data.fullName,
        brand_name: data.brandName,
        email: data.email,
        brand_website: data.brandWebsite || null,
        social_handle: data.socialHandle,
        has_affiliate_program: data.hasAffiliateProgram === "yes",
        affiliate_platform: data.affiliatePlatform || null,
        products_description: data.productsDescription,
        desired_results: data.desiredResults,
        biggest_challenge: data.biggestChallenge,
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
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tell us about your brand so we can prepare your custom affiliate sales system.
              This is a limited-time holiday offer.
            </p>
          </div>

          {/* Form Card */}
          <Card className="border-2 border-strategic-gold/30 shadow-xl bg-card">
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

                {/* Desired Results */}
                <div className="space-y-2">
                  <Label htmlFor="desiredResults" className="text-foreground font-semibold">
                    What results are you hoping to achieve before the holiday season ends? *
                  </Label>
                  <Textarea
                    id="desiredResults"
                    {...register("desiredResults")}
                    className="border-border focus:border-strategic-gold min-h-[120px]"
                    placeholder="Describe your goals and targets..."
                  />
                  {errors.desiredResults && (
                    <p className="text-sm text-destructive">{errors.desiredResults.message}</p>
                  )}
                </div>

                {/* Biggest Challenge */}
                <div className="space-y-2">
                  <Label htmlFor="biggestChallenge" className="text-foreground font-semibold">
                    What is your biggest challenge with affiliates right now? *
                  </Label>
                  <Textarea
                    id="biggestChallenge"
                    {...register("biggestChallenge")}
                    className="border-border focus:border-strategic-gold min-h-[120px]"
                    placeholder="Share your main challenges..."
                  />
                  {errors.biggestChallenge && (
                    <p className="text-sm text-destructive">{errors.biggestChallenge.message}</p>
                  )}
                </div>

                {/* File Upload */}
                <div className="space-y-2">
                  <Label htmlFor="materials" className="text-foreground font-semibold">
                    Upload any current affiliate materials (optional)
                  </Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-strategic-gold transition-colors">
                    <input
                      id="materials"
                      type="file"
                      multiple
                      accept="image/*,.pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <label htmlFor="materials" className="cursor-pointer">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Click to upload images, PDFs, or product info
                      </p>
                    </label>
                    {uploadedFiles.length > 0 && (
                      <div className="mt-4 text-sm text-foreground">
                        {uploadedFiles.length} file(s) selected
                      </div>
                    )}
                  </div>
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
        </div>
      </div>
    </>
  );
}
