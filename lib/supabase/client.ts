import { Database } from '@/types/types_db';
import { createBrowserClient } from '@supabase/ssr';

// ドキュメントの内容をそのままコピーした(https://supabase.com/docs/guides/auth/server-side/nextjs?queryGroups=router&router=app)
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
