import type { Metadata } from "next";
import { LegalSectionArticle } from "@/components/LegalSectionArticle";
import { UnfumbledLegalShell } from "@/components/UnfumbledLegalShell";
import {
  UNFUMBLED_LEGAL_LAST_UPDATED,
  unfumbledPrivacy,
} from "@/data/legal/unfumbled-global";
import { buildMetadata } from "@/lib/seo";

const path = "/privacy";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How Cena Labs collects, uses, and protects information for Unfumbled — covering local on-device storage, AI processing, Supabase, OpenAI, and third-party services.",
  path,
});

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
