import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-300",
        className,
      )}
      {...props}
    />
  );
}
