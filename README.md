# Horizon Builds

A React + Vite website for Horizon Builds. The homepage retains its animated splash, hero, marquee, trailers, iOS teaser, studio/team section, and full contact footer. Only the app and game listings are compact; their detailed features, galleries, and demos live on dedicated Explore pages. The existing dark/light theme, brand colors, and typography are shared across the site.

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
| ZeroPoint (coming soon) | `/zeropoint.html` |
| Wishlist sign-up | `/wishlist.html?app=zeropoint` |
| Contact and support | `/contact.html` |

Product pages are separate HTML entry points, so direct links and refreshes work on GitHub Pages without routing rewrites. The existing workflow builds `dist/` and deploys from `main` or `master`.

## Product content

`src/data/apps.js` contains store links, screenshots, features, and privacy links. `src/data/products.js` supplies directory categories, summaries, and download counts. Both the homepage and product pages use the shared catalog.

Set a product's `appStore` URL in `src/data/products.js` when its App Store listing is available. The App Store button then appears on its directory listing and product page. Keep the corresponding HTML page's title, description, and sharing metadata current when product details change.

Privacy documents and contact information live in `public/`. App assets live in `public/assets/`. The Arrowmio demo loads separately on its game page.

## Wishlist (Google Sheets)

Coming-soon products (`comingSoon: true` in `src/data/apps.js`) show a Wishlist button that opens `wishlist.html`. The form posts name and email to a Google Apps Script web app, which appends a row to a Google Sheet.

1. Create a Google Sheet, open Extensions > Apps Script, and paste `google-apps-script/wishlist.gs`.
2. Deploy > New deployment > Web app. Execute as: Me. Who has access: Anyone.
3. Put the `/exec` URL in `src/data/wishlist.js`.

Until the URL is set, the form shows a "not open yet" message instead of submitting.
