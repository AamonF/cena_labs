import Link from "next/link";
import { AppCard } from "@/components/AppCard";
import { Button } from "@/components/Button";
import { Section } from "@/components/Section";
import { getAllApps, getFeaturedApp } from "@/data/apps";
import { site } from "@/data/site";

export default function HomePage() {
  const apps     = getAllApps();
  const featured = getFeaturedApp();
  const otherApps = apps.filter((a) => a.slug !== featured?.slug);

  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden">
        {/* Background layers */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-20"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(79,123,255,0.14), transparent 70%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(79,123,255,0.5) 50%, transparent 100%)",
          }}
        />

        <div className="container-page pb-24 pt-28 sm:pb-32 sm:pt-40">
          <div className="max-w-[780px]">
            {/* Badge */}
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/[0.10] bg-white/[0.05] px-3.5 py-1.5 text-[12px] font-medium tracking-[0.01em] text-mid backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 [animation-duration:2.5s]" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Independent app studio · Est. {site.foundedYear}
            </div>

            {/* Heading */}
            <h1 className="text-balance text-[52px] font-semibold leading-[1.04] tracking-[-0.04em] text-hi sm:text-[72px] lg:text-[84px]">
              Quietly useful software,
              <br className="hidden sm:block" />{" "}
              made with care.
            </h1>

            {/* Subheading */}
            <p className="mt-7 max-w-[500px] text-pretty text-[18px] leading-[1.6] text-mid sm:text-[20px]">
              {site.name} builds focused products that respect your time, your attention, and your data.
            </p>

            {/* CTA row */}
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button href="/apps" size="lg">
                Browse our apps
              </Button>
              <Button href="/about" variant="secondary" size="lg">
                About the studio
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Featured app ─────────────────────────────────────────── */}
      {featured && (
        <Section eyebrow="Flagship" title="Meet the first app.">
          <AppCard app={featured} variant="feature" />
        </Section>
      )}

      {/* ─── Portfolio grid ───────────────────────────────────────── */}
      {(otherApps.length > 0 || true) && (
        <Section
          eyebrow="Portfolio"
          title="Every app from the studio."
          description="Focused, fast, and built to last."
        >
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {otherApps.map((app) => (
              <AppCard key={app.slug} app={app} />
            ))}
            <ComingSoonCard />
          </div>

          <div className="mt-8">
            <Link
              href="/apps"
              className="inline-flex items-center gap-1.5 text-[14px] font-medium text-mid transition-colors hover:text-hi"
            >
              See all apps
              <svg aria-hidden width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M7.5 3.5 11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </Section>
      )}

      {/* ─── Principles ───────────────────────────────────────────── */}
      <Section
        eyebrow="Principles"
        title="How every product is built."
        description="A small set of rules we never bend."
      >
        <div className="grid gap-4 sm:grid-cols-3">
          {principles.map((p, i) => (
            <div
              key={p.title}
              className="relative overflow-hidden rounded-2xl bg-surface-raised p-7 ring-1 ring-inset ring-white/[0.08]"
            >
              <div
                aria-hidden
                className="absolute right-6 top-6 font-semibold text-[64px] leading-none tracking-[-0.04em] text-white/[0.04] select-none"
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="relative text-[17px] font-semibold tracking-[-0.025em] text-hi">
                {p.title}
              </h3>
              <p className="relative mt-2 text-[14px] leading-relaxed text-mid">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── Contact CTA ──────────────────────────────────────────── */}
      <Section className="pb-32">
        <div className="relative overflow-hidden rounded-3xl bg-surface-raised px-8 py-14 ring-1 ring-inset ring-white/[0.10] sm:px-14 sm:py-16">
          {/* Subtle gradient */}
          <div
            aria-hidden
            className="pointer-events-none absolute right-0 top-0 h-80 w-80 translate-x-1/4 -translate-y-1/4 rounded-full opacity-25 blur-3xl"
            style={{ background: "#4f7bff" }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 bottom-0 h-64 w-64 -translate-x-1/4 translate-y-1/4 rounded-full opacity-10 blur-3xl"
            style={{ background: "#a78bfa" }}
          />
          <div className="relative flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
            <div className="max-w-lg">
              <h2 className="text-balance text-2xl font-semibold tracking-[-0.03em] text-hi sm:text-3xl">
                Have a question or idea?
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-mid">
                A real person reads every message and replies personally.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Button
                href="/support"
                className="bg-white text-surface-base shadow-none hover:bg-white/90"
              >
                Get in touch
              </Button>
              <Button
                href="/about"
                className="bg-white/[0.08] text-hi ring-1 ring-inset ring-white/[0.12] hover:bg-white/[0.13] shadow-none"
              >
                About us
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

/* ─── Sub-components ────────────────────────────────────────── */

function ComingSoonCard() {
  return (
    <div className="flex h-full min-h-[180px] flex-col items-start justify-between rounded-2xl border border-dashed border-white/[0.09] p-6">
      <div className="flex h-[52px] w-[52px] items-center justify-center rounded-[13px] bg-white/[0.05] text-xl font-light text-lo">
        +
      </div>
      <div className="mt-auto pt-6">
        <p className="text-[15px] font-semibold tracking-[-0.02em] text-hi">
          More apps, soon.
        </p>
        <p className="mt-1 text-[13px] leading-relaxed text-mid">
          New apps ship when ready, not before.
        </p>
      </div>
    </div>
  );
}

const principles = [
  {
    title: "Focused",
    body:  "One app, one purpose. If a feature isn't essential, we leave it out.",
  },
  {
    title: "Private",
    body:  "Your data stays yours. We collect the minimum we need, and nothing more.",
  },
  {
    title: "Patient",
    body:  "We ship when something is genuinely ready, then keep polishing.",
  },
];
