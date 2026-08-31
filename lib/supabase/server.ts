import { createClient as createSupabaseClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.SUPABASE_URL!
const SUPABASE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY!

export async function createClient() {
  return createSupabaseClient(SUPABASE_URL, SUPABASE_KEY)
}
