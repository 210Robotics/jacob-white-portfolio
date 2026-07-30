import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "About",
  description:
    "Background, engineering philosophy, skills, and leadership experience of Jacob White.",
};

const software = [
  {
    label: "CAD / PLM",
    items: [
      "Designcenter X",
      "NX",
      "CATIA",
      "SolidWorks",
      "Inventor",
      "Fusion 360",
      "Creo",
      "Onshape",
      "AutoCAD",
      "Revit",
    ],
  },
  {
    label: "Simulation / CAE",
    items: [
      "STAR-CCM+",
      "M-Star CFD",
      "FLOEFD",
      "Simcenter 3D",
      "Simcenter Amesim",
      "Altair Inspire",
      "Altair HyperWorks",
      "CFD",
      "FEA",
      "Digital twins",
    ],
  },
  {
    label: "Robotics / manufacturing",
    items: [
      "Autonomy",
      "AI vision",
      "Controls",
      "FANUC robotics",
      "CNC",
      "CAM",
      "Additive manufacturing",
      "Pneumatics",
      "Hydraulics",
      "DFM",
    ],
  },
  {
    label: "Programming",
    items: [
      "C++",
      "Python",
      "Java",
      "C#",
      "JavaScript",
      "TypeScript",
      "LabVIEW",
      "Mendix",
    ],
  },
];

const principles = [
  [
    "Design for the full lifecycle",
    "A mechanism must be manufacturable, testable, serviceable, and understandable to the next person.",
  ],
  [
    "Model before expensive mistakes",
    "Simulation is most valuable when it sharpens a decision, exposes an assumption, or improves the physical test.",
  ],
  [
    "Lead through technical clarity",
    "Good teams move faster when ownership, interfaces, evidence, and the next decision are visible.",
  ],
];

export default function AboutPage() {
  return (
    <>
      <section className="engineering-grid border-b border-white/8">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <SectionHeading
            eyebrow="About Jacob"
            title="An engineer who is happiest at the interfaces."
            description="Mechanical and software. CAD and the shop floor. Simulation and test. Technical detail and team leadership. Jacob's work lives where those disciplines have to agree."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {[
              ["UT San Antonio", "Honors mechanical engineering · 3.92 GPA"],
              ["Siemens DISW", "Technical engineering intern lead"],
              ["210 Robotics", "Founder & president"],
            ].map(([title, detail]) => (
              <Card key={title} className="p-5">
                <p className="font-semibold text-white">{title}</p>
                <p className="mt-2 text-sm leading-6 text-zinc-500">{detail}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:py-32">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-orange-400">
            The short version
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white">
            Builder first. Systems thinker always.
          </h2>
        </div>
        <div className="space-y-6 text-lg leading-8 text-zinc-400">
          <p>
            Jacob White is a mechanical engineering Honors student at UT San
            Antonio with more than ten years of CAD experience and a background
            spanning robotics, manufacturing, digital media, simulation, and
            industrial software.
          </p>
          <p>
            At Siemens Digital Industries Software, he leads technical
            engineering and software-development initiatives, mentors intern
            teammates, and works with Mendix, Xcelerator, CAD/CAE, and
            system-modeling workflows. At UT San Antonio, he founded 210
            Robotics and serves as president.
          </p>
          <p>
            He also served as student ambassador and technical mentor for the
            RoboRowdy team—the 2026 global winner of the Siemens Immersive
            Design Challenge. Earlier, he spent four seasons with FRC Team 624
            as a design lead, build lead, and visual-media president.
          </p>
        </div>
      </section>

      <section className="border-y border-white/8 bg-zinc-900/35">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
          <SectionHeading
            eyebrow="Technical range"
            title="Deep CAD roots. Broad engineering reach."
            description="Tools matter when they shorten the path from question to evidence. This stack reflects hands-on work across product development, simulation, manufacturing, robotics, and software."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {software.map((group) => (
              <Card key={group.label} className="p-6">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-teal-400">
                  {group.label}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Badge key={item}>{item}</Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
        <SectionHeading
          eyebrow="Engineering principles"
          title="How the work gets done."
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {principles.map(([title, detail], index) => (
            <Card key={title} className="p-6">
              <span className="font-mono text-xs text-zinc-700">
                {String(index + 1).padStart(2, "0")}
              </span>
              <CheckCircle2 className="mt-8 size-5 text-orange-400" />
              <h3 className="mt-5 text-lg font-semibold text-white">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-500">{detail}</p>
            </Card>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/experience">
              Experience timeline <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/resume">Download résumé</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
