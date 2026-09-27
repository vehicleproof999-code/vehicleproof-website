// Facts used on more than one page.
export const supportEmail = 'vehicleproof999@gmail.com';
export const siteUrl = 'https://vehicleproof.app';
export const tagline = 'Document. Protect. Prove.';

/** Joins class names, skipping empty ones. */
export const cx = (...names: (string | false | null | undefined)[]) => names.filter(Boolean).join(' ');

/** True when the visitor asked their device for less motion. */
export const prefersStill = () =>
  typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
