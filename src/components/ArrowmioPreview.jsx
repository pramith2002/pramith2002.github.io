import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Heart, RotateCcw, Sparkles } from 'lucide-react';
import levels from '../data/arrowmioLevels.json';
import { arrowmio } from '../data/apps';

const BOARD_WIDTH = 400;
const BOARD_HEIGHT = 470;

// The mobile game's LevelCodec stores each arrow from head to tail. Its BoardGrid
// checks the cells straight ahead of the head, up to the edge of the level.
function facing(path) {
  return [path[0][0] - path[1][0], path[0][1] - path[1][1]];
}

function canEscape(level, remaining, index) {
  const path = level.paths[index];
  const occupied = new Set(remaining.flatMap((id) => level.paths[id].map(([x, y]) => `${x},${y}`)));
  const [dx, dy] = facing(path);
  let x = path[0][0] + dx;
  let y = path[0][1] + dy;
  while (x >= 0 && x < level.width && y >= 0 && y < level.height) {
    if (occupied.has(`${x},${y}`)) return false;
    x += dx;
    y += dy;
  }
  return true;
}

function geometry(level) {
  const cell = Math.min(72, 290 / Math.max(1, level.width - 1), 330 / Math.max(1, level.height - 1));
  return {
    cell,
    x: (BOARD_WIDTH - (level.width - 1) * cell) / 2,
    y: (BOARD_HEIGHT - (level.height - 1) * cell) / 2,
  };
}

function ArrowPath({ path, index, layout, blocked, onTap }) {
  const [dx, dy] = facing(path);
  const point = ([x, y]) => [layout.x + x * layout.cell, layout.y + y * layout.cell];
  const [headX, headY] = point(path[0]);
  const d = [...path].reverse().map((cell, i) => `${i ? 'L' : 'M'} ${point(cell).join(' ')}`).join(' ');
  const angle = Math.atan2(dy, dx) * 180 / Math.PI;
  const color = blocked ? '#EF4E5B' : '#151936';

  return (
    <motion.g
      key={index}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ x: dx * 520, y: dy * 620, opacity: 0, transition: { duration: 0.42, ease: 'easeIn' } }}
      transition={{ duration: 0.25, delay: index * 0.04 }}
      onClick={onTap}
      onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onTap(); } }}
      tabIndex={0}
      role="button"
      aria-label={`Arrow ${index + 1}, pointing ${dx === 1 ? 'right' : dx === -1 ? 'left' : dy === 1 ? 'down' : 'up'}`}
      className="cursor-pointer focus:outline-none"
    >
      <path d={d} fill="none" stroke={color} strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none" />
      <polygon points="-8,-16 22,0 -8,16" fill={color} transform={`translate(${headX} ${headY}) rotate(${angle})`} className="pointer-events-none" />
      <path d={d} fill="none" stroke="transparent" strokeWidth="44" strokeLinecap="round" strokeLinejoin="round" />
    </motion.g>
  );
}

export default function ArrowmioPreview() {
  const [levelIndex, setLevelIndex] = useState(0);
  const level = levels[levelIndex];
  const [remaining, setRemaining] = useState(() => level.paths.map((_, i) => i));
  const [lives, setLives] = useState(3);
  const [phase, setPhase] = useState('playing');
  const [blocked, setBlocked] = useState(null);
  const [boardKey, setBoardKey] = useState(0);
  const remainingRef = useRef(remaining);
  const lockedRef = useRef(false);
  const timers = useRef([]);
  const layout = geometry(level);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const later = (callback, delay) => {
    timers.current.push(setTimeout(callback, delay));
  };

  const load = (index) => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    const next = levels[index].paths.map((_, i) => i);
    remainingRef.current = next;
    lockedRef.current = false;
    setRemaining(next);
    setLevelIndex(index);
    setLives(3);
    setBlocked(null);
    setPhase('playing');
    setBoardKey((key) => key + 1);
  };

  const launch = (index) => {
    const next = remainingRef.current.filter((id) => id !== index);
    remainingRef.current = next;
    setRemaining(next);
    if (next.length === 1) {
      // Arrow's mobile game sends the final unblocked arrow out automatically.
      lockedRef.current = true;
      later(() => {
        remainingRef.current = [];
        setRemaining([]);
        later(() => setPhase('won'), 420);
      }, 420);
    } else if (next.length === 0) {
      lockedRef.current = true;
      later(() => setPhase('won'), 420);
    }
  };

  const tap = (index) => {
    if (phase !== 'playing' || lockedRef.current || !remainingRef.current.includes(index)) return;
    if (canEscape(level, remainingRef.current, index)) {
      launch(index);
      return;
    }
    lockedRef.current = true;
    setBlocked(index);
    const nextLives = lives - 1;
    setLives(nextLives);
    later(() => {
      setBlocked(null);
      if (nextLives === 0) setPhase('lost');
      else lockedRef.current = false;
    }, 380);
  };

  return (
    <div className="relative w-full max-w-[400px] mx-auto">
      <div className="absolute -inset-8 rounded-full bg-gradient-to-br from-violet-500/20 to-blue-400/20 blur-3xl" />
      <div className="relative overflow-hidden rounded-[32px] border border-[#DDE1EF] bg-[#F4F5FA] text-[#151936] p-4 sm:p-5 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]">
        <div className="flex items-start justify-between gap-4 px-1">
          <div>
            <span className="inline-block rounded-full bg-[#DEE8FA] px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-[#3D73B9]">{level.difficulty}</span>
            <p className="mt-1 font-display text-2xl font-extrabold">Level {level.number}</p>
            <div className="mt-1 flex gap-1.5" aria-label={`${lives} lives left`}>
              {[0, 1, 2].map((i) => <Heart key={i} size={17} fill={i < lives ? '#FF5F83' : 'none'} stroke={i < lives ? '#FF5F83' : '#B8BECE'} strokeWidth={2.5} aria-hidden="true" />)}
            </div>
          </div>
          <button type="button" onClick={() => load(levelIndex)} className="grid place-items-center w-11 h-11 rounded-full bg-white text-[#151936] shadow-[0_4px_12px_rgba(21,25,54,0.1)] hover:bg-[#EAE9FF] transition-colors" aria-label="Restart level">
            <RotateCcw size={19} />
          </button>
        </div>

        <div className="relative mt-2 overflow-hidden rounded-2xl" aria-label={`Playable Arrowmio level ${level.number}`}>
          <svg viewBox={`0 0 ${BOARD_WIDTH} ${BOARD_HEIGHT}`} className="block w-full h-auto" aria-label={`Level ${level.number} puzzle board`}>
            {Array.from({ length: level.width * level.height }, (_, i) => (
              <circle key={i} cx={layout.x + (i % level.width) * layout.cell} cy={layout.y + Math.floor(i / level.width) * layout.cell} r="2" fill="#D3D7E4" />
            ))}
            <AnimatePresence>
              {remaining.map((index) => <ArrowPath key={`${boardKey}-${index}`} path={level.paths[index]} index={index} layout={layout} blocked={blocked === index} onTap={() => tap(index)} />)}
            </AnimatePresence>
          </svg>

          <AnimatePresence>
            {phase !== 'playing' && (
              <motion.div className="absolute inset-0 flex flex-col items-center justify-center bg-[#F4F5FA]/95 text-center p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="grid place-items-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#6C5CFF] to-[#3D8BFF] text-white">
                  {phase === 'won' ? <Sparkles size={27} /> : <Heart size={27} />}
                </div>
                <h3 className="mt-4 font-display text-3xl font-extrabold">{phase === 'won' ? (levelIndex === levels.length - 1 ? 'Nice work!' : 'Nicely done!') : 'Out of lives'}</h3>
                <p className="mt-1 text-sm text-[#6B7090]">{phase === 'won' ? (levelIndex === levels.length - 1 ? 'You cleared all five real levels.' : `Level ${level.number} complete`) : 'Give this level another try.'}</p>
                {phase === 'won' && levelIndex === levels.length - 1 ? (
                  <>
                    <a href={arrowmio.playStore} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#151936] px-5 py-3 text-sm font-bold text-white hover:bg-[#353B6A] transition-colors">Get the full game <ArrowRight size={16} /></a>
                    <button type="button" onClick={() => load(0)} className="mt-4 text-sm font-bold text-[#6C5CFF] hover:underline">Play again</button>
                  </>
                ) : (
                  <button type="button" onClick={() => load(phase === 'won' ? levelIndex + 1 : levelIndex)} className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#151936] px-6 py-3 text-sm font-bold text-white hover:bg-[#353B6A] transition-colors">
                    {phase === 'won' ? 'Next level' : 'Replay level'} <ArrowRight size={16} />
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="mx-auto w-fit rounded-full bg-[#151936] px-4 py-2 text-center text-xs sm:text-sm font-bold text-white">Tap an arrow with a clear way out</p>
      </div>
      <p className="mt-4 text-center text-sm text-mute">Play the first five levels from the real game.</p>
    </div>
  );
}
