import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AppPage } from "@/components/AppPage";
import { JsonLd } from "@/components/JsonLd";
import { getAllApps, getAppBySlug } from "@/data/apps";
import { buildAppMetadata } from "@/lib/seo";
import {
  breadcrumbSchema,
  faqSchema,
  softwareApplicationSchema,
} from "@/lib/schema";

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
  return buildAppMetadata(app);
}

export default async function AppDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { appSlug } = await params;
  const app = getAppBySlug(appSlug);
  if (!app) notFound();

  const schemas: object[] = [
    softwareApplicationSchema(app),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Apps", path: "/apps" },
      { name: app.name, path: `/apps/${app.slug}` },
    ]),
  ];
  if (app.faq && app.faq.length > 0) {
    schemas.push(faqSchema(app.faq));
  }

  return (
    <>
      <AppPage app={app} />
      <JsonLd data={schemas} />
    </>
  );
}
