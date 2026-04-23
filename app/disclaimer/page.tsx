import type { Metadata } from "next";
import { LegalSectionArticle } from "@/components/LegalSectionArticle";
import { UnfumbledLegalShell } from "@/components/UnfumbledLegalShell";
import {
  UNFUMBLED_DISCLAIMER_LAST_UPDATED,
  unfumbledDisclaimer,
} from "@/data/legal/unfumbled-global";
import { buildMetadata } from "@/lib/seo";

const path = "/disclaimer";

export const metadata: Metadata = buildMetadata({
  title: "AI Disclaimer",
  description:
    "Important limitations of AI-generated messaging suggestions from Unfumbled by Cena Labs — informational and entertainment use only; no guaranteed outcomes.",
  path,
});

export default function DisclaimerPage() {
  return (
    <UnfumbledLegalShell
      title="AI Disclaimer"
      description="Please read this carefully before relying on any AI-generated suggestion."
      lastUpdated={UNFUMBLED_DISCLAIMER_LAST_UPDATED}
      currentPath={path}
    >
      <LegalSectionArticle sections={unfumbledDisclaimer.sections} />
    </UnfumbledLegalShell>
  );
}
