import { Browser } from '../components/Browser';
import { Iphone, type ScreenName } from '../components/Iphone';
import { Plans } from '../components/Plans';
import { Reveal } from '../components/Reveal';
import { businesses } from '../content';
import { LOCAL, useMarket } from '../market';
import { contactHref, supportEmail } from '../site';

const steps: { screen: ScreenName; title: string; text: string; alt: string }[] = [
  {
    screen: 'camera', title: 'Every angle, guided.', text: 'The camera walks you around the car, one angle at a time.',
    alt: 'The guided camera photographing the front-right corner of a car',
  },
  {
    screen: 'summary', title: 'Condition at a glance.', text: 'Damage pinned to the exact spot, next to every photo.',
    alt: 'Inspection summary with issues marked around a car',
  },
  {
    screen: 'compare', title: 'Spot what changed.', text: 'Slide between check-out and check-in. New damage stands out.',
    alt: 'A check-out photo and a check-in photo compared with a slider',
  },
];

const webFeatures = [
  { title: 'Garage dashboard', text: "Every vehicle, upcoming renewal and this month's costs, at a glance." },
  { title: 'Vehicle passport', text: 'Inspections, service history and documents for each car, on one page.' },
  { title: 'Big-screen compare', text: 'Check-in and check-out photos side by side, angle by angle.' },
  { title: 'Live alerts', text: 'A heads-up the moment a renewal or service falls due.' },
];

const facts = [
  { big: '9 angles', text: 'Every side, corner and the odometer' },
  { big: 'SHA-256', text: 'A fingerprint for every photo' },
  { big: 'Timestamped', text: 'The moment each photo is taken' },
];

const privacy = [
  { title: 'Stored in Singapore', text: "Private storage, opened only through short-lived links after we check it's you." },
  { title: 'Your own Google Drive', text: 'Keep documents in your Drive if you prefer. The app sees only its own files.' },
  { title: 'Delete anytime', text: 'Remove your account in the app. Your data is gone after 30 days.' },
];

const delays = [undefined, 1, 2, 3] as const;

export default function Home() {
  const market = useMarket();
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <Reveal as="p" className="kicker">VehicleProof</Reveal>
          <Reveal as="h1" delay={1} className="display">Proof, for every car.</Reveal>
          <Reveal as="p" delay={2} className="lede">
            Photo inspections that settle damage disputes, plus service history and renewals.
            For rental companies, dealers and fleets, or just your own car.
          </Reveal>
          <Reveal delay={3} className="links-row hero-actions">
            <a className="pill" href="/business/">For business</a>
            <a className="link-arrow" href="#inspections">See how it works</a>
          </Reveal>
          <Reveal delay={3} className="hero-phone">
            <Iphone screen="home" size="hero" eager alt="The VehicleProof home screen, with the garage and records" />
          </Reveal>
        </div>
      </section>

      <section className="soft" id="inspections">
        <div className="wrap">
          <Reveal as="h2" className="headline">Walk around. Tap.<br />Proven.</Reveal>
          <Reveal as="p" delay={1} className="lede">A guided inspection records any vehicle's condition in minutes.</Reveal>
          <div className="steps-row">
            {steps.map((step, i) => (
              <Reveal key={step.screen} delay={delays[i]}>
                <Iphone screen={step.screen} size="step" alt={step.alt} />
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="business">
        <div className="wrap">
          <Reveal as="p" className="kicker red">For business</Reveal>
          <Reveal as="h2" delay={1} className="headline">Run a fleet.<br />Not paperwork.</Reveal>
          <Reveal as="p" delay={2} className="lede">
            From five cars to five hundred. Every vehicle inspected, insured and road-legal, without the spreadsheets.
          </Reveal>
          <div className="cards">
            {businesses(market).map((card, i) => (
              <Reveal key={card.id} as="a" href={`/business/#${card.id}`} delay={delays[i % 2]} className="card card-link">
                <p className="who">{card.who}</p>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </Reveal>
            ))}
          </div>
          <Reveal as="p" className="note big-note"><a className="link-arrow" href="/business/">VehicleProof for business</a></Reveal>
        </div>
      </section>

      <section className="soft" id="web-app">
        <div className="wrap">
          <Reveal as="p" className="kicker red">Web app</Reveal>
          <Reveal as="h2" delay={1} className="headline">Your whole fleet.<br />On one screen.</Reveal>
          <Reveal as="p" delay={2} className="lede">
            Managers work from the browser. Drivers inspect on their phones. Everything meets in one place.
          </Reveal>
          <Reveal className="web-main">
            <Browser screen="dashboard" alt="The VehicleProof web app: the garage dashboard with vehicles, renewals and recent activity" />
          </Reveal>
          <div className="web-more">
            <Reveal>
              <Browser small screen="passport" alt="A vehicle passport in the web app, with inspections, service history and documents" />
              <p>Every car's passport: inspections, services and documents.</p>
            </Reveal>
            <Reveal delay={1}>
              <Browser small screen="compare" alt="Comparing check-in and check-out photos in the web app" />
              <p>Check-in and check-out, compared angle by angle.</p>
            </Reveal>
          </div>
          <div className="columns four">
            {webFeatures.map((item, i) => (
              <Reveal key={item.title} delay={delays[i]}><b>{item.title}</b><span>{item.text}</span></Reveal>
            ))}
          </div>
          <Reveal as="p" className="note">The web app is included with Enterprise.</Reveal>
        </div>
      </section>

      <section id="records">
        <div className="wrap">
          <Reveal as="h2" className="headline">Everything about each vehicle.</Reveal>
          <Reveal as="p" delay={1} className="lede">One page per car, with its whole story.</Reveal>
          <div className="tiles">
            <Reveal className="tile proof">
              <p className="tile-kicker">Proof that holds up</p>
              <p className="big">Sealed.</p>
              <p>Every photo is fingerprinted and timestamped. Seal the report, and any later change shows.</p>
              <div className="facts">
                {facts.map((fact) => <div key={fact.big}><b>{fact.big}</b><span>{fact.text}</span></div>)}
              </div>
            </Reveal>
            <Reveal className="tile">
              <p className="tile-kicker">Service history</p>
              <h3>Scan the receipt.<br />Done.</h3>
              <p>Snap the workshop invoice and the app fills in the rest.</p>
              <Iphone screen="service" size="tile" alt="A vehicle's service history in the app" />
            </Reveal>
            <Reveal delay={1} className="tile">
              <p className="tile-kicker">Reminders</p>
              <h3>Never miss<br />a renewal.</h3>
              <p>{LOCAL[market].renewals}, before they're due.</p>
              <Iphone screen="alerts" size="tile" alt="Renewal and service alerts in the app" />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="soft" id="plans">
        <div className="wrap">
          <Reveal as="h2" className="headline">A plan for every garage.</Reveal>
          <Reveal as="p" delay={1} className="lede">Start free. Grow when you need to.</Reveal>
          <Plans />
        </div>
      </section>

      <section id="privacy">
        <div className="wrap">
          <Reveal as="h2" className="headline">Your records.<br />Your control.</Reveal>
          <Reveal as="p" delay={1} className="lede">No ads. No trackers. We never sell your data.</Reveal>
          <div className="columns three">
            {privacy.map((item, i) => (
              <Reveal key={item.title} delay={delays[i]}><b>{item.title}</b><span>{item.text}</span></Reveal>
            ))}
          </div>
          <Reveal as="p" className="note"><a className="link-arrow" href="/privacy/">Read the privacy policy</a></Reveal>
        </div>
      </section>

      <section className="soft closing" id="contact">
        <div className="wrap">
          <Reveal as="img" src="/assets/img/apple-touch-icon.png" width={180} height={180} alt="" />
          <Reveal as="h2" delay={1} className="headline">Coming soon.</Reveal>
          <Reveal as="p" delay={2} className="lede">
            On its way to iPhone and Android. Running a fleet? Get set up before launch.
          </Reveal>
          <Reveal delay={3} className="closing-actions">
            <a className="pill" href={contactHref}>Talk to us</a>
            <div className="links-row">
              <a className="link-arrow" href="/support/">Support</a>
              <a className="link-arrow" href={`mailto:${supportEmail}?subject=VehicleProof`}>Email us</a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
