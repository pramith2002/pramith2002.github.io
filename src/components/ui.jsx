import { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import {
  Bell, Brush, Camera, Download, Eye, FileText, Film, Focus, Grid3x3, Layers, LayoutGrid,
  Lightbulb, Lock, ScanBarcode, Smartphone, Sparkles, WandSparkles, Zap,
} from 'lucide-react';

import { EASE } from '../lib/motion';

const ICONS = {
  Bell, Brush, Camera, Download, Eye, FileText, Film, Focus, Grid3x3, Layers, LayoutGrid,
  Lightbulb, Lock, ScanBarcode, Smartphone, Sparkles, WandSparkles, Zap,
};

export function Icon({ name, ...props }) {
  const Cmp = ICONS[name] ?? Sparkles;
  return <Cmp {...props} />;
}

/* ---------- Brand marks (lucide no longer ships brand icons) ---------- */

export function GooglePlayIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="#00d7fe" d="M3.6 1.8 13.4 12 3.6 22.2c-.4-.2-.6-.6-.6-1.1V2.9c0-.5.2-.9.6-1.1Z" />
      <path fill="#ffce00" d="m16.7 8.7-3.3 3.3 3.3 3.3 3.8-2.2c.9-.5.9-1.7 0-2.2l-3.8-2.2Z" />
      <path fill="#ff3a44" d="M13.4 12 3.6 22.2c.4.2.9.2 1.4-.1l11.7-6.8-3.3-3.3Z" />
      <path fill="#00f076" d="M3.6 1.8c.4-.2.9-.2 1.4.1l11.7 6.8-3.3 3.3-9.8-10.2Z" />
    </svg>
  );
}

export function AppleIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M16.37 12.6c-.02-2.3 1.88-3.4 1.96-3.46-1.07-1.56-2.73-1.78-3.32-1.8-1.41-.14-2.76.83-3.48.83-.72 0-1.82-.81-3-.79-1.54.02-2.96.9-3.76 2.27-1.6 2.78-.41 6.9 1.15 9.16.76 1.1 1.67 2.34 2.86 2.3 1.15-.05 1.58-.74 2.97-.74 1.38 0 1.77.74 2.98.72 1.23-.02 2.01-1.12 2.76-2.23.87-1.28 1.23-2.51 1.25-2.58-.03-.01-2.4-.92-2.42-3.66ZM14.1 5.84c.63-.77 1.06-1.83.94-2.89-.91.04-2.01.61-2.66 1.37-.58.67-1.09 1.75-.96 2.79 1.02.08 2.05-.52 2.68-1.27Z" />
    </svg>
  );
}

export function YouTubeIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="#ff0033" d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8Z" />
      <path fill="#fff" d="m9.6 15.6 6.3-3.6-6.3-3.6v7.2Z" />
    </svg>
  );
}

export function HorizonMark({ className = 'w-7 h-7' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="hm" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c8ff3c" />
          <stop offset="1" stopColor="#2de2ff" />
        </linearGradient>
      </defs>
      <path d="M14 40a18 18 0 0 1 36 0" fill="url(#hm)" />
      <rect x="10" y="44" width="44" height="4" rx="2" fill="currentColor" />
    </svg>
  );
}


/* ---------- Motion primitives ---------- */

export function Reveal({ children, delay = 0, y = 40, className, as = 'div', ...rest }) {
  const Cmp = motion[as];
  return (
    <Cmp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.9, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Cmp>
  );
}

/** Words slide up from behind a mask, one after another. */
export function SplitWords({ text, className, wordClassName, delay = 0, stagger = 0.06, inView = true }) {
  const words = text.split(' ');
  const trigger = inView
    ? { initial: 'hidden', whileInView: 'show', viewport: { once: true, margin: '-10% 0px' } }
    : { initial: 'hidden', animate: 'show' };
  return (
    <motion.span className={className} {...trigger} transition={{ staggerChildren: stagger, delayChildren: delay }}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]">
          <motion.span
            className={`inline-block ${wordClassName ?? ''}`}
            variants={{ hidden: { y: '110%', rotate: 4 }, show: { y: '0%', rotate: 0 } }}
            transition={{ duration: 1, ease: EASE }}
          >
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

export function Counter({ value, decimals = 0, duration = 2, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(reduce ? value : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, value, {
      duration,
      ease: EASE,
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, value, duration, reduce]);

  return (
    <span ref={ref} className={className}>
      {display.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
    </span>
  );
}

/** Element drifts toward the cursor while hovered. */
export function Magnetic({ children, strength = 0.35, className }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={reset} style={{ x: sx, y: sy }} className={className}>
      {children}
    </motion.div>
  );
}


export function SectionLabel({ children, className = '' }) {
  return (
    <div className={`inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.25em] text-mute ${className}`}>
      <span className="h-px w-8 bg-gradient-to-r from-volt to-cyan" />
      {children}
    </div>
  );
}

export function Stars({ rating = 4.6, className = 'w-4 h-4' }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, rating - i));
        return (
          <span key={i} className={`relative ${className}`}>
            <svg viewBox="0 0 24 24" className="absolute inset-0 w-full h-full text-fg/15" fill="currentColor"><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1L12 2Z" /></svg>
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <svg viewBox="0 0 24 24" className={`${className} text-amber-300`} fill="currentColor"><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1L12 2Z" /></svg>
            </span>
          </span>
        );
      })}
    </div>
  );
}

export function PlayStoreButton({ href, label = 'Get it on Google Play', className = '' }) {
  return (
    <Magnetic strength={0.25}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`group relative inline-flex items-center gap-3 rounded-full bg-fg pl-4 pr-6 py-3.5 text-ink font-bold shadow-[0_10px_40px_-10px_rgba(200,255,60,0.6)] transition-transform active:scale-[0.97] ${className}`}
      >
        <span className="grid place-items-center w-8 h-8 rounded-full bg-ink">
          <GooglePlayIcon className="w-4 h-4" />
        </span>
        <span className="flex flex-col leading-none text-left">
          <span className="text-[10px] uppercase tracking-widest text-ink/60 font-semibold">Android</span>
          <span className="text-[15px] mt-1">{label}</span>
        </span>
      </a>
    </Magnetic>
  );
}

/** A hand-drawn stroke that draws itself in. */
export function Scribble({ d, className, stroke = 'url(#brandStroke)', width = 6, delay = 0, duration = 1.2, viewBox = '0 0 300 30', inView = true }) {
  const props = inView
    ? { initial: { pathLength: 0, opacity: 0 }, whileInView: { pathLength: 1, opacity: 1 }, viewport: { once: true } }
    : { initial: { pathLength: 0, opacity: 0 }, animate: { pathLength: 1, opacity: 1 } };
  return (
    <svg viewBox={viewBox} className={className} fill="none" aria-hidden="true" preserveAspectRatio="none">
      <defs>
        <linearGradient id="brandStroke" x1="0" x2="1">
          <stop offset="0" stopColor="#c8ff3c" />
          <stop offset="1" stopColor="#2de2ff" />
        </linearGradient>
      </defs>
      <motion.path
        d={d}
        stroke={stroke}
        strokeWidth={width}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
        transition={{ duration, ease: 'easeInOut', delay }}
      />
    </svg>
  );
}
