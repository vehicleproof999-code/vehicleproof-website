// Writes every page as real HTML into dist/, so the text is there without
// JavaScript (store reviewers, search engines, link previews). React then
// attaches to it in the browser for the scroll effects.
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const template = readFileSync(join(dist, 'index.html'), 'utf8');
const { render, renderBlog, routes, siteUrl, sanity, allPostsQuery, buildBlogPages } =
  await import(pathToFileURL(join(root, '.ssr', 'entry-server.js')).href);

function write(path, { head, html }) {
  const page = template.replace('<!--app-head-->', () => head).replace('<!--app-html-->', () => html);
  const file = path === '/404' ? join(dist, '404.html') : join(dist, path, 'index.html');
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, page);
  console.log(`  ${path.length > 40 ? `${path.slice(0, 37)}...` : path.padEnd(40)} ${(page.length / 1024).toFixed(1)} kB`);
}

for (const route of routes) write(route.path, render(route));

// The blog: every published post, fetched once from Sanity (studio/) and
// written as pages. If Sanity cannot be reached the build stops, so the live
// site keeps its posts rather than being replaced by an empty blog.
async function publishedPosts() {
  if (process.env.BLOG_SAMPLE) {
    console.log(`  (blog: sample posts from ${process.env.BLOG_SAMPLE})`);
    return JSON.parse(readFileSync(process.env.BLOG_SAMPLE, 'utf8'));
  }
  const projectId = process.env.SANITY_PROJECT_ID || sanity.projectId;
  const dataset = process.env.SANITY_DATASET || sanity.dataset;
  if (!projectId) {
    console.log('  (blog: no Sanity project yet, so the blog shows that posts are on their way)');
    return [];
  }
  if (!/^[a-z0-9]+$/.test(projectId) || !/^[a-zA-Z0-9_-]+$/.test(dataset)) throw new Error('The Sanity project ID or dataset is not valid.');
  // The public dataset needs no token; only published content is returned.
  const url = new URL(`https://${projectId}.api.sanity.io/v2025-02-19/data/query/${dataset}`);
  url.searchParams.set('query', allPostsQuery);
  url.searchParams.set('perspective', 'published');
  const response = await fetch(url, { signal: AbortSignal.timeout(20_000) });
  if (!response.ok) throw new Error(`Sanity answered ${response.status}; the blog was not rebuilt.`);
  const { result } = await response.json();
  return result;
}

const { pages: blogPages, skipped } = buildBlogPages(await publishedPosts());
for (const title of skipped) console.warn(`  (blog: left out "${title}": it is missing a required field)`);
for (const page of blogPages) write(page.path, renderBlog(page));

// Every indexed page, for search engines (robots.txt points here).
const urls = [...routes.filter((route) => !route.noindex), ...blogPages]
  .map((page) => `  <url><loc>${siteUrl}${page.path}</loc></url>`);
writeFileSync(join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`);
console.log(`  sitemap.xml        ${urls.length} pages`);
rmSync(join(root, '.ssr'), { recursive: true, force: true });
