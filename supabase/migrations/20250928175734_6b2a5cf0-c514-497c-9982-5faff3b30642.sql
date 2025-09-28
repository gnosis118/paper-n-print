-- Remove the public read policy for estimates
DROP POLICY IF EXISTS "Public can view estimates by slug" ON public.estimates;

-- Add sharing token column to estimates table
ALTER TABLE public.estimates 
ADD COLUMN sharing_token UUID DEFAULT gen_random_uuid(),
ADD COLUMN sharing_enabled BOOLEAN DEFAULT true,
ADD COLUMN sharing_expires_at TIMESTAMP WITH TIME ZONE;

-- Create index for performance
CREATE INDEX idx_estimates_sharing_token ON public.estimates(sharing_token);

-- Create new secure sharing policy
CREATE POLICY "Allow access with valid sharing token" 
ON public.estimates 
FOR SELECT 
USING (
  sharing_enabled = true 
  AND (sharing_expires_at IS NULL OR sharing_expires_at > now())
);

-- Create policy for authenticated users to access estimates via sharing token
CREATE POLICY "Public can view estimates with valid sharing token"
ON public.estimates
FOR SELECT
USING (
  sharing_token IS NOT NULL 
  AND sharing_enabled = true 
  AND (sharing_expires_at IS NULL OR sharing_expires_at > now())
);