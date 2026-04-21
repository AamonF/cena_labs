import type { Metadata } from "next";
import { UnfumbledLegalShell } from "@/components/UnfumbledLegalShell";
import { site } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

const path = "/contact";

export const metadata: Metadata = buildMetadata({
  title: "Contact Cena Labs",
  description: `Contact ${site.name} — Unfumbled support at ${site.supportEmail} or business inquiries at ${site.email}. Typical response time is 24–72 hours.`,
  path,
  absoluteTitle: true,
});

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
        <p>Typical response time: 24–72 hours.</p>
      </article>
    </UnfumbledLegalShell>
  );
}
