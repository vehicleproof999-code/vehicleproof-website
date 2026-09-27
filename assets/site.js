// Scroll effects for the home page. Everything is visible without this file;
// it only adds motion. Honours "reduce motion".
(() => {
  window.vpReady = true;
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Fade and rise in as sections enter the screen.
  const reveals = document.querySelectorAll('.reveal');
  if (still || !('IntersectionObserver' in window)) {
    reveals.forEach((el) => el.classList.add('in'));
  } else {
    const seen = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          seen.unobserve(entry.target);
        }
      }
    }, { rootMargin: '0px 0px -12% 0px' });
    reveals.forEach((el) => seen.observe(el));
  }

  // Sticky story: the step in the middle of the screen picks the phone shown.
  const steps = [...document.querySelectorAll('.step')];
  const figures = [...document.querySelectorAll('.story-media figure')];
  const show = (i) => {
    steps.forEach((s, n) => s.classList.toggle('active', n === i));
    figures.forEach((f, n) => f.classList.toggle('active', n === i));
  };
  if (steps.length) {
    show(0);
    const middle = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) show(steps.indexOf(entry.target));
      }
    }, { rootMargin: '-45% 0px -45% 0px' });
    steps.forEach((s) => middle.observe(s));
  }

  // Hero phone grows slightly as you scroll into the page.
  const hero = document.querySelector('.hero-media');
  if (hero && !still) {
    let queued = false;
    const update = () => {
      queued = false;
      const top = hero.getBoundingClientRect().top;
      const p = Math.min(1, Math.max(0, 1 - top / innerHeight));
      hero.style.transform = `scale(${0.9 + 0.1 * p})`;
    };
    addEventListener('scroll', () => {
      if (!queued) { queued = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  // Gallery arrows.
  const gallery = document.querySelector('.gallery');
  const prev = document.querySelector('[data-gallery="prev"]');
  const next = document.querySelector('[data-gallery="next"]');
  if (gallery && prev && next) {
    const step = () => (gallery.querySelector('li')?.offsetWidth || 300) + 22;
    const sync = () => {
      prev.disabled = gallery.scrollLeft < 8;
      next.disabled = gallery.scrollLeft + gallery.clientWidth > gallery.scrollWidth - 8;
    };
    prev.addEventListener('click', () => gallery.scrollBy({ left: -step(), behavior: still ? 'auto' : 'smooth' }));
    next.addEventListener('click', () => gallery.scrollBy({ left: step(), behavior: still ? 'auto' : 'smooth' }));
    gallery.addEventListener('scroll', sync, { passive: true });
    addEventListener('resize', sync);
    sync();
  }
})();
