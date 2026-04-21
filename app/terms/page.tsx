import type { Metadata } from "next";
import { LegalSectionArticle } from "@/components/LegalSectionArticle";
import { UnfumbledLegalShell } from "@/components/UnfumbledLegalShell";
import {
  UNFUMBLED_LEGAL_LAST_UPDATED,
  unfumbledTerms,
} from "@/data/legal/unfumbled-global";
import { buildMetadata } from "@/lib/seo";

const path = "/terms";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service",
  description:
    "Terms of Service for Unfumbled and Cena Labs — accounts, subscriptions, AI disclaimers, acceptable use, and how the agreement works.",
  path,
});

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
