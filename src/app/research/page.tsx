import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getResearchItems } from "@/lib/data";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Current and future research interests in robotics, industrial automation, digital twins, simulation, AI vision, manufacturing, and resilient industrial systems.",
};

export const revalidate = 300;

export default async function ResearchPage() {
  const items = await getResearchItems();

  return (
    <section className="engineering-grid min-h-screen">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <SectionHeading
          eyebrow="Research"
          title="Questions worth building hardware to answer."
          description="This is a living research map—not a list of unsupported publication claims. It captures the areas Jacob is actively developing and the technical directions he wants to pursue."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {items.map((item, index) => (
            <Card
              key={item.id}
              className="group relative overflow-hidden p-6 sm:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  <Badge>{item.status}</Badge>
                  <span className="font-mono text-xs text-zinc-700">
                    R/{String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <ArrowUpRight className="size-5 text-zinc-700 transition-colors group-hover:text-teal-400" />
              </div>
              <h2 className="mt-8 text-2xl font-semibold tracking-tight text-white">
                {item.title}
              </h2>
              <p className="mt-4 leading-7 text-zinc-400">{item.summary}</p>
              <p className="mt-5 text-sm leading-6 text-zinc-500">{item.body}</p>
              <div className="mt-7 flex flex-wrap gap-2 border-t border-white/8 pt-5">
                {item.topics.map((topic) => (
                  <span
                    key={topic}
                    className="font-mono text-[10px] uppercase tracking-[0.12em] text-zinc-600"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
