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
    .filter((a) => a.aiDisclaimer)
    .map((a) => ({ appSlug: a.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<Params> },
): Promise<Metadata> {
  const { appSlug } = await params;
  const app = getAppBySlug(appSlug);
  if (!app?.aiDisclaimer) return {};
  const path = `/apps/${app.slug}/ai-disclaimer`;
  return buildAppLegalDocumentMetadata(app, {
    path,
    title: `${app.name} AI Disclaimer`,
    description: `Limitations of AI-generated content for ${app.name} — not professional advice; verify outputs before relying on them.`,
  });
}

export default async function AppAiDisclaimerPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { appSlug } = await params;
  const app = getAppBySlug(appSlug);
  if (!app?.aiDisclaimer) notFound();

  const path = `/apps/${app.slug}/ai-disclaimer`;

  return (
    <>
      <AppLegalDocPage
        app={app}
        title="AI Disclaimer"
        description="Please read this carefully before relying on any AI-generated output."
        document={app.aiDisclaimer}
        currentPath={path}
        nav={appLegalNavEntries(app)}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home",          path: "/" },
          { name: "Apps",          path: "/apps" },
          { name: app.name,        path: `/apps/${app.slug}` },
          { name: "AI Disclaimer", path },
        ])}
      />
    </>
  );
}
