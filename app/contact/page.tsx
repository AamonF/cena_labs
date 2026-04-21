import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/data/site";
import { unfumbledLegalRoutes } from "@/data/legal/unfumbled-global";
import { buildMetadata } from "@/lib/seo";

const path = "/contact";

export const metadata: Metadata = buildMetadata({
  title: "Contact Unfumbled",
  description: `Get in touch with the Cena Labs team for Unfumbled support, privacy requests, account issues, subscriptions, or legal inquiries. We typically respond within 24–72 hours.`,
  path,
  absoluteTitle: true,
});

const channels = [
  {
    label: "Support",
    description: "Subscription issues, account problems, app bugs",
    email: site.supportEmail,
  },
  {
    label: "Business",
    description: "Press, partnerships, and general inquiries",
    email: site.email,
  },
];

const topics = [
  "Subscription & billing",
  "Account access or deletion",
  "Privacy & data requests",
  "Legal requests",
  "Bug reports",
  "Feature feedback",
];

const seeAlso = unfumbledLegalRoutes.filter((r) => r.href !== path);

export default function ContactPage() {
  return (
    <div className="container-legal pb-24 pt-14 sm:pt-16">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-10">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-lo">
          <li>
            <Link href="/" className="transition-colors hover:text-mid">
              Home
            </Link>
          </li>
          <li aria-hidden className="select-none text-edge">
            /
          </li>
          <li>
            <Link
              href="/apps/unfumbled"
              className="transition-colors hover:text-mid"
            >
              Unfumbled
            </Link>
          </li>
          <li aria-hidden className="select-none text-edge">
            /
          </li>
          <li className="text-mid">Contact</li>
        </ol>
      </nav>

      {/* Header */}
      <header className="mb-12 border-b border-white/[0.08] pb-10">
        <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.1em] text-lo">
          Unfumbled · Contact
        </p>
        <h1 className="text-[32px] font-semibold leading-[1.15] tracking-[-0.025em] text-hi sm:text-[40px]">
          Get in touch
        </h1>
        <p className="mt-2 text-[15px] text-mid">
          Questions about Unfumbled? We&apos;re here to help. Typical response
          time is{" "}
          <span className="font-medium text-hi">24–72 hours</span>.
        </p>
      </header>

      {/* Contact channels */}
      <section className="mb-10">
        <div className="grid gap-3 sm:grid-cols-2">
          {channels.map((c) => (
            <div
              key={c.email}
              className="rounded-xl border border-white/[0.08] bg-surface-raised px-5 py-4"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-lo">
                {c.label}
              </p>
              <a
                href={`mailto:${c.email}`}
                className="mt-1 block text-[15px] font-medium text-hi underline underline-offset-4 decoration-white/20 transition-colors hover:decoration-white/50"
              >
                {c.email}
              </a>
              <p className="mt-1 text-[13px] text-lo">{c.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Topics note */}
      <section className="mb-10 rounded-xl border border-white/[0.06] bg-surface-overlay px-5 py-4">
        <p className="mb-3 text-[13px] font-medium text-mid">
          You can reach us for questions about:
        </p>
        <ul className="grid gap-1.5 sm:grid-cols-2">
          {topics.map((t) => (
            <li
              key={t}
              className="flex items-center gap-2 text-[13px] text-lo"
            >
              <span className="text-[10px] text-lo/60">✦</span>
              {t}
            </li>
          ))}
        </ul>
      </section>

      {/* Divider */}
      <div className="mb-10 flex items-center gap-4">
        <div className="h-px flex-1 bg-white/[0.07]" />
        <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-lo">
          Or send a message
        </p>
        <div className="h-px flex-1 bg-white/[0.07]" />
      </div>

      {/* Form */}
      <ContactForm />

      {/* Footer nav */}
      <footer className="mt-14 border-t border-white/[0.07] pt-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-lo">
              See also
            </p>
            <ul className="flex flex-col gap-2">
              {seeAlso.map((r) => (
                <li key={r.href}>
                  <Link
                    href={r.href}
                    className="text-[14px] font-medium text-mid transition-colors hover:text-hi"
                  >
                    {r.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-2 sm:items-end">
            <Link
              href="/apps/unfumbled"
              className="text-[13px] text-mid transition-colors hover:text-hi"
            >
              ← Back to Unfumbled
            </Link>
            <Link
              href="/apps"
              className="text-[13px] text-lo transition-colors hover:text-hi"
            >
              ← All apps
            </Link>
          </div>
        </div>
        <p className="mt-10 text-[12px] text-lo">
          © {new Date().getFullYear()} {site.name}. Unfumbled is offered by{" "}
          {site.name}.
        </p>
      </footer>
    </div>
  );
}
