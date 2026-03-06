-- [[TEMPLATE_SCHEMA_INIT]]
-- This is a template blueprint. {{SCHEMA}} will be replaced by the SETUP script.

-- Initialize custom schema
CREATE SCHEMA IF NOT EXISTS {{SCHEMA}};

-- Grant access to standard Supabase roles
GRANT USAGE ON SCHEMA {{SCHEMA}} TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA {{SCHEMA}} TO authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA {{SCHEMA}} TO anon;

-- Create profiles table
CREATE TABLE IF NOT EXISTS {{SCHEMA}}.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE {{SCHEMA}}.profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies
CREATE POLICY "Users can only view their own profile" 
ON {{SCHEMA}}.profiles 
FOR SELECT 
TO authenticated 
USING (auth.uid() = id);

CREATE POLICY "Users can only update their own profile" 
ON {{SCHEMA}}.profiles 
FOR UPDATE 
TO authenticated 
USING (auth.uid() = id);

-- Function to handle new user registration (Still in public to be seen by auth trigger)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO {{SCHEMA}}.profiles (id, email, full_name, avatar_url)
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
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
