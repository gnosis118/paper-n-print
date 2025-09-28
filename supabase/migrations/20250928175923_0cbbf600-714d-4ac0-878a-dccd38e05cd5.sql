-- Make public_slug optional since we're transitioning to sharing tokens
ALTER TABLE public.estimates ALTER COLUMN public_slug DROP NOT NULL;