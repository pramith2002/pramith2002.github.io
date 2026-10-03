import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight, Shield, X } from 'lucide-react';
import { GooglePlayIcon, Icon, Reveal, SectionLabel, SplitWords } from './ui';
import { EASE, trackSpotlight, useScrollLock } from '../lib/motion';
import { otherApps } from '../data/apps';

function AppCard({ app, i, onOpen }) {
  const [hover, setHover] = useState(false);
  return (
    <motion.article
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 1.1, ease: EASE, delay: i * 0.12 }}
      onMouseMove={trackSpotlight}
      style={{ '--glow': `${app.accent}33` }}
      className="spotlight group relative rounded-[36px] border border-line bg-ink-2 overflow-hidden"
    >
      <button onClick={() => onOpen(app)} className="block w-full text-left p-7 sm:p-10" aria-label={`Open details for ${app.name}`}>
        <div className="flex items-start justify-between gap-4">
          <img src={app.logo} alt="" className="w-16 h-16 md:w-20 md:h-20 rounded-[22px] ring-1 ring-fg/10 shadow-lg" />
          <span className="grid place-items-center w-12 h-12 rounded-full border border-fg/15 transition-all duration-500 group-hover:bg-fg group-hover:text-ink group-hover:rotate-45">
            <ArrowUpRight size={20} />
          </span>
        </div>
        <h3 className="mt-8 font-display font-extrabold tracking-tight text-3xl md:text-4xl">{app.shortName}</h3>
        <p className="mt-1 font-semibold" style={{ color: app.accent }}>{app.tagline}</p>
        <p className="mt-4 text-mute leading-relaxed max-w-md">{app.shortDescription}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {app.highlights.map((h) => (
            <span key={h} className="rounded-full border border-fg/10 bg-fg/[0.03] px-3 py-1 text-xs font-semibold text-fg/80">
              {h}
            </span>
          ))}
        </div>

        {/* Fanned screenshots that spread on hover */}
        <div className="relative mt-10 h-[260px] sm:h-[320px]">
          <div className="absolute inset-x-0 bottom-0 h-40 blur-3xl opacity-40" style={{ background: `radial-gradient(closest-side, ${app.accent}, transparent)` }} />
          {app.screenshots.slice(0, 3).map((src, k) => {
            const pos = k - 1;
            return (
              <motion.img
                key={src}
                src={src}
                alt=""
                loading="lazy"
                className="absolute left-1/2 top-0 w-[130px] sm:w-[160px] rounded-[22px] ring-1 ring-fg/10 shadow-2xl"
                style={{ zIndex: pos === 0 ? 3 : 1, marginLeft: -80 }}
                initial={false}
                animate={{
                  x: pos * (hover ? 100 : 60),
                  rotate: pos * (hover ? 12 : 6),
                  y: Math.abs(pos) * (hover ? 34 : 22) - (hover && pos === 0 ? 14 : 0),
                }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              />
            );
          })}
        </div>
      </button>
    </motion.article>
  );
}

function AppModal({ app, onClose }) {
  const scroller = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    closeRef.current?.focus();
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const scroll = (d) => scroller.current?.scrollBy({ left: d * 260, behavior: 'smooth' });

  return (
    <motion.div
      className="fixed inset-0 z-[65] flex items-end md:items-center justify-center md:p-6 bg-ink/80 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={app.name}
    >
      <motion.div
        data-lenis-prevent
        onClick={(e) => e.stopPropagation()}
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 220 }}
        className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-t-[32px] md:rounded-[36px] bg-ink-2 border border-line"
      >
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] blur-[100px] opacity-30 pointer-events-none" style={{ background: app.accent }} />
        <button
          ref={closeRef}
          onClick={onClose}
          className="sticky top-4 float-right mr-4 z-10 grid place-items-center w-11 h-11 rounded-full bg-fg/10 hover:bg-fg hover:text-ink transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="relative p-6 sm:p-10">
          <div className="flex items-center gap-5">
            <img src={app.logo} alt="" className="w-20 h-20 rounded-[24px] ring-1 ring-fg/10" />
            <div>
              <h2 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight">{app.name}</h2>
              <p className="font-semibold mt-1" style={{ color: app.accent }}>{app.tagline}</p>
            </div>
          </div>

          <p className="mt-8 text-fg/80 text-lg leading-relaxed whitespace-pre-line">{app.description}</p>

          <div className="mt-10 flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-mute">Screens</h3>
            <div className="flex gap-2">
              <button onClick={() => scroll(-1)} className="grid place-items-center w-9 h-9 rounded-full bg-fg/5 hover:bg-fg/10" aria-label="Scroll screenshots left"><ChevronLeft size={18} /></button>
              <button onClick={() => scroll(1)} className="grid place-items-center w-9 h-9 rounded-full bg-fg/5 hover:bg-fg/10" aria-label="Scroll screenshots right"><ChevronRight size={18} /></button>
            </div>
          </div>
          <div ref={scroller} className="mt-4 flex gap-4 overflow-x-auto snap-x no-scrollbar pb-2">
            {app.screenshots.map((src, i) => (
              <img key={src} src={src} alt={`${app.shortName} screenshot ${i + 1}`} loading="lazy" className="snap-start shrink-0 w-[200px] sm:w-[230px] rounded-[24px] ring-1 ring-fg/10" />
            ))}
          </div>

          <h3 className="mt-10 text-xs font-bold uppercase tracking-[0.25em] text-mute">What it does</h3>
          <div className="mt-4 grid sm:grid-cols-2 gap-3">
            {app.features.map((f) => (
              <div key={f.title} className="flex gap-4 rounded-2xl border border-line bg-fg/[0.02] p-5">
                <span className="grid place-items-center shrink-0 w-10 h-10 rounded-xl" style={{ background: `${app.accent}22`, color: app.accent }}>
                  <Icon name={f.icon} size={18} />
                </span>
                <div>
                  <h4 className="font-bold">{f.title}</h4>
                  <p className="mt-1 text-sm text-mute leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <a
              href={app.playStore}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-full px-7 py-4 font-bold text-on-accent"
              style={{ background: `linear-gradient(90deg, ${app.accent}, ${app.accent2})` }}
            >
              <GooglePlayIcon className="w-5 h-5" /> Get it on Google Play
            </a>
            <a href={app.privacyUrl} className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 font-semibold border border-fg/15 hover:bg-fg/5">
              <Shield size={18} /> Privacy policy
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Apps() {
  const [selected, setSelected] = useState(null);

  useScrollLock(!!selected);

  return (
    <section id="apps" className="relative py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <SectionLabel>More from Horizon</SectionLabel>
            <h2 className="mt-6 font-display font-extrabold tracking-[-0.03em] leading-[0.95] text-[clamp(2.5rem,6vw,5rem)]">
              <SplitWords text="Small apps." className="block" />
              <SplitWords text="Big care." className="block" wordClassName="text-brand" delay={0.15} />
            </h2>
          </div>
          <Reveal delay={0.2} className="max-w-sm text-mute text-lg">
            Offline-first tools with no sign-ups, built to do one job beautifully.
          </Reveal>
        </div>

        <div className="mt-14 grid md:grid-cols-2 gap-5">
          {otherApps.map((app, i) => (
            <AppCard key={app.id} app={app} i={i} onOpen={setSelected} />
          ))}
        </div>
      </div>

      <AnimatePresence>{selected && <AppModal app={selected} onClose={() => setSelected(null)} />}</AnimatePresence>
    </section>
  );
}
