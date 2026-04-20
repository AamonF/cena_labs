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

  privacy: LegalDocument;
  terms:   LegalDocument;
};
