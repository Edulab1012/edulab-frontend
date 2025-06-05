-- First, let's ensure the messages table exists
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    chat_room_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    user_name TEXT NOT NULL,
    avatar_url TEXT,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_messages_chat_room_created 
ON public.messages(chat_room_id, created_at);

CREATE INDEX IF NOT EXISTS idx_messages_user_id 
ON public.messages(user_id);

-- IMPORTANT: Disable RLS temporarily to set up policies
ALTER TABLE public.messages DISABLE ROW LEVEL SECURITY;

-- Drop all existing policies to start fresh
DROP POLICY IF EXISTS "Enable read access for all users" ON public.messages;
DROP POLICY IF EXISTS "Enable insert for all users" ON public.messages;
DROP POLICY IF EXISTS "Enable update for message owners" ON public.messages;
DROP POLICY IF EXISTS "Enable delete for message owners" ON public.messages;
DROP POLICY IF EXISTS "Allow read access to messages" ON public.messages;
DROP POLICY IF EXISTS "Allow insert access to messages" ON public.messages;
DROP POLICY IF EXISTS "Allow update own messages" ON public.messages;
DROP POLICY IF EXISTS "Allow delete own messages" ON public.messages;

-- Re-enable RLS
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Create very permissive policies for development/testing
CREATE POLICY "Allow all operations for everyone" 
ON public.messages 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- Grant all necessary permissions to anon and authenticated roles
GRANT ALL PRIVILEGES ON public.messages TO anon;
GRANT ALL PRIVILEGES ON public.messages TO authenticated;
GRANT ALL PRIVILEGES ON public.messages TO postgres;

-- Grant usage on the schema
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;

-- Grant sequence permissions (for UUID generation)
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- Enable realtime for the messages table
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;

-- Insert a test message to verify everything works
INSERT INTO public.messages (chat_room_id, user_id, user_name, avatar_url, message) 
VALUES ('test-room', 'test-user', 'Test User', '/placeholder.svg', 'Test message - database is working!');
