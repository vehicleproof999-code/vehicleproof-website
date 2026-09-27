import { useEffect, useRef, useState, type ComponentPropsWithoutRef, type ElementType } from 'react';
import { cx, prefersStill } from '../site';

/** True once the element has scrolled into view (and stays true). */
export function useInView<T extends Element>(margin = '0px 0px -12% 0px') {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersStill() || !('IntersectionObserver' in window)) {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, { rootMargin: margin });
    observer.observe(el);
    return () => observer.disconnect();
  }, [margin]);
  return [ref, inView] as const;
}

type RevealProps<T extends ElementType> = {
  as?: T;
  /** Staggers elements that appear together: 1 to 3. */
  delay?: 1 | 2 | 3;
} & Omit<ComponentPropsWithoutRef<T>, 'as'>;

/** Fades and rises into place when scrolled into view. */
export function Reveal<T extends ElementType = 'div'>({ as, delay, className, ...rest }: RevealProps<T>) {
  const Tag: ElementType = as ?? 'div';
  const [ref, inView] = useInView<HTMLElement>();
  return <Tag ref={ref} className={cx(className, 'reveal', delay && `d${delay}`, inView && 'in')} {...rest} />;
}
