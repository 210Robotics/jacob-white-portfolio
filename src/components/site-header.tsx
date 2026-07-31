import Link from "next/link";
import { BrandMark } from "./brand-mark";
import { MobileNav } from "./mobile-nav";
import { SiteNavLink } from "./site-nav-link";

const links = [
  ["Work", "/projects"],
  ["About", "/about"],
  ["Experience", "/experience"],
  ["Research", "/research"],
  ["Skills", "/skills"],
  ["Blog", "/blog"],
  ["Gallery", "/gallery"],
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.07] bg-[#080b0d]/88 backdrop-blur-xl">
      <div className="mx-auto flex h-[68px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-14">
        <Link href="/" className="group flex items-center gap-3" aria-label="Jacob White home">
          <BrandMark />
          <span className="hidden leading-tight sm:block">
            <span className="block text-sm font-semibold tracking-[-0.015em] text-white">
              Jacob White
            </span>
            <span className="block text-[10px] uppercase tracking-[0.14em] text-zinc-600 transition-colors group-hover:text-teal-400">
              Mechanical Engineer
            </span>
          </span>
        </Link>
        <nav className="hidden items-center gap-4 lg:flex" aria-label="Primary">
          {links.map(([label, href]) => (
            <SiteNavLink key={href} href={href}>
              {label}
            </SiteNavLink>
          ))}
          <SiteNavLink
            href="/resume"
            className="after:hidden rounded-lg border border-white/[0.12] px-3.5 py-2 font-semibold text-zinc-200 hover:border-teal-300/35 hover:text-teal-300 aria-[current=page]:border-teal-300/35 aria-[current=page]:text-teal-300"
          >
            Résumé
          </SiteNavLink>
          <Link
            href="/contact"
            className="rounded-lg bg-gradient-to-r from-cyan-400 to-emerald-300 px-3.5 py-2 text-[13px] font-semibold text-[#04110f] shadow-[0_8px_28px_rgba(34,211,238,0.14)] transition-[transform,filter] hover:-translate-y-0.5 hover:brightness-110"
          >
            Contact
          </Link>
          <SiteNavLink
            href="/admin"
            className="after:hidden text-zinc-600 hover:text-teal-300 aria-[current=page]:text-teal-300"
          >
            Admin
          </SiteNavLink>
        </nav>
        <MobileNav />
      </div>
    </header>
  );
}
