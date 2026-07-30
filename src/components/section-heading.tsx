import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  as: Heading = "h2",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      <p className="text-xs font-semibold uppercase tracking-[0.19em] text-teal-400">
        {eyebrow}
      </p>
      <Heading className="mt-4 text-balance text-3xl font-medium tracking-[-0.05em] text-white sm:text-4xl lg:text-5xl">
        {title}
      </Heading>
      {description ? (
        <p className="mt-5 text-pretty text-base leading-7 text-zinc-400 sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
