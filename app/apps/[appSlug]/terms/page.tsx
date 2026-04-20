import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/LegalPage";
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

  const title = `${app.name} Terms of Service`;
  const description = `The Terms of Service for ${app.name}, an app by ${site.name}.`;
  const url = `${site.url}/apps/${app.slug}/terms`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url },
  };
}

export default async function AppTermsPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { appSlug } = await params;
  const app = getAppBySlug(appSlug);
  if (!app) notFound();

  return <LegalPage app={app} kind="terms" document={app.terms} />;
}
