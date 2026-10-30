import { MotionConfig } from 'framer-motion';
import Nav from './components/Nav';
import Home from './components/Home';
import ProductPage from './components/ProductPage';
import SiteFooter from './components/SiteFooter';
import { products } from './data/products';

export default function App() {
  const filename = window.location.pathname.split('/').pop();
  const product = products.find((item) => filename === `${item.id}.html`);
  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip-link">Skip to content</a>
      <div className="grain" aria-hidden="true" />
      <Nav product={product} />
      <main id="main" tabIndex={-1}>
        {product ? <ProductPage product={product} /> : <Home />}
      </main>
      <SiteFooter />
    </MotionConfig>
  );
}
