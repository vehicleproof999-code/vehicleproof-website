import { useEffect, useRef, type ReactNode } from 'react';
import { prefersStill } from '../site';

/** The hero image, growing from 90% to full size as you scroll into the page. */
export function HeroMedia({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersStill()) return;
    let queued = false;
    const update = () => {
      queued = false;
      const progress = Math.min(1, Math.max(0, 1 - el.getBoundingClientRect().top / innerHeight));
      el.style.transform = `scale(${0.9 + 0.1 * progress})`;
    };
    const onScroll = () => {
      if (!queued) {
        queued = true;
        requestAnimationFrame(update);
      }
    };
    update();
    addEventListener('scroll', onScroll, { passive: true });
    return () => removeEventListener('scroll', onScroll);
  }, []);
  return <div className="hero-media" ref={ref}>{children}</div>;
}
