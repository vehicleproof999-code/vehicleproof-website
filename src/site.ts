// Facts used on more than one page.
export const supportEmail = 'support@vehicleprove.com';
export const siteUrl = 'https://vehicleprove.com';
export const tagline = 'Document. Protect. Prove.';

/** An email to the team, marked as a business enquiry: the fallback when the form can't send. */
export const businessMail = `mailto:${supportEmail}?subject=${encodeURIComponent('VehicleProve for business')}`;

/** The web app, where businesses sign up and sign in. */
export const portalUrl = 'https://portal.vehicleprove.com';

/** Sign in to the web app. */
export const signInHref = `${portalUrl}/sign-in`;

/**
 * "Start free trial": create an account in the web app, then a free 14-day
 * Enterprise trial. The fleet size chosen on the page goes along (?fleet=30).
 */
export const trialHref = (vehicles?: number) => `${portalUrl}/start${vehicles ? `?fleet=${vehicles}` : ''}`;

/** "Talk to us": the business enquiry form. */
export const contactHref = '/#contact';

/** Where the enquiry form posts (backend WebsiteLeadController). VITE_LEADS_URL overrides it for testing. */
export const leadsUrl: string = import.meta.env.VITE_LEADS_URL ?? 'https://api.vehicleprove.com/api/v1/public/leads';

/**
 * The Sanity project the blog is written in (studio/). Both are public, not
 * secrets. SANITY_PROJECT_ID and SANITY_DATASET override them at build time.
 * Without a project ID the blog shows that posts are on their way.
 */
export const sanity = { projectId: 'g27fq7yx', dataset: 'production' };

/** Joins class names, skipping empty ones. */
export const cx = (...names: (string | false | null | undefined)[]) => names.filter(Boolean).join(' ');

/** True when the visitor asked their device for less motion. */
export const prefersStill = () =>
  typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
