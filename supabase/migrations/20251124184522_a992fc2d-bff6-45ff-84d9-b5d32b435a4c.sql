-- Allow admins to update reviews (approve/reject)
CREATE POLICY "Admins can update reviews" 
ON public.reviews 
FOR UPDATE 
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Allow admins to view all reviews (including unapproved)
CREATE POLICY "Admins can view all reviews" 
ON public.reviews 
FOR SELECT 
USING (public.has_role(auth.uid(), 'admin'::app_role));