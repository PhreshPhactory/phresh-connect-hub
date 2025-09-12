import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { emailSchema, nameSchema, companySchema, createRateLimiter, validateHoneypot, sanitizeInput } from '@/utils/security';

const assessmentSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  type: z.enum(['business', 'freelancer']),
  company: z.string().optional(),
  honeypot: z.string().optional()
}).refine((data) => {
  if (data.type === 'business' && (!data.company || data.company.trim() === '')) {
    return false;
  }
  return true;
}, {
  message: "Company name is required for businesses",
  path: ["company"],
});

const rateLimiter = createRateLimiter(3, 60000); // 3 attempts per minute

const AssessmentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: '',
    company: '',
    honeypot: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'honeypot' ? value : sanitizeInput(value)
    });
  };

  const handleSelectChange = (value: string) => {
    setFormData({
      ...formData,
      type: value,
      // Clear company name if switching to freelancer
      company: value === 'freelancer' ? '' : formData.company
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Honeypot validation
    if (!validateHoneypot(formData.honeypot)) {
      return; // Silent failure for bots
    }

    // Rate limiting
    if (!rateLimiter(formData.email)) {
      toast({
        title: 'Too many attempts',
        description: 'Please wait before submitting again.',
        variant: 'destructive',
      });
      return;
    }

    // Input validation
    try {
      assessmentSchema.parse(formData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: 'Validation Error',
          description: error.errors[0]?.message || 'Please check your input.',
          variant: 'destructive',
        });
        return;
      }
    }

    setIsSubmitting(true);
    
    try {
      const { supabase } = await import('@/integrations/supabase/client');
      
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          ...formData,
          formType: 'assessment'
        }
      });

      if (error) {
        throw error;
      }
      
      toast({
        title: 'Assessment request submitted!',
        description: 'We\'ll contact you within 24 hours to schedule your free assessment.',
      });
      
      setFormData({ name: '', email: '', type: '', company: '', honeypot: '' });
    } catch (error) {
      console.error('Error submitting assessment form:', error);
      
      toast({
        title: 'Something went wrong',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={formData.name}
          onChange={handleChange}
          className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          required
        />
      </div>
      <div>
        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={formData.email}
          onChange={handleChange}
          className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          required
        />
      </div>
      <div>
        <Select onValueChange={handleSelectChange} value={formData.type} required>
          <SelectTrigger className="w-full h-12">
            <SelectValue placeholder="Business or Freelancer" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-input shadow-lg z-50">
            <SelectItem value="business">Business</SelectItem>
            <SelectItem value="freelancer">Freelancer</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {formData.type === 'business' && (
        <div>
          <input
            type="text"
            name="company"
            placeholder="Company name"
            value={formData.company}
            onChange={handleChange}
            className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            required
          />
        </div>
      )}
      {/* Honeypot field - hidden from users */}
      <div style={{ display: 'none' }}>
        <input
          type="text"
          name="honeypot"
          value={formData.honeypot}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 h-12 text-base font-semibold"
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </Button>
    </form>
  );
};

export default AssessmentForm;