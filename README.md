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
     platforms: ["ios"], // e.g. ["ios", "android"] if you ship on both
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
2. **`data/apps/unfumbled.ts`** — update the copy, accent color, App Store URL, and legal text to match your actual policies.
3. **Legal review** — the Privacy and Terms content included is a reasonable starting template, but please have it reviewed by legal counsel before shipping.
4. **`metadataBase`** — set via `site.url` in `data/site.ts`. Make sure this is your real production URL so Open Graph images and canonicals resolve correctly.
5. **Screenshots** — real screenshots go in `public/` and are referenced via the `src` field on each app's `screenshots` array. The current template renders placeholders when `src` is empty.
6. **Favicon / OG image** — drop `favicon.ico`, `icon.png`, and `opengraph-image.png` into `app/` (Next.js 14 picks these up automatically).
7. **Analytics** — none included by design. Add your preferred analytics in `app/layout.tsx` if you need it.

## Design direction

Minimal, premium, Apple/Stripe/Linear-inspired. Generous spacing, tight typography, muted ink palette, small amount of color reserved for per-app accents.

## Auth (Supabase)

The site supports a Supabase email-confirmation signup flow. After a user signs up, Supabase emails them a link, they click it, they land on `/auth/confirmed`, the session is established in their browser, and they are forwarded to `/onboarding` automatically.

### 1. Required environment variables

Copy `.env.example` to `.env.local` and fill in:

```
NEXT_PUBLIC_SUPABASE_URL="https://YOUR-PROJECT-REF.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="YOUR-ANON-KEY"
NEXT_PUBLIC_SITE_URL="https://www.cenalabs.com"
```

In production set the same vars in Vercel (Project → Settings → Environment Variables).

### 2. Supabase Dashboard configuration

In your Supabase project (Auth → URL Configuration):

- **Site URL**: `https://www.cenalabs.com`
- **Redirect URLs** — allow all of:
  - `https://www.cenalabs.com/auth/confirmed`
  - `https://*-cenalabs.vercel.app/auth/confirmed` (preview deploys)
  - `http://localhost:3000/auth/confirmed` (local dev)

### 3. Wiring a signup form

Use the reusable helper anywhere a "Create account" form lives:

```ts
import { signUpWithEmail } from "@/lib/auth/signUp";

const result = await signUpWithEmail({ email, password });

if (!result.ok) {
  // surface result.error.message
} else if (result.needsEmailConfirmation) {
  // show "Check your inbox" screen
} else {
  // session is already live → router.push("/onboarding")
}
```

The helper always sets `emailRedirectTo` to `${NEXT_PUBLIC_SITE_URL}/auth/confirmed`, so the email link works correctly across local, preview, and production deployments.

### 4. Reading auth state in components

Anywhere inside a client component below the root `<AuthProvider>` (already wired in `app/layout.tsx`):

```tsx
"use client";
import { useAuth } from "@/lib/auth/AuthProvider";

export function Example() {
  const { status, user, signOut } = useAuth();

  if (status === "initializing") return <Skeleton />;
  if (status === "unauthenticated") return <SignInPrompt />;
  return <p>Hi {user?.email}</p>;
}
```

### 5. Reading auth state on the server

In server components / route handlers:

```ts
import { getSupabaseServerClient } from "@/lib/supabase/server";

const supabase = getSupabaseServerClient();
const { data: { user } } = await supabase.auth.getUser();
```

### 6. File map

```
lib/
  supabase/
    env.ts              # validated public env access
    client.ts           # singleton browser client (PKCE)
    server.ts           # App Router server client (cookie-bound)
  auth/
    AuthProvider.tsx    # global session state + listener
    signUp.ts           # signUpWithEmail helper (sets emailRedirectTo)
    devLog.ts           # dev-only logger (silent in production)

app/
  auth/confirmed/
    page.tsx            # SEO + metadata wrapper
    ConfirmedPage.tsx   # PKCE exchange via the browser client,
                        # renders verifying / success / error states,
                        # auto-redirects to /onboarding after 2s
```
