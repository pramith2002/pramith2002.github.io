import { useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { ArrowUpRight, Shield } from 'lucide-react';
import { AppleIcon, Counter, GooglePlayIcon, Icon, PlayStoreButton, Reveal, SectionLabel, SplitWords, Stars } from './ui';
import { EASE, trackSpotlight } from '../lib/motion';
import { sketchflow } from '../data/apps';

function StatCard({ stat, i }) {
  return (
    <Reveal
      delay={i * 0.08}
      className="spotlight glass rounded-3xl p-6 md:p-8 overflow-hidden"
      onMouseMove={trackSpotlight}
    >
      <p className="font-display font-extrabold tracking-tight text-5xl md:text-6xl leading-none">
        <Counter value={stat.value} decimals={stat.decimals ?? 0} />
        <span className="text-brand">{stat.suffix}</span>
      </p>
      {stat.suffix === '★' && <div className="mt-3"><Stars rating={4.6} className="w-4 h-4" /></div>}
      <p className="mt-3 text-sm text-mute font-medium">{stat.label}</p>
    </Reveal>
  );
}

/** Screenshot deck: the active card sits on top, the rest fan out behind it. */
function CardStack({ active }) {
  const shots = sketchflow.story.map((s) => sketchflow.screenshots[s.shot]);
  return (
    <div className="relative w-[300px] xl:w-[340px] aspect-[9/16]">
      <div className="absolute -inset-16 rounded-full bg-gradient-to-br from-volt/30 to-cyan/30 blur-3xl" />
      {shots.map((src, k) => {
        const offset = k - active;
        const passed = offset < 0;
        const depth = Math.min(offset, 3);
        return (
          <motion.img
            key={src}
            src={src}
            alt={sketchflow.story[k].title}
            className="absolute inset-0 w-full h-full object-cover rounded-[32px] ring-1 ring-fg/15 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9)]"
            style={{ zIndex: shots.length - k }}
            animate={
              passed
                ? { y: -120, x: -60, rotate: -14, opacity: 0, scale: 0.9 }
                : {
                    y: depth * 22,
                    x: depth * (k % 2 ? 14 : -14),
                    rotate: depth * (k % 2 ? 4 : -4),
                    scale: 1 - depth * 0.06,
                    opacity: offset > 3 ? 0 : 1 - depth * 0.18,
                  }
            }
            transition={{ type: 'spring', stiffness: 140, damping: 22 }}
          />
        );
      })}
    </div>
  );
}

function Story() {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const n = sketchflow.story.length;
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start center', 'end center'] });
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActive(Math.min(n - 1, Math.max(0, Math.floor(v * n))));
  });

  return (
    <div ref={ref} className="relative mt-24 md:mt-36 grid lg:grid-cols-2 gap-10">
      {/* Steps */}
      <div className="relative">
        <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-px bg-line">
          <motion.div
            className="w-px bg-gradient-to-b from-volt to-cyan origin-top"
            style={{ height: '100%', scaleY: scrollYProgress }}
          />
        </div>
        {sketchflow.story.map((s, i) => (
          <div key={s.title} className="lg:min-h-[75vh] flex items-center lg:pl-12 py-10 lg:py-0">
            <motion.div
              animate={{ opacity: active === i ? 1 : 0.28 }}
              transition={{ duration: 0.5 }}
              className="max-lg:!opacity-100 w-full"
            >
              <div className="flex items-center gap-3">
                <span className="grid place-items-center w-11 h-11 rounded-2xl bg-gradient-to-br from-volt to-cyan text-on-accent shadow-[0_10px_30px_-8px_rgba(200,255,60,0.7)]">
                  <Icon name={s.icon} size={20} />
                </span>
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-accent">
                  {String(i + 1).padStart(2, '0')} · {s.kicker}
                </span>
              </div>
              <h3 className="mt-6 font-display font-extrabold tracking-tight text-4xl md:text-6xl leading-[0.95]">{s.title}</h3>
              <p className="mt-5 text-lg text-mute leading-relaxed max-w-lg">{s.desc}</p>
              <img
                src={sketchflow.screenshots[s.shot]}
                alt={s.title}
                loading="lazy"
                className="lg:hidden mt-8 w-[min(78vw,320px)] rounded-[28px] ring-1 ring-fg/10 shadow-2xl"
              />
            </motion.div>
          </div>
        ))}
      </div>

      {/* Sticky deck */}
      <div className="hidden lg:block">
        <div className="sticky top-0 h-screen flex items-center justify-center">
          <CardStack active={active} />
          <div className="absolute bottom-[8vh] flex gap-2">
            {sketchflow.story.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-500 ${i === active ? 'w-8 bg-volt' : 'w-1.5 bg-fg/20'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Sketchflow() {
  return (
    <section id="sketchflow" className="relative py-28 md:py-40 overflow-x-clip">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[600px] rounded-full bg-volt/10 blur-[160px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        <SectionLabel>Flagship app</SectionLabel>

        <div className="mt-8 grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-5">
              <motion.img
                src={sketchflow.logo}
                alt=""
                initial={{ scale: 0, rotate: -30 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 160, damping: 14 }}
                className="w-16 h-16 md:w-20 md:h-20 rounded-[22px] ring-1 ring-fg/20 shadow-xl"
              />
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-400/10 border border-emerald-400/30 px-3 py-1.5 text-xs font-bold text-emerald-300 light:text-emerald-700">
                  <GooglePlayIcon className="w-3.5 h-3.5" /> Live on Android
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-cyan/10 border border-cyan/30 px-3 py-1.5 text-xs font-bold text-accent-2">
                  <AppleIcon className="w-3.5 h-3.5" /> iOS in development
                </span>
              </div>
            </div>
            <h2 className="mt-8 font-display font-extrabold tracking-[-0.035em] leading-[0.92] text-[clamp(2.75rem,7.5vw,6.5rem)]">
              <SplitWords text="Draw & Paint:" className="block" />
              <SplitWords text="Sketchflow" className="block" wordClassName="text-brand" delay={0.15} />
            </h2>
          </div>
          <Reveal delay={0.2} className="lg:col-span-4">
            <p className="text-lg md:text-xl text-mute leading-relaxed">
              {sketchflow.tagline} Your phone becomes the projector, the lightbox and the teacher. All you bring is
              paper and a pencil.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <PlayStoreButton href={sketchflow.playStore} />
              <a
                href={sketchflow.privacyUrl}
                className="inline-flex items-center gap-2 text-sm font-semibold text-mute hover:text-fg transition-colors"
              >
                <Shield size={16} /> Privacy
              </a>
            </div>
          </Reveal>
        </div>

        {/* Social proof */}
        <div className="mt-16 md:mt-24 grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
          {sketchflow.stats.map((s, i) => (
            <StatCard key={s.label} stat={s} i={i} />
          ))}
        </div>
        <Reveal className="mt-5 flex justify-end">
          <a
            href={sketchflow.reviews}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-mute hover:text-accent transition-colors"
          >
            Read the reviews on Google Play <ArrowUpRight size={16} />
          </a>
        </Reveal>

        <Story />

        {/* Three ways to trace */}
        <div className="mt-24 md:mt-32">
          <Reveal>
            <p className="font-hand text-3xl text-accent -rotate-2">pick your style →</p>
            <h3 className="mt-2 font-display font-extrabold tracking-tight text-4xl md:text-6xl">Three ways to trace.</h3>
          </Reveal>
          <div className="mt-10 grid md:grid-cols-3 gap-4 md:gap-5">
            {sketchflow.modes.map((m, i) => (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, y: 60, rotate: i === 1 ? 0 : i === 0 ? -4 : 4 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 1, ease: EASE, delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                onMouseMove={trackSpotlight}
                className="spotlight glass rounded-[28px] p-8 overflow-hidden group"
              >
                <div className="flex items-start justify-between">
                  <span className="grid place-items-center w-14 h-14 rounded-2xl bg-fg/5 border border-fg/10 group-hover:bg-gradient-to-br group-hover:from-volt group-hover:to-cyan group-hover:text-on-accent transition-colors duration-500">
                    <Icon name={m.icon} size={24} />
                  </span>
                  <span className="font-display text-6xl font-extrabold text-fg/[0.06] group-hover:text-fg/15 transition-colors">
                    {i + 1}
                  </span>
                </div>
                <h4 className="mt-10 font-display text-2xl font-bold">{m.title}</h4>
                <p className="mt-2 text-mute">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
