import { useCallback, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useAnimate } from 'framer-motion';
import { RotateCcw, Shield, Sparkles } from 'lucide-react';
import { GooglePlayIcon, Reveal, SectionLabel, SplitWords } from './ui';
import { EASE, trackSpotlight } from '../lib/motion';
import { arrowmio } from '../data/apps';

/* ---------- Puzzle logic ---------- */

const SIZE = 5;
const DIRS = {
  up: { dr: -1, dc: 0, deg: -90 },
  right: { dr: 0, dc: 1, deg: 0 },
  down: { dr: 1, dc: 0, deg: 90 },
  left: { dr: 0, dc: -1, deg: 180 },
};
const DIR_KEYS = Object.keys(DIRS);

function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const shuffle = (list, rand) => {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

function pathClear(arrows, r, c, dir) {
  const { dr, dc } = DIRS[dir];
  for (let y = r + dr, x = c + dc; y >= 0 && y < SIZE && x >= 0 && x < SIZE; y += dr, x += dc) {
    if (arrows.some((a) => a.r === y && a.c === x)) return false;
  }
  return true;
}

/**
 * Builds a board that is always solvable: each arrow is placed so that its path
 * is clear of every arrow placed before it, so clearing them in reverse
 * placement order always works.
 */
function makeLevel(seed) {
  const rand = rng(seed * 9973 + 7);
  const cells = shuffle(
    Array.from({ length: SIZE * SIZE }, (_, i) => [Math.floor(i / SIZE), i % SIZE]),
    rand,
  );
  const arrows = [];
  for (const [r, c] of cells) {
    if (arrows.length >= 17) break;
    const dir = shuffle(DIR_KEYS, rand).find((d) => pathClear(arrows, r, c, d));
    if (dir) arrows.push({ id: `${seed}-${r}-${c}`, r, c, dir });
  }
  return arrows;
}

/* ---------- Board ---------- */

function ArrowTile({ arrow, onTap }) {
  const [scope, animate] = useAnimate();
  const [blocked, setBlocked] = useState(false);
  const { dr, dc, deg } = DIRS[arrow.dir];

  const tap = () => {
    if (onTap(arrow)) return;
    setBlocked(true);
    animate(scope.current, { x: [0, dc * 7, 0], y: [0, dr * 7, 0] }, { duration: 0.28 });
    setTimeout(() => setBlocked(false), 380);
  };

  return (
    <motion.button
      ref={scope}
      onClick={tap}
      aria-label={`Arrow pointing ${arrow.dir}`}
      className="absolute p-1"
      style={{ left: `${(arrow.c / SIZE) * 100}%`, top: `${(arrow.r / SIZE) * 100}%`, width: `${100 / SIZE}%`, height: `${100 / SIZE}%` }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ x: `${dc * 600}%`, y: `${dr * 600}%`, opacity: 0, transition: { duration: 0.45, ease: [0.5, 0, 0.75, 0] } }}
      transition={{ type: 'spring', stiffness: 380, damping: 22, delay: (arrow.r + arrow.c) * 0.03 }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.92 }}
    >
      <span
        className={`grid place-items-center w-full h-full rounded-xl border transition-colors duration-200 ${
          blocked ? 'border-rose-400/70 bg-rose-500/15' : 'border-fg/10 bg-fg/[0.05] hover:border-accent/50'
        }`}
      >
        <svg viewBox="0 0 24 24" className="w-1/2 h-1/2" style={{ transform: `rotate(${deg}deg)` }} aria-hidden="true">
          <path
            d="M4 12 H19 M13 6 L19 12 L13 18"
            fill="none"
            stroke={blocked ? '#fb7185' : 'var(--color-accent)'}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </motion.button>
  );
}

function PuzzleDemo() {
  const [level, setLevel] = useState(1);
  const initial = useMemo(() => makeLevel(level), [level]);
  const [arrows, setArrows] = useState(initial);
  const [taps, setTaps] = useState(0);
  const [boardKey, setBoardKey] = useState(0);
  // Source of truth for tap checks, so rapid taps never see a stale board
  const board = useRef(initial);

  const load = (next) => {
    board.current = makeLevel(next);
    setLevel(next);
    setArrows(board.current);
    setTaps(0);
    setBoardKey((k) => k + 1);
  };

  const onTap = useCallback((arrow) => {
    setTaps((t) => t + 1);
    const cleared = pathClear(board.current, arrow.r, arrow.c, arrow.dir);
    if (cleared) {
      board.current = board.current.filter((a) => a.id !== arrow.id);
      setArrows(board.current);
    }
    return cleared;
  }, []);

  const done = arrows.length === 0;
  const total = initial.length;

  return (
    <div className="relative w-full max-w-[400px] mx-auto">
      <div className="absolute -inset-10 rounded-full bg-gradient-to-br from-volt/20 to-cyan/20 blur-3xl" />
      <div className="relative rounded-[32px] border border-line bg-ink-2 p-4 sm:p-5 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]">
        {/* HUD */}
        <div className="flex items-center justify-between px-1 pb-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-mute">Level {level}</p>
            <p className="font-display text-lg font-bold">
              {total - arrows.length}
              <span className="text-mute">/{total} cleared</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-mute tabular-nums">{taps} taps</span>
            <button
              onClick={() => load(level)}
              className="grid place-items-center w-9 h-9 rounded-full bg-fg/[0.06] hover:bg-fg/10 transition-colors"
              aria-label="Restart puzzle"
            >
              <RotateCcw size={16} />
            </button>
          </div>
        </div>

        {/* Progress */}
        <div className="h-1 rounded-full bg-fg/10 overflow-hidden mb-4">
          <motion.div
            className="h-full bg-gradient-to-r from-volt to-cyan"
            animate={{ width: `${((total - arrows.length) / total) * 100}%` }}
            transition={{ ease: EASE, duration: 0.5 }}
          />
        </div>

        {/* Board */}
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-[radial-gradient(color-mix(in_srgb,var(--color-fg)_9%,transparent)_1px,transparent_1px)] [background-size:20%_20%] [background-position:10%_10%]">
          <AnimatePresence>
            {arrows.map((a) => (
              <ArrowTile key={`${boardKey}-${a.id}`} arrow={a} onTap={onTap} />
            ))}
          </AnimatePresence>

          <AnimatePresence>
            {done && (
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center text-center p-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.35, ease: EASE, duration: 0.6 }}
              >
                <motion.span
                  className="grid place-items-center w-14 h-14 rounded-2xl bg-gradient-to-br from-volt to-cyan text-on-accent"
                  initial={{ rotate: -30, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: 'spring', delay: 0.5, stiffness: 260, damping: 14 }}
                >
                  <Sparkles size={26} />
                </motion.span>
                <p className="mt-4 font-display text-3xl font-extrabold">Board cleared!</p>
                <p className="mt-1 text-sm text-mute">
                  {total} arrows in {taps} taps{taps === total ? ': perfect run' : ''}
                </p>
                <button
                  onClick={() => load(level + 1)}
                  className="mt-5 rounded-full bg-fg text-ink px-5 py-2.5 text-sm font-bold hover:bg-volt hover:text-on-accent transition-colors"
                >
                  Next puzzle →
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="mt-4 text-center font-hand text-xl text-mute">tap an arrow with a clear path ↑</p>
      </div>
    </div>
  );
}

/* ---------- Section ---------- */

function ArrowmioMark({ className = 'w-16 h-16' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="amGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c8ff3c" />
          <stop offset="1" stopColor="#2de2ff" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="18" fill="url(#amGrad)" />
      <path d="M16 40 L30 26 M24 25 H31 V32" stroke="#0b0c0d" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M34 46 H48 M42 40 L48 46 L42 52" stroke="#0b0c0d" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.55" />
      <path d="M40 14 V26 M34 20 L40 14 L46 20" stroke="#0b0c0d" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.8" />
    </svg>
  );
}

/* Big outlined arrows drifting in the background */
const DRIFT = [
  { x: '6%', y: '12%', deg: -90, s: 120, d: 0 },
  { x: '88%', y: '20%', deg: 180, s: 90, d: 2 },
  { x: '80%', y: '82%', deg: 0, s: 140, d: 1 },
  { x: '14%', y: '78%', deg: 90, s: 80, d: 3 },
];

export default function Games() {
  return (
    <section id="games" className="relative py-24 md:py-36 overflow-x-clip">
      {DRIFT.map((a, i) => (
        <motion.svg
          key={i}
          viewBox="0 0 24 24"
          className="absolute pointer-events-none text-fg/[0.05] hidden md:block"
          style={{ left: a.x, top: a.y, width: a.s, height: a.s, rotate: a.deg }}
          animate={{ y: [0, -18, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: a.d }}
          aria-hidden="true"
        >
          <path d="M4 12 H19 M13 6 L19 12 L13 18" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      ))}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="flex flex-wrap items-center gap-3">
          <SectionLabel>Upcoming game</SectionLabel>
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-volt/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-accent">
            <span className="relative flex w-2 h-2">
              <span className="absolute inset-0 rounded-full bg-volt animate-ping" />
              <span className="relative w-2 h-2 rounded-full bg-volt" />
            </span>
            Coming soon
          </span>
        </div>

        <div className="mt-10 grid lg:grid-cols-2 gap-14 lg:gap-10 items-center">
          <div>
            <motion.div
              initial={{ scale: 0, rotate: -25 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 170, damping: 13 }}
              className="w-fit rounded-[20px] shadow-[0_15px_40px_-12px_rgba(200,255,60,0.55)]"
            >
              <ArrowmioMark className="w-16 h-16 md:w-20 md:h-20" />
            </motion.div>

            <h2 className="mt-8 font-display font-extrabold tracking-[-0.035em] leading-[0.92] text-[clamp(3rem,7.5vw,6.5rem)]">
              <SplitWords text="Arrowmio" wordClassName="text-brand" className="block" />
            </h2>
            <Reveal delay={0.1}>
              <p className="mt-3 font-display text-xl md:text-2xl font-bold text-mute">Tap Puzzle Game</p>
              <p className="mt-6 text-lg md:text-xl text-mute leading-relaxed max-w-xl">{arrowmio.description}</p>
            </Reveal>

            <div className="mt-10 grid sm:grid-cols-3 gap-3">
              {arrowmio.points.map((p, i) => (
                <Reveal
                  key={p.title}
                  delay={0.1 + i * 0.08}
                  onMouseMove={trackSpotlight}
                  className="spotlight glass rounded-2xl p-5 overflow-hidden"
                >
                  <span className="font-display text-sm font-extrabold text-accent">0{i + 1}</span>
                  <h3 className="mt-2 font-bold">{p.title}</h3>
                  <p className="mt-1 text-sm text-mute leading-relaxed">{p.desc}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.3} className="mt-10 flex flex-wrap items-center gap-4">
              <span className="inline-flex items-center gap-3 rounded-full border border-dashed border-fg/25 pl-4 pr-6 py-3.5 font-bold text-mute cursor-default">
                <GooglePlayIcon className="w-5 h-5 opacity-70" />
                Coming soon to Google Play
              </span>
              <a
                href={arrowmio.privacyUrl}
                className="inline-flex items-center gap-2 text-sm font-semibold text-mute hover:text-accent transition-colors"
              >
                <Shield size={16} /> Privacy policy
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <p className="mb-6 text-center font-hand text-2xl text-accent -rotate-2">go on, give it a try ↓</p>
            <PuzzleDemo />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
