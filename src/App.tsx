import { useEffect } from 'react';
import type { BlogPageData } from './blog/schema';
import { Footer, Nav } from './components/Chrome';
import { Blog } from './pages/Blog';
import { findRoute, isBlogPath } from './routes';

/** [blog] is the blog page's own data, built into the page (scripts/prerender.js). */
export default function App({ pathname, blog }: { pathname: string; blog?: BlogPageData }) {
  const route = findRoute(pathname);
  const Page = route.page;
  const onBlog = isBlogPath(pathname);

  // Pre-rendered pages already have their title; this covers `npm run dev`.
  useEffect(() => {
    if (!onBlog) document.title = route.title;
  }, [route.title, onBlog]);

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Nav current={onBlog ? '/blog/' : route.path} />
      <main id="main" className={!onBlog && route.document ? 'narrow doc' : undefined}>
        {onBlog ? <Blog data={blog} /> : <Page />}
      </main>
      <Footer />
    </>
  );
}
