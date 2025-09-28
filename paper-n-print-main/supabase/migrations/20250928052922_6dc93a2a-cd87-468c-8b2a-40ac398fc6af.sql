-- Add invoice_count to profiles table to track free user invoice creation
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS invoice_count integer NOT NULL DEFAULT 0;

-- Create storage bucket for user logos
INSERT INTO storage.buckets (id, name, public) 
VALUES ('logos', 'logos', true)
ON CONFLICT (id) DO NOTHING;

-- Create policies for logo uploads (paid users only)
CREATE POLICY "Paid users can upload logos" 
ON storage.objects 
FOR INSERT 
WITH CHECK (
  bucket_id = 'logos' 
  AND auth.uid()::text = (storage.foldername(name))[1]
  AND EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND subscription_status IN ('starter', 'pro', 'agency')
  )
);

CREATE POLICY "Users can view their own logos" 
ON storage.objects 
FOR SELECT 
USING (
  bucket_id = 'logos' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Paid users can update their logos" 
ON storage.objects 
FOR UPDATE 
USING (
  bucket_id = 'logos' 
  AND auth.uid()::text = (storage.foldername(name))[1]
  AND EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND subscription_status IN ('starter', 'pro', 'agency')
  )
);

CREATE POLICY "Users can delete their own logos" 
ON storage.objects 
FOR DELETE 
USING (
  bucket_id = 'logos' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);