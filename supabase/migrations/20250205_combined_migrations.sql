-- Create handle_updated_at function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create users table without authentication
CREATE TABLE public.users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    
    -- Basic Information
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    
    -- Preferences
    preferences JSONB DEFAULT '{}'::jsonb,
    marketing_consent BOOLEAN DEFAULT false,
    
    -- Analytics
    last_seen_at TIMESTAMP WITH TIME ZONE,
    visit_count INTEGER DEFAULT 0,
    
    -- Device Information
    last_user_agent TEXT,
    last_ip TEXT
);

-- Enable RLS but allow public access since we're not using auth
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
CREATE POLICY "Enable read access for all users" ON public.users
    FOR SELECT TO public
    USING (true);

CREATE POLICY "Enable insert access for all users" ON public.users
    FOR INSERT TO public
    WITH CHECK (true);

CREATE POLICY "Enable update for matching email" ON public.users
    FOR UPDATE TO public
    USING (true)
    WITH CHECK (true);

-- Create indexes
CREATE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_users_last_seen ON public.users(last_seen_at);

-- Create updated_at trigger
CREATE TRIGGER handle_users_updated_at
    BEFORE UPDATE ON public.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Grant access to public roles
GRANT ALL ON public.users TO anon;
GRANT ALL ON public.users TO authenticated;
GRANT ALL ON public.users TO service_role;

-- Create song_requests table
CREATE TABLE public.song_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    
    -- User Information
    user_id UUID REFERENCES public.users(id),
    user_email TEXT REFERENCES public.users(email),
    
    -- Song Details
    title TEXT,
    description TEXT,
    styles TEXT[],
    tempos TEXT[],
    similar_songs TEXT[],
    additional_details TEXT,
    
    -- Plan Details
    plan_id UUID NOT NULL,
    plan_name TEXT NOT NULL,
    price INTEGER NOT NULL,
    
    -- Status and Progress
    status TEXT DEFAULT 'pending',
    payment_intent_id TEXT,
    payment_status TEXT DEFAULT 'pending'
);

-- Enable RLS but allow public access since we're not using auth
ALTER TABLE public.song_requests ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
CREATE POLICY "Enable read access for all users" ON public.song_requests
    FOR SELECT TO public
    USING (true);

CREATE POLICY "Enable insert access for all users" ON public.song_requests
    FOR INSERT TO public
    WITH CHECK (true);

CREATE POLICY "Enable update for matching user" ON public.song_requests
    FOR UPDATE TO public
    USING (true)
    WITH CHECK (true);

-- Create updated_at trigger
CREATE TRIGGER handle_song_requests_updated_at
    BEFORE UPDATE ON public.song_requests
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Grant access to public roles
GRANT ALL ON public.song_requests TO anon;
GRANT ALL ON public.song_requests TO authenticated;
GRANT ALL ON public.song_requests TO service_role;
