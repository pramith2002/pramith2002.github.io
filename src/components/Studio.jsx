import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Lock, Mail, Sparkles, WifiOff } from 'lucide-react';
import { Reveal, SectionLabel } from './ui';
import { EASE, trackSpotlight } from '../lib/motion';

const MANIFESTO =
  'We are two developers who believe a great app should feel like a good pencil: simple, reliable, and quietly brilliant. We sweat the details, keep your data on your device, and ship tools people actually love to open.';

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const y = useTransform(progress, range, [8, 0]);
  return (
    <motion.span style={{ opacity, y }} className="inline-block mr-[0.25em]">
      {children}
    </motion.span>
  );
}

function Manifesto() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] });
  const words = MANIFESTO.split(' ');
  return (
    <p ref={ref} className="font-display font-bold tracking-tight leading-[1.12] text-[clamp(1.75rem,4.2vw,3.75rem)]">
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {w}
        </Word>
      ))}
    </p>
  );
}

const PRINCIPLES = [
  { icon: Lock, title: 'Private by default', desc: 'Your drawings, receipts and animations stay on your device. No accounts, no cloud uploads.' },
  { icon: WifiOff, title: 'Offline-first', desc: 'Our apps work on a plane, in a basement, anywhere. The internet is optional, not required.' },
  { icon: Sparkles, title: 'Obsessive polish', desc: 'Smooth AR overlays, 60 FPS playback, and interfaces you can use without a tutorial.' },
];

const TEAM = [
  {
    name: 'Pramith',
    role: 'Co-founder · Developer',
    bio: 'Architects the apps end to end: clean native code, rendering, and the AR tracing engine behind Sketchflow.',
    email: 'pramith303@gmail.com',
  },
  {
    name: 'Abhiram',
    role: 'Co-founder · Developer',
    bio: 'Drives product, growth and operations, turning user feedback into the next release and scaling the Horizon lineup.',
    email: 'tsabhiram2004@gmail.com',
  },
];

export default function Studio() {
  return (
    <section id="studio" className="relative py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        <SectionLabel>The studio</SectionLabel>
        <div className="mt-10 max-w-6xl">
          <Manifesto />
        </div>

        <div className="mt-20 md:mt-28 grid md:grid-cols-3 gap-4 md:gap-5">
          {PRINCIPLES.map(({ icon: Ico, title, desc }, i) => (
            <Reveal key={title} delay={i * 0.1} onMouseMove={trackSpotlight} className="spotlight glass rounded-[28px] p-8 overflow-hidden">
              <span className="grid place-items-center w-12 h-12 rounded-2xl bg-fg/5 border border-fg/10 text-accent">
                <Ico size={22} />
              </span>
              <h3 className="mt-8 font-display text-2xl font-bold">{title}</h3>
              <p className="mt-2 text-mute leading-relaxed">{desc}</p>
            </Reveal>
          ))}
        </div>

        {/* Team */}
        <div id="team" className="mt-28 md:mt-36">
          <Reveal>
            <p className="font-hand text-3xl text-accent -rotate-2">the humans ↓</p>
            <h2 className="mt-2 font-display font-extrabold tracking-tight text-4xl md:text-6xl">Made by two.</h2>
          </Reveal>
          <div className="mt-10 grid md:grid-cols-2 gap-5">
            {TEAM.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 1, ease: EASE, delay: i * 0.12 }}
                onMouseMove={trackSpotlight}
                className="spotlight group rounded-[32px] border border-line bg-ink-2 p-8 md:p-10 overflow-hidden"
              >
                <div className="flex items-center gap-5">
                  <motion.span
                    whileHover={{ rotate: -8, scale: 1.05 }}
                    className="grid place-items-center w-20 h-20 rounded-[24px] bg-gradient-to-br from-volt to-cyan text-on-accent font-display text-4xl font-extrabold shadow-[0_15px_40px_-10px_rgba(200,255,60,0.6)]"
                  >
                    {p.name[0]}
                  </motion.span>
                  <div>
                    <h3 className="font-display text-3xl font-extrabold tracking-tight">{p.name}</h3>
                    <p className="text-mute font-semibold text-sm mt-1">{p.role}</p>
                  </div>
                </div>
                <p className="mt-6 text-fg/80 leading-relaxed">{p.bio}</p>
                <a href={`mailto:${p.email}`} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-mute hover:text-accent transition-colors">
                  <Mail size={16} /> {p.email}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
