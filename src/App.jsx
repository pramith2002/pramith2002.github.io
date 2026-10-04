import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig, useReducedMotion } from 'framer-motion';
import Lenis from 'lenis';
import Preloader from './components/Preloader';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Sketchflow from './components/Sketchflow';
import LaunchFilm from './components/LaunchFilm';
import Gallery from './components/Gallery';
import IOSTeaser from './components/IOSTeaser';
import Apps from './components/Apps';
import Games from './components/Games';
import Studio from './components/Studio';
import Contact from './components/Contact';

function useSmoothScroll(enabled) {
  useEffect(() => {
    if (!enabled) return;
    const lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4), anchors: { offset: -20 } });
    window.__lenis = lenis;
    let raf = requestAnimationFrame(function loop(time) {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    });
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      delete window.__lenis;
    };
  }, [enabled]);
}

export default function App() {
  const reduce = useReducedMotion();
  const [loading, setLoading] = useState(!reduce);
  const [ready, setReady] = useState(reduce);
  const reveal = useCallback(() => setReady(true), []);
  const done = useCallback(() => setLoading(false), []);

  useSmoothScroll(!reduce && !loading);

  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : '';
    if (loading) window.scrollTo(0, 0);
  }, [loading]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="grain" aria-hidden="true" />
      <AnimatePresence>{loading && <Preloader onReveal={reveal} onDone={done} />}</AnimatePresence>
      <Nav ready={ready} />
      <main>
        <Hero ready={ready} />
        <Marquee />
        <Sketchflow />
        <LaunchFilm />
        <Gallery />
        <IOSTeaser />
        <Apps />
        <Games />
        <Studio />
      </main>
      <Contact />
    </MotionConfig>
  );
}
