"use server";

import { del, put } from "@vercel/blob";
import { asc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getDb, isDatabaseConfigured } from "@/db";
import {
  blogPosts,
  experiences,
  galleries,
  galleryImages,
  projects,
  researchItems,
  resumeFiles,
  siteSettings,
  socialLinks,
} from "@/db/schema";
import { requireAdmin } from "@/lib/auth";
import { blogSchema, projectSchema } from "@/lib/validation";
import { slugify, splitList } from "@/lib/utils";

async function requireWritableAdmin() {
  await requireAdmin();
  if (!isDatabaseConfigured()) {
    throw new Error("DATABASE_URL is required before content can be changed.");
  }
}

function text(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function idFrom(formData: FormData) {
  return text(formData, "id") || crypto.randomUUID();
}

function numberFrom(formData: FormData, key: string, fallback = 0) {
  const value = Number(text(formData, key));
  return Number.isFinite(value) ? value : fallback;
}

function refresh(...paths: string[]) {
  for (const path of new Set(["/", "/admin", ...paths])) {
    revalidatePath(path);
  }
}

export async function saveSettings(formData: FormData) {
  await requireWritableAdmin();
  const values = {
    id: "primary",
    heroEyebrow: text(formData, "heroEyebrow"),
    heroTitle: text(formData, "heroTitle"),
    heroSummary: text(formData, "heroSummary"),
    availability: text(formData, "availability"),
    contactEmail: text(formData, "contactEmail"),
    updatedAt: new Date(),
  };
  await getDb()
    .insert(siteSettings)
    .values(values)
    .onConflictDoUpdate({ target: siteSettings.id, set: values });
  refresh("/contact");
}

export async function saveProject(formData: FormData) {
  await requireWritableAdmin();
  const id = idFrom(formData);
  const rawSlug = text(formData, "slug") || slugify(text(formData, "title"));
  const parsed = projectSchema.parse({
    id,
    slug: rawSlug,
    title: text(formData, "title"),
    summary: text(formData, "summary"),
    body: text(formData, "body"),
    category: text(formData, "category"),
    year: text(formData, "year"),
    role: text(formData, "role"),
  });
  const values = {
    ...parsed,
    technologies: splitList(formData.get("technologies")),
    coverImageUrl: text(formData, "coverImageUrl") || null,
    sourceUrl: text(formData, "sourceUrl") || null,
    externalUrl: text(formData, "externalUrl") || null,
    featured: formData.get("featured") === "on",
    sortOrder: numberFrom(formData, "sortOrder"),
    updatedAt: new Date(),
  };
  await getDb()
    .insert(projects)
    .values(values)
    .onConflictDoUpdate({ target: projects.id, set: values });
  refresh("/projects", `/projects/${values.slug}`);
}

export async function saveExperience(formData: FormData) {
  await requireWritableAdmin();
  const id = idFrom(formData);
  const values = {
    id,
    organization: text(formData, "organization"),
    title: text(formData, "title"),
    period: text(formData, "period"),
    location: text(formData, "location") || null,
    summary: text(formData, "summary"),
    highlights: splitList(formData.get("highlights")),
    sortOrder: numberFrom(formData, "sortOrder"),
    updatedAt: new Date(),
  };
  if (!values.organization || !values.title || !values.summary) {
    throw new Error("Organization, title, and summary are required.");
  }
  await getDb()
    .insert(experiences)
    .values(values)
    .onConflictDoUpdate({ target: experiences.id, set: values });
  refresh("/experience");
}

export async function saveResearch(formData: FormData) {
  await requireWritableAdmin();
  const id = idFrom(formData);
  const values = {
    id,
    slug: text(formData, "slug") || slugify(text(formData, "title")),
    title: text(formData, "title"),
    summary: text(formData, "summary"),
    body: text(formData, "body"),
    status: text(formData, "status"),
    topics: splitList(formData.get("topics")),
    sortOrder: numberFrom(formData, "sortOrder"),
    updatedAt: new Date(),
  };
  if (!values.title || !values.summary || !values.body) {
    throw new Error("Title, summary, and body are required.");
  }
  await getDb()
    .insert(researchItems)
    .values(values)
    .onConflictDoUpdate({ target: researchItems.id, set: values });
  refresh("/research");
}

export async function saveBlogPost(formData: FormData) {
  await requireWritableAdmin();
  const id = idFrom(formData);
  const parsed = blogSchema.parse({
    id,
    slug: text(formData, "slug") || slugify(text(formData, "title")),
    title: text(formData, "title"),
    excerpt: text(formData, "excerpt"),
    body: text(formData, "body"),
  });
  const published = formData.get("published") === "on";
  const publishedAtValue = text(formData, "publishedAt");
  const values = {
    ...parsed,
    tags: splitList(formData.get("tags")),
    coverImageUrl: text(formData, "coverImageUrl") || null,
    published,
    publishedAt: published
      ? publishedAtValue
        ? new Date(publishedAtValue)
        : new Date()
      : null,
    sortOrder: numberFrom(formData, "sortOrder"),
    updatedAt: new Date(),
  };
  await getDb()
    .insert(blogPosts)
    .values(values)
    .onConflictDoUpdate({ target: blogPosts.id, set: values });
  refresh("/blog", `/blog/${values.slug}`);
}

export async function saveGallery(formData: FormData) {
  await requireWritableAdmin();
  const id = idFrom(formData);
  const values = {
    id,
    slug: text(formData, "slug") || slugify(text(formData, "name")),
    name: text(formData, "name"),
    description: text(formData, "description"),
    sortOrder: numberFrom(formData, "sortOrder"),
    updatedAt: new Date(),
  };
  if (!values.name || !values.description) {
    throw new Error("Gallery name and description are required.");
  }
  await getDb()
    .insert(galleries)
    .values(values)
    .onConflictDoUpdate({ target: galleries.id, set: values });
  refresh("/gallery");
}

export async function saveSocialLink(formData: FormData) {
  await requireWritableAdmin();
  const id = idFrom(formData);
  const values = {
    id,
    label: text(formData, "label"),
    url: text(formData, "url"),
    kind: text(formData, "kind"),
    sortOrder: numberFrom(formData, "sortOrder"),
    updatedAt: new Date(),
  };
  if (!values.label || !URL.canParse(values.url)) {
    throw new Error("A label and valid URL are required.");
  }
  await getDb()
    .insert(socialLinks)
    .values(values)
    .onConflictDoUpdate({ target: socialLinks.id, set: values });
  refresh("/contact");
}

export async function uploadGalleryImage(formData: FormData) {
  await requireWritableAdmin();
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error("BLOB_READ_WRITE_TOKEN is required for uploads.");
  }
  const file = formData.get("file");
  const galleryId = text(formData, "galleryId");
  if (!(file instanceof File) || !file.type.startsWith("image/")) {
    throw new Error("Choose a valid image file.");
  }
  if (file.size > 10 * 1024 * 1024) {
    throw new Error("Gallery images must be 10 MB or smaller.");
  }
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
  const blob = await put(
    `portfolio/galleries/${galleryId}/${Date.now()}-${safeName}`,
    file,
    { access: "public", addRandomSuffix: true },
  );
  await getDb().insert(galleryImages).values({
    id: crypto.randomUUID(),
    galleryId,
    url: blob.url,
    alt: text(formData, "alt") || file.name,
    caption: text(formData, "caption") || null,
    width: numberFrom(formData, "width") || null,
    height: numberFrom(formData, "height") || null,
    sortOrder: numberFrom(formData, "sortOrder", Date.now()),
  });
  refresh("/gallery");
}

export async function uploadResume(formData: FormData) {
  await requireWritableAdmin();
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error("BLOB_READ_WRITE_TOKEN is required for uploads.");
  }
  const file = formData.get("file");
  if (!(file instanceof File) || file.type !== "application/pdf") {
    throw new Error("Choose a PDF résumé.");
  }
  if (file.size > 10 * 1024 * 1024) {
    throw new Error("Résumé files must be 10 MB or smaller.");
  }
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
  const blob = await put(`portfolio/resume/${Date.now()}-${safeName}`, file, {
    access: "public",
    addRandomSuffix: true,
  });
  await getDb().update(resumeFiles).set({ active: false, updatedAt: new Date() });
  await getDb().insert(resumeFiles).values({
    id: crypto.randomUUID(),
    filename: file.name,
    url: blob.url,
    version: text(formData, "version"),
    active: true,
    sortOrder: numberFrom(formData, "sortOrder", Date.now()),
  });
  refresh("/resume");
}

export async function deleteEntity(formData: FormData) {
  await requireWritableAdmin();
  const entity = text(formData, "entity");
  const id = text(formData, "id");
  const db = getDb();

  switch (entity) {
    case "project":
      await db.delete(projects).where(eq(projects.id, id));
      refresh("/projects");
      break;
    case "experience":
      await db.delete(experiences).where(eq(experiences.id, id));
      refresh("/experience");
      break;
    case "research":
      await db.delete(researchItems).where(eq(researchItems.id, id));
      refresh("/research");
      break;
    case "blog":
      await db.delete(blogPosts).where(eq(blogPosts.id, id));
      refresh("/blog");
      break;
    case "gallery":
      await db.delete(galleries).where(eq(galleries.id, id));
      refresh("/gallery");
      break;
    case "galleryImage": {
      const [image] = await db
        .select()
        .from(galleryImages)
        .where(eq(galleryImages.id, id))
        .limit(1);
      await db.delete(galleryImages).where(eq(galleryImages.id, id));
      if (image?.url.includes("blob.vercel-storage.com")) await del(image.url);
      refresh("/gallery");
      break;
    }
    case "social":
      await db.delete(socialLinks).where(eq(socialLinks.id, id));
      refresh("/contact");
      break;
    case "resume": {
      const [file] = await db
        .select()
        .from(resumeFiles)
        .where(eq(resumeFiles.id, id))
        .limit(1);
      await db.delete(resumeFiles).where(eq(resumeFiles.id, id));
      if (file?.url.includes("blob.vercel-storage.com")) await del(file.url);
      refresh("/resume");
      break;
    }
    default:
      throw new Error("Unsupported entity type.");
  }
}

export async function moveEntity(formData: FormData) {
  await requireWritableAdmin();
  const entity = text(formData, "entity");
  const id = text(formData, "id");
  const direction = text(formData, "direction") === "up" ? -1 : 1;
  const db = getDb();

  if (entity === "galleryImage") {
    const rows = await db
      .select()
      .from(galleryImages)
      .where(eq(galleryImages.galleryId, text(formData, "galleryId")))
      .orderBy(asc(galleryImages.sortOrder));
    const currentIndex = rows.findIndex((row) => row.id === id);
    const targetIndex = currentIndex + direction;
    if (currentIndex < 0 || targetIndex < 0 || targetIndex >= rows.length) return;
    await Promise.all([
      db
        .update(galleryImages)
        .set({ sortOrder: rows[targetIndex].sortOrder, updatedAt: new Date() })
        .where(eq(galleryImages.id, rows[currentIndex].id)),
      db
        .update(galleryImages)
        .set({ sortOrder: rows[currentIndex].sortOrder, updatedAt: new Date() })
        .where(eq(galleryImages.id, rows[targetIndex].id)),
    ]);
    refresh("/gallery");
    return;
  }

  const tableConfig = {
    project: { table: projects, path: "/projects" },
    experience: { table: experiences, path: "/experience" },
    research: { table: researchItems, path: "/research" },
    blog: { table: blogPosts, path: "/blog" },
    gallery: { table: galleries, path: "/gallery" },
    social: { table: socialLinks, path: "/contact" },
  } as const;

  const config = tableConfig[entity as keyof typeof tableConfig];
  if (!config) throw new Error("Unsupported reorder type.");

  const rows = await db.select().from(config.table).orderBy(asc(config.table.sortOrder));
  const currentIndex = rows.findIndex((row) => row.id === id);
  const targetIndex = currentIndex + direction;
  if (currentIndex < 0 || targetIndex < 0 || targetIndex >= rows.length) return;

  await Promise.all([
    db
      .update(config.table)
      .set({ sortOrder: rows[targetIndex].sortOrder, updatedAt: new Date() })
      .where(eq(config.table.id, rows[currentIndex].id)),
    db
      .update(config.table)
      .set({ sortOrder: rows[currentIndex].sortOrder, updatedAt: new Date() })
      .where(eq(config.table.id, rows[targetIndex].id)),
  ]);
  refresh(config.path);
}
