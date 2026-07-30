import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/types";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="group relative flex h-full flex-col overflow-hidden transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-orange-400/35">
      <Link href={`/projects/${project.slug}`} className="absolute inset-0 z-10">
        <span className="sr-only">View {project.title}</span>
      </Link>
      <div className="relative aspect-[16/9] overflow-hidden border-b border-white/8 bg-zinc-950">
        {project.coverImageUrl ? (
          <Image
            src={project.coverImageUrl}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center opacity-85 grayscale-[0.15] transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
          />
        ) : (
          <div className="absolute inset-0 engineering-placeholder">
            <span className="absolute bottom-5 left-5 font-mono text-xs uppercase tracking-[0.2em] text-zinc-600">
              {project.category}
            </span>
          </div>
        )}
        <div className="absolute left-4 top-4">
          <Badge className="border-zinc-700 bg-zinc-950/90">{project.year}</Badge>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-teal-400">
              {project.category}
            </p>
            <h3 className="mt-2 text-xl font-semibold tracking-tight text-white">
              {project.title}
            </h3>
          </div>
          <ArrowUpRight className="size-5 shrink-0 text-zinc-600 transition-colors group-hover:text-orange-400" />
        </div>
        <p className="mt-4 flex-1 text-sm leading-6 text-zinc-400">
          {project.summary}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((technology) => (
            <span
              key={technology}
              className="rounded border border-white/8 px-2 py-1 font-mono text-[10px] text-zinc-500"
            >
              {technology}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
}
