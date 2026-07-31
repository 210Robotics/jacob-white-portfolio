import type { Metadata } from "next";
import { ResearchExplorer } from "@/components/research-explorer";
import { SectionHeading } from "@/components/section-heading";
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
          as="h1"
          eyebrow="Research"
          title="Questions worth building hardware to answer."
          description="This is a living research map—not a list of unsupported publication claims. It captures the areas Jacob is actively developing and the technical directions he wants to pursue."
        />
        <div className="mt-14">
          <ResearchExplorer items={items} />
        </div>
      </div>
    </section>
  );
}
