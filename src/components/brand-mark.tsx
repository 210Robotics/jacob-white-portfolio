import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative grid size-9 place-items-center rounded-md border border-orange-400/35 bg-orange-500/10 font-mono text-sm font-bold text-orange-400",
        className,
      )}
      aria-hidden="true"
    >
      JW
      <span className="absolute -right-1 -top-1 size-2 rounded-full bg-teal-400" />
    </span>
  );
}
