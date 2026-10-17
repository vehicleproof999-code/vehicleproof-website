import { useEffect, useState, type CSSProperties } from 'react';
import { supportEmail } from '../site';
import { Reveal } from './Reveal';

// The same prices the App Store and Google Play charge (see docs/SUBSCRIPTIONS.md in
// the app repo). Malaysia pays in ringgit; elsewhere the store converts from USD.
type Currency = 'MYR' | 'USD';

const PRICES: Record<Currency, { pro: string; tiers: Record<number, string> }> = {
  MYR: { pro: 'RM39', tiers: { 20: 'RM150', 25: 'RM187.50', 30: 'RM225', 35: 'RM262.50', 40: 'RM300' } },
  USD: { pro: '$14.99', tiers: { 20: '$50', 25: '$62.50', 30: '$79.90', 35: '$89.90', 40: '$99.90' } },
};

// Up to 40 vehicles Enterprise is a store subscription in steps of 5, as in the app.
// Above that it's a quote, so the stops spread out to keep the store tiers easy to hit.
const SELF_SERVE_MAX = 40;
const STOPS = [20, 25, 30, 35, 40, 50, 60, 70, 80, 90, 100, 125, 150, 175, 200, 250, 300, 350, 400, 450, 500];

// Allowances grow with the vehicles paid for (backend BillingPlan).
const GB_PER_VEHICLE = 2.5;
const SCANS_PER_VEHICLE = 25;

const grouped = (n: number) => n.toLocaleString('en-US');
const storage = (vehicles: number) => {
  const gb = vehicles * GB_PER_VEHICLE;
  return gb >= 1000 ? `${+(gb / 1000).toFixed(2)} TB` : `${+gb.toFixed(1)} GB`;
};

/** Ringgit for visitors in Malaysia (time zone or device region, as the app guesses), USD for everyone else. */
function guessCurrency(): Currency {
  const zone = Intl.DateTimeFormat().resolvedOptions().timeZone ?? '';
  const languages = navigator.languages ?? [navigator.language];
  const malaysia = zone === 'Asia/Kuala_Lumpur' || zone === 'Asia/Kuching' || languages.some((l) => /-MY$/i.test(l));
  return malaysia ? 'MYR' : 'USD';
}

const Check = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true">
    <path d="M5 10.5l3.2 3.2L15 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Features = ({ items }: { items: string[] }) => (
  <ul className="features">
    {items.map((item) => (
      <li key={item}><Check />{item}</li>
    ))}
  </ul>
);

export function Plans() {
  // Pre-rendered pages show USD; Malaysia switches to ringgit once the page loads.
  const [currency, setCurrency] = useState<Currency>('USD');
  const [stop, setStop] = useState(0);
  useEffect(() => setCurrency(guessCurrency()), []);

  const prices = PRICES[currency];
  const vehicles = STOPS[stop];
  const quote = vehicles > SELF_SERVE_MAX;
  const quoteMail = `mailto:${supportEmail}?subject=${encodeURIComponent(`VehicleProof Enterprise quote: ${vehicles} vehicles`)}`;

  return (
    <>
      <div className="columns three plans">
        <Reveal className="plan">
          <b>Free</b>
          <p className="plan-kicker">One car</p>
          <p className="price">Free<span> forever</span></p>
          <Features
            items={[
              '1 vehicle on 1 device',
              '250 MB evidence storage',
              '5 document scans and 5 sealed inspections a month',
              '30 days of comparison history',
            ]}
          />
        </Reveal>

        <Reveal delay={1} className="plan">
          <b>Pro</b>
          <p className="plan-kicker">Family plan</p>
          <p className="price">{prices.pro}<span> / month</span></p>
          <Features
            items={[
              '6 vehicles, shared on up to 6 devices',
              '5 GB evidence storage',
              '50 document scans every month',
              'Unlimited sealed inspections and full comparisons',
            ]}
          />
        </Reveal>

        <Reveal delay={2} className="plan">
          <b>Enterprise</b>
          <p className="plan-kicker">Fleets and businesses</p>
          <p className="price" aria-live="polite">
            {quote ? 'Custom quote' : <>{prices.tiers[vehicles]}<span> / month</span></>}
          </p>
          <div className="slider">
            <label htmlFor="enterprise-vehicles">
              <span>{vehicles} vehicles</span>
              <span className="range-hint">{quote ? 'Priced with you' : 'Pick your fleet size'}</span>
            </label>
            <input
              id="enterprise-vehicles"
              type="range"
              min={0}
              max={STOPS.length - 1}
              step={1}
              value={stop}
              aria-valuetext={`${vehicles} vehicles`}
              onChange={(e) => setStop(Number(e.target.value))}
              style={{ '--fill': `${(stop / (STOPS.length - 1)) * 100}%` } as CSSProperties}
            />
            <div className="range-ends"><span>{STOPS[0]}</span><span>{STOPS[STOPS.length - 1]}</span></div>
          </div>
          <Features
            items={[
              `${vehicles} vehicles on unlimited devices`,
              `${storage(vehicles)} evidence storage`,
              `${grouped(vehicles * SCANS_PER_VEHICLE)} document scans every month`,
              'Business roles, full history and priority support',
              'Share inspection reports as PDF or CSV',
              'The web app, for the office',
            ]}
          />
          {quote && <a className="link-arrow" href={quoteMail}>Request a quote</a>}
        </Reveal>
      </div>

      <Reveal as="p" className="note">
        Billed monthly through the App Store or Google Play. Cancel anytime.
        {currency === 'USD' && ' Outside the US, the store shows the price in your own currency.'}
      </Reveal>
    </>
  );
}
