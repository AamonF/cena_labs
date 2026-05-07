/**
 * Centralised, validated public env access for Supabase + site URL.
 *
 * Reads are lazy: env vars are validated the first time a Supabase client
 * is actually instantiated, not at module-load. That means missing env
 * vars don't break `next build` — only routes that actually mount the
 * auth provider will throw, and they throw with a clear, actionable error
 * instead of an opaque "fetch failed" deep inside Supabase.
 */

function readPublicEnv(name: string): string {
  const value = process.env[name];
  if (!value || value.length === 0) {
    throw new Error(
      `[env] Missing required env var "${name}". ` +
        `Set it locally in .env.local and in your hosting provider (e.g. Vercel).`,
    );
  }
  return value;
}

export function getSupabaseUrl(): string {
  return readPublicEnv("NEXT_PUBLIC_SUPABASE_URL");
}

export function getSupabaseAnonKey(): string {
  return readPublicEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY");
}

/**
 * Public origin of the deployed site. Used to build
 * `emailRedirectTo` URLs that survive across local/preview/production.
 *
 * Falls back to `window.location.origin` on the client when not set,
 * and to the canonical production URL on the server.
 */
export function getSiteOrigin(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/+$/, "");
  if (typeof window !== "undefined") return window.location.origin;
  return "https://www.cenalabs.com";
}

/** Path Supabase should redirect users to after they click the email link. */
export const EMAIL_CONFIRMED_REDIRECT_PATH = "/auth/confirmed";

export function getEmailConfirmedRedirectUrl(): string {
  return `${getSiteOrigin()}${EMAIL_CONFIRMED_REDIRECT_PATH}`;
}
