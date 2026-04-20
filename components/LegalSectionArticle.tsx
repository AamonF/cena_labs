import type { ReactNode } from "react";
import type { LegalSection } from "@/data/types";

function linkifyEmails(text: string): ReactNode[] {
  const re = /(support@cenalabs\.com|info@cenalabs\.com)/g;
  const parts = text.split(re);
  return parts.map((part, i) =>
    part === "support@cenalabs.com" || part === "info@cenalabs.com" ? (
      <a
        key={i}
        href={`mailto:${part}`}
        className="text-hi underline underline-offset-4 decoration-white/20 transition-colors hover:decoration-white/50"
      >
        {part}
      </a>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

function Paragraphs({ text }: { text: string }) {
  return (
    <>
      {text
        .split(/\n\n/)
        .filter(Boolean)
        .map((para, i) => (
          <p key={i}>{linkifyEmails(para)}</p>
        ))}
    </>
  );
}

export function LegalSectionArticle({ sections }: { sections: LegalSection[] }) {
  return (
    <article className="prose-legal">
      {sections.map((section, i) => (
        <section key={i} id={`section-${i + 1}`}>
          <h2>{section.heading}</h2>
          {section.body ? <Paragraphs text={section.body} /> : null}
          {section.bullets && section.bullets.length > 0 ? (
            <ul>
              {section.bullets.map((b, j) => (
                <li key={j}>{b}</li>
              ))}
            </ul>
          ) : null}
          {section.closing ? <Paragraphs text={section.closing} /> : null}
          {section.secondaryIntro ? (
            <p className="mb-3 mt-6 text-[13px] font-semibold uppercase tracking-[0.08em] text-lo">
              {section.secondaryIntro}
            </p>
          ) : null}
          {section.secondaryBullets && section.secondaryBullets.length > 0 ? (
            <ul>
              {section.secondaryBullets.map((b, j) => (
                <li key={j}>{b}</li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}
    </article>
  );
}
