import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Markdown } from "@/components/markdown";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/data";
import { formatDate } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 300;

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  return post ? { title: post.title, description: post.excerpt } : {};
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <article>
      <header className="engineering-grid border-b border-white/8">
        <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 lg:py-24">
          <Button asChild variant="ghost" size="sm" className="-ml-3">
            <Link href="/blog">
              <ArrowLeft className="size-4" /> Field notes
            </Link>
          </Button>
          <p className="mt-10 font-mono text-xs uppercase tracking-[0.16em] text-zinc-600">
            {formatDate(post.publishedAt)}
          </p>
          <h1 className="mt-5 text-balance text-4xl font-semibold tracking-[-0.05em] text-white sm:text-6xl">
            {post.title}
          </h1>
          <p className="mt-6 text-pretty text-lg leading-8 text-zinc-400">
            {post.excerpt}
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        </div>
      </header>
      {post.coverImageUrl ? (
        <div className="mx-auto max-w-5xl px-5 pt-12 sm:px-8">
          <div className="relative aspect-[16/7] overflow-hidden rounded-xl border border-white/10">
            <Image
              src={post.coverImageUrl}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-contain p-4"
              priority
            />
          </div>
        </div>
      ) : null}
      <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-24">
        <Markdown>{post.body}</Markdown>
      </div>
    </article>
  );
}
