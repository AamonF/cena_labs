import type { MetadataRoute } from "next";
import { getAllApps } from "@/data/apps";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = site.url.replace(/\/$/, "");

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/apps`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/support`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.35 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.35 },
    { url: `${base}/disclaimer`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.35 },
    { url: `${base}/cookies`, lastModified: now, changeFrequency: "yearly", priority: 0.25 },
    { url: `${base}/acceptable-use`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const appRoutes: MetadataRoute.Sitemap = getAllApps().flatMap((app) => [
    {
      url: `${base}/apps/${app.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/apps/${app.slug}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${base}/apps/${app.slug}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ]);

  return [...staticRoutes, ...appRoutes];
}
