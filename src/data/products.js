import { arrowmio, otherApps, sketchflow, zeropoint } from './apps';

// Add appStore when a product's App Store listing is available.
export const products = [
  {
    ...sketchflow,
    category: 'App',
    genre: 'Art & creativity',
    label: 'Featured app',
    downloads: '30K+',
    summary: 'Turn inspiration into art with AR tracing, drawing grids, and a library of ready-to-draw templates.',
    description: 'Make time for your creative side. Sketchflow helps you turn a reference into a drawing on real paper, whether you are practicing your first outlines or working on a detailed portrait.',
    features: sketchflow.story.map((item) => ({ title: item.kicker, desc: item.desc, icon: item.icon })),
    appStore: null,
    availabilityNote: 'Available on Android. An iOS version is in development.',
  },
  {
    ...arrowmio,
    category: 'Game',
    genre: 'Puzzle',
    label: 'Latest game',
    summary: 'Find the clear path. Untangle arrow puzzles solo, or race your friends on the same Wi-Fi.',
    features: arrowmio.points.map((item, i) => ({ ...item, icon: ['Focus', 'LayoutGrid', 'Zap'][i] })),
    appStore: null,
  },
  {
    ...zeropoint,
    category: 'App',
    genre: 'Personal finance',
    label: 'Coming soon',
    summary: 'A private, offline budget that gives you one number: what you can safely spend today. No bank login, no account.',
    appStore: null,
    availabilityNote: 'Coming soon to Android. Join the wishlist and we will email you when it launches.',
  },
  ...otherApps.map((app) => ({
    ...app,
    category: 'App',
    genre: app.id === 'flipbook' ? 'Animation & creativity' : 'Everyday essentials',
    summary: app.shortDescription,
    downloads: app.id === 'flipbook' ? '2K+' : null,
    appStore: null,
  })),
];

export const productUrl = (product) => `./${product.id}.html`;
export const wishlistUrl = (product) => `./wishlist.html?app=${encodeURIComponent(product.id)}`;
