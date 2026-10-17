import { useEffect, useState } from 'react';
import { enterpriseMonthly, LOCAL, money, type Market } from '../market';

/** A number field that keeps whole numbers within [min, max]; it can be cleared while typing. */
function Field({ id, label, hint, value, min, max, onChange }: {
  id: string; label: string; hint?: string; value: number; min: number; max: number; onChange: (n: number) => void;
}) {
  const [text, setText] = useState(String(value));
  useEffect(() => setText(String(value)), [value]);
  return (
    <label className="calc-field" htmlFor={id}>
      <span>{label}</span>
      <input
        id={id} type="number" inputMode="numeric" min={min} max={max} value={text}
        onChange={(e) => {
          setText(e.target.value);
          const n = Number(e.target.value);
          if (e.target.value !== '' && Number.isFinite(n)) onChange(Math.min(max, Math.max(min, Math.round(n))));
        }}
        onBlur={() => setText(String(value))}
      />
      {hint && <small>{hint}</small>}
    </label>
  );
}

/**
 * What damage nobody can prove costs, next to what VehicleProof costs. Plain
 * arithmetic: no promise of how many disputes it settles.
 */
export function Calculator({ market }: { market: Market }) {
  const [vehicles, setVehicles] = useState(25);
  const [disputes, setDisputes] = useState(2);
  const [claim, setClaim] = useState(LOCAL[market].typicalClaim);
  // Malaysia is known only once the page loads: move the default claim with it.
  useEffect(() => setClaim(LOCAL[market].typicalClaim), [market]);

  const atRisk = disputes * claim;
  const plan = enterpriseMonthly(market, vehicles);
  // How many months of VehicleProof one repair bill, recovered with proof, pays for.
  const months = Math.floor(claim / plan.amount);

  return (
    <div className="calc">
      <div className="calc-inputs">
        <Field id="calc-vehicles" label="Vehicles" value={vehicles} min={1} max={2000} onChange={setVehicles} />
        <Field id="calc-disputes" label="Damage disputes a month" value={disputes} min={0} max={500} onChange={setDisputes} />
        <Field id="calc-claim" label={`Average repair bill (${LOCAL[market].symbol})`} value={claim} min={0} max={100000}
          onChange={setClaim} />
      </div>
      <div className="calc-results" aria-live="polite">
        <div>
          <b>{money(market, atRisk)}</b>
          <span>of disputed damage a month</span>
        </div>
        <div>
          <b>{plan.estimate ? 'About ' : ''}{money(market, plan.amount)}</b>
          <span>a month for VehicleProof</span>
        </div>
        <div className="calc-verdict">
          <b>{months >= 12 ? 'A whole year' : months < 1 ? 'Less than a month' : months === 1 ? '1 month' : `${months} months`}</b>
          <span>paid for by one proven repair bill</span>
        </div>
      </div>
    </div>
  );
}
