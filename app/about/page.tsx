import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { Button } from "@/components/Button";
import { site } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: `About ${site.name} — Independent AI App Studio`,
  description: `${site.name} is an independent app studio building focused AI, productivity, and communication apps for iOS and the web — without investors, dark patterns, or tracking for its own sake.`,
  path: "/about",
  keywords: [
    `${site.name} about`,
    "indie app studio",
    "AI app studio",
    "independent software",
    "privacy-first apps",
  ],
  absoluteTitle: true,
});

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden border-b border-white/[0.07]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 30% 0%, rgba(79,123,255,0.10), transparent 70%)",
          }}
        />
        <div className="container-page py-20 sm:py-28">
          <div className="max-w-2xl">
            <p className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-lo">
              <span aria-hidden className="h-px w-5 bg-white/20" />
              About the studio
            </p>
            <h1 className="text-balance text-5xl font-semibold tracking-[-0.04em] leading-[1.04] text-hi sm:text-[64px]">
              A small studio, built on patience.
            </h1>
            <p className="mt-6 max-w-lg text-pretty text-[18px] leading-relaxed text-mid">
              {site.name} is an independent app studio. We make things we would
              use ourselves and ship them when they feel inevitable.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <Section eyebrow="Our story" title="Why we make software.">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="space-y-5 text-pretty text-[16px] leading-[1.8] text-mid">
            <p>
              Most software today is loud. It interrupts, tracks, monetizes,
              and demands attention. We wanted to build the opposite — software
              that is calm, private, and genuinely useful. The kind that earns a
              place on your home screen.
            </p>
            <p>
              So we started a studio. No investors, no growth-at-all-costs, no
              dark patterns. Just a small team making apps we believe in, one at
              a time.
            </p>
            <p>
              If that sounds like your kind of software, you are in the right
              place.
            </p>
          </div>

          <dl className="grid grid-cols-2 gap-4 self-start">
            <Stat label="Founded"     value={`${site.foundedYear}`} />
            <Stat label="Based"       value={site.location}         />
            <Stat label="Apps live"   value="1"                     />
            <Stat label="In the oven" value="More soon"             />
          </dl>
        </div>
      </Section>

      {/* Values */}
      <Section
        eyebrow="What we care about"
        title="Craft, privacy, patience."
      >
        <div className="grid gap-4 sm:grid-cols-3">
          {values.map((v) => (
            <div
              key={v.title}
              className="rounded-2xl bg-surface-raised p-7 ring-1 ring-inset ring-white/[0.08]"
            >
              <h3 className="text-[17px] font-semibold tracking-[-0.025em] text-hi">
                {v.title}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-mid">
                {v.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section className="pb-32">
        <div className="relative overflow-hidden rounded-3xl bg-surface-raised px-8 py-14 ring-1 ring-inset ring-white/[0.10] sm:px-14 sm:py-16">
          <div
            aria-hidden
            className="pointer-events-none absolute right-0 top-0 h-80 w-80 translate-x-1/4 -translate-y-1/4 rounded-full opacity-25 blur-3xl"
            style={{ background: "#4f7bff" }}
          />
          <div className="relative flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
            <div className="max-w-md">
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-hi sm:text-3xl">
                Work with us, or just say hello.
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-mid">
                We love hearing from people who use our apps.
              </p>
            </div>
            <Button
              href="/support"
              className="shrink-0 bg-white text-surface-base shadow-none hover:bg-white/90"
            >
              Get in touch
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-surface-raised p-5 ring-1 ring-inset ring-white/[0.08]">
      <dt className="text-[11px] font-semibold uppercase tracking-[0.1em] text-lo">
        {label}
      </dt>
      <dd className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-hi">
        {value}
      </dd>
    </div>
  );
}

const values = [
  {
    title: "Craft",
    body:  "Pixel-level care. Native feel. Typography you can read for hours.",
  },
  {
    title: "Privacy",
    body:  "No tracking for tracking's sake. We collect what we need, nothing more.",
  },
  {
    title: "Patience",
    body:  "We ship when it is ready, then we keep polishing.",
  },
];
