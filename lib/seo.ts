import type { Metadata } from "next";
import { site } from "@/data/site";
import type { App } from "@/data/types";

/* ─── URL helpers ─────────────────────────────────────────────── */

/** Returns the site base URL with no trailing slash. */
export function siteBaseUrl(): string {
  return site.url.replace(/\/$/, "");
}

/** Joins a relative path to the site base URL, producing an absolute URL. */
export function absoluteUrl(path: string = "/"): string {
  const base = siteBaseUrl();
  if (!path || path === "/") return `${base}/`;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

/* ─── Metadata builder ────────────────────────────────────────── */

export type BuildMetadataOpts = {
  /** Page <title>. Gets fed through the layout's template. */
  title: string;
  /** Meta description (~150–160 chars). */
  description: string;
  /** Absolute path starting with "/" — used for canonical + OG URL. */
  path: string;
  /** Optional keyword list — kept natural, never stuffed. */
  keywords?: readonly string[] | string[];
  /** Optional OG/Twitter image (absolute or /public-relative). */
  image?: string;
  /** og:type. Default "website". */
  type?: "website" | "article";
  /** Prevent indexing (e.g. staging). */
  noIndex?: boolean;
  /** If true, title is used verbatim instead of running through the
   *  layout's `%s — Cena Labs` template. */
  absoluteTitle?: boolean;
};

/** Build a complete, production-ready `Metadata` object for a page. */
export function buildMetadata(opts: BuildMetadataOpts): Metadata {
  const {
    title,
    description,
    path,
    keywords,
    image,
    type = "website",
    noIndex,
    absoluteTitle,
  } = opts;

  const url = absoluteUrl(path);
  const imagePath = image ?? site.defaultOgImage;
  const ogImage = imagePath.startsWith("http")
    ? imagePath
    : absoluteUrl(imagePath);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords: keywords ? Array.from(keywords) : undefined,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      siteName: site.name,
      title,
      description,
      images: [{ url: ogImage, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      creator: site.twitter,
      site: site.twitter,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}

/* ─── App-specific helpers ────────────────────────────────────── */

/** Resolve the best SEO title for an app (respects per-app overrides). */
export function appSeoTitle(app: App): string {
  if (app.seo?.title) return app.seo.title;
  return `${app.name} — ${app.tagline}`;
}

/** Resolve the best meta description for an app. */
export function appSeoDescription(app: App): string {
  return app.seo?.description ?? app.summary;
}

/** Canonical path for an app page. */
export function appPath(app: App): string {
  return `/apps/${app.slug}`;
}

/** Build metadata for the main app page. */
export function buildAppMetadata(app: App): Metadata {
  return buildMetadata({
    title: appSeoTitle(app),
    description: appSeoDescription(app),
    path: appPath(app),
    keywords: app.seo?.keywords,
    image: app.seo?.ogImage ?? app.iconImage,
    absoluteTitle: true,
  });
}

/** Build metadata for an app's privacy/terms sub-page.
 *
 * Respects `app.legalCanonicalPaths` so that an app can point its nested
 * legal page canonical at a primary top-level URL (e.g. `/privacy`) to
 * avoid duplicate-content issues when the same document is published at
 * both locations.
 */
export function buildAppLegalMetadata(
  app: App,
  kind: "privacy" | "terms",
): Metadata {
  const label = kind === "privacy" ? "Privacy Policy" : "Terms of Service";
  const title = `${app.name} ${label}`;
  const description =
    kind === "privacy"
      ? `Read the ${app.name} Privacy Policy — what data is collected, how it is used, and how it is protected.`
      : `Read the ${app.name} Terms of Service — the rules that govern your use of ${app.name}.`;

  const selfPath = `${appPath(app)}/${kind}`;
  const canonicalPath = app.legalCanonicalPaths?.[kind] ?? selfPath;

  const meta = buildMetadata({
    title,
    description,
    path: canonicalPath,
    image: app.iconImage,
    absoluteTitle: true,
  });

  // If the canonical URL lives elsewhere, keep OG URL on the self URL
  // but canonical pointing to the primary doc.
  if (canonicalPath !== selfPath) {
    meta.alternates = { canonical: absoluteUrl(canonicalPath) };
    if (meta.openGraph) {
      meta.openGraph.url = absoluteUrl(selfPath);
    }
  }

  return meta;
}
