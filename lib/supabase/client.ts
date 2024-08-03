import { createBrowserClient } from '@supabase/ssr'

// ドキュメントの内容をそのままコピーした(https://supabase.com/docs/guides/auth/server-side/nextjs?queryGroups=router&router=app)
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}