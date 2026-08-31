import { createBrowserClient } from '@supabase/ssr'

// Supabase project URLs are identifiers, not secrets. Keeping this fixed here
// lets Vercel keep the environment-variable configuration private while the
// browser still has the URL it needs to initialize Supabase.
const SUPABASE_URL = 'https://hyeutqboexofqqcqutlp.supabase.co'

export function createClient() {
  return createBrowserClient(
    SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  )
}
