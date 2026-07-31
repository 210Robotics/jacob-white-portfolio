import type { Metadata } from "next";
import { GalleryCarousel } from "@/components/gallery-carousel";
import { getGalleries } from "@/lib/data";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Scrollable galleries of robot CAD, engineering builds, events, and project development.",
};

export const revalidate = 300;

export default async function GalleryPage() {
  const galleries = await getGalleries();

  return (
    <section className="engineering-grid min-h-screen">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="grid gap-8 border-b border-white/[0.08] pb-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <h1 className="text-balance text-4xl font-medium tracking-[-0.055em] text-white sm:text-6xl">
            Engineering is
            <span className="block bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">
              worth seeing up close.
            </span>
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-zinc-400 lg:justify-self-end">
            CAD, mechanisms, competition robots, prototypes, events, and the
            people behind them. Select any image for a clean full-screen view.
          </p>
        </div>
        <div className="mt-16 grid gap-24">
          {galleries.map((gallery, index) => (
            <section key={gallery.id} aria-labelledby={`gallery-${gallery.id}`}>
              <div className="mb-8 flex items-start gap-5">
                <span className="mt-1 font-mono text-xs text-cyan-300/60">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2
                    id={`gallery-${gallery.id}`}
                    className="text-2xl font-semibold tracking-tight text-white"
                  >
                    {gallery.name}
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
                    {gallery.description}
                  </p>
                </div>
              </div>
              <GalleryCarousel gallery={gallery} />
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
