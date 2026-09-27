import { useCallback, useEffect, useRef, useState } from 'react';
import { prefersStill } from '../site';
import { Reveal } from './Reveal';
import { Shot, type ShotName } from './Shot';

type Item = { shot: ShotName; alt: string };

const Arrow = ({ back = false }: { back?: boolean }) => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={back ? 'M12.5 4.5 7 10l5.5 5.5' : 'M7.5 4.5 13 10l-5.5 5.5'} />
  </svg>
);

/** A full-width row of the store images: arrows on computers, swipe on phones. */
export function Gallery({ title, items }: { title: string; items: Item[] }) {
  const row = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const el = row.current;
    if (!el) return;
    setAtStart(el.scrollLeft < 8);
    setAtEnd(el.scrollLeft + el.clientWidth > el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    sync();
    addEventListener('resize', sync);
    return () => removeEventListener('resize', sync);
  }, [sync]);

  const move = (direction: 1 | -1) => {
    const el = row.current;
    const card = el?.querySelector('li');
    if (!el || !card) return;
    el.scrollBy({ left: direction * (card.offsetWidth + 22), behavior: prefersStill() ? 'auto' : 'smooth' });
  };

  return (
    <>
      <div className="wrap gallery-head">
        <Reveal as="h2" className="headline">{title}</Reveal>
        <div className="gallery-controls">
          <button className="round" type="button" aria-label="Previous screenshot" disabled={atStart} onClick={() => move(-1)}>
            <Arrow back />
          </button>
          <button className="round" type="button" aria-label="Next screenshot" disabled={atEnd} onClick={() => move(1)}>
            <Arrow />
          </button>
        </div>
      </div>
      <ul className="gallery" aria-label="App screenshots" ref={row} onScroll={sync}>
        {items.map((item) => (
          <li key={item.shot}>
            <Shot name={item.shot} kind="app" alt={item.alt} sizes="(max-width: 600px) 72vw, 318px" />
          </li>
        ))}
      </ul>
    </>
  );
}
