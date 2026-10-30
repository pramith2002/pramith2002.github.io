# Horizon Builds

A React + Vite website for Horizon Builds, with a compact company homepage and dedicated app and game pages. The existing dark/light theme, brand colors, and typography are shared across the site.

## Local development

- Install dependencies: `npm ci`
- Start the development server: `npm run dev`
- Build the static website: `npm run build`
- Preview the production build: `npm run preview`

## Pages

| Page | Address |
| --- | --- |
| Company and product directory | `/` |
| Sketchflow | `/sketchflow.html` |
| Arrowmio | `/arrowmio.html` |
| Flipbook 2D | `/flipbook.html` |
| Expiry Guard | `/expiryguard.html` |
| Contact and support | `/contact.html` |

Product pages are separate HTML entry points, so direct links and refreshes work on GitHub Pages without routing rewrites. The existing workflow builds `dist/` and deploys from `main` or `master`.

## Product content

`src/data/apps.js` contains store links, screenshots, features, and privacy links. `src/data/products.js` supplies directory categories, summaries, and download counts. Both the homepage and product pages use the shared catalog.

Set a product's `appStore` URL in `src/data/products.js` when its App Store listing is available. The App Store button then appears on its directory listing and product page. Keep the corresponding HTML page's title, description, and sharing metadata current when product details change.

Privacy documents and contact information live in `public/`. App assets live in `public/assets/`. The Arrowmio demo loads separately on its game page.
