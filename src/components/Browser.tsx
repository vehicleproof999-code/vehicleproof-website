// A web app screen in a plain browser window.

export type WebScreen = 'dashboard' | 'passport' | 'compare';

type BrowserProps = {
  screen: WebScreen;
  alt: string;
  /** The small version drops the address and shrinks the title bar. */
  small?: boolean;
};

export function Browser({ screen, alt, small = false }: BrowserProps) {
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
        sizes={small ? '(max-width: 760px) 92vw, 460px' : '(max-width: 980px) 92vw, 940px'}
        width={1586}
        height={992}
        alt={alt}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}
