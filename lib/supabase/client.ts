"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

import { getSupabaseAnonKey, getSupabaseUrl } from "./env";

/**
 * Single shared browser Supabase client.
 *
 * Returning a singleton avoids creating duplicate `GoTrueClient`s in the
 * same tab — Supabase warns about this and it can cause double auth events
 * (e.g. two `SIGNED_IN` fires in a row on email confirmation).
 */
let browserClient: SupabaseClient | undefined;

export function getSupabaseBrowserClient(): SupabaseClient {
  if (browserClient) return browserClient;

  browserClient = createBrowserClient(getSupabaseUrl(), getSupabaseAnonKey(), {
    auth: {
      // PKCE is the default for `createBrowserClient` — set explicitly so
      // future Supabase upgrades don't silently change the flow.
      flowType: "pkce",
      // Detect `?code=` (PKCE) and hash-fragment tokens from the email link
      // automatically when this client mounts.
      detectSessionInUrl: true,
      // Persist + refresh tokens via the cookie store so SSR can see them.
      persistSession: true,
      autoRefreshToken: true,
    },
  });

  return browserClient;
}
