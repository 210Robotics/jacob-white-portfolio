import Link from "next/link";
import { ArrowRight, BadgeCheck, Bot, Boxes, Cpu, DraftingCompass } from "lucide-react";
import Image from "next/image";
import { HeroProjectStack } from "@/components/hero-project-stack";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getProjects, getSiteSettings } from "@/lib/data";

export const revalidate = 300;

const highlights = [
  ["10+", "Years in CAD"],
  ["Siemens", "Technical lead"],
  ["Global", "IDC winner"],
  ["Founder", "210 Robotics"],
];

const disciplines = [
  {
    icon: DraftingCompass,
    title: "Design",
    detail: "Mechanical architecture, detailed CAD, DFM, drawings, and mechanism iteration.",
  },
  {
    icon: Boxes,
    title: "Build",
    detail: "CNC, additive manufacturing, mechatronics, fabrication, and system integration.",
  },
  {
    icon: Cpu,
    title: "Model",
    detail: "CFD, FEA, system simulation, digital twins, and engineering visualization.",
  },
  {
    icon: Bot,
    title: "Automate",
    detail: "Controls, embedded software, AI vision, autonomy, and industrial workflows.",
  },
];

const selectedSlugs = [
  "roborowdy",
  "iterative-propeller-design",
  "sucker-rod-pump-simulation",
  "siemens-competitive-intelligence-app",
  "siemens-workforce-management",
  "autonomous-rc-car",
];

export default async function HomePage() {
  const [settings, projects] = await Promise.all([getSiteSettings(), getProjects()]);
  const selected = selectedSlugs
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project) => project !== undefined);
  const [titleBeforeThink, titleAfterThink] = settings.heroTitle.split("think");

  return (
    <>
      <section className="relative overflow-hidden border-b border-white/[0.07]">
        <div className="mx-auto grid min-h-[520px] max-w-[1440px] items-center gap-12 px-5 py-12 sm:px-8 lg:grid-cols-[0.96fr_1.04fr] lg:px-14 lg:py-10">
          <div className="reveal max-w-[660px]">
            <div className="inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.19em] text-teal-300">
              <span className="size-1.5 rounded-full bg-teal-400" />
              {settings.heroEyebrow}
            </div>
            <h1 className="mt-7 text-balance text-[clamp(3rem,3.8vw,3.55rem)] font-medium leading-[0.96] tracking-[-0.062em] text-[#f2f6f5]">
              {titleBeforeThink}
              {titleAfterThink !== undefined ? (
                <>
                  <span className="bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">think</span>
                  {titleAfterThink}
                </>
              ) : null}
            </h1>
            <p className="mt-7 max-w-xl text-pretty text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8">
              {settings.heroSummary}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/projects">
                  Explore my work <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/resume">View résumé</Link>
              </Button>
            </div>
            <div className="mt-6 flex items-center gap-2.5 text-sm text-zinc-500">
              <BadgeCheck className="size-4 text-teal-400" />
              <span>{settings.availability}</span>
            </div>
          </div>

          <div className="reveal reveal-delay-1">
            <HeroProjectStack projects={projects.filter((project) => project.featured)} />
          </div>
        </div>
      </section>

      <section className="border-b border-white/[0.07] bg-[#0b0f11]">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 px-5 sm:px-8 lg:grid-cols-4 lg:px-14">
          {highlights.map(([metric, label], index) => (
            <div
              key={label}
              className={`px-4 py-7 sm:px-6 ${index % 2 ? "border-l border-white/[0.07]" : ""} lg:border-l lg:first:border-l-0`}
            >
              <p className="text-xl font-medium tracking-[-0.03em] text-white sm:text-2xl">{metric}</p>
              <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.16em] text-zinc-600">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-14 lg:py-24">
        <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.19em] text-teal-400">
              Selected work
            </p>
            <h2 className="mt-3 text-2xl font-medium tracking-[-0.04em] text-white sm:text-3xl">
              Robotics, CAD, and intelligent systems.
            </h2>
          </div>
          <Button asChild variant="secondary" className="w-fit">
            <Link href="/projects">
              View all projects <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {selected.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      <section className="border-y border-white/[0.07] bg-[#0b0f11]">
        <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-14 lg:py-28">
          <SectionHeading
            eyebrow="Working method"
            title="One engineering loop. Four disciplines."
            description="The work moves between design, manufacturing, simulation, and controls without losing the system-level view."
          />
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] md:grid-cols-2 lg:grid-cols-4">
            {disciplines.map((discipline) => (
              <div key={discipline.title} className="group bg-[#0d1214] p-7 transition-colors hover:bg-[#101719]">
                <discipline.icon className="size-5 text-teal-400" />
                <h3 className="mt-10 text-lg font-medium text-white">{discipline.title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-500">{discipline.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-white/[0.07]">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[300px_1fr_auto] lg:items-center lg:px-14 lg:py-24">
          <figure className="relative mx-auto w-full max-w-[300px] overflow-hidden rounded-2xl border border-cyan-300/20 bg-[#0c1316] p-2 shadow-[0_30px_80px_rgba(0,0,0,0.4)] lg:mx-0">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
              <Image
                src={settings.portraitUrl}
                alt="Jacob White"
                fill
                sizes="300px"
                className="object-cover object-[center_28%]"
              />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />
            </div>
          </figure>
          <div className="max-w-2xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyan-300">
              Jacob White
            </p>
            <h2 className="mt-4 text-balance text-3xl font-medium tracking-[-0.05em] text-white sm:text-5xl">
              Mechanical depth. Software range. A builder&apos;s bias.
            </h2>
            <p className="mt-5 text-lg leading-8 text-zinc-400">
              Honors mechanical engineering at UT San Antonio, technical
              engineering leadership at Siemens, and student-founded robotics
              programs built around real machines and measurable decisions.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:flex-col">
            <Button asChild variant="secondary">
              <Link href="/about">About Jacob <ArrowRight className="size-4" /></Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/skills">Skills & credentials <ArrowRight className="size-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-14 lg:py-32">
        <Card className="relative overflow-hidden p-8 sm:p-12 lg:p-16">
          <div className="relative max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.19em] text-teal-400">
              Build something difficult
            </p>
            <h2 className="mt-4 text-balance text-3xl font-medium tracking-[-0.05em] text-white sm:text-5xl">
              The best conversations start with a real problem.
            </h2>
            <p className="mt-5 text-lg leading-8 text-zinc-400">
              Bring the mechanism, simulation, research question, or production bottleneck.
              Jacob brings a systems mindset and a builder&apos;s bias.
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
