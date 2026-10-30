import { useState } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { products, productUrl } from '../data/products';
import { HorizonMark, SectionLabel } from './ui';
import StoreLinks from './StoreLinks';

export default function Home() {
  const [filter, setFilter] = useState('All projects');
  const visible = products.filter((product) => filter === 'All projects' || product.category === (filter === 'Apps' ? 'App' : 'Game'));
  return (
    <div className="site-shell">
      <section className="company-hero" aria-labelledby="company-title">
        <div>
          <SectionLabel>Independent mobile studio</SectionLabel>
          <h1 id="company-title">Horizon <span className="text-brand">Builds.</span></h1>
          <p>Small studio. A world of possibilities.</p>
          <p className="hero-description">Thoughtful apps for everyday life. Creative tools for your next idea. Games you’ll want to play one more time.</p>
          <a href="#apps" className="text-link hero-link">Explore our projects <ArrowRight size={17} /></a>
        </div>
        <div className="horizon-art" aria-hidden="true"><div className="horizon-art-glow" /><div className="horizon-orbit" /><HorizonMark className="horizon-art-mark" /><span className="horizon-art-caption">Ideas into everyday experiences.</span></div>
      </section>
      <section id="apps" className="project-section" aria-labelledby="projects-title">
        <div className="section-heading">
          <div><SectionLabel>Made by Horizon</SectionLabel><h2 id="projects-title">Our apps & games</h2></div>
          <div className="project-filters" role="group" aria-label="Filter projects">{['All projects', 'Apps', 'Games'].map((item) => <button key={item} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}</div>
        </div>
        <p className="sr-only" aria-live="polite">{visible.length} projects shown</p>
        <div className="project-list">{visible.map((product) => <article key={product.id} className="project-row" aria-labelledby={`title-${product.id}`}>
          <a href={productUrl(product)} className="project-icon-link" aria-label={`Explore ${product.shortName}`}><img src={product.logo} alt="" className="project-icon" width="80" height="80" /></a>
          <div className="project-copy"><div className="project-meta"><span>{product.genre}</span>{product.label && <span className="product-label">{product.label}</span>}{product.downloads && <span>{product.downloads} downloads</span>}</div><h3 id={`title-${product.id}`}><a href={productUrl(product)}>{product.shortName}</a></h3><p>{product.summary}</p></div>
          <div className="project-actions"><div className="project-buttons"><StoreLinks product={product} compact /><a href={productUrl(product)} className="button button-secondary" aria-label={`Explore ${product.shortName}`}>Explore <ArrowUpRight size={16} /></a></div><a className="privacy-link" href={product.privacyUrl} aria-label={`${product.shortName} privacy policy`}>Privacy policy</a></div>
        </article>)}</div>
      </section>
      <aside className="home-contact"><div><h2>Good things start with a conversation.</h2><p>Questions, feedback, or an idea to share? We’d love to hear it.</p></div><a href="./contact.html" className="text-link">Get in touch <ArrowUpRight size={17} /></a></aside>
    </div>
  );
}
