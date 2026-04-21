import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/LegalPage";
import { JsonLd } from "@/components/JsonLd";
import { getAllApps, getAppBySlug } from "@/data/apps";
import { buildAppLegalMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";

type Params = { appSlug: string };

export function generateStaticParams(): Params[] {
  return getAllApps().map((a) => ({ appSlug: a.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<Params> },
): Promise<Metadata> {
  const { appSlug } = await params;
  const app = getAppBySlug(appSlug);
  if (!app) return {};
  return buildAppLegalMetadata(app, "privacy");
}

export default async function AppPrivacyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { appSlug } = await params;
  const app = getAppBySlug(appSlug);
  if (!app) notFound();

  return (
    <>
      <LegalPage app={app} kind="privacy" document={app.privacy} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home",          path: "/" },
          { name: "Apps",          path: "/apps" },
          { name: app.name,        path: `/apps/${app.slug}` },
          { name: "Privacy Policy", path: `/apps/${app.slug}/privacy` },
        ])}
      />
    </>
  );
}
