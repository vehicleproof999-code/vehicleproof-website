// An app screen shown in an iPhone 17 Pro (Silver), seen from the front.
// The frame is drawn in CSS, so it stays sharp at any size: --w on .iphone
// sets the width and everything else scales from it.

export type ScreenName = 'home' | 'camera' | 'summary' | 'compare' | 'service' | 'alerts';

/** Screens whose top edge is black (the camera), so the status bar is white. */
const darkTop: ScreenName[] = ['camera'];

type IphoneProps = {
  screen: ScreenName;
  alt: string;
  /** Size class: the hero phone, a step in a row, or a phone inside a tile. */
  size: 'hero' | 'step' | 'tile';
  /** Load straight away (the first image on the page) instead of when near. */
  eager?: boolean;
};

const sizes: Record<IphoneProps['size'], string> = {
  hero: '(max-width: 600px) 66vw, 280px',
  step: '(max-width: 760px) 60vw, 200px',
  tile: '(max-width: 760px) 60vw, 210px',
};

export function Iphone({ screen, alt, size, eager = false }: IphoneProps) {
  const base = `/assets/img/screen-${screen}`;
  return (
    <div className={`iphone iphone-${size}`}>
      <i className="btn l action" /><i className="btn l vol-up" /><i className="btn l vol-down" />
      <i className="btn r side" /><i className="btn r camera-control" />
      <div className="bezel">
        <div className={darkTop.includes(screen) ? 'display dark' : 'display'}>
          <div className="status" aria-hidden="true"><span>9:41</span><StatusIcons /></div>
          <i className="island" />
          <img
            src={`${base}-800.webp`}
            srcSet={`${base}-400.webp 400w, ${base}-800.webp 800w`}
            sizes={sizes[size]}
            width={800}
            height={1738}
            alt={alt}
            loading={eager ? undefined : 'lazy'}
            decoding="async"
          />
        </div>
      </div>
    </div>
  );
}

/** Signal, Wi-Fi and battery, as on the iPhone's status bar. */
function StatusIcons() {
  return (
    <svg viewBox="0 0 68 12">
      <rect x="0" y="8" width="3" height="4" rx="1" />
      <rect x="5" y="6" width="3" height="6" rx="1" />
      <rect x="10" y="3" width="3" height="9" rx="1" />
      <rect x="15" y="0" width="3" height="12" rx="1" />
      <path d="M30 3.2a10 10 0 0 1 13 0l-1.3 1.4a8 8 0 0 0-10.4 0zM32.4 5.9a6.3 6.3 0 0 1 8.2 0l-1.3 1.4a4.4 4.4 0 0 0-5.6 0zM34.8 8.6a2.7 2.7 0 0 1 3.4 0L36.5 10.5z" />
      <rect x="47" y="1" width="18" height="10" rx="3" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <rect x="49" y="3" width="14" height="6" rx="1.5" />
      <rect x="66" y="4.5" width="1.6" height="3" rx="1" />
    </svg>
  );
}
