import { useRef, useState, type KeyboardEvent } from 'react';
import type { Market } from '../market';
import { Browser, type WebScreen } from './Browser';

// The web app, one screen at a time: a tab for each part of it and the real
// screen in a browser window. Every screen is in the page, so search engines
// and visitors without the script still get each description.

const tabs = (market: Market): { screen: WebScreen; label: string; text: string; alt: string }[] => [
  {
    screen: 'dashboard', label: 'Dashboard',
    text: 'What needs attention first, this month against last, and charts of spend, damage and inspections.',
    alt: 'The web app dashboard: inspections, damage, disputed handovers, spend and a list of what needs attention',
  },
  {
    screen: 'vehicles', label: 'Vehicles',
    text: 'Every vehicle with its photo, plate, odometer and status, searchable in a second.',
    alt: 'Eight vehicles in a table, each with a photo, plate, make and model, year, odometer and status',
  },
  {
    screen: 'inspection', label: 'Inspections',
    text: 'Sealed reports with the customer’s signature, as PDF or CSV, and photos compared side by side.',
    alt: 'A sealed check-in inspection signed by the customer, with PDF, CSV and photo comparison buttons',
  },
  {
    screen: 'alerts', label: 'Renewals',
    text: `${market === 'MY' ? 'Insurance, road tax' : 'Insurance, registration'} and service reminders for every vehicle, before anything lapses.`,
    alt: 'Alerts for overdue and upcoming services, insurance and road tax, vehicle by vehicle',
  },
  {
    screen: 'import', label: 'Import',
    text: 'Bring in vehicles, renewals and history from a spreadsheet or another app, and undo it within a week.',
    alt: 'Importing vehicles, documents, service history or expenses from a CSV or Excel file',
  },
];

export function WebAppTour({ market }: { market: Market }) {
  const list = tabs(market);
  const [active, setActive] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  // Arrow keys move between tabs, as in any tab list.
  const onKey = (event: KeyboardEvent) => {
    const step = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const next = (active + step + list.length) % list.length;
    setActive(next);
    buttons.current[next]?.focus();
  };

  return (
    <div className="tour">
      <div className="tour-tabs" role="tablist" aria-label="Parts of the web app" onKeyDown={onKey}>
        {list.map((tab, i) => (
          <button
            key={tab.screen}
            ref={(el) => { buttons.current[i] = el; }}
            id={`tour-tab-${tab.screen}`}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-controls={`tour-panel-${tab.screen}`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {list.map((tab, i) => (
        <div
          key={tab.screen}
          id={`tour-panel-${tab.screen}`}
          role="tabpanel"
          aria-labelledby={`tour-tab-${tab.screen}`}
          hidden={i !== active}
          className="tour-panel"
        >
          <p className="tour-text">{tab.text}</p>
          <Browser screen={tab.screen} alt={tab.alt} />
        </div>
      ))}
    </div>
  );
}
