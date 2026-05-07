"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import { useAuth } from "@/lib/auth/AuthProvider";
import { devLog } from "@/lib/auth/devLog";

/* ─── Types ──────────────────────────────────────────────────────── */
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: "purple" | "blue";
}

interface Confetti {
  id: number;
  x: number;
  rotation: number;
  duration: number;
  delay: number;
  color: string;
  size: number;
}

interface UrlAuthError {
  code?: string;
  description?: string;
}

type Phase = "verifying" | "authenticated" | "error";

/* ─── Animation variants ─────────────────────────────────────────── */
const EASE_SMOOTH = [0.4, 0, 0.2, 1] as [number, number, number, number];

const itemVariant = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_SMOOTH },
  },
};

const containerVariant = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.45,
    },
  },
};

const CONFETTI_COLORS = [
  "#7C3AED",
  "#2563EB",
  "#A855F7",
  "#60A5FA",
  "#8B5CF6",
  "#3B82F6",
];

/* ─── Auth flow constants ────────────────────────────────────────── */
/** Where to send a successfully-confirmed user. */
const ONBOARDING_HREF = "/onboarding";
/** Delay before automatically forwarding the user. They can also click manually. */
const AUTO_REDIRECT_MS = 2000;
/** If we're still without a session after this long, surface the error UI. */
const VERIFICATION_GRACE_MS = 5000;

/** Read auth-error params Supabase can attach to the redirect (`?error=` or `#error=`). */
function readUrlAuthError(): UrlAuthError | null {
  if (typeof window === "undefined") return null;
  const search = new URLSearchParams(window.location.search);
  const hashSource = window.location.hash.startsWith("#")
    ? window.location.hash.slice(1)
    : "";
  const hash = new URLSearchParams(hashSource);
  const err = search.get("error") || hash.get("error");
  if (!err) return null;
  return {
    code: search.get("error_code") || hash.get("error_code") || err,
    description:
      search.get("error_description") ||
      hash.get("error_description") ||
      "We couldn't confirm this email link.",
  };
}

/* ─── Component ──────────────────────────────────────────────────── */
export function ConfirmedPage() {
  const prefersReducedMotion = useReducedMotion();
  const router = useRouter();
  const { status, user } = useAuth();

  const [particles, setParticles] = useState<Particle[]>([]);
  const [confetti, setConfetti] = useState<Confetti[]>([]);
  const [mounted, setMounted] = useState(false);
  const [urlError, setUrlError] = useState<UrlAuthError | null>(null);
  const [graceElapsed, setGraceElapsed] = useState(false);

  // Latches once we kick off the navigation, so neither a re-render nor the
  // 2s timer can fire `router.replace` twice and create a back-button loop.
  const hasRedirectedRef = useRef(false);

  // ── Mount-only side effects ─────────────────────────────────────
  useEffect(() => {
    setMounted(true);
    setUrlError(readUrlAuthError());

    setParticles(
      Array.from({ length: 22 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.5 + 1,
        duration: Math.random() * 8 + 6,
        delay: Math.random() * 5,
        color: i % 2 === 0 ? "purple" : "blue",
      }))
    );

    setConfetti(
      Array.from({ length: 28 }, (_, i) => ({
        id: i,
        x: 20 + Math.random() * 60,
        rotation: Math.random() * 360,
        duration: Math.random() * 2 + 1.8,
        delay: Math.random() * 0.8,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        size: Math.random() * 6 + 4,
      }))
    );

    devLog("confirmation redirect detected", window.location.pathname);
  }, []);

  // ── Verification grace window ───────────────────────────────────
  // Give Supabase's PKCE code-exchange a fair window to populate the
  // session before we admit failure to the user.
  useEffect(() => {
    if (status === "authenticated") return;
    const t = window.setTimeout(() => setGraceElapsed(true), VERIFICATION_GRACE_MS);
    return () => window.clearTimeout(t);
  }, [status]);

  // ── Auto-redirect on success ────────────────────────────────────
  useEffect(() => {
    if (status !== "authenticated") return;
    if (hasRedirectedRef.current) return;

    const t = window.setTimeout(() => {
      if (hasRedirectedRef.current) return;
      hasRedirectedRef.current = true;
      devLog("onboarding redirect triggered", user?.email ? `user=${user.email}` : "");
      router.replace(ONBOARDING_HREF);
    }, AUTO_REDIRECT_MS);

    return () => window.clearTimeout(t);
  }, [status, router, user]);

  // ── Derived render phase ────────────────────────────────────────
  const phase: Phase = useMemo(() => {
    if (urlError) return "error";
    if (status === "authenticated") return "authenticated";
    if (status === "unauthenticated" && graceElapsed) return "error";
    return "verifying";
  }, [status, urlError, graceElapsed]);

  const handleManualContinue = () => {
    if (hasRedirectedRef.current) return;
    hasRedirectedRef.current = true;
    devLog("onboarding redirect triggered (manual)");
    // Link's default navigation will run; setting the latch first prevents
    // the auto-redirect timer from firing a second navigation behind it.
  };

  return (
    <div className="relative flex min-h-[calc(100vh-60px)] items-center justify-center overflow-hidden bg-[#0B1020] px-4 py-16 md:py-20">

      {/* ── Background effects ──────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {/* Purple orb — top left */}
        <motion.div
          className="absolute -left-48 -top-48 h-[560px] w-[560px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(124,58,237,0.28) 0%, transparent 68%)",
            filter: "blur(48px)",
          }}
          animate={
            prefersReducedMotion
              ? {}
              : { scale: [1, 1.12, 1], opacity: [0.55, 0.75, 0.55] }
          }
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Blue orb — bottom right */}
        <motion.div
          className="absolute -bottom-40 -right-40 h-[640px] w-[640px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(37,99,235,0.22) 0%, transparent 68%)",
            filter: "blur(64px)",
          }}
          animate={
            prefersReducedMotion
              ? {}
              : { scale: [1, 1.18, 1], opacity: [0.4, 0.6, 0.4] }
          }
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2.5,
          }}
        />

        {/* Center subtle glow */}
        <div
          className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(168,85,247,0.07) 0%, transparent 60%)",
            filter: "blur(80px)",
          }}
        />

        {/* Noise overlay */}
        <div className="absolute inset-0 bg-noise opacity-[0.25]" />

        {/* Floating particles */}
        {mounted &&
          !prefersReducedMotion &&
          particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
                background:
                  p.color === "purple"
                    ? "rgba(168,85,247,0.55)"
                    : "rgba(96,165,250,0.55)",
              }}
              animate={{ y: [0, -28, 0], opacity: [0, 0.65, 0] }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: "easeInOut",
              }}
            />
          ))}

        {/* Animated gradient grid lines */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* ── Confetti burst (only after successful verification) ── */}
      {mounted && !prefersReducedMotion && phase === "authenticated" && (
        <div
          className="pointer-events-none absolute inset-x-0 top-0 overflow-hidden"
          aria-hidden
        >
          {confetti.map((c) => (
            <motion.div
              key={c.id}
              className="absolute rounded-[2px]"
              style={{
                left: `${c.x}%`,
                top: "-10px",
                width: c.size,
                height: c.size * 1.6,
                backgroundColor: c.color,
                rotate: c.rotation,
              }}
              animate={{
                y: ["0vh", "110vh"],
                rotate: [c.rotation, c.rotation + 360],
                opacity: [1, 1, 0],
              }}
              transition={{
                duration: c.duration,
                delay: c.delay,
                ease: "easeIn",
              }}
            />
          ))}
        </div>
      )}

      {/* ── Main content ────────────────────────────────────────── */}
      <div className="relative z-10 flex w-full max-w-md flex-col items-center">

        {/* Mascot */}
        <motion.div
          className="relative mb-8"
          initial={{ opacity: 0, scale: 0.55 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.75,
            ease: [0.175, 0.885, 0.32, 1.1],
          }}
        >
          {/* Glow ring behind mascot */}
          <div
            className="absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: 220,
              height: 220,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(124,58,237,0.45) 0%, rgba(37,99,235,0.22) 50%, transparent 70%)",
              filter: "blur(22px)",
            }}
          />

          {/* Soft pulsing outer ring */}
          <motion.div
            className="absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-500/25"
            style={{ width: 190, height: 190 }}
            animate={
              prefersReducedMotion
                ? {}
                : { scale: [1, 1.08, 1], opacity: [0.5, 0.2, 0.5] }
            }
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Floating mascot */}
          <motion.div
            animate={
              prefersReducedMotion ? {} : { y: [0, -14, 0] }
            }
            transition={{
              duration: 3.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Image
              src="/images/celebrate-mascot.png"
              alt="Promptly mascot celebrating your email verification"
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
          transition={{ duration: 0.65, delay: 0.25, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Gradient top border accent */}
          <div
            className="h-px w-full"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(124,58,237,0.7) 30%, rgba(37,99,235,0.7) 70%, transparent 100%)",
            }}
          />

          <div className="px-8 pb-8 pt-7 md:px-10 md:pb-10 md:pt-9">
            <AnimatePresence mode="wait" initial={false}>
              {phase === "verifying" && (
                <VerifyingContent key="verifying" />
              )}

              {phase === "authenticated" && (
                <AuthenticatedContent
                  key="authenticated"
                  onContinueClick={handleManualContinue}
                />
              )}

              {phase === "error" && (
                <ErrorContent key="error" error={urlError} />
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ─── Phase: verifying (initial state during PKCE exchange) ─────── */
function VerifyingContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: EASE_SMOOTH }}
      className="flex flex-col items-center gap-5 text-center"
      role="status"
      aria-live="polite"
    >
      {/* Status pill */}
      <div className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5">
        <span className="h-2 w-2 animate-pulse rounded-full bg-purple-400" />
        <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#9EB4D8]">
          Confirming
        </span>
      </div>

      {/* Spinner */}
      <Spinner />

      {/* Heading */}
      <h1 className="text-[24px] font-bold leading-[1.18] tracking-tight text-white sm:text-[26px]">
        Verifying your email…
      </h1>

      {/* Sub copy */}
      <p className="text-[13.5px] leading-[1.7] text-[#5E6E8A]">
        Hang tight — this only takes a moment.
      </p>
    </motion.div>
  );
}

/* ─── Phase: authenticated (the original celebration UI) ────────── */
function AuthenticatedContent({
  onContinueClick,
}: {
  onContinueClick: () => void;
}) {
  return (
    <motion.div
      key="authenticated"
      variants={containerVariant}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, y: -8, transition: { duration: 0.25 } }}
      className="flex flex-col items-center gap-5 text-center"
    >
      {/* Verified badge */}
      <motion.div variants={itemVariant}>
        <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/[0.12] px-3.5 py-1.5">
          <svg
            className="h-3.5 w-3.5 flex-shrink-0 text-emerald-400"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
            stroke="currentColor"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
          <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-emerald-400">
            Email Verified
          </span>
        </div>
      </motion.div>

      {/* Heading */}
      <motion.h1
        variants={itemVariant}
        className="text-[28px] font-bold leading-[1.18] tracking-tight text-white sm:text-[32px]"
      >
        Welcome to Promptly{" "}
        <span aria-label="lightning bolt">⚡</span>
      </motion.h1>

      {/* Subheading */}
      <motion.p
        variants={itemVariant}
        className="text-[15px] font-medium leading-snug text-[#9EB4D8]"
      >
        Your AI learning journey is ready to begin.
      </motion.p>

      {/* Description */}
      <motion.p
        variants={itemVariant}
        className="text-[13.5px] leading-[1.7] text-[#5E6E8A] text-balance"
      >
        Learn prompting, agents, automation, workflows, and real-world AI
        skills through interactive progression.
      </motion.p>

      {/* Divider */}
      <motion.div
        variants={itemVariant}
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
        }}
      />

      {/* CTA — manual continue (auto-redirect happens in parallel) */}
      <motion.div variants={itemVariant} className="w-full">
        <Link
          href={ONBOARDING_HREF}
          onClick={onContinueClick}
          prefetch
          className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl px-5 py-[14px] text-[14px] font-semibold leading-snug text-white transition-transform duration-200 hover:scale-[1.025] active:scale-[0.975] sm:text-[15px]"
          style={{
            background:
              "linear-gradient(135deg, #7C3AED 0%, #4F46E5 50%, #2563EB 100%)",
            boxShadow:
              "0 0 0 1px rgba(124,58,237,0.35), 0 4px 28px rgba(124,58,237,0.40), inset 0 1px 0 rgba(255,255,255,0.15)",
          }}
        >
          {/* Hover glow overlay */}
          <span
            className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background:
                "linear-gradient(135deg, #8B5CF6 0%, #6366F1 50%, #3B82F6 100%)",
            }}
            aria-hidden
          />
          {/* Shimmer sweep */}
          <span
            className="absolute inset-0 -translate-x-full transition-transform duration-700 group-hover:translate-x-full"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%)",
            }}
            aria-hidden
          />

          <span className="relative text-center text-pretty">
            Return to the app to start your journey now
          </span>
          <svg
            className="relative h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </Link>
      </motion.div>
    </motion.div>
  );
}

/* ─── Phase: error (URL error or session never arrived) ─────────── */
function ErrorContent({ error }: { error: UrlAuthError | null }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: EASE_SMOOTH }}
      className="flex flex-col items-center gap-5 text-center"
    >
      {/* Status pill */}
      <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/[0.12] px-3.5 py-1.5">
        <svg
          className="h-3.5 w-3.5 flex-shrink-0 text-amber-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m0 3.75h.008v.008H12v-.008zM10.115 4.5h3.77c.535 0 1.037.282 1.314.74l5.038 8.32c.597.985-.111 2.24-1.314 2.24H4.077c-1.203 0-1.911-1.255-1.314-2.24l5.038-8.32A1.534 1.534 0 0110.115 4.5z"
          />
        </svg>
        <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-amber-400">
          Couldn&apos;t verify
        </span>
      </div>

      <h1 className="text-[24px] font-bold leading-[1.18] tracking-tight text-white sm:text-[26px]">
        This link didn&apos;t work
      </h1>

      <p className="text-[13.5px] leading-[1.7] text-[#5E6E8A] text-balance">
        {error?.description ??
          "Your confirmation link may have expired or already been used. Try opening the most recent email we sent you, or request a new one."}
      </p>

      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
        }}
      />

      <Link
        href="/support"
        className="text-[13px] font-medium text-[#9EB4D8] underline underline-offset-4 decoration-white/20 transition-colors hover:decoration-white/50"
      >
        Need help? Contact support →
      </Link>
    </motion.div>
  );
}

/* ─── Tiny spinner in the brand colour ──────────────────────────── */
function Spinner() {
  return (
    <span
      className="inline-block h-9 w-9 animate-spin rounded-full border-[3px] border-white/10 border-t-purple-400"
      role="img"
      aria-label="Loading"
    />
  );
}
