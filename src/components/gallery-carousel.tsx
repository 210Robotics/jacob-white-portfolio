"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { Dialog } from "radix-ui";
import { useRef, useState } from "react";
import type { Gallery } from "@/lib/types";
import { Button } from "./ui/button";

export function GalleryCarousel({ gallery }: { gallery: Gallery }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeImageId, setActiveImageId] = useState<string | null>(null);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const activeIndex = gallery.images.findIndex(
    (image) => image.id === activeImageId,
  );
  const activeImage = activeIndex >= 0 ? gallery.images[activeIndex] : null;

  function scrollToIndex(index: number) {
    const track = trackRef.current;
    const item = track?.children[index] as HTMLElement | undefined;
    if (!track || !item) return;
    track.scrollTo({ left: item.offsetLeft, behavior: "smooth" });
    setVisibleIndex(index);
  }

  function scroll(direction: -1 | 1) {
    scrollToIndex(
      Math.max(0, Math.min(gallery.images.length - 1, visibleIndex + direction)),
    );
  }

  function syncVisibleIndex() {
    const track = trackRef.current;
    if (!track) return;
    const items = Array.from(track.children) as HTMLElement[];
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;
    items.forEach((item, index) => {
      const distance = Math.abs(item.offsetLeft - track.scrollLeft);
      if (distance < closestDistance) {
        closestIndex = index;
        closestDistance = distance;
      }
    });
    setVisibleIndex(closestIndex);
  }

  function moveActive(direction: -1 | 1) {
    if (activeIndex < 0) return;
    const nextIndex =
      (activeIndex + direction + gallery.images.length) % gallery.images.length;
    setActiveImageId(gallery.images[nextIndex].id);
  }

  if (gallery.images.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-10 text-center">
        <p className="font-medium text-zinc-300">Gallery ready for uploads</p>
        <p className="mt-2 text-sm text-zinc-500">
          Jacob can add, caption, and reorder images from the protected dashboard.
        </p>
      </div>
    );
  }

  return (
    <Dialog.Root
      open={Boolean(activeImage)}
      onOpenChange={(open) => !open && setActiveImageId(null)}
    >
      <div className="relative">
        <div
          ref={trackRef}
          onScroll={syncVisibleIndex}
          className="gallery-track flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3"
        >
          {gallery.images.map((image, index) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setActiveImageId(image.id)}
              className="group relative aspect-[4/3] w-[82vw] max-w-[620px] shrink-0 snap-start overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0c1113] text-left transition-[border-color,background] hover:border-teal-300/35 hover:bg-[#0f1618] sm:w-[64vw]"
            >
              <Image
                src={image.url}
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 82vw, 620px"
                className="object-contain p-6 drop-shadow-[0_20px_26px_rgba(0,0,0,0.35)] transition duration-500 group-hover:scale-[1.018]"
              />
              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between border-t border-white/[0.07] bg-[#080b0d]/90 p-4 text-sm text-zinc-200 backdrop-blur">
                <span>{image.caption ?? image.alt}</span>
                <span className="flex items-center gap-3 text-zinc-500">
                  <span className="font-mono text-[10px]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <Expand className="size-4 shrink-0 transition-colors group-hover:text-teal-300" />
                </span>
              </span>
            </button>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between gap-4">
          <div className="flex gap-2">
            <Button
              type="button"
              variant="secondary"
              size="icon"
              onClick={() => scroll(-1)}
              disabled={visibleIndex === 0}
              aria-label={`Scroll ${gallery.name} backward`}
            >
              <ChevronLeft className="size-4" />
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="icon"
              onClick={() => scroll(1)}
              disabled={visibleIndex === gallery.images.length - 1}
              aria-label={`Scroll ${gallery.name} forward`}
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-600">
            {visibleIndex + 1} / {gallery.images.length}
          </p>
        </div>
      </div>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md" />
        <Dialog.Content
          className="fixed inset-4 z-50 grid place-items-center sm:inset-8"
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") moveActive(-1);
            if (event.key === "ArrowRight") moveActive(1);
          }}
        >
          <Dialog.Title className="sr-only">
            {activeImage?.caption ?? activeImage?.alt}
          </Dialog.Title>
          {activeImage ? (
            <div className="relative size-full overflow-hidden rounded-2xl border border-white/[0.09] bg-[#080b0d]">
              <Image
                src={activeImage.url}
                alt={activeImage.alt}
                fill
                sizes="100vw"
                className="object-contain p-6 drop-shadow-[0_22px_30px_rgba(0,0,0,0.36)] sm:p-12"
                priority
              />
              <div className="absolute inset-x-0 bottom-4 flex justify-center px-14">
                <p className="rounded-lg border border-white/[0.08] bg-black/75 px-4 py-2 text-center text-sm text-zinc-200 backdrop-blur">
                  {activeImage.caption ?? activeImage.alt}
                </p>
              </div>
            </div>
          ) : null}
          {gallery.images.length > 1 ? (
            <>
              <Button
                type="button"
                variant="secondary"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/70 sm:left-4"
                onClick={() => moveActive(-1)}
                aria-label="Previous image"
              >
                <ChevronLeft className="size-5" />
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/70 sm:right-4"
                onClick={() => moveActive(1)}
                aria-label="Next image"
              >
                <ChevronRight className="size-5" />
              </Button>
            </>
          ) : null}
          <Dialog.Close asChild>
            <Button
              variant="secondary"
              size="icon"
              className="absolute right-0 top-0 bg-black/70"
              aria-label="Close image"
            >
              <X className="size-5" />
            </Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
