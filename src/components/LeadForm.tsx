import { useEffect, useState, type FormEvent } from 'react';
import { businessTypes, countries, fleetSizeFor, fleetSizes } from '../content';
import type { Market } from '../market';
import { businessMail, leadsUrl, supportEmail } from '../site';

type Sent = { reference: string; name: string; email: string };

/** The answer's readable message: a field error, a refusal, or a general one. */
async function problem(response: Response) {
  try {
    const body = await response.json();
    return body?.errors?.[0]?.message ?? body?.detail ?? null;
  } catch {
    return null;
  }
}

/**
 * The business enquiry form. It posts to the API, which emails the team; if
 * that fails, the visitor still has the email address.
 */
export function LeadForm({ market }: { market: Market }) {
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState<Sent | null>(null);
  const [fleetSize, setFleetSize] = useState('');
  const [country, setCountry] = useState('');

  // From the Plans slider ("?fleet=60"), and Malaysia once the page knows.
  useEffect(() => {
    const fleet = Number(new URLSearchParams(location.search).get('fleet'));
    if (fleet > 0) setFleetSize(fleetSizeFor(fleet));
  }, []);
  useEffect(() => {
    if (market === 'MY') setCountry((current) => current || 'Malaysia');
  }, [market]);

  async function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const field = (name: string) => String(form.get(name) ?? '').trim();
    setSending(true);
    setError(null);
    try {
      const response = await fetch(leadsUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: field('name'), email: field('email'), company: field('company'), country: field('country'),
          businessType: field('businessType'), fleetSize: field('fleetSize'), phone: field('phone'),
          message: field('message'), website: field('website'), market, page: location.pathname,
        }),
      });
      if (!response.ok) {
        setError((await problem(response)) ?? 'Something went wrong on our side.');
        return;
      }
      const { reference } = await response.json();
      setSent({ reference, name: field('name').split(/\s+/)[0], email: field('email') });
    } catch {
      setError("We couldn't reach our server.");
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div className="lead-done" role="status">
        <h3>Thanks, {sent.name}.</h3>
        <p>We have your enquiry ({sent.reference}). We'll reply to {sent.email} within one business day.</p>
      </div>
    );
  }

  return (
    <form className="lead-form" onSubmit={send}>
      <div className="lead-grid">
        <label>
          <span>Your name</span>
          <input name="name" required maxLength={120} autoComplete="name" />
        </label>
        <label>
          <span>Work email</span>
          <input name="email" type="email" required maxLength={200} autoComplete="email" />
        </label>
        <label>
          <span>Company <small>optional</small></span>
          <input name="company" maxLength={160} autoComplete="organization" />
        </label>
        <label>
          <span>Country</span>
          <input name="country" required maxLength={80} list="lead-countries" autoComplete="country-name"
            value={country} onChange={(e) => setCountry(e.target.value)} />
          <datalist id="lead-countries">
            {countries.map((name) => <option key={name} value={name} />)}
          </datalist>
        </label>
        <label>
          <span>Type of business</span>
          <select name="businessType" required defaultValue="">
            <option value="" disabled>Choose one</option>
            {businessTypes.map((type) => <option key={type.value} value={type.value}>{type.label}</option>)}
          </select>
        </label>
        <label>
          <span>Vehicles</span>
          <select name="fleetSize" required value={fleetSize} onChange={(e) => setFleetSize(e.target.value)}>
            <option value="" disabled>Choose one</option>
            {fleetSizes.map((size) => <option key={size} value={size}>{size}</option>)}
          </select>
        </label>
        <label>
          <span>Phone <small>optional</small></span>
          <input name="phone" type="tel" maxLength={40} autoComplete="tel" />
        </label>
        <label className="lead-wide">
          <span>Anything we should know? <small>optional</small></span>
          <textarea name="message" rows={4} maxLength={2000}
            placeholder="How you handle check-outs today, the software you use, when you'd like to start…" />
        </label>
        {/* Hidden from people; bots fill it in. */}
        <label className="lead-trap" aria-hidden="true">
          Website <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      {error && (
        <p className="lead-error" role="alert">
          {error} Please try again, or email <a href={businessMail}>{supportEmail}</a>.
        </p>
      )}
      <div className="lead-actions">
        <button className="pill" type="submit" disabled={sending}>{sending ? 'Sending…' : 'Send enquiry'}</button>
        <p>We use your details only to reply. <a href="/privacy/">Privacy</a></p>
      </div>
    </form>
  );
}
