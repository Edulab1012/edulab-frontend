import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  console.log(
    "❌ Missing Supabase environment variables. Check your .env file!"
  );
}

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true, // ✅ Session-ийг хадгална
    autoRefreshToken: true, // ✅ Token хугацаа дуусахаас өмнө шинэчилнэ
    detectSessionInUrl: true, // ✅ OAuth callback URL-с session олж авна
  },
});

export default supabase;
