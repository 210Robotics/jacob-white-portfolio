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
  const activeImage = gallery.images.find((image) => image.id === activeImageId);

  function scroll(direction: -1 | 1) {
    trackRef.current?.scrollBy({
      left: direction * Math.min(trackRef.current.clientWidth * 0.8, 680),
      behavior: "smooth",
    });
  }

  if (gallery.images.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-white/15 bg-white/[0.02] p-10 text-center">
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
          className="gallery-track flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3"
        >
          {gallery.images.map((image) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setActiveImageId(image.id)}
              className="group relative aspect-[4/3] w-[82vw] max-w-[620px] shrink-0 snap-start overflow-hidden rounded-2xl border border-white/10 bg-[#d7dbdc] text-left transition-colors hover:border-teal-300/35 sm:w-[64vw]"
            >
              <Image
                src={image.url}
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 82vw, 620px"
                className="object-contain p-3 transition duration-500 group-hover:scale-[1.012]"
              />
              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-black/75 p-4 text-sm text-zinc-200">
                <span>{image.caption ?? image.alt}</span>
                <Expand className="size-4 shrink-0 text-zinc-400" />
              </span>
            </button>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          <Button
            type="button"
            variant="secondary"
            size="icon"
            onClick={() => scroll(-1)}
            aria-label={`Scroll ${gallery.name} backward`}
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="icon"
            onClick={() => scroll(1)}
            aria-label={`Scroll ${gallery.name} forward`}
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md" />
        <Dialog.Content className="fixed inset-4 z-50 grid place-items-center sm:inset-8">
          <Dialog.Title className="sr-only">
            {activeImage?.caption ?? activeImage?.alt}
          </Dialog.Title>
          {activeImage ? (
            <div className="relative size-full">
              <Image
                src={activeImage.url}
                alt={activeImage.alt}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
              <div className="absolute inset-x-0 bottom-0 flex justify-center">
                <p className="rounded-md bg-black/70 px-4 py-2 text-sm text-zinc-200">
                  {activeImage.caption ?? activeImage.alt}
                </p>
              </div>
            </div>
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
