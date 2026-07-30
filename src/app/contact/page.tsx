import type { Metadata } from "next";
import { ArrowUpRight, BriefcaseBusiness, Code2, Mail } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { SectionHeading } from "@/components/section-heading";
import { Card } from "@/components/ui/card";
import { getSiteSettings, getSocialLinks } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Jacob White about engineering, robotics, research, or collaboration.",
};

export const revalidate = 300;

export default async function ContactPage() {
  const [settings, socials] = await Promise.all([
    getSiteSettings(),
    getSocialLinks(),
  ]);
  const linkedin = socials.find((link) => link.kind === "linkedin");
  const github = socials.find((link) => link.kind === "github");

  return (
    <section className="engineering-grid min-h-screen">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
        <SectionHeading
          as="h1"
          eyebrow="Contact"
          title="Bring the problem worth solving."
          description="Engineering projects, research collaborations, robotics programs, speaking, and technical opportunities are all welcome."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
          <div className="grid content-start gap-4">
            <ContactLink
              href={`mailto:${settings.contactEmail}`}
              icon={Mail}
              label="Email"
              value={settings.contactEmail}
            />
            {linkedin ? (
              <ContactLink
                href={linkedin.url}
                icon={BriefcaseBusiness}
                label="LinkedIn"
                value="Connect professionally"
              />
            ) : null}
            {github ? (
              <ContactLink
                href={github.url}
                icon={Code2}
                label="GitHub"
                value="View public code"
              />
            ) : null}
            <p className="px-1 pt-3 text-sm leading-6 text-zinc-600">
              Based between San Antonio and the Houston area. Available for
              remote and in-person collaboration.
            </p>
          </div>
          <Card className="p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-white">Send a note</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-500">
              Include a little context and the most useful next step.
            </p>
            <div className="mt-7">
              <ContactForm />
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

function ContactLink({
  href,
  icon: Icon,
  label,
  value,
}: {
  href: string;
  icon: typeof Mail;
  label: string;
  value: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
    >
      <Card className="group flex items-center gap-4 p-5 transition-colors hover:border-teal-400/30">
        <span className="grid size-10 place-items-center rounded-md bg-white/[0.05] text-zinc-400 group-hover:text-teal-400">
          <Icon className="size-5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-600">
            {label}
          </span>
          <span className="mt-1 block truncate text-sm font-medium text-zinc-200">
            {value}
          </span>
        </span>
        <ArrowUpRight className="size-4 text-zinc-700 group-hover:text-teal-400" />
      </Card>
    </a>
  );
}
