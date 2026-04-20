import Image from "next/image";
import { cn } from "@/lib/cn";
import type { App } from "@/data/types";

type Props = {
  app: Pick<App, "name" | "accent" | "iconInitials" | "iconImage">;
  size?: number;
  className?: string;
};

export function AppIcon({ app, size = 56, className }: Props) {
  const radius = Math.round(size * 0.24);

  if (app.iconImage) {
    return (
      <div
        className={cn("relative shrink-0 select-none overflow-hidden", className)}
        style={{
          width: size,
          height: size,
          borderRadius: radius,
          boxShadow: `0 ${size * 0.06}px ${size * 0.2}px rgba(0,0,0,0.5), 0 1px 2px rgba(0,0,0,0.3)`,
        }}
        aria-hidden
      >
        <Image
          src={app.iconImage}
          alt={app.name}
          fill
          unoptimized
          className="object-cover"
          sizes={`${size}px`}
        />
      </div>
    );
  }

  const initials =
    app.iconInitials ??
    app.name
      .split(" ")
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

  const bg = app.accent ?? "#0e0e12";

  return (
    <div
      className={cn(
        "relative flex shrink-0 select-none items-center justify-center font-semibold text-white",
        className
      )}
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        background: `linear-gradient(160deg, ${bg}ee 0%, ${bg} 100%)`,
        boxShadow: `0 ${size * 0.06}px ${size * 0.2}px ${bg}44, 0 1px 2px rgba(0,0,0,0.18)`,
        fontSize: size * 0.36,
        letterSpacing: "-0.03em",
      }}
      aria-hidden
    >
      <span style={{ position: "relative", zIndex: 1 }}>{initials}</span>
      {/* inner top highlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          borderRadius: radius,
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.26) 0%, rgba(255,255,255,0) 50%)",
        }}
      />
      {/* inner border shine */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          borderRadius: radius,
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.20), inset 0 -1px 0 rgba(0,0,0,0.12)",
        }}
      />
    </div>
  );
}
