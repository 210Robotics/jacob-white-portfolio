import Link from "next/link";
import { BrandMark } from "./brand-mark";
import { MobileNav } from "./mobile-nav";

const links = [
  ["About", "/about"],
  ["Experience", "/experience"],
  ["Projects", "/projects"],
  ["Research", "/research"],
  ["Blog", "/blog"],
  ["Gallery", "/gallery"],
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/8 bg-zinc-950/88 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="group flex items-center gap-3"
          aria-label="Jacob White home"
        >
          <BrandMark />
          <span className="hidden leading-tight sm:block">
            <span className="block text-sm font-semibold text-white">
              Jacob White
            </span>
            <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-500 group-hover:text-orange-400">
              Engineer · Builder
            </span>
          </span>
        </Link>
        <nav className="hidden items-center gap-5 md:flex" aria-label="Primary">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
            >
              {label}
            </Link>
          ))}
          <Link
            href="/resume"
            className="rounded-md border border-white/12 px-3 py-2 text-sm font-semibold text-zinc-200 transition-colors hover:border-orange-400/50 hover:text-orange-400"
          >
            Résumé
          </Link>
          <Link
            href="/contact"
            className="rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-zinc-950 transition-colors hover:bg-orange-400"
          >
            Contact
          </Link>
        </nav>
        <MobileNav />
      </div>
    </header>
  );
}
