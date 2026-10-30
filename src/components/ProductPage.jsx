import { lazy, Suspense, useRef } from 'react';
import { ArrowLeft, ArrowUpRight, ChevronLeft, ChevronRight, Play, Shield } from 'lucide-react';
import { Icon, SectionLabel } from './ui';
import StoreLinks from './StoreLinks';
import { products, productUrl } from '../data/products';

const ArrowmioPreview = lazy(() => import('./ArrowmioPreview'));

function Screenshots({ product }) {
  const strip = useRef(null);
  const move = (direction) => strip.current?.scrollBy({ left: direction * strip.current.clientWidth * 0.75, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  return (
    <section className="product-section" aria-labelledby="screenshots-title">
      <div className="section-heading"><div><SectionLabel>A closer look</SectionLabel><h2 id="screenshots-title">See it in action</h2></div>
        <div className="screenshot-controls"><button className="icon-button" onClick={() => move(-1)} aria-label="Previous screenshots" aria-controls="screenshot-strip"><ChevronLeft size={20} /></button><button className="icon-button" onClick={() => move(1)} aria-label="Next screenshots" aria-controls="screenshot-strip"><ChevronRight size={20} /></button></div>
      </div>
      <div ref={strip} id="screenshot-strip" className="screenshot-strip" tabIndex={0} role="region" aria-label={`${product.shortName} screenshots; scroll for more`}>
        {product.screenshots.map((src, i) => <img key={src} src={src} alt={`${product.shortName} app screenshot ${i + 1} of ${product.screenshots.length}`} loading="lazy" className="product-screenshot" />)}
      </div>
    </section>
  );
}

export default function ProductPage({ product }) {
  return (
    <div className="site-shell product-page">
      <a href="./#apps" className="text-link back-link"><ArrowLeft size={16} /> All apps & games</a>
      <section className="product-hero" aria-labelledby="product-title">
        <div className="product-intro">
          <div className="product-heading"><img src={product.logo} alt="" width="100" height="100" /><div><SectionLabel>{product.genre}</SectionLabel><h1 id="product-title">{product.shortName}</h1></div></div>
          <p className="product-tagline">{product.tagline}</p>
          <p className="product-summary">{product.summary}</p>
          {product.downloads && <p className="product-downloads">{product.downloads} downloads on Google Play</p>}
          <StoreLinks product={product} />
          {product.availabilityNote && <p className="availability-note">{product.availabilityNote}</p>}
          <div className="product-utility-links"><a href={product.privacyUrl}><Shield size={15} /> Privacy policy</a><a href="./contact.html">App support <ArrowUpRight size={15} /></a></div>
        </div>
        <div className="product-cover"><div className="product-cover-glow" /><img src={product.screenshots[0]} alt={`${product.shortName} preview`} fetchPriority="high" /><span className="cover-caption">{product.name}</span></div>
      </section>
      <section className="product-section" aria-labelledby="features-title">
        <div className="product-about"><div><SectionLabel>Built for you</SectionLabel><h2 id="features-title">{product.category === 'Game' ? 'Simple to start. So much to play.' : 'Your ideas. More possibilities.'}</h2></div><div>{product.description.split('\n\n').map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></div>
        <div className="feature-grid">{product.features.map((feature) => <article key={feature.title} className="feature-item"><span className="feature-icon"><Icon name={feature.icon} size={21} /></span><h3>{feature.title}</h3><p>{feature.desc}</p></article>)}</div>
      </section>
      <Screenshots product={product} />
      {product.id === 'arrowmio' && <section className="game-demo product-section" aria-labelledby="demo-title"><div><SectionLabel>Try it here</SectionLabel><h2 id="demo-title">Find your way out.</h2><p>Get a feel for Arrowmio with the first five levels. Tap an arrow when its path is clear.</p><a href={product.trailer} target="_blank" rel="noopener noreferrer" className="text-link"><Play size={16} /> Watch the trailer <ArrowUpRight size={15} /></a></div><Suspense fallback={<p role="status">Loading game preview…</p>}><ArrowmioPreview /></Suspense></section>}
      {product.video && <a href={`https://www.youtube.com/watch?v=${product.video.id}`} className="film-link" target="_blank" rel="noopener noreferrer"><img src={product.video.poster} alt="" loading="lazy" /><div><SectionLabel>Watch Sketchflow</SectionLabel><h2>{product.video.title}</h2><span className="text-link"><Play size={18} /> Watch the launch film <ArrowUpRight size={16} /></span></div></a>}
      <aside className="product-next"><h2>More from Horizon Builds</h2><div>{products.filter((item) => item.id !== product.id).map((item) => <a href={productUrl(item)} key={item.id}><img src={item.logo} alt="" width="42" height="42" /><span>{item.shortName}</span><ArrowUpRight size={16} /></a>)}</div></aside>
    </div>
  );
}
