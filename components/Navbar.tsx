import Link from "next/link";
import { site } from "@/data/site";

const nav = [
  { href: "/apps",    label: "Apps"    },
  { href: "/about",   label: "About"   },
  { href: "/support", label: "Support" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-surface-base/80 backdrop-blur-xl backdrop-saturate-150">
      <div className="container-page flex h-[60px] items-center justify-between gap-8">
        {/* Wordmark */}
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-2.5 text-[15px] font-semibold tracking-[-0.025em] text-hi"
          aria-label={`${site.name} home`}
        >
          <span
            aria-hidden
            className="relative flex h-[26px] w-[26px] items-center justify-center overflow-hidden rounded-[7px] bg-white/[0.10] transition-transform duration-300 group-hover:rotate-[30deg] ring-1 ring-inset ring-white/[0.12]"
          >
            <span className="absolute inset-0" style={{ background: "linear-gradient(145deg, rgba(255,255,255,0.15) 0%, transparent 60%)" }} />
          </span>
          {site.name}
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden md:flex md:flex-1 md:justify-center">
          <ul className="flex items-center gap-0.5">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-md px-3.5 py-1.5 text-[14px] text-mid transition-colors duration-150 hover:bg-white/[0.06] hover:text-hi"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop CTA */}
        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/apps"
            className="hidden rounded-lg bg-white px-4 py-2 text-[13px] font-medium tracking-[-0.01em] text-surface-base shadow-button transition-all duration-200 hover:bg-white/90 active:scale-[0.97] md:inline-flex"
          >
            Browse apps
          </Link>
          {/* Mobile CTA */}
          <Link
            href="/apps"
            className="inline-flex rounded-lg bg-white px-4 py-2 text-[13px] font-medium text-surface-base md:hidden"
          >
            Apps
          </Link>
        </div>
      </div>

      {/* Mobile sub-nav */}
      <nav aria-label="Primary mobile" className="md:hidden">
        <ul className="flex items-center justify-around border-t border-white/[0.05] px-4 py-2">
          <li>
            <Link href="/" className="flex flex-col items-center gap-0.5 px-3 py-1.5 text-[11px] font-medium text-lo hover:text-hi transition-colors">
              Home
            </Link>
          </li>
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex flex-col items-center gap-0.5 px-3 py-1.5 text-[11px] font-medium text-lo hover:text-hi transition-colors"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
