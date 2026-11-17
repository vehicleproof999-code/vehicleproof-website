import type { IndustryId } from '../content';

// One small line icon per industry, for the Industries menu.

const paths: Record<IndustryId, string[]> = {
  // A key.
  rental: ['M8.5 14.5a4.5 4.5 0 1 1 3.2-1.3L20 21', 'M16 17l2-2', 'M18.5 19.5l2-2', 'M7 10h.01'],
  // A van.
  fleets: ['M2 6h12v10H2z', 'M14 9h4l4 4v3h-8z', 'M6.5 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z', 'M17.5 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z'],
  // A price tag.
  dealers: ['M3 12V3h9l9 9-9 9z', 'M7.5 7.5h.01'],
  // A calendar.
  leasing: ['M3 5h18v16H3z', 'M3 10h18', 'M8 3v4', 'M16 3v4', 'M8 15h3'],
  // A shield with a tick.
  insurance: ['M12 3l8 3v6c0 4.5-3.4 8.2-8 9-4.6-.8-8-4.5-8-9V6z', 'M8.5 12l2.5 2.5 4.5-5'],
  // A wrench.
  workshops: ['M14.5 6.5a4 4 0 0 0 4.9 4.9l1.4-1.4-2.5-.4-.4-2.5 2.6-1.4a4 4 0 0 0-5 .8 4 4 0 0 0-1 3.5L4 19.5 4.5 20l.5.5 9.5-9.5'],
};

export function IndustryIcon({ id }: { id: IndustryId }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[id].map((d) => <path key={d} d={d} />)}
    </svg>
  );
}
