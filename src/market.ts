import { useEffect, useState } from 'react';

// Malaysia gets ringgit and local words (road tax); everyone else gets USD and
// words that work anywhere. Pre-rendered pages are international; Malaysia
// switches once the page loads, the way the app guesses.
export type Market = 'MY' | 'INTL';

/** Malaysia by time zone or device region; everywhere else is international. */
function guessMarket(): Market {
  const zone = Intl.DateTimeFormat().resolvedOptions().timeZone ?? '';
  const languages = navigator.languages ?? [navigator.language];
  const malaysia = zone === 'Asia/Kuala_Lumpur' || zone === 'Asia/Kuching' || languages.some((l) => /-MY$/i.test(l));
  return malaysia ? 'MY' : 'INTL';
}

export function useMarket(): Market {
  const [market, setMarket] = useState<Market>('INTL');
  useEffect(() => setMarket(guessMarket()), []);
  return market;
}

// The same prices the App Store and Google Play charge (see docs/SUBSCRIPTIONS.md in
// the app repo). Malaysia pays in ringgit; elsewhere the store converts from USD.
export const PRICES: Record<Market, { pro: string; tiers: Record<number, string> }> = {
  MY: {
    pro: 'RM39',
    tiers: { 20: 'RM150', 25: 'RM187.50', 30: 'RM225', 35: 'RM262.50', 40: 'RM300' },
  },
  INTL: {
    pro: '$14.99',
    tiers: { 20: '$50', 25: '$62.50', 30: '$79.90', 35: '$89.90', 40: '$99.90' },
  },
};

/** Up to this many vehicles Enterprise is a store subscription; above it, a quote. */
export const SELF_SERVE_MAX = 40;

/** Words and numbers that change with the market. */
export const LOCAL: Record<Market, {
  /** What has to be renewed to stay on the road. */
  renewals: string;
  renewalDates: string;
}> = {
  MY: { renewals: 'Road tax, insurance and services', renewalDates: 'Road tax, insurance and service dates' },
  INTL: { renewals: 'Registration, insurance and services', renewalDates: 'Registration, insurance and service dates' },
};
