import { AnimatePresence, motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../lib/theme';

const spring = { type: 'spring', stiffness: 500, damping: 32 };

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const dark = theme === 'dark';

  return (
    <button
      onClick={toggle}
      role="switch"
      aria-checked={dark}
      aria-label={`Switch to ${dark ? 'light' : 'dark'} theme`}
      title={`Switch to ${dark ? 'light' : 'dark'} theme`}
      className="group relative flex items-center w-[66px] h-9 shrink-0 rounded-full border border-fg/15 bg-fg/[0.06] p-1 hover:border-fg/30 transition-colors"
    >
      {/* Faint hints of the other state in the track */}
      <Sun size={13} className={`absolute left-[11px] transition-opacity duration-300 ${dark ? 'opacity-40' : 'opacity-0'}`} />
      <Moon size={13} className={`absolute right-[11px] transition-opacity duration-300 ${dark ? 'opacity-0' : 'opacity-40'}`} />

      {/* Twinkles that pop in around the knob in dark mode */}
      <AnimatePresence>
        {dark &&
          [
            { l: 14, t: 6, d: 0.05 },
            { l: 22, t: 22, d: 0.12 },
            { l: 8, t: 17, d: 0.2 },
          ].map((s, i) => (
            <motion.span
              key={i}
              className="absolute w-[3px] h-[3px] rounded-full bg-accent"
              style={{ left: s.l, top: s.t }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.6, 1], opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ delay: s.d, duration: 0.4 }}
            />
          ))}
      </AnimatePresence>

      <motion.span
        className="relative z-10 grid place-items-center w-7 h-7 rounded-full bg-fg text-ink shadow-md overflow-hidden"
        animate={{ x: dark ? 30 : 0 }}
        transition={spring}
        whileTap={{ scale: 0.85 }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={theme}
            initial={{ rotate: dark ? -120 : 120, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: dark ? 120 : -120, scale: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="grid place-items-center"
          >
            {dark ? <Moon size={15} strokeWidth={2.4} /> : <Sun size={15} strokeWidth={2.4} />}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </button>
  );
}
