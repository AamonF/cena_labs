"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import type { ChangeEvent, FormEvent } from "react";

import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { devLog } from "@/lib/auth/devLog";
import {
  describeAuthParams,
  formatAuthError,
  hasAccessToken,
  hasAuthError,
  hasRefreshToken,
  hasTokenHash,
  isRecoveryType,
  parseSupabaseAuthParams,
} from "@/lib/supabase/authHelpers";

/* ─── Constants ──────────────────────────────────────────────────── */
const DEEP_LINK_BASE = "promptly://auth/reset-password";
const REDIRECT_TIMEOUT_MS = 3500;
const MIN_PW_LENGTH = 5;
const EASE_SMOOTH = [0.4, 0, 0.2, 1] as [number, number, number, number];
const EASE_SPRING = [0.175, 0.885, 0.32, 1.1] as [number, number, number, number];

/* ─── Types ──────────────────────────────────────────────────────── */
type Phase =
  | "loading"      // Parsing URL params
  | "redirecting"  // Attempting deep link into app
  | "form"         // Web fallback — show password form
  | "submitting"   // Updating password via Supabase
  | "success"      // Password updated
  | "link-error";  // Link invalid, expired, or missing

interface UrlParams {
  raw: string;
  hasRecovery: boolean;
  hasError: boolean;
  errorDescription: string;
  tokenHash?: string;
  type?: string;
}

interface FormState {
  password: string;
  confirm: string;
  showPassword: boolean;
  showConfirm: boolean;
  passwordError: string;
  confirmError: string;
  submitError: string;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: "purple" | "blue";
}

/* ─── URL helpers ────────────────────────────────────────────────── */
function parseUrlParams(): UrlParams {
  if (typeof window === "undefined") {
    return { raw: "", hasRecovery: false, hasError: false, errorDescription: "" };
  }

  const p = parseSupabaseAuthParams();

  const hasError = hasAuthError(p);
  const errorDescription = hasError
    ? ((p.error_description ?? p.error ?? "An error occurred.").replace(/_/g, " "))
    : "";

  const hasRecovery = !!(
    window.location.search.includes("code=") ||
    (hasTokenHash(p) && isRecoveryType(p)) ||
    (hasAccessToken(p) && isRecoveryType(p)) ||
    // Some Supabase setups omit type= but still include access_token + refresh_token
    (hasAccessToken(p) && hasRefreshToken(p))
  );

  return {
    raw: window.location.search + window.location.hash,
    hasRecovery,
    hasError,
    errorDescription,
    tokenHash: p.token_hash,
    type: p.type,
  };
}

function buildDeepLink(raw: string): string {
  if (!raw) return DEEP_LINK_BASE;
  const searchPart = raw.startsWith("?") ? raw.split("#")[0] : "";
  const hashIdx = raw.indexOf("#");
  const hashPart = hashIdx !== -1 ? raw.slice(hashIdx) : "";
  return `${DEEP_LINK_BASE}${searchPart}${hashPart}`;
}

/* ─── Validation ─────────────────────────────────────────────────── */
function validatePassword(v: string): string {
  if (!v) return "Please enter a password.";
  if (v.length < MIN_PW_LENGTH)
    return `Password must be at least ${MIN_PW_LENGTH} characters.`;
  return "";
}

function validateConfirm(pw: string, confirm: string): string {
  if (!confirm) return "Please confirm your password.";
  if (pw !== confirm) return "Passwords do not match.";
  return "";
}

/* ─── Animation variants ─────────────────────────────────────────── */
const phaseVariant = {
  hidden:  { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.38, ease: EASE_SMOOTH } },
  exit:    { opacity: 0, y: -10, transition: { duration: 0.25, ease: EASE_SMOOTH } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const staggerItem = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_SMOOTH } },
};

/* ─── Main component ─────────────────────────────────────────────── */
export function ResetPasswordPage() {
  const prefersReducedMotion = useReducedMotion();

  const [phase,     setPhase]     = useState<Phase>("loading");
  const [mounted,   setMounted]   = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [urlParams, setUrlParams] = useState<UrlParams | null>(null);
  const [pwReady,   setPwReady]   = useState(false);

  const [form, setForm] = useState<FormState>({
    password:      "",
    confirm:       "",
    showPassword:  false,
    showConfirm:   false,
    passwordError: "",
    confirmError:  "",
    submitError:   "",
  });

  const timerRef      = useRef<ReturnType<typeof setTimeout> | null>(null);
  const redirectedRef = useRef(false);

  /* ── Mount: parse URL, kick off redirect attempt ─────────────── */
  useEffect(() => {
    setMounted(true);
    devLog("[reset] page loaded");

    const params = parseUrlParams();
    const authParams = parseSupabaseAuthParams();
    setUrlParams(params);

    devLog("[reset] search params found:", window.location.search || "none");
    devLog("[reset] hash params found:", window.location.hash ? "yes" : "none");
    devLog("[reset] params summary:", describeAuthParams(authParams));

    setParticles(
      Array.from({ length: 18 }, (_, i) => ({
        id:       i,
        x:        Math.random() * 100,
        y:        Math.random() * 100,
        size:     Math.random() * 2.5 + 1,
        duration: Math.random() * 8 + 5,
        delay:    Math.random() * 5,
        color:    i % 2 === 0 ? "purple" : "blue",
      }))
    );

    if (params.hasError) {
      devLog("[reset] invalid reset link — URL error:", params.errorDescription);
      setPhase("link-error");
      return;
    }

    if (!params.hasRecovery) {
      devLog("[reset] recovery params missing");
      setPhase("link-error");
      return;
    }

    devLog("[reset] recovery params found");

    // Attempt deep link to the mobile app first
    setPhase("redirecting");
    if (!redirectedRef.current) {
      redirectedRef.current = true;
      const deepLink = buildDeepLink(params.raw);
      devLog("[reset] redirect attempted");
      window.location.href = deepLink;
    }

    // Fallback: show web form after timeout
    timerRef.current = setTimeout(() => {
      devLog("[reset] redirect fallback — showing web form");
      setPhase("form");
    }, REDIRECT_TIMEOUT_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  /* ── Auth state listener + session restoration ───────────────── */
  useEffect(() => {
    let supabase: ReturnType<typeof getSupabaseBrowserClient>;
    try {
      supabase = getSupabaseBrowserClient();
    } catch {
      return;
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      devLog(`[reset] auth event: ${event}`);
      if (event === "PASSWORD_RECOVERY") {
        devLog("[reset] password recovery session established");
        setPwReady(true);
      }
    });

    // Actively restore the session so the web-form path works reliably.
    void (async () => {
      const p = parseSupabaseAuthParams();

      // Check if a valid session already exists
      const { data: { session: existing } } = await supabase.auth.getSession();
      if (existing?.user) {
        devLog("[reset] existing recovery session found");
        setPwReady(true);
        return;
      }

      // access_token + refresh_token flow (implicit)
      if (hasAccessToken(p) && hasRefreshToken(p)) {
        devLog("[reset] setSession started (implicit recovery flow)");
        const { error } = await supabase.auth.setSession({
          access_token: p.access_token!,
          refresh_token: p.refresh_token!,
        });
        if (error) {
          devLog("[reset] setSession failed");
        } else {
          devLog("[reset] setSession success");
          setPwReady(true);
        }
        return;
      }

      // token_hash recovery flow (OTP)
      if (hasTokenHash(p) && isRecoveryType(p)) {
        devLog("[reset] verifyOtp started (token_hash recovery)");
        const { error } = await supabase.auth.verifyOtp({
          token_hash: p.token_hash!,
          type: "recovery",
        });
        if (error) {
          devLog("[reset] verifyOtp error:", error.message);
        }
        // PASSWORD_RECOVERY event will fire and set pwReady via the listener above.
      }
    })();

    return () => subscription.unsubscribe();
  }, []);

  /* ── Form field handlers ─────────────────────────────────────── */
  const handlePasswordChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setForm((f) => ({
      ...f,
      password:      val,
      passwordError: f.passwordError ? validatePassword(val) : "",
      confirmError:  f.confirmError && f.confirm ? validateConfirm(val, f.confirm) : "",
    }));
  }, []);

  const handleConfirmChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setForm((f) => ({
      ...f,
      confirm:      val,
      confirmError: f.confirmError ? validateConfirm(f.password, val) : "",
    }));
  }, []);

  const toggleShowPassword = useCallback(() => {
    setForm((f) => ({ ...f, showPassword: !f.showPassword }));
  }, []);

  const toggleShowConfirm = useCallback(() => {
    setForm((f) => ({ ...f, showConfirm: !f.showConfirm }));
  }, []);

  /* ── Form submission ─────────────────────────────────────────── */
  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const pErr = validatePassword(form.password);
      const cErr = validateConfirm(form.password, form.confirm);

      if (pErr || cErr) {
        devLog("[reset] password validation failed");
        setForm((f) => ({ ...f, passwordError: pErr, confirmError: cErr }));
        return;
      }

      devLog("[reset] update password started");
      setPhase("submitting");
      setForm((f) => ({ ...f, submitError: "" }));

      let supabase: ReturnType<typeof getSupabaseBrowserClient>;
      try {
        supabase = getSupabaseBrowserClient();
      } catch {
        setPhase("form");
        setForm((f) => ({
          ...f,
          submitError:
            "We couldn't establish a secure reset session. Please reopen the latest reset email.",
        }));
        return;
      }

      // If the recovery session isn't ready yet, verify we have a valid one.
      if (!pwReady) {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) {
          devLog("[reset] no valid session at submit time");
          setPhase("form");
          setForm((f) => ({
            ...f,
            submitError:
              "We couldn't establish a secure reset session. Please reopen the latest reset email.",
          }));
          return;
        }
      }

      const { error } = await supabase.auth.updateUser({ password: form.password });

      if (error) {
        devLog("[reset] update password failed");
        setPhase("form");
        setForm((f) => ({
          ...f,
          submitError: formatAuthError(error, "reset"),
        }));
        return;
      }

      devLog("[reset] update password success");
      setPhase("success");
    },
    [form.password, form.confirm, pwReady]
  );

  /* ── Manual retry deep link ──────────────────────────────────── */
  const handleOpenApp = useCallback(() => {
    if (!urlParams) return;
    const deepLink = buildDeepLink(urlParams.raw);
    devLog("[reset] redirect attempted (manual)");
    window.location.href = deepLink;
  }, [urlParams]);

  /* ── Mascot image swap ───────────────────────────────────────── */
  const mascotSrc = phase === "success"
    ? "/images/celebrate-mascot.png"
    : "/images/thinking-mascot.png";

  const mascotAlt = phase === "success"
    ? "Promptly mascot celebrating password reset"
    : phase === "link-error"
    ? "Promptly mascot looking puzzled"
    : "Promptly mascot thinking";

  /* ── Render ──────────────────────────────────────────────────── */
  return (
    <div className="relative flex min-h-[calc(100vh-60px)] items-center justify-center overflow-hidden bg-[#0B1020] px-4 py-16 md:py-20">

      {/* ── Background effects ──────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <motion.div
          className="absolute -left-48 -top-48 h-[560px] w-[560px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(124,58,237,0.28) 0%, transparent 68%)",
            filter: "blur(48px)",
          }}
          animate={prefersReducedMotion ? {} : { scale: [1, 1.12, 1], opacity: [0.55, 0.75, 0.55] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 h-[640px] w-[640px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(37,99,235,0.22) 0%, transparent 68%)",
            filter: "blur(64px)",
          }}
          animate={prefersReducedMotion ? {} : { scale: [1, 1.18, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
        />
        <div
          className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(168,85,247,0.07) 0%, transparent 60%)",
            filter: "blur(80px)",
          }}
        />
        <div className="absolute inset-0 bg-noise opacity-[0.25]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        {mounted && !prefersReducedMotion && particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left:   `${p.x}%`,
              top:    `${p.y}%`,
              width:  p.size,
              height: p.size,
              background: p.color === "purple"
                ? "rgba(168,85,247,0.55)"
                : "rgba(96,165,250,0.55)",
            }}
            animate={{ y: [0, -28, 0], opacity: [0, 0.65, 0] }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* ── Main content ────────────────────────────────────────── */}
      <div className="relative z-10 flex w-full max-w-md flex-col items-center">

        {/* Mascot */}
        <motion.div
          className="relative mb-8"
          initial={{ opacity: 0, scale: 0.55 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.75, ease: EASE_SPRING }}
        >
          <div
            className="absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: 220, height: 220,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(124,58,237,0.45) 0%, rgba(37,99,235,0.22) 50%, transparent 70%)",
              filter: "blur(22px)",
            }}
          />
          <motion.div
            className="absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-500/25"
            style={{ width: 190, height: 190 }}
            animate={prefersReducedMotion ? {} : { scale: [1, 1.08, 1], opacity: [0.5, 0.2, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            animate={prefersReducedMotion ? {} : { y: [0, -14, 0] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src={mascotSrc}
              alt={mascotAlt}
              width={148}
              height={148}
              priority
              className="select-none"
              style={{
                filter:
                  "drop-shadow(0 0 28px rgba(124,58,237,0.55)) drop-shadow(0 8px 24px rgba(0,0,0,0.6))",
              }}
            />
          </motion.div>
        </motion.div>

        {/* Glass card */}
        <motion.div
          className="w-full overflow-hidden rounded-3xl border border-white/[0.09]"
          style={{
            background: "rgba(17, 17, 27, 0.72)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.06), 0 8px 48px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.07)",
          }}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.25, ease: EASE_SMOOTH }}
        >
          {/* Gradient top accent */}
          <div
            className="h-px w-full"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(124,58,237,0.7) 30%, rgba(37,99,235,0.7) 70%, transparent 100%)",
            }}
          />

          <div className="px-8 pb-8 pt-7 md:px-10 md:pb-10 md:pt-9">
            <AnimatePresence mode="wait" initial={false}>
              {phase === "loading" && (
                <LoadingContent key="loading" />
              )}
              {phase === "redirecting" && (
                <RedirectingContent
                  key="redirecting"
                  prefersReducedMotion={prefersReducedMotion ?? false}
                  onOpenApp={handleOpenApp}
                />
              )}
              {(phase === "form" || phase === "submitting") && (
                <FormContent
                  key="form"
                  form={form}
                  pwReady={pwReady}
                  isSubmitting={phase === "submitting"}
                  onPasswordChange={handlePasswordChange}
                  onConfirmChange={handleConfirmChange}
                  onToggleShowPassword={toggleShowPassword}
                  onToggleShowConfirm={toggleShowConfirm}
                  onSubmit={handleSubmit}
                  onOpenApp={handleOpenApp}
                />
              )}
              {phase === "success" && (
                <SuccessContent key="success" onOpenApp={handleOpenApp} />
              )}
              {phase === "link-error" && (
                <LinkErrorContent
                  key="link-error"
                  description={urlParams?.errorDescription}
                />
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ─── Phase: loading ─────────────────────────────────────────────── */
function LoadingContent() {
  return (
    <motion.div
      variants={phaseVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex flex-col items-center gap-5 text-center"
      role="status"
      aria-live="polite"
    >
      <StatusPill color="purple" pulse label="Checking link" />
      <Spinner />
      <h1 className="text-[22px] font-bold leading-snug tracking-tight text-white">
        Verifying your reset link…
      </h1>
      <p className="text-[13px] leading-[1.7] text-[#5E6E8A]">
        Just a moment while we validate your link.
      </p>
    </motion.div>
  );
}

/* ─── Phase: redirecting ─────────────────────────────────────────── */
function RedirectingContent({
  prefersReducedMotion,
  onOpenApp,
}: {
  prefersReducedMotion: boolean;
  onOpenApp: () => void;
}) {
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowFallback(true), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div
      variants={phaseVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex flex-col items-center gap-5 text-center"
      role="status"
      aria-live="polite"
    >
      <StatusPill color="purple" pulse label="Opening Promptly" />

      {/* Animated dots */}
      <div className="flex items-center gap-2" aria-hidden>
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-2.5 w-2.5 rounded-full bg-purple-400"
            animate={prefersReducedMotion ? {} : { scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.22, ease: "easeInOut" }}
          />
        ))}
      </div>

      <h1 className="text-[24px] font-bold leading-snug tracking-tight text-white sm:text-[26px]">
        Opening Promptly…
      </h1>
      <p className="text-[13.5px] leading-[1.7] text-[#5E6E8A] text-balance">
        We&apos;re redirecting you to the Promptly app to complete your password reset.
      </p>

      <AnimatePresence>
        {showFallback && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="flex w-full flex-col gap-3"
          >
            <Divider />
            <p className="text-[12.5px] text-[#5E6E8A]">
              Promptly didn&apos;t open automatically?
            </p>
            <button
              type="button"
              onClick={onOpenApp}
              className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl px-5 py-[13px] text-[14px] font-semibold text-white transition-transform duration-200 hover:scale-[1.025] active:scale-[0.975]"
              style={{
                background:
                  "linear-gradient(135deg, #7C3AED 0%, #4F46E5 50%, #2563EB 100%)",
                boxShadow:
                  "0 0 0 1px rgba(124,58,237,0.35), 0 4px 28px rgba(124,58,237,0.40), inset 0 1px 0 rgba(255,255,255,0.15)",
              }}
            >
              <ShimmerOverlay />
              <span className="relative">Open Promptly</span>
              <PhoneIcon className="relative h-4 w-4 shrink-0" />
            </button>
            <a
              href="https://apps.apple.com/app/promptly"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/[0.10] bg-white/[0.05] px-5 py-[13px] text-[13.5px] font-medium text-[#9EB4D8] transition-colors duration-200 hover:bg-white/[0.08] hover:text-white"
            >
              <DownloadIcon className="h-4 w-4 shrink-0" />
              Download Promptly
            </a>
            <Link
              href="/support"
              className="text-[12.5px] font-medium text-[#5E6E8A] underline underline-offset-4 decoration-white/20 transition-colors hover:decoration-white/50 hover:text-[#9EB4D8]"
            >
              Request a new reset email →
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Phase: form ────────────────────────────────────────────────── */
function FormContent({
  form,
  pwReady,
  isSubmitting,
  onPasswordChange,
  onConfirmChange,
  onToggleShowPassword,
  onToggleShowConfirm,
  onSubmit,
  onOpenApp,
}: {
  form: FormState;
  pwReady: boolean;
  isSubmitting: boolean;
  onPasswordChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onConfirmChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onToggleShowPassword: () => void;
  onToggleShowConfirm: () => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onOpenApp: () => void;
}) {
  const isValid =
    !validatePassword(form.password) && !validateConfirm(form.password, form.confirm);

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, y: -8, transition: { duration: 0.25 } }}
      className="flex flex-col gap-5"
    >
      {/* Header */}
      <motion.div variants={staggerItem} className="flex flex-col items-center gap-3 text-center">
        <StatusPill color="blue" label="Secure reset" />
        <h1 className="text-[26px] font-bold leading-snug tracking-tight text-white sm:text-[28px]">
          Create new password
        </h1>
        <p className="text-[13.5px] leading-[1.7] text-[#5E6E8A] text-balance">
          Choose a strong password for your Promptly account. You&apos;ll use it to sign in.
        </p>
      </motion.div>

      <motion.div variants={staggerItem}>
        <Divider />
      </motion.div>

      {/* Form */}
      <motion.form
        variants={staggerItem}
        onSubmit={onSubmit}
        noValidate
        className="flex flex-col gap-4"
        aria-label="Password reset form"
      >
        {/* New password */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="rp-password"
            className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#5E6E8A]"
          >
            New password
          </label>
          <div className="relative">
            <input
              id="rp-password"
              type={form.showPassword ? "text" : "password"}
              value={form.password}
              onChange={onPasswordChange}
              autoComplete="new-password"
              placeholder="At least 5 characters"
              disabled={isSubmitting}
              aria-describedby={form.passwordError ? "rp-password-error" : undefined}
              aria-invalid={!!form.passwordError}
              className={[
                "w-full rounded-xl border bg-white/[0.04] px-4 py-[13px] pr-11 text-[14px] text-white placeholder-[#3A4460]",
                "outline-none transition-all duration-200",
                "focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/50",
                "disabled:opacity-50",
                form.passwordError
                  ? "border-red-500/50 bg-red-500/[0.04]"
                  : "border-white/[0.10] hover:border-white/[0.16]",
              ].join(" ")}
            />
            <button
              type="button"
              onClick={onToggleShowPassword}
              tabIndex={-1}
              aria-label={form.showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#5E6E8A] transition-colors hover:text-[#9EB4D8]"
            >
              {form.showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
          {form.passwordError && (
            <p id="rp-password-error" role="alert" className="text-[12px] text-red-400">
              {form.passwordError}
            </p>
          )}
        </div>

        {/* Confirm password */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="rp-confirm"
            className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#5E6E8A]"
          >
            Confirm password
          </label>
          <div className="relative">
            <input
              id="rp-confirm"
              type={form.showConfirm ? "text" : "password"}
              value={form.confirm}
              onChange={onConfirmChange}
              autoComplete="new-password"
              placeholder="Re-enter your password"
              disabled={isSubmitting}
              aria-describedby={form.confirmError ? "rp-confirm-error" : undefined}
              aria-invalid={!!form.confirmError}
              className={[
                "w-full rounded-xl border bg-white/[0.04] px-4 py-[13px] pr-11 text-[14px] text-white placeholder-[#3A4460]",
                "outline-none transition-all duration-200",
                "focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/50",
                "disabled:opacity-50",
                form.confirmError
                  ? "border-red-500/50 bg-red-500/[0.04]"
                  : "border-white/[0.10] hover:border-white/[0.16]",
              ].join(" ")}
            />
            <button
              type="button"
              onClick={onToggleShowConfirm}
              tabIndex={-1}
              aria-label={form.showConfirm ? "Hide confirm password" : "Show confirm password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#5E6E8A] transition-colors hover:text-[#9EB4D8]"
            >
              {form.showConfirm ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
          {form.confirmError && (
            <p id="rp-confirm-error" role="alert" className="text-[12px] text-red-400">
              {form.confirmError}
            </p>
          )}
        </div>

        {/* Submit error */}
        {form.submitError && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            role="alert"
            className="rounded-xl border border-red-500/20 bg-red-500/[0.08] px-4 py-3 text-[13px] text-red-300"
          >
            {form.submitError}
          </motion.p>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting || !isValid}
          className="group relative mt-1 flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl px-5 py-[14px] text-[14px] font-semibold text-white transition-all duration-200 hover:scale-[1.025] active:scale-[0.975] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 sm:text-[15px]"
          style={{
            background:
              "linear-gradient(135deg, #7C3AED 0%, #4F46E5 50%, #2563EB 100%)",
            boxShadow:
              "0 0 0 1px rgba(124,58,237,0.35), 0 4px 28px rgba(124,58,237,0.40), inset 0 1px 0 rgba(255,255,255,0.15)",
          }}
        >
          <ShimmerOverlay />
          <span className="relative">
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Updating password…
              </span>
            ) : (
              "Update password"
            )}
          </span>
          {!isSubmitting && (
            <svg
              className="relative h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
              fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          )}
        </button>

        {/* Session status note */}
        {!pwReady && !isSubmitting && (
          <p className="text-center text-[11.5px] text-[#3A4460]">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-purple-500/60 mr-1.5 align-middle" />
            Establishing secure session…
          </p>
        )}
      </motion.form>

      <motion.div variants={staggerItem} className="flex flex-col gap-2.5">
        <Divider />
        <button
          type="button"
          onClick={onOpenApp}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/[0.10] bg-white/[0.05] px-5 py-[13px] text-[13.5px] font-medium text-[#9EB4D8] transition-colors duration-200 hover:bg-white/[0.08] hover:text-white"
        >
          <PhoneIcon className="h-4 w-4 shrink-0" />
          Already have the app? Open Promptly
        </button>
      </motion.div>
    </motion.div>
  );
}

/* ─── Phase: success ─────────────────────────────────────────────── */
function SuccessContent({ onOpenApp }: { onOpenApp: () => void }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, y: -8, transition: { duration: 0.25 } }}
      className="flex flex-col items-center gap-5 text-center"
    >
      <motion.div variants={staggerItem}>
        <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/[0.12] px-3.5 py-1.5">
          <svg
            className="h-3.5 w-3.5 shrink-0 text-emerald-400"
            fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" aria-hidden
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
          <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-emerald-400">
            Password updated
          </span>
        </div>
      </motion.div>

      <motion.h1
        variants={staggerItem}
        className="text-[28px] font-bold leading-snug tracking-tight text-white sm:text-[30px]"
      >
        Password updated{" "}
        <span aria-label="sparkles">✨</span>
      </motion.h1>

      <motion.p
        variants={staggerItem}
        className="text-[13.5px] leading-[1.75] text-[#5E6E8A] text-balance"
      >
        Password updated successfully. Please sign in to Promptly with your new password.
      </motion.p>

      <motion.div variants={staggerItem} className="w-full">
        <Divider />
      </motion.div>

      <motion.div variants={staggerItem} className="flex w-full flex-col gap-3">
        <button
          type="button"
          onClick={onOpenApp}
          className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl px-5 py-[14px] text-[14px] font-semibold text-white transition-transform duration-200 hover:scale-[1.025] active:scale-[0.975] sm:text-[15px]"
          style={{
            background:
              "linear-gradient(135deg, #7C3AED 0%, #4F46E5 50%, #2563EB 100%)",
            boxShadow:
              "0 0 0 1px rgba(124,58,237,0.35), 0 4px 28px rgba(124,58,237,0.40), inset 0 1px 0 rgba(255,255,255,0.15)",
          }}
        >
          <ShimmerOverlay />
          <span className="relative">Open Promptly</span>
          <PhoneIcon className="relative h-4 w-4 shrink-0" />
        </button>

        <Link
          href="/support"
          className="flex w-full items-center justify-center gap-1.5 rounded-2xl border border-white/[0.08] bg-white/[0.04] px-5 py-[13px] text-[13.5px] font-medium text-[#9EB4D8] transition-colors duration-200 hover:bg-white/[0.07] hover:text-white"
        >
          Back to support
        </Link>
      </motion.div>
    </motion.div>
  );
}

/* ─── Phase: link-error ──────────────────────────────────────────── */
function LinkErrorContent({ description }: { description?: string }) {
  const displayDescription =
    description && description.length > 5
      ? description
      : "This password reset link is invalid or has expired. Please request a new one from Promptly.";

  return (
    <motion.div
      variants={phaseVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex flex-col items-center gap-5 text-center"
    >
      <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/[0.12] px-3.5 py-1.5">
        <svg
          className="h-3.5 w-3.5 shrink-0 text-amber-400"
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden
        >
          <path
            strokeLinecap="round" strokeLinejoin="round"
            d="M12 9v3.75m0 3.75h.008v.008H12v-.008zM10.115 4.5h3.77c.535 0 1.037.282 1.314.74l5.038 8.32c.597.985-.111 2.24-1.314 2.24H4.077c-1.203 0-1.911-1.255-1.314-2.24l5.038-8.32A1.534 1.534 0 0110.115 4.5z"
          />
        </svg>
        <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-amber-400">
          Reset link expired
        </span>
      </div>

      <h1 className="text-[24px] font-bold leading-snug tracking-tight text-white sm:text-[26px]">
        Reset link expired
      </h1>

      <p className="text-[13.5px] leading-[1.75] text-[#5E6E8A] text-balance">
        {displayDescription}
      </p>

      <div className="w-full">
        <Divider />
      </div>

      <div className="flex w-full flex-col gap-3">
        <a
          href="promptly://"
          className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl px-5 py-[13px] text-[14px] font-semibold text-white transition-transform duration-200 hover:scale-[1.025] active:scale-[0.975]"
          style={{
            background:
              "linear-gradient(135deg, #7C3AED 0%, #4F46E5 50%, #2563EB 100%)",
            boxShadow:
              "0 0 0 1px rgba(124,58,237,0.35), 0 4px 28px rgba(124,58,237,0.40), inset 0 1px 0 rgba(255,255,255,0.15)",
          }}
        >
          <ShimmerOverlay />
          <span className="relative">Back to Promptly</span>
          <PhoneIcon className="relative h-4 w-4 shrink-0" />
        </a>

        <Link
          href="/support"
          className="flex w-full items-center justify-center gap-1.5 rounded-2xl border border-white/[0.08] bg-white/[0.04] px-5 py-[13px] text-[13.5px] font-medium text-[#9EB4D8] transition-colors duration-200 hover:bg-white/[0.07] hover:text-white"
        >
          Contact support
        </Link>
      </div>

      <p className="text-[12px] text-[#3A4460]">
        To request a new link, open Promptly and use{" "}
        <em className="not-italic text-[#5E6E8A]">Forgot password</em> on the sign-in screen.
      </p>
    </motion.div>
  );
}

/* ─── Shared primitives ──────────────────────────────────────────── */
function StatusPill({
  color,
  label,
  pulse = false,
}: {
  color: "purple" | "blue" | "green";
  label: string;
  pulse?: boolean;
}) {
  const colors = {
    purple: "border-purple-500/30 bg-purple-500/[0.12] text-purple-400",
    blue:   "border-blue-500/30   bg-blue-500/[0.12]   text-blue-400",
    green:  "border-emerald-500/30 bg-emerald-500/[0.12] text-emerald-400",
  };
  const dotColors = {
    purple: "bg-purple-400",
    blue:   "bg-blue-400",
    green:  "bg-emerald-400",
  };
  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 ${colors[color]}`}
    >
      <span
        className={`h-2 w-2 rounded-full ${dotColors[color]} ${pulse ? "animate-pulse" : ""}`}
      />
      <span className="text-[11px] font-semibold uppercase tracking-[0.1em]">{label}</span>
    </div>
  );
}

function Spinner() {
  return (
    <span
      className="inline-block h-9 w-9 animate-spin rounded-full border-[3px] border-white/10 border-t-purple-400"
      role="img"
      aria-label="Loading"
    />
  );
}

function Divider() {
  return (
    <div
      className="h-px w-full"
      style={{
        background:
          "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
      }}
    />
  );
}

function ShimmerOverlay() {
  return (
    <>
      <span
        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(135deg, #8B5CF6 0%, #6366F1 50%, #3B82F6 100%)",
        }}
        aria-hidden
      />
      <span
        className="absolute inset-0 -translate-x-full transition-transform duration-700 group-hover:translate-x-full"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%)",
        }}
        aria-hidden
      />
    </>
  );
}

/* ─── Tiny icon components ───────────────────────────────────────── */
function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3"
      />
    </svg>
  );
}

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
      />
    </svg>
  );
}
