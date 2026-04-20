import type { Metadata } from "next";
import { LegalSectionArticle } from "@/components/LegalSectionArticle";
import { UnfumbledLegalShell } from "@/components/UnfumbledLegalShell";
import {
  UNFUMBLED_LEGAL_LAST_UPDATED,
  unfumbledPrivacy,
} from "@/data/legal/unfumbled-global";
import { site } from "@/data/site";

const path = "/privacy";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Cena Labs collects, uses, and protects information for Unfumbled — local storage, AI processing, and third parties.",
  alternates: { canonical: `${site.url}${path}` },
  openGraph: {
    title: "Privacy Policy — Cena Labs",
    description:
      "Privacy practices for Unfumbled: local conversations, Supabase, OpenAI, and RevenueCat.",
    url: `${site.url}${path}`,
  },
};

export default function PrivacyPage() {
  return (
    <UnfumbledLegalShell
      title="Privacy Policy"
      description="How we handle data for Unfumbled — including on-device storage and limited server processing."
      lastUpdated={UNFUMBLED_LEGAL_LAST_UPDATED}
      currentPath={path}
    >
      <LegalSectionArticle sections={unfumbledPrivacy.sections} />
    </UnfumbledLegalShell>
  );
}
