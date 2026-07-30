import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  Boxes,
  Cpu,
  DraftingCompass,
} from "lucide-react";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getProjects, getSiteSettings } from "@/lib/data";

export const revalidate = 300;

const highlights = [
  ["10+", "years in CAD"],
  ["Global", "Siemens IDC winner"],
  ["3.92", "UTSA GPA"],
  ["4×", "FRC Worlds qualifier"],
];

const disciplines = [
  {
    icon: DraftingCompass,
    title: "Design",
    detail:
      "Mechanical architecture, detailed CAD, DFM, drawings, and mechanism iteration.",
  },
  {
    icon: Boxes,
    title: "Build",
    detail:
      "CNC, additive manufacturing, mechatronics, fabrication, and system integration.",
  },
  {
    icon: Cpu,
    title: "Model",
    detail:
      "CFD, FEA, system simulation, digital twins, and engineering visualization.",
  },
  {
    icon: Bot,
    title: "Automate",
    detail:
      "Controls, embedded software, AI vision, autonomy, and industrial workflows.",
  },
];

export default async function HomePage() {
  const [settings, projects] = await Promise.all([
    getSiteSettings(),
    getProjects(),
  ]);
  const featured = projects.filter((project) => project.featured).slice(0, 4);

  return (
    <>
      <section className="engineering-grid relative overflow-hidden border-b border-white/8">
        <div className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-7xl items-center gap-14 px-5 py-16 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:py-20">
          <div className="reveal max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-400/20 bg-teal-400/[0.06] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-teal-300">
              <span className="size-1.5 rounded-full bg-teal-400" />
              {settings.heroEyebrow}
            </div>
            <h1 className="mt-7 text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl">
              {settings.heroTitle}
            </h1>
            <p className="mt-7 max-w-2xl text-pretty text-lg leading-8 text-zinc-400 sm:text-xl">
              {settings.heroSummary}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/projects">
                  Explore the work <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/resume">View résumé</Link>
              </Button>
            </div>
            <div className="mt-10 flex items-center gap-3 text-sm text-zinc-500">
              <BadgeCheck className="size-4 text-orange-400" />
              <span>{settings.availability}</span>
            </div>
          </div>

          <div className="reveal reveal-delay-1 relative mx-auto w-full max-w-[560px]">
            <Card className="hero-schematic relative aspect-square overflow-hidden border-white/12">
              <div className="schematic-arm" />
              <span className="absolute left-[17%] top-[14%] font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-600">
                System / JW-26
              </span>
              <span className="absolute bottom-[13%] left-[12%] font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-600">
                CAD · CAE · Controls
              </span>
              <div className="absolute right-[8%] top-[11%] grid gap-2 font-mono text-[9px] uppercase tracking-[0.14em] text-zinc-700">
                <span>Axis 01 / active</span>
                <span>Axis 02 / active</span>
                <span>Vision / linked</span>
              </div>
            </Card>
            <div className="absolute -bottom-5 -left-2 rounded-lg border border-orange-400/20 bg-zinc-950 px-4 py-3 shadow-xl sm:-left-7">
              <p className="font-mono text-[10px] uppercase tracking-[0.17em] text-zinc-500">
                Current focus
              </p>
              <p className="mt-1 text-sm font-semibold text-white">
                Intelligent manufacturing
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/8 bg-zinc-950">
        <div className="mx-auto grid max-w-7xl grid-cols-2 px-5 sm:px-8 lg:grid-cols-4">
          {highlights.map(([metric, label], index) => (
            <div
              key={label}
              className={`py-8 ${index % 2 ? "border-l" : ""} px-5 lg:border-l lg:first:border-l-0`}
            >
              <p className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                {metric}
              </p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-600">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
        <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Selected work"
            title="Engineering across the physical–digital boundary."
            description="From autonomous manufacturing and competition robots to internal industrial applications, each project connects design decisions to real system behavior."
          />
          <Button asChild variant="secondary" className="w-fit">
            <Link href="/projects">
              All projects <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {featured.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      <section className="border-y border-white/8 bg-zinc-900/35">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-28">
          <SectionHeading
            eyebrow="Working method"
            title="One engineering loop. Four disciplines."
            description="Jacob works comfortably across the handoffs that usually slow teams down—design to manufacturing, hardware to controls, simulation to test, and concept to communication."
          />
          <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-4">
            {disciplines.map((discipline) => (
              <div key={discipline.title} className="bg-zinc-950 p-6">
                <discipline.icon className="size-5 text-orange-400" />
                <h3 className="mt-8 text-lg font-semibold text-white">
                  {discipline.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-500">
                  {discipline.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
        <Card className="relative overflow-hidden border-orange-400/20 p-8 sm:p-12 lg:p-16">
          <div className="absolute inset-y-0 right-0 hidden w-2/5 engineering-placeholder opacity-50 lg:block" />
          <div className="relative max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-orange-400">
              Build something difficult
            </p>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
              The best conversations start with a real problem.
            </h2>
            <p className="mt-5 text-lg leading-8 text-zinc-400">
              Bring the mechanism, simulation, research question, or production
              bottleneck. Jacob brings a systems mindset and a builder’s bias.
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link href="/contact">
                Start a conversation <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </Card>
      </section>
    </>
  );
}
