import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/Section";
import { JsonLd } from "@/components/JsonLd";
import { getAllApps } from "@/data/apps";
import { site } from "@/data/site";
import { buildMetadata } from "@/lib/seo";
import { faqSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: `Support — ${site.name}`,
  description: `Get help with Unfumbled or any other ${site.name} app. Email ${site.supportEmail} and a real person replies — typically within 24–72 hours.`,
  path: "/support",
  keywords: [
    `${site.name} support`,
    "Unfumbled support",
    "AI app help",
    "contact app studio",
  ],
  absoluteTitle: true,
});

export default function SupportPage() {
  const apps = getAllApps();

  return (
    <>
      {/* Header */}
      <section className="border-b border-white/[0.07]">
        <div className="container-page py-20 sm:py-28">
          <div className="max-w-2xl">
            <p className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-lo">
              <span aria-hidden className="h-px w-5 bg-white/20" />
              Support
            </p>
            <h1 className="text-balance text-5xl font-semibold tracking-[-0.04em] leading-[1.04] text-hi sm:text-[60px]">
              We are here to help.
            </h1>
            <p className="mt-6 max-w-md text-pretty text-[18px] leading-relaxed text-mid">
              A real person reads every message and replies personally.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`mailto:${site.supportEmail}`}
                className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-[15px] font-medium tracking-[-0.01em] text-surface-base shadow-button transition-all duration-200 hover:bg-white/90 active:scale-[0.97]"
              >
                Email us
              </a>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 rounded-lg bg-white/[0.07] px-6 py-3 text-[15px] font-medium tracking-[-0.01em] text-hi ring-1 ring-inset ring-white/[0.10] transition-all duration-200 hover:bg-white/[0.11]"
              >
                General inquiries
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* App-specific resources */}
      <Section
        eyebrow="By app"
        title="App resources."
        description="Jump to an app's page or its legal documents."
      >
        <ul className="divide-y divide-white/[0.06] overflow-hidden rounded-2xl bg-surface-raised ring-1 ring-inset ring-white/[0.08]">
          {apps.map((app) => (
            <li
              key={app.slug}
              className="flex flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <p className="text-[15px] font-semibold tracking-[-0.02em] text-hi">
                  {app.name}
                </p>
                <p className="mt-0.5 text-[13px] text-mid">{app.tagline}</p>
              </div>
              <div className="flex shrink-0 flex-wrap items-center gap-4 text-[13px]">
                <Link
                  href={`/apps/${app.slug}`}
                  className="font-medium text-mid transition-colors hover:text-hi"
                >
                  App page
                </Link>
                <span aria-hidden className="text-lo">|</span>
                <Link
                  href={`/apps/${app.slug}/privacy`}
                  className="text-mid transition-colors hover:text-hi"
                >
                  Privacy
                </Link>
                <Link
                  href={`/apps/${app.slug}/terms`}
                  className="text-mid transition-colors hover:text-hi"
                >
                  Terms
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* FAQ */}
      <Section eyebrow="FAQ" title="Frequently asked." className="pb-32">
        <div className="divide-y divide-white/[0.06] overflow-hidden rounded-2xl bg-surface-raised ring-1 ring-inset ring-white/[0.08]">
          {faq.map((f) => (
            <details key={f.q} className="group px-6 py-5">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-[15px] font-medium tracking-[-0.01em] text-hi [&::-webkit-details-marker]:hidden">
                <span>{f.q}</span>
                <span
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/[0.07] text-[14px] font-light text-mid transition-transform duration-200 group-open:rotate-45"
                  aria-hidden
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
      </Section>

      <JsonLd data={faqSchema(faq)} />
    </>
  );
}

const faq = [
  {
    q: "How do I report a bug?",
    a: `Email ${site.supportEmail} with the app name, device, and steps to reproduce. Screenshots help a lot.`,
  },
  {
    q: "How long until I hear back?",
    a: "Usually within one to two business days. If it's urgent, say so in the subject line.",
  },
  {
    q: "Do you offer refunds?",
    a: "Yes. If an app didn't work for you, email us within 14 days of purchase and we will make it right.",
  },
  {
    q: "Can I request a feature?",
    a: "Please do. Feedback from actual users is the most important input we receive.",
  },
];
