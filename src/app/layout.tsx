import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthShell } from "@/components/auth-shell";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Jacob White · Mechanical Engineer & Robotics Builder",
    template: "%s · Jacob White",
  },
  description:
    "Portfolio of Jacob White: UT San Antonio mechanical engineering Honors student, Siemens technical engineering intern lead, and founder-president of 210 Robotics.",
  keywords: [
    "Jacob White",
    "mechanical engineering",
    "robotics",
    "CAD",
    "Siemens",
    "UT San Antonio",
    "autonomous systems",
    "digital twins",
    "manufacturing",
  ],
  authors: [{ name: "Jacob White" }],
  creator: "Jacob White",
  openGraph: {
    type: "website",
    title: "Jacob White · Mechanical Engineer & Robotics Builder",
    description:
      "Robotics, CAD, simulation, manufacturing, industrial software, and engineering leadership.",
    url: siteUrl,
    siteName: "Jacob White Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jacob White · Mechanical Engineer & Robotics Builder",
    description:
      "Robotics, CAD, simulation, manufacturing, industrial software, and engineering leadership.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080b0d",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark`}
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <AuthShell
          publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
        >
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </AuthShell>
      </body>
    </html>
  );
}
