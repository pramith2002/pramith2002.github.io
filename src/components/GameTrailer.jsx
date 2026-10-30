import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Play } from 'lucide-react';
import { Magnetic, Reveal, SectionLabel, SplitWords, YouTubeIcon } from './ui';
import { arrowmio } from '../data/apps';

export default function GameTrailer() {
  const [playing, setPlaying] = useState(false);

  return (
    <section id="arrowmio-trailer" className="relative py-20 md:py-28 overflow-hidden scroll-mt-24" aria-labelledby="arrowmio-trailer-title">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        <div>
          <SectionLabel>Arrowmio trailer</SectionLabel>
          <h2 id="arrowmio-trailer-title" className="mt-6 font-display font-extrabold tracking-tight leading-[0.95] text-[clamp(2.5rem,6vw,5rem)]">
            <SplitWords text="One clear path." className="block" />
            <SplitWords text="One more puzzle." className="block" wordClassName="text-brand" delay={0.15} />
          </h2>
          <Reveal delay={0.2}>
            <p className="mt-6 text-lg text-mute leading-relaxed">A little strategy. A satisfying escape. Watch Arrowmio in action, then try the first five levels on its game page.</p>
            <div className="mt-8 flex flex-wrap gap-5 items-center">
              <a href="./arrowmio.html" className="inline-flex items-center gap-2 rounded-full bg-fg text-ink px-6 py-3.5 font-bold hover:bg-volt hover:text-on-accent transition-colors">Explore Arrowmio <ArrowUpRight size={17} /></a>
              <a href={arrowmio.trailer} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-mute hover:text-fg"><YouTubeIcon className="w-5 h-5" /> Watch on YouTube <ArrowUpRight size={15} /></a>
            </div>
          </Reveal>
        </div>
        <Reveal y={55} className="relative mx-auto w-[min(72vw,300px)]">
          <div className="absolute -inset-10 rounded-full bg-gradient-to-br from-volt/15 to-cyan/20 blur-3xl pointer-events-none" />
          <div className="relative aspect-[9/16] rounded-[30px] overflow-hidden border border-line bg-ink-3 shadow-[0_35px_80px_-20px_rgba(45,226,255,0.25)]">
            <AnimatePresence mode="wait">
              {playing ? (
                <motion.iframe key="player" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 w-full h-full" src="https://www.youtube-nocookie.com/embed/vGXsowecVNY?autoplay=1&rel=0&playsinline=1" title="Arrowmio official gameplay trailer" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
              ) : (
                <motion.button key="poster" exit={{ opacity: 0 }} onClick={() => setPlaying(true)} className="absolute inset-0 w-full h-full cursor-pointer group" aria-label="Play Arrowmio trailer">
                  <img src={arrowmio.screenshots[0]} alt="" loading="lazy" className="w-full h-full object-cover" />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-black/10" />
                  <span className="absolute inset-0 grid place-items-center"><Magnetic strength={0.35}><span className="relative grid place-items-center w-20 h-20 rounded-full bg-fg text-ink shadow-xl group-hover:scale-110 transition-transform"><span className="absolute inset-0 rounded-full border-2 border-fg animate-ping opacity-30" /><Play size={29} fill="currentColor" className="ml-1" /></span></Magnetic></span>
                  <span className="absolute bottom-7 inset-x-0 text-center text-white text-sm font-bold">Arrowmio · Official trailer</span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
