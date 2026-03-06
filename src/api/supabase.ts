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

/**
 * Checks if the configured schema is accessible.
 * Returns null if healthy, or the error message if there's a schema issue.
 */
export async function checkSchemaHealth(): Promise<string | null> {
    if (isDemoMode) return null
    
    try {
        // Try a minimal query to trigger a schema check. 
        // Even if 'profiles' doesn't exist, if the schema is invalid/not-exposed, 
        // we get PGRST106. If the schema is valid but table missing, we get PGRST116 or similar.
        const { error } = await supabase.from('profiles').select('id').limit(1).maybeSingle()
        
        if (error && error.code === 'PGRST106') {
            return `Schema "${supabaseSchema}" is not exposed in Supabase. Please add it to "Exposed schemas" in Settings > API.`
        }
        
        return null
    } catch (e) {
        return null
    }
}
