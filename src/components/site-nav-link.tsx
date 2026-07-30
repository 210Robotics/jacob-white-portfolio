"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function SiteNavLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative px-1.5 py-2 text-[13px] font-medium text-zinc-400 transition-colors hover:text-white after:absolute after:inset-x-1.5 after:-bottom-[14px] after:h-px after:origin-center after:scale-x-0 after:bg-teal-400 after:transition-transform hover:after:scale-x-100",
        active && "text-white after:scale-x-100",
        className,
      )}
    >
      {children}
    </Link>
  );
}
