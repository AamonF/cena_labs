import Image from "next/image";
import Link from "next/link";
import { AppIcon } from "./AppIcon";
import { Button } from "./Button";
import type { App } from "@/data/types";
import { site } from "@/data/site";

type Props = { app: App };

const platformLabel: Record<string, string> = {
  ios:     "iOS",
  android: "Android",
  web:     "Web",
  macos:   "macOS",
};

/* ─────────────────────────────────────────────────────────────── */
export function AppPage({ app }: Props) {
  const storeLinks = app.links?.filter((l) => l.kind === "store") ?? [];

  return (
    <>
      <Hero app={app} storeLinks={storeLinks} />
      <WhatItDoes app={app} />
      {app.howItWorks && app.howItWorks.length > 0 && <HowItWorks app={app} />}
      {app.screenshots.length > 0 && <Screenshots app={app} />}
      <Features app={app} />
      {app.audience && app.audience.length > 0 && <Audience app={app} />}
      {app.mistakes && app.mistakes.length > 0 && <Mistakes app={app} />}
      {app.tips && app.tips.length > 0 && <Tips app={app} />}
      <CtaBanner app={app} storeLinks={storeLinks} />
      {app.faq && app.faq.length > 0 && <Faq app={app} />}
      <LegalFooter app={app} />
    </>
  );
}

/* ─── Status pill ─────────────────────────────────────────────── */
function StatusPill({ status }: { status: App["status"] }) {
  const map = {
    live: {
      label: "Live",
      color: "emerald",
    },
    beta: {
      label: "In beta",
      color: "amber",
    },
    "coming-soon": {
      label: "Coming soon",
      color: "sky",
    },
  } as const;
  const c = map[status];
  const classes =
    c.color === "emerald"
      ? "bg-emerald-500/[0.12] text-emerald-400 ring-emerald-500/[0.22]"
      : c.color === "amber"
        ? "bg-amber-500/[0.12] text-amber-300 ring-amber-500/[0.22]"
        : "bg-sky-500/[0.12] text-sky-300 ring-sky-500/[0.22]";
  const dotClass =
    c.color === "emerald"
      ? "bg-emerald-400"
      : c.color === "amber"
        ? "bg-amber-300"
        : "bg-sky-300";

  return (
    <span className={`rounded-full px-3 py-1 text-[11px] font-medium ring-1 ring-inset ${classes}`}>
      <span className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full ${dotClass}`} />
      {c.label}
    </span>
  );
}

/* ─── Hero ────────────────────────────────────────────────────── */
function Hero({
  app,
  storeLinks,
}: {
  app: App;
  storeLinks: App["links"] & {};
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-white/[0.07]">
      {/* Accent glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          background: `radial-gradient(ellipse 80% 70% at 50% -5%, ${
            app.accent ?? "#4f7bff"
          }28, transparent 65%)`,
        }}
      />
      {/* Top edge line */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${
            app.accent ?? "#4f7bff"
          }80 50%, transparent)`,
        }}
      />

      <div className="container-page py-20 sm:py-28 lg:py-32">
        <div className="grid gap-10 md:grid-cols-[auto_1fr] md:items-start md:gap-16">
          {/* App icon */}
          <div className="flex flex-col items-start gap-5 md:pt-3">
            <AppIcon app={app} size={96} />
            <div className="flex flex-wrap gap-2">
              {app.platforms.map((p) => (
                <span
                  key={p}
                  className="rounded-full bg-white/[0.06] px-3 py-1 text-[11px] font-medium text-mid ring-1 ring-inset ring-white/[0.10]"
                >
                  {platformLabel[p] ?? p}
                </span>
              ))}
              <StatusPill status={app.status} />
            </div>
          </div>

          {/* Text */}
          <div className="max-w-2xl">
            <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-lo">
              {app.category}
            </p>
            <h1 className="text-balance text-5xl font-semibold leading-[1.04] tracking-[-0.04em] text-hi sm:text-[60px] lg:text-[68px]">
              {app.headline ?? app.tagline}
            </h1>
            <p className="mt-5 max-w-xl text-pretty text-[18px] leading-[1.65] text-mid sm:text-[20px]">
              {app.subheadline ?? app.summary}
            </p>

            {/* Store buttons */}
            {storeLinks.length > 0 && (
              <div className="mt-9 flex flex-wrap items-start gap-4">
                {storeLinks.map((l, i) => (
                  <div key={l.href + i} className="flex flex-col items-start gap-1.5">
                    <Button
                      href={l.href}
                      variant={i === 0 ? "primary" : "secondary"}
                      size="lg"
                    >
                      {l.label}
                    </Button>
                    {l.note && (
                      <span className="pl-1 text-[11px] text-lo">{l.note}</span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Highlight badges */}
            {app.highlights && app.highlights.length > 0 && (
              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2">
                {app.highlights.map((h) => (
                  <span
                    key={h.label}
                    className="flex items-center gap-1.5 text-[13px] text-mid"
                  >
                    <span
                      aria-hidden
                      className="text-[9px]"
                      style={{ color: app.accent ?? "#4f7bff" }}
                    >
                      {h.icon ?? "✦"}
                    </span>
                    {h.label}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── What it does ────────────────────────────────────────────── */
function WhatItDoes({ app }: { app: App }) {
  return (
    <section className="container-page py-24 sm:py-32">
      <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-20 lg:items-start">
        {/* Left label */}
        <div className="flex items-center gap-3 lg:pt-2">
          <span aria-hidden className="h-px w-5 shrink-0 bg-white/20" />
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-lo">
            What it does
          </p>
        </div>
        {/* Right content */}
        <div>
          <p className="text-pretty text-[22px] font-medium leading-[1.55] tracking-[-0.02em] text-hi sm:text-[26px]">
            {app.whatItDoes}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─── Screenshots ─────────────────────────────────────────────── */
function Screenshots({ app }: { app: App }) {
  return (
    <section className="overflow-hidden border-y border-white/[0.07] bg-surface-raised/60 py-24 sm:py-32">
      <div className="container-page">
        {/* Section header */}
        <div className="mb-14 flex items-center gap-3">
          <span aria-hidden className="h-px w-5 shrink-0 bg-white/20" />
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-lo">
            A quick look
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {app.screenshots.map((s, i) => (
            <figure key={i} className="group flex flex-col">
              {/* Phone mockup */}
              <div className="relative mx-auto w-full max-w-[240px] overflow-hidden rounded-[2.5rem] shadow-lg ring-1 ring-inset ring-white/[0.10] sm:max-w-full">
                {s.src ? (
                  <div className="relative aspect-[390/844] w-full bg-black">
                    <Image
                      src={s.src}
                      alt={s.alt}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 640px) 240px, 33vw"
                    />
                  </div>
                ) : (
                  <>
                    {/* Status bar placeholder */}
                    <div
                      className="flex h-8 items-center justify-between px-6 text-[10px] font-semibold text-white/70"
                      style={{
                        background: `linear-gradient(180deg, ${
                          app.accent ?? "#4f7bff"
                        }ee 0%, ${app.accent ?? "#4f7bff"}bb 100%)`,
                      }}
                    >
                      <span>9:41</span>
                      <span>●●●</span>
                    </div>
                    {/* Screen body */}
                    <div
                      className="flex aspect-[9/17] w-full flex-col items-center justify-center gap-3 p-6"
                      style={{
                        background: `linear-gradient(180deg, ${
                          app.accent ?? "#4f7bff"
                        }22 0%, ${app.accent ?? "#4f7bff"}0a 100%)`,
                      }}
                      role="img"
                      aria-label={s.alt}
                    >
                      <AppIcon app={app} size={56} />
                      <div className="text-center">
                        <p className="text-[13px] font-medium text-mid">
                          {s.caption}
                        </p>
                        <p className="mt-1 text-[11px] text-lo">
                          Screenshot placeholder
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Caption */}
              <figcaption className="mt-5 text-center">
                <p className="text-[15px] font-semibold tracking-[-0.02em] text-hi">
                  {s.caption}
                </p>
                {s.subcaption && (
                  <p className="mt-1 text-[13px] text-mid">{s.subcaption}</p>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Features ────────────────────────────────────────────────── */
function Features({ app }: { app: App }) {
  return (
    <section className="container-page py-24 sm:py-32">
      {/* Header */}
      <div className="mb-14 max-w-xl">
        <div className="mb-5 flex items-center gap-3">
          <span aria-hidden className="h-px w-5 shrink-0 bg-white/20" />
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-lo">
            Features
          </p>
        </div>
        <h2 className="text-balance text-3xl font-semibold tracking-[-0.03em] text-hi sm:text-4xl">
          Everything it needs.
          <br />
          Nothing it doesn&apos;t.
        </h2>
      </div>

      {/* Grid */}
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {app.features.map((f, i) => (
          <li
            key={f.title}
            className="relative overflow-hidden rounded-2xl bg-surface-raised p-7 ring-1 ring-inset ring-white/[0.08] transition-all duration-200 hover:ring-white/[0.13] hover:bg-surface-overlay"
          >
            {/* Ghost number */}
            <div
              aria-hidden
              className="absolute right-5 top-4 select-none text-[52px] font-semibold leading-none tracking-[-0.04em] text-white/[0.04]"
            >
              {String(i + 1).padStart(2, "0")}
            </div>
            <p
              className="relative mb-3 text-[11px] font-semibold uppercase tracking-[0.1em]"
              style={{ color: app.accent ?? "#4f7bff" }}
            >
              {String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="relative text-[16px] font-semibold tracking-[-0.02em] text-hi">
              {f.title}
            </h3>
            <p className="relative mt-2 text-[13px] leading-relaxed text-mid">
              {f.description}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ─── Audience ────────────────────────────────────────────────── */
function Audience({ app }: { app: App }) {
  if (!app.audience?.length) return null;
  return (
    <section className="border-t border-white/[0.07] bg-surface-raised/50 py-24 sm:py-32">
      <div className="container-page">
        {/* Header */}
        <div className="mb-14">
          <div className="mb-5 flex items-center gap-3">
            <span aria-hidden className="h-px w-5 shrink-0 bg-white/20" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-lo">
              Who it&apos;s for
            </p>
          </div>
          <h2 className="text-balance text-3xl font-semibold tracking-[-0.03em] text-hi sm:text-4xl">
            Who {app.name} is for.
          </h2>
          <p className="mt-4 max-w-lg text-pretty text-[17px] leading-relaxed text-mid">
            {app.name} was built for people who recognize the patterns below.
            If any of these sound like you, you are in the right place.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {app.audience.map((a, i) => (
            <div
              key={a.title}
              className="flex flex-col gap-4 rounded-2xl bg-surface-raised p-6 ring-1 ring-inset ring-white/[0.08]"
            >
              {/* Number dot */}
              <div
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[12px] font-semibold text-white"
                style={{ background: app.accent ?? "#4f7bff" }}
                aria-hidden
              >
                {i + 1}
              </div>
              <div>
                <h3 className="text-[15px] font-semibold tracking-[-0.02em] text-hi">
                  {a.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-mid">
                  {a.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA Banner ──────────────────────────────────────────────── */
function CtaBanner({
  app,
  storeLinks,
}: {
  app: App;
  storeLinks: App["links"] & {};
}) {
  return (
    <section className="container-page py-24 sm:py-28">
      <div
        className="relative overflow-hidden rounded-3xl bg-surface-raised px-8 py-16 text-white ring-1 ring-inset ring-white/[0.10] sm:px-14 sm:py-20"
        style={{
          backgroundImage: `radial-gradient(ellipse 70% 80% at 100% 0%, ${
            app.accent ?? "#4f7bff"
          }30, transparent 60%)`,
        }}
      >
        {/* Corner glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-3xl"
          style={{ background: app.accent ?? "#4f7bff" }}
        />

        <div className="relative max-w-2xl">
          <h2 className="text-balance text-3xl font-semibold tracking-[-0.035em] text-hi sm:text-[42px] sm:leading-[1.1]">
            {app.ctaTitle ?? `Try ${app.name} today.`}
          </h2>
          <p className="mt-4 text-pretty text-[17px] leading-relaxed text-mid">
            {app.ctaBody ?? app.summary}
          </p>

          {storeLinks.length > 0 && (
            <div className="mt-10 flex flex-wrap items-start gap-4">
              {storeLinks.map((l, i) => (
                <div key={l.href + i} className="flex flex-col items-start gap-1.5">
                  <Button
                    href={l.href}
                    size="lg"
                    className={
                      i === 0
                        ? "bg-white text-surface-base shadow-none hover:bg-white/90"
                        : "bg-white/[0.08] text-hi shadow-none ring-1 ring-inset ring-white/[0.15] hover:bg-white/[0.13]"
                    }
                  >
                    {l.label}
                  </Button>
                  {l.note && (
                    <span className="pl-1 text-[11px] text-lo">{l.note}</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ ─────────────────────────────────────────────────────── */
function Faq({ app }: { app: App }) {
  if (!app.faq?.length) return null;
  return (
    <section className="border-t border-white/[0.07] py-24 sm:py-32">
      <div className="container-page">
        <div className="grid gap-14 lg:grid-cols-[1fr_2fr]">
          {/* Left label */}
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span aria-hidden className="h-px w-5 shrink-0 bg-white/20" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-lo">
                FAQ
              </p>
            </div>
            <h2 className="text-balance text-3xl font-semibold tracking-[-0.03em] text-hi sm:text-4xl">
              Questions, answered.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-mid">
              Anything else? Email{" "}
              <a
                href={`mailto:${site.supportEmail}`}
                className="text-hi underline underline-offset-4 decoration-white/20 transition-colors hover:decoration-white/50"
              >
                {site.supportEmail}
              </a>
              .
            </p>
          </div>

          {/* Accordion */}
          <div className="divide-y divide-white/[0.06] overflow-hidden rounded-2xl bg-surface-raised ring-1 ring-inset ring-white/[0.08]">
            {app.faq.map((f, i) => (
              <details key={i} className="group px-6 py-5">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-[15px] font-semibold tracking-[-0.01em] text-hi [&::-webkit-details-marker]:hidden">
                  <span>{f.q}</span>
                  <span
                    aria-hidden
                    className="mt-0.5 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-white/[0.07] text-[15px] font-light text-mid transition-transform duration-200 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-[14px] leading-relaxed text-mid">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── How it works ────────────────────────────────────────────── */
function HowItWorks({ app }: { app: App }) {
  if (!app.howItWorks?.length) return null;
  return (
    <section
      className="border-t border-white/[0.07] py-24 sm:py-32"
      aria-labelledby={`${app.slug}-how`}
    >
      <div className="container-page">
        <div className="mb-14 max-w-xl">
          <div className="mb-5 flex items-center gap-3">
            <span aria-hidden className="h-px w-5 shrink-0 bg-white/20" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-lo">
              How it works
            </p>
          </div>
          <h2
            id={`${app.slug}-how`}
            className="text-balance text-3xl font-semibold tracking-[-0.03em] text-hi sm:text-4xl"
          >
            From confused to confident in four steps.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-mid">
            {app.name} is built around a tight loop: drop in your conversation,
            get a clear read, and copy a reply that actually works.
          </p>
        </div>

        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {app.howItWorks.map((step, i) => (
            <li
              key={step.title}
              className="relative flex flex-col gap-3 rounded-2xl bg-surface-raised p-6 ring-1 ring-inset ring-white/[0.08]"
            >
              <span
                aria-hidden
                className="flex h-8 w-8 items-center justify-center rounded-full text-[12px] font-semibold text-white"
                style={{ background: app.accent ?? "#4f7bff" }}
              >
                {i + 1}
              </span>
              <h3 className="text-[15px] font-semibold tracking-[-0.02em] text-hi">
                {step.title}
              </h3>
              <p className="text-[13px] leading-relaxed text-mid">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ─── Common mistakes ─────────────────────────────────────────── */
function Mistakes({ app }: { app: App }) {
  if (!app.mistakes?.length) return null;
  return (
    <section
      className="border-t border-white/[0.07] bg-surface-raised/40 py-24 sm:py-32"
      aria-labelledby={`${app.slug}-mistakes`}
    >
      <div className="container-page">
        <div className="mb-14 max-w-2xl">
          <div className="mb-5 flex items-center gap-3">
            <span aria-hidden className="h-px w-5 shrink-0 bg-white/20" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-lo">
              Common mistakes
            </p>
          </div>
          <h2
            id={`${app.slug}-mistakes`}
            className="text-balance text-3xl font-semibold tracking-[-0.03em] text-hi sm:text-4xl"
          >
            The texting mistakes {app.name} helps you avoid.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-mid">
            Small patterns quietly sink otherwise good conversations. Here are
            the ones the analysis is tuned to catch — and what to do instead.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {app.mistakes.map((m, i) => (
            <article
              key={m.heading}
              className="rounded-2xl bg-surface-raised p-6 ring-1 ring-inset ring-white/[0.08]"
            >
              <p
                className="mb-3 text-[11px] font-semibold uppercase tracking-[0.1em]"
                style={{ color: app.accent ?? "#4f7bff" }}
              >
                Mistake {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="text-[16px] font-semibold tracking-[-0.02em] text-hi">
                {m.heading}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-mid">
                {m.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Tips / how to improve ───────────────────────────────────── */
function Tips({ app }: { app: App }) {
  if (!app.tips?.length) return null;
  return (
    <section
      className="border-t border-white/[0.07] py-24 sm:py-32"
      aria-labelledby={`${app.slug}-tips`}
    >
      <div className="container-page">
        <div className="mb-14 max-w-2xl">
          <div className="mb-5 flex items-center gap-3">
            <span aria-hidden className="h-px w-5 shrink-0 bg-white/20" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-lo">
              How to improve
            </p>
          </div>
          <h2
            id={`${app.slug}-tips`}
            className="text-balance text-3xl font-semibold tracking-[-0.03em] text-hi sm:text-4xl"
          >
            How to actually improve your conversations.
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {app.tips.map((t) => (
            <article
              key={t.heading}
              className="rounded-2xl bg-surface-raised p-6 ring-1 ring-inset ring-white/[0.08]"
            >
              <h3 className="text-[16px] font-semibold tracking-[-0.02em] text-hi">
                {t.heading}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-mid">
                {t.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Legal footer ────────────────────────────────────────────── */
function LegalFooter({ app }: { app: App }) {
  return (
    <div className="border-t border-white/[0.07] bg-surface-raised/40 py-10">
      <div className="container-page flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-6">
          <p className="text-[13px] font-medium text-hi">{app.name}</p>
          <Link
            href={`/apps/${app.slug}/privacy`}
            className="text-[13px] text-mid underline underline-offset-4 decoration-white/20 transition-colors hover:text-hi hover:decoration-white/50"
          >
            Privacy Policy
          </Link>
          <Link
            href={`/apps/${app.slug}/terms`}
            className="text-[13px] text-mid underline underline-offset-4 decoration-white/20 transition-colors hover:text-hi hover:decoration-white/50"
          >
            Terms of Service
          </Link>
        </div>
        <Link
          href="/apps"
          className="inline-flex items-center gap-1.5 text-[13px] text-lo transition-colors hover:text-hi"
        >
          ← All apps
        </Link>
      </div>
    </div>
  );
}
