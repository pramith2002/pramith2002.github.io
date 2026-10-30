import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { products, productUrl } from '../data/products';
import { Reveal, SectionLabel, SplitWords } from './ui';
import StoreLinks from './StoreLinks';
import { EASE, trackSpotlight } from '../lib/motion';

export default function Home() {
  const [filter, setFilter] = useState('All projects');
  const visible = products.filter((product) => filter === 'All projects' || product.category === (filter === 'Apps' ? 'App' : 'Game'));

  return (
    <section id="apps" className="relative py-24 md:py-36 scroll-mt-24" aria-labelledby="projects-title">
      <div className="site-shell">
        <div className="section-heading">
          <div>
            <SectionLabel>Made by Horizon</SectionLabel>
            <h2 id="projects-title" className="!text-[clamp(2.5rem,6vw,5rem)] !font-extrabold">
              <SplitWords text="Our apps & games." />
            </h2>
          </div>
          <div className="project-filters" role="group" aria-label="Filter projects">
            {['All projects', 'Apps', 'Games'].map((item) => (
              <button key={item} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>
            ))}
          </div>
        </div>
        <p className="sr-only" aria-live="polite">{visible.length} projects shown</p>
        <Reveal y={25} className="project-list">
          {visible.map((product, i) => (
            <motion.article
              key={product.id}
              className="project-row spotlight"
              aria-labelledby={`title-${product.id}`}
              onMouseMove={trackSpotlight}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.06 }}
            >
              <a href={productUrl(product)} className="project-icon-link" aria-label={`Explore ${product.shortName}`}>
                <img src={product.logo} alt="" className="project-icon" width="80" height="80" />
              </a>
              <div className="project-copy">
                <div className="project-meta">
                  <span>{product.genre}</span>
                  {product.label && <span className="product-label">{product.label}</span>}
                  {product.downloads && <span>{product.downloads} downloads</span>}
                </div>
                <h3 id={`title-${product.id}`}><a href={productUrl(product)}>{product.shortName}</a></h3>
                <p>{product.tagline}</p>
              </div>
              <div className="project-actions">
                <div className="project-buttons">
                  <StoreLinks product={product} compact />
                  <a href={productUrl(product)} className="button button-secondary" aria-label={`Explore ${product.shortName}`}>Explore <ArrowUpRight size={16} /></a>
                </div>
                <a className="privacy-link" href={product.privacyUrl} aria-label={`${product.shortName} privacy policy`}>Privacy policy</a>
              </div>
            </motion.article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
