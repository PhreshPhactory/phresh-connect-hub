import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface EmailCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (email: string) => void;
}

const EmailCaptureModal = ({ isOpen, onClose, onSuccess }: EmailCaptureModalProps) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('link_clicks')
        .insert({
          link_name: 'Holiday Sprint Email Capture',
          link_url: window.location.href,
          referrer: document.referrer,
          user_agent: navigator.userAgent,
        });

      if (error) throw error;

      toast({
        title: "Thanks!",
        description: "Continue to complete your application.",
      });

      onSuccess(email);
    } catch (error) {
      console.error('Error saving email:', error);
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Get Your Holiday Affiliate System</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <p className="text-muted-foreground">
            Enter your email to start your 72-hour Holiday Sprint application.
          </p>
          
          <Input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full"
          />
          
          <Button 
            type="submit" 
            className="w-full bg-tertiary hover:bg-tertiary/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'Continue to Application'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EmailCaptureModal;
