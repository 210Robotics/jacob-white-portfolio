import type { Metadata } from "next";
import { GalleryCarousel } from "@/components/gallery-carousel";
import { SectionHeading } from "@/components/section-heading";
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
        <SectionHeading
          as="h1"
          eyebrow="Gallery"
          title="The work is better up close."
          description="Horizontal, touch-friendly galleries for CAD, prototypes, competition moments, shop work, and the people behind the machine."
        />
        <div className="mt-16 grid gap-20">
          {galleries.map((gallery, index) => (
            <section key={gallery.id} aria-labelledby={`gallery-${gallery.id}`}>
              <div className="mb-7 flex items-start gap-5">
                <span className="mt-1 font-mono text-xs text-zinc-700">
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
