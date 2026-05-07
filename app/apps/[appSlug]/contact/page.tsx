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
    .filter((a) => a.contactPolicy)
    .map((a) => ({ appSlug: a.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<Params> },
): Promise<Metadata> {
  const { appSlug } = await params;
  const app = getAppBySlug(appSlug);
  if (!app?.contactPolicy) return {};
  const path = `/apps/${app.slug}/contact`;
  return buildAppLegalDocumentMetadata(app, {
    path,
    title: `${app.name} Contact Information`,
    description: `How to reach Cena Labs for ${app.name} — general inquiries, support, security reports, and legal notices.`,
  });
}

export default async function AppContactPolicyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { appSlug } = await params;
  const app = getAppBySlug(appSlug);
  if (!app?.contactPolicy) notFound();

  const path = `/apps/${app.slug}/contact`;

  return (
    <>
      <AppLegalDocPage
        app={app}
        title="Contact"
        description="How to reach us for general inquiries, support, abuse reports, and legal notices."
        document={app.contactPolicy}
        currentPath={path}
        nav={appLegalNavEntries(app)}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home",    path: "/" },
          { name: "Apps",    path: "/apps" },
          { name: app.name,  path: `/apps/${app.slug}` },
          { name: "Contact", path },
        ])}
      />
    </>
  );
}
