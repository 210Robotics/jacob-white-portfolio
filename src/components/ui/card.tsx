import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-xl border border-white/10 bg-zinc-900/70 shadow-[0_24px_70px_rgba(0,0,0,0.2)]",
        className,
      )}
      {...props}
    />
  );
}
