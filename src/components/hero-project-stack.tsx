"use client";

import Image from "next/image";
import { useRef } from "react";

const frames = [
  {
    src: "/portfolio/competition-robot-cad-clean.png",
    alt: "Competition robot CAD assembly",
    label: "Competition systems",
    className: "hero-frame-back",
  },
  {
    src: "/portfolio/mechanism-cad-clean.png",
    alt: "Robotic linkage mechanism CAD",
    label: "Mechanism design",
    className: "hero-frame-mid",
  },
  {
    src: "/portfolio/frc-robot-cad-clean.png",
    alt: "FRC robot CAD assembly",
    label: "Integrated robotics",
    className: "hero-frame-front",
  },
];

export function HeroProjectStack() {
  const stackRef = useRef<HTMLDivElement>(null);

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const stack = stackRef.current;
    if (!stack) return;
    const bounds = stack.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    stack.style.setProperty("--stack-x", `${x * 9}px`);
    stack.style.setProperty("--stack-y", `${y * 7}px`);
    stack.style.setProperty("--stack-back-x", `${x * -3.2}px`);
    stack.style.setProperty("--stack-back-y", `${y * -2.5}px`);
    stack.style.setProperty("--stack-mid-x", `${x * 5.4}px`);
    stack.style.setProperty("--stack-mid-y", `${y * 4.2}px`);
  }

  function reset() {
    const stack = stackRef.current;
    if (!stack) return;
    stack.style.setProperty("--stack-x", "0px");
    stack.style.setProperty("--stack-y", "0px");
    stack.style.setProperty("--stack-back-x", "0px");
    stack.style.setProperty("--stack-back-y", "0px");
    stack.style.setProperty("--stack-mid-x", "0px");
    stack.style.setProperty("--stack-mid-y", "0px");
  }

  return (
    <div
      ref={stackRef}
      className="hero-stack relative mx-auto h-[390px] w-full max-w-[650px] sm:h-[410px]"
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
    >
      {frames.map((frame) => (
        <figure
          key={frame.src}
          className={`${frame.className} absolute overflow-hidden rounded-2xl border border-white/[0.11] bg-[#111719] shadow-[0_32px_70px_rgba(0,0,0,0.42)]`}
        >
          <div className="relative size-full bg-[#0d1315]">
            <Image
              src={frame.src}
              alt={frame.alt}
              fill
              priority
              sizes="(max-width: 1024px) 84vw, 520px"
              className="object-contain p-4 drop-shadow-[0_18px_24px_rgba(0,0,0,0.32)]"
            />
          </div>
          <figcaption className="absolute inset-x-0 bottom-0 border-t border-white/[0.08] bg-[#0a0e10]/92 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-400 backdrop-blur">
            {frame.label}
          </figcaption>
        </figure>
      ))}
      <div className="absolute bottom-3 right-0 rounded-lg border border-teal-300/20 bg-[#0a0e10]/90 px-4 py-3 backdrop-blur-md sm:right-3">
        <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-zinc-600">Current focus</p>
        <p className="mt-1 text-sm font-medium text-zinc-100">Intelligent manufacturing</p>
      </div>
    </div>
  );
}
