import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getSocialLinks } from "@/lib/data";
import { BrandMark } from "./brand-mark";

export async function SiteFooter() {
  const socials = await getSocialLinks();

  return (
    <footer className="border-t border-white/8 bg-zinc-950">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <BrandMark />
            <span className="font-semibold text-white">Jacob White</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-6 text-zinc-500">
            Mechanical engineering, robotics, industrial software, and the
            discipline to turn an ambitious idea into a working system.
          </p>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-600">
            Explore
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            {[
              ["Projects", "/projects"],
              ["Research", "/research"],
              ["Experience", "/experience"],
              ["Gallery", "/gallery"],
              ["Blog", "/blog"],
              ["Admin", "/admin"],
            ].map(([label, href]) => (
              <Link key={href} href={href} className="text-zinc-400 hover:text-white">
                {label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-600">
            Elsewhere
          </p>
          <div className="mt-4 grid gap-3">
            {socials.slice(0, 4).map((social) => (
              <a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-sm text-zinc-400 hover:text-white"
              >
                {social.label}
                <ArrowUpRight className="size-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/6">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 font-mono text-[11px] uppercase tracking-[0.12em] text-zinc-700 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <span>© {new Date().getFullYear()} Jacob White</span>
          <span>Built for iteration</span>
        </div>
      </div>
    </footer>
  );
}
