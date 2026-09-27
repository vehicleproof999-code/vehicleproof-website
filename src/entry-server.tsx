import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import { routes, type Route } from './routes';
import { siteUrl } from './site';

export { routes };

const escape = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function head(route: Route) {
  const url = siteUrl + (route.path === '/404' ? '/' : route.path);
  const tags = [
    `<title>${escape(route.title)}</title>`,
    `<meta name="description" content="${escape(route.description)}">`,
    route.noindex ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${url}">`,
    `<meta property="og:title" content="${escape(route.title)}">`,
    `<meta property="og:description" content="${escape(route.description)}">`,
    `<meta property="og:image" content="${siteUrl}/assets/img/og.png">`,
    `<meta property="og:url" content="${url}">`,
  ];
  return tags.join('\n  ');
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
