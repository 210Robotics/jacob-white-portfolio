"use client";

import { useEffect } from "react";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="engineering-grid grid min-h-[70svh] place-items-center px-5 py-20 text-center">
      <div>
        <p className="font-mono text-sm uppercase tracking-[0.2em] text-teal-400">
          System interruption
        </p>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white">
          Something in this flow needs another pass.
        </h1>
        <p className="mx-auto mt-4 max-w-lg leading-7 text-zinc-500">
          Retry the page. If the issue continues, the public seed content will
          remain available while the data connection is checked.
        </p>
        <Button type="button" onClick={reset} className="mt-8">
          <RotateCcw className="size-4" /> Try again
        </Button>
      </div>
    </section>
  );
}
