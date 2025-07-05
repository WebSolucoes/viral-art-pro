
-- Create sports_events table for storing football matches data
CREATE TABLE public.sports_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id INTEGER UNIQUE NOT NULL,
  home_team TEXT NOT NULL,
  away_team TEXT NOT NULL,
  home_logo TEXT,
  away_logo TEXT,
  match_date TIMESTAMP WITH TIME ZONE NOT NULL,
  league TEXT,
  status TEXT DEFAULT 'scheduled',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_settings table for user preferences
CREATE TABLE public.user_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  brand_name TEXT,
  primary_color TEXT DEFAULT '#3B82F6',
  secondary_color TEXT DEFAULT '#1E40AF',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add RLS policies for user_settings
ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own settings" 
  ON public.user_settings 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own settings" 
  ON public.user_settings 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own settings" 
  ON public.user_settings 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Add plan limits column to profiles
ALTER TABLE public.profiles 
ADD COLUMN plan_limits JSONB DEFAULT '{"banners_per_month": 3, "storage_gb": 1}'::jsonb;

-- Update existing profiles with default limits
UPDATE public.profiles 
SET plan_limits = '{"banners_per_month": 3, "storage_gb": 1}'::jsonb
WHERE plan_limits IS NULL;

-- Add banner type and dimensions to banners table
ALTER TABLE public.banners 
ADD COLUMN banner_type TEXT DEFAULT 'custom',
ADD COLUMN dimensions TEXT DEFAULT '1080x1080',
ADD COLUMN event_data JSONB;
