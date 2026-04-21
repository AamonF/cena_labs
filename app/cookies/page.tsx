import type { Metadata } from "next";
import { LegalSectionArticle } from "@/components/LegalSectionArticle";
import { UnfumbledLegalShell } from "@/components/UnfumbledLegalShell";
import {
  UNFUMBLED_LEGAL_LAST_UPDATED,
  unfumbledCookies,
} from "@/data/legal/unfumbled-global";
import { buildMetadata } from "@/lib/seo";

const path = "/cookies";

export const metadata: Metadata = buildMetadata({
  title: "Cookie Policy",
  description:
    "How Cena Labs uses cookies, analytics, and similar technologies across websites and related products.",
  path,
});

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
