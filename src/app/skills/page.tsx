import type { Metadata } from "next";
import { SkillsExplorer } from "@/components/skills-explorer";
import { getCertifications, getSkills } from "@/lib/data";

export const metadata: Metadata = {
  title: "Skills & Certifications",
  description:
    "Jacob White's engineering, CAD, simulation, robotics, manufacturing, software, leadership skills, and professional certifications.",
};

export const revalidate = 300;

export default async function SkillsPage() {
  const [skills, certifications] = await Promise.all([
    getSkills(),
    getCertifications(),
  ]);

  return (
    <section className="min-h-screen">
      <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-14 lg:py-28">
        <div className="grid gap-8 border-b border-white/[0.08] pb-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <h1 className="text-balance text-4xl font-medium tracking-[-0.055em] text-white sm:text-6xl">
            Technical range,
            <span className="block bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">
              with the story behind it.
            </span>
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-zinc-400 lg:justify-self-end">
            Every rating is an honest self-assessment grounded in projects,
            training, professional work, competition experience, or a completed
            credential. Hover or select an item to see where it came from and
            what it means in practice.
          </p>
        </div>
        <div className="mt-10">
          <SkillsExplorer skills={skills} certifications={certifications} />
        </div>
      </div>
    </section>
  );
}
