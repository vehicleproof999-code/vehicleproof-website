import { z } from 'zod';

// The blog's content, as published in Sanity (studio/). Ported from the
// FoundryOps blog (shared/blogSchema.ts and server/blog.ts). Posts are fetched
// once at build time (scripts/prerender.js) and written as real pages; each is
// checked here first, so a malformed post is left out instead of breaking the site.

// The page code never generates code from strings.
z.config({ jitless: true });

export const BLOG_PAGE_SIZE = 12;

export const blogSlugSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(96);
export const blogImageSchema = z.object({
  url: z.string().url().refine((value) => {
    const url = new URL(value);
    return url.protocol === 'https:' && url.hostname === 'cdn.sanity.io';
  }),
  alt: z.string(),
  caption: z.string().nullish().transform((value) => value ?? undefined),
});
const spanSchema = z.object({
  _type: z.literal('span'), _key: z.string(), text: z.string(), marks: z.array(z.string()).default([]),
});
const textBlockSchema = z.object({
  _type: z.literal('block'), _key: z.string(),
  style: z.enum(['normal', 'h2', 'h3', 'blockquote']).default('normal'),
  children: z.array(spanSchema),
  markDefs: z.array(z.object({ _type: z.literal('link'), _key: z.string(), href: z.string() })).default([]),
  listItem: z.enum(['bullet', 'number']).optional(), level: z.number().int().min(1).optional(),
});
/** A table from the editor's Table block (@sanity/table): rows of text cells; the first row is the heading. */
export const blogTableSchema = z.object({
  _type: z.literal('table'), _key: z.string(),
  rows: z.array(z.object({ _key: z.string(), cells: z.array(z.string().nullish().transform((value) => value ?? '')).default([]) })).default([]),
});
export type BlogTable = z.infer<typeof blogTableSchema>;

export const blogSummarySchema = z.object({
  id: z.string(), slug: blogSlugSchema, title: z.string(), excerpt: z.string(),
  publishedAt: z.iso.datetime({ offset: true }), author: z.string(),
  category: z.enum(['insight', 'update']), coverImage: blogImageSchema.nullable(),
});
export const blogPostSchema = blogSummarySchema.extend({
  body: z.array(z.union([textBlockSchema, blogImageSchema.extend({ _type: z.literal('image'), _key: z.string() }), blogTableSchema])),
});
export type BlogSummary = z.infer<typeof blogSummarySchema>;
export type BlogPost = z.infer<typeof blogPostSchema>;

export function getBlogSections(post: BlogPost) {
  return post.body.flatMap((block, index) => block._type === 'block' && !block.listItem && (block.style === 'h2' || block.style === 'h3')
    ? [{ key: block._key, id: `blog-section-${index}`, title: block.children.map((span) => span.text).join(''), level: block.style }]
    : []);
}

export function getBlogReadingMinutes(post: BlogPost): number {
  const text = post.body.flatMap((block) => block._type === 'block' ? block.children.map((span) => span.text)
    : block._type === 'table' ? block.rows.flatMap((row) => row.cells) : []).join(' ');
  return Math.max(1, Math.ceil(text.trim().split(/\s+/).filter(Boolean).length / 200));
}

// CMS-authored links must never become executable URLs in the browser.
export function safeBlogLink(value: string): string | undefined {
  if ([...value].some((character) => character.charCodeAt(0) < 32 || character.charCodeAt(0) === 127)) return undefined;
  if (value.startsWith('/') && !value.startsWith('//') && !value.includes('\\')) return value;
  try {
    const url = new URL(value);
    return ['https:', 'http:', 'mailto:'].includes(url.protocol) ? url.href : undefined;
  } catch { return undefined; }
}

/** A Sanity image at a sensible width, in a modern format where the browser supports it. */
export const sizedImage = (url: string, width: number) => `${url}?w=${width}&auto=format&fit=max`;

// Published posts only: no drafts or versions, and none dated in the future.
const imageProjection = '{"url": asset->url, "alt": coalesce(alt, ""), caption}';
const summaryProjection = `"id": _id, "slug": slug.current, title, excerpt, publishedAt,
  "author": coalesce(author, "VehicleProof"), "category": coalesce(category, "insight"),
  "coverImage": select(defined(coverImage.asset) => coverImage${imageProjection}, null)`;
const publishedFilter = `_type == "post" && !(_id in path("drafts.**")) && !(_id in path("versions.**"))
  && defined(slug.current) && defined(publishedAt) && dateTime(publishedAt) <= dateTime(now())`;

/** Every published post with its article, newest first: the one query the build makes. */
export const allPostsQuery = `*[${publishedFilter}] | order(publishedAt desc, _id asc){${summaryProjection},
  "body": body[]{..., _type == "image" => ${imageProjection}}}`;

/** What a blog page needs, written into the page so the browser shows the same thing. */
export type BlogPageData =
  | { kind: 'index'; page: number; pages: number; posts: BlogSummary[] }
  | { kind: 'article'; post: BlogPost; related: BlogSummary[] };

export type BlogPage = {
  path: string;
  title: string;
  description: string;
  data: BlogPageData;
  ogType: 'website' | 'article';
  ogImage?: string;
  publishedTime?: string;
};

const summaryOf = ({ body: _body, ...summary }: BlogPost): BlogSummary => summary;

export const blogIndexPath = (page: number) => (page === 1 ? '/blog/' : `/blog/page/${page}/`);
export const blogDescription = 'News, guides and updates from the VehicleProof team.';

/**
 * Every blog page for these posts (as Sanity returned them): the list, in
 * pages of 12, and one page per article. Posts that do not fit the schema are
 * left out and reported in [skipped].
 */
export function buildBlogPages(raw: unknown): { pages: BlogPage[]; skipped: string[] } {
  const items = Array.isArray(raw) ? raw : [];
  const posts: BlogPost[] = [];
  const skipped: string[] = [];
  const seen = new Set<string>();
  for (const item of items) {
    const parsed = blogPostSchema.safeParse(item);
    if (!parsed.success || seen.has(parsed.data.slug)) {
      const title = item && typeof item === 'object' && 'title' in item ? String((item as { title: unknown }).title) : 'Untitled';
      skipped.push(title);
      continue;
    }
    seen.add(parsed.data.slug);
    posts.push(parsed.data);
  }

  const total = Math.max(1, Math.ceil(posts.length / BLOG_PAGE_SIZE));
  const pages: BlogPage[] = [];
  for (let page = 1; page <= total; page++) {
    pages.push({
      path: blogIndexPath(page),
      title: page === 1 ? 'Blog · VehicleProof' : `Blog, page ${page} · VehicleProof`,
      description: blogDescription,
      ogType: 'website',
      data: { kind: 'index', page, pages: total, posts: posts.slice((page - 1) * BLOG_PAGE_SIZE, page * BLOG_PAGE_SIZE).map(summaryOf) },
    });
  }
  for (const post of posts) {
    pages.push({
      path: `/blog/${post.slug}/`,
      title: `${post.title} · VehicleProof`,
      description: post.excerpt,
      ogType: 'article',
      ogImage: post.coverImage ? sizedImage(post.coverImage.url, 1200) : undefined,
      publishedTime: post.publishedAt,
      data: { kind: 'article', post, related: posts.filter((other) => other.slug !== post.slug).slice(0, 3).map(summaryOf) },
    });
  }
  return { pages, skipped };
}
