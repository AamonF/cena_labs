"use client";

import type { AuthError, AuthResponse } from "@supabase/supabase-js";

import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { getEmailConfirmedRedirectUrl } from "@/lib/supabase/env";
import { devLog, devWarn } from "@/lib/auth/devLog";

export interface SignUpInput {
  email: string;
  password: string;
  /** Optional metadata persisted to `auth.users.user_metadata`. */
  metadata?: Record<string, unknown>;
  /**
   * Override where Supabase redirects users after they click the
   * confirmation link in their inbox. Defaults to the canonical
   * `${SITE_URL}/auth/confirmed`.
   */
  emailRedirectTo?: string;
}

export interface SignUpResult {
  ok: boolean;
  needsEmailConfirmation: boolean;
  error: AuthError | null;
  data: AuthResponse["data"] | null;
}

/**
 * Reusable signup helper. Always sets `emailRedirectTo` so that the
 * confirmation link in the user's inbox sends them back to the
 * `/auth/confirmed` route on the *correct* origin (production vs preview
 * vs local), without depending on the Supabase project's "Site URL" alone.
 */
export async function signUpWithEmail({
  email,
  password,
  metadata,
  emailRedirectTo,
}: SignUpInput): Promise<SignUpResult> {
  const supabase = getSupabaseBrowserClient();
  const redirectTo = emailRedirectTo ?? getEmailConfirmedRedirectUrl();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: redirectTo,
      data: metadata,
    },
  });

  if (error) {
    devWarn("signUp error", error.message);
    return { ok: false, needsEmailConfirmation: false, error, data: null };
  }

  // When email confirmations are enabled in Supabase Auth (recommended for
  // production), `signUp` returns a user with no active session. The user
  // must click the confirmation link before they get a real session.
  const needsEmailConfirmation = !data.session;

  devLog(
    "signup success",
    needsEmailConfirmation
      ? `confirmation email sent → redirect target: ${redirectTo}`
      : "session created immediately (email confirmation disabled)",
  );

  return {
    ok: true,
    needsEmailConfirmation,
    error: null,
    data,
  };
}
