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
          colorPrimary: "#22d3ee",
          colorBackground: "#0a1013",
          borderRadius: "0.75rem",
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}
