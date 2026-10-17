import type { Market } from './market';
import { LOCAL } from './market';

// Content shared by the home page and the business page.

/** One card per kind of business. [id] is the anchor on the business page. */
export const businesses = (market: Market) => [
  {
    id: 'rental', who: 'Car rental', title: 'Every handover, settled.',
    text: 'Check out and check in with guided photos. New damage sits side by side with the last rental, so a dispute ends with a photo, not an argument.',
  },
  {
    id: 'dealers', who: 'Used car dealers', title: 'Sell with a history buyers trust.',
    text: 'Inspect at trade-in, log the reconditioning work, and hand every buyer a sealed condition report.',
  },
  {
    id: 'fleets', who: 'Company fleets', title: 'Every vehicle, road-legal.',
    text: `${LOCAL[market].renewalDates} for the whole fleet, with a reminder before anything lapses.`,
  },
  {
    id: 'delivery', who: 'Delivery and ride-hailing', title: 'Many drivers. One record.',
    text: "Drivers inspect on their own phones. Managers see every vehicle's condition and running costs in one place.",
  },
];

/** The form's choices; the values match the backend (WebsiteLeadService). */
export const businessTypes = [
  { value: 'rental', label: 'Car rental' },
  { value: 'dealer', label: 'Used car dealer' },
  { value: 'fleet', label: 'Company fleet' },
  { value: 'delivery', label: 'Delivery or ride-hailing' },
  { value: 'other', label: 'Something else' },
];

export const fleetSizes = ['1-9', '10-19', '20-40', '41-100', '101-500', '500+'];

/** The fleet-size choice for a number of vehicles (from the Plans slider). */
export function fleetSizeFor(vehicles: number) {
  if (vehicles < 10) return '1-9';
  if (vehicles < 20) return '10-19';
  if (vehicles <= 40) return '20-40';
  if (vehicles <= 100) return '41-100';
  if (vehicles <= 500) return '101-500';
  return '500+';
}

/** Suggested in the country field; any country can be typed. */
export const countries = [
  'Malaysia', 'Singapore', 'Indonesia', 'Thailand', 'Philippines', 'Vietnam', 'Brunei', 'Australia', 'New Zealand',
  'India', 'United Arab Emirates', 'Saudi Arabia', 'United Kingdom', 'Ireland', 'Germany', 'France', 'Netherlands',
  'Spain', 'Italy', 'United States', 'Canada', 'Mexico', 'Brazil', 'South Africa', 'Nigeria', 'Kenya', 'Japan',
  'South Korea', 'Hong Kong', 'Taiwan',
];
