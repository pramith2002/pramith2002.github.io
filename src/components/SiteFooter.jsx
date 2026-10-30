import { HorizonMark } from './ui';
import { DEV_PROFILE } from '../data/apps';
import { products } from '../data/products';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-shell footer-top"><div><a href="./" className="brand"><HorizonMark className="w-8 h-8" /><span>Horizon <span className="text-mute">Builds</span></span></a><p>Independent minds. Thoughtfully built apps & games.</p></div><nav aria-label="Company"><a href="./#apps">Our projects</a><a href="./contact.html">Contact & support</a><a href={DEV_PROFILE} target="_blank" rel="noopener noreferrer">Google Play ↗</a></nav></div>
      <div className="site-shell footer-bottom"><p>© {new Date().getFullYear()} Horizon Builds</p><nav aria-label="Privacy policies"><span>Privacy:</span>{products.map((product) => <a key={product.id} href={product.privacyUrl}>{product.shortName}</a>)}</nav></div>
    </footer>
  );
}
