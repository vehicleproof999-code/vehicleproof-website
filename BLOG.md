# Blog

The blog at `/blog/` is written in Sanity, in the separate editor in `studio/`.
It works like the FoundryOps blog, with one difference: this site is static
files on GitHub Pages with no server, so posts are built into real pages when
the site is built. That keeps every article readable by search engines and
link previews (WhatsApp, LinkedIn), like the rest of the site.

## When a post appears

The site rebuilds every hour (`.github/workflows/deploy.yml`), so a published
post appears within about an hour. To publish one straight away: GitHub →
**Actions** → **Deploy site** → **Run workflow**.

Corrections and unpublishing work the same way: they show after the next build.
Future-dated posts appear at the first build after their date.

If Sanity cannot be reached during a build, the build stops and the live site
keeps its current posts; the next hourly build tries again.

## 1. Create the Sanity project (once)

1. Sign up at https://www.sanity.io/ and open https://www.sanity.io/manage.
2. Create a project named **VehicleProve** on the **Free** plan.
3. Create a **public** dataset named `production`. Published posts are public
   on the website anyway; drafts stay private.
4. Copy the **project ID** from the project settings. It is public, not a
   password. Put it in `src/site.ts` (`sanity.projectId`) and push.

No API token is needed anywhere: the build reads published posts only.

## 2. Set up the editor

Node.js 22.12 or later. From this folder:

```powershell
Copy-Item studio/.env.example studio/.env
```

Edit `studio/.env`:

```dotenv
SANITY_STUDIO_PROJECT_ID=youractualprojectid
SANITY_STUDIO_DATASET=production
```

Then:

```powershell
npm --prefix studio ci
npm --prefix studio run login
npm --prefix studio run dev
```

Open the address it prints (usually http://localhost:3333) and log in with the
account that owns the project. If asked, allow that address in the project's
API → CORS settings with credentials.

To use the editor from anywhere, host it on Sanity once:

```powershell
npm --prefix studio run deploy
```

Choose a name when asked (it becomes `name.sanity.studio`) and bookmark it.

## 3. Write a post

1. **Blog posts** → create a document.
2. Title, then **Generate** for the article address. Keep it unchanged after
   publishing, so links keep working.
3. A short introduction (shown on the Blog page and in link previews), the post
   type, the author, and today's date.
4. Optionally a cover image, with a description of it for screen readers.
5. The article: paragraphs, headings (they become the "On this page" menu),
   lists, quotes, bold, italic, links and images.
6. **Publish**. It appears after the next hourly build, or run the workflow.

To take a post down, **Unpublish** it in the editor.

## Checking it locally

`npm run build` reads the project in `src/site.ts` (or `SANITY_PROJECT_ID` and
`SANITY_DATASET`), then `npm run preview`. `BLOG_SAMPLE=posts.json npm run build`
builds from a file instead (the same shape Sanity returns), for trying layouts.
`npm run dev` does not fetch posts; it says to build instead.

## Where things are

| What | File |
|---|---|
| Post types, checks and the Sanity query | `src/blog/schema.ts` |
| Blog list and article pages | `src/pages/Blog.tsx` |
| Blog styles | `src/blog.css` |
| Fetching posts and writing the pages | `scripts/prerender.js` |
| Editor fields | `studio/schemaTypes/post.ts` |

Backups: `npm --prefix studio run export` saves the dataset to
`output/blog-backup.tar.gz` (kept out of git; it can contain drafts).
