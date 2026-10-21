import { useRef, useState, type KeyboardEvent } from 'react';
import { Browser, type WebScreen } from './Browser';
import { Iphone, type ScreenName } from './Iphone';

// Every screenshot of the iPhone app and the web app, in one place: a tab for
// each, and a row of screens to scroll through. Both rows are in the page, so
// the iPhone row shows without the script; the web row loads when opened.

const phoneScreens: { screen: ScreenName; title: string; alt: string }[] = [
  { screen: 'home', title: 'Home', alt: 'The home screen with the garage and shortcuts to every record' },
  { screen: 'vehicles', title: 'Vehicles', alt: 'Vehicles shown as cards with a photo, plate and odometer' },
  { screen: 'passport', title: 'Vehicle passport', alt: "A vehicle's passport with its photo, details and every kind of record" },
  { screen: 'new-inspection', title: 'New inspection', alt: 'Choosing a check-in, check-out, routine or pre-purchase inspection' },
  { screen: 'camera', title: 'Guided camera', alt: 'The guided camera photographing the front-right corner of a car' },
  { screen: 'checklist', title: 'Capture checklist', alt: 'An inspection with each required angle ticked off as it is photographed' },
  { screen: 'summary', title: 'Condition summary', alt: 'An inspection summary with damage marked around a car' },
  { screen: 'report', title: 'Sealed report', alt: 'A sealed check-out report with all nine required views' },
  { screen: 'compare', title: 'Compare photos', alt: 'A check-in photo and a check-out photo compared with a slider' },
  { screen: 'inspections', title: 'Inspection history', alt: 'Check-ins, check-outs and service visits on a timeline' },
  { screen: 'service', title: 'Service history', alt: 'Service records by date, with workshop and cost' },
  { screen: 'insurance', title: 'Insurance', alt: 'Insurance policies for a vehicle with their expiry dates' },
  { screen: 'alerts', title: 'Alerts', alt: 'Reminders for road tax, insurance and services that are due' },
];

const webScreens: { screen: WebScreen; title: string; alt: string }[] = [
  { screen: 'dashboard', title: 'Dashboard', alt: 'The web app dashboard: vehicle status, reminders, expiring documents, costs and inspections' },
  { screen: 'vehicles', title: 'Vehicles', alt: 'Every vehicle in a searchable table with year, odometer and status' },
  { screen: 'passport', title: 'Vehicle passport', alt: "A vehicle's passport with its photo, recent inspections, documents and alerts" },
  { screen: 'report', title: 'Inspection report', alt: 'A sealed check-in inspection with every angle marked around the car' },
  { screen: 'compare', title: 'Compare photos', alt: 'Check-in and check-out photos of a car compared with a slider, showing a new scratch' },
  { screen: 'service', title: 'Service history', alt: 'Service records for every vehicle with workshop, odometer and amount' },
  { screen: 'alerts', title: 'Alerts', alt: 'Overdue and upcoming road tax, insurance and service alerts for the fleet' },
];

type Tab = 'phone' | 'web';
const tabs: { id: Tab; label: string }[] = [
  { id: 'phone', label: 'iPhone app' },
  { id: 'web', label: 'Web app' },
];

export function AppScreens() {
  const [tab, setTab] = useState<Tab>('phone');
  const rows = useRef<Partial<Record<Tab, HTMLUListElement | null>>>({});

  const scroll = (direction: 1 | -1) => {
    const row = rows.current[tab];
    row?.scrollBy({ left: direction * row.clientWidth * 0.8, behavior: 'smooth' });
  };

  // Arrow keys move between the tabs, as in any tab list.
  const onKey = (event: KeyboardEvent) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    const next = tab === 'phone' ? 'web' : 'phone';
    setTab(next);
    document.getElementById(`screens-tab-${next}`)?.focus();
  };

  return (
    <div className="screens">
      <div className="screens-bar">
        <div className="screens-tabs" role="tablist" aria-label="Screenshots" onKeyDown={onKey}>
          {tabs.map((item) => (
            <button
              key={item.id}
              id={`screens-tab-${item.id}`}
              type="button"
              role="tab"
              aria-selected={tab === item.id}
              aria-controls={`screens-${item.id}`}
              tabIndex={tab === item.id ? 0 : -1}
              onClick={() => setTab(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="screens-arrows">
          <button type="button" onClick={() => scroll(-1)} aria-label="Previous screens">‹</button>
          <button type="button" onClick={() => scroll(1)} aria-label="Next screens">›</button>
        </div>
      </div>

      <ul id="screens-phone" className="screens-row phone" role="tabpanel" aria-labelledby="screens-tab-phone"
        hidden={tab !== 'phone'} ref={(el) => { rows.current.phone = el; }}>
        {phoneScreens.map((item) => (
          <li key={item.screen}>
            <Iphone screen={item.screen} size="gallery" alt={item.alt} />
            <p>{item.title}</p>
          </li>
        ))}
      </ul>
      <ul id="screens-web" className="screens-row web" role="tabpanel" aria-labelledby="screens-tab-web"
        hidden={tab !== 'web'} ref={(el) => { rows.current.web = el; }}>
        {webScreens.map((item) => (
          <li key={item.screen}>
            <Browser screen={item.screen} alt={item.alt} sizes="(max-width: 760px) 86vw, 720px" />
            <p>{item.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
