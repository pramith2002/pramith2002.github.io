import { motion } from 'framer-motion';
import { Bell } from 'lucide-react';
import { AppleIcon, Magnetic, Reveal, SplitWords } from './ui';
import { EASE } from '../lib/motion';
import { sketchflow } from '../data/apps';

const NOTIFY = 'mailto:pramith303@gmail.com?subject=Notify%20me%20when%20Sketchflow%20launches%20on%20iOS';

function PhoneSketch() {
  const draw = (delay, duration = 1.6) => ({
    initial: { pathLength: 0, opacity: 0 },
    whileInView: { pathLength: 1, opacity: 1 },
    viewport: { once: true, margin: '-15% 0px' },
    transition: { duration, ease: 'easeInOut', delay },
  });
  return (
    <div className="relative w-[220px] sm:w-[260px] aspect-[9/18.5]">
      <svg viewBox="0 0 260 535" className="absolute inset-0 w-full h-full" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="iosStroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#c8ff3c" />
            <stop offset="1" stopColor="#2de2ff" />
          </linearGradient>
        </defs>
        <motion.rect x="4" y="4" width="252" height="527" rx="44" stroke="url(#iosStroke)" strokeWidth="3" {...draw(0)} />
        <motion.rect x="16" y="16" width="228" height="503" rx="34" stroke="color-mix(in srgb, var(--color-fg) 25%, transparent)" strokeWidth="1.5" strokeDasharray="6 6" {...draw(0.5)} />
        <motion.rect x="95" y="28" width="70" height="20" rx="10" stroke="color-mix(in srgb, var(--color-fg) 50%, transparent)" strokeWidth="2" {...draw(1, 0.8)} />
        {/* the app icon being traced */}
        <motion.rect x="70" y="150" width="120" height="120" rx="30" stroke="color-mix(in srgb, var(--color-fg) 70%, transparent)" strokeWidth="2" strokeDasharray="4 5" {...draw(1.1, 1.2)} />
      </svg>
      <motion.img
        src={sketchflow.logo}
        alt=""
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 2, duration: 0.9, ease: EASE }}
        className="absolute left-[26.9%] top-[28%] w-[46.2%] rounded-[24%] shadow-[0_20px_50px_-10px_rgba(200,255,60,0.7)]"
      />
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 2.3 }}
        className="absolute inset-x-0 top-[55%] text-center font-display font-bold text-lg"
      >
        Sketchflow
        <span className="block text-xs font-semibold text-mute mt-0.5">for iOS</span>
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 2.2, duration: 0.8, ease: EASE }}
        className="absolute left-1/2 -translate-x-1/2 bottom-[12%] w-[70%]"
      >
        <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-mute mb-2">
          <span>Building</span>
          <span className="text-accent-2">In progress</span>
        </div>
        <div className="h-1.5 rounded-full bg-fg/10 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-volt to-cyan"
            animate={{ x: ['-100%', '120%'] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: '45%' }}
          />
        </div>
      </motion.div>
    </div>
  );
}

export default function IOSTeaser() {
  return (
    <section className="relative py-24 md:py-32 px-4 sm:px-6 md:px-10">
      <div className="relative max-w-7xl mx-auto rounded-[40px] overflow-hidden border border-line bg-ink-2">
        <div className="absolute inset-0 dot-grid opacity-60" />
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-cyan/15 blur-[140px]" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-volt/10 blur-[140px]" />

        <div className="relative grid md:grid-cols-2 gap-12 items-center p-8 sm:p-12 md:p-16 lg:p-20">
          <div>
            <Reveal className="inline-flex items-center gap-2 rounded-full bg-fg text-ink px-4 py-2 text-sm font-bold">
              <AppleIcon className="w-4 h-4" /> Coming to the App Store
            </Reveal>
            <h2 className="mt-8 font-display font-extrabold tracking-[-0.03em] leading-[0.95] text-[clamp(2.5rem,5.5vw,4.75rem)]">
              <SplitWords text="Sketchflow for" className="block" />
              <SplitWords text="iPhone & iPad." className="block" wordClassName="text-brand" delay={0.15} />
            </h2>
            <Reveal delay={0.2}>
              <p className="mt-6 text-lg text-mute leading-relaxed max-w-md">
                The iOS version is in active development. Same AR tracing, same template library, rebuilt to feel at
                home on Apple devices. Want to know the moment it lands?
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Magnetic strength={0.25}>
                  <a
                    href={NOTIFY}
                    className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-volt to-cyan text-on-accent px-6 py-3.5 font-bold shadow-[0_15px_40px_-10px_rgba(200,255,60,0.7)] active:scale-[0.97] transition-transform"
                  >
                    <Bell size={18} /> Notify me at launch
                  </a>
                </Magnetic>
                <a href={sketchflow.playStore} target="_blank" rel="noopener noreferrer" className="font-semibold text-mute hover:text-fg transition-colors">
                  On Android? Get it now →
                </a>
              </div>
            </Reveal>
          </div>
          <div className="flex justify-center md:justify-end">
            <PhoneSketch />
          </div>
        </div>
      </div>
    </section>
  );
}
