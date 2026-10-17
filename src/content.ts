import type { Market } from './market';

// Content shared by more than one page or component.

/** One section per industry. [id] is its anchor on the home page. */
export const industries = (market: Market) => [
  {
    id: 'rental', who: 'Car rental', title: '“That scratch was already there.” Not any more.',
    points: ['Photos at pick-up and return', 'New damage shown side by side', 'A sealed report for the renter'],
  },
  {
    id: 'fleets', who: 'Company fleets and delivery', title: 'Every vehicle checked. Every renewal on time.',
    points: [
      'Your whole team inspects, on their phones',
      market === 'MY' ? 'Road tax and insurance reminders' : 'Registration and insurance reminders',
      'Costs tracked for each vehicle',
    ],
  },
  {
    id: 'dealers', who: 'Used car dealers', title: "Show buyers exactly what they're getting.",
    points: ['Condition recorded at trade-in', 'Service history in one place', 'A sealed report with every sale'],
  },
  {
    id: 'leasing', who: 'Leasing and car subscription', title: 'End-of-lease charges, without the argument.',
    points: ['Photos at delivery and at return', 'Wear compared side by side', 'Proof behind every charge'],
  },
  {
    id: 'insurance', who: 'Insurers and assessors', title: 'Photos you can trust.',
    points: ['Customers inspect on their own phone', 'Every photo fingerprinted and timestamped', 'A sealed report, ready to review'],
  },
];

/** The form's choices; the values match the backend (WebsiteLeadService). */
export const businessTypes = [
  { value: 'rental', label: 'Car rental' },
  { value: 'dealer', label: 'Used car dealer' },
  { value: 'fleet', label: 'Company fleet' },
  { value: 'delivery', label: 'Delivery or ride-hailing' },
  { value: 'leasing', label: 'Leasing or car subscription' },
  { value: 'insurance', label: 'Insurer or assessor' },
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
