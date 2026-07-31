import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/[0.085] bg-[linear-gradient(145deg,#10181b,#0e1417)] shadow-[0_24px_70px_rgba(0,0,0,0.2)]",
        className,
      )}
      {...props}
    />
  );
}
