import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig, useReducedMotion } from 'framer-motion';
import Lenis from 'lenis';
import Preloader from './components/Preloader';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Home from './components/Home';
import LaunchFilm from './components/LaunchFilm';
import GameTrailer from './components/GameTrailer';
import IOSTeaser from './components/IOSTeaser';
import Studio from './components/Studio';
import Contact from './components/Contact';
import ProductPage from './components/ProductPage';
import WishlistPage from './components/WishlistPage';
import { products } from './data/products';

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
  const filename = window.location.pathname.split('/').pop();
  const product = products.find((item) => filename === `${item.id}.html`);
  const isWishlist = filename === 'wishlist.html';
  const isSubpage = Boolean(product) || isWishlist;
  const reduce = useReducedMotion();
  const [loading, setLoading] = useState(!reduce && !isSubpage);
  const [ready, setReady] = useState(Boolean(reduce || isSubpage));
  const reveal = useCallback(() => setReady(true), []);
  const done = useCallback(() => setLoading(false), []);

  useSmoothScroll(!reduce && !loading);

  useEffect(() => {
    if (!loading) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);
    return () => { document.body.style.overflow = previousOverflow; };
  }, [loading]);

  useEffect(() => {
    if (loading || !window.location.hash) return;
    const target = document.getElementById(window.location.hash.slice(1));
    if (!target) return;
    const frame = requestAnimationFrame(() => {
      if (window.__lenis) window.__lenis.scrollTo(target, { immediate: true, offset: -20 });
      else target.scrollIntoView();
    });
    return () => cancelAnimationFrame(frame);
  }, [loading]);

  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip-link">Skip to content</a>
      <div className="grain" aria-hidden="true" />
      <AnimatePresence>{loading && <Preloader onReveal={reveal} onDone={done} />}</AnimatePresence>
      <Nav ready={ready} product={product} />
      <main id="main" tabIndex={-1}>
        {isWishlist ? <WishlistPage /> : product ? <ProductPage product={product} /> : (
          <>
            <Hero ready={ready} />
            <Marquee />
            <Home />
            <LaunchFilm />
            <GameTrailer />
            <IOSTeaser />
            <Studio />
          </>
        )}
      </main>
      <Contact />
    </MotionConfig>
  );
}
