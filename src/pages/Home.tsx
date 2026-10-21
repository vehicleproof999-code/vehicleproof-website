import { Browser } from '../components/Browser';
import { Iphone, type ScreenName } from '../components/Iphone';
import { LeadForm } from '../components/LeadForm';
import { Plans } from '../components/Plans';
import { Reveal } from '../components/Reveal';
import { industries } from '../content';
import { LOCAL, SELF_SERVE_MAX, useMarket, type Market } from '../market';
import { cx } from '../site';

const steps: { screen: ScreenName; title: string; text: string; alt: string }[] = [
  {
    screen: 'camera', title: 'Your staff inspect.', text: 'Guided, one angle at a time.',
    alt: 'The guided camera photographing a corner of a car',
  },
  {
    screen: 'compare', title: 'AI spots what changed.', text: 'Check-out and check-in compared. New damage flagged.',
    alt: 'A check-out photo and a check-in photo compared with a slider',
  },
  {
    screen: 'summary', title: 'Managers confirm.', text: 'Each finding checked, then sealed into a PDF report.',
    alt: 'An inspection summary with damage marked around a car',
  },
];

/** AI damage detection: what it compares, what it finds, and who decides. */
const aiPoints = [
  { title: 'Every angle compared', text: 'The same nine photos at check-out and check-in, checked one by one.' },
  { title: 'Six kinds of damage', text: 'Dents, scratches, cracks, shattered glass, broken lamps and flat tyres.' },
  { title: 'People decide', text: 'Each finding is confirmed or dismissed before it reaches a report.' },
];

const webFeatures = [
  { title: 'Fleet dashboard', text: 'Every vehicle, renewal and cost.' },
  { title: 'Vehicle passport', text: "Each vehicle's whole history." },
  { title: 'AI damage compare', text: 'New damage flagged, angle by angle.' },
  { title: 'Live alerts', text: 'Before anything lapses.' },
];

const facts = [
  { big: '9 angles', text: 'Every side, corner and the odometer' },
  { big: 'SHA-256', text: 'A fingerprint for every photo' },
  { big: 'Timestamped', text: 'The moment each photo is taken' },
];

/** Where you operate: the same product, with local words and prices. */
const local = (market: Market) => market === 'MY'
  ? {
    kicker: 'Made in Malaysia',
    title: 'Built here. Ready anywhere.',
    items: [
      { title: 'Prices in ringgit', text: 'From RM150 a month.' },
      { title: 'Road tax reminders', text: 'For every vehicle.' },
      { title: 'PDPA protected', text: 'Stored in Singapore.' },
    ],
  }
  : {
    kicker: 'Wherever you operate',
    title: 'One app. Any country.',
    items: [
      { title: 'Your currency', text: 'Billed by the App Store or Google Play.' },
      { title: 'Your renewals', text: `${LOCAL[market].renewals}.` },
      { title: 'Your data', text: 'Stored in Singapore. Never sold.' },
    ],
  };

const faqs = (market: Market) => [
  {
    q: 'Does VehicleProof detect damage automatically?',
    a: 'Yes, when you compare a check-out with a check-in. Computer vision checks each pair of photos and flags likely new dents, scratches, cracks, shattered glass, broken lamps and flat tyres. Your team confirms or dismisses each finding, so nothing reaches a report without a person checking it.',
  },
  {
    q: 'How is it billed?',
    a: `Monthly through the App Store or Google Play, ${market === 'MY' ? 'in ringgit' : 'in your currency'}, up to ${SELF_SERVE_MAX} vehicles. Above that, we agree a price.`,
  },
  {
    q: 'Does each staff member need a subscription?',
    a: 'No. Enterprise covers your whole team, on unlimited devices.',
  },
  {
    q: 'Can we share reports with customers and insurers?',
    a: 'Yes, as a sealed PDF or CSV.',
  },
  {
    q: 'When can we start?',
    a: 'We launch on iPhone and Android soon. Get in touch now to be set up first.',
  },
];

const delays = [undefined, 1, 2, 3] as const;

export default function Home() {
  const market = useMarket();
  const where = local(market);
  const list = industries(market);
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <Reveal as="p" className="kicker red">Vehicle inspection software</Reveal>
          <Reveal as="h1" delay={1} className="display">Proof, for every vehicle.</Reveal>
          <Reveal as="p" delay={2} className="lede">Guided photo inspections that settle damage disputes.</Reveal>
          <Reveal delay={3} className="links-row hero-actions">
            <a className="pill" href="#contact">Book a demo</a>
            <a className="link-arrow" href="#how">See how it works</a>
          </Reveal>
          <Reveal delay={3} as="nav" className="chips" aria-label="Industries">
            {list.map((item) => <a key={item.id} href={`#${item.id}`}>{item.who}</a>)}
          </Reveal>
          <Reveal className="web-main">
            <Browser screen="compare" alt="Comparing check-out and check-in photos of a car, angle by angle, in the web app" />
          </Reveal>
        </div>
      </section>

      <section className="soft" id="industries">
        <div className="wrap">
          <Reveal as="h2" className="headline">Made for every business<br />that hands over keys.</Reveal>
          <div className="cards">
            {list.map((item, i) => (
              <Reveal key={item.id} id={item.id} delay={delays[i % 2]}
                className={cx('card', 'white', i === list.length - 1 && 'wide')}>
                <p className="who">{item.who}</p>
                <h3>{item.title}</h3>
                <ul className="points">
                  {item.points.map((point) => <li key={point}>{point}</li>)}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="how">
        <div className="wrap">
          <Reveal as="h2" className="headline">Your team inspects.<br />The office sees it all.</Reveal>
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

      <section className="soft" id="ai">
        <div className="wrap">
          <Reveal as="p" className="kicker red">AI damage detection</Reveal>
          <Reveal as="h2" delay={1} className="headline">New damage.<br />Flagged for you.</Reveal>
          <Reveal as="p" delay={2} className="lede">
            Computer vision compares check-out and check-in photos, angle by angle, and points out what looks new.
          </Reveal>
          <div className="columns three">
            {aiPoints.map((item, i) => (
              <Reveal key={item.title} delay={delays[i]}><b>{item.title}</b><span>{item.text}</span></Reveal>
            ))}
          </div>
          <Reveal as="p" className="note">
            AI can miss damage or flag a mark that isn't damage, so it guides your team's review rather than replacing it.
          </Reveal>
        </div>
      </section>

      <section id="proof">
        <div className="wrap">
          <Reveal className="tile proof">
            <p className="tile-kicker">Proof that holds up</p>
            <p className="big">Sealed.</p>
            <p>Change a photo, and it shows.</p>
            <div className="facts">
              {facts.map((fact) => <div key={fact.big}><b>{fact.big}</b><span>{fact.text}</span></div>)}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="soft" id="web-app">
        <div className="wrap">
          <Reveal as="p" className="kicker red">Web app</Reveal>
          <Reveal as="h2" delay={1} className="headline">Your whole fleet.<br />On one screen.</Reveal>
          <Reveal className="web-main">
            <Browser screen="dashboard" alt="The VehicleProof web app: the dashboard with vehicles, renewals and recent activity" />
          </Reveal>
          <div className="columns four">
            {webFeatures.map((item, i) => (
              <Reveal key={item.title} delay={delays[i]}><b>{item.title}</b><span>{item.text}</span></Reveal>
            ))}
          </div>
          <Reveal as="p" className="note">Included with Enterprise.</Reveal>
        </div>
      </section>

      <section id="local">
        <div className="wrap">
          <Reveal as="p" className="kicker red">{where.kicker}</Reveal>
          <Reveal as="h2" delay={1} className="headline">{where.title}</Reveal>
          <div className="columns three">
            {where.items.map((item, i) => (
              <Reveal key={item.title} delay={delays[i]}><b>{item.title}</b><span>{item.text}</span></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="soft" id="plans">
        <div className="wrap">
          <Reveal as="h2" className="headline">From one car<br />to a whole fleet.</Reveal>
          <Reveal as="p" delay={1} className="lede">Free to start. Businesses pay per vehicle, with the whole team included.</Reveal>
          <Plans audience="business" />
        </div>
      </section>

      <section id="faq">
        <div className="narrow">
          <Reveal as="h2" className="headline">Questions.</Reveal>
          <div className="faq">
            {faqs(market).map((item) => (
              <details key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="soft" id="contact">
        <div className="narrow">
          <Reveal as="h2" className="headline">Let's set up<br />your fleet.</Reveal>
          <Reveal as="p" delay={1} className="lede">We reply within one business day.</Reveal>
          <LeadForm market={market} />
          <p className="note">Just your own car? <a href="/personal/">It's free</a>.</p>
        </div>
      </section>
    </>
  );
}
