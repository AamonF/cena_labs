import Link from "next/link";
import { AppIcon } from "./AppIcon";
import { cn } from "@/lib/cn";
import type { App } from "@/data/types";

type Props = {
  app: App;
  variant?: "default" | "feature";
  className?: string;
};

const statusLabel: Record<App["status"], string> = {
  live: "Live",
  beta: "Beta",
  "coming-soon": "Coming soon",
};

const statusStyle: Record<App["status"], string> = {
  live:          "bg-emerald-500/[0.12] text-emerald-400 ring-1 ring-inset ring-emerald-500/[0.22]",
  beta:          "bg-amber-500/[0.12] text-amber-400 ring-1 ring-inset ring-amber-500/[0.22]",
  "coming-soon": "bg-white/[0.04] text-lo ring-1 ring-inset ring-white/[0.08]",
};

export function AppCard({ app, variant = "default", className }: Props) {
  const isFeature = variant === "feature";
  const disabled  = app.status === "coming-soon";

  const badge = (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-[11px] font-medium",
        statusStyle[app.status]
      )}
    >
      {app.status === "live" && (
        <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400" />
      )}
      {statusLabel[app.status]}
    </span>
  );

  if (isFeature) {
    return (
      <Link
        href={`/apps/${app.slug}`}
        className="group block rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-4 focus-visible:ring-offset-surface-base"
        aria-label={`${app.name} — ${app.tagline}`}
      >
        <div
          className={cn(
            "relative overflow-hidden rounded-3xl bg-surface-raised ring-1 ring-inset ring-white/[0.08] transition-all duration-300",
            "hover:shadow-md hover:ring-white/[0.14]",
            "p-8 sm:p-10",
            className
          )}
        >
          {/* Subtle accent glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute right-0 top-0 -z-0 h-72 w-72 translate-x-1/3 -translate-y-1/3 rounded-full opacity-[0.20] blur-3xl"
            style={{ background: app.accent ?? "#4f7bff" }}
          />

          <div className="relative z-10 grid gap-8 md:grid-cols-[auto_1fr] md:items-center md:gap-12">
            {/* Icon */}
            <AppIcon app={app} size={88} />

            {/* Content */}
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                {badge}
                <span className="text-xs text-lo">{app.category}</span>
              </div>
              <h3 className="mt-3 text-balance text-3xl font-semibold tracking-[-0.03em] text-hi sm:text-4xl">
                {app.name}
              </h3>
              <p className="mt-1.5 text-lg text-mid">{app.tagline}</p>
              <p className="mt-4 max-w-xl text-pretty text-[15px] leading-relaxed text-mid">
                {app.summary}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-medium tracking-[-0.01em] text-surface-base shadow-button transition-all duration-200 group-hover:bg-white/90 select-none">
                  Learn more
                </span>
                {app.platforms.length > 0 && (
                  <span className="text-sm text-lo">
                    {app.platforms
                      .map((p) =>
                        p === "ios" ? "iOS" : p === "android" ? "Android" : p === "macos" ? "macOS" : "Web"
                      )
                      .join(" · ")}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  const cardInner = (
    <div
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl bg-surface-raised ring-1 ring-inset ring-white/[0.08] transition-all duration-200",
        !disabled && "hover:-translate-y-1 hover:shadow-md hover:ring-white/[0.14] hover:bg-surface-overlay",
        "p-6",
        className
      )}
    >
      {/* Accent top stripe */}
      {!disabled && (
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-px opacity-70"
          style={{
            background: `linear-gradient(90deg, transparent, ${app.accent ?? "#4f7bff"}99, transparent)`,
          }}
        />
      )}

      <div className="flex items-start justify-between gap-4">
        <AppIcon app={app} size={52} />
        {badge}
      </div>

      <div className="mt-5 flex-1">
        <h3 className="text-[17px] font-semibold tracking-[-0.025em] text-hi">
          {app.name}
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-mid">{app.tagline}</p>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-white/[0.06] pt-4 text-[13px]">
        <span className="text-lo">{app.category}</span>
        {!disabled ? (
          <span className="flex items-center gap-1 font-medium text-mid transition-all duration-200 group-hover:text-hi group-hover:translate-x-0.5">
            View
            <svg
              aria-hidden
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="opacity-60"
            >
              <path
                d="M2 6h8M6.5 2.5 10 6l-3.5 3.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        ) : (
          <span className="text-lo">Coming soon</span>
        )}
      </div>
    </div>
  );

  if (disabled) {
    return (
      <div aria-disabled="true" className="h-full opacity-50">
        {cardInner}
      </div>
    );
  }

  return (
    <Link
      href={`/apps/${app.slug}`}
      className="block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-base"
      aria-label={`${app.name} — ${app.tagline}`}
    >
      {cardInner}
    </Link>
  );
}
