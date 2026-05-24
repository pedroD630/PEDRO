import { createClient as _createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

/**
 * Returns a Supabase client.
 * The Database generic is omitted here intentionally — our manual types.ts
 * lacks the `Relationships` array that @supabase/supabase-js >=2 needs to
 * resolve Insert/Update generics correctly. Row types (selects) still work.
 * Use `import type { ... } from '@/lib/supabase/types'` for type safety.
 */
export function createClient() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return _createClient<any>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

/** Module-level singleton — use this in server components / API routes. */
export const supabase = createClient();
