
-- Create profiles table to store user information
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL UNIQUE,
  full_name TEXT,
  business_name TEXT,
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'agency')),
  banners_created_this_month INTEGER DEFAULT 0,
  logo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create banners table to store generated banners
CREATE TABLE public.banners (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('nova_serie', 'promocao', 'comemorativo', 'revendedor')),
  content_name TEXT,
  generated_text TEXT,
  banner_url TEXT,
  tmdb_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.banners ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" 
  ON public.profiles 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own profile" 
  ON public.profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- RLS Policies for banners
CREATE POLICY "Users can view their own banners" 
  ON public.banners 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own banners" 
  ON public.banners 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own banners" 
  ON public.banners 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own banners" 
  ON public.banners 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create storage bucket for logos
INSERT INTO storage.buckets (id, name, public) VALUES ('logos', 'logos', true);

-- Storage policies for logos
CREATE POLICY "Users can upload their own logos" 
  ON storage.objects 
  FOR INSERT 
  WITH CHECK (bucket_id = 'logos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own logos" 
  ON storage.objects 
  FOR SELECT 
  USING (bucket_id = 'logos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own logos" 
  ON storage.objects 
  FOR UPDATE 
  USING (bucket_id = 'logos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own logos" 
  ON storage.objects 
  FOR DELETE 
  USING (bucket_id = 'logos' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create storage bucket for generated banners
INSERT INTO storage.buckets (id, name, public) VALUES ('banners', 'banners', true);

-- Storage policies for banners
CREATE POLICY "Users can upload their own banners" 
  ON storage.objects 
  FOR INSERT 
  WITH CHECK (bucket_id = 'banners' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own banners" 
  ON storage.objects 
  FOR SELECT 
  USING (bucket_id = 'banners' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Function to handle user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (new.id, new.raw_user_meta_data->>'full_name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create profile on user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
