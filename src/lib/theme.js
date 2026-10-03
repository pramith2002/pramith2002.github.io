import { useCallback, useState } from 'react';
import { flushSync } from 'react-dom';

const STORAGE_KEY = 'horizon-theme';
const META = { dark: '#08090a', light: '#f5f6f1' };

const current = () => (document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');

function apply(theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', META[theme]);
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* storage unavailable (private mode etc.): theme still applies for this visit */
  }
}

/**
 * Theme state plus a toggle that reveals the new theme as a circle growing out of
 * the clicked element. Falls back to a colour cross-fade where View Transitions
 * aren't supported, and switches instantly for reduced-motion users.
 */
export function useTheme() {
  const [theme, setTheme] = useState(current);

  const toggle = useCallback((e) => {
    const next = current() === 'dark' ? 'light' : 'dark';
    const swap = () => {
      apply(next);
      setTheme(next);
    };

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return swap();

    if (!document.startViewTransition) {
      const root = document.documentElement;
      root.classList.add('theme-fade');
      swap();
      setTimeout(() => root.classList.remove('theme-fade'), 550);
      return;
    }

    const r = e?.currentTarget?.getBoundingClientRect();
    const x = r ? r.left + r.width / 2 : window.innerWidth - 60;
    const y = r ? r.top + r.height / 2 : 40;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

    const transition = document.startViewTransition(() => flushSync(swap));
    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 750, easing: 'cubic-bezier(0.65, 0, 0.35, 1)', pseudoElement: '::view-transition-new(root)' },
      );
    });
  }, []);

  return { theme, toggle };
}
