import { useEffect } from 'react';

export const EASE = [0.16, 1, 0.3, 1];

/** Freezes page scroll (native + Lenis) while a modal is open. */
export function useScrollLock(locked) {
  useEffect(() => {
    if (!locked) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.__lenis?.stop();
    return () => {
      document.body.style.overflow = prev;
      window.__lenis?.start();
    };
  }, [locked]);
}

/** Updates --mx/--my on the element so `.spotlight` can follow the cursor. */
export function trackSpotlight(e) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
}
