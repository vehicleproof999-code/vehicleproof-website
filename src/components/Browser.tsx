// A web app screen in a plain browser window. The screens are screenshots of
// the real web app (portal.vehicleproof.app) with sample vehicles.

export type WebScreen = 'dashboard' | 'vehicles' | 'passport' | 'report' | 'compare' | 'service' | 'alerts';

type BrowserProps = {
  screen: WebScreen;
  alt: string;
  /** The small version drops the address and shrinks the title bar. */
  small?: boolean;
  /** How wide the image shows, when it isn't the full-width or small default. */
  sizes?: string;
};

export function Browser({ screen, alt, small = false, sizes }: BrowserProps) {
  const base = `/assets/img/web-${screen}`;
  return (
    <div className={small ? 'browser small' : 'browser'}>
      <div className="bar" aria-hidden="true">
        <i /><i /><i />
        {!small && <span>portal.vehicleproof.app</span>}
      </div>
      <img
        src={`${base}-1586.webp`}
        srcSet={`${base}-800.webp 800w, ${base}-1586.webp 1586w`}
        sizes={sizes ?? (small ? '(max-width: 760px) 92vw, 460px' : '(max-width: 980px) 92vw, 940px')}
        width={1586}
        height={992}
        alt={alt}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}
