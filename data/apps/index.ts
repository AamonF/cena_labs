import type { App } from "../types";
import { unfumbled } from "./unfumbled";

/**
 * The single source of truth for every app in the studio.
 *
 * ── Adding a new app (automated) ──────────────────────────────
 *
 *   npm run new-app -- <slug> ["App Name"]
 *
 *   This generates data/apps/<slug>.ts and patches this file
 *   automatically. Then open the generated file and follow the
 *   TODO comments to fill in copy, features, and links.
 *
 * ── Adding a new app (manually) ───────────────────────────────
 *
 *   1. Create data/apps/<slug>.ts using createApp() from defaults.ts.
 *      See data/apps/unfumbled.ts for a fully-featured example.
 *
 *   2. Import it below and add it to the apps array.
 *
 * ── That's it. ────────────────────────────────────────────────
 *
 *   The new app automatically gets:
 *     • A card on / and /apps
 *     • A full app page at /apps/<slug>
 *     • Privacy Policy at /apps/<slug>/privacy
 *     • Terms of Service at /apps/<slug>/terms
 *     • Footer links and sitemap entries
 *     • SEO metadata (title, description, canonical, OG, Twitter)
 *
 * Order in the array controls display order across the site.
 */
export const apps: App[] = [unfumbled];

export function getAllApps(): App[] {
  return apps;
}

export function getFeaturedApp(): App | undefined {
  return apps.find((a) => a.featured) ?? apps[0];
}

export function getAppBySlug(slug: string): App | undefined {
  return apps.find((a) => a.slug === slug);
}

export function getAppSlugs(): string[] {
  return apps.map((a) => a.slug);
}
