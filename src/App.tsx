import { useEffect } from 'react';
import { Footer, Nav } from './components/Chrome';
import { findRoute } from './routes';

export default function App({ pathname }: { pathname: string }) {
  const route = findRoute(pathname);
  const Page = route.page;

  // Pre-rendered pages already have their title; this covers `npm run dev`.
  useEffect(() => {
    document.title = route.title;
  }, [route.title]);

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Nav current={route.path} />
      <main id="main" className={route.document ? 'narrow doc' : undefined}>
        <Page />
      </main>
      <Footer />
    </>
  );
}
