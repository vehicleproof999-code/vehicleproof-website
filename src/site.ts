// Facts used on more than one page.
export const supportEmail = 'vehicleproof999@gmail.com';
export const siteUrl = 'https://vehicleproof.app';
export const tagline = 'Document. Protect. Prove.';

/** An email to the team, marked as a business enquiry: the fallback when the form can't send. */
export const businessMail = `mailto:${supportEmail}?subject=${encodeURIComponent('VehicleProof for business')}`;

/** "Talk to us": the business enquiry form. */
export const contactHref = '/#contact';

/** Where the enquiry form posts (backend WebsiteLeadController). VITE_LEADS_URL overrides it for testing. */
export const leadsUrl: string = import.meta.env.VITE_LEADS_URL ?? 'https://api.vehicleproof.app/api/v1/public/leads';

/**
 * The Sanity project the blog is written in (studio/). Both are public, not
 * secrets. SANITY_PROJECT_ID and SANITY_DATASET override them at build time.
 * Without a project ID the blog shows that posts are on their way.
 */
export const sanity = { projectId: '', dataset: 'production' };

/** Joins class names, skipping empty ones. */
export const cx = (...names: (string | false | null | undefined)[]) => names.filter(Boolean).join(' ');

/** True when the visitor asked their device for less motion. */
export const prefersStill = () =>
  typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
