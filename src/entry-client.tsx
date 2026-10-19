import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import type { BlogPageData } from './blog/schema';
import './styles.css';
import './blog.css';

declare global {
  interface Window {
    /** Set once the app runs; see the fallback in index.html. */
    vpReady?: boolean;
  }
}

const root = document.getElementById('root')!;
// A blog page carries its posts, as built (src/entry-server.tsx).
const blogData = document.getElementById('blog-data')?.textContent;
const blog = blogData ? (JSON.parse(blogData) as BlogPageData) : undefined;
const app = (
  <StrictMode>
    <App pathname={location.pathname} blog={blog} />
  </StrictMode>
);

// Built pages arrive pre-rendered: attach to that HTML. The dev server sends an
// empty page: render from scratch.
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
window.vpReady = true;
