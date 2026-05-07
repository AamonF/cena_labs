"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";

import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { devLog, devWarn } from "@/lib/auth/devLog";
import type { SupabaseClient as SupabaseClientType } from "@supabase/supabase-js";

/**
 * Phases of the global auth lifecycle. A single source of truth so UI
 * can render skeletons / final states deterministically and avoid the
 * "flash of unauthenticated content" problem.
 */
export type AuthStatus = "initializing" | "authenticated" | "unauthenticated";

export interface AuthContextValue {
  status: AuthStatus;
  session: Session | null;
  user: User | null;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [status, setStatus] = useState<AuthStatus>("initializing");

  // We keep the client in a ref to guarantee the same instance across renders
  // and to avoid running effects when React fast-refreshes in dev.
  // Falls back to `null` when env vars aren't configured so that pages that
  // don't depend on auth can still render in local dev.
  const supabaseRef = useRef<SupabaseClientType | null>(null);
  if (supabaseRef.current === null) {
    try {
      supabaseRef.current = getSupabaseBrowserClient();
    } catch (err) {
      devWarn(
        "Supabase client not available — auth disabled.",
        err instanceof Error ? err.message : err,
      );
    }
  }

  useEffect(() => {
    const supabase = supabaseRef.current;
    if (!supabase) {
      // No client → treat as unauthenticated and short-circuit. Pages can
      // still render; any auth-gated UI will fall through to its
      // unauthenticated branch.
      setStatus("unauthenticated");
      return;
    }
    let isMounted = true;

    // 1) Restore any existing session from cookies / local storage. Using
    //    `getSession` (not `getUser`) is intentional here — we need it to be
    //    fast & non-blocking on first paint. `onAuthStateChange` below will
    //    then keep us in sync going forward.
    supabase.auth
      .getSession()
      .then(({ data, error }) => {
        if (!isMounted) return;
        if (error) {
          devLog("getSession error", error.message);
        }
        setSession(data.session);
        setStatus(data.session ? "authenticated" : "unauthenticated");
        devLog(
          data.session ? "session restored" : "no existing session",
          data.session?.user?.email ? `user=${data.session.user.email}` : "",
        );
      })
      .catch((err) => {
        if (!isMounted) return;
        devLog("getSession threw", err);
        setStatus("unauthenticated");
      });

    // 2) Subscribe to auth changes. This fires on:
    //    - SIGNED_IN          (e.g. after email-confirmation PKCE exchange)
    //    - SIGNED_OUT
    //    - TOKEN_REFRESHED
    //    - USER_UPDATED
    //    - INITIAL_SESSION    (deduped with the getSession() above)
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (event, nextSession) => {
        if (!isMounted) return;
        devLog(`auth event: ${event}`, nextSession?.user?.email ?? "");
        setSession(nextSession);
        setStatus(nextSession ? "authenticated" : "unauthenticated");
      },
    );

    return () => {
      isMounted = false;
      subscription.subscription.unsubscribe();
    };
  }, []);

  const signOut = useCallback(async () => {
    const supabase = supabaseRef.current;
    if (!supabase) return;
    const { error } = await supabase.auth.signOut();
    if (error) devLog("signOut error", error.message);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      status,
      session,
      user: session?.user ?? null,
      signOut,
    }),
    [status, session, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error(
      "useAuth() must be used inside an <AuthProvider>. " +
        "Wrap your app's root layout with <AuthProvider> first.",
    );
  }
  return ctx;
}
