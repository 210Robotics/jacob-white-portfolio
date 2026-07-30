import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getExperiences } from "@/lib/data";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Engineering, leadership, robotics, manufacturing, and Siemens experience.",
};

export const revalidate = 300;

export default async function ExperiencePage() {
  const experiences = await getExperiences();

  return (
    <section className="engineering-grid min-h-screen">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
        <SectionHeading
          eyebrow="Experience"
          title="A timeline built around responsibility."
          description="The thread is consistent: learn the system deeply, own the interfaces, and help the team deliver something that works."
        />

        <div className="relative mt-16 before:absolute before:bottom-0 before:left-[7px] before:top-0 before:w-px before:bg-white/10 md:before:left-[174px]">
          {experiences.map((experience) => (
            <article
              key={experience.id}
              className="relative grid gap-4 pb-12 pl-10 md:grid-cols-[140px_1fr] md:gap-12 md:pl-0"
            >
              <span className="absolute left-0 top-2 size-[15px] rounded-full border-4 border-zinc-950 bg-orange-400 md:left-[167px]" />
              <div className="pt-1 md:text-right">
                <p className="font-mono text-xs uppercase tracking-[0.13em] text-zinc-500">
                  {experience.period}
                </p>
                {experience.location ? (
                  <p className="mt-2 text-xs text-zinc-700">
                    {experience.location}
                  </p>
                ) : null}
              </div>
              <Card className="p-6 sm:p-7">
                <Badge>{experience.organization}</Badge>
                <h2 className="mt-4 text-xl font-semibold tracking-tight text-white sm:text-2xl">
                  {experience.title}
                </h2>
                <p className="mt-4 leading-7 text-zinc-400">
                  {experience.summary}
                </p>
                <ul className="mt-6 grid gap-3 border-t border-white/8 pt-6">
                  {experience.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex gap-3 text-sm leading-6 text-zinc-500"
                    >
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-teal-400" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </Card>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
