import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, Download, LayoutGrid, Play } from 'lucide-react';
import { AppleIcon, Magnetic, Scribble, SplitWords } from './ui';
import { EASE } from '../lib/motion';
import { arrowmio, otherApps, sketchflow } from '../data/apps';

const showcase = [sketchflow, arrowmio, ...otherApps];

function useParallax(mx, my, depth) {
  const x = useTransform(mx, (v) => v * depth);
  const y = useTransform(my, (v) => v * depth);
  return { x, y };
}

export default function Hero({ ready }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const artY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const artRotate = useTransform(scrollYProgress, [0, 1], [0, -6]);

  const mx = useSpring(0, { stiffness: 60, damping: 20 });
  const my = useSpring(0, { stiffness: 60, damping: 20 });
  const onMove = (e) => {
    mx.set(e.clientX / window.innerWidth - 0.5);
    my.set(e.clientY / window.innerHeight - 0.5);
  };

  const back = useParallax(mx, my, -18);
  const mid = useParallax(mx, my, 26);
  const chipA = useParallax(mx, my, 70);
  const chipB = useParallax(mx, my, -55);

  const show = (delay) => ({
    initial: { opacity: 0, y: 30, scale: 0.9 },
    animate: ready ? { opacity: 1, y: 0, scale: 1 } : {},
    transition: { duration: 1.1, ease: EASE, delay },
  });

  return (
    <section
      id="top"
      ref={ref}
      onMouseMove={onMove}
      className="relative min-h-[100svh] flex items-center overflow-clip pt-28 pb-20 md:pt-32"
    >
      {/* Ambient background */}
      <div className="absolute inset-0 dot-grid pointer-events-none" />
      <motion.div
        className="absolute -top-40 -left-40 w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] rounded-full bg-volt/12 blur-[140px] pointer-events-none"
        animate={{ x: [0, 80, -40, 0], y: [0, 60, 20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-60 -right-40 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full bg-cyan/15 blur-[140px] pointer-events-none"
        animate={{ x: [0, -60, 30, 0], y: [0, -40, 30, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 grid lg:grid-cols-12 gap-14 lg:gap-6 items-center">
        {/* Copy */}
        <motion.div style={{ y: textY, opacity: textOpacity }} className="lg:col-span-7 relative z-10">
          <motion.a
            href="#apps"
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            className="inline-flex flex-wrap items-center gap-x-3 gap-y-1 glass rounded-full pl-3 pr-4 py-2 text-xs sm:text-sm font-semibold hover:border-volt/40 transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-volt shadow-[0_0_12px_rgba(200,255,60,0.6)]" />
            <span>Independent mobile studio</span>
            <span className="w-1 h-1 rounded-full bg-fg/30" />
            <span className="text-mute">Create. Play. Simplify.</span>
          </motion.a>

          <h1 aria-label="Horizon Builds" className="mt-7 font-display font-extrabold tracking-[-0.035em] leading-[0.92] text-[clamp(3rem,8vw,6.25rem)]">
            {ready && (
              <>
                <SplitWords text="Horizon" inView={false} delay={0.15} className="block" />
                <span className="relative inline-block">
                  <SplitWords text="Builds." inView={false} delay={0.3} wordClassName="text-brand pr-2" />
                  <Scribble
                    inView={false}
                    delay={1.1}
                    className="absolute left-0 -bottom-2 md:-bottom-3 w-full h-4 md:h-6"
                    d="M4 20 C 60 6, 120 4, 170 12 S 260 22, 296 8"
                  />
                </span>
              </>
            )}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: EASE, delay: 0.7 }}
            className="mt-8 max-w-xl text-lg md:text-xl text-mute leading-relaxed"
          >
            A small studio for big ideas. We build creative tools, thoughtful everyday apps,
            and games that make you want to play one more time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: EASE, delay: 0.85 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Magnetic strength={0.25}>
              <a href="#apps" className="inline-flex items-center gap-3 rounded-full bg-fg text-ink px-6 py-4 font-bold shadow-[0_10px_40px_-10px_rgba(200,255,60,0.4)] hover:bg-volt hover:text-on-accent transition-colors">
                <LayoutGrid size={19} /> Explore apps & games <ArrowUpRight size={18} />
              </a>
            </Magnetic>
            <a
              href="#film"
              className="group inline-flex items-center gap-3 rounded-full px-5 py-3.5 font-bold border border-fg/15 hover:border-fg/40 hover:bg-fg/5 transition-colors"
            >
              <span className="relative grid place-items-center w-8 h-8 rounded-full bg-volt text-on-accent">
                <span className="absolute inset-0 rounded-full bg-volt animate-ping opacity-40" />
                <Play size={14} fill="currentColor" className="relative ml-0.5" />
              </span>
              Watch our trailers
            </a>
          </motion.div>
        </motion.div>

        {/* Collage */}
        <motion.div style={{ y: artY, rotate: artRotate }} className="lg:col-span-5 relative h-[440px] sm:h-[520px] lg:h-[600px]">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Back screenshot */}
            <motion.div style={back} className="absolute left-[2%] sm:left-[8%] lg:left-[-6%] top-[8%]">
              <motion.img
                {...show(0.5)}
                src={otherApps[0].screenshots[0]}
                alt=""
                className="w-[150px] sm:w-[190px] lg:w-[210px] rounded-[26px] -rotate-[10deg] shadow-2xl ring-1 ring-fg/10"
              />
            </motion.div>
            <motion.div style={back} className="absolute right-[2%] sm:right-[8%] lg:right-[-8%] top-[18%]">
              <motion.img
                {...show(0.6)}
                src={arrowmio.screenshots[1]}
                alt=""
                className="w-[150px] sm:w-[190px] lg:w-[210px] rounded-[26px] rotate-[9deg] shadow-2xl ring-1 ring-fg/10"
              />
            </motion.div>

            {/* Hero card: app artwork */}
            <motion.div style={mid} className="relative">
              <motion.div {...show(0.35)} className="relative">
                <div className="absolute -inset-6 rounded-[48px] bg-gradient-to-br from-volt/50 to-cyan/50 blur-3xl opacity-70" />
                <motion.div
                  className="relative w-[240px] sm:w-[300px] lg:w-[330px] rounded-[32px] bg-ink-2/95 backdrop-blur-xl border border-fg/15 p-6 sm:p-8 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)]"
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-mute">A little world of possibility</p>
                  <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-7">
                    {showcase.map((app) => (
                      <a key={app.id} href={`./${app.id}.html`} className="group flex flex-col items-center gap-2.5 text-center">
                        <motion.img whileHover={{ y: -5, rotate: -4 }} src={app.logo} alt="" className="w-[68px] h-[68px] sm:w-[80px] sm:h-[80px] object-cover rounded-[21px] ring-1 ring-fg/10 shadow-xl" />
                        <span className="text-[11px] font-semibold text-mute group-hover:text-accent transition-colors">{app.shortName}</span>
                      </a>
                    ))}
                  </div>
                  <div className="mt-7 pt-4 border-t border-line flex items-center justify-between text-[10px] font-semibold text-mute"><span>Built by Horizon</span><span className="text-accent">Made for you ↗</span></div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Floating chips */}
            <motion.div style={chipA} className="absolute left-0 sm:left-[4%] lg:-left-[10%] bottom-0 sm:bottom-[12%]">
              <motion.div {...show(0.9)} className="glass rounded-2xl px-4 py-3 shadow-xl">
                <div className="flex items-center gap-2">
                  <img src={otherApps[0].logo} alt="" className="w-8 h-8 rounded-lg" />
                  <span className="font-display text-3xl font-extrabold">2K+</span>
                </div>
                <p className="text-xs text-mute mt-0.5">Flipbook 2D downloads</p>
              </motion.div>
            </motion.div>

            <motion.div style={chipB} className="absolute right-0 sm:right-[4%] lg:-right-[6%] -top-[4%] sm:top-[2%]">
              <motion.div {...show(1)} className="glass rounded-2xl px-4 py-3 shadow-xl flex items-center gap-3">
                <span className="grid place-items-center w-9 h-9 rounded-xl bg-gradient-to-br from-volt to-cyan text-on-accent">
                  <Download size={18} />
                </span>
                <div>
                  <p className="font-display text-2xl font-extrabold leading-none">30K+</p>
                  <p className="text-xs text-mute mt-1">Sketchflow downloads</p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div style={chipA} className="absolute right-[6%] sm:right-[12%] lg:right-[2%] -bottom-[12%] sm:bottom-[2%]">
              <motion.div {...show(1.1)} className="glass rounded-full pl-2 pr-4 py-2 shadow-xl flex items-center gap-2 text-sm font-semibold">
                <span className="grid place-items-center w-7 h-7 rounded-full bg-fg text-ink">
                  <AppleIcon className="w-4 h-4" />
                </span>
                iOS in development
                <span className="relative flex w-2 h-2">
                  <span className="absolute inset-0 rounded-full bg-cyan animate-ping" />
                  <span className="relative w-2 h-2 rounded-full bg-cyan" />
                </span>
              </motion.div>
            </motion.div>

            {/* Doodles */}
            <motion.span
              {...show(1.2)}
              className="absolute left-[18%] top-[0%] font-hand text-2xl text-accent -rotate-6 hidden sm:block"
            >
              made to create & play ↓
            </motion.span>
            <svg className="absolute right-[18%] bottom-[22%] w-10 h-10 text-accent-2" viewBox="0 0 40 40" fill="none" aria-hidden="true">
              <motion.path
                d="M20 2 L23 17 L38 20 L23 23 L20 38 L17 23 L2 20 L17 17 Z"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={ready ? { pathLength: 1, rotate: 360 } : {}}
                transition={{ pathLength: { duration: 1.4, delay: 1.2 }, rotate: { duration: 20, repeat: Infinity, ease: 'linear' } }}
              />
            </svg>
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 1.4 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-[10px] font-bold uppercase tracking-[0.4em] text-mute"
      >
        Scroll
        <span className="relative w-px h-10 bg-fg/10 overflow-hidden">
          <motion.span
            className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-volt to-transparent"
            animate={{ y: [-16, 40] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </motion.div>
    </section>
  );
}
