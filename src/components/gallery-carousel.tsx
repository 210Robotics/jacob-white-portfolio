"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, Expand, X } from "lucide-react";
import { Dialog } from "radix-ui";
import { useState } from "react";
import type { Gallery } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

function usesContainedArtwork(url: string) {
  return url.includes("-clean.png") || url.includes("cad");
}

export function GalleryCarousel({ gallery }: { gallery: Gallery }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeImage = activeIndex === null ? null : gallery.images[activeIndex];

  function moveActive(direction: -1 | 1) {
    if (activeIndex === null) return;
    setActiveIndex(
      (activeIndex + direction + gallery.images.length) % gallery.images.length,
    );
  }

  if (gallery.images.length === 0) {
    return (
      <div className="grid min-h-72 place-items-center rounded-2xl border border-dashed border-white/15 bg-[linear-gradient(135deg,rgba(34,211,238,0.035),rgba(16,185,129,0.02))] p-10 text-center">
        <div>
          <p className="font-medium text-zinc-300">Gallery ready for its first story</p>
          <p className="mt-2 max-w-md text-sm leading-6 text-zinc-500">
            Upload photos, CAD, event images, or build progress from the protected dashboard.
          </p>
        </div>
      </div>
    );
  }

  return (
    <Dialog.Root
      open={activeIndex !== null}
      onOpenChange={(open) => !open && setActiveIndex(null)}
    >
      <div className="grid auto-rows-[210px] gap-3 sm:auto-rows-[260px] sm:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[190px]">
        {gallery.images.map((image, index) => {
          const featured = index === 0;
          const wide = index > 0 && index % 5 === 0;
          const contain = usesContainedArtwork(image.url);

          return (
            <button
              key={image.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={cn(
                "group relative overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0b1114] text-left shadow-[0_20px_50px_rgba(0,0,0,0.18)] transition duration-300 hover:-translate-y-1 hover:border-cyan-300/30 hover:shadow-[0_28px_70px_rgba(0,0,0,0.35)]",
                featured && "sm:col-span-2 lg:col-span-7 lg:row-span-2",
                !featured && !wide && "lg:col-span-5",
                wide && "sm:col-span-2 lg:col-span-12",
              )}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(34,211,238,0.08),transparent_42%)]" />
              <Image
                src={image.url}
                alt={image.alt}
                fill
                sizes={featured ? "(max-width: 1024px) 100vw, 58vw" : "(max-width: 1024px) 100vw, 42vw"}
                className={cn(
                  "transition duration-700 group-hover:scale-[1.025]",
                  contain
                    ? "object-contain p-7 drop-shadow-[0_22px_30px_rgba(0,0,0,0.42)] sm:p-10"
                    : "object-cover",
                )}
                priority={index === 0}
              />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-black/90 via-black/45 to-transparent p-5 pt-16">
                <div>
                  <p className="text-sm font-semibold text-white sm:text-base">
                    {image.caption ?? image.alt}
                  </p>
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.15em] text-zinc-400">
                    {String(index + 1).padStart(2, "0")} / {String(gallery.images.length).padStart(2, "0")}
                  </p>
                </div>
                <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-white/15 bg-black/45 text-white backdrop-blur transition group-hover:border-cyan-300/35 group-hover:text-cyan-200">
                  <Expand className="size-4" />
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/92 backdrop-blur-xl" />
        <Dialog.Content
          className="fixed inset-3 z-50 overflow-hidden rounded-2xl border border-white/10 bg-[#070b0d] shadow-[0_40px_140px_rgba(0,0,0,0.75)] sm:inset-6"
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") moveActive(-1);
            if (event.key === "ArrowRight") moveActive(1);
          }}
        >
          <Dialog.Title className="sr-only">
            {activeImage?.caption ?? activeImage?.alt}
          </Dialog.Title>
          {activeImage ? (
            <div className="grid size-full grid-rows-[1fr_auto]">
              <div className="relative min-h-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_30%,rgba(34,211,238,0.08),transparent_45%)]" />
                <Image
                  src={activeImage.url}
                  alt={activeImage.alt}
                  fill
                  sizes="100vw"
                  className={cn(
                    usesContainedArtwork(activeImage.url)
                      ? "object-contain p-8 drop-shadow-[0_26px_38px_rgba(0,0,0,0.5)] sm:p-14"
                      : "object-contain",
                  )}
                  priority
                />
              </div>
              <div className="flex items-center justify-between gap-4 border-t border-white/[0.08] bg-[#0a0f12] px-4 py-3 sm:px-6">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">
                    {activeImage.caption ?? activeImage.alt}
                  </p>
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-zinc-600">
                    {activeIndex! + 1} of {gallery.images.length} · {gallery.name}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <Button variant="secondary" size="icon" onClick={() => moveActive(-1)} aria-label="Previous image">
                    <ArrowLeft className="size-4" />
                  </Button>
                  <Button variant="secondary" size="icon" onClick={() => moveActive(1)} aria-label="Next image">
                    <ArrowRight className="size-4" />
                  </Button>
                  <Dialog.Close asChild>
                    <Button variant="secondary" size="icon" aria-label="Close gallery">
                      <X className="size-4" />
                    </Button>
                  </Dialog.Close>
                </div>
              </div>
            </div>
          ) : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
