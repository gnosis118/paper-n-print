-- Remove the remaining permissive policy and replace with owner-only access
DROP POLICY IF EXISTS "Estimates accessible with verified sharing token" ON public.estimates;

-- Create a strict policy that only allows owners to access their estimates
-- Public access will go through the secure edge function instead
CREATE POLICY "Users can view only their own estimates"  
ON public.estimates
FOR SELECT
USING (auth.uid() = user_id);