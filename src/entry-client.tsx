import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import './styles.css';

declare global {
  interface Window {
    /** Set once the app runs; see the fallback in index.html. */
    vpReady?: boolean;
  }
}

const root = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App pathname={location.pathname} />
  </StrictMode>
);

// Built pages arrive pre-rendered: attach to that HTML. The dev server sends an
// empty page: render from scratch.
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
window.vpReady = true;
