import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/types";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="group relative flex h-full flex-col overflow-hidden transition-[border-color,transform,background] duration-300 hover:-translate-y-1 hover:border-teal-300/35 hover:bg-[#121a1d]">
      <Link href={`/projects/${project.slug}`} className="absolute inset-0 z-10">
        <span className="sr-only">View {project.title}</span>
      </Link>
      <div className="relative aspect-[16/9] overflow-hidden border-b border-white/[0.07] bg-[#0c1113]">
        {project.coverImageUrl ? (
          <Image
            src={project.coverImageUrl}
            alt={`${project.title} project image`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain object-center p-5 drop-shadow-[0_18px_22px_rgba(0,0,0,0.28)] transition duration-500 group-hover:scale-[1.025]"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center bg-[#0d1315] p-8 text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-600">
              Visual documentation in progress
            </span>
          </div>
        )}
        <div className="absolute left-4 top-4 z-[2]">
          <Badge className="border-black/10 bg-[#080b0d]/90 text-zinc-300">{project.year}</Badge>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-teal-400">
              {project.category}
            </p>
            <h3 className="mt-2 text-xl font-medium tracking-[-0.025em] text-white">
              {project.title}
            </h3>
          </div>
          <ArrowUpRight className="size-5 shrink-0 text-zinc-600 transition-colors group-hover:text-teal-300" />
        </div>
        <p className="mt-4 flex-1 text-sm leading-6 text-zinc-400">{project.summary}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((technology) => (
            <span
              key={technology}
              className="rounded-md border border-white/[0.07] px-2 py-1 font-mono text-[10px] text-zinc-500"
            >
              {technology}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
}
