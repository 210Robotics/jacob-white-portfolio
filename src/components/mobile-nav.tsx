"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Dialog } from "radix-ui";
import { Button } from "./ui/button";

const links = [
  ["Work", "/projects"],
  ["About", "/about"],
  ["Experience", "/experience"],
  ["Research", "/research"],
  ["Notes", "/blog"],
  ["Gallery", "/gallery"],
  ["Résumé", "/resume"],
  ["Contact", "/contact"],
  ["Admin", "/admin"],
];

export function MobileNav() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open navigation">
          <Menu className="size-5" />
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" />
        <Dialog.Content className="fixed inset-y-0 right-0 z-50 w-[min(88vw,380px)] border-l border-white/10 bg-[#080b0d] p-6 shadow-2xl">
          <div className="flex items-center justify-between">
            <Dialog.Title className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-400">
              Navigate
            </Dialog.Title>
            <Dialog.Close asChild>
              <Button variant="ghost" size="icon" aria-label="Close navigation">
                <X className="size-5" />
              </Button>
            </Dialog.Close>
          </div>
          <nav className="mt-10 grid gap-1">
            {links.map(([label, href], index) => (
              <Dialog.Close asChild key={href}>
                <Link
                  href={href}
                  className="flex items-center justify-between border-b border-white/[0.07] py-4 text-lg font-medium text-zinc-200 transition-colors hover:text-teal-300"
                >
                  <span>{label}</span>
                  <span className="font-mono text-xs text-zinc-700">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </Link>
              </Dialog.Close>
            ))}
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
