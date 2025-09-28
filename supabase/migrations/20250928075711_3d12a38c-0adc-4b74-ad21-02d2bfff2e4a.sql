-- Add INSERT policy for profiles table to complete RLS coverage
CREATE POLICY "Users can create their own profile" ON public.profiles
FOR INSERT WITH CHECK (auth.uid() = id);