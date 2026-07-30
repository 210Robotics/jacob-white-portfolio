# Jacob White — Engineering Portfolio

A production-ready personal portfolio and lightweight CMS for Jacob White: mechanical engineering, robotics, simulation, manufacturing, and technical leadership.

The public site includes:

- Home, about, experience, research, gallery, résumé, and contact pages
- Filterable project portfolio with dedicated project pages
- Markdown blog with tags, drafts, cover images, and individual post pages
- Named, reorderable image galleries with horizontal carousels and lightbox viewing
- Résumé preview/download with version metadata and an optional archive
- Responsive navigation, accessible controls, SEO metadata, Open Graph imagery, sitemap, and robots rules
- A Jacob-only dashboard for updating site content without editing code

## Stack

- Next.js App Router, React, TypeScript, and Tailwind CSS
- Drizzle ORM with Neon Postgres
- Clerk authentication
- Vercel Blob for images and résumé files
- Zod validation
- Vitest, ESLint, and TypeScript validation

## Local setup

Requirements: Node.js 20.9 or newer and npm.

1. Install packages:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env.local` and fill in the values described below.

3. Create the database schema and load the initial portfolio content:

   ```bash
   npm run db:push
   npm run db:seed
   ```

4. Start the local site:

   ```bash
   npm run dev
   ```

The public site has an accurate, read-only seed fallback when `DATABASE_URL` is absent. The admin dashboard intentionally remains unavailable until the database and authentication are configured.

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical production URL, such as `https://jacob-white-portfolio.vercel.app` |
| `DATABASE_URL` | For CMS | Neon pooled Postgres connection string |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | For admin | Clerk publishable key |
| `CLERK_SECRET_KEY` | For admin | Clerk server secret |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | Yes | Keep as `/sign-in` |
| `ADMIN_USER_ID` | Recommended | Exact Clerk user ID allowed into the dashboard |
| `ADMIN_EMAIL` | Fallback | Exact email address allowed into the dashboard |
| `BLOB_READ_WRITE_TOKEN` | For uploads | Vercel Blob read/write token |

Never commit `.env.local`, database credentials, Clerk secrets, or Blob tokens.

## Admin setup

1. Create a Clerk application and disable public sign-up after Jacob's account exists.
2. Add Clerk's production keys to Vercel.
3. Sign in once, copy Jacob's Clerk user ID, and set it as `ADMIN_USER_ID`.
4. Set `ADMIN_EMAIL` as a secondary allow-list check.
5. Create a Neon database, set `DATABASE_URL`, then run `npm run db:push` and `npm run db:seed`.
6. Create a Vercel Blob store and connect `BLOB_READ_WRITE_TOKEN`.
7. Visit `/sign-in`, then `/admin`.

Every mutating server action performs the admin authorization check again. No password is stored in the repository.

## Updating content

The dashboard supports creating, editing, deleting, publishing, featuring, and reordering:

- Homepage settings and social links
- Projects and project detail content
- Experience entries
- Research items
- Blog posts and drafts
- Galleries and uploaded gallery images
- Current and archived résumé files

Uploads are sent directly to Vercel Blob by authenticated server actions. Public pages revalidate after changes.

## Database workflow

The schema lives in `src/db/schema.ts`.

```bash
npm run db:generate
npm run db:push
npm run db:seed
```

The seed script is idempotent: it updates its known records instead of duplicating them. Review the generated migration before applying schema changes to production.

## Validation

Run the complete local quality gate:

```bash
npm run validate
```

Or run checks individually:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

## Deployment

1. Create a new GitHub repository and push this project.
2. Import that repository as a new Vercel project.
3. Add all production environment variables.
4. Provision and connect Neon, Clerk, and Vercel Blob.
5. Apply and seed the database.
6. Redeploy after setting `NEXT_PUBLIC_SITE_URL` to the production URL.

The project intentionally contains no credentials. Until the one-time service configuration is complete, the deployed public portfolio uses the bundled seed content and the protected dashboard explains which services are missing.

## Content provenance

The initial portfolio was assembled from Jacob's supplied résumé and portfolio source PDF, public repositories under [JacobW0410](https://github.com/JacobW0410), the verified public LinkedIn profile, public 210 Robotics material, and official UT San Antonio coverage. Draft copy avoids unsupported metrics and keeps content editable through the dashboard.
