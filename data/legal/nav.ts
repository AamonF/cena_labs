import type { App } from "../types";
import { promptlyLegalRoutes } from "./cena-labs-pack";

/** Cross-links for an app’s legal hub (used in footers and legal page sidebars). */
export function appLegalNavEntries(app: App): { href: string; label: string }[] {
  if (app.slug === "promptly") {
    return [...promptlyLegalRoutes];
  }

  const entries: { href: string; label: string }[] = [
    { href: `/apps/${app.slug}/terms`, label: "Terms of Service" },
    { href: `/apps/${app.slug}/privacy`, label: "Privacy Policy" },
  ];

  if (app.cookies) {
    entries.push({ href: `/apps/${app.slug}/cookies`, label: "Cookie Policy" });
  }
  if (app.aiDisclaimer) {
    entries.push({
      href: `/apps/${app.slug}/ai-disclaimer`,
      label: "AI Disclaimer",
    });
  }
  if (app.acceptableUse) {
    entries.push({
      href: `/apps/${app.slug}/acceptable-use`,
      label: "Acceptable Use Policy",
    });
  }
  if (app.contactPolicy) {
    entries.push({ href: `/apps/${app.slug}/contact`, label: "Contact" });
  }

  return entries;
}
