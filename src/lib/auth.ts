import "server-only";

import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export function isAuthConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
      process.env.CLERK_SECRET_KEY &&
      (process.env.ADMIN_USER_ID || process.env.ADMIN_EMAIL),
  );
}

export async function requireAdmin() {
  if (!isAuthConfigured()) {
    throw new Error(
      "Admin authentication is not configured. Add Clerk keys and an ADMIN_USER_ID or ADMIN_EMAIL.",
    );
  }

  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  if (process.env.ADMIN_USER_ID && userId === process.env.ADMIN_USER_ID) {
    return { userId };
  }

  const user = await currentUser();
  const allowedEmail = process.env.ADMIN_EMAIL?.toLowerCase();
  const emailMatches = user?.emailAddresses.some(
    (email) => email.emailAddress.toLowerCase() === allowedEmail,
  );

  if (!emailMatches) redirect("/?unauthorized=1");

  return { userId };
}
