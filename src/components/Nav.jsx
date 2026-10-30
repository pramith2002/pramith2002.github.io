import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { HorizonMark } from './ui';
import ThemeToggle from './ThemeToggle';
import { EASE } from '../lib/motion';

const LINKS = [
  { href: './#top', label: 'Home' },
  { href: './#apps', label: 'Apps & games' },
  { href: './#film', label: 'Trailers' },
  { href: './#studio', label: 'About us' },
  { href: './#contact', label: 'Contact' },
];

export default function Nav({ ready }) {
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 400 && !open);
    setScrolled(y > 30);
  });

  return (
    <>
      <motion.div className="fixed top-0 left-0 right-0 h-[2px] z-[55] origin-left bg-gradient-to-r from-volt to-cyan" style={{ scaleX: progress }} />

      <motion.header
        initial={{ y: -120 }}
        animate={{ y: !ready || hidden ? -120 : 0 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="fixed top-3 md:top-5 inset-x-0 z-50 px-3 md:px-6"
      >
        <nav
          className={`mx-auto max-w-6xl flex items-center justify-between rounded-full pl-4 pr-2 py-2 transition-all duration-500 ${
            scrolled || open ? 'glass shadow-[0_10px_40px_-15px_rgba(0,0,0,0.8)] light:shadow-[0_10px_40px_-15px_rgba(0,0,0,0.2)]' : 'border border-transparent'
          }`}
          aria-label="Main"
        >
          <a href="./#top" aria-label="Horizon Builds home" className="flex items-center gap-2 font-display text-lg font-extrabold tracking-tight">
            <HorizonMark className="w-7 h-7 text-fg" />
            Horizon<span className="text-mute font-semibold">Builds</span>
          </a>

          <ul className="hidden lg:flex items-center gap-1 text-sm font-semibold text-mute">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="relative px-4 py-2 rounded-full hover:text-fg hover:bg-fg/5 transition-colors">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a
              href="./#apps"
              className="hidden xl:inline-flex items-center gap-2 rounded-full bg-fg text-ink px-5 py-2.5 text-sm font-bold hover:bg-volt hover:text-on-accent transition-colors"
            >
              Explore projects
            </a>
            <button
              ref={toggleRef}
              onClick={() => setOpen((o) => !o)}
              className="lg:hidden grid place-items-center w-11 h-11 rounded-full bg-fg/10"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="lg:hidden mt-2 mx-auto max-w-6xl glass rounded-3xl p-3"
            >
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                  className="block px-4 py-3.5 rounded-2xl font-display text-2xl font-bold hover:bg-fg/5"
                >
                  {l.label}
                </motion.a>
              ))}
              <a
                href="./#apps"
                onClick={() => setOpen(false)}
                className="mt-2 block text-center rounded-2xl bg-fg text-ink px-5 py-3.5 font-bold"
              >
                Explore our apps & games
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
