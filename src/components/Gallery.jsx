import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { SectionLabel, SplitWords } from './ui';
import { useScrollLock } from '../lib/motion';
import { sketchflow } from '../data/apps';

const shots = sketchflow.screenshots;

function Lightbox({ index, onClose, onStep }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onStep(1);
      if (e.key === 'ArrowLeft') onStep(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, onStep]);

  return (
    <motion.div
      className="fixed inset-0 z-[65] bg-ink/95 backdrop-blur-xl flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Screenshot viewer"
    >
      <button onClick={onClose} className="absolute top-5 right-5 grid place-items-center w-12 h-12 rounded-full bg-fg/10 hover:bg-fg/20" aria-label="Close">
        <X size={22} />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onStep(-1); }}
        className="absolute left-3 md:left-8 grid place-items-center w-12 h-12 rounded-full bg-fg/10 hover:bg-fg/20"
        aria-label="Previous screenshot"
      >
        <ChevronLeft />
      </button>
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={shots[index]}
          alt={`Sketchflow screenshot ${index + 1}`}
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.92, rotate: 2 }}
          transition={{ type: 'spring', stiffness: 220, damping: 24 }}
          className="max-h-[86vh] max-w-[86vw] rounded-[28px] shadow-2xl"
        />
      </AnimatePresence>
      <button
        onClick={(e) => { e.stopPropagation(); onStep(1); }}
        className="absolute right-3 md:right-8 grid place-items-center w-12 h-12 rounded-full bg-fg/10 hover:bg-fg/20"
        aria-label="Next screenshot"
      >
        <ChevronRight />
      </button>
      <p className="absolute bottom-6 text-sm text-mute tabular-nums">{index + 1} / {shots.length}</p>
    </motion.div>
  );
}

export default function Gallery() {
  const ref = useRef(null);
  const trackRef = useRef(null);
  const [open, setOpen] = useState(null);
  const [distance, setDistance] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const x = useSpring(useTransform(scrollYProgress, [0.05, 0.95], [0, -distance]), { stiffness: 120, damping: 30 });

  useEffect(() => {
    const measure = () => {
      const el = trackRef.current;
      if (el) setDistance(Math.max(0, el.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  useScrollLock(open !== null);

  const step = (d) => setOpen((i) => (i + d + shots.length) % shots.length);

  const card = (src, i) => (
    <motion.button
      key={src}
      onClick={() => setOpen(i)}
      whileHover={{ y: -14, rotate: i % 2 ? 2 : -2 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className="shrink-0 snap-center cursor-zoom-in"
      aria-label={`Open screenshot ${i + 1}`}
    >
      <img
        src={src}
        alt={`Sketchflow screenshot ${i + 1}`}
        loading="lazy"
        className="w-[68vw] sm:w-[300px] lg:w-auto lg:h-[min(58vh,620px)] aspect-[9/16] object-cover rounded-[30px] ring-1 ring-fg/10 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)]"
      />
    </motion.button>
  );

  const heading = (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 w-full">
      <SectionLabel>Inside the app</SectionLabel>
      <h2 className="mt-6 font-display font-extrabold tracking-[-0.03em] leading-[0.95] text-[clamp(2.5rem,6vw,5rem)]">
        <SplitWords text="Every screen," className="block" />
        <SplitWords text="made to inspire." className="block" wordClassName="text-brand" delay={0.15} />
      </h2>
    </div>
  );

  return (
    <section aria-label="Sketchflow screenshots">
      {/* Desktop: vertical scroll drives a horizontal track */}
      <div ref={ref} className="hidden lg:block relative h-[300vh]">
        <div className="sticky top-0 h-screen flex flex-col justify-center gap-12 overflow-hidden">
          {heading}
          <motion.div ref={trackRef} style={{ x }} className="flex w-max gap-8 pl-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))] pr-10">
            {shots.map(card)}
          </motion.div>
        </div>
      </div>

      {/* Mobile / tablet: native swipe */}
      <div className="lg:hidden py-20">
        {heading}
        <div className="mt-10 flex gap-5 overflow-x-auto snap-x snap-mandatory no-scrollbar px-4 sm:px-6 pb-6">
          {shots.map(card)}
        </div>
      </div>

      <AnimatePresence>
        {open !== null && <Lightbox index={open} onClose={() => setOpen(null)} onStep={step} />}
      </AnimatePresence>
    </section>
  );
}
