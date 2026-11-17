import { Fragment, useEffect, useRef, type MouseEvent } from 'react';
import { industryMenu } from '../content';
import { contactHref, prefersStill, signInHref, supportEmail, trialHref } from '../site';
import { IndustryIcon } from './IndustryIcons';

// Few links, so the bar reads at a glance; Blog and Support are in the footer.
// Industries opens a list of them (IndustriesMenu) between How it works and Pricing.
const navLinks = [
  { href: '/#how', label: 'How it works' },
  { href: '/#plans', label: 'Pricing' },
  { href: '/personal/', label: 'Personal' },
];

const Chevron = () => (
  <svg className="chevron" viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
    <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * Industries in the top bar: a <details>, so it opens without the script too.
 * The arrow turns up while it is open; a choice, a click elsewhere or Escape
 * closes it.
 */
function IndustriesMenu() {
  const menu = useRef<HTMLDetailsElement>(null);
  const close = () => {
    if (menu.current) menu.current.open = false;
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

  return (
    <details className="nav-drop" ref={menu}>
      <summary>Industries <Chevron /></summary>
      <div className="drop-panel">
        <ul>
          {industryMenu.map((item) => (
            <li key={item.id}>
              <a href={`/#${item.id}`} onClick={close}>
                <span className="drop-icon"><IndustryIcon id={item.id} /></span>
                <span><b>{item.who}</b><small>{item.blurb}</small></span>
              </a>
            </li>
          ))}
        </ul>
        <a className="link-arrow drop-all" href="/#industries" onClick={close}>See every industry</a>
      </div>
    </details>
  );
}

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
          <Fragment key={link.href}>
            <a
              href={link.href}
              onClick={close}
              aria-current={link.href === current ? 'page' : undefined}
              style={{ animationDelay: `${index * 25}ms` }}
            >
              {link.label}
            </a>
            {index === 0 && (
              <details className="sheet-group" style={{ animationDelay: '25ms' }}>
                <summary>Industries <Chevron /></summary>
                <ul>
                  {industryMenu.map((item) => (
                    <li key={item.id}>
                      <a href={`/#${item.id}`} onClick={close}>
                        <span className="drop-icon"><IndustryIcon id={item.id} /></span>{item.who}
                      </a>
                    </li>
                  ))}
                </ul>
              </details>
            )}
          </Fragment>
        ))}
        <a href={contactHref} onClick={close} style={{ animationDelay: `${navLinks.length * 25}ms` }}>Talk to us</a>
        <a href={signInHref} style={{ animationDelay: `${(navLinks.length + 1) * 25}ms` }}>Sign in</a>
        <a className="pill" href={trialHref()} style={{ animationDelay: `${(navLinks.length + 2) * 25}ms` }}>
          Start free trial
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
          {navLinks.map((link, index) => (
            <Fragment key={link.href}>
              <a href={link.href} aria-current={link.href === current ? 'page' : undefined}>{link.label}</a>
              {index === 0 && <IndustriesMenu />}
            </Fragment>
          ))}
        </nav>
        <div className="nav-end">
          <a className="nav-signin" href={signInHref}>Sign in</a>
          <a className="pill pill-small" href={trialHref()}>Start free trial</a>
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
