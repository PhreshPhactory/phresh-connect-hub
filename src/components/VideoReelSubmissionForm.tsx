import React, { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Upload, Video, Loader2 } from 'lucide-react';
import { emailSchema, nameSchema, urlSchema, sanitizeInput } from '@/utils/security';

const formSchema = z.object({
  productName: z.string().min(1, 'Product name is required').max(200),
  productDescription: z.string().min(10, 'Description must be at least 10 characters').max(2000),
  productUrl: urlSchema,
  brandName: nameSchema,
  brandEmail: emailSchema,
});

type FormValues = z.infer<typeof formSchema>;

const VideoReelSubmissionForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: '',
      productDescription: '',
      productUrl: '',
      brandName: '',
      brandEmail: '',
    },
  });

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const newUrls: string[] = [];

    try {
      for (const file of Array.from(files)) {
        if (!file.type.startsWith('image/')) {
          toast({
            title: 'Invalid file type',
            description: 'Please upload image files only.',
            variant: 'destructive',
          });
          continue;
        }

        if (file.size > 10 * 1024 * 1024) {
          toast({
            title: 'File too large',
            description: 'Images must be under 10MB.',
            variant: 'destructive',
          });
          continue;
        }

        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}-${file.name}`;
        // Use private bucket for security - images only accessible to content managers
        const { data, error } = await supabase.storage
          .from('video-reel-submissions')
          .upload(fileName, file);

        if (error) {
          console.error('Upload error:', error);
          toast({
            title: 'Upload failed',
            description: error.message,
            variant: 'destructive',
          });
          continue;
        }

        // Store the path (not public URL) since bucket is private
        // Admin will use signed URLs to view
        const storagePath = `video-reel-submissions/${fileName}`;
        newUrls.push(storagePath);
      }

      setUploadedImages(prev => [...prev, ...newUrls]);
      
      if (newUrls.length > 0) {
        toast({
          title: 'Images uploaded',
          description: `${newUrls.length} image(s) uploaded successfully.`,
        });
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: 'Upload failed',
        description: 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: FormValues) => {
    if (uploadedImages.length === 0) {
      toast({
        title: 'Images required',
        description: 'Please upload at least one product image.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const sanitizedData = {
        productName: sanitizeInput(data.productName),
        productDescription: sanitizeInput(data.productDescription),
        productUrl: data.productUrl,
        brandName: sanitizeInput(data.brandName),
        brandEmail: data.brandEmail,
        imageUrls: uploadedImages,
      };

      const { data: result, error } = await supabase.functions.invoke('create-video-reel-payment', {
        body: sanitizedData,
      });

      if (error) throw error;

      if (result?.url) {
        window.open(result.url, '_blank');
        toast({
          title: 'Redirecting to payment',
          description: 'Complete your $100 payment to submit your video reel request.',
        });
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: 'Submission failed',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-teal text-teal-foreground w-12 h-12 rounded-full flex items-center justify-center">
          <Video className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground">Social Media Video Reel</h3>
          <p className="text-muted-foreground">$100 - Professional product video for our channels</p>
        </div>
      </div>

      <div className="bg-muted/50 border border-border rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-foreground mb-2">What's included:</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Professional video reel featuring your product</li>
          <li>• Posted on PhreshPhactoryTV social channels</li>
          <li>• Product link included in video description</li>
          <li>• Delivered within 5 business days</li>
        </ul>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormField
              control={form.control}
              name="brandName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Brand" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="brandEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="you@brand.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="productName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="Amazing Product XYZ" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="productUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product URL (where to buy)</FormLabel>
                <FormControl>
                  <Input placeholder="https://yourbrand.com/product" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="productDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Tell us about your product - features, benefits, target audience..."
                    className="min-h-[100px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Image Upload */}
          <div className="space-y-3">
            <FormLabel>Product Images (required)</FormLabel>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
                disabled={isUploading}
              />
              <label 
                htmlFor="image-upload" 
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                {isUploading ? (
                  <Loader2 className="w-8 h-8 text-muted-foreground animate-spin" />
                ) : (
                  <Upload className="w-8 h-8 text-muted-foreground" />
                )}
                <span className="text-sm text-muted-foreground">
                  {isUploading ? 'Uploading...' : 'Click to upload product images'}
                </span>
                <span className="text-xs text-muted-foreground">
                  PNG, JPG up to 10MB each
                </span>
              </label>
            </div>

            {uploadedImages.length > 0 && (
              <div className="grid grid-cols-3 gap-3">
                {uploadedImages.map((url, index) => (
                  <div key={index} className="relative group">
                    <img 
                      src={url} 
                      alt={`Product ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg border border-border"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Button 
            type="submit" 
            size="lg" 
            className="w-full" 
            disabled={isSubmitting || isUploading}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              'Continue to Payment - $100'
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default VideoReelSubmissionForm;
