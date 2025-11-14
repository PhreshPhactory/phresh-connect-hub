-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Authenticated users can view applications" ON public.holiday_sprint_applications;

-- Create a secure policy that only allows content managers to view applications
CREATE POLICY "Only content managers can view applications"
ON public.holiday_sprint_applications
FOR SELECT
USING (is_content_manager(auth.uid()));