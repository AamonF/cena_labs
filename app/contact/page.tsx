import type { Metadata } from "next";
import { UnfumbledLegalShell } from "@/components/UnfumbledLegalShell";
import { site } from "@/data/site";

const path = "/contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Cena Labs for Unfumbled support (support@cenalabs.com) or business inquiries (info@cenalabs.com).",
  alternates: { canonical: `${site.url}${path}` },
  openGraph: {
    title: "Contact — Cena Labs",
    url: `${site.url}${path}`,
  },
};

export default function ContactPage() {
  return (
    <UnfumbledLegalShell
      title="Contact"
      description="Support and business channels for Unfumbled and Cena Labs."
      lastUpdated={null}
      currentPath={path}
    >
      <article className="prose-legal">
        <p>For support or inquiries:</p>
        <p>
          <span className="font-medium text-hi">Support:</span>{" "}
          <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>
        </p>
        <p>
          <span className="font-medium text-hi">Business:</span>{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </p>
        <p>Typical response time: 24–72 hours</p>
      </article>
    </UnfumbledLegalShell>
  );
}
