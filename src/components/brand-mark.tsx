import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative grid size-9 place-items-center rounded-lg border border-teal-300/30 bg-teal-400/[0.08] font-mono text-sm font-bold tracking-[-0.04em] text-teal-300",
        className,
      )}
      aria-hidden="true"
    >
      JW
    </span>
  );
}
