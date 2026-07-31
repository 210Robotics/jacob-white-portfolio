"use client";

import { ArrowUpRight, FlaskConical, X } from "lucide-react";
import { Dialog } from "radix-ui";
import { useState } from "react";
import type { ResearchItem } from "@/lib/types";
import { Markdown } from "./markdown";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export function ResearchExplorer({ items }: { items: ResearchItem[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = items.find((item) => item.id === activeId) ?? null;

  return (
    <Dialog.Root
      open={Boolean(active)}
      onOpenChange={(open) => !open && setActiveId(null)}
    >
      <div className="grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] md:grid-cols-2">
        {items.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveId(item.id)}
            className="group relative min-h-[300px] bg-[#0b1114] p-7 text-left transition duration-300 hover:bg-[#0e171a] sm:p-9"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl border border-cyan-300/15 bg-gradient-to-br from-cyan-300/10 to-emerald-300/[0.06] text-cyan-300">
                  <FlaskConical className="size-4" />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-600">
                  R/{String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <ArrowUpRight className="size-5 text-zinc-700 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-cyan-300" />
            </div>
            <Badge className="mt-8">{item.status}</Badge>
            <h2 className="mt-5 max-w-lg text-2xl font-semibold tracking-[-0.035em] text-white">
              {item.title}
            </h2>
            <p className="mt-4 max-w-xl leading-7 text-zinc-400">
              {item.summary}
            </p>
            <div className="mt-7 flex flex-wrap gap-x-4 gap-y-2">
              {item.topics.slice(0, 4).map((topic) => (
                <span
                  key={topic}
                  className="font-mono text-[9px] uppercase tracking-[0.14em] text-zinc-600"
                >
                  {topic}
                </span>
              ))}
            </div>
            <span className="mt-8 inline-flex items-center gap-2 text-xs font-semibold text-cyan-300 opacity-70 transition group-hover:opacity-100">
              Open research brief <ArrowUpRight className="size-3.5" />
            </span>
          </button>
        ))}
      </div>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out" />
        <Dialog.Content className="fixed inset-x-4 bottom-4 top-20 z-50 overflow-y-auto rounded-2xl border border-white/10 bg-[#0a0f12] shadow-[0_40px_120px_rgba(0,0,0,0.7)] sm:left-1/2 sm:right-auto sm:w-[min(760px,calc(100vw-3rem))] sm:-translate-x-1/2">
          {active ? (
            <div>
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/[0.08] bg-[#0a0f12]/94 px-6 py-4 backdrop-blur-xl sm:px-8">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-cyan-300">
                    Research brief
                  </p>
                  <Dialog.Title className="mt-1 text-sm font-semibold text-white">
                    {active.title}
                  </Dialog.Title>
                </div>
                <Dialog.Close asChild>
                  <Button variant="ghost" size="icon" aria-label="Close research brief">
                    <X className="size-5" />
                  </Button>
                </Dialog.Close>
              </div>
              <div className="px-6 py-8 sm:px-10 sm:py-10">
                <div className="flex flex-wrap gap-2">
                  <Badge>{active.status}</Badge>
                  {active.topics.map((topic) => (
                    <Badge key={topic}>{topic}</Badge>
                  ))}
                </div>
                <h2 className="mt-8 text-balance text-3xl font-semibold tracking-[-0.045em] text-white sm:text-5xl">
                  {active.title}
                </h2>
                <p className="mt-5 text-lg leading-8 text-zinc-400">
                  {active.summary}
                </p>
                <div className="mt-10 border-t border-white/[0.08] pt-2">
                  <Markdown>{active.body}</Markdown>
                </div>
              </div>
            </div>
          ) : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
