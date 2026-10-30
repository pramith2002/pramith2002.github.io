import { useState } from 'react';
import { ArrowLeft, ArrowUpRight, Check, Heart, LoaderCircle } from 'lucide-react';
import { SectionLabel } from './ui';
import { products, productUrl } from '../data/products';
import { WISHLIST_ENDPOINT } from '../data/wishlist';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function pickProduct() {
  const id = new URLSearchParams(window.location.search).get('app');
  return products.find((item) => item.id === id && item.comingSoon)
    ?? products.find((item) => item.comingSoon);
}

export default function WishlistPage() {
  const product = pickProduct();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState(''); // hidden field; bots fill it, people don't
  const [status, setStatus] = useState('idle'); // idle | sending | done | error
  const [message, setMessage] = useState('');

  const submit = async (event) => {
    event.preventDefault();
    const cleanName = name.trim();
    const cleanEmail = email.trim();
    if (!cleanName) { setStatus('error'); setMessage('Please enter your name.'); return; }
    if (!EMAIL_PATTERN.test(cleanEmail)) { setStatus('error'); setMessage('Please enter a valid email address.'); return; }
    if (!WISHLIST_ENDPOINT) { setStatus('error'); setMessage('The wishlist is not open yet. Please try again soon.'); return; }

    setStatus('sending');
    setMessage('');
    try {
      const response = await fetch(WISHLIST_ENDPOINT, {
        method: 'POST',
        // A plain form body avoids a CORS preflight, which Apps Script cannot answer.
        body: new URLSearchParams({
          name: cleanName,
          email: cleanEmail,
          app: product?.id ?? 'general',
          page: window.location.href,
          website,
        }),
      });
      const result = await response.json();
      if (!result.ok) throw new Error(result.error || 'failed');
      setStatus('done');
    } catch {
      setStatus('error');
      setMessage('Something went wrong and you were not added. Please check your connection and try again.');
    }
  };

  return (
    <div id="top" className="site-shell product-page wishlist-page !pt-32">
      <a href={product ? productUrl(product) : './#apps'} className="text-link back-link">
        <ArrowLeft size={16} /> {product ? `Back to ${product.shortName}` : 'All apps & games'}
      </a>

      <section className="wishlist-hero" aria-labelledby="wishlist-title">
        <div className="wishlist-intro">
          {product && (
            <div className="product-heading">
              <img src={product.logo} alt="" width="90" height="90" />
              <div><SectionLabel>Coming soon</SectionLabel><p className="wishlist-app">{product.shortName}</p></div>
            </div>
          )}
          <h1 id="wishlist-title">Be first to try {product ? product.shortName : 'what we build next'}.</h1>
          <p className="product-summary">
            {product ? product.summary : 'Join the wishlist and hear about new apps from Horizon Builds.'}{' '}
            Leave your name and email and we will tell you the day it launches. No spam, and we never share your email.
          </p>
          {product && <a href={productUrl(product)} className="text-link wishlist-explore">See what {product.shortName} does <ArrowUpRight size={15} /></a>}
        </div>

        <div className="wishlist-card">
          {status === 'done' ? (
            <div className="wishlist-done" role="status">
              <span className="wishlist-done-icon"><Check size={26} /></span>
              <h2>You are on the list.</h2>
              <p>Thanks, {name.trim().split(' ')[0]}. We will email {email.trim()} when {product?.shortName ?? 'it'} is ready.</p>
              {product && <a href={productUrl(product)} className="button button-secondary">Explore {product.shortName} <ArrowUpRight size={15} /></a>}
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <h2>Join the wishlist</h2>
              <label htmlFor="wishlist-name">Name</label>
              <input id="wishlist-name" name="name" type="text" autoComplete="name" maxLength={100} required
                value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
              <label htmlFor="wishlist-email">Email</label>
              <input id="wishlist-email" name="email" type="email" autoComplete="email" inputMode="email" maxLength={254} required
                value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
              <div className="wishlist-trap" aria-hidden="true">
                <label htmlFor="wishlist-website">Website</label>
                <input id="wishlist-website" name="website" type="text" tabIndex={-1} autoComplete="off"
                  value={website} onChange={(e) => setWebsite(e.target.value)} />
              </div>
              <button type="submit" className="button button-primary wishlist-submit" disabled={status === 'sending'}>
                {status === 'sending' ? <><LoaderCircle size={16} className="animate-spin" /> Adding you…</> : <><Heart size={16} /> Wishlist</>}
              </button>
              <p className="wishlist-error" role="alert">{status === 'error' ? message : ''}</p>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
