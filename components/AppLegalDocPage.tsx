import Link from "next/link";
import { LegalSectionArticle } from "@/components/LegalSectionArticle";
import { site } from "@/data/site";
import type { App, LegalDocument } from "@/data/types";

type LegalNav = { href: string; label: string };

type Props = {
  app: App;
  title: string;
  description: string;
  document: LegalDocument;
  currentPath: string;
  nav: readonly LegalNav[];
};

export function AppLegalDocPage({
  app,
  title,
  description,
  document,
  currentPath,
  nav,
}: Props) {
  const seeAlso = nav.filter((r) => r.href !== currentPath);

  return (
    <div className="container-legal pb-24 pt-14 sm:pt-16">
      <nav aria-label="Breadcrumb" className="mb-10">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-lo">
          <li>
            <Link href="/apps" className="transition-colors hover:text-mid">
              Apps
            </Link>
          </li>
          <li aria-hidden className="select-none text-edge">
            /
          </li>
          <li>
            <Link
              href={`/apps/${app.slug}`}
              className="transition-colors hover:text-mid"
            >
              {app.name}
            </Link>
          </li>
          <li aria-hidden className="select-none text-edge">
            /
          </li>
          <li className="text-mid">{title}</li>
        </ol>
      </nav>

      <header className="mb-12 border-b border-white/[0.08] pb-10">
        <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.1em] text-lo">
          {app.name} · Legal
        </p>

        <h1 className="text-[32px] font-semibold leading-[1.15] tracking-[-0.025em] text-hi sm:text-[40px]">
          {title}
        </h1>

        <p className="mt-2 text-[15px] text-mid">{description}</p>

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
                p === "ios"
                  ? "iOS"
                  : p === "android"
                    ? "Android"
                    : p === "macos"
                      ? "macOS"
                      : "Web",
              )
              .join(", ")}
          </span>
        </div>
      </header>

      <LegalSectionArticle sections={document.sections} />

      <div className="mt-14 rounded-xl border border-white/[0.08] bg-surface-raised px-6 py-5">
        <p className="text-[14px] leading-relaxed text-mid">
          <span className="font-semibold text-hi">Questions?</span> Email{" "}
          <a
            href={`mailto:${site.supportEmail}`}
            className="text-hi underline underline-offset-4 decoration-white/20 transition-colors hover:decoration-white/50"
          >
            {site.supportEmail}
          </a>{" "}
          and we will respond personally.
        </p>
      </div>

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

        <p className="mt-10 text-[12px] text-lo">
          © {new Date().getFullYear()} {site.name}. All rights reserved.{" "}
          {app.name} is a product of {site.name}.
        </p>
      </footer>
    </div>
  );
}
