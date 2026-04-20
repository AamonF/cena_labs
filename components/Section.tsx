import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

type SectionProps = HTMLAttributes<HTMLElement> & {
  eyebrow?: string;
  title?: string;
  description?: string;
  align?: "left" | "center";
};

export function Section({
  className,
  eyebrow,
  title,
  description,
  align = "left",
  children,
  ...props
}: SectionProps) {
  const hasHeader = Boolean(eyebrow || title || description);

  return (
    <section className={cn("py-24 sm:py-32", className)} {...props}>
      <div className="container-page">
        {hasHeader && (
          <header
            className={cn(
              "mb-14 max-w-3xl",
              align === "center" && "mx-auto text-center"
            )}
          >
            {eyebrow && (
              <div
                className={cn(
                  "mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-lo",
                  align === "center" && "justify-center"
                )}
              >
                <span
                  aria-hidden
                  className="h-px w-5 bg-white/20"
                />
                {eyebrow}
              </div>
            )}
            {title && (
              <h2 className="text-balance text-3xl font-semibold tracking-[-0.03em] text-hi sm:text-4xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-4 text-pretty text-lg leading-relaxed text-mid">
                {description}
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
