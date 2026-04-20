import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AppPage } from "@/components/AppPage";
import { getAllApps, getAppBySlug } from "@/data/apps";
import { site } from "@/data/site";

type Params = { appSlug: string };

export function generateStaticParams(): Params[] {
  return getAllApps().map((a) => ({ appSlug: a.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { appSlug } = await params;
  const app = getAppBySlug(appSlug);
  if (!app) return {};

  const title = `${app.name} — ${app.tagline}`;
  const description = app.summary;
  const url = `${site.url}/apps/${app.slug}`;

  return {
    title: app.name,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      siteName: site.name,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function AppDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { appSlug } = await params;
  const app = getAppBySlug(appSlug);
  if (!app) notFound();

  return <AppPage app={app} />;
}
