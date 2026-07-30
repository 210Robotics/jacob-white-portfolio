import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.email().max(180),
  subject: z.string().trim().min(3).max(160),
  message: z.string().trim().min(20).max(5000),
  website: z.string().max(0).optional(),
});

export const projectSchema = z.object({
  id: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().trim().min(2).max(140),
  summary: z.string().trim().min(20).max(600),
  body: z.string().trim().min(20),
  category: z.string().trim().min(2).max(80),
  year: z.string().trim().min(2).max(40),
  role: z.string().trim().min(2).max(140),
});

export const blogSchema = z.object({
  id: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().trim().min(2).max(160),
  excerpt: z.string().trim().min(20).max(600),
  body: z.string().trim().min(20),
});
