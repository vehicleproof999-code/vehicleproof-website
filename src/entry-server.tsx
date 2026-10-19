import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import { allPostsQuery, buildBlogPages, type BlogPage } from './blog/schema';
import { routes, type Route } from './routes';
import { sanity, siteUrl } from './site';

export { allPostsQuery, buildBlogPages, routes, sanity, siteUrl };

const escape = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

type Meta = Pick<Route, 'path' | 'title' | 'description' | 'noindex'> & Partial<Pick<BlogPage, 'ogType' | 'ogImage' | 'publishedTime'>>;

function head(page: Meta) {
  const url = siteUrl + (page.path === '/404' ? '/' : page.path);
  const tags = [
    `<title>${escape(page.title)}</title>`,
    `<meta name="description" content="${escape(page.description)}">`,
    page.noindex ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${url}">`,
    `<meta property="og:type" content="${page.ogType ?? 'website'}">`,
    `<meta property="og:title" content="${escape(page.title)}">`,
    `<meta property="og:description" content="${escape(page.description)}">`,
    `<meta property="og:image" content="${escape(page.ogImage ?? `${siteUrl}/assets/img/og.png`)}">`,
    `<meta property="og:url" content="${url}">`,
    ...(page.publishedTime ? [`<meta property="article:published_time" content="${escape(page.publishedTime)}">`] : []),
  ];
  return tags.join('\n  ');
}

/**
 * A blog page, with its data in a JSON script the browser reads to attach to
 * the same HTML. "<" is written as < so the text can never close the script tag.
 */
export function renderBlog(page: BlogPage) {
  const json = JSON.stringify(page.data).replace(/</g, '\\u003c');
  return {
    head: `${head(page)}\n  <script type="application/json" id="blog-data">${json}</script>`,
    html: renderToString(
      <StrictMode>
        <App pathname={page.path} blog={page.data} />
      </StrictMode>,
    ),
  };
}

/** The HTML for one page, used by scripts/prerender.js at build time. */
export function render(route: Route) {
  return {
    head: head(route),
    html: renderToString(
      <StrictMode>
        <App pathname={route.path} />
      </StrictMode>,
    ),
  };
}
