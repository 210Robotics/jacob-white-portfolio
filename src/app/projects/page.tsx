import type { Metadata } from "next";
import { ProjectGrid } from "@/components/project-grid";
import { SectionHeading } from "@/components/section-heading";
import { getProjects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Robotics, autonomous systems, CAD, simulation, manufacturing, and software projects by Jacob White.",
};

export const revalidate = 300;

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <section className="engineering-grid min-h-screen">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <SectionHeading
          as="h1"
          eyebrow="Projects"
          title="Machines, models, and software with a reason to exist."
          description="Filter the portfolio by discipline, then open any project for its engineering story, role, tools, and source links."
        />
        <div className="mt-14">
          <ProjectGrid projects={projects} />
        </div>
      </div>
    </section>
  );
}
