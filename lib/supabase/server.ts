import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { SupabaseClient } from "@supabase/supabase-js";

import { getSupabaseAnonKey, getSupabaseUrl } from "./env";

/**
 * Server-side Supabase client for App Router server components, route
 * handlers, and server actions.
 *
 * Reads + writes auth cookies through `next/headers` so the session
 * established in the browser (after email confirmation) is visible to
 * any server-rendered page.
 */
export function getSupabaseServerClient(): SupabaseClient {
  const cookieStore = cookies();

  return createServerClient(getSupabaseUrl(), getSupabaseAnonKey(), {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        // Server components are not allowed to write cookies. The browser
        // client refreshes the session on its own, so swallowing the error
        // here is the documented pattern from @supabase/ssr.
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        } catch {
          /* read-only context (server component) — safe to ignore */
        }
      },
    },
  });
}
