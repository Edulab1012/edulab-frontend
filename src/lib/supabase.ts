import { createClient } from "@supabase/supabase-js"
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://iuuliuoqgudrqrjfdsuo.supabase.co"
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1dWxpdW9xZ3VkcnFyamZkc3VvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwMzczODIsImV4cCI6MjA2MzYxMzM4Mn0.Sw85JlpgRLP8P_dXBn9Fa5rnnjHez62v85U5v1ps9KA"

// Check if we have valid credentials
export const hasValidCredentials =
  supabaseUrl.includes("supabase.co") &&
  supabaseAnonKey &&
  supabaseAnonKey.length > 10 &&
  !supabaseAnonKey.includes("your-anon-key")

let supabase: any

if (hasValidCredentials) {
  supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
    realtime: {
      params: {
        eventsPerSecond: 10,
      },
    },
  })
} else {
  // Create a mock client for demo purposes
  supabase = {
    from: () => ({
      select: () => ({
        eq: () => ({
          order: () =>
            Promise.resolve({
              data: [],
              error: { message: "Demo mode: Please configure Supabase credentials" },
            }),
        }),
      }),
      insert: () =>
        Promise.resolve({
          data: null,
          error: { message: "Demo mode: Please configure Supabase credentials" },
        }),
    }),
    channel: () => ({
      on: () => ({ subscribe: () => { } }),
    }),
    removeChannel: () => { },
  }
}

// Test connection function
export const testSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase.from("messages").select("count").limit(1)
    if (error) {
      console.error("Supabase connection test failed:", error)
      return { success: false, error: error.message }
    }
    console.log("✅ Supabase connection successful")
    return { success: true, data }
  } catch (err) {
    console.error("Network error:", err)
    return { success: false, error: "Network error" }
  }
}

export default supabase