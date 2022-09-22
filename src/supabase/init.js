import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = process.env.VUE_APP_SUPABASE_URL
export const supabaseKey = process.env.VUE_APP_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)
