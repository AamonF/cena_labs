# Cena Labs Site

A scalable portfolio website for an app studio, built with Next.js 14 (App Router), TypeScript, and Tailwind CSS.

Primary purposes:

1. Portfolio of apps made by the studio.
2. Legal hosting — a Privacy Policy and Terms of Service for every app.

## Stack

- **Next.js 14** (App Router, RSC, statically generated pages)
- **TypeScript** (strict)
- **Tailwind CSS**
- No database, no CMS — all content lives in typed TypeScript modules under `data/`

## Getting started

```bash
npm install
npm run dev
# open http://localhost:3000
```

Build and run in production mode:

```bash
npm run build
npm run start
```

## Project structure

```
app/
  layout.tsx                  # root layout (navbar + footer + metadata)
  page.tsx                    # /
  not-found.tsx               # global 404
  robots.ts                   # /robots.txt
  sitemap.ts                  # /sitemap.xml (auto-includes every app)
  apps/
    page.tsx                  # /apps
    [appSlug]/
      page.tsx                # /apps/:slug
      not-found.tsx           # 404 for unknown app slug
      privacy/page.tsx        # /apps/:slug/privacy
      terms/page.tsx          # /apps/:slug/terms
  about/page.tsx              # /about
  support/page.tsx            # /support

components/
  Navbar.tsx                  # header with primary nav
  Footer.tsx                  # app links + legal links per app
  Container.tsx               # layout wrapper (wide / narrow)
  Section.tsx                 # titled section with eyebrow
  Button.tsx                  # primary / secondary / ghost button (Link)
  AppIcon.tsx                 # generated app icon from initials + accent
  AppCard.tsx                 # reusable card used everywhere apps are listed
  AppPage.tsx                 # template for /apps/:slug
  LegalPage.tsx               # template for privacy + terms

data/
  site.ts                     # studio name, tagline, contact email, etc.
  types.ts                    # App, AppFeature, LegalDocument, …
  apps/
    index.ts                  # the registry — add new apps here
    unfumbled.ts              # the first app

lib/
  cn.ts                       # className helper
```

## Adding a new app

Everything is driven by typed data. To add a new app:

1. **Create a file** at `data/apps/<slug>.ts` that exports a typed `App`.
   The easiest starting point is to copy `data/apps/unfumbled.ts` and edit it.

   ```ts
   // data/apps/my-new-app.ts
   import type { App } from "../types";

   export const myNewApp: App = {
     slug: "my-new-app",
     name: "My New App",
     tagline: "The one-liner.",
     summary: "A 1–2 sentence summary for cards and previews.",
     description: "Longer description (used for SEO / structured data).",
     status: "live", // "live" | "beta" | "coming-soon"
     platforms: ["ios", "android"],
     featured: false,
     accent: "#FF6A3D",
     iconInitials: "My",
     category: "Utility",
     whatItDoes: "A paragraph for the 'What it does' section.",
     features: [
       { title: "…", description: "…" },
       // …
     ],
     screenshots: [
       { src: "", alt: "Home", caption: "Home" },
       // …
     ],
     links: [
       { label: "App Store", href: "https://…", kind: "store" },
       { label: "Google Play", href: "https://…", kind: "store" },
     ],
     ctaTitle: "Try My New App.",
     ctaBody: "A short sentence to close the sale.",
     privacy: {
       lastUpdated: "April 20, 2026",
       sections: [
         { heading: "Introduction", body: "…" },
         // …
       ],
     },
     terms: {
       lastUpdated: "April 20, 2026",
       sections: [
         { heading: "Agreement", body: "…" },
         // …
       ],
     },
   };
   ```

2. **Register it** in `data/apps/index.ts`:

   ```ts
   import { myNewApp } from "./my-new-app";

   export const apps: App[] = [unfumbled, myNewApp];
   ```

That is the only edit required. The new app will automatically:

- Appear on `/apps` and on the homepage grid.
- Get its own page at `/apps/my-new-app`.
- Get Privacy + Terms pages at `/apps/my-new-app/privacy` and `/apps/my-new-app/terms`.
- Be added to the sitemap, the footer's "Apps" column, and the footer's per-app legal links.
- Get proper SEO metadata (title, description, canonical, Open Graph, Twitter card).

No routing changes. No template changes. No component changes.

## What is reusable

Anything that takes an `App` is reusable across every current and future app:

- `AppCard` — used on the homepage and on `/apps`. Has a `feature` variant for a larger hero-style card.
- `AppPage` — the full template for `/apps/:slug`. Handles hero, what-it-does, features, screenshots, CTA, and legal links.
- `LegalPage` — the template for both Privacy and Terms. Takes a `LegalDocument` with a `lastUpdated` string and a list of `{ heading, body }` sections.
- `AppIcon` — generates a consistent app icon from `iconInitials` + `accent`.
- `Navbar` + `Footer` + `Section` + `Container` + `Button` — shared layout primitives used everywhere.

## Customize before launch

1. **`data/site.ts`** — studio name, tagline, description, URL, contact emails, founded year, location. The whole site reads from this file.
2. **`data/apps/unfumbled.ts`** — update the copy, accent color, links (App Store / Play Store URLs), and legal text to match your actual policies.
3. **Legal review** — the Privacy and Terms content included is a reasonable starting template, but please have it reviewed by legal counsel before shipping.
4. **`metadataBase`** — set via `site.url` in `data/site.ts`. Make sure this is your real production URL so Open Graph images and canonicals resolve correctly.
5. **Screenshots** — real screenshots go in `public/` and are referenced via the `src` field on each app's `screenshots` array. The current template renders placeholders when `src` is empty.
6. **Favicon / OG image** — drop `favicon.ico`, `icon.png`, and `opengraph-image.png` into `app/` (Next.js 14 picks these up automatically).
7. **Analytics** — none included by design. Add your preferred analytics in `app/layout.tsx` if you need it.

## Design direction

Minimal, premium, Apple/Stripe/Linear-inspired. Generous spacing, tight typography, muted ink palette, small amount of color reserved for per-app accents.
