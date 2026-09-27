import { supportEmail, tagline } from '../site';

function Brand() {
  return (
    <a className="brand" href="/">
      <img src="/assets/img/icon-96.png" alt="" width={28} height={28} />
      <b>Vehicle<span>Proof</span></b>
    </a>
  );
}

const navLinks = [
  { href: '/#story', label: 'How it works', wideOnly: true },
  { href: '/#gallery', label: 'Screenshots', wideOnly: true },
  { href: '/privacy/', label: 'Privacy' },
  { href: '/support/', label: 'Support' },
];

/** The slim top bar. [current] marks the page you're on. */
export function Nav({ current }: { current: string }) {
  return (
    <header className="nav">
      <div className="wrap">
        <Brand />
        <nav className="nav-links" aria-label="Main">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={link.wideOnly ? 'hide-sm' : undefined}
              aria-current={link.href === current ? 'page' : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div>
            <Brand />
            <p>{tagline}</p>
          </div>
          <div>
            <h2>Product</h2>
            <ul>
              <li><a href="/#story">How it works</a></li>
              <li><a href="/#gallery">Screenshots</a></li>
              <li><a href="/support/">Support</a></li>
            </ul>
          </div>
          <div>
            <h2>Legal</h2>
            <ul>
              <li><a href="/privacy/">Privacy Policy</a></li>
              <li><a href="/terms/">Terms of Service</a></li>
              <li><a href="/delete-account/">Delete your account</a></li>
            </ul>
          </div>
          <div>
            <h2>Contact</h2>
            <ul>
              <li><a href={`mailto:${supportEmail}`}>{supportEmail}</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 FoundryOps. All rights reserved.</span>
          <span>VehicleProof is operated from Malaysia.</span>
        </div>
      </div>
    </footer>
  );
}
