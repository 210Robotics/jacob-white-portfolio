import type { Metadata } from "next";
import { SignIn } from "@clerk/nextjs";
import { isAuthConfigured } from "@/lib/auth";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Admin sign in",
  robots: { index: false, follow: false },
};

export default function SignInPage() {
  return (
    <section className="engineering-grid grid min-h-[calc(100svh-4rem)] place-items-center px-5 py-16">
      {isAuthConfigured() ? (
        <SignIn routing="path" path="/sign-in" />
      ) : (
        <Card className="max-w-lg p-8">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-orange-400">
            Setup required
          </p>
          <h1 className="mt-4 text-2xl font-semibold text-white">
            Admin authentication is ready for Clerk.
          </h1>
          <p className="mt-4 leading-7 text-zinc-400">
            Add the Clerk publishable and secret keys plus Jacob&apos;s allowed
            user ID or email in Vercel. No password is stored in this codebase.
          </p>
        </Card>
      )}
    </section>
  );
}
