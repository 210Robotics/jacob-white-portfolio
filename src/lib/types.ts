export type Project = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  body: string;
  category: string;
  year: string;
  role: string;
  technologies: string[];
  coverImageUrl?: string | null;
  sourceUrl?: string | null;
  externalUrl?: string | null;
  featured: boolean;
  sortOrder: number;
};

export type Experience = {
  id: string;
  organization: string;
  title: string;
  period: string;
  location?: string | null;
  summary: string;
  highlights: string[];
  sortOrder: number;
};

export type ResearchItem = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  body: string;
  status: string;
  topics: string[];
  sortOrder: number;
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  tags: string[];
  coverImageUrl?: string | null;
  published: boolean;
  publishedAt?: string | null;
  sortOrder: number;
};

export type GalleryImage = {
  id: string;
  galleryId: string;
  url: string;
  alt: string;
  caption?: string | null;
  width?: number | null;
  height?: number | null;
  sortOrder: number;
};

export type Gallery = {
  id: string;
  slug: string;
  name: string;
  description: string;
  sortOrder: number;
  images: GalleryImage[];
};

export type ResumeFile = {
  id: string;
  filename: string;
  url: string;
  version: string;
  uploadedAt: string;
  active: boolean;
  sortOrder: number;
};

export type SocialLink = {
  id: string;
  label: string;
  url: string;
  kind: string;
  sortOrder: number;
};

export type Skill = {
  id: string;
  name: string;
  category: string;
  proficiency: number;
  description: string;
  learnedFrom: string;
  evidence: string[];
  sortOrder: number;
};

export type Certification = {
  id: string;
  name: string;
  issuer: string;
  issued: string;
  description: string;
  skills: string[];
  credentialUrl?: string | null;
  sortOrder: number;
};

export type SiteSettings = {
  id: string;
  heroEyebrow: string;
  heroTitle: string;
  heroSummary: string;
  availability: string;
  contactEmail: string;
  portraitUrl: string;
};
