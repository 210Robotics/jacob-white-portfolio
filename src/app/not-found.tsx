import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="engineering-grid grid min-h-[70svh] place-items-center px-5 py-20 text-center">
      <div>
        <p className="font-mono text-sm uppercase tracking-[0.2em] text-teal-400">
          404 / path not found
        </p>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white">
          This assembly is not in the model.
        </h1>
        <p className="mx-auto mt-4 max-w-lg leading-7 text-zinc-500">
          The page may have moved, been archived, or not been published yet.
        </p>
        <Button asChild className="mt-8">
          <Link href="/">
            <ArrowLeft className="size-4" /> Return home
          </Link>
        </Button>
      </div>
    </section>
  );
}
