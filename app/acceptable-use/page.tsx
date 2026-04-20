import type { Metadata } from "next";
import { LegalSectionArticle } from "@/components/LegalSectionArticle";
import { UnfumbledLegalShell } from "@/components/UnfumbledLegalShell";
import {
  UNFUMBLED_LEGAL_LAST_UPDATED,
  unfumbledAcceptableUse,
} from "@/data/legal/unfumbled-global";
import { site } from "@/data/site";

const path = "/acceptable-use";

export const metadata: Metadata = {
  title: "Acceptable Use Policy",
  description:
    "Rules for using Unfumbled — prohibited content and behavior that may lead to suspension.",
  alternates: { canonical: `${site.url}${path}` },
  openGraph: {
    title: "Acceptable Use Policy — Cena Labs",
    url: `${site.url}${path}`,
  },
};

export default function AcceptableUsePage() {
  return (
    <UnfumbledLegalShell
      title="Acceptable Use Policy"
      description="Content and conduct standards for Unfumbled and related Services."
      lastUpdated={UNFUMBLED_LEGAL_LAST_UPDATED}
      currentPath={path}
    >
      <LegalSectionArticle sections={unfumbledAcceptableUse.sections} />
    </UnfumbledLegalShell>
  );
}
