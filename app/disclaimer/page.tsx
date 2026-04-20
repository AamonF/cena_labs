import type { Metadata } from "next";
import { LegalSectionArticle } from "@/components/LegalSectionArticle";
import { UnfumbledLegalShell } from "@/components/UnfumbledLegalShell";
import {
  UNFUMBLED_LEGAL_LAST_UPDATED,
  unfumbledDisclaimer,
} from "@/data/legal/unfumbled-global";
import { site } from "@/data/site";

const path = "/disclaimer";

export const metadata: Metadata = {
  title: "AI Disclaimer",
  description:
    "Important limitations of AI-generated messaging suggestions from Unfumbled by Cena Labs.",
  alternates: { canonical: `${site.url}${path}` },
  openGraph: {
    title: "AI Disclaimer — Cena Labs",
    description:
      "Unfumbled provides informational and entertainment suggestions only — no guaranteed outcomes.",
    url: `${site.url}${path}`,
  },
};

export default function DisclaimerPage() {
  return (
    <UnfumbledLegalShell
      title="AI Disclaimer"
      description="Please read this carefully before relying on any AI-generated suggestion."
      lastUpdated={UNFUMBLED_LEGAL_LAST_UPDATED}
      currentPath={path}
    >
      <LegalSectionArticle sections={unfumbledDisclaimer.sections} />
    </UnfumbledLegalShell>
  );
}
