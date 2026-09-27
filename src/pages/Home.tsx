import { Gallery } from '../components/Gallery';
import { HeroMedia } from '../components/HeroMedia';
import { Reveal } from '../components/Reveal';
import { Shot } from '../components/Shot';
import { Story, type StoryStep } from '../components/Story';
import { supportEmail, tagline } from '../site';

const steps: StoryStep[] = [
  {
    shot: 'new-inspection', label: 'Start', title: 'Pick the moment.',
    alt: 'Choosing the inspection type in the app',
    text: "A check-in before a rental or handover. A check-out when it comes back. A routine check, or a close look at a car you're about to buy.",
  },
  {
    shot: 'camera', label: 'Capture', title: 'Every angle, guided.',
    alt: 'The guided camera photographing the front-right corner of a car',
    text: 'The camera walks you around the vehicle one angle at a time, with zoom and your progress always in view. Nothing gets missed.',
  },
  {
    shot: 'summary', label: 'Review', title: 'Condition at a glance.',
    alt: 'Inspection summary with issues marked around a car',
    text: "Issues are pinned to the exact spot on the car, next to every angle you've captured, and any that are still missing.",
  },
  {
    shot: 'compare', label: 'Compare', title: 'Spot what changed.',
    alt: 'A check-in photo and a check-out photo compared with a slider',
    text: 'Put a check-in next to a check-out and drag the slider. New scratches and dents stand out straight away.',
  },
];

const gallery = [
  { shot: 'hub', alt: 'Your vehicle hub, all in one place: the home screen' },
  { shot: 'garage', alt: 'Browse your garage at a glance: the vehicles screen' },
  { shot: 'vehicle', alt: "Everything about each vehicle: a car's page" },
  { shot: 'new-inspection', alt: 'Start inspections in seconds: choosing the inspection type' },
  { shot: 'camera', alt: 'Capture every angle with guidance: the inspection camera' },
  { shot: 'summary', alt: 'See condition at a glance: the inspection summary' },
  { shot: 'compare', alt: 'Compare before and after: check-in and check-out photos' },
  { shot: 'history', alt: 'Track inspection history over time: the inspection timeline' },
] as const;

const facts = [
  { big: '9 angles', text: 'Front, rear, both sides, all four corners and the odometer.' },
  { big: 'SHA-256', text: "A fingerprint for every photo, so edits don't go unnoticed." },
  { big: 'Sealed', text: 'Finished reports are locked, with any missing angles noted.' },
];

const records = [
  { title: 'Service history', text: 'Log services and repairs, or scan the workshop receipt and let the app fill it in.' },
  { title: 'Documents', text: 'Insurance, road tax and registration, with their expiry dates.' },
  { title: 'Reminders', text: 'A heads-up before road tax, insurance or a service is due.' },
  { title: 'Expenses', text: 'Running costs, kept with the vehicle they belong to.' },
];

const privacy = [
  { title: 'Stored in Singapore', text: "Private storage, opened only through short-lived links after we've checked it's you." },
  { title: 'Your own Google Drive', text: 'Keep documents in your Drive if you prefer. The app only sees files it creates.' },
  { title: 'Delete anytime', text: 'Remove your account in the app or by email. Your data is permanently deleted after 30 days.' },
];

const delays = [undefined, 1, 2] as const;

export default function Home() {
  return (
    <>
      <section className="hero center">
        <div className="wrap">
          <Reveal as="p" className="eyebrow">{tagline}</Reveal>
          <Reveal as="h1" delay={1} className="display">
            Your vehicle's history.<br /><span className="red">With proof.</span>
          </Reveal>
          <Reveal as="p" delay={2} className="lede">
            Photo-proof inspections, service history, documents and renewal reminders, for every vehicle you own, rent
            out or manage.
          </Reveal>
          <Reveal delay={3} className="cta-row">
            <a className="pill pill-red" href="#story">See how it works</a>
            <a className="pill pill-quiet" href="/support/">Contact us</a>
          </Reveal>
          <Reveal as="p" delay={3} className="soon">Coming soon to iPhone and Android.</Reveal>
        </div>
        <HeroMedia>
          <Shot name="hub" kind="scene" eager sizes="(max-width: 600px) 88vw, 470px"
            alt="The VehicleProof home screen, showing four vehicles in the garage" />
        </HeroMedia>
      </section>

      <section className="soft" id="story">
        <div className="wrap">
          <div className="story-intro center">
            <Reveal as="p" className="eyebrow">Inspections</Reveal>
            <Reveal as="h2" delay={1} className="headline">Walk around. Tap.<br />Proven.</Reveal>
            <Reveal as="p" delay={2} className="lede">
              A guided inspection records the condition of any vehicle in a few minutes, with evidence that's hard to
              argue with.
            </Reveal>
          </div>
          <Story steps={steps} />
        </div>
      </section>

      <section className="night center statement">
        <div className="wrap">
          <Reveal as="p" className="eyebrow">Proof that holds up</Reveal>
          <Reveal as="h2" delay={1} className="headline">Fingerprinted. Timestamped.<br />Sealed.</Reveal>
          <Reveal as="p" delay={2} className="lede">
            Every inspection photo gets a unique digital fingerprint and a timestamp the moment it's taken. Seal the
            report, and any later change can be detected.
          </Reveal>
          <div className="facts">
            {facts.map((fact, i) => (
              <Reveal key={fact.big} delay={delays[i]}><b>{fact.big}</b><span>{fact.text}</span></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap split">
          <div>
            <Reveal as="p" className="eyebrow">Records</Reveal>
            <Reveal as="h2" delay={1} className="headline">Everything about each vehicle.</Reveal>
            <Reveal as="p" delay={2} className="lede">One page per vehicle, with its whole story.</Reveal>
            <Reveal as="ul" delay={3} className="rows">
              {records.map((row) => <li key={row.title}><b>{row.title}</b><span>{row.text}</span></li>)}
            </Reveal>
          </div>
          <Reveal className="scene">
            <Shot name="vehicle" kind="scene" sizes="(max-width: 900px) 90vw, 440px"
              alt="A car's page in the app, with its inspections, service history, insurance and road tax" />
          </Reveal>
        </div>
      </section>

      <section className="soft">
        <div className="wrap split flip">
          <div>
            <Reveal as="p" className="eyebrow">History</Reveal>
            <Reveal as="h2" delay={1} className="headline">Every visit, on one timeline.</Reveal>
            <Reveal as="p" delay={2} className="lede">
              Inspections, service visits and detected damage, in order. When it's time to sell or hand over, the
              history is ready to show.
            </Reveal>
          </div>
          <Reveal className="scene">
            <Shot name="history" kind="scene" sizes="(max-width: 900px) 90vw, 440px"
              alt="A vehicle's timeline of inspections and service visits" />
          </Reveal>
        </div>
      </section>

      <section id="gallery">
        <Gallery title="Take a closer look." items={[...gallery]} />
      </section>

      <section className="soft center privacy">
        <div className="wrap">
          <Reveal as="p" className="eyebrow">Privacy</Reveal>
          <Reveal as="h2" delay={1} className="headline">Your records.<br />Your control.</Reveal>
          <Reveal as="p" delay={2} className="lede">
            No ads, no trackers, and we never sell your data. Just a safe home for your vehicle's paperwork.
          </Reveal>
          <div className="pillars">
            {privacy.map((item, i) => (
              <Reveal key={item.title} delay={delays[i]}><b>{item.title}</b><span>{item.text}</span></Reveal>
            ))}
          </div>
          <Reveal as="p" className="more"><a className="link-arrow" href="/privacy/">Read the privacy policy</a></Reveal>
        </div>
      </section>

      <section className="closing center">
        <div className="wrap">
          <Reveal as="img" src="/assets/img/apple-touch-icon.png" width={180} height={180} alt="" />
          <Reveal as="h2" delay={1} className="headline">Coming soon.</Reveal>
          <Reveal as="p" delay={2} className="lede">
            VehicleProof is on its way to iPhone and Android. Questions before then? We'd love to hear from you.
          </Reveal>
          <Reveal delay={3} className="cta-row">
            <a className="pill pill-red" href={`mailto:${supportEmail}?subject=VehicleProof`}>Email us</a>
            <a className="pill pill-quiet" href="/support/">Support</a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
