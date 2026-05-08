/**
 * Shared Supabase auth parameter helpers for the website auth bridge pages.
 *
 * Safely merges params from both window.location.search and window.location.hash
 * so every token flow (implicit, PKCE, OTP hash) is handled uniformly.
 *
 * IMPORTANT: Never log raw token values — use the boolean / string helpers below.
 */

export interface SupabaseAuthParams {
  access_token?: string;
  refresh_token?: string;
  token_hash?: string;
  type?: string;
  expires_in?: string;
  expires_at?: string;
  error?: string;
  error_code?: string;
  error_description?: string;
}

const AUTH_PARAM_KEYS: ReadonlyArray<keyof SupabaseAuthParams> = [
  "access_token",
  "refresh_token",
  "token_hash",
  "type",
  "expires_in",
  "expires_at",
  "error",
  "error_code",
  "error_description",
];

/**
 * Parse Supabase auth params from both the URL search string and hash fragment.
 * Query params take precedence over hash params on collision.
 * Strips leading `?` and `#` automatically.
 */
export function parseSupabaseAuthParams(): SupabaseAuthParams {
  if (typeof window === "undefined") return {};

  const rawSearch = window.location.search.startsWith("?")
    ? window.location.search.slice(1)
    : window.location.search;

  const rawHash = window.location.hash.startsWith("#")
    ? window.location.hash.slice(1)
    : window.location.hash;

  const search = new URLSearchParams(rawSearch);
  const hash = new URLSearchParams(rawHash);

  const params: SupabaseAuthParams = {};

  for (const key of AUTH_PARAM_KEYS) {
    // Query params override hash params on collision
    const val = search.get(key) ?? hash.get(key);
    if (val !== null) {
      (params as Record<string, string>)[key] = val;
    }
  }

  return params;
}

/* ─── Boolean debug helpers (safe to pass to devLog) ─────────────── */

export function hasAccessToken(p: SupabaseAuthParams): boolean {
  return typeof p.access_token === "string" && p.access_token.length > 0;
}

export function hasRefreshToken(p: SupabaseAuthParams): boolean {
  return typeof p.refresh_token === "string" && p.refresh_token.length > 0;
}

export function hasTokenHash(p: SupabaseAuthParams): boolean {
  return typeof p.token_hash === "string" && p.token_hash.length > 0;
}

export function hasAuthError(p: SupabaseAuthParams): boolean {
  return typeof p.error === "string" && p.error.length > 0;
}

export function isRecoveryType(p: SupabaseAuthParams): boolean {
  return p.type === "recovery";
}

export function isEmailConfirmationType(p: SupabaseAuthParams): boolean {
  return p.type === "signup" || p.type === "email" || p.type === "email_change";
}

/**
 * Build a safe, loggable summary of which params were found —
 * values are redacted; only their presence is indicated.
 */
export function describeAuthParams(p: SupabaseAuthParams): string {
  const parts: string[] = [];
  if (hasAccessToken(p)) parts.push("access_token=true");
  if (hasRefreshToken(p)) parts.push("refresh_token=true");
  if (hasTokenHash(p)) parts.push("token_hash=true");
  if (p.type) parts.push(`type=${p.type}`);
  if (hasAuthError(p)) parts.push(`error=${p.error}`);
  return parts.join(", ") || "none";
}

/* ─── Human-friendly error formatter ─────────────────────────────── */

/**
 * Map a raw Supabase error to a friendly user-facing message.
 * Never surfaces internal error codes or raw API messages.
 */
export function formatAuthError(
  error: { message?: string; code?: string } | null | undefined,
  context: "confirmation" | "reset",
): string {
  if (!error) return "";

  const msg = (error.message ?? "").toLowerCase();
  const code = (error.code ?? "").toLowerCase();

  if (
    msg.includes("expired") ||
    msg.includes("token has expired") ||
    code.includes("otp_expired")
  ) {
    return context === "confirmation"
      ? "This confirmation link expired."
      : "This reset link expired. Please request a new one.";
  }

  if (
    msg.includes("already") ||
    msg.includes("already confirmed") ||
    code.includes("already_confirmed") ||
    code.includes("otp_already_confirmed")
  ) {
    return "This link has already been used.";
  }

  if (
    msg.includes("invalid") ||
    msg.includes("not found") ||
    msg.includes("unable to") ||
    code.includes("invalid")
  ) {
    return context === "confirmation"
      ? "We couldn't verify your account."
      : "We couldn't establish a secure reset session.";
  }

  if (msg.includes("session") && msg.includes("missing")) {
    return context === "reset"
      ? "Please reopen the latest reset email."
      : "We couldn't verify your account.";
  }

  if (msg.includes("network") || msg.includes("fetch failed")) {
    return "Network error — please check your connection and try again.";
  }

  return context === "confirmation"
    ? "We couldn't verify your account."
    : "We couldn't establish a secure reset session.";
}
