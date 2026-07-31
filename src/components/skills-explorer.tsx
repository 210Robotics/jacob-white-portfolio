"use client";

import { Award, Check, Gauge, Layers3, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import type { Certification, Skill } from "@/lib/types";
import { cn } from "@/lib/utils";

type Tab = "skills" | "certifications";

export function SkillsExplorer({
  skills,
  certifications,
}: {
  skills: Skill[];
  certifications: Certification[];
}) {
  const [tab, setTab] = useState<Tab>("skills");
  const [category, setCategory] = useState("All");
  const [selectedSkillId, setSelectedSkillId] = useState(skills[0]?.id ?? "");
  const [selectedCertificationId, setSelectedCertificationId] = useState(
    certifications[0]?.id ?? "",
  );
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(skills.map((skill) => skill.category)))],
    [skills],
  );
  const visibleSkills =
    category === "All"
      ? skills
      : skills.filter((skill) => skill.category === category);
  const selectedSkill =
    skills.find((skill) => skill.id === selectedSkillId) ?? visibleSkills[0];
  const selectedCertification =
    certifications.find((item) => item.id === selectedCertificationId) ??
    certifications[0];

  return (
    <div>
      <div
        className="inline-flex rounded-xl border border-white/10 bg-white/[0.035] p-1"
        role="tablist"
        aria-label="Skills and certifications"
      >
        <button
          type="button"
          role="tab"
          aria-selected={tab === "skills"}
          onClick={() => setTab("skills")}
          className={cn(
            "rounded-lg px-4 py-2.5 text-sm font-semibold transition",
            tab === "skills"
              ? "bg-white text-zinc-950"
              : "text-zinc-500 hover:text-white",
          )}
        >
          Skills · {skills.length}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "certifications"}
          onClick={() => setTab("certifications")}
          className={cn(
            "rounded-lg px-4 py-2.5 text-sm font-semibold transition",
            tab === "certifications"
              ? "bg-white text-zinc-950"
              : "text-zinc-500 hover:text-white",
          )}
        >
          Certifications · {certifications.length}
        </button>
      </div>

      {tab === "skills" ? (
        <div className="mt-10">
          <div className="flex gap-2 overflow-x-auto pb-2" aria-label="Skill categories">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setCategory(item);
                  const first =
                    item === "All"
                      ? skills[0]
                      : skills.find((skill) => skill.category === item);
                  if (first) setSelectedSkillId(first.id);
                }}
                className={cn(
                  "shrink-0 rounded-full border px-3.5 py-2 text-xs font-semibold transition",
                  category === item
                    ? "border-cyan-300/40 bg-cyan-300/10 text-cyan-100"
                    : "border-white/10 text-zinc-500 hover:border-white/20 hover:text-white",
                )}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="mt-7 grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
            <div className="grid content-start gap-2 sm:grid-cols-2">
              {visibleSkills.map((skill) => (
                <button
                  key={skill.id}
                  type="button"
                  onMouseEnter={() => setSelectedSkillId(skill.id)}
                  onFocus={() => setSelectedSkillId(skill.id)}
                  onClick={() => setSelectedSkillId(skill.id)}
                  className={cn(
                    "group rounded-xl border p-4 text-left transition duration-300",
                    selectedSkill?.id === skill.id
                      ? "border-cyan-300/35 bg-gradient-to-br from-cyan-300/[0.11] to-emerald-300/[0.045]"
                      : "border-white/[0.08] bg-white/[0.025] hover:-translate-y-0.5 hover:border-white/20",
                  )}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-semibold text-zinc-100">{skill.name}</span>
                    <span className="font-mono text-[10px] text-zinc-600">
                      {skill.proficiency}%
                    </span>
                  </div>
                  <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/[0.07]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-300 transition-all duration-500"
                      style={{ width: `${skill.proficiency}%` }}
                    />
                  </div>
                  <p className="mt-3 text-xs text-zinc-600">{skill.category}</p>
                </button>
              ))}
            </div>

            {selectedSkill ? (
              <aside className="h-fit rounded-2xl border border-cyan-300/20 bg-[#0c1317] p-6 shadow-[0_28px_80px_rgba(0,0,0,0.35)] lg:sticky lg:top-28">
                <div className="flex items-center justify-between">
                  <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-emerald-300/10 text-cyan-200">
                    <Gauge className="size-5" />
                  </span>
                  <span className="font-mono text-xs text-cyan-200">
                    {selectedSkill.proficiency}% proficiency
                  </span>
                </div>
                <h2 className="mt-8 text-2xl font-semibold tracking-[-0.035em] text-white">
                  {selectedSkill.name}
                </h2>
                <p className="mt-4 leading-7 text-zinc-400">
                  {selectedSkill.description}
                </p>
                <div className="mt-7 border-t border-white/[0.08] pt-6">
                  <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-600">
                    <Layers3 className="size-4 text-emerald-300" /> Where it came from
                  </p>
                  <p className="mt-3 text-sm leading-6 text-zinc-400">
                    {selectedSkill.learnedFrom}
                  </p>
                </div>
                <div className="mt-6 grid gap-2">
                  {selectedSkill.evidence.map((item) => (
                    <div key={item} className="flex gap-2 text-sm text-zinc-500">
                      <Check className="mt-0.5 size-4 shrink-0 text-cyan-300" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </aside>
            ) : null}
          </div>
        </div>
      ) : (
        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div className="grid content-start gap-3 sm:grid-cols-2">
            {certifications.map((certification) => (
              <button
                key={certification.id}
                type="button"
                onMouseEnter={() => setSelectedCertificationId(certification.id)}
                onFocus={() => setSelectedCertificationId(certification.id)}
                onClick={() => setSelectedCertificationId(certification.id)}
                className={cn(
                  "rounded-xl border p-5 text-left transition duration-300",
                  selectedCertification?.id === certification.id
                    ? "border-emerald-300/35 bg-emerald-300/[0.07]"
                    : "border-white/[0.08] bg-white/[0.025] hover:-translate-y-0.5 hover:border-white/20",
                )}
              >
                <Award className="size-5 text-emerald-300" />
                <h2 className="mt-8 font-semibold leading-6 text-white">
                  {certification.name}
                </h2>
                <p className="mt-2 text-sm text-zinc-600">
                  {certification.issuer}
                </p>
              </button>
            ))}
          </div>

          {selectedCertification ? (
            <aside className="h-fit rounded-2xl border border-emerald-300/20 bg-[#0c1317] p-6 shadow-[0_28px_80px_rgba(0,0,0,0.35)] lg:sticky lg:top-28">
              <Sparkles className="size-5 text-emerald-300" />
              <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.17em] text-zinc-600">
                {selectedCertification.issuer} · {selectedCertification.issued}
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.035em] text-white">
                {selectedCertification.name}
              </h2>
              <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.17em] text-emerald-300/70">
                What it validates
              </p>
              <p className="mt-4 leading-7 text-zinc-400">
                {selectedCertification.description}
              </p>
              <div className="mt-7 flex flex-wrap gap-2 border-t border-white/[0.08] pt-6">
                {selectedCertification.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-zinc-400"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              {selectedCertification.credentialUrl ? (
                <a
                  href={selectedCertification.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex text-sm font-semibold text-emerald-300 hover:text-emerald-200"
                >
                  View credential
                </a>
              ) : null}
            </aside>
          ) : null}
        </div>
      )}
    </div>
  );
}
