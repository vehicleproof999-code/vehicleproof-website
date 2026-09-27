import { useEffect, useRef, useState } from 'react';
import { cx } from '../site';
import { Shot, type ShotName } from './Shot';

export type StoryStep = { shot: ShotName; alt: string; label: string; title: string; text: string };

/**
 * On wide screens the phone stays put while the steps scroll past, and it
 * shows whichever step is in the middle of the screen. On phones each step
 * shows its own image above the text instead.
 */
export function Story({ steps }: { steps: StoryStep[] }) {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) setActive(stepRefs.current.indexOf(entry.target as HTMLElement));
      }
    }, { rootMargin: '-45% 0px -45% 0px' });
    stepRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="story">
      <div className="story-media" aria-hidden="true">
        {steps.map((step, i) => (
          <figure key={step.shot} className={cx(i === active && 'active')}>
            <Shot name={step.shot} kind="scene" alt="" sizes="440px" />
          </figure>
        ))}
      </div>
      <div className="steps-col">
        {steps.map((step, i) => (
          <article
            key={step.shot}
            className={cx('step', i === active && 'active')}
            ref={(el) => { stepRefs.current[i] = el; }}
          >
            <div className="step-img">
              <Shot name={step.shot} kind="scene" alt={step.alt} sizes="(max-width: 900px) 90vw, 1px" />
            </div>
            <p className="num">{String(i + 1).padStart(2, '0')} · {step.label}</p>
            <h3 className="title">{step.title}</h3>
            <p>{step.text}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
