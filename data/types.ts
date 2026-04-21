export type AppStatus   = "live" | "beta" | "coming-soon";
export type AppPlatform = "ios" | "android" | "web" | "macos";

export type AppFeature = {
  title: string;
  description: string;
  icon?: string;
};

export type AppScreenshot = {
  src: string;
  alt: string;
  caption?: string;
  subcaption?: string;
};

export type AppLink = {
  label: string;
  href: string;
  kind?: "primary" | "secondary" | "store";
  /** Short descriptor shown below the button, e.g. "Free on iOS" */
  note?: string;
};

/** A trust/highlight badge shown in the hero, e.g. "Free to try" */
export type AppHighlight = {
  label: string;
  icon?: string;
};

/** An audience persona for the "Who it's for" section */
export type AppAudience = {
  title: string;
  description: string;
};

/** A FAQ entry */
export type AppFaq = {
  q: string;
  a: string;
};

/** A step in the "How it works" section. */
export type AppHowItWorksStep = {
  title: string;
  description: string;
};

/** A general content article entry used for editorial SEO sections
 *  (e.g. "Common texting mistakes", "How to improve conversations"). */
export type AppArticleEntry = {
  heading: string;
  body: string;
};

/** Optional SEO-specific copy for an app. Falls back to `summary` / name-based
 *  values when not provided, so it stays optional for future apps. */
export type AppSeo = {
  /** <title> content. Should be ~50–60 characters. */
  title?: string;
  /** Meta description. ~150–160 characters ideal. */
  description?: string;
  /** Primary keywords for this app — natural phrasing only. */
  keywords?: string[];
  /** Optional custom OG image path (served from /public). */
  ogImage?: string;
};

export type LegalSection = {
  heading: string;
  /** Plain paragraphs; separate with blank lines for multiple paragraphs */
  body?: string;
  bullets?: string[];
  /** Optional paragraph(s) after the first bullet list */
  closing?: string;
  /** Optional second labeled list inside the same section */
  secondaryIntro?: string;
  secondaryBullets?: string[];
};

export type LegalDocument = {
  lastUpdated: string;
  sections: LegalSection[];
};

export type App = {
  slug: string;
  name: string;

  /** One-line tagline used on cards */
  tagline: string;

  /** Hero headline — stronger, more direct than the tagline (optional: falls back to tagline) */
  headline?: string;

  /** Hero subheadline — 1–2 sentences expanding on the headline */
  subheadline?: string;

  /** 1–2 sentence summary for cards and meta descriptions */
  summary: string;

  /** Longer description used in structured data / SEO */
  description: string;

  status:    AppStatus;
  platforms: AppPlatform[];
  featured?: boolean;
  accent?:        string;
  iconInitials?:  string;
  /** Path to an image used in place of the generated initials icon (e.g. "/images/app-logo.png") */
  iconImage?:     string;
  category:       string;

  /** "What it does" body paragraph */
  whatItDoes: string;

  /** Trust/highlight badges displayed below the hero CTA */
  highlights?: AppHighlight[];

  features:    AppFeature[];
  screenshots: AppScreenshot[];
  links?:      AppLink[];

  /** "Who it's for" personas */
  audience?: AppAudience[];

  /** CTA section */
  ctaTitle?: string;
  ctaBody?:  string;

  /** FAQ items */
  faq?: AppFaq[];

  /** Optional "How it works" steps — rendered as an ordered, SEO-friendly list. */
  howItWorks?: AppHowItWorksStep[];

  /** Editorial section: common mistakes this app helps users avoid. */
  mistakes?: AppArticleEntry[];

  /** Editorial section: tips / how to get better outcomes. */
  tips?: AppArticleEntry[];

  /** Optional SEO-specific overrides. */
  seo?: AppSeo;

  /**
   * Optional canonical URL overrides for an app's legal sub-pages. Use this
   * when the studio publishes the same legal document at a top-level URL
   * (e.g. /privacy) that is the actual, stable link used in app stores and
   * the site footer. Prevents duplicate-content SEO dilution.
   *
   * Values are absolute site paths, e.g. "/privacy".
   */
  legalCanonicalPaths?: {
    privacy?: string;
    terms?:   string;
  };

  privacy: LegalDocument;
  terms:   LegalDocument;
};
