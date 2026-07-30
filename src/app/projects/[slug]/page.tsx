import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Markdown } from "@/components/markdown";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getProjectBySlug, getProjects } from "@/lib/data";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 300;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
  };
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <article>
      <header className="engineering-grid border-b border-white/8">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
          <Button asChild variant="ghost" size="sm" className="-ml-3">
            <Link href="/projects">
              <ArrowLeft className="size-4" /> All projects
            </Link>
          </Button>
          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <div>
              <div className="flex flex-wrap gap-2">
                <Badge>{project.category}</Badge>
                <Badge>{project.year}</Badge>
              </div>
              <h1 className="mt-6 text-balance text-4xl font-semibold tracking-[-0.05em] text-white sm:text-6xl">
                {project.title}
              </h1>
              <p className="mt-6 max-w-3xl text-pretty text-lg leading-8 text-zinc-400">
                {project.summary}
              </p>
            </div>
            <Card className="grid gap-5 p-5">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-600">
                  Jacob&apos;s role
                </p>
                <p className="mt-1 text-sm font-medium text-zinc-200">
                  {project.role}
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-600">
                  Toolchain
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {project.technologies.map((technology) => (
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
          </div>
        </div>
      </header>

      {project.coverImageUrl ? (
        <div className="mx-auto max-w-6xl px-5 pt-12 sm:px-8">
          <div className="relative aspect-[16/8] overflow-hidden rounded-2xl border border-white/10 bg-[#0c1113]">
            <Image
              src={project.coverImageUrl}
              alt={`${project.title} project image`}
              fill
              sizes="(max-width: 1152px) 100vw, 1152px"
              className="object-contain object-center p-4"
              priority
            />
          </div>
        </div>
      ) : null}

      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_280px] lg:py-24">
        <Markdown>{project.body}</Markdown>
        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <Card className="p-5">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-zinc-600">
              Project links
            </p>
            <div className="mt-4 grid gap-2">
              {project.sourceUrl ? (
                <Button asChild variant="secondary" className="justify-between">
                  <a href={project.sourceUrl} target="_blank" rel="noreferrer">
                    Source / coverage <ArrowUpRight className="size-4" />
                  </a>
                </Button>
              ) : null}
              {project.externalUrl ? (
                <Button asChild variant="secondary" className="justify-between">
                  <a href={project.externalUrl} target="_blank" rel="noreferrer">
                    Live project <ArrowUpRight className="size-4" />
                  </a>
                </Button>
              ) : null}
              {!project.sourceUrl && !project.externalUrl ? (
                <p className="text-sm leading-6 text-zinc-500">
                  Supporting files and links can be added from the dashboard as
                  the project develops.
                </p>
              ) : null}
            </div>
          </Card>
        </aside>
      </div>
    </article>
  );
}
