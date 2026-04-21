/**
 * createApp — the fast path for adding a new app to the studio.
 *
 * Pass only the fields you have right now. Everything else
 * (legal documents, empty content arrays, sensible defaults) is
 * filled in automatically.
 *
 * When the app is ready to launch, override any field by adding it
 * to the config object. The fully-featured unfumbled.ts is the
 * reference for what a complete entry looks like.
 *
 * Usage
 * ─────
 *   import { createApp } from "./defaults";
 *
 *   export const myApp = createApp({
 *     slug:      "my-app",
 *     name:      "My App",
 *     tagline:   "One-line tagline.",
 *     summary:   "Short description for cards and metadata.",
 *     status:    "coming-soon",
 *     platforms: ["ios", "android"],
 *     accent:    "#FF6A3D",
 *     category:  "Productivity",
 *   });
 */

import { site } from "../site";
import type { App, LegalDocument } from "../types";

/* ─── Public types ────────────────────────────────────────────── */

/** Minimum fields needed to register a new app. Everything else is optional. */
export type AppConfig = Pick<App,
  | "slug"
  | "name"
  | "tagline"
  | "summary"
  | "status"
  | "platforms"
> & Partial<Omit<App, "slug" | "name" | "tagline" | "summary" | "status" | "platforms">>;

/* ─── Main helper ─────────────────────────────────────────────── */

/**
 * createApp
 *
 * Returns a complete, type-safe `App` object with all required fields
 * populated. Sensible defaults are used for anything not provided.
 *
 * Legal documents (privacy policy and terms of service) are generated
 * automatically from the studio template with the app name and contact
 * details substituted. Replace them in the config object when you need
 * app-specific legal language.
 */
export function createApp(config: AppConfig): App {
  const today  = formatDate(new Date());
  const email  = site.supportEmail;
  const studio = site.name;

  const defaults: Omit<App, keyof AppConfig> = {
    description:  config.summary,
    accent:       "#0e0e12",
    iconInitials: config.name.slice(0, 2),
    category:     "App",
    whatItDoes:   config.summary,
    highlights:   [],
    features:     [],
    screenshots:  [],
    audience:     [],
    faq:          [],
    links:        [],
    privacy:      defaultPrivacy(config.name, email, today),
    terms:        defaultTerms(config.name, studio, email, today),
  };

  return {
    ...defaults,
    ...config,
    // Always override with generated docs unless the caller explicitly provides them.
    privacy: config.privacy ?? defaultPrivacy(config.name, email, today),
    terms:   config.terms   ?? defaultTerms(config.name, studio, email, today),
  } as App;
}

/* ─── Date formatter ──────────────────────────────────────────── */

const MONTHS = [
  "January", "February", "March",    "April",
  "May",     "June",     "July",     "August",
  "September","October", "November", "December",
];

function formatDate(d: Date): string {
  return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

/* ─── Default privacy policy ──────────────────────────────────── */

/**
 * Generates a standard privacy policy suitable for App Store
 * submission. Replace sections in your app's config object if you need
 * app-specific language. Have this reviewed by legal counsel before launch.
 */
function defaultPrivacy(
  appName: string,
  supportEmail: string,
  lastUpdated: string
): LegalDocument {
  return {
    lastUpdated,
    sections: [
      {
        heading: "Introduction",
        body: `This Privacy Policy describes how ${appName} ("we", "us", or "our") collects, uses, and protects information when you use the ${appName} mobile application (the "App"). By using the App, you agree to the practices described in this policy.`,
      },
      {
        heading: "Information we collect",
        body: `${appName} is designed to minimize data collection. Core functionality runs on your device. We may collect anonymous, aggregated usage metrics (such as crash reports and feature-level interaction counts) to improve the App. If you contact support, we will receive the information you choose to share with us.`,
      },
      {
        heading: "How we use information",
        body: "We use the limited information we collect to operate, maintain, and improve the App, to diagnose technical issues, and to respond to support requests. We do not sell your personal information.",
      },
      {
        heading: "Data storage",
        body: "Your data and preferences are stored locally on your device by default. If you enable optional sync, that data is encrypted in transit and stored in our cloud provider on your behalf.",
      },
      {
        heading: "Third-party services",
        body: "We use a small number of vetted third-party services for crash reporting and analytics. These providers process data on our behalf under data-processing agreements and are not permitted to use your information for their own purposes.",
      },
      {
        heading: "Your rights",
        body: `You can request deletion of any data we hold about you by contacting ${supportEmail}. Where applicable, you may also have rights under laws such as the GDPR and CCPA, including the right to access, correct, or export your information.`,
      },
      {
        heading: "Children's privacy",
        body: `${appName} is not directed to children under 13, and we do not knowingly collect personal information from children.`,
      },
      {
        heading: "Changes to this policy",
        body: `We may update this Privacy Policy from time to time. If we make material changes, we will update the "Last updated" date and, where appropriate, notify you within the App.`,
      },
      {
        heading: "Contact",
        body: `Questions about this policy? Email ${supportEmail}.`,
      },
    ],
  };
}

/* ─── Default terms of service ────────────────────────────────── */

/**
 * Generates standard terms of service suitable for App Store
 * submission. Replace sections in your app's config object for app-specific
 * terms. Have this reviewed by legal counsel before launch.
 */
function defaultTerms(
  appName: string,
  studioName: string,
  supportEmail: string,
  lastUpdated: string
): LegalDocument {
  return {
    lastUpdated,
    sections: [
      {
        heading: "Agreement",
        body: `These Terms of Service govern your use of ${appName}. By downloading, installing, or using the App, you agree to be bound by these terms. If you do not agree, please do not use the App.`,
      },
      {
        heading: "License",
        body: `We grant you a personal, non-exclusive, non-transferable, revocable license to use the App for personal, non-commercial purposes, subject to these terms and any applicable platform terms (e.g., the Apple App Store).`,
      },
      {
        heading: "Acceptable use",
        body: "You agree not to reverse engineer, decompile, or tamper with the App, not to use it to violate any law, and not to interfere with other users' use of the App.",
      },
      {
        heading: "Your content",
        body: `You retain ownership of any content you create in ${appName}. You grant us the limited rights necessary to operate the App and provide optional sync on your behalf.`,
      },
      {
        heading: "Disclaimer",
        body: `The App is provided "as is" without warranties of any kind, express or implied. We do not warrant that the App will be uninterrupted, error-free, or fit for a particular purpose.`,
      },
      {
        heading: "Limitation of liability",
        body: `To the maximum extent permitted by law, ${studioName} will not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of the App.`,
      },
      {
        heading: "Termination",
        body: "We may suspend or terminate your access to the App if you violate these terms. You may stop using the App at any time.",
      },
      {
        heading: "Changes to the terms",
        body: "We may update these terms from time to time. Continued use of the App after changes take effect constitutes acceptance of the revised terms.",
      },
      {
        heading: "Governing law",
        body: "These terms are governed by the laws of your country of residence, except to the extent that local consumer protection laws apply.",
      },
      {
        heading: "Contact",
        body: `Questions about these terms? Email ${supportEmail}.`,
      },
    ],
  };
}
