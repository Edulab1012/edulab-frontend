-- Create messages table for the chat functionality
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

-- Enable Row Level Security
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Enable read access for all users" ON public.messages;
DROP POLICY IF EXISTS "Enable insert for all users" ON public.messages;
DROP POLICY IF EXISTS "Enable update for message owners" ON public.messages;
DROP POLICY IF EXISTS "Enable delete for message owners" ON public.messages;

-- Create RLS policies
CREATE POLICY "Enable read access for all users" 
ON public.messages FOR SELECT 
USING (true);

CREATE POLICY "Enable insert for all users" 
ON public.messages FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Enable update for message owners" 
ON public.messages FOR UPDATE 
USING (true)
WITH CHECK (true);

CREATE POLICY "Enable delete for message owners" 
ON public.messages FOR DELETE 
USING (true);

-- Grant necessary permissions
GRANT ALL ON public.messages TO anon;
GRANT ALL ON public.messages TO authenticated;
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;

-- Enable realtime for the messages table
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
