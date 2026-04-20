import Link from "next/link";
import { cn } from "@/lib/cn";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium tracking-[-0.01em] transition-all duration-200 ease-smooth focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.97] disabled:pointer-events-none disabled:opacity-40 select-none";

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-[13px]",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-[15px]",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-white text-surface-base shadow-button hover:bg-white/90 active:bg-white/80",
  secondary:
    "bg-white/[0.07] text-hi ring-1 ring-inset ring-white/[0.10] hover:bg-white/[0.11] hover:ring-white/[0.17]",
  ghost:
    "text-mid hover:text-hi hover:bg-white/[0.05]",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
};

type LinkProps = CommonProps &
  Omit<ComponentProps<typeof Link>, "className" | "children"> & {
    href: string;
  };

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: LinkProps) {
  return (
    <Link
      className={cn(base, sizes[size], variants[variant], className)}
      {...props}
    >
      {children}
    </Link>
  );
}
