import "server-only";

import { asc, desc, eq } from "drizzle-orm";
import { cache } from "react";
import { getDb, isDatabaseConfigured } from "@/db";
import {
  blogPosts,
  certifications,
  experiences,
  galleries,
  galleryImages,
  projects,
  researchItems,
  resumeFiles,
  skills,
  siteSettings,
  socialLinks,
} from "@/db/schema";
import {
  blogPostsSeed,
  certificationsSeed,
  experiencesSeed,
  galleriesSeed,
  projectsSeed,
  researchSeed,
  resumeFilesSeed,
  skillsSeed,
  siteSettingsSeed,
  socialLinksSeed,
} from "./seed-content";
import type {
  BlogPost,
  Certification,
  Experience,
  Gallery,
  Project,
  ResearchItem,
  ResumeFile,
  Skill,
  SiteSettings,
  SocialLink,
} from "./types";

async function withFallback<T>(query: () => Promise<T>, fallback: T): Promise<T> {
  if (!isDatabaseConfigured()) return fallback;

  try {
    return await query();
  } catch (error) {
    console.error("Portfolio data source unavailable; using seed content.", error);
    return fallback;
  }
}

export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  return withFallback(async () => {
    const [settings] = await getDb()
      .select()
      .from(siteSettings)
      .where(eq(siteSettings.id, "primary"))
      .limit(1);

    return settings ?? siteSettingsSeed;
  }, siteSettingsSeed);
});

export const getProjects = cache(async (): Promise<Project[]> => {
  return withFallback(
    async () => getDb().select().from(projects).orderBy(asc(projects.sortOrder)),
    projectsSeed,
  );
});

export const getProjectBySlug = cache(
  async (slug: string): Promise<Project | undefined> => {
    return withFallback(async () => {
      const [project] = await getDb()
        .select()
        .from(projects)
        .where(eq(projects.slug, slug))
        .limit(1);

      return project;
    }, projectsSeed.find((project) => project.slug === slug));
  },
);

export const getExperiences = cache(async (): Promise<Experience[]> => {
  return withFallback(
    async () =>
      getDb().select().from(experiences).orderBy(asc(experiences.sortOrder)),
    experiencesSeed,
  );
});

export const getResearchItems = cache(async (): Promise<ResearchItem[]> => {
  return withFallback(
    async () =>
      getDb().select().from(researchItems).orderBy(asc(researchItems.sortOrder)),
    researchSeed,
  );
});

export const getBlogPosts = cache(
  async (includeDrafts = false): Promise<BlogPost[]> => {
    return withFallback(async () => {
      const rows = await getDb()
        .select()
        .from(blogPosts)
        .orderBy(desc(blogPosts.publishedAt), asc(blogPosts.sortOrder));

      return rows
        .filter((post) => includeDrafts || post.published)
        .map((post) => ({
          ...post,
          publishedAt: post.publishedAt?.toISOString() ?? null,
        }));
    }, blogPostsSeed.filter((post) => includeDrafts || post.published));
  },
);

export const getBlogPostBySlug = cache(
  async (slug: string, includeDrafts = false): Promise<BlogPost | undefined> => {
    return withFallback(async () => {
      const [post] = await getDb()
        .select()
        .from(blogPosts)
        .where(eq(blogPosts.slug, slug))
        .limit(1);

      if (!post || (!includeDrafts && !post.published)) return undefined;

      return {
        ...post,
        publishedAt: post.publishedAt?.toISOString() ?? null,
      };
    }, blogPostsSeed.find((post) => post.slug === slug));
  },
);

export const getGalleries = cache(async (): Promise<Gallery[]> => {
  return withFallback(async () => {
    const [galleryRows, imageRows] = await Promise.all([
      getDb().select().from(galleries).orderBy(asc(galleries.sortOrder)),
      getDb()
        .select()
        .from(galleryImages)
        .orderBy(asc(galleryImages.sortOrder)),
    ]);

    return galleryRows.map((gallery) => ({
      ...gallery,
      images: imageRows.filter((image) => image.galleryId === gallery.id),
    }));
  }, galleriesSeed);
});

export const getResumeFiles = cache(async (): Promise<ResumeFile[]> => {
  return withFallback(async () => {
    const rows = await getDb()
      .select()
      .from(resumeFiles)
      .orderBy(desc(resumeFiles.active), asc(resumeFiles.sortOrder));

    return rows.map((file) => ({
      ...file,
      uploadedAt: file.createdAt.toISOString(),
    }));
  }, resumeFilesSeed);
});

export const getSocialLinks = cache(async (): Promise<SocialLink[]> => {
  return withFallback(
    async () =>
      getDb().select().from(socialLinks).orderBy(asc(socialLinks.sortOrder)),
    socialLinksSeed,
  );
});

export const getSkills = cache(async (): Promise<Skill[]> => {
  return withFallback(
    async () => getDb().select().from(skills).orderBy(asc(skills.sortOrder)),
    skillsSeed,
  );
});

export const getCertifications = cache(async (): Promise<Certification[]> => {
  return withFallback(
    async () =>
      getDb()
        .select()
        .from(certifications)
        .orderBy(asc(certifications.sortOrder)),
    certificationsSeed,
  );
});
