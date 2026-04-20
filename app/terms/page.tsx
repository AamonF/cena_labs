import type { Metadata } from "next";
import { LegalSectionArticle } from "@/components/LegalSectionArticle";
import { UnfumbledLegalShell } from "@/components/UnfumbledLegalShell";
import {
  UNFUMBLED_LEGAL_LAST_UPDATED,
  unfumbledTerms,
} from "@/data/legal/unfumbled-global";
import { site } from "@/data/site";

const path = "/terms";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for Unfumbled and Cena Labs — accounts, subscriptions, AI disclaimers, and acceptable use.",
  alternates: { canonical: `${site.url}${path}` },
  openGraph: {
    title: "Terms of Service — Cena Labs",
    description:
      "Terms of Service for Unfumbled and related services operated by Cena Labs.",
    url: `${site.url}${path}`,
  },
};

export default function TermsPage() {
  return (
    <UnfumbledLegalShell
      title="Terms of Service"
      description="The agreement that governs your use of Unfumbled and related Cena Labs services."
      lastUpdated={UNFUMBLED_LEGAL_LAST_UPDATED}
      currentPath={path}
    >
      <LegalSectionArticle sections={unfumbledTerms.sections} />
    </UnfumbledLegalShell>
  );
}
