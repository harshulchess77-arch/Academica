import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// For development without Supabase, provide a mock client
let client: ReturnType<typeof createClient<Database>>

if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === 'https://demo.supabase.co') {
  console.warn('⚠️ Supabase environment variables not set. Running in demo mode without backend connection.')
  console.warn('To connect to Supabase, create a .env file with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY')

  // Create a mock client for UI development
  client = createClient<Database>(
    'https://demo.supabase.co',
    'demo-anon-key',
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    }
  ) as any

  // Add demo mode flag
  ;(client as any).isDemoMode = true
} else {
  client = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  })
}

export const supabase = client
export type SupabaseClient = typeof supabase
