import { Iphone, type ScreenName } from '../components/Iphone';
import { Plans } from '../components/Plans';
import { Reveal } from '../components/Reveal';
import { LOCAL, useMarket } from '../market';
import { supportEmail } from '../site';

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
    screen: 'compare', title: 'Spot what changed.', text: 'Slide between before and after. AI flags new damage for you to check.',
    alt: 'A before photo and an after photo compared with a slider',
  },
];

const privacy = [
  { title: 'Stored in Singapore', text: "Private storage, opened only through short-lived links after we check it's you." },
  { title: 'Your own Google Drive', text: 'Keep documents in your Drive if you prefer. The app sees only its own files.' },
  { title: 'Delete anytime', text: 'Remove your account in the app. Your data is gone after 30 days.' },
];

const delays = [undefined, 1, 2, 3] as const;

export default function Personal() {
  const market = useMarket();
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <Reveal as="p" className="kicker">VehicleProve for your car</Reveal>
          <Reveal as="h1" delay={1} className="display">Proof, for your car.</Reveal>
          <Reveal as="p" delay={2} className="lede">Inspections, service history and reminders. Free for one car.</Reveal>
          <Reveal delay={3} className="links-row">
            <a className="link-arrow" href="#inspections">See how it works</a>
            <a className="link-arrow" href="#plans">Plans</a>
          </Reveal>
          <Reveal delay={3} className="hero-phone">
            <Iphone screen="home" size="hero" eager alt="The VehicleProve home screen, with the garage and records" />
          </Reveal>
        </div>
      </section>

      <section className="soft" id="inspections">
        <div className="wrap">
          <Reveal as="h2" className="headline">Walk around. Tap.<br />Proven.</Reveal>
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

      <section id="records">
        <div className="wrap">
          <Reveal as="h2" className="headline">Everything about your car.</Reveal>
          <div className="tiles">
            <Reveal className="tile">
              <p className="tile-kicker">Service history</p>
              <h3>Scan the receipt.<br />Done.</h3>
              <p>The app fills in the rest.</p>
              <Iphone screen="service" size="tile" alt="A car's service history in the app" />
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
          <Reveal as="h2" className="headline">Start free.</Reveal>
          <Reveal as="p" delay={1} className="lede">Pro covers the whole family.</Reveal>
          <Plans audience="personal" />
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

      <section className="soft closing">
        <div className="wrap">
          <Reveal as="img" src="/assets/img/apple-touch-icon.png" width={180} height={180} alt="" />
          <Reveal as="h2" delay={1} className="headline">Coming soon.</Reveal>
          <Reveal as="p" delay={2} className="lede">On its way to iPhone and Android.</Reveal>
          <Reveal delay={3} className="closing-actions">
            <div className="links-row">
              <a className="link-arrow" href="/support/">Support</a>
              <a className="link-arrow" href={`mailto:${supportEmail}?subject=VehicleProve`}>Email us</a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
