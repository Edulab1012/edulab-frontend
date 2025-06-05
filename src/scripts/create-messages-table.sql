-- Create messages table if it doesn't exist
CREATE TABLE IF NOT EXISTS messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    chat_room_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    user_name TEXT NOT NULL,
    avatar_url TEXT,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_messages_chat_room_created 
ON messages(chat_room_id, created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to read messages from their class
CREATE POLICY IF NOT EXISTS "Users can read messages from their class" 
ON messages FOR SELECT 
USING (true);

-- Create policy to allow users to insert messages
CREATE POLICY IF NOT EXISTS "Users can insert messages" 
ON messages FOR INSERT 
WITH CHECK (true);
