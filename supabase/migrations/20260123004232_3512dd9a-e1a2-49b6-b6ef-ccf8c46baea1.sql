-- Create table for Socially Selling Food enrollments
CREATE TABLE public.socially_selling_food_enrollments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT,
  business_name TEXT,
  business_city_state TEXT NOT NULL,
  business_website TEXT NOT NULL,
  google_email TEXT NOT NULL,
  selected_sessions TEXT[] NOT NULL,
  confidence_level INTEGER NOT NULL CHECK (confidence_level >= 0 AND confidence_level <= 10),
  accommodations TEXT,
  payment_status TEXT NOT NULL DEFAULT 'pending',
  stripe_session_id TEXT,
  total_amount INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.socially_selling_food_enrollments ENABLE ROW LEVEL SECURITY;

-- Create policy for inserting (anyone can submit enrollment)
CREATE POLICY "Anyone can submit enrollment" 
ON public.socially_selling_food_enrollments 
FOR INSERT 
WITH CHECK (true);

-- Create policy for admins to view all enrollments
CREATE POLICY "Admins can view all enrollments" 
ON public.socially_selling_food_enrollments 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role IN ('admin', 'editor')
  )
);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_socially_selling_food_enrollments_updated_at
BEFORE UPDATE ON public.socially_selling_food_enrollments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();