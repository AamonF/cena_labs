import Link from "next/link";
import { site } from "@/data/site";
import { unfumbledLegalRoutes } from "@/data/legal/unfumbled-global";

const UNFUMBLED = { name: "Unfumbled", slug: "unfumbled" } as const;

type Props = {
  title: string;
  description?: string;
  lastUpdated?: string | null;
  appliesTo?: string;
  currentPath: string;
  children: React.ReactNode;
};

export function UnfumbledLegalShell({
  title,
  description,
  lastUpdated,
  appliesTo = `${UNFUMBLED.name} (iOS & Android)`,
  currentPath,
  children,
}: Props) {
  const seeAlso = unfumbledLegalRoutes.filter((r) => r.href !== currentPath);

  return (
    <div className="container-legal pb-24 pt-14 sm:pt-16">
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
              href={`/apps/${UNFUMBLED.slug}`}
              className="transition-colors hover:text-mid"
            >
              {UNFUMBLED.name}
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
          {UNFUMBLED.name} · Legal
        </p>
        <h1 className="text-[32px] font-semibold leading-[1.15] tracking-[-0.025em] text-hi sm:text-[40px]">
          {title}
        </h1>
        {description ? (
          <p className="mt-2 text-[15px] text-mid">{description}</p>
        ) : null}
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-mid">
          {lastUpdated ? (
            <span>
              <span className="font-medium text-hi">Last updated:</span>{" "}
              {lastUpdated}
            </span>
          ) : null}
          <span>
            <span className="font-medium text-hi">Applies to:</span> {appliesTo}
          </span>
        </div>
      </header>

      {children}

      <div className="mt-14 rounded-xl border border-white/[0.08] bg-surface-raised px-6 py-5">
        <p className="text-[14px] leading-relaxed text-mid">
          <span className="font-semibold text-hi">Questions?</span> Email{" "}
          <a
            href={`mailto:${site.supportEmail}`}
            className="text-hi underline underline-offset-4 decoration-white/20 transition-colors hover:decoration-white/50"
          >
            {site.supportEmail}
          </a>{" "}
          — we typically respond within 24–72 hours.
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
              href={`/apps/${UNFUMBLED.slug}`}
              className="text-[13px] text-mid transition-colors hover:text-hi"
            >
              ← Back to {UNFUMBLED.name}
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
          © {new Date().getFullYear()} {site.name}. {UNFUMBLED.name} is offered
          by {site.name}.
        </p>
      </footer>
    </div>
  );
}
