import Link from "next/link";
import { LegalSectionArticle } from "@/components/LegalSectionArticle";
import { site } from "@/data/site";
import type { App, LegalDocument } from "@/data/types";

type Kind = "privacy" | "terms";

type Props = {
  app: App;
  kind: Kind;
  document: LegalDocument;
};

const meta: Record<Kind, { title: string; description: string }> = {
  privacy: {
    title:       "Privacy Policy",
    description: "How we collect, use, and protect your information.",
  },
  terms: {
    title:       "Terms of Service",
    description: "The terms that govern your use of this app.",
  },
};

export function LegalPage({ app, kind, document }: Props) {
  const current   = meta[kind];
  const otherKind = kind === "privacy" ? "terms" : "privacy";
  const other     = meta[otherKind];

  return (
    <>
      {/* ── Document wrapper ─────────────────────────────────────── */}
      <div className="container-legal pb-24 pt-14 sm:pt-16">

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-10">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-lo">
            <li>
              <Link href="/apps" className="transition-colors hover:text-mid">
                Apps
              </Link>
            </li>
            <li aria-hidden className="select-none text-edge">/</li>
            <li>
              <Link
                href={`/apps/${app.slug}`}
                className="transition-colors hover:text-mid"
              >
                {app.name}
              </Link>
            </li>
            <li aria-hidden className="select-none text-edge">/</li>
            <li className="text-mid">{current.title}</li>
          </ol>
        </nav>

        {/* Document header */}
        <header className="mb-12 border-b border-white/[0.08] pb-10">
          <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.1em] text-lo">
            {app.name}
          </p>

          <h1 className="text-[32px] font-semibold leading-[1.15] tracking-[-0.025em] text-hi sm:text-[40px]">
            {current.title}
          </h1>

          <p className="mt-2 text-[15px] text-mid">
            {current.description}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-mid">
            <span>
              <span className="font-medium text-hi">Effective date:</span>{" "}
              {document.lastUpdated}
            </span>
            <span>
              <span className="font-medium text-hi">Applies to:</span>{" "}
              {app.name} on{" "}
              {app.platforms
                .map((p) =>
                  p === "ios" ? "iOS" : p === "android" ? "Android" : p === "macos" ? "macOS" : "Web"
                )
                .join(", ")}
            </span>
          </div>
        </header>

        {/* Document body */}
        <LegalSectionArticle sections={document.sections} />

        {/* Contact callout */}
        <div className="mt-14 rounded-xl border border-white/[0.08] bg-surface-raised px-6 py-5">
          <p className="text-[14px] leading-relaxed text-mid">
            <span className="font-semibold text-hi">Questions?</span>{" "}
            Email{" "}
            <a
              href={`mailto:${site.supportEmail}`}
              className="text-hi underline underline-offset-4 decoration-white/20 transition-colors hover:decoration-white/50"
            >
              {site.supportEmail}
            </a>{" "}
            and we will respond personally.
          </p>
        </div>

        {/* Document footer */}
        <footer className="mt-14 border-t border-white/[0.07] pt-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">

            {/* See also */}
            <div>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-lo">
                See also
              </p>
              <Link
                href={`/apps/${app.slug}/${otherKind}`}
                className="inline-flex items-center gap-1.5 text-[14px] font-medium text-mid transition-colors hover:text-hi"
              >
                {other.title}
                <svg
                  aria-hidden
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                  fill="none"
                >
                  <path
                    d="M2.5 6.5h8M7 3l3.5 3.5L7 10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>

            {/* Back nav */}
            <div className="flex flex-col gap-2 sm:items-end">
              <Link
                href={`/apps/${app.slug}`}
                className="text-[13px] text-mid transition-colors hover:text-hi"
              >
                ← Back to {app.name}
              </Link>
              <Link
                href="/apps"
                className="text-[13px] text-lo transition-colors hover:text-hi"
              >
                ← All apps
              </Link>
            </div>
          </div>

          {/* Studio line */}
          <p className="mt-10 text-[12px] text-lo">
            © {new Date().getFullYear()} {site.name}. All rights reserved.{" "}
            {app.name} is a product of {site.name}.
          </p>
        </footer>
      </div>
    </>
  );
}
