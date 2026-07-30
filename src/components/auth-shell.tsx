"use client";

import { ClerkProvider } from "@clerk/nextjs";

export function AuthShell({
  children,
  publishableKey,
}: {
  children: React.ReactNode;
  publishableKey?: string;
}) {
  if (!publishableKey) return children;

  return (
    <ClerkProvider
      publishableKey={publishableKey}
      signInUrl="/sign-in"
      appearance={{
        variables: {
          colorPrimary: "#f97316",
          colorBackground: "#111113",
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}
