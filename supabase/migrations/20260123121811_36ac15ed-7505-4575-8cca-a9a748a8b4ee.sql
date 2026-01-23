-- Create app_role enum for user roles
CREATE TYPE public.app_role AS ENUM ('talent', 'referrer', 'brand', 'admin');

-- Create profiles table
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    full_name TEXT,
    email TEXT,
    avatar_url TEXT,
    job_title TEXT,
    company TEXT,
    years_experience INTEGER,
    industry TEXT,
    linkedin_url TEXT,
    skills TEXT[],
    experience_level TEXT,
    compensation_expectations JSONB,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_roles table (separate from profiles for security)
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Create market_pulse_results table
CREATE TABLE public.market_pulse_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    current_salary NUMERIC,
    market_average NUMERIC,
    percentile INTEGER,
    status TEXT,
    difference NUMERIC,
    industry TEXT,
    job_title TEXT,
    years_experience INTEGER,
    company_size TEXT,
    industry_insights TEXT[],
    recommendations TEXT[],
    full_report JSONB,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create job_matches table
CREATE TABLE public.job_matches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    company TEXT NOT NULL,
    location TEXT,
    salary_range TEXT,
    match_score INTEGER,
    skills_matched TEXT[],
    description TEXT,
    posted_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    external_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_job_matches junction table
CREATE TABLE public.user_job_matches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    job_id UUID REFERENCES public.job_matches(id) ON DELETE CASCADE NOT NULL,
    match_score INTEGER,
    skills_matched TEXT[],
    viewed_at TIMESTAMP WITH TIME ZONE,
    applied_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, job_id)
);

-- Create resumes table for storing parsed resume data
CREATE TABLE public.resumes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    file_name TEXT,
    file_url TEXT,
    parsed_data JSONB,
    skills_extracted TEXT[],
    experience_years INTEGER,
    experience_level TEXT,
    compensation_expectations JSONB,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.market_pulse_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_job_matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;

-- Security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.user_roles
        WHERE user_id = _user_id
          AND role = _role
    )
$$;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
ON public.profiles FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = user_id);

-- User roles policies
CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can add roles to themselves"
ON public.user_roles FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Market pulse results policies
CREATE POLICY "Users can view their own results"
ON public.market_pulse_results FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own results"
ON public.market_pulse_results FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Job matches policies (public read for all authenticated users)
CREATE POLICY "Authenticated users can view active jobs"
ON public.job_matches FOR SELECT
TO authenticated
USING (is_active = true);

-- User job matches policies
CREATE POLICY "Users can view their job matches"
ON public.user_job_matches FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their job matches"
ON public.user_job_matches FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their job matches"
ON public.user_job_matches FOR UPDATE
USING (auth.uid() = user_id);

-- Resumes policies
CREATE POLICY "Users can view their own resumes"
ON public.resumes FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own resumes"
ON public.resumes FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Trigger to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (user_id, email, full_name)
    VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some sample job matches for demo
INSERT INTO public.job_matches (title, company, location, salary_range, match_score, skills_matched, description) VALUES
('Senior Software Engineer', 'TechCorp', 'San Francisco, CA', '$180,000 - $220,000', 95, ARRAY['React', 'TypeScript', 'Node.js'], 'Lead frontend development for our flagship product'),
('Product Manager', 'InnovateCo', 'New York, NY', '$150,000 - $190,000', 88, ARRAY['Product Strategy', 'Agile', 'Data Analysis'], 'Drive product strategy for B2B SaaS platform'),
('Data Scientist', 'AI Labs', 'Remote', '$160,000 - $200,000', 82, ARRAY['Python', 'Machine Learning', 'SQL'], 'Build ML models for predictive analytics'),
('Engineering Manager', 'ScaleUp Inc', 'Austin, TX', '$200,000 - $250,000', 78, ARRAY['Team Leadership', 'Architecture', 'Mentoring'], 'Lead a team of 8 engineers'),
('Full Stack Developer', 'StartupXYZ', 'Remote', '$140,000 - $170,000', 75, ARRAY['React', 'Python', 'AWS'], 'Build end-to-end features for our platform');