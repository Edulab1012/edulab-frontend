import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL || "postgresql://postgres.iuuliuoqgudrqrjfdsuo:Edulab1a2b%24@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres" as string;
const supabaseAnonKey = process.env.SUPABASE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1dWxpdW9xZ3VkcnFyamZkc3VvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwMzczODIsImV4cCI6MjA2MzYxMzM4Mn0.Sw85JlpgRLP8P_dXBn9Fa5rnnjHez62v85U5v1ps9KA" as string;

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
