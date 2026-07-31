import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
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
} from "../src/db/schema";
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
} from "../src/lib/seed-content";

async function seed() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) throw new Error("DATABASE_URL is required to seed content.");
  const db = drizzle(neon(databaseUrl));

  await db
    .insert(siteSettings)
    .values(siteSettingsSeed)
    .onConflictDoUpdate({
      target: siteSettings.id,
      set: siteSettingsSeed,
    });

  for (const project of projectsSeed) {
    await db
      .insert(projects)
      .values(project)
      .onConflictDoUpdate({ target: projects.id, set: project });
  }

  for (const experience of experiencesSeed) {
    await db
      .insert(experiences)
      .values(experience)
      .onConflictDoUpdate({
        target: experiences.id,
        set: experience,
      });
  }

  for (const item of researchSeed) {
    await db
      .insert(researchItems)
      .values(item)
      .onConflictDoUpdate({ target: researchItems.id, set: item });
  }

  for (const post of blogPostsSeed) {
    const values = {
      ...post,
      publishedAt: post.publishedAt ? new Date(post.publishedAt) : null,
    };
    await db
      .insert(blogPosts)
      .values(values)
      .onConflictDoUpdate({ target: blogPosts.id, set: values });
  }

  for (const gallery of galleriesSeed) {
    const { images, ...galleryValues } = gallery;
    await db
      .insert(galleries)
      .values(galleryValues)
      .onConflictDoUpdate({
        target: galleries.id,
        set: galleryValues,
      });

    for (const image of images) {
      await db
        .insert(galleryImages)
        .values(image)
        .onConflictDoUpdate({
          target: galleryImages.id,
          set: image,
        });
    }
  }

  for (const file of resumeFilesSeed) {
    const { uploadedAt, ...fileValues } = file;
    const values = { ...fileValues, createdAt: new Date(uploadedAt) };
    await db
      .insert(resumeFiles)
      .values(values)
      .onConflictDoUpdate({ target: resumeFiles.id, set: values });
  }

  for (const link of socialLinksSeed) {
    await db
      .insert(socialLinks)
      .values(link)
      .onConflictDoUpdate({ target: socialLinks.id, set: link });
  }

  for (const skill of skillsSeed) {
    await db
      .insert(skills)
      .values(skill)
      .onConflictDoUpdate({ target: skills.id, set: skill });
  }

  for (const certification of certificationsSeed) {
    await db
      .insert(certifications)
      .values(certification)
      .onConflictDoUpdate({
        target: certifications.id,
        set: certification,
      });
  }

  console.log("Portfolio seed complete.");
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
