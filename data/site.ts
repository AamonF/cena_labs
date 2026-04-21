/**
 * Single source of truth for studio-level metadata.
 *
 * Anything that shows up in SEO (titles, descriptions, canonical URLs,
 * Open Graph, Twitter cards, JSON-LD) is sourced from this file so the
 * whole site stays in sync.
 */
export const site = {
  name: "Cena Labs",
  legalName: "Cena Labs",
  tagline: "An app studio building quietly useful AI and productivity software.",

  /** Short, benefit-led description used for home meta + OG. */
  description:
    "Cena Labs is an independent app studio building focused AI and productivity apps — including Unfumbled, an AI texting and dating assistant — for iOS and the web.",

  /** Long-form description for JSON-LD / about contexts. */
  longDescription:
    "Cena Labs is an independent app studio that designs and ships focused, fast, and privacy-respecting software. The studio builds AI-powered productivity and communication tools — starting with Unfumbled, an AI texting assistant that helps people have better conversations — for iOS and the web.",

  url: "https://cenalabs.com",
  email: "info@cenalabs.com",
  supportEmail: "support@cenalabs.com",
  twitter: "@cenalabs",
  foundedYear: 2025,
  location: "United States (Remote)",

  /** Default OG image used when a page doesn't specify its own. */
  defaultOgImage: "/images/cena-logo.png",

  /** Brand/site logo shown in JSON-LD. */
  logo: "/images/cena-logo.png",

  /** Primary SEO keywords used across the studio. Keep natural, no stuffing. */
  keywords: [
    "app studio",
    "indie app studio",
    "AI apps",
    "productivity apps",
    "iOS apps",
    "Cena Labs",
    "Unfumbled",
    "AI texting assistant",
  ],

  /** Public social / profile URLs used by Organization schema (sameAs). */
  social: {
    twitter: "https://twitter.com/cenalabs",
  } as Record<string, string>,
} as const;

export type Site = typeof site;

/** Convenience list of sameAs URLs for Organization schema. */
export const siteSameAs = Object.values(site.social).filter(Boolean);
