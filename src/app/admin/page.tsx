import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import {
  ArrowDown,
  ArrowUp,
  Award,
  CheckCircle2,
  CircleAlert,
  Database,
  ExternalLink,
  FileUp,
  ImagePlus,
  Gauge,
  LockKeyhole,
  Plus,
  Save,
  Trash2,
} from "lucide-react";
import { isDatabaseConfigured } from "@/db";
import { isAuthConfigured, requireAdmin } from "@/lib/auth";
import {
  getBlogPosts,
  getCertifications,
  getExperiences,
  getGalleries,
  getProjects,
  getResearchItems,
  getResumeFiles,
  getSkills,
  getSiteSettings,
  getSocialLinks,
} from "@/lib/data";
import type {
  BlogPost,
  Certification,
  Experience,
  Gallery,
  Project,
  ResearchItem,
  Skill,
  SocialLink,
} from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  deleteEntity,
  moveEntity,
  saveBlogPost,
  saveCertification,
  saveExperience,
  saveGallery,
  saveGalleryImage,
  saveProject,
  saveResearch,
  saveSettings,
  saveSkill,
  saveSocialLink,
  uploadGalleryImage,
  uploadResume,
} from "./actions";

export const metadata: Metadata = {
  title: "Admin dashboard",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const inputClass =
  "h-10 w-full rounded-md border border-white/12 bg-zinc-950 px-3 text-sm text-white outline-none placeholder:text-zinc-700 focus:border-teal-400/60 focus:ring-2 focus:ring-teal-500/20";
const textareaClass =
  "min-h-28 w-full rounded-md border border-white/12 bg-zinc-950 px-3 py-2.5 text-sm leading-6 text-white outline-none placeholder:text-zinc-700 focus:border-teal-400/60 focus:ring-2 focus:ring-teal-500/20";

export default async function AdminPage() {
  if (!isAuthConfigured()) {
    return <AdminSetup />;
  }

  await requireAdmin();

  const [
    settings,
    projects,
    experiences,
    research,
    posts,
    galleries,
    resumes,
    socials,
    skills,
    certifications,
  ] = await Promise.all([
    getSiteSettings(),
    getProjects(),
    getExperiences(),
    getResearchItems(),
    getBlogPosts(true),
    getGalleries(),
    getResumeFiles(),
    getSocialLinks(),
    getSkills(),
    getCertifications(),
  ]);
  const writable = isDatabaseConfigured();
  const blobReady = Boolean(process.env.BLOB_READ_WRITE_TOKEN);

  return (
    <section className="min-h-screen bg-[radial-gradient(circle_at_78%_0%,rgba(34,211,238,0.07),transparent_28rem),radial-gradient(circle_at_16%_28%,rgba(16,185,129,0.045),transparent_24rem),#070b0d]">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="flex flex-col gap-6 border-b border-white/8 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.17em] text-teal-400">
              <LockKeyhole className="size-4" />
              Protected workspace
            </div>
            <h1 className="mt-4 bg-gradient-to-r from-white via-cyan-100 to-emerald-200 bg-clip-text text-4xl font-semibold tracking-[-0.045em] text-transparent">
              Portfolio control room
            </h1>
            <p className="mt-3 max-w-2xl text-zinc-500">
              Edit, publish, reorder, upload, and archive without touching code.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button asChild variant="secondary">
              <Link href="/" target="_blank">
                View site <ExternalLink className="size-4" />
              </Link>
            </Button>
            <div className="rounded-full border border-white/10 bg-white/[0.04] p-1">
              <UserButton />
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <StatusCard
            ready={writable}
            icon={Database}
            label="Postgres"
            detail={writable ? "Connected" : "DATABASE_URL missing"}
          />
          <StatusCard
            ready={blobReady}
            icon={FileUp}
            label="Vercel Blob"
            detail={blobReady ? "Uploads enabled" : "Token missing"}
          />
          <StatusCard
            ready
            icon={LockKeyhole}
            label="Clerk"
            detail="Admin verified"
          />
        </div>

        {!writable ? (
          <Card className="mt-6 border-teal-400/25 bg-teal-400/[0.05] p-5">
            <div className="flex gap-3">
              <CircleAlert className="mt-0.5 size-5 shrink-0 text-teal-400" />
              <div>
                <p className="font-semibold text-teal-100">
                  Preview mode is read-only
                </p>
                <p className="mt-1 text-sm leading-6 text-teal-100/60">
                  Connect Neon, run the schema push and seed commands, then
                  redeploy. The forms below show exactly what will become
                  editable.
                </p>
              </div>
            </div>
          </Card>
        ) : null}

        <nav className="sticky top-16 z-30 -mx-5 mt-8 flex gap-2 overflow-x-auto border-y border-white/8 bg-zinc-950/95 px-5 py-3 backdrop-blur sm:-mx-8 sm:px-8">
          {[
            ["Home", "#home"],
            ["Projects", "#projects"],
            ["Experience", "#experience"],
            ["Research", "#research"],
            ["Skills", "#skills"],
            ["Blog", "#blog"],
            ["Galleries", "#galleries"],
            ["Résumé", "#resume"],
            ["Socials", "#socials"],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="shrink-0 rounded-md px-3 py-2 text-xs font-semibold text-zinc-500 hover:bg-white/[0.05] hover:text-white"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="grid gap-16 py-12">
          <AdminSection
            id="home"
            title="Homepage content"
            count={1}
            description="The positioning statement, hero copy, availability, and public contact email."
          >
            <Card className="p-5 sm:p-6">
              <form action={saveSettings}>
                <fieldset disabled={!writable} className="grid gap-4 disabled:opacity-60">
                  <Field label="Eyebrow" name="heroEyebrow" value={settings.heroEyebrow} />
                  <Field label="Hero title" name="heroTitle" value={settings.heroTitle} />
                  <TextArea
                    label="Professional summary"
                    name="heroSummary"
                    value={settings.heroSummary}
                  />
                  <Field
                    label="Availability"
                    name="availability"
                    value={settings.availability}
                  />
                  <Field
                    label="Contact email"
                    name="contactEmail"
                    type="email"
                    value={settings.contactEmail}
                  />
                  <div className="grid gap-4 sm:grid-cols-[120px_1fr] sm:items-end">
                    <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-white/10 bg-zinc-950">
                      <Image
                        src={settings.portraitUrl}
                        alt="Current site portrait"
                        fill
                        sizes="120px"
                        className="object-cover object-top"
                      />
                    </div>
                    <div className="grid gap-4">
                      <Field
                        label="Current portrait URL"
                        name="portraitUrl"
                        value={settings.portraitUrl}
                      />
                      <Field
                        label="Replace portrait"
                        name="portraitFile"
                        type="file"
                        accept="image/*"
                      />
                    </div>
                  </div>
                  <SaveButton />
                </fieldset>
              </form>
            </Card>
          </AdminSection>

          <AdminSection
            id="skills"
            title="Skills & certifications"
            count={skills.length + certifications.length}
            description="Proficiency, learning sources, evidence, credential context, and display order."
          >
            <div className="grid gap-8 lg:grid-cols-2">
              <div>
                <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-white">
                  <Gauge className="size-4 text-cyan-300" /> Skills
                </div>
                <EntityList
                  writable={writable}
                  entity="skill"
                  newLabel="New skill"
                  newForm={<SkillForm writable={writable} />}
                >
                  {skills.map((skill) => (
                    <SkillForm key={skill.id} skill={skill} writable={writable} />
                  ))}
                </EntityList>
              </div>
              <div>
                <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-white">
                  <Award className="size-4 text-emerald-300" /> Certifications
                </div>
                <EntityList
                  writable={writable}
                  entity="certification"
                  newLabel="New certification"
                  newForm={<CertificationForm writable={writable} />}
                >
                  {certifications.map((certification) => (
                    <CertificationForm
                      key={certification.id}
                      certification={certification}
                      writable={writable}
                    />
                  ))}
                </EntityList>
              </div>
            </div>
          </AdminSection>

          <AdminSection
            id="projects"
            title="Projects"
            count={projects.length}
            description="Featured work, categories, detail-page Markdown, toolchains, and links."
          >
            <EntityList
              writable={writable}
              entity="project"
              newLabel="New project"
              newForm={<ProjectForm writable={writable} />}
            >
              {projects.map((project) => (
                <ProjectForm key={project.id} project={project} writable={writable} />
              ))}
            </EntityList>
          </AdminSection>

          <AdminSection
            id="experience"
            title="Experience"
            count={experiences.length}
            description="Timeline roles, periods, summaries, and outcome-focused highlights."
          >
            <EntityList
              writable={writable}
              entity="experience"
              newLabel="New experience"
              newForm={<ExperienceForm writable={writable} />}
            >
              {experiences.map((item) => (
                <ExperienceForm key={item.id} item={item} writable={writable} />
              ))}
            </EntityList>
          </AdminSection>

          <AdminSection
            id="research"
            title="Research"
            count={research.length}
            description="Editable interests, active studies, topics, and future research directions."
          >
            <EntityList
              writable={writable}
              entity="research"
              newLabel="New research item"
              newForm={<ResearchForm writable={writable} />}
            >
              {research.map((item) => (
                <ResearchForm key={item.id} item={item} writable={writable} />
              ))}
            </EntityList>
          </AdminSection>

          <AdminSection
            id="blog"
            title="Blog"
            count={posts.length}
            description="Markdown posts with tags, cover images, draft/published state, and publish dates."
          >
            <EntityList
              writable={writable}
              entity="blog"
              newLabel="New post"
              newForm={<BlogForm writable={writable} />}
            >
              {posts.map((post) => (
                <BlogForm key={post.id} post={post} writable={writable} />
              ))}
            </EntityList>
          </AdminSection>

          <AdminSection
            id="galleries"
            title="Galleries"
            count={galleries.length}
            description="Named, reorderable galleries with captions and touch-friendly carousel presentation."
          >
            <EntityList
              writable={writable}
              entity="gallery"
              newLabel="New gallery"
              newForm={<GalleryForm writable={writable} />}
            >
              {galleries.map((gallery) => (
                <div key={gallery.id} className="grid gap-3">
                  <GalleryForm gallery={gallery} writable={writable} />
                  <Card className="ml-4 p-5">
                    <p className="text-sm font-semibold text-white">
                      Images · {gallery.images.length}
                    </p>
                    <fieldset
                      disabled={!writable || !blobReady}
                      className="mt-4 disabled:opacity-60"
                    >
                      <form action={uploadGalleryImage} className="grid gap-3 sm:grid-cols-2">
                        <input type="hidden" name="galleryId" value={gallery.id} />
                        <Field label="Image" name="file" type="file" accept="image/*" />
                        <Field label="Alt text" name="alt" />
                        <Field label="Caption" name="caption" />
                        <Button type="submit" variant="secondary" className="sm:w-fit">
                          <ImagePlus className="size-4" /> Upload image
                        </Button>
                      </form>
                    </fieldset>
                    {gallery.images.length ? (
                      <div className="mt-5 grid gap-3">
                        {gallery.images.map((image) => (
                          <div
                            key={image.id}
                            className="grid gap-4 rounded-xl border border-white/8 p-3 sm:grid-cols-[72px_1fr_auto] sm:items-center"
                          >
                            <div className="relative size-[72px] shrink-0 overflow-hidden rounded-lg bg-zinc-950">
                              <Image
                                src={image.url}
                                alt={image.alt}
                                fill
                                sizes="64px"
                                className="object-contain p-1"
                              />
                            </div>
                            <div className="min-w-0">
                              <p className="truncate text-sm text-zinc-300">
                                {image.caption ?? image.alt}
                              </p>
                              <p className="mt-1 truncate font-mono text-[9px] text-zinc-700">
                                {image.url}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <OrderControls
                                entity="galleryImage"
                                id={image.id}
                                galleryId={gallery.id}
                                writable={writable}
                              />
                              <DeleteControl
                                entity="galleryImage"
                                id={image.id}
                                writable={writable}
                              />
                            </div>
                            <details className="sm:col-span-3 rounded-lg border border-white/[0.07] bg-black/15 p-3">
                              <summary className="cursor-pointer text-xs font-semibold text-cyan-300">
                                Edit caption or replace image
                              </summary>
                              <form action={saveGalleryImage} className="mt-4 grid gap-3 sm:grid-cols-2">
                                <input type="hidden" name="id" value={image.id} />
                                <Field label="Replacement image" name="file" type="file" accept="image/*" />
                                <Field label="Alt text" name="alt" value={image.alt} />
                                <Field label="Caption" name="caption" value={image.caption ?? ""} />
                                <Button type="submit" variant="secondary" className="sm:w-fit">
                                  <Save className="size-4" /> Save image
                                </Button>
                              </form>
                            </details>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </Card>
                </div>
              ))}
            </EntityList>
          </AdminSection>

          <AdminSection
            id="resume"
            title="Résumé files"
            count={resumes.length}
            description="Upload a replacement PDF, make it active, and retain older versions as an archive."
          >
            <Card className="p-5 sm:p-6">
              <fieldset disabled={!writable || !blobReady} className="disabled:opacity-60">
                <form action={uploadResume} className="grid gap-4 sm:grid-cols-2">
                  <Field label="PDF file" name="file" type="file" accept="application/pdf" />
                  <Field label="Version label" name="version" placeholder="Fall 2026" />
                  <Button type="submit" className="sm:w-fit">
                    <FileUp className="size-4" /> Upload & activate
                  </Button>
                </form>
              </fieldset>
              <div className="mt-6 grid gap-3">
                {resumes.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center gap-4 rounded-md border border-white/8 p-4"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-white">
                        {file.version}
                      </p>
                      <p className="mt-1 truncate font-mono text-[10px] text-zinc-600">
                        {file.filename}
                      </p>
                    </div>
                    {file.active ? (
                      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-teal-400">
                        Active
                      </span>
                    ) : null}
                    <DeleteControl entity="resume" id={file.id} writable={writable} />
                  </div>
                ))}
              </div>
            </Card>
          </AdminSection>

          <AdminSection
            id="socials"
            title="Social links"
            count={socials.length}
            description="Public professional profiles shown in the footer and contact page."
          >
            <EntityList
              writable={writable}
              entity="social"
              newLabel="New social link"
              newForm={<SocialForm writable={writable} />}
            >
              {socials.map((link) => (
                <SocialForm key={link.id} link={link} writable={writable} />
              ))}
            </EntityList>
          </AdminSection>
        </div>
      </div>
    </section>
  );
}

function AdminSetup() {
  return (
    <section className="engineering-grid grid min-h-[calc(100svh-4rem)] place-items-center px-5 py-16">
      <Card className="max-w-2xl p-8 sm:p-10">
        <LockKeyhole className="size-6 text-teal-400" />
        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-white">
          The dashboard is built and waiting for its owner.
        </h1>
        <p className="mt-4 leading-7 text-zinc-400">
          Connect Clerk to enable sign-in. Access is restricted to
          jmwhite407@gmail.com unless an ADMIN_USER_ID override is configured.
        </p>
        <ol className="mt-6 grid gap-3 text-sm leading-6 text-zinc-500">
          <li>1. Add Clerk through the Vercel Marketplace.</li>
          <li>2. Create the Clerk account for jmwhite407@gmail.com.</li>
          <li>3. Redeploy, then sign in at /sign-in.</li>
        </ol>
      </Card>
    </section>
  );
}

function StatusCard({
  ready,
  icon: Icon,
  label,
  detail,
}: {
  ready: boolean;
  icon: typeof Database;
  label: string;
  detail: string;
}) {
  return (
    <Card className="flex items-center gap-3 p-4">
      <span
        className={
          ready
            ? "grid size-9 place-items-center rounded-md bg-teal-400/10 text-teal-400"
            : "grid size-9 place-items-center rounded-md bg-teal-400/10 text-teal-400"
        }
      >
        <Icon className="size-4" />
      </span>
      <div>
        <p className="text-sm font-semibold text-white">{label}</p>
        <p className="text-xs text-zinc-600">{detail}</p>
      </div>
      {ready ? (
        <CheckCircle2 className="ml-auto size-4 text-teal-400" />
      ) : (
        <CircleAlert className="ml-auto size-4 text-teal-400" />
      )}
    </Card>
  );
}

function AdminSection({
  id,
  title,
  count,
  description,
  children,
}: {
  id: string;
  title: string;
  count: number;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-36">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-white">
            {title}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
            {description}
          </p>
        </div>
        <span className="font-mono text-xs text-zinc-700">{count}</span>
      </div>
      {children}
    </section>
  );
}

function EntityList({
  newLabel,
  newForm,
  children,
}: {
  writable: boolean;
  entity: string;
  newLabel: string;
  newForm: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-3">
      <details className="rounded-xl border border-dashed border-teal-400/25 bg-teal-400/[0.03] p-4">
        <summary className="flex cursor-pointer list-none items-center gap-2 text-sm font-semibold text-teal-300">
          <Plus className="size-4" /> {newLabel}
        </summary>
        <div className="mt-5">{newForm}</div>
      </details>
      {children}
    </div>
  );
}

function ProjectForm({
  project,
  writable,
}: {
  project?: Project;
  writable: boolean;
}) {
  return (
    <EditorShell
      title={project?.title ?? "Untitled project"}
      entity="project"
      id={project?.id}
      writable={writable}
      sortOrder={project?.sortOrder}
    >
      <form action={saveProject}>
        <fieldset disabled={!writable} className="grid gap-4 disabled:opacity-60">
          <input type="hidden" name="id" value={project?.id ?? ""} />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Title" name="title" value={project?.title} />
            <Field label="Slug" name="slug" value={project?.slug} placeholder="auto-from-title" />
            <Field label="Category" name="category" value={project?.category} />
            <Field label="Year" name="year" value={project?.year} />
            <Field label="Role" name="role" value={project?.role} />
            <Field
              label="Sort order"
              name="sortOrder"
              type="number"
              value={project?.sortOrder ?? 0}
            />
          </div>
          <TextArea label="Summary" name="summary" value={project?.summary} />
          <TextArea label="Markdown body" name="body" value={project?.body} rows={12} />
          <TextArea
            label="Technologies (comma or line separated)"
            name="technologies"
            value={project?.technologies.join(", ")}
          />
          <div className="grid gap-4 sm:grid-cols-3">
            <Field
              label="Cover image URL"
              name="coverImageUrl"
              value={project?.coverImageUrl ?? ""}
            />
            <Field label="Source URL" name="sourceUrl" value={project?.sourceUrl ?? ""} />
            <Field
              label="External URL"
              name="externalUrl"
              value={project?.externalUrl ?? ""}
            />
          </div>
          <div className="rounded-xl border border-dashed border-cyan-300/20 bg-cyan-300/[0.025] p-4">
            <Field
              label="Upload / replace cover image"
              name="coverFile"
              type="file"
              accept="image/*"
            />
            <p className="mt-2 text-xs leading-5 text-zinc-600">
              Uploading a file replaces the URL above. Transparent CAD renders and high-resolution photos are supported.
            </p>
          </div>
          <label className="flex items-center gap-2 text-sm text-zinc-400">
            <input type="checkbox" name="featured" defaultChecked={project?.featured} />
            Feature on homepage
          </label>
          <SaveButton />
        </fieldset>
      </form>
    </EditorShell>
  );
}

function ExperienceForm({
  item,
  writable,
}: {
  item?: Experience;
  writable: boolean;
}) {
  return (
    <EditorShell
      title={item ? `${item.organization} · ${item.title}` : "Untitled experience"}
      entity="experience"
      id={item?.id}
      writable={writable}
      sortOrder={item?.sortOrder}
    >
      <form action={saveExperience}>
        <fieldset disabled={!writable} className="grid gap-4 disabled:opacity-60">
          <input type="hidden" name="id" value={item?.id ?? ""} />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Organization" name="organization" value={item?.organization} />
            <Field label="Title" name="title" value={item?.title} />
            <Field label="Period" name="period" value={item?.period} />
            <Field label="Location" name="location" value={item?.location ?? ""} />
            <Field
              label="Sort order"
              name="sortOrder"
              type="number"
              value={item?.sortOrder ?? 0}
            />
          </div>
          <TextArea label="Summary" name="summary" value={item?.summary} />
          <TextArea
            label="Highlights (one per line)"
            name="highlights"
            value={item?.highlights.join("\n")}
            rows={7}
          />
          <SaveButton />
        </fieldset>
      </form>
    </EditorShell>
  );
}

function ResearchForm({
  item,
  writable,
}: {
  item?: ResearchItem;
  writable: boolean;
}) {
  return (
    <EditorShell
      title={item?.title ?? "Untitled research item"}
      entity="research"
      id={item?.id}
      writable={writable}
      sortOrder={item?.sortOrder}
    >
      <form action={saveResearch}>
        <fieldset disabled={!writable} className="grid gap-4 disabled:opacity-60">
          <input type="hidden" name="id" value={item?.id ?? ""} />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Title" name="title" value={item?.title} />
            <Field label="Slug" name="slug" value={item?.slug} />
            <Field label="Status" name="status" value={item?.status} />
            <Field
              label="Sort order"
              name="sortOrder"
              type="number"
              value={item?.sortOrder ?? 0}
            />
          </div>
          <TextArea label="Summary" name="summary" value={item?.summary} />
          <TextArea label="Body" name="body" value={item?.body} rows={7} />
          <Field label="Topics" name="topics" value={item?.topics.join(", ")} />
          <SaveButton />
        </fieldset>
      </form>
    </EditorShell>
  );
}

function BlogForm({
  post,
  writable,
}: {
  post?: BlogPost;
  writable: boolean;
}) {
  return (
    <EditorShell
      title={post?.title ?? "Untitled post"}
      entity="blog"
      id={post?.id}
      writable={writable}
      sortOrder={post?.sortOrder}
      status={post ? (post.published ? "Published" : "Draft") : undefined}
    >
      <form action={saveBlogPost}>
        <fieldset disabled={!writable} className="grid gap-4 disabled:opacity-60">
          <input type="hidden" name="id" value={post?.id ?? ""} />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Title" name="title" value={post?.title} />
            <Field label="Slug" name="slug" value={post?.slug} />
            <Field
              label="Publish date"
              name="publishedAt"
              type="datetime-local"
              value={post?.publishedAt?.slice(0, 16) ?? ""}
            />
            <Field
              label="Sort order"
              name="sortOrder"
              type="number"
              value={post?.sortOrder ?? 0}
            />
          </div>
          <TextArea label="Excerpt" name="excerpt" value={post?.excerpt} />
          <TextArea label="Markdown body" name="body" value={post?.body} rows={14} />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Tags" name="tags" value={post?.tags.join(", ")} />
            <Field
              label="Cover image URL"
              name="coverImageUrl"
              value={post?.coverImageUrl ?? ""}
            />
          </div>
          <div className="grid gap-4 rounded-xl border border-dashed border-cyan-300/20 bg-cyan-300/[0.025] p-4 sm:grid-cols-2">
            <Field
              label="Upload / replace cover image"
              name="coverFile"
              type="file"
              accept="image/*"
            />
            <div className="grid gap-4">
              <Field
                label="Add photo or file to post"
                name="attachmentFile"
                type="file"
              />
              <Field
                label="Attachment caption / link label"
                name="attachmentLabel"
                placeholder="Test results, gallery photo, CAD package..."
              />
            </div>
            <p className="text-xs leading-5 text-zinc-600 sm:col-span-2">
              Images are appended to the Markdown body as responsive media. Other files are appended as download links.
            </p>
          </div>
          <label className="flex items-center gap-2 text-sm text-zinc-400">
            <input type="checkbox" name="published" defaultChecked={post?.published} />
            Published
          </label>
          <SaveButton />
        </fieldset>
      </form>
    </EditorShell>
  );
}

function SkillForm({
  skill,
  writable,
}: {
  skill?: Skill;
  writable: boolean;
}) {
  return (
    <EditorShell
      title={skill?.name ?? "Untitled skill"}
      entity="skill"
      id={skill?.id}
      writable={writable}
      sortOrder={skill?.sortOrder}
      status={skill ? `${skill.proficiency}%` : undefined}
    >
      <form action={saveSkill}>
        <fieldset disabled={!writable} className="grid gap-4 disabled:opacity-60">
          <input type="hidden" name="id" value={skill?.id ?? ""} />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Skill" name="name" value={skill?.name} />
            <Field label="Category" name="category" value={skill?.category} />
            <Field
              label="Proficiency (0-100)"
              name="proficiency"
              type="number"
              value={skill?.proficiency ?? 50}
            />
            <Field
              label="Sort order"
              name="sortOrder"
              type="number"
              value={skill?.sortOrder ?? 0}
            />
          </div>
          <TextArea label="What it means" name="description" value={skill?.description} />
          <TextArea label="Where it was learned" name="learnedFrom" value={skill?.learnedFrom} />
          <TextArea
            label="Evidence (one per line)"
            name="evidence"
            value={skill?.evidence.join("\n")}
          />
          <SaveButton />
        </fieldset>
      </form>
    </EditorShell>
  );
}

function CertificationForm({
  certification,
  writable,
}: {
  certification?: Certification;
  writable: boolean;
}) {
  return (
    <EditorShell
      title={certification?.name ?? "Untitled certification"}
      entity="certification"
      id={certification?.id}
      writable={writable}
      sortOrder={certification?.sortOrder}
      status={certification?.issuer}
    >
      <form action={saveCertification}>
        <fieldset disabled={!writable} className="grid gap-4 disabled:opacity-60">
          <input type="hidden" name="id" value={certification?.id ?? ""} />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Certification" name="name" value={certification?.name} />
            <Field label="Issuer" name="issuer" value={certification?.issuer} />
            <Field label="Issued / status" name="issued" value={certification?.issued} />
            <Field
              label="Sort order"
              name="sortOrder"
              type="number"
              value={certification?.sortOrder ?? 0}
            />
          </div>
          <TextArea
            label="What it validates"
            name="description"
            value={certification?.description}
          />
          <Field
            label="Skills"
            name="skills"
            value={certification?.skills.join(", ")}
          />
          <Field
            label="Credential URL"
            name="credentialUrl"
            type="url"
            value={certification?.credentialUrl ?? ""}
          />
          <SaveButton />
        </fieldset>
      </form>
    </EditorShell>
  );
}

function GalleryForm({
  gallery,
  writable,
}: {
  gallery?: Gallery;
  writable: boolean;
}) {
  return (
    <EditorShell
      title={gallery?.name ?? "Untitled gallery"}
      entity="gallery"
      id={gallery?.id}
      writable={writable}
      sortOrder={gallery?.sortOrder}
    >
      <form action={saveGallery}>
        <fieldset disabled={!writable} className="grid gap-4 disabled:opacity-60">
          <input type="hidden" name="id" value={gallery?.id ?? ""} />
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Name" name="name" value={gallery?.name} />
            <Field label="Slug" name="slug" value={gallery?.slug} />
            <Field
              label="Sort order"
              name="sortOrder"
              type="number"
              value={gallery?.sortOrder ?? 0}
            />
          </div>
          <TextArea
            label="Description"
            name="description"
            value={gallery?.description}
          />
          <SaveButton />
        </fieldset>
      </form>
    </EditorShell>
  );
}

function SocialForm({
  link,
  writable,
}: {
  link?: SocialLink;
  writable: boolean;
}) {
  return (
    <EditorShell
      title={link?.label ?? "Untitled link"}
      entity="social"
      id={link?.id}
      writable={writable}
      sortOrder={link?.sortOrder}
    >
      <form action={saveSocialLink}>
        <fieldset disabled={!writable} className="grid gap-4 disabled:opacity-60">
          <input type="hidden" name="id" value={link?.id ?? ""} />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Label" name="label" value={link?.label} />
            <Field label="Kind" name="kind" value={link?.kind} placeholder="github" />
            <Field label="URL" name="url" type="url" value={link?.url} />
            <Field
              label="Sort order"
              name="sortOrder"
              type="number"
              value={link?.sortOrder ?? 0}
            />
          </div>
          <SaveButton />
        </fieldset>
      </form>
    </EditorShell>
  );
}

function EditorShell({
  title,
  status,
  entity,
  id,
  writable,
  children,
}: {
  title: string;
  status?: string;
  entity: string;
  id?: string;
  writable: boolean;
  sortOrder?: number;
  children: React.ReactNode;
}) {
  return (
    <details className="rounded-xl border border-white/10 bg-zinc-900/55 p-4 open:border-white/18">
      <summary className="flex cursor-pointer list-none items-center gap-3">
        <span className="min-w-0 flex-1 truncate text-sm font-semibold text-zinc-200">
          {title}
        </span>
        {status ? (
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-zinc-600">
            {status}
          </span>
        ) : null}
      </summary>
      <div className="mt-5 border-t border-white/8 pt-5">{children}</div>
      {id ? (
        <div className="mt-5 flex items-center justify-between border-t border-white/8 pt-4">
          <OrderControls entity={entity} id={id} writable={writable} />
          <DeleteControl entity={entity} id={id} writable={writable} />
        </div>
      ) : null}
    </details>
  );
}

function OrderControls({
  entity,
  id,
  galleryId,
  writable,
}: {
  entity: string;
  id: string;
  galleryId?: string;
  writable: boolean;
}) {
  return (
    <div className="flex gap-2">
      {(["up", "down"] as const).map((direction) => (
        <form action={moveEntity} key={direction}>
          <input type="hidden" name="entity" value={entity} />
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="direction" value={direction} />
          {galleryId ? <input type="hidden" name="galleryId" value={galleryId} /> : null}
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            disabled={!writable}
            aria-label={`Move ${direction}`}
          >
            {direction === "up" ? (
              <ArrowUp className="size-4" />
            ) : (
              <ArrowDown className="size-4" />
            )}
          </Button>
        </form>
      ))}
    </div>
  );
}

function DeleteControl({
  entity,
  id,
  writable,
}: {
  entity: string;
  id: string;
  writable: boolean;
}) {
  return (
    <form action={deleteEntity}>
      <input type="hidden" name="entity" value={entity} />
      <input type="hidden" name="id" value={id} />
      <Button
        type="submit"
        variant="danger"
        size="sm"
        disabled={!writable}
        title="This permanently removes the item."
      >
        <Trash2 className="size-4" /> Delete
      </Button>
    </form>
  );
}

function SaveButton() {
  return (
    <Button type="submit" className="w-fit">
      <Save className="size-4" /> Save changes
    </Button>
  );
}

function Field({
  label,
  name,
  value,
  type = "text",
  placeholder,
  accept,
}: {
  label: string;
  name: string;
  value?: string | number;
  type?: string;
  placeholder?: string;
  accept?: string;
}) {
  return (
    <label className="grid gap-2 text-xs font-medium text-zinc-500">
      {label}
      <input
        className={inputClass}
        name={name}
        type={type}
        defaultValue={type === "file" ? undefined : value}
        placeholder={placeholder}
        accept={accept}
      />
    </label>
  );
}

function TextArea({
  label,
  name,
  value,
  rows = 5,
}: {
  label: string;
  name: string;
  value?: string;
  rows?: number;
}) {
  return (
    <label className="grid gap-2 text-xs font-medium text-zinc-500">
      {label}
      <textarea
        className={textareaClass}
        name={name}
        defaultValue={value}
        rows={rows}
      />
    </label>
  );
}
