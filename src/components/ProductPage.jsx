import { lazy, Suspense, useRef } from 'react';
import { ArrowLeft, ArrowUpRight, ChevronLeft, ChevronRight, Play, Shield } from 'lucide-react';
import { Icon, Reveal, SectionLabel } from './ui';
import StoreLinks from './StoreLinks';
import LaunchFilm from './LaunchFilm';
import GameTrailer from './GameTrailer';
import IOSTeaser from './IOSTeaser';
import { products, productUrl } from '../data/products';
import { trackSpotlight } from '../lib/motion';

const Sketchflow = lazy(() => import('./Sketchflow'));
const Gallery = lazy(() => import('./Gallery'));
const Games = lazy(() => import('./Games'));

function Screenshots({ product }) {
  const strip = useRef(null);
  const move = (direction) => strip.current?.scrollBy({
    left: direction * strip.current.clientWidth * 0.75,
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
  });

  return (
    <section className="product-section" aria-labelledby="screenshots-title">
      <div className="section-heading">
        <div><SectionLabel>A closer look</SectionLabel><h2 id="screenshots-title">See it in action</h2></div>
        <div className="screenshot-controls">
          <button className="icon-button" onClick={() => move(-1)} aria-label="Previous screenshots" aria-controls="screenshot-strip"><ChevronLeft size={20} /></button>
          <button className="icon-button" onClick={() => move(1)} aria-label="Next screenshots" aria-controls="screenshot-strip"><ChevronRight size={20} /></button>
        </div>
      </div>
      <div ref={strip} id="screenshot-strip" className="screenshot-strip" tabIndex={0} role="region" aria-label={`${product.shortName} screenshots; scroll for more`}>
        {product.screenshots.map((src, i) => <img key={src} src={src} alt={`${product.shortName} app screenshot ${i + 1} of ${product.screenshots.length}`} loading="lazy" className="product-screenshot" />)}
      </div>
    </section>
  );
}

function AppDetails({ product }) {
  return (
    <div className="site-shell">
      <section className="product-section" aria-labelledby="features-title">
        <div className="product-about">
          <div><SectionLabel>Major features</SectionLabel><h2 id="features-title">Your ideas. More possibilities.</h2></div>
          <div>{product.description.split('\n\n').map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
        </div>
        <div className="feature-grid">
          {product.features.map((feature, i) => (
            <Reveal key={feature.title} delay={i * 0.06} className="feature-item spotlight" onMouseMove={trackSpotlight}>
              <span className="feature-icon"><Icon name={feature.icon} size={21} /></span>
              <h3>{feature.title}</h3><p>{feature.desc}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <Screenshots product={product} />
    </div>
  );
}

export default function ProductPage({ product }) {
  const trailerAnchor = product.id === 'sketchflow' ? '#film' : product.id === 'arrowmio' ? '#arrowmio-trailer' : null;

  return (
    <>
      <div id="top" className="site-shell product-page !pt-32">
        <a href="./#apps" className="text-link back-link"><ArrowLeft size={16} /> All apps & games</a>
        <section className="product-hero" aria-labelledby="product-title">
          <div className="product-intro">
            <div className="product-heading">
              <img src={product.logo} alt="" width="100" height="100" />
              <div><SectionLabel>{product.genre}</SectionLabel><h1 id="product-title">{product.shortName}</h1></div>
            </div>
            <p className="product-tagline">{product.tagline}</p>
            <p className="product-summary">{product.summary}</p>
            {product.downloads && <p className="product-downloads">{product.downloads} downloads on Google Play</p>}
            <StoreLinks product={product} />
            {product.availabilityNote && <p className="availability-note">{product.availabilityNote}</p>}
            <div className="product-utility-links">
              {trailerAnchor && <a href={trailerAnchor}><Play size={15} /> Watch trailer</a>}
              <a href={product.privacyUrl}><Shield size={15} /> Privacy policy</a>
              <a href="./contact.html">App support <ArrowUpRight size={15} /></a>
            </div>
          </div>
          <div className="product-cover"><div className="product-cover-glow" /><img src={product.screenshots[0]} alt={`${product.shortName} preview`} fetchPriority="high" /><span className="cover-caption">{product.name}</span></div>
        </section>
      </div>
      <Suspense fallback={<p role="status" className="site-shell py-12">Loading app details…</p>}>
        {product.id === 'sketchflow' ? (
          <><Sketchflow /><LaunchFilm /><Gallery /><IOSTeaser /></>
        ) : product.id === 'arrowmio' ? (
          <><GameTrailer /><Games /></>
        ) : <AppDetails product={product} />}
      </Suspense>
      <aside className="product-next site-shell">
        <h2>More from Horizon Builds</h2>
        <div>{products.filter((item) => item.id !== product.id).map((item) => (
          <a href={productUrl(item)} key={item.id}><img src={item.logo} alt="" width="42" height="42" /><span>{item.shortName}</span><ArrowUpRight size={16} /></a>
        ))}</div>
      </aside>
    </>
  );
}
