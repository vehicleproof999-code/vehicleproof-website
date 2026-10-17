import { contactHref, supportEmail } from '../site';

const navLinks = [
  { href: '/#industries', label: 'Industries' },
  { href: '/#how', label: 'How it works' },
  { href: '/#web-app', label: 'Web app' },
  { href: '/#plans', label: 'Pricing' },
  { href: '/personal/', label: 'Personal' },
  { href: '/support/', label: 'Support' },
];

/** The thin top bar: the icon, centred links and one button. [current] marks the page you're on. */
export function Nav({ current }: { current: string }) {
  return (
    <header className="nav">
      <div className="wrap">
        <a className="brand" href="/" aria-label="VehicleProof home">
          <img src="/assets/img/icon-96.png" alt="" width={24} height={24} />
        </a>
        <nav className="nav-links" aria-label="Main">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} aria-current={link.href === current ? 'page' : undefined}>
              {link.label}
            </a>
          ))}
        </nav>
        <a className="pill pill-small" href={contactHref}>Talk to us</a>
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
