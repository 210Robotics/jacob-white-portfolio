"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/lib/types";
import { ProjectCard } from "./project-card";

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((project) => project.category)))],
    [projects],
  );
  const [activeCategory, setActiveCategory] = useState("All");
  const visibleProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <div>
      <div className="mb-8 flex gap-2 overflow-x-auto pb-2" role="tablist">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            role="tab"
            aria-selected={activeCategory === category}
            onClick={() => setActiveCategory(category)}
            className="shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors aria-selected:border-teal-400/50 aria-selected:bg-teal-500/10 aria-selected:text-teal-300 border-white/10 text-zinc-400 hover:border-white/25 hover:text-white"
          >
            {category}
          </button>
        ))}
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {visibleProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      {visibleProjects.length === 0 ? (
        <div className="rounded-xl border border-dashed border-white/15 p-12 text-center text-zinc-500">
          No projects in this category yet.
        </div>
      ) : null}
    </div>
  );
}
