import { site, siteSameAs } from "@/data/site";
import type { App, AppFaq, AppPlatform } from "@/data/types";
import { absoluteUrl } from "./seo";

/* ─── Shared ──────────────────────────────────────────────────── */

const OS_LABEL: Record<AppPlatform, string> = {
  ios:     "iOS",
  android: "Android",
  web:     "Web",
  macos:   "macOS",
};

/** Organization node reused as `publisher` in other schemas. */
function organizationNode() {
  return {
    "@type": "Organization",
    "@id": `${absoluteUrl("/")}#organization`,
    name: site.name,
    legalName: site.legalName,
    url: absoluteUrl("/"),
    logo: absoluteUrl(site.logo),
    email: site.email,
  };
}

/* ─── Studio-level schemas ────────────────────────────────────── */

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${absoluteUrl("/")}#organization`,
    name: site.name,
    legalName: site.legalName,
    url: absoluteUrl("/"),
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl(site.logo),
    },
    foundingDate: String(site.foundedYear),
    email: site.email,
    description: site.longDescription,
    sameAs: siteSameAs,
  } as const;
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${absoluteUrl("/")}#website`,
    name: site.name,
    url: absoluteUrl("/"),
    description: site.description,
    publisher: organizationNode(),
    inLanguage: "en-US",
  } as const;
}

/* ─── App schemas ─────────────────────────────────────────────── */

export function softwareApplicationSchema(app: App) {
  const url = absoluteUrl(`/apps/${app.slug}`);
  const image = app.iconImage ? absoluteUrl(app.iconImage) : absoluteUrl(site.logo);

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${url}#software`,
    name: app.name,
    alternateName: app.tagline,
    description: app.description,
    applicationCategory: mapApplicationCategory(app.category),
    applicationSubCategory: app.category,
    operatingSystem: app.platforms.map((p) => OS_LABEL[p]).join(", "),
    url,
    image,
    screenshot: app.screenshots.map((s) => absoluteUrl(s.src)),
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url,
    },
    publisher: organizationNode(),
  } as const;
}

export function faqSchema(faq: AppFaq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  } as const;
}

export type Crumb = { name: string; path: string };

export function breadcrumbSchema(items: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  } as const;
}

/* ─── Helpers ─────────────────────────────────────────────────── */

/**
 * Map a friendly app category to Google's supported SoftwareApplication
 * `applicationCategory` values. Falls back to "UtilitiesApplication".
 */
function mapApplicationCategory(category: string): string {
  const c = category.toLowerCase();
  if (c.includes("game"))          return "GameApplication";
  if (c.includes("social"))        return "SocialNetworkingApplication";
  if (c.includes("communication")) return "CommunicationApplication";
  if (c.includes("lifestyle"))     return "LifestyleApplication";
  if (c.includes("productivity"))  return "BusinessApplication";
  if (c.includes("health"))        return "HealthApplication";
  if (c.includes("education"))     return "EducationalApplication";
  if (c.includes("finance"))       return "FinanceApplication";
  return "UtilitiesApplication";
}
