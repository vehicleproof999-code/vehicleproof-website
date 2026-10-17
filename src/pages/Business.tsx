import { Browser } from '../components/Browser';
import { Calculator } from '../components/Calculator';
import { Iphone } from '../components/Iphone';
import { LeadForm } from '../components/LeadForm';
import { Reveal } from '../components/Reveal';
import { businesses } from '../content';
import { LOCAL, SELF_SERVE_MAX, useMarket, type Market } from '../market';

const delays = [undefined, 1, 2, 3] as const;

/** Where you operate: the same product, with local words and prices. */
const local = (market: Market) => market === 'MY'
  ? {
    kicker: 'Made in Malaysia',
    title: 'Built here. Ready for your fleet.',
    lede: 'Made in Malaysia for Malaysian rental companies, dealers and fleets, and ready for the rest of the world.',
    items: [
      { title: 'Prices in ringgit', text: 'From RM150 a month for 20 vehicles, through the App Store or Google Play.' },
      { title: 'Road tax and insurance', text: 'Renewal reminders for every vehicle, before anything lapses.' },
      { title: 'Protected under the PDPA', text: "Your records stay in Singapore, close to home, under Malaysia's Personal Data Protection Act." },
    ],
  }
  : {
    kicker: 'Wherever you drive',
    title: 'One app. Any country.',
    lede: 'Rental companies, dealers and fleets use the same guided inspections, wherever their vehicles are on the road.',
    items: [
      { title: 'Your currency', text: 'The App Store and Google Play bill in your local currency. Large fleets are priced with you.' },
      { title: 'Your renewals', text: `${LOCAL[market].renewals}, with a reminder before anything lapses.` },
      { title: 'Your data, protected', text: 'Stored privately in Singapore, never sold, and never used for advertising.' },
    ],
  };

const steps = [
  { title: 'Drivers inspect.', text: 'On their own phones, guided around the vehicle one angle at a time. Every photo fingerprinted and timestamped.' },
  { title: 'Managers check.', text: 'From the office, in the web app. Check-out and check-in side by side, angle by angle.' },
  { title: 'Proof settles it.', text: 'Seal the report and share it as a PDF. Any later change to a photo shows.' },
];

const faqs = (market: Market) => [
  {
    q: 'How is it billed?',
    a: `Up to ${SELF_SERVE_MAX} vehicles, Enterprise is a monthly subscription through the App Store or Google Play, ${market === 'MY' ? 'in ringgit' : 'in your local currency'}. Cancel anytime. Over ${SELF_SERVE_MAX} vehicles, we agree the price with you.`,
  },
  {
    q: 'Does every driver need a subscription?',
    a: 'No. Enterprise covers unlimited devices, so every driver inspects on their own phone under your one plan, with business roles to control who sees what.',
  },
  {
    q: 'Can we share reports with customers and insurers?',
    a: 'Yes. Share any inspection as a PDF, or export to CSV. Each photo carries a SHA-256 fingerprint and the moment it was taken, so a sealed report shows if anything was changed.',
  },
  {
    q: 'Where is our data stored?',
    a: "In Singapore, in private storage opened only through short-lived links. We never sell it or use it for advertising. You can delete your account at any time.",
  },
  {
    q: 'When can we start?',
    a: "VehicleProof is coming to iPhone and Android soon. Fleets that get in touch now are set up first, and we'll help you load your vehicles.",
  },
];

export default function Business() {
  const market = useMarket();
  const where = local(market);
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <Reveal as="p" className="kicker red">VehicleProof for business</Reveal>
          <Reveal as="h1" delay={1} className="display">Every handover, proven.</Reveal>
          <Reveal as="p" delay={2} className="lede">
            Guided photo inspections, sealed reports and renewal reminders for rental companies, dealers and fleets.
            From five vehicles to five hundred.
          </Reveal>
          <Reveal delay={3} className="links-row hero-actions">
            <a className="pill" href="#contact">Book a demo</a>
            <a className="link-arrow" href="#calculator">What disputes cost you</a>
          </Reveal>
          <Reveal className="web-main">
            <Browser screen="compare" alt="Comparing check-out and check-in photos of a car, angle by angle, in the web app" />
          </Reveal>
        </div>
      </section>

      <section className="soft" id="calculator">
        <div className="wrap">
          <Reveal as="h2" className="headline">One dispute settled.<br />Months paid for.</Reveal>
          <Reveal as="p" delay={1} className="lede">
            Damage nobody can prove comes out of your pocket. Put in your own numbers.
          </Reveal>
          <Reveal><Calculator market={market} /></Reveal>
        </div>
      </section>

      <section id="how">
        <div className="wrap">
          <Reveal as="h2" className="headline">Drivers inspect.<br />The office sees it all.</Reveal>
          <div className="steps-row">
            <Reveal>
              <Iphone screen="camera" size="step" alt="The guided camera photographing a corner of a car" />
              <h3>{steps[0].title}</h3>
              <p>{steps[0].text}</p>
            </Reveal>
            <Reveal delay={1}>
              <Iphone screen="compare" size="step" alt="A check-out photo and a check-in photo compared with a slider" />
              <h3>{steps[1].title}</h3>
              <p>{steps[1].text}</p>
            </Reveal>
            <Reveal delay={2}>
              <Iphone screen="summary" size="step" alt="An inspection summary with damage marked around a car" />
              <h3>{steps[2].title}</h3>
              <p>{steps[2].text}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="soft" id="who">
        <div className="wrap">
          <Reveal as="h2" className="headline">Made for the way<br />you run vehicles.</Reveal>
          <div className="cards">
            {businesses(market).map((card, i) => (
              <Reveal key={card.id} id={card.id} delay={delays[i % 2]} className="card white">
                <p className="who">{card.who}</p>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="local">
        <div className="wrap">
          <Reveal as="p" className="kicker red">{where.kicker}</Reveal>
          <Reveal as="h2" delay={1} className="headline">{where.title}</Reveal>
          <Reveal as="p" delay={2} className="lede">{where.lede}</Reveal>
          <div className="columns three">
            {where.items.map((item, i) => (
              <Reveal key={item.title} delay={delays[i]}><b>{item.title}</b><span>{item.text}</span></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="soft" id="faq">
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

      <section id="contact">
        <div className="narrow">
          <Reveal as="h2" className="headline">Let's set up<br />your fleet.</Reveal>
          <Reveal as="p" delay={1} className="lede">
            Tell us about your vehicles. We'll reply within one business day with a demo and a price.
          </Reveal>
          <LeadForm market={market} />
        </div>
      </section>
    </>
  );
}
