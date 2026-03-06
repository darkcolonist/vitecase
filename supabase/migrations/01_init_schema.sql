-- Initialize custom schema
CREATE SCHEMA IF NOT EXISTS app_data;

-- Grant access to standard Supabase roles
GRANT USAGE ON SCHEMA app_data TO anon, authenticated;

-- Create profiles table in the app_data schema
CREATE TABLE IF NOT EXISTS app_data.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE app_data.profiles ENABLE ROW LEVEL SECURITY;

-- Grant table access
GRANT ALL ON TABLE app_data.profiles TO authenticated;
GRANT SELECT ON TABLE app_data.profiles TO anon;

-- Create RLS Policies
CREATE POLICY "Users can only view their own profile" 
ON app_data.profiles 
FOR SELECT 
TO authenticated 
USING (auth.uid() = id);

CREATE POLICY "Users can only update their own profile" 
ON app_data.profiles 
FOR UPDATE 
TO authenticated 
USING (auth.uid() = id);

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO app_data.profiles (id, email, full_name, avatar_url)
    VALUES (
        new.id, 
        new.email, 
        new.raw_user_meta_data->>'full_name', 
        new.raw_user_meta_data->>'avatar_url'
    );
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-insert a profile on signup
CREATE OR REPLACE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
