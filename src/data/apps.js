export const DEV_PROFILE = 'https://play.google.com/store/apps/dev?id=5255794692438174290';
export const YT_CHANNEL = 'https://www.youtube.com/@drawpaintSketchflow';

export const sketchflow = {
  id: 'sketchflow',
  name: 'Draw & Paint: Sketchflow',
  shortName: 'Sketchflow',
  tagline: 'Master drawing via AR! Trace, sketch & paint anime, cartoons, and portraits.',
  logo: 'assets/sketchflow/logo.webp',
  playStore: 'https://play.google.com/store/apps/details?id=com.horizon.ardrawingsketchflow',
  reviews: 'https://play.google.com/store/apps/details?id=com.horizon.ardrawingsketchflow&showAllReviews=true',
  privacyUrl: './privacy-ar.html',
  video: {
    id: 'vqYZsKthBdE',
    title: 'Pick a Template, Draw It on Paper',
    poster: 'assets/sketchflow/video-poster.webp',
  },
  stats: [
    { value: 30, suffix: 'K+', label: 'Downloads on Google Play' },
    { value: 4.6, decimals: 1, suffix: '★', label: 'Average store rating' },
    { value: 100, suffix: '+', label: 'Reviews from real artists' },
    { value: 1000, suffix: '+', label: 'Traceable templates' },
  ],
  screenshots: [1, 2, 3, 4, 5, 6, 7, 8].map((i) => `assets/sketchflow/s${i}.webp`),
  story: [
    {
      kicker: 'AR Camera Trace',
      title: 'Point. Project. Draw.',
      desc: 'Your phone becomes an AR projector. Lock any image over real paper, dial in the opacity and trace it line by line, with flashlight support for late-night sessions.',
      shot: 0,
      icon: 'Camera',
    },
    {
      kicker: 'Template Library',
      title: '1000+ templates. 20+ categories.',
      desc: 'Anime, manga, animals, cars, portraits, food and more. Every outline is tuned for tracing, so you never stare at a blank page.',
      shot: 1,
      icon: 'LayoutGrid',
    },
    {
      kicker: 'Screenlight',
      title: 'A lightbox in your pocket.',
      desc: 'Lay thin paper on the screen and trace. Touch-lock ignores your hand, and the brightness boost keeps every line crisp.',
      shot: 2,
      icon: 'Lightbulb',
    },
    {
      kicker: 'Grid Drawing',
      title: 'Learn it like the old masters.',
      desc: 'Overlay a custom grid with labels, diagonals and colours. Break any reference into squares and nail scale and proportion.',
      shot: 3,
      icon: 'Grid3x3',
    },
    {
      kicker: 'Focus Mode',
      title: 'Stay in the flow.',
      desc: 'Distraction-free tracing that keeps your reference locked and steady, so you can go from first line to final shade in one go.',
      shot: 5,
      icon: 'Focus',
    },
    {
      kicker: 'Photo to Line Art',
      title: 'Any photo, instantly traceable.',
      desc: 'Import from your gallery and AI edge detection turns it into clean, high-contrast line art in seconds. Then record a time-lapse of the whole thing.',
      shot: 7,
      icon: 'WandSparkles',
    },
  ],
  modes: [
    { title: 'Camera Tracing', desc: 'Use your camera to trace any image onto paper.', icon: 'Camera' },
    { title: 'Screen Draw', desc: 'Draw on your screen using transparency.', icon: 'Smartphone' },
    { title: 'Grid Draw', desc: 'Use grids to draw with perfect accuracy.', icon: 'Grid3x3' },
  ],
};

export const otherApps = [
  {
    id: 'flipbook',
    name: 'Flipbook 2D: Draw Animation',
    shortName: 'Flipbook 2D',
    tagline: 'Frame-by-frame animation, in your pocket.',
    shortDescription:
      'A portable animation studio with onion skinning, layers and up to 60 FPS playback. Animate stickman battles, loops and walk cycles, then export to MP4 or GIF.',
    description: `Bring imagination to life. Create cartoons, animate dynamic stickman battles, or bring simple doodles to life. Flipbook 2D turns the nostalgic magic of paper flipbooks into a powerful, modern animation maker.

Whether you're learning frame-by-frame movement for the first time or need an intuitive sketching tool, it has everything you need to draw, animate and export. Fully offline, with no logins.`,
    logo: 'assets/flipbook/logo.webp',
    screenshots: [1, 2, 3, 4, 5, 6, 7].map((i) => `assets/flipbook/s${i}.webp`),
    playStore: 'https://play.google.com/store/apps/details?id=com.horizon.flipbook',
    privacyUrl: './privacy-flipbook.html',
    accent: '#ff7a1a',
    accent2: '#ff3d5a',
    highlights: ['Onion Skinning', 'Multi-Layer', 'Up to 60 FPS', 'MP4 & GIF Export'],
    features: [
      { title: 'Frame-by-Frame Timeline', desc: 'Add, duplicate, rearrange or delete frames on the fly. Hold poses for multiple beats.', icon: 'Film' },
      { title: 'Onion Skinning', desc: 'Translucent previous and next frames help you nail smooth, natural motion.', icon: 'Eye' },
      { title: 'Advanced Layers', desc: 'Keep backgrounds static while characters animate. Lock, fade or merge.', icon: 'Layers' },
      { title: 'Expressive Brushes', desc: 'Pencils, pens, markers and erasers with a full-spectrum colour picker.', icon: 'Brush' },
      { title: 'Up to 60 FPS', desc: 'From retro 12 FPS stop-motion to silky, cinematic 60 FPS loops.', icon: 'Zap' },
      { title: 'MP4 & GIF Export', desc: 'Render crisp videos for YouTube, TikTok and Instagram, or lightweight GIFs.', icon: 'Download' },
    ],
  },
  {
    id: 'expiryguard',
    name: 'Expiry Guard: Alert & Reminder',
    shortName: 'Expiry Guard',
    tagline: 'Never miss an expiry date again.',
    shortDescription:
      'A private, offline vault for warranties, subscriptions, medicines and groceries. Scan a barcode, attach the receipt and get alerted before anything expires.',
    description: `Stop losing money on expired warranties, forgotten subscriptions and wasted food. Expiry Guard is a personal vault for everything with an expiration date.

From electronics warranties and insurance papers to medicines and groceries, everything stays organised and accessible. It's offline-first: your data never leaves your device, and there's no sign-up and no cloud.`,
    logo: 'assets/expiryguard/logo.webp',
    screenshots: [1, 2, 3, 4, 5].map((i) => `assets/expiryguard/s${i}.webp`),
    playStore: 'https://play.google.com/store/apps/details?id=com.horizon.expirygaurd',
    privacyUrl: './privacy-expiry.html',
    accent: '#10d9a0',
    accent2: '#0ea5e9',
    highlights: ['Barcode Scanner', '100% Offline', 'Receipt Vault', 'Smart Alerts'],
    features: [
      { title: 'Barcode & QR Scanner', desc: 'Scan to search your vault or auto-fill a new item in seconds.', icon: 'ScanBarcode' },
      { title: 'Smart Expiry Alerts', desc: 'Timely reminders before warranties lapse or subscriptions renew.', icon: 'Bell' },
      { title: 'Receipt & Document Vault', desc: 'Attach photos or PDFs as proof of purchase for warranty claims.', icon: 'FileText' },
      { title: 'Flexible Categories', desc: 'Electronics, documents, medicines, groceries and subscriptions.', icon: 'LayoutGrid' },
      { title: 'Private by Design', desc: 'Local database. No account, no cloud uploads, no hidden tracking.', icon: 'Lock' },
    ],
  },
];

export const arrowmio = {
  id: 'arrowmio',
  name: 'Arrowmio: Tap Puzzle Game',
  shortName: 'Arrowmio',
  tagline: 'Tap. Clear. Repeat.',
  logo: 'assets/arrowmio/icon.png',
  screenshots: [1, 2, 3, 4, 5, 6, 7, 8].map((i) => `assets/arrowmio/s${i}.png`),
  playStore: 'https://play.google.com/store/apps/details?id=com.horizon.arrowmio&hl=en_IN',
  trailer: 'https://youtube.com/shorts/vGXsowecVNY',
  description:
    'Find a clear path, tap an arrow, and watch it fly. Untangle thousands of puzzles at your own pace, or race 2–6 friends on the same Wi-Fi.',
  privacyUrl: './privacy-arrowmio.html',
  points: [
    { title: 'Find the way out', desc: 'Tap free arrows in the right order to clear the board.' },
    { title: '25,000+ levels', desc: 'From easy warmups to super hard puzzles.' },
    { title: 'Race your friends', desc: 'Play with 2–6 people on the same Wi-Fi.' },
  ],
};
