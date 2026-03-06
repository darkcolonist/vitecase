import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
const supabaseSchema = import.meta.env.VITE_SUPABASE_SCHEMA || 'vitecase'

// If these aren't set, we fall back to Demo Mode
export const isDemoMode = !supabaseUrl || !supabasePublishableKey || supabaseUrl === 'https://your-project-id.supabase.co'

export const supabase = !isDemoMode 
  ? createClient(supabaseUrl, supabasePublishableKey, {
      db: {
        schema: supabaseSchema
      }
    })
  : (null as any) // Supabase calls will be bypassed in demo mode
