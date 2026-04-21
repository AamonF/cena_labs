import type { MetadataRoute } from "next";
import { getAllApps } from "@/data/apps";
import { site } from "@/data/site";

/**
 * Generates /sitemap.xml.
 *
 * Only canonical URLs are listed. If an app points its nested legal
 * pages (e.g. /apps/unfumbled/privacy) at a top-level canonical URL
 * (e.g. /privacy), we skip the nested pages to avoid sending Google
 * mixed signals.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = site.url.replace(/\/$/, "");

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`,               lastModified: now, changeFrequency: "weekly",  priority: 1    },
    { url: `${base}/apps`,           lastModified: now, changeFrequency: "weekly",  priority: 0.9  },
    { url: `${base}/about`,          lastModified: now, changeFrequency: "monthly", priority: 0.6  },
    { url: `${base}/support`,        lastModified: now, changeFrequency: "monthly", priority: 0.6  },
    { url: `${base}/contact`,        lastModified: now, changeFrequency: "yearly",  priority: 0.4  },
    { url: `${base}/privacy`,        lastModified: now, changeFrequency: "yearly",  priority: 0.35 },
    { url: `${base}/terms`,          lastModified: now, changeFrequency: "yearly",  priority: 0.35 },
    { url: `${base}/disclaimer`,     lastModified: now, changeFrequency: "yearly",  priority: 0.3  },
    { url: `${base}/cookies`,        lastModified: now, changeFrequency: "yearly",  priority: 0.25 },
    { url: `${base}/acceptable-use`, lastModified: now, changeFrequency: "yearly",  priority: 0.3  },
  ];

  const appRoutes: MetadataRoute.Sitemap = getAllApps().flatMap((app) => {
    const entries: MetadataRoute.Sitemap = [
      {
        url: `${base}/apps/${app.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.85,
      },
    ];

    if (!app.legalCanonicalPaths?.privacy) {
      entries.push({
        url: `${base}/apps/${app.slug}/privacy`,
        lastModified: now,
        changeFrequency: "yearly",
        priority: 0.3,
      });
    }
    if (!app.legalCanonicalPaths?.terms) {
      entries.push({
        url: `${base}/apps/${app.slug}/terms`,
        lastModified: now,
        changeFrequency: "yearly",
        priority: 0.3,
      });
    }

    return entries;
  });

  return [...staticRoutes, ...appRoutes];
}
