import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AppLegalDocPage } from "@/components/AppLegalDocPage";
import { JsonLd } from "@/components/JsonLd";
import { getAllApps, getAppBySlug } from "@/data/apps";
import { appLegalNavEntries } from "@/data/legal/nav";
import { buildAppLegalDocumentMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";

type Params = { appSlug: string };

export function generateStaticParams(): Params[] {
  return getAllApps()
    .filter((a) => a.acceptableUse)
    .map((a) => ({ appSlug: a.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<Params> },
): Promise<Metadata> {
  const { appSlug } = await params;
  const app = getAppBySlug(appSlug);
  if (!app?.acceptableUse) return {};
  const path = `/apps/${app.slug}/acceptable-use`;
  return buildAppLegalDocumentMetadata(app, {
    path,
    title: `${app.name} Acceptable Use Policy`,
    description: `Acceptable use rules for ${app.name} and related Cena Labs services — prohibited conduct and enforcement.`,
  });
}

export default async function AppAcceptableUsePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { appSlug } = await params;
  const app = getAppBySlug(appSlug);
  if (!app?.acceptableUse) notFound();

  const path = `/apps/${app.slug}/acceptable-use`;

  return (
    <>
      <AppLegalDocPage
        app={app}
        title="Acceptable Use Policy"
        description="Content and conduct standards for this product and related Services."
        document={app.acceptableUse}
        currentPath={path}
        nav={appLegalNavEntries(app)}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home",                   path: "/" },
          { name: "Apps",                   path: "/apps" },
          { name: app.name,                 path: `/apps/${app.slug}` },
          { name: "Acceptable Use Policy", path },
        ])}
      />
    </>
  );
}
