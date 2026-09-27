// The app images. "app" is the full store image (headline, phone, background);
// "scene" is the same image cropped below its headline, for sections that
// carry their own large text.

export type ShotName = 'hub' | 'garage' | 'vehicle' | 'new-inspection' | 'camera' | 'summary' | 'compare' | 'history';

const sceneHeight: Record<ShotName, number> = {
  hub: 1431, garage: 1440, vehicle: 1437, 'new-inspection': 1428,
  camera: 1418, summary: 1420, compare: 1419, history: 1424,
};

type ShotProps = {
  name: ShotName;
  kind: 'app' | 'scene';
  alt: string;
  /** How wide the image is shown, for the browser to pick a file size. */
  sizes: string;
  /** Load straight away (the first image on the page) instead of when near. */
  eager?: boolean;
};

export function Shot({ name, kind, alt, sizes, eager = false }: ShotProps) {
  const base = `/assets/img/${kind}-${name}`;
  return (
    <img
      src={`${base}-852.webp`}
      srcSet={`${base}-426.webp 426w, ${base}-852.webp 852w`}
      sizes={sizes}
      width={852}
      height={kind === 'app' ? 1846 : sceneHeight[name]}
      alt={alt}
      loading={eager ? undefined : 'lazy'}
      decoding="async"
    />
  );
}
