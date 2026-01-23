-- Create referrals table for tracking referrer activity
CREATE TABLE public.referrals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    referrer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    referred_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    referred_email TEXT NOT NULL,
    referred_name TEXT,
    job_match_id UUID REFERENCES public.job_matches(id) ON DELETE SET NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'interviewing', 'hired', 'rejected', 'expired')),
    referral_fee NUMERIC DEFAULT 0,
    referrer_earnings NUMERIC DEFAULT 0,
    talent_earnings NUMERIC DEFAULT 0,
    platform_earnings NUMERIC DEFAULT 0,
    hired_at TIMESTAMP WITH TIME ZONE,
    paid_at TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on referrals
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;

-- Referrers can view their own referrals
CREATE POLICY "Referrers can view their own referrals"
ON public.referrals
FOR SELECT
USING (auth.uid() = referrer_id);

-- Referrers can insert their own referrals
CREATE POLICY "Referrers can insert their own referrals"
ON public.referrals
FOR INSERT
WITH CHECK (auth.uid() = referrer_id);

-- Referrers can update their own referrals
CREATE POLICY "Referrers can update their own referrals"
ON public.referrals
FOR UPDATE
USING (auth.uid() = referrer_id);

-- Create trigger for updating updated_at
CREATE TRIGGER update_referrals_updated_at
BEFORE UPDATE ON public.referrals
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample referral data for demonstration
INSERT INTO public.referrals (referrer_id, referred_email, referred_name, job_match_id, status, referral_fee, referrer_earnings, talent_earnings, platform_earnings, hired_at, paid_at)
SELECT 
    (SELECT id FROM auth.users LIMIT 1),
    'sarah.chen@email.com',
    'Sarah Chen',
    (SELECT id FROM public.job_matches WHERE title = 'Senior Software Engineer' LIMIT 1),
    'hired',
    15000,
    5250,
    5250,
    4500,
    now() - interval '30 days',
    now() - interval '15 days'
WHERE EXISTS (SELECT 1 FROM auth.users LIMIT 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.referrals (referrer_id, referred_email, referred_name, status, referral_fee, referrer_earnings)
SELECT 
    (SELECT id FROM auth.users LIMIT 1),
    'mike.johnson@email.com',
    'Mike Johnson',
    'interviewing',
    12000,
    0
WHERE EXISTS (SELECT 1 FROM auth.users LIMIT 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.referrals (referrer_id, referred_email, referred_name, status)
SELECT 
    (SELECT id FROM auth.users LIMIT 1),
    'emma.wilson@email.com',
    'Emma Wilson',
    'contacted'
WHERE EXISTS (SELECT 1 FROM auth.users LIMIT 1)
ON CONFLICT DO NOTHING;