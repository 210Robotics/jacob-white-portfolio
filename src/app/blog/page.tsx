import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getBlogPosts } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Field Notes",
  description:
    "Project notes and reflections on robotics, CAD, engineering leadership, simulation, and manufacturing.",
};

export const revalidate = 300;

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <section className="engineering-grid min-h-screen">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <SectionHeading
          eyebrow="Field notes"
          title="What the build taught me."
          description="Short essays on engineering decisions, project leadership, manufacturing reality, and the systems behind the finished machine."
        />
        {posts.length ? (
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {posts.map((post) => (
              <Card
                key={post.id}
                className="group relative overflow-hidden transition-[transform,border-color] hover:-translate-y-1 hover:border-orange-400/30"
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="absolute inset-0 z-10"
                >
                  <span className="sr-only">Read {post.title}</span>
                </Link>
                {post.coverImageUrl ? (
                  <div className="relative aspect-[16/8] overflow-hidden border-b border-white/8 bg-zinc-950">
                    <Image
                      src={post.coverImageUrl}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.025]"
                    />
                  </div>
                ) : null}
                <div className="p-6 sm:p-7">
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-600">
                      {formatDate(post.publishedAt)}
                    </p>
                    <ArrowUpRight className="size-5 text-zinc-700 group-hover:text-orange-400" />
                  </div>
                  <h2 className="mt-5 text-2xl font-semibold tracking-tight text-white">
                    {post.title}
                  </h2>
                  <p className="mt-4 leading-7 text-zinc-400">{post.excerpt}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="mt-14 border-dashed p-12 text-center">
            <p className="text-zinc-300">No published notes yet.</p>
            <p className="mt-2 text-sm text-zinc-500">
              Drafts stay private until Jacob publishes them.
            </p>
          </Card>
        )}
      </div>
    </section>
  );
}
