import { useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Play } from 'lucide-react';
import { Magnetic, Reveal, SectionLabel, SplitWords, YouTubeIcon } from './ui';
import { sketchflow, YT_CHANNEL } from '../data/apps';

export default function LaunchFilm() {
  const ref = useRef(null);
  const [playing, setPlaying] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.72, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], [64, 28]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [18, 0]);
  const posterScale = useTransform(scrollYProgress, [0, 1], [1.25, 1]);
  const { id, title, poster } = sketchflow.video;

  return (
    <section id="film" className="relative py-24 md:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <SectionLabel>Launch film</SectionLabel>
            <h2 className="mt-6 font-display font-extrabold tracking-[-0.03em] leading-[0.95] text-[clamp(2.5rem,6vw,5rem)]">
              <SplitWords text="Pick a template." className="block" />
              <SplitWords text="Draw it on paper." className="block" wordClassName="text-brand" delay={0.15} />
            </h2>
          </div>
          <Reveal delay={0.2}>
            <a
              href={YT_CHANNEL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full glass px-5 py-3 text-sm font-semibold hover:border-fg/30 transition-colors"
            >
              <YouTubeIcon className="w-5 h-5" /> More on our YouTube <ArrowUpRight size={16} />
            </a>
          </Reveal>
        </div>

        <div ref={ref} className="mt-12 md:mt-16" style={{ perspective: 1400 }}>
          <motion.div
            style={{ scale, borderRadius: radius, rotateX }}
            className="relative aspect-video w-full overflow-hidden bg-ink-3 ring-1 ring-fg/10 shadow-[0_60px_120px_-30px_rgba(200,255,60,0.35)]"
          >
            <AnimatePresence mode="wait">
              {playing ? (
                <motion.iframe
                  key="player"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                  title={`${title} | Draw & Paint: Sketchflow`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              ) : (
                <motion.button
                  key="poster"
                  exit={{ opacity: 0 }}
                  onClick={() => setPlaying(true)}
                  className="group absolute inset-0 w-full h-full cursor-pointer"
                  aria-label={`Play video: ${title}`}
                >
                  <motion.img src={poster} alt="" style={{ scale: posterScale }} className="absolute inset-0 w-full h-full object-cover" />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent group-hover:from-black/50 transition-colors duration-500" />
                  <span className="absolute inset-0 grid place-items-center">
                    <Magnetic strength={0.4}>
                      <span className="relative grid place-items-center w-20 h-20 md:w-32 md:h-32 rounded-full bg-fg text-ink shadow-2xl transition-transform duration-500 group-hover:scale-110">
                        <span className="absolute inset-0 rounded-full border-2 border-fg animate-ping opacity-30" />
                        <Play className="w-7 h-7 md:w-10 md:h-10 ml-1" fill="currentColor" />
                      </span>
                    </Magnetic>
                  </span>
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <Reveal className="mt-8 flex items-center gap-4">
          <img src={sketchflow.logo} alt="" className="w-12 h-12 md:w-14 md:h-14 rounded-2xl ring-1 ring-fg/20" />
          <div>
            <p className="font-display text-lg md:text-2xl font-bold">{title}</p>
            <p className="text-sm text-mute">Draw & Paint: Sketchflow · Official launch video</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
