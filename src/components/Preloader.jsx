import { useEffect, useState } from 'react';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';

/*
 * Loader: the camera drifts through a sketchbook canvas while a pencil draws the
 * HORIZON wordmark, the second "O" fills in as the Horizon sun, then the camera
 * dives through that O. The O is a hole in the canvas, so the live site behind
 * the loader is what you fly into.
 */

/* Monoline letterforms (viewBox -20 -20 830 200). */
const LETTERS = [
  'M0 0 V140 M0 70 H90 M90 0 V140', // H
  'M180 0 A55 70 0 1 1 179.9 0 Z', // O
  'M270 140 V0 H320 A35 35 0 0 1 320 70 H270 M312 70 L362 140', // R
  'M405 0 V140', // I
  'M445 0 H535 L445 140 H535', // Z
  'M610 0 A55 70 0 1 1 609.9 0 Z', // O (portal)
  'M700 140 V0 L790 140 V0', // N
];
const PORTAL = { cx: 610, cy: 70, rx: 48, ry: 63 };
// Portal centre as a percentage of the SVG box: the zoom origin
const ORIGIN_X = ((PORTAL.cx + 20) / 830) * 100;
const ORIGIN_Y = ((PORTAL.cy + 20) / 200) * 100;

/* Doodles scattered through 3D space. z = distance from the camera in px. */
const DOODLES = [
  { d: 'M0 30 Q 20 0 40 30 T 80 30 T 120 30', x: 8, y: 14, z: 300, r: -12, c: 'var(--color-volt)', w: 120 },
  { d: 'M20 0 L25 15 L40 20 L25 25 L20 40 L15 25 L0 20 L15 15 Z', x: 84, y: 18, z: 650, r: 10, c: 'var(--color-cyan)', w: 46 },
  { d: 'M30 0 A30 30 0 1 1 29.9 0', x: 14, y: 72, z: 520, r: 0, c: 'var(--color-fg)', w: 62 },
  { d: 'M0 0 L60 0 L45 -12 M60 0 L45 12', x: 74, y: 78, z: 240, r: -25, c: 'var(--color-fg)', w: 70 },
  { d: 'M0 20 L15 0 L30 20 L45 0 L60 20 L75 0', x: 46, y: 8, z: 820, r: 6, c: 'var(--color-cyan)', w: 80 },
  { d: 'M25 25 m-5 0 a5 5 0 1 0 10 0 a10 10 0 1 0 -20 0 a15 15 0 1 0 30 0 a20 20 0 1 0 -40 0', x: 90, y: 50, z: 420, r: 0, c: 'var(--color-volt)', w: 56 },
  { d: 'M0 0 L40 40 M10 0 L50 40 M20 0 L60 40 M30 0 L70 40', x: 4, y: 44, z: 900, r: 0, c: 'var(--color-fg)', w: 72 },
  { d: 'M20 0 L25 15 L40 20 L25 25 L20 40 L15 25 L0 20 L15 15 Z', x: 28, y: 86, z: 760, r: -8, c: 'var(--color-volt)', w: 40 },
  { d: 'M0 15 C 20 -5, 40 35, 60 15 S 100 -5, 120 15', x: 62, y: 92, z: 980, r: 4, c: 'var(--color-cyan)', w: 120 },
  { d: 'M0 0 H50 V50 H0 Z M10 10 H40 V40 H10 Z', x: 56, y: 26, z: 1150, r: 18, c: 'var(--color-fg)', w: 50 },
  { d: 'M30 0 A30 30 0 1 1 29.9 0', x: 36, y: 64, z: 1250, r: 0, c: 'var(--color-cyan)', w: 44 },
  { d: 'M0 30 Q 20 0 40 30 T 80 30', x: 70, y: 36, z: 1350, r: 30, c: 'var(--color-volt)', w: 80 },
];

const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const DRIFT = [0.22, 1, 0.36, 1];
const RUSH = [0.7, 0, 0.84, 0];

function Doodle({ doodle, camZ, i }) {
  // Fade out just before the doodle passes the camera (perspective is 800px)
  const opacity = useTransform(camZ, [doodle.z + 350, doodle.z + 700], [1, 0]);
  return (
    <motion.svg
      viewBox="-6 -16 132 72"
      fill="none"
      className="absolute overflow-visible"
      style={{
        left: `${doodle.x}%`,
        top: `${doodle.y}%`,
        width: doodle.w,
        opacity,
        transform: `translate3d(-50%, -50%, ${-doodle.z}px) rotate(${doodle.r}deg)`,
      }}
    >
      <motion.path
        d={doodle.d}
        stroke={doodle.c}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.15 + i * 0.07, ease: 'easeInOut', opacity: { duration: 0.01, delay: 0.15 + i * 0.07 } }}
      />
    </motion.svg>
  );
}

export default function Preloader({ onReveal, onDone }) {
  const [pct, setPct] = useState(0);
  const camZ = useMotionValue(0);
  const zoom = useMotionValue(1);
  const panX = useMotionValue(0);
  const sun = useMotionValue(0);
  const hud = useMotionValue(1);
  const seal = useMotionValue(1);
  const x = useTransform(panX, (v) => `${v}%`);
  const worldZ = useTransform(camZ, (v) => `translateZ(${v}px)`);
  const sunScale = useTransform(sun, [0, 1], [0.3, 1]);
  const sunGlow = useTransform(sun, [0, 1], [0, 0.45]);

  useEffect(() => {
    let cancelled = false;
    const controls = [];
    const go = (...args) => controls.push(animate(...args));

    (async () => {
      // Act 1: drift through the canvas while everything is sketched in
      go(camZ, 480, { duration: 2.3, ease: DRIFT });
      go(zoom, 1.08, { duration: 2.3, ease: DRIFT });
      go(0, 100, { duration: 2.1, ease: [0.65, 0, 0.35, 1], onUpdate: (v) => setPct(Math.round(v)) });
      await wait(1350);
      if (cancelled) return;

      // Act 2: the portal O fills in as the sun
      go(sun, 1, { duration: 0.5, ease: [0.16, 1, 0.3, 1] });
      await wait(850);
      if (cancelled) return;

      // Act 3: dive through the sun into the site
      onReveal();
      go(hud, 0, { duration: 0.25 });
      go(sun, 0, { duration: 0.5, ease: 'easeIn' });
      go(seal, 0, { duration: 0.3 });
      go(panX, -(ORIGIN_X - 50), { duration: 1, ease: [0.76, 0, 0.24, 1] });
      go(zoom, 48, { duration: 1.15, ease: RUSH });
      go(camZ, 2600, { duration: 1.05, ease: RUSH });
      await wait(1100);
      if (!cancelled) onDone();
    })();

    return () => {
      cancelled = true;
      controls.forEach((c) => c.stop());
    };
  }, [camZ, zoom, panX, sun, hud, seal, onReveal, onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[70] overflow-hidden pointer-events-none"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      aria-hidden="true"
    >
      {/* The canvas: an ink sheet with a portal-shaped hole, zoomed from the portal's centre */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="relative w-[86vw] max-w-[880px] will-change-transform"
          style={{ scale: zoom, x, originX: `${ORIGIN_X}%`, originY: `${ORIGIN_Y}%` }}
        >
          <svg viewBox="-20 -20 830 200" className="w-full overflow-visible" fill="none">
            <defs>
              <mask id="portal" maskUnits="userSpaceOnUse" x="-20000" y="-20000" width="40000" height="40000">
                <rect x="-20000" y="-20000" width="40000" height="40000" fill="white" />
                <ellipse cx={PORTAL.cx} cy={PORTAL.cy} rx={PORTAL.rx} ry={PORTAL.ry} fill="black" />
              </mask>
              <pattern id="canvasDots" width="26" height="26" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.3" fill="var(--color-fg)" fillOpacity="0.13" />
              </pattern>
              <filter id="sunGlow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="18" />
              </filter>
              <radialGradient id="sunFill" cx="50%" cy="40%" r="70%">
                <stop offset="0" stopColor="#eaff9a" />
                <stop offset="0.6" stopColor="var(--color-volt)" />
                <stop offset="1" stopColor="var(--color-cyan)" />
              </radialGradient>
            </defs>

            <g mask="url(#portal)">
              <rect x="-20000" y="-20000" width="40000" height="40000" fill="var(--color-ink)" />
              <rect x="-20000" y="-20000" width="40000" height="40000" fill="url(#canvasDots)" />
            </g>

            {/* Seal over the portal so the site stays hidden until the dive */}
            <motion.ellipse cx={PORTAL.cx} cy={PORTAL.cy} rx={PORTAL.rx + 1} ry={PORTAL.ry + 1} fill="var(--color-ink)" style={{ opacity: seal }} />

            {/* Sun inside the portal, with a soft halo */}
            <motion.ellipse
              cx={PORTAL.cx}
              cy={PORTAL.cy}
              rx={PORTAL.rx + 26}
              ry={PORTAL.ry + 26}
              fill="var(--color-volt)"
              filter="url(#sunGlow)"
              style={{ opacity: sunGlow }}
            />
            <motion.ellipse
              cx={PORTAL.cx}
              cy={PORTAL.cy}
              rx={PORTAL.rx}
              ry={PORTAL.ry}
              fill="url(#sunFill)"
              style={{ opacity: sun, scale: sunScale, originX: '50%', originY: '50%' }}
            />

            {/* Pencil-drawn wordmark */}
            {LETTERS.map((d, i) => (
              <motion.path
                key={i}
                d={d}
                stroke="var(--color-fg)"
                strokeWidth={15}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  duration: 0.75,
                  delay: 0.1 + i * 0.11,
                  ease: [0.65, 0, 0.35, 1],
                  opacity: { duration: 0.01, delay: 0.1 + i * 0.11 },
                }}
              />
            ))}

            {/* Horizon line */}
            <motion.path
              d="M-10 172 H800"
              stroke="var(--color-volt)"
              strokeWidth={6}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.1, delay: 0.9, ease: [0.65, 0, 0.35, 1], opacity: { duration: 0.01, delay: 0.9 } }}
            />
          </svg>
        </motion.div>
      </div>

      {/* Doodles in 3D space that the camera flies through */}
      <div className="absolute inset-0" style={{ perspective: 800 }}>
        <motion.div className="absolute inset-0" style={{ transformStyle: 'preserve-3d', transform: worldZ }}>
          {DOODLES.map((d, i) => (
            <Doodle key={i} doodle={d} camZ={camZ} i={i} />
          ))}
        </motion.div>
      </div>

      {/* HUD */}
      <motion.div
        style={{ opacity: hud }}
        className="absolute bottom-8 left-5 right-5 md:left-10 md:right-10 flex items-end justify-between"
      >
        <span className="font-hand text-xl md:text-2xl text-mute">sketching your canvas…</span>
        <span className="font-display text-5xl md:text-7xl font-bold tabular-nums text-fg">
          {pct}
          <span className="text-accent text-2xl md:text-3xl align-top">%</span>
        </span>
      </motion.div>
      <motion.div
        style={{ opacity: hud, width: `${pct}%` }}
        className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-volt to-cyan"
      />
    </motion.div>
  );
}
