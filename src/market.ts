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
export const PRICES: Record<Market, { pro: string; tiers: Record<number, string>; tierAmounts: Record<number, number> }> = {
  MY: {
    pro: 'RM39',
    tiers: { 20: 'RM150', 25: 'RM187.50', 30: 'RM225', 35: 'RM262.50', 40: 'RM300' },
    tierAmounts: { 20: 150, 25: 187.5, 30: 225, 35: 262.5, 40: 300 },
  },
  INTL: {
    pro: '$14.99',
    tiers: { 20: '$50', 25: '$62.50', 30: '$79.90', 35: '$89.90', 40: '$99.90' },
    tierAmounts: { 20: 50, 25: 62.5, 30: 79.9, 35: 89.9, 40: 99.9 },
  },
};

/** Up to this many vehicles Enterprise is a store subscription; above it, a quote. */
export const SELF_SERVE_MAX = 40;

/** Words and numbers that change with the market. */
export const LOCAL: Record<Market, {
  symbol: string;
  /** What has to be renewed to stay on the road. */
  renewals: string;
  renewalDates: string;
  /** A typical repair bill for damage after a rental, for the calculator. */
  typicalClaim: number;
  /** About what one vehicle costs above the store tiers, for the calculator only. */
  perVehicle: number;
}> = {
  MY: { symbol: 'RM', renewals: 'Road tax, insurance and services', renewalDates: 'Road tax, insurance and service dates', typicalClaim: 800, perVehicle: 7.5 },
  INTL: { symbol: '$', renewals: 'Registration, insurance and services', renewalDates: 'Registration, insurance and service dates', typicalClaim: 300, perVehicle: 2.5 },
};

/** "RM1,250" or "$79.90": whole amounts without cents. */
export function money(market: Market, amount: number) {
  const whole = Math.abs(amount - Math.round(amount)) < 0.005;
  const text = amount.toLocaleString('en-US', { minimumFractionDigits: whole ? 0 : 2, maximumFractionDigits: whole ? 0 : 2 });
  return LOCAL[market].symbol + text;
}

/** Enterprise for this many vehicles each month: the store tier, or an estimate above it. */
export function enterpriseMonthly(market: Market, vehicles: number) {
  const tiers = PRICES[market].tierAmounts;
  if (vehicles <= 20) return { amount: tiers[20], estimate: false };
  if (vehicles <= SELF_SERVE_MAX) return { amount: tiers[Math.ceil(vehicles / 5) * 5], estimate: false };
  return { amount: vehicles * LOCAL[market].perVehicle, estimate: true };
}
