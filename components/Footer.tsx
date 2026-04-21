import Link from "next/link";
import { site } from "@/data/site";
import { getAllApps } from "@/data/apps";
import { unfumbledLegalRoutes } from "@/data/legal/unfumbled-global";

export function Footer() {
  const apps = getAllApps();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-white/[0.07]">
      <div className="container-page py-16 sm:py-20">
        <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2.5 text-[15px] font-semibold tracking-[-0.025em] text-hi"
              aria-label={`${site.name} home`}
            >
              <span
                aria-hidden
                className="flex h-[26px] w-[26px] items-center justify-center rounded-[7px] bg-white/[0.10] ring-1 ring-inset ring-white/[0.12]"
              />
              {site.name}
            </Link>
            <p className="mt-4 max-w-[220px] text-[13px] leading-relaxed text-mid">
              An independent studio building focused, private software.
            </p>
          </div>

          {/* Studio */}
          <div>
            <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-lo">
              Studio
            </h3>
            <ul className="space-y-2.5">
              {[
                { href: "/",        label: "Home"     },
                { href: "/apps",    label: "All apps" },
                { href: "/about",   label: "About"    },
                { href: "/support", label: "Support"  },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[13px] text-mid transition-colors hover:text-hi"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Apps */}
          <div>
            <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-lo">
              Apps
            </h3>
            <ul className="space-y-2.5">
              {apps.map((app) => (
                <li key={app.slug}>
                  <Link
                    href={`/apps/${app.slug}`}
                    className="text-[13px] text-mid transition-colors hover:text-hi"
                  >
                    {app.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-lo">
              Legal
            </h3>
            <ul className="space-y-4">
              {apps.map((app) => (
                <li key={`${app.slug}-legal`}>
                  <p className="mb-1.5 text-[11px] font-medium uppercase tracking-[0.08em] text-lo">
                    {app.name}
                  </p>
                  <div className="flex flex-col gap-2">
                    {app.slug === "unfumbled" ? (
                      <>
                        {unfumbledLegalRoutes.map((r) => (
                          <Link
                            key={r.href}
                            href={r.href}
                            className="text-[13px] text-mid transition-colors hover:text-hi"
                          >
                            {r.label}
                          </Link>
                        ))}
                      </>
                    ) : (
                      <>
                        <Link
                          href={`/apps/${app.slug}/privacy`}
                          className="text-[13px] text-mid transition-colors hover:text-hi"
                        >
                          Privacy Policy
                        </Link>
                        <Link
                          href={`/apps/${app.slug}/terms`}
                          className="text-[13px] text-mid transition-colors hover:text-hi"
                        >
                          Terms of Service
                        </Link>
                      </>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-white/[0.06] pt-8 sm:flex-row sm:items-center">
          <p className="text-[13px] text-lo">
            © {year} {site.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <a
              href={`mailto:${site.email}`}
              className="text-[13px] text-mid transition-colors hover:text-hi"
            >
              {site.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
