import { Browser } from '../components/Browser';
import { Iphone, type ScreenName } from '../components/Iphone';
import { LeadForm } from '../components/LeadForm';
import { Plans } from '../components/Plans';
import { Reveal } from '../components/Reveal';
import { StaffQrScreen } from '../components/SignScreens';
import { faqs, industries } from '../content';
import { LOCAL, useMarket, type Market } from '../market';
import { cx, trialHref } from '../site';

/** The steps, in order. A step with [drawn] shows that screen instead of a screenshot. */
const steps: { screen: ScreenName; title: string; text: string; alt: string; drawn?: boolean }[] = [
  {
    screen: 'camera', title: 'Take the photos',
    text: 'Staff follow the guided camera: nine timestamped photos, from every side to the odometer.',
    alt: 'The guided camera photographing the front-right corner of a car',
  },
  {
    screen: 'compare', title: 'Spot new damage',
    text: 'Check-out and check-in photos are compared angle by angle, and new scratches and dents are flagged.',
    alt: 'A check-out photo and a check-in photo compared with a slider',
  },
  {
    screen: 'summary', title: 'Seal the report',
    text: 'A manager confirms each finding, and the inspection is sealed into a PDF report you can share.',
    alt: 'An inspection summary with damage marked around a car',
  },
  {
    screen: 'summary', title: 'Customer signs', drawn: true,
    text: 'At handover, the customer scans a QR code, checks the photos and damage, and signs on their own phone.',
    alt: 'The staff phone showing a QR code for the customer to scan and sign',
  },
];


/** AI damage detection: what it compares, what it finds, and who decides. */
const aiPoints = [
  { title: 'Every angle compared', text: 'The same nine photos at check-out and check-in, checked one by one.' },
  { title: 'Real-world damage', text: 'Learned from photos of dents, scratches and cracks on real cars.' },
  { title: 'People decide', text: 'Each finding is confirmed or dismissed before it reaches a report.' },
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

const delays = [undefined, 1, 2, 3] as const;

export default function Home() {
  const market = useMarket();
  const where = local(market);
  const list = industries(market);
  return (
    <>
      <section className="hero hero-home">
        <div className="wrap">
          <Reveal as="h1" className="hero-title">
            <span className="kicker red">Vehicle inspection app for car rental, dealers and fleets</span>
            <span className="display">Proof, for every vehicle.</span>
          </Reveal>
          <Reveal as="p" delay={2} className="lede">Guided photo inspections that settle damage disputes.</Reveal>
          <Reveal delay={3} className="links-row hero-actions">
            <a className="pill" href={trialHref()}>Start free trial</a>
            <a className="link-arrow" href="#contact">Book a demo</a>
          </Reveal>
          <Reveal delay={3} as="p" className="hero-note">14 days of Enterprise, free. No card needed.</Reveal>
          <Reveal className="web-main hero-visual-web">
            <Browser screen="compare" alt="Comparing check-out and check-in photos of a car, angle by angle, in the web app" />
          </Reveal>
          <Reveal className="hero-visual-phone">
            <Iphone screen="compare" size="hero" alt="A check-in photo and a check-out photo of a car compared with a slider in the app" />
          </Reveal>
        </div>
      </section>

      <section className="soft" id="how">
        <div className="wrap">
          <Reveal as="p" className="kicker red">How it works</Reveal>
          <Reveal as="h2" delay={1} className="headline">Your team inspects. <br />The office sees it all.</Reveal>
          <Reveal as="p" delay={2} className="lede">
            Photo inspections at check-out and check-in, an AI check for new damage, a sealed report and the customer’s signature.
          </Reveal>
          <ol className="steps-row">
            {steps.map((step, i) => (
              <Reveal as="li" key={step.title} delay={delays[i]}>
                <Iphone screen={step.screen} size="step" alt={step.alt}>{step.drawn ? <StaffQrScreen /> : null}</Iphone>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section id="ai">
        <div className="wrap">
          <Reveal as="p" className="kicker red">AI damage detection</Reveal>
          <Reveal as="h2" delay={1} className="headline">New damage. <br />Flagged for you.</Reveal>
          <Reveal as="p" delay={2} className="lede">
            A computer vision model compares check-out and check-in photos, angle by angle,
            and points out what looks new.
          </Reveal>
          <Reveal className="ai-stat">
            <b>15,000+</b>
            <span>photos of real car damage from public research datasets, used to train the model</span>
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

      <section className="soft" id="industries">
        <div className="wrap">
          <Reveal as="h2" className="headline">Made for every business <br />that hands over keys.</Reveal>
          <div className="cards">
            {list.map((item, i) => (
              <Reveal key={item.id} id={item.id} delay={delays[i % 2]}
                className={cx('card', 'white', list.length % 2 === 1 && i === list.length - 1 && 'wide')}>
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
          <Reveal as="h2" className="headline">From one car <br />to a whole fleet.</Reveal>
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
          <Reveal as="h2" className="headline">Let's set up <br />your fleet.</Reveal>
          <Reveal as="p" delay={1} className="lede">We reply within one business day.</Reveal>
          <LeadForm market={market} />
          <p className="note">Just your own car? <a href="/personal/">It's free</a>.</p>
        </div>
      </section>
    </>
  );
}
