import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// If these aren't set, we fall back to Demo Mode
export const isDemoMode = !supabaseUrl || !supabaseAnonKey || supabaseUrl === 'https://your-project-id.supabase.co'

export const supabase = !isDemoMode 
  ? createClient(supabaseUrl, supabaseAnonKey, {
      db: {
        schema: 'app_data'
      }
    })
  : (null as any) // Supabase calls will be bypassed in demo mode
