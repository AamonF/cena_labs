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
    .filter((a) => a.cookies)
    .map((a) => ({ appSlug: a.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<Params> },
): Promise<Metadata> {
  const { appSlug } = await params;
  const app = getAppBySlug(appSlug);
  if (!app?.cookies) return {};
  const path = `/apps/${app.slug}/cookies`;
  return buildAppLegalDocumentMetadata(app, {
    path,
    title: `${app.name} Cookie Policy`,
    description: `How ${app.name} uses cookies and similar technologies across Cena Labs services.`,
  });
}

export default async function AppCookiesPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { appSlug } = await params;
  const app = getAppBySlug(appSlug);
  if (!app?.cookies) notFound();

  const path = `/apps/${app.slug}/cookies`;

  return (
    <>
      <AppLegalDocPage
        app={app}
        title="Cookie Policy"
        description="Cookies, analytics, and similar technologies used with this product."
        document={app.cookies}
        currentPath={path}
        nav={appLegalNavEntries(app)}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home",          path: "/" },
          { name: "Apps",          path: "/apps" },
          { name: app.name,       path: `/apps/${app.slug}` },
          { name: "Cookie Policy", path },
        ])}
      />
    </>
  );
}
