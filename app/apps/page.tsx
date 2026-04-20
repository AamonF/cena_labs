import type { Metadata } from "next";
import { AppCard } from "@/components/AppCard";
import { getAllApps } from "@/data/apps";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Apps",
  description: `The full portfolio of apps made by ${site.name}.`,
  openGraph: {
    title: `Apps — ${site.name}`,
    description: `The full portfolio of apps made by ${site.name}.`,
    url: `${site.url}/apps`,
  },
};

export default function AppsIndexPage() {
  const apps = getAllApps();

  return (
    <>
      {/* Page header */}
      <section className="relative overflow-hidden border-b border-white/[0.07]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(79,123,255,0.10), transparent 70%)",
          }}
        />
        <div className="container-page py-20 sm:py-28">
          <div className="max-w-2xl">
            <p className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-lo">
              <span aria-hidden className="h-px w-5 bg-white/20" />
              Portfolio
            </p>
            <h1 className="text-balance text-4xl font-semibold tracking-[-0.04em] text-hi sm:text-6xl sm:leading-[1.04]">
              Every app from the studio.
            </h1>
            <p className="mt-5 text-pretty text-[17px] leading-relaxed text-mid">
              {apps.length === 1
                ? "One app right now"
                : `${apps.length} apps right now`}{" "}
              — more in the making.
            </p>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="container-page py-16 sm:py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {apps.map((app) => (
            <AppCard key={app.slug} app={app} />
          ))}

          {/* Coming soon placeholder */}
          <div className="flex h-full min-h-[200px] flex-col items-start justify-between rounded-2xl border border-dashed border-white/[0.09] p-6">
            <div className="flex h-[52px] w-[52px] items-center justify-center rounded-[13px] bg-white/[0.05] text-xl font-light text-lo">
              +
            </div>
            <div className="mt-auto pt-6">
              <p className="text-[15px] font-semibold tracking-[-0.02em] text-hi">
                More coming soon
              </p>
              <p className="mt-1 text-[13px] leading-relaxed text-mid">
                New apps ship here when ready.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
