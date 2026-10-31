import { useEffect, useRef, type MouseEvent } from 'react';
import { contactHref, prefersStill, supportEmail } from '../site';

const navLinks = [
  { href: '/#industries', label: 'Industries' },
  { href: '/#how', label: 'How it works' },
  { href: '/#screens', label: 'Screenshots' },
  { href: '/#plans', label: 'Pricing' },
  { href: '/personal/', label: 'Personal' },
  { href: '/blog/', label: 'Blog' },
  { href: '/support/', label: 'Support' },
];

/** How long the menu takes to slide away (.nav-menu.closing in styles.css). */
const CLOSE_MS = 160;

/**
 * The menu on phones and tablets. A <details>, so it opens without the script
 * too; the script adds the closing animation, and closes it after a choice, on
 * a tap elsewhere and on Escape.
 */
function NavMenu({ current }: { current: string }) {
  const menu = useRef<HTMLDetailsElement>(null);

  const close = () => {
    const el = menu.current;
    if (!el?.open || el.classList.contains('closing')) return;
    if (prefersStill()) {
      el.open = false;
      return;
    }
    el.classList.add('closing');
    setTimeout(() => {
      el.open = false;
      el.classList.remove('closing');
    }, CLOSE_MS);
  };

  useEffect(() => {
    const onPointer = (event: PointerEvent) => {
      if (!menu.current?.contains(event.target as Node)) close();
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || !menu.current?.open) return;
      close();
      menu.current.querySelector('summary')?.focus();
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  const onSummary = (event: MouseEvent) => {
    if (!menu.current?.open) return;
    event.preventDefault();
    close();
  };

  return (
    <details className="nav-menu" ref={menu}>
      <summary aria-label="Menu" onClick={onSummary}>
        <span className="burger" aria-hidden="true"><i /><i /><i /></span>
      </summary>
      <nav className="nav-sheet" aria-label="Main">
        {navLinks.map((link, index) => (
          <a
            key={link.href}
            href={link.href}
            onClick={close}
            aria-current={link.href === current ? 'page' : undefined}
            style={{ animationDelay: `${index * 25}ms` }}
          >
            {link.label}
          </a>
        ))}
        <a className="pill" href={contactHref} onClick={close} style={{ animationDelay: `${navLinks.length * 25}ms` }}>
          Talk to us
        </a>
      </nav>
    </details>
  );
}

/** The thin top bar: the icon, centred links and one button; a menu on smaller screens. [current] marks the page you're on. */
export function Nav({ current }: { current: string }) {
  return (
    <header className="nav">
      <div className="wrap">
        <a className="brand" href="/" aria-label="VehicleProve home">
          <img src="/assets/img/icon-96.png" alt="" width={29} height={29} />
          <span className="wordmark" aria-hidden="true">Vehicle<span>Prove</span></span>
        </a>
        <nav className="nav-links" aria-label="Main">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} aria-current={link.href === current ? 'page' : undefined}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="nav-end">
          <a className="pill pill-small" href={contactHref}>Talk to us</a>
          <NavMenu current={current} />
        </div>
      </div>
    </header>
  );
}

/** One quiet line: who runs the site, and the legal and help pages. */
export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <span>© 2026 FoundryOps. Made in Malaysia, for fleets everywhere.</span>
        <nav aria-label="Footer">
          <a href="/blog/">Blog</a>
          <a href="/privacy/">Privacy</a>
          <a href="/terms/">Terms</a>
          <a href="/support/">Support</a>
          <a href="/delete-account/">Delete account</a>
          <a href={`mailto:${supportEmail}`}>{supportEmail}</a>
        </nav>
      </div>
    </footer>
  );
}
