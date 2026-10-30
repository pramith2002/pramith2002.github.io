import { AppleIcon, GooglePlayIcon } from './ui';
import { ArrowUpRight } from 'lucide-react';

export default function StoreLinks({ product, compact = false }) {
  return (
    <div className={`store-links ${compact ? 'store-links-compact' : ''}`}>
      {product.playStore && <a className="button button-primary" href={product.playStore} target="_blank" rel="noopener noreferrer" aria-label={`Download ${product.shortName} on Google Play (opens in a new tab)`}>
        <GooglePlayIcon />{compact ? 'Download' : 'Get it on Google Play'}<ArrowUpRight size={15} />
      </a>}
      {product.appStore && <a className="button button-secondary" href={product.appStore} target="_blank" rel="noopener noreferrer" aria-label={`Download ${product.shortName} on the App Store (opens in a new tab)`}>
        <AppleIcon />{compact ? 'App Store' : 'Download on the App Store'}<ArrowUpRight size={15} />
      </a>}
    </div>
  );
}
