import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

/**
 * Placeholder blog index.
 *
 * Structure is in place so we can add long-form SEO content (guides,
 * case studies, teardown posts) without refactoring. Until there is
 * actual content, this page is set to noIndex so we don't ship a
 * thin/empty page to search engines.
 *
 * When the first post exists:
 *   1. Remove `noIndex: true` below.
 *   2. Add /blog to app/sitemap.ts.
 *   3. Create /app/blog/[slug]/page.tsx rendering a post from /data/posts.
 */
export const metadata: Metadata = buildMetadata({
  title: `${site.name} Guides & Writing`,
  description: `Long-form guides and writing from ${site.name} — coming soon. Follow along as we publish articles on AI texting, better communication, and the craft of building focused apps.`,
  path: "/blog",
  noIndex: true,
  absoluteTitle: true,
});

export default function BlogIndexPage() {
  return (
    <section className="container-page py-24 sm:py-32">
      <div className="max-w-2xl">
        <p className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-lo">
          <span aria-hidden className="h-px w-5 bg-white/20" />
          Writing
        </p>
        <h1 className="text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.04em] text-hi sm:text-5xl">
          Guides and writing, coming soon.
        </h1>
        <p className="mt-5 text-pretty text-[17px] leading-relaxed text-mid">
          We are preparing long-form guides on AI texting, better
          conversations, and the craft of shipping focused apps. In the
          meantime,{" "}
          <Link
            href="/apps/unfumbled"
            className="text-hi underline underline-offset-4 decoration-white/20 hover:decoration-white/50"
          >
            read about Unfumbled
          </Link>{" "}
          or{" "}
          <Link
            href="/about"
            className="text-hi underline underline-offset-4 decoration-white/20 hover:decoration-white/50"
          >
            meet the studio
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
