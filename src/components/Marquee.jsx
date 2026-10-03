import { useRef } from 'react';
import {
  motion, useAnimationFrame, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, useVelocity,
} from 'framer-motion';

const wrap = (min, max, v) => {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
};

/** Infinite ticker that speeds up and reverses with scroll velocity. */
function Row({ items, baseVelocity, outline }) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const factor = useTransform(velocity, [-1000, 0, 1000], [-4, 0, 4], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`);
  const dir = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let move = dir.current * baseVelocity * (delta / 1000);
    const f = factor.get();
    if (f < 0) dir.current = -1;
    else if (f > 0) dir.current = 1;
    move += dir.current * move * f;
    baseX.set(baseX.get() + move);
  });

  const content = items.map((t, i) => (
    <span key={i} className="flex items-center gap-8 md:gap-12 pr-8 md:pr-12">
      <span
        className={outline ? 'text-transparent' : ''}
        style={outline ? { WebkitTextStroke: '1.5px color-mix(in srgb, var(--color-fg) 35%, transparent)' } : undefined}
      >
        {t}
      </span>
      <svg viewBox="0 0 40 40" className="w-8 h-8 md:w-12 md:h-12 shrink-0" aria-hidden="true">
        <path d="M20 2 L23 17 L38 20 L23 23 L20 38 L17 23 L2 20 L17 17 Z" fill={outline ? '#2de2ff' : '#c8ff3c'} />
      </svg>
    </span>
  ));

  return (
    <div className="overflow-hidden whitespace-nowrap flex">
      <motion.div className="marquee-track flex font-display font-extrabold tracking-tight text-5xl md:text-8xl uppercase" style={{ x }}>
        {content}{content}{content}{content}
      </motion.div>
    </div>
  );
}

export default function Marquee() {
  return (
    <section aria-hidden="true" className="relative py-10 md:py-16 border-y border-line overflow-hidden -rotate-2 scale-[1.04] bg-ink-2">
      <Row items={['Trace', 'Sketch', 'Paint', 'Animate', 'Organize']} baseVelocity={-2} />
      <div className="h-3 md:h-5" />
      <Row items={['Made for Android', 'Coming to iOS', 'Offline-first', 'Built with love']} baseVelocity={2} outline />
    </section>
  );
}
