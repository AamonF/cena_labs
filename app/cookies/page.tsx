import type { Metadata } from "next";
import { LegalSectionArticle } from "@/components/LegalSectionArticle";
import { UnfumbledLegalShell } from "@/components/UnfumbledLegalShell";
import {
  UNFUMBLED_LEGAL_LAST_UPDATED,
  unfumbledCookies,
} from "@/data/legal/unfumbled-global";
import { site } from "@/data/site";

const path = "/cookies";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "How Cena Labs uses cookies and similar technologies on websites and related products.",
  alternates: { canonical: `${site.url}${path}` },
  openGraph: {
    title: "Cookie Policy — Cena Labs",
    url: `${site.url}${path}`,
  },
};

export default function CookiesPage() {
  return (
    <UnfumbledLegalShell
      title="Cookie Policy"
      description="Cookies, analytics, and similar technologies across our web properties."
      lastUpdated={UNFUMBLED_LEGAL_LAST_UPDATED}
      currentPath={path}
    >
      <LegalSectionArticle sections={unfumbledCookies.sections} />
    </UnfumbledLegalShell>
  );
}
