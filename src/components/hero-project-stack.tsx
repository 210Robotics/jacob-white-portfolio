"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, MousePointer2 } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import type { Project } from "@/lib/types";
import { cn } from "@/lib/utils";

export function HeroProjectStack({ projects }: { projects: Project[] }) {
  const items = useMemo(
    () => projects.filter((project) => project.coverImageUrl).slice(0, 6),
    [projects],
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const stackRef = useRef<HTMLDivElement>(null);
  const active = items[activeIndex];

  function cycle(step: 1 | -1) {
    if (!items.length) return;
    setDirection(step);
    setActiveIndex((current) => (current + step + items.length) % items.length);
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const stack = stackRef.current;
    if (!stack) return;
    const bounds = stack.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    stack.style.setProperty("--stack-x", `${x * 10}px`);
    stack.style.setProperty("--stack-y", `${y * 8}px`);
    stack.style.setProperty("--stack-back-x", `${x * -4}px`);
    stack.style.setProperty("--stack-back-y", `${y * -3}px`);
    stack.style.setProperty("--stack-mid-x", `${x * 6}px`);
    stack.style.setProperty("--stack-mid-y", `${y * 4}px`);
  }

  function reset() {
    const stack = stackRef.current;
    if (!stack) return;
    for (const property of [
      "--stack-x",
      "--stack-y",
      "--stack-back-x",
      "--stack-back-y",
      "--stack-mid-x",
      "--stack-mid-y",
    ]) {
      stack.style.setProperty(property, "0px");
    }
  }

  if (!active) return null;

  const layeredItems = [2, 1, 0].map(
    (offset) => items[(activeIndex + offset) % items.length],
  );

  return (
    <div className="mx-auto w-full max-w-[680px]">
      <div
        ref={stackRef}
        className="hero-stack relative h-[390px] w-full sm:h-[430px]"
        onPointerMove={handlePointerMove}
        onPointerLeave={reset}
      >
        {layeredItems.map((project, layerIndex) => {
          const isFront = layerIndex === 2;
          const frameClass = ["hero-frame-back", "hero-frame-mid", "hero-frame-front"][
            layerIndex
          ];
          return (
            <figure
              key={`${project.id}-${activeIndex}-${layerIndex}`}
              className={cn(
                frameClass,
                "absolute overflow-hidden rounded-2xl border border-white/[0.11] bg-[#0d1417] shadow-[0_34px_90px_rgba(0,0,0,0.5)]",
                isFront &&
                  (direction === 1 ? "hero-card-enter-next" : "hero-card-enter-previous"),
              )}
              aria-hidden={!isFront}
            >
              <button
                type="button"
                onClick={() => cycle(1)}
                tabIndex={isFront ? 0 : -1}
                className="group relative size-full text-left"
                aria-label={`Show next project. Current project: ${project.title}`}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_66%_34%,rgba(34,211,238,0.08),transparent_45%),linear-gradient(135deg,#0c1215,#0a0e11)]" />
                <Image
                  src={project.coverImageUrl!}
                  alt={`${project.title} project preview`}
                  fill
                  loading={isFront ? "eager" : "lazy"}
                  sizes="(max-width: 1024px) 88vw, 560px"
                  className="object-contain p-6 pb-24 drop-shadow-[0_24px_32px_rgba(0,0,0,0.45)] transition duration-700 group-hover:scale-[1.025] sm:p-10 sm:pb-24"
                />
                <figcaption className="absolute inset-x-0 bottom-0 border-t border-white/[0.08] bg-[#080d10]/92 px-5 py-4 backdrop-blur-xl">
                  <div className="flex items-end justify-between gap-5">
                    <div className="min-w-0">
                      <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-cyan-300/75">
                        {project.category}
                      </p>
                      <p className="mt-1 truncate text-sm font-semibold text-white sm:text-base">
                        {project.title}
                      </p>
                    </div>
                    <span className="hidden items-center gap-1.5 text-[10px] font-semibold text-zinc-500 sm:flex">
                      <MousePointer2 className="size-3.5" /> Click to cycle
                    </span>
                  </div>
                </figcaption>
              </button>
            </figure>
          );
        })}
        <div className="absolute bottom-2 right-1 z-20 flex items-center gap-2 rounded-xl border border-white/10 bg-[#080d10]/90 p-1.5 backdrop-blur-xl sm:bottom-4 sm:right-3">
          <button
            type="button"
            onClick={() => cycle(-1)}
            className="grid size-9 place-items-center rounded-lg text-zinc-500 transition hover:bg-white/[0.06] hover:text-white"
            aria-label="Previous featured project"
          >
            <ChevronLeft className="size-4" />
          </button>
          <span className="min-w-12 text-center font-mono text-[10px] text-zinc-500">
            {String(activeIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
          </span>
          <button
            type="button"
            onClick={() => cycle(1)}
            className="grid size-9 place-items-center rounded-lg text-zinc-500 transition hover:bg-white/[0.06] hover:text-white"
            aria-label="Next featured project"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between gap-4 px-3 sm:px-5">
        <div className="flex gap-1.5" aria-label="Featured project position">
          {items.map((project, index) => (
            <button
              key={project.id}
              type="button"
              onClick={() => {
                setDirection(index >= activeIndex ? 1 : -1);
                setActiveIndex(index);
              }}
              className={cn(
                "h-1.5 rounded-full transition-all",
                index === activeIndex
                  ? "w-8 bg-gradient-to-r from-cyan-400 to-emerald-300"
                  : "w-1.5 bg-white/15 hover:bg-white/35",
              )}
              aria-label={`Show ${project.title}`}
              aria-current={index === activeIndex ? "true" : undefined}
            />
          ))}
        </div>
        <Link
          href={`/projects/${active.slug}`}
          className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 transition hover:text-cyan-200"
        >
          Open project <ArrowRight className="size-3.5" />
        </Link>
      </div>
    </div>
  );
}
