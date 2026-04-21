import type { Metadata } from "next";
import Link from "next/link";
import { AppCard } from "@/components/AppCard";
import { JsonLd } from "@/components/JsonLd";
import { getAllApps } from "@/data/apps";
import { site } from "@/data/site";
import { buildMetadata, absoluteUrl } from "@/lib/seo";
import { breadcrumbSchema, softwareApplicationSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "All Apps by Cena Labs — AI, Productivity & Lifestyle",
  description:
    "Browse every app from Cena Labs — focused AI, productivity, and lifestyle tools for iOS, including Unfumbled, our AI texting assistant.",
  path: "/apps",
  keywords: [
    "Cena Labs apps",
    "AI apps",
    "productivity apps",
    "iOS apps",
    "Unfumbled",
    "AI texting assistant",
  ],
  absoluteTitle: true,
});

export default function AppsIndexPage() {
  const apps = getAllApps();

  const schemas = [
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Apps", path: "/apps" },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${absoluteUrl("/apps")}#collection`,
      name: `Apps by ${site.name}`,
      description: `The full portfolio of apps made by ${site.name}.`,
      url: absoluteUrl("/apps"),
      hasPart: apps.map((app) => softwareApplicationSchema(app)),
    } as const,
  ];

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
              Every app from {site.name}.
            </h1>
            <p className="mt-5 text-pretty text-[17px] leading-relaxed text-mid">
              {apps.length === 1
                ? "One live app right now"
                : `${apps.length} live apps right now`}{" "}
              — focused AI and productivity tools for iOS and the web. More in
              the making.
            </p>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="container-page py-16 sm:py-20">
        <h2 className="sr-only">Apps</h2>
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

        <p className="mt-12 max-w-2xl text-[14px] leading-relaxed text-mid">
          Looking for something specific? Read more about{" "}
          <Link href="/about" className="text-hi underline underline-offset-4 decoration-white/20 hover:decoration-white/50">
            how we build software
          </Link>{" "}
          or{" "}
          <Link href="/support" className="text-hi underline underline-offset-4 decoration-white/20 hover:decoration-white/50">
            get in touch
          </Link>
          .
        </p>
      </section>

      <JsonLd data={schemas} />
    </>
  );
}
