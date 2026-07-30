import type { Metadata } from "next";
import { Download, FileText } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getResumeFiles } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Résumé",
  description:
    "Download and preview Jacob White's current mechanical engineering résumé.",
};

export const revalidate = 300;

export default async function ResumePage() {
  const files = await getResumeFiles();
  const active = files.find((file) => file.active) ?? files[0];
  const archive = files.filter((file) => file.id !== active?.id);

  return (
    <section className="engineering-grid min-h-screen">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            as="h1"
            eyebrow="Résumé"
            title="Current experience, one download."
            description="The dashboard can replace the active file, preserve prior versions, and update version metadata without changing site code."
          />
          {active ? (
            <Button asChild size="lg" className="w-fit">
              <a href={active.url} download={active.filename}>
                Download PDF <Download className="size-4" />
              </a>
            </Button>
          ) : null}
        </div>

        {active ? (
          <div className="mt-12">
            <Card className="mb-5 flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <span className="grid size-11 place-items-center rounded-md bg-teal-500/10 text-teal-400">
                  <FileText className="size-5" />
                </span>
                <div>
                  <p className="font-semibold text-white">{active.version}</p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.13em] text-zinc-600">
                    {active.filename} · {formatDate(active.uploadedAt)}
                  </p>
                </div>
              </div>
              <span className="w-fit rounded-full border border-teal-400/20 bg-teal-400/[0.07] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-teal-300">
                Active version
              </span>
            </Card>
            <div className="overflow-hidden rounded-xl border border-white/10 bg-white">
              <object
                data={active.url}
                type="application/pdf"
                className="h-[78svh] min-h-[620px] w-full"
                aria-label={`Preview of ${active.filename}`}
              >
                <div className="p-8 text-zinc-900">
                  PDF preview is not supported in this browser.{" "}
                  <a className="underline" href={active.url}>
                    Open the résumé.
                  </a>
                </div>
              </object>
            </div>
          </div>
        ) : (
          <Card className="mt-12 border-dashed p-12 text-center">
            <p className="font-medium text-zinc-200">Résumé upload pending</p>
            <p className="mt-2 text-sm text-zinc-500">
              Jacob can publish the first version from the protected dashboard.
            </p>
          </Card>
        )}

        {archive.length ? (
          <div className="mt-12">
            <h2 className="text-xl font-semibold text-white">Version archive</h2>
            <div className="mt-4 grid gap-3">
              {archive.map((file) => (
                <a
                  key={file.id}
                  href={file.url}
                  className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] p-4 text-sm text-zinc-400 hover:border-white/20 hover:text-white"
                >
                  <span>{file.version}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em]">
                    {formatDate(file.uploadedAt)}
                  </span>
                </a>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
