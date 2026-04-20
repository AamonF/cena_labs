import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  narrow?: boolean;
};

export function Container({ className, narrow, ...props }: ContainerProps) {
  return (
    <div
      className={cn(narrow ? "container-narrow" : "container-page", className)}
      {...props}
    />
  );
}
