import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { 
  X, ExternalLink, Mail, ArrowRight, Shield, Layers, 
  Eye, LayoutGrid, Calendar, Smartphone, Lock, Camera, 
  Zap, Image as ImageIcon, Video, Sparkles, ChevronLeft, ChevronRight
} from 'lucide-react';

const apps = [
  {
    id: 'sketchflow',
    name: 'AR Drawing Sketchflow',
    tagline: 'Trace, Sketch, and Create with Augmented Reality',
    shortDescription: 'Bridge the gap between digital imagination and physical paper using advanced AR camera projection. Trace outlines directly onto paper and master proportions.',
    description: `Unlock your true creative potential and revolutionize the way you create art with the ultimate Augmented Reality (AR) drawing companion! Whether you are a beginner holding a pencil for the first time, an aspiring illustrator, or a seasoned hobbyist, this app is your dedicated personal art instructor.

Turn your smartphone into a powerful AR drawing tool today. Eliminate the need for expensive light boxes or professional projectors. Just look through your phone lens, lock your virtual AR guide, and trace lines directly onto paper to create a stunning, gallery-worthy masterpiece in minutes.`,
    logo: 'assets/sketchflow/logo.webp',
    screenshots: [
      'assets/sketchflow/s1.webp',
      'assets/sketchflow/s2.webp',
      'assets/sketchflow/s3.webp',
      'assets/sketchflow/s4.webp',
      'assets/sketchflow/s5.webp',
      'assets/sketchflow/s6.webp',
      'assets/sketchflow/s7.webp',
      'assets/sketchflow/s8.webp',
    ],
    playStore: 'https://play.google.com/store/apps/details?id=com.horizon.ardrawingsketchflow',
    privacyUrl: './privacy-ar.html',
    color: 'from-violet-600 to-fuchsia-600',
    accentColor: 'rgb(168, 85, 247)',
    glowColor: 'rgba(139, 92, 246, 0.15)',
    highlights: ['AR Trace Projection', 'Smart Grid Method', 'AI Edge Detection', 'Time-Lapse Video'],
    features: [
      {
        title: 'AR Camera Projection Mode',
        desc: 'Use your phone’s camera as a virtual AR projector to sketch on any surface. Features opacity slider control, flashlight helper, and details zoom.',
        icon: 'Camera'
      },
      {
        title: 'Screen Trace Lightbox',
        desc: 'Convert your device into a digital lightbox with specialized touch-lock to ignore hand touches while tracing on thin paper.',
        icon: 'Smartphone'
      },
      {
        title: 'Smart Grid Method',
        desc: 'Overlay customizable grids on reference images to break down complex profiles and master scale, proportions, and composition.',
        icon: 'LayoutGrid'
      },
      {
        title: 'AI Edge Detection',
        desc: 'Import photos from your gallery and instantly convert them into clean, high-contrast tracing line-art outlines.',
        icon: 'Sparkles'
      },
      {
        title: 'HD Time-Lapse Capture',
        desc: 'Automatically record high-definition time-lapse video of your drawing session to showcase your hand-drawn process on socials.',
        icon: 'Video'
      }
    ],
    targetUsers: [
      'Art Students aiming to build hand-eye coordination & master proportions.',
      'Content Creators wanting to capture satisfying drawing time-lapses.',
      'DIY Crafters transferring templates onto canvas, fabric, wood, or walls.'
    ]
  },
  {
    id: 'flipbook',
    name: 'Flipbook 2D: Draw Animation',
    tagline: 'Create Frame-by-Frame Cartoons & Animation Loops',
    shortDescription: 'Your ultimate portable animation studio. Create stickman animations, rough drafts, and character walk cycles with onionskins and multiple layers.',
    description: `Bring Imagination to Life with Flipbook 2D: Draw Animation! Create cartoons, animate dynamic stickman battles, or bring simple doodles to life! Flipbook 2D is your ultimate portable animation studio.

We’ve transformed the nostalgic magic of classic paper flipbooks into a powerful, modern, and easy-to-use digital animation maker. Whether you're a beginner learning frame-by-frame movement or an artist needing an intuitive sketching tool, this app has everything you need to draw, animate, and export your art.`,
    logo: 'assets/flipbook/logo.webp',
    screenshots: [
      'assets/flipbook/s1.webp',
      'assets/flipbook/s2.webp',
      'assets/flipbook/s3.webp',
      'assets/flipbook/s4.webp',
      'assets/flipbook/s5.webp',
      'assets/flipbook/s6.webp',
      'assets/flipbook/s7.webp',
    ],
    playStore: 'https://play.google.com/store/apps/details?id=com.horizon.flipbook',
    privacyUrl: './privacy-flipbook.html',
    color: 'from-orange-500 to-red-600',
    accentColor: 'rgb(249, 115, 22)',
    glowColor: 'rgba(249, 115, 22, 0.15)',
    highlights: ['Onion Skinning', 'Multi-Layer System', 'Up to 60 FPS', 'MP4 & GIF Export'],
    features: [
      {
        title: 'Frame-by-Frame Timeline',
        desc: 'Intuitive timeline to add, duplicate, rearrange, or delete frames. Easily copy frames to hold drawing poses.',
        icon: 'Layers'
      },
      {
        title: 'Onion Skinning',
        desc: 'Trace characters naturally using semi-transparent overlays of previous and next frames to perfect fluid movement.',
        icon: 'Eye'
      },
      {
        title: 'Advanced Layer System',
        desc: 'Separate backgrounds and characters on independent layers to structure complex animated scenes.',
        icon: 'Layers'
      },
      {
        title: 'Expressive Animation Brushes',
        desc: 'Versatile drawing pens, pencils, markers, and erasers. Access full color picker palette and shape drafts.',
        icon: 'Sparkles'
      },
      {
        title: '60 FPS Playback Engine',
        desc: 'Adjust speed timing on the fly—from retro 12 FPS stop-motion to blisteringly smooth 60 FPS loops.',
        icon: 'Zap'
      },
      {
        title: 'Prebuilt Study Guides',
        desc: 'Explore bouncing ball or walk cycle templates frame-by-frame to master the 12 principles of animation.',
        icon: 'Smartphone'
      }
    ],
    targetUsers: [
      'Indie Animators drafting storyboards, stick figures, and loop memes.',
      'Aspiring Artists learning character kinematics and timeline pacing.',
      'Mindful Doodlers seeking a relaxing, creative offline outlet.'
    ]
  },
  {
    id: 'expiryguard',
    name: 'Expiry Guard: Alert & Reminder',
    tagline: 'Private Expiry Tracker for Warranties & Subscriptions',
    shortDescription: 'Personal offline vault to track product expiration. Get smart alerts before subscriptions renew, warranties expire, or groceries spoil.',
    description: `Stop losing money on expired warranties, forgotten subscriptions, and wasted food. Expiry Guard is the ultimate personal vault for tracking everything with an expiration date.

From electronics warranties and insurance papers to medicines and grocery items, keep your valuable data organized, secure, and accessible 24/7. Unlike other apps, Expiry Guard is Offline-First. Your data never leaves your device, ensuring complete privacy without the need for account sign-ups or internet access.`,
    logo: 'assets/expiryguard/logo.webp',
    screenshots: [
      'assets/expiryguard/s1.webp',
      'assets/expiryguard/s2.webp',
      'assets/expiryguard/s3.webp',
      'assets/expiryguard/s4.webp',
      'assets/expiryguard/s5.webp',
    ],
    playStore: 'https://play.google.com/store/apps/details?id=com.horizon.expirygaurd',
    privacyUrl: './privacy-expiry.html',
    color: 'from-emerald-500 to-teal-600',
    accentColor: 'rgb(16, 185, 129)',
    glowColor: 'rgba(16, 185, 129, 0.15)',
    highlights: ['Barcode QR Scanner', '100% Offline-First', 'Receipt Attachment', 'Smart Alerts'],
    features: [
      {
        title: 'Barcode & QR Scanner',
        desc: 'Scan barcodes to instantly search or log item info, keeping your pantry inventory completely error-free.',
        icon: 'Zap'
      },
      {
        title: 'Smart Expiry Alerts',
        desc: 'Receive proactive alerts prior to deadline triggers. Automatically calculates item warning states.',
        icon: 'Calendar'
      },
      {
        title: 'Document & Receipt Vault',
        desc: 'Attach receipts or PDF details to items, providing reliable proof of purchase when requesting warranty claims.',
        icon: 'Layers'
      },
      {
        title: 'Flexible Category Tags',
        desc: 'Organize assets with customized categories for Electronics, Groceries, Documents, Subscriptions, and Meds.',
        icon: 'LayoutGrid'
      },
      {
        title: '100% Private Offline Db',
        desc: 'Data runs locally. No account setups, no server uploads, and no hidden analytical tracking.',
        icon: 'Lock'
      }
    ],
    targetUsers: [
      'Tech owners tracking warranty periods and receipts of gadgets.',
      'Subscription users wanting alerts before automated credit card charges.',
      'Organized households reducing waste by monitoring pantry shelves.'
    ]
  },
  {
    id: 'animeryu',
    name: 'AR Drawing: AnimeRyu',
    tagline: 'Augmented Reality Sketching for Anime Characters',
    shortDescription: 'Project anime drawings onto paper using your camera lens. Master sketch outlines, Anime grids, and trace templates step-by-step.',
    description: `Unleash your creativity and learn to draw faster than ever with the ultimate Augmented Reality (AR) Anime Drawing App. Designed for beginners, students, and illustrators, this tool helps you draw on real paper with perfect accuracy.

Using advanced AR tracing technology, the app projects any anime template onto a physical surface, allowing you to trace outlines, improve proportions, and master complex drawings. No light boxes needed — just your phone, paper, and pencil.`,
    logo: 'assets/animeryu/logo.webp',
    screenshots: [
      'assets/animeryu/s1.webp',
      'assets/animeryu/s2.webp',
      'assets/animeryu/s3.webp',
      'assets/animeryu/s4.webp',
      'assets/animeryu/s5.webp',
      'assets/animeryu/s6.webp',
    ],
    playStore: 'https://play.google.com/store/apps/details?id=com.horizon.anime',
    privacyUrl: './privacy-ar.html',
    color: 'from-blue-500 to-cyan-500',
    accentColor: 'rgb(59, 130, 246)',
    glowColor: 'rgba(59, 130, 246, 0.15)',
    highlights: ['Anime Template Library', 'AI Edge Outlining', 'Screen Light Pad', 'Smart Grid Setup'],
    features: [
      {
        title: 'AR Camera Projection',
        desc: 'Project anime references directly onto canvas or sketch pads. Adjust opacity, scale, and flashlight for tracing.',
        icon: 'Camera'
      },
      {
        title: 'Manga Template Library',
        desc: 'Access curated outlines optimized for tracing, spanning Anime icons, facial geometry, animals, and nature structures.',
        icon: 'Sparkles'
      },
      {
        title: 'Smart Proportion Grid',
        desc: 'Overlay coordinate grids on reference files. Grid scaling allows beginners to sketch layouts with accurate anatomy.',
        icon: 'LayoutGrid'
      },
      {
        title: 'Instant Gallery Tracing',
        desc: 'Load photos from device galleries and use AI edge detection to convert them into crisp tracing layouts in seconds.',
        icon: 'Sparkles'
      },
      {
        title: 'HD Time-Lapse Record',
        desc: 'Log drawing video loops of your sessions automatically. Share screen recordings to showcase your tracing skills.',
        icon: 'Video'
      }
    ],
    targetUsers: [
      'Anime fanbases learning to illustrate character designs by hand.',
      'Art Learners looking to practice grid scaling and face mapping.',
      'Crafters looking to project and paint patterns onto various surfaces.'
    ]
  }
];

const IconMapper = ({ name, className }) => {
  switch (name) {
    case 'Camera': return <Camera className={className} />;
    case 'Smartphone': return <Smartphone className={className} />;
    case 'LayoutGrid': return <LayoutGrid className={className} />;
    case 'Layers': return <Layers className={className} />;
    case 'Eye': return <Eye className={className} />;
    case 'Sparkles': return <Sparkles className={className} />;
    case 'Zap': return <Zap className={className} />;
    case 'Calendar': return <Calendar className={className} />;
    case 'Lock': return <Lock className={className} />;
    case 'Video': return <Video className={className} />;
    default: return <Sparkles className={className} />;
  }
};

const Splash = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 1600);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: '-100%' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <motion.div
        className="flex flex-col items-center"
        initial={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
        animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h1 className="text-7xl md:text-9xl font-extrabold tracking-tighter text-white font-display mb-4">
          HORIZON.
        </h1>
        <p className="text-sm font-bold uppercase tracking-[0.4em] text-neutral-500 mb-6">Mobile Labs</p>
        <div className="w-24 h-[2px] bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

const AppModal = ({ app, onClose }) => {
  const scrollRef = useRef(null);
  const [activeImage, setActiveImage] = useState(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -260, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 260, behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-40 flex items-center justify-center p-2 md:p-6 bg-black/85 backdrop-blur-2xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="relative w-full max-w-6xl h-full max-h-[92vh] overflow-y-auto bg-[#0a0a0c] border border-white/10 rounded-[2.5rem] shadow-3xl flex flex-col"
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ type: "spring", damping: 28, stiffness: 180 }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-30 p-3 bg-black/50 hover:bg-white hover:text-black border border-white/10 rounded-full text-white backdrop-blur-md transition-all duration-300 shadow-lg"
        >
          <X size={20} />
        </button>

        {/* Modal Header Section */}
        <div className="relative p-6 md:p-12 pb-6 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 border-b border-white/5 bg-gradient-to-b from-white/[0.01] to-transparent">
          {/* Logo Frame */}
          <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-3xl overflow-hidden shadow-xl bg-zinc-900 border border-white/10 shrink-0">
            <img src={app.logo} alt={`${app.name} logo`} className="w-full h-full object-cover" />
          </div>
          
          <div className="flex-grow">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-semibold text-neutral-400 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Android Only
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white font-display tracking-tight leading-tight">
              {app.name}
            </h2>
            <p className="text-lg md:text-xl text-neutral-400 font-medium mt-1">
              {app.tagline}
            </p>
          </div>
        </div>

        {/* Modal Grid Content */}
        <div className="p-6 md:p-12 pt-8 flex-grow grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Panel: Description, Features, Target Users */}
          <div className="lg:col-span-7 space-y-10">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-4">Overview</h3>
              <p className="text-neutral-300 text-lg leading-relaxed whitespace-pre-line font-light">
                {app.description}
              </p>
            </div>

            {/* Features list */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-6">Key Capabilities</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {app.features.map((f, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex gap-4">
                    <div className="shrink-0 w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                      <IconMapper name={f.icon} className="w-5 h-5 text-neutral-300" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1 text-sm">{f.title}</h4>
                      <p className="text-xs text-neutral-400 leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Target Audience */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
              <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-4">Best Suited For</h3>
              <ul className="space-y-3">
                {app.targetUsers.map((user, i) => (
                  <li key={i} className="text-sm text-neutral-300 flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 mt-2 shrink-0"></span>
                    <span>{user}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Panel: Screenshot Gallery */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500">Play Store Interface</h3>
                <p className="text-xs text-neutral-400 mt-1">Tap a screen to expand preview</p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={scrollLeft}
                  className="p-2 rounded-full border border-white/5 bg-white/5 hover:bg-white/10 text-white transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                <button 
                  onClick={scrollRight}
                  className="p-2 rounded-full border border-white/5 bg-white/5 hover:bg-white/10 text-white transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Screenshot List inside realistic mobile frame mockups */}
            <div 
              ref={scrollRef}
              className="screenshot-scroll flex gap-6 pb-4 overflow-x-auto snap-x select-none"
            >
              {app.screenshots.map((src, i) => (
                <div 
                  key={i} 
                  onClick={() => setActiveImage(src)}
                  className="screenshot-item snap-center shrink-0 cursor-zoom-in group/screen"
                >
                  <div className="relative mx-auto border-[6px] border-zinc-800 rounded-[2.5rem] h-[480px] w-[240px] shadow-xl bg-zinc-950 overflow-hidden ring-1 ring-white/10 transition-all duration-300 group-hover/screen:border-zinc-700 group-hover/screen:scale-[1.01]">
                    {/* Speaker Notch */}
                    <div className="absolute top-0 inset-x-0 h-4 bg-zinc-800 rounded-b-xl flex justify-center items-center z-20">
                      <div className="w-10 h-1 bg-zinc-900 rounded-full"></div>
                    </div>
                    {/* Real Image */}
                    <img 
                      src={src} 
                      alt={`${app.name} screen ${i+1}`} 
                      className="w-full h-full object-cover transition-opacity duration-300 group-hover/screen:opacity-90" 
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Technical Package Details */}
            <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/5 text-xs text-neutral-500 space-y-2 font-mono mt-auto">
              <div><span className="text-neutral-400">Package ID:</span> {app.playStore.split('id=')[1]}</div>
              <div><span className="text-neutral-400">Environment:</span> Static Local Native Assets</div>
              <div><span className="text-neutral-400">Target OS:</span> Android SDK 26+</div>
            </div>
          </div>

        </div>

        {/* Modal Sticky Footer CTA */}
        <div className="p-6 md:p-8 border-t border-white/5 bg-black/40 backdrop-blur-md flex flex-col sm:flex-row gap-4 mt-auto">
          <a
            href={app.playStore}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-gradient-to-r ${app.color} text-white rounded-full font-bold text-base hover:shadow-lg hover:shadow-purple-500/10 hover:scale-[1.02] active:scale-[0.98] transition-all`}
          >
            Get on Play Store <ExternalLink size={18} />
          </a>
          <a
            href={app.privacyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-semibold text-base hover:bg-white/10 transition-colors"
          >
            <Shield size={18} className="text-neutral-400" /> Privacy Policy
          </a>
        </div>
      </motion.div>

      {/* Lightbox for Expanded Image */}
      <AnimatePresence>
        {activeImage && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 cursor-zoom-out"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImage(null)}
          >
            <button 
              className="absolute top-6 right-6 p-3 bg-white/10 border border-white/10 text-white rounded-full hover:bg-white/20 transition-colors"
              onClick={() => setActiveImage(null)}
            >
              <X size={24} />
            </button>
            <motion.div
              className="max-h-[90vh] max-w-full relative border-[8px] border-zinc-800 rounded-[3rem] overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 30 }}
            >
              <img src={activeImage} alt="Expanded Screenshot" className="max-h-[85vh] object-contain" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);

  // Sync scrollbar hiding when modal is active
  useEffect(() => {
    if (selectedApp) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedApp]);

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-white/30 selection:text-white relative">
      <AnimatePresence mode="wait">
        {loading && <Splash onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {/* Nav */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: loading ? -100 : 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
        className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-6 py-5 md:px-12 backdrop-blur-xl bg-[#050505]/40 border-b border-white/5"
      >
        <div className="text-2xl font-extrabold tracking-tighter font-display flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500"></span>
          HORIZON.
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-neutral-400">
          <a href="#apps" className="hover:text-white transition-colors">The Arsenal</a>
          <a href="#philosophy" className="hover:text-white transition-colors">Philosophy</a>
          <a href="#minds" className="hover:text-white transition-colors">The Minds</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>
        <a 
          href="https://play.google.com/store/apps/dev?id=5255794692438174290" 
          target="_blank" 
          rel="noopener noreferrer"
          className="px-5 py-2 bg-white text-black hover:bg-neutral-200 rounded-full text-xs md:text-sm font-bold transition-all flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
        >
          Play Store <ArrowRight size={14} />
        </a>
      </motion.nav>

      {/* Main Container */}
      <main className="relative z-10 pt-[80px]">
        
        {/* Hero Section */}
        <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden px-6 grid-backdrop">
          {/* Animated glow blob */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[600px] h-[350px] md:h-[600px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none animate-pulse-slow z-0"></div>
          
          <div className="text-center z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
            {/* Tagline Badge */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-semibold text-neutral-300 mb-8 backdrop-blur-md"
            >
              <Sparkles size={14} className="text-violet-400" />
              <span>Android utility & creative studios</span>
            </motion.div>

            <motion.h1 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] text-white font-display"
            >
              Crafting Android<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-500 to-cyan-400 animate-gradient-text">Realities.</span>
            </motion.h1>

            <motion.p
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-neutral-400 text-lg md:text-2xl mt-8 max-w-2xl font-medium leading-relaxed"
            >
              We design native mobile applications focused on absolute privacy, fluid user experience, and high-performance utility.
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-10 flex flex-wrap gap-4 items-center justify-center"
            >
              <a 
                href="#apps"
                className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-neutral-200 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md flex items-center gap-2"
              >
                View The Arsenal <ArrowRight size={18} />
              </a>
              <a 
                href="https://play.google.com/store/apps/dev?id=5255794692438174290" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 font-semibold rounded-full transition-colors flex items-center gap-2"
              >
                Developer Profile
              </a>
            </motion.div>
          </div>
          
          {/* Subtle noise layer */}
          <div className="noise-overlay"></div>
        </section>

        {/* Selected Apps Showcase Bento */}
        <section id="apps" className="py-32 px-6 md:px-12 max-w-7xl mx-auto relative z-10 border-t border-white/5">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-4">Live Portfolio</h2>
              <p className="text-4xl md:text-5xl font-extrabold tracking-tighter font-display">The Arsenal.</p>
            </div>
            <p className="text-neutral-400 font-medium text-base md:text-lg max-w-md">
              A curated suite of native utility and digital animation toolkits built specifically for Android devices.
            </p>
          </div>
          
          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {apps.map((app) => (
              <div 
                key={app.id} 
                className="cursor-pointer group flex flex-col"
                onClick={() => setSelectedApp(app)}
              >
                <Tilt 
                  className="w-full h-full flex-grow flex" 
                  tiltMaxAngleX={3} 
                  tiltMaxAngleY={3} 
                  scale={0.99} 
                  transitionSpeed={2000}
                  glareEnable={true}
                  glareMaxOpacity={0.06}
                  glarePosition="all"
                  glareBorderRadius="32px"
                >
                  <div 
                    className="w-full p-8 md:p-10 rounded-[2rem] glass-panel glass-panel-hover flex flex-col justify-between relative overflow-hidden"
                    style={{ '--glow-color': app.glowColor }}
                  >
                    {/* Card background glowing overlay */}
                    <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/20 pointer-events-none"></div>
                    
                    <div>
                      {/* Logo and Badges */}
                      <div className="flex items-start justify-between gap-4 mb-8">
                        <div className="w-16 h-16 rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 shadow-lg relative z-10">
                          <img src={app.logo} alt={`${app.name} icon`} className="w-full h-full object-cover" />
                        </div>
                        <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all duration-300 transform group-hover:-rotate-45 relative z-10">
                          <ArrowRight size={18} />
                        </div>
                      </div>

                      {/* Header */}
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight font-display">{app.name}</h3>
                      <p className="text-neutral-400 font-medium text-sm md:text-base mb-6 leading-relaxed">{app.shortDescription}</p>
                    </div>

                    {/* App Highlights / Tags */}
                    <div className="mt-8 flex flex-wrap gap-2">
                      {app.highlights.map((tag, idx) => (
                        <span 
                          key={idx}
                          className="px-3 py-1 bg-white/[0.03] border border-white/5 rounded-full text-xs font-semibold text-neutral-400 group-hover:border-white/10 group-hover:text-neutral-300 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                  </div>
                </Tilt>
              </div>
            ))}
          </div>
        </section>

        {/* Philosophy Section */}
        <section id="philosophy" className="py-32 px-6 md:px-12 max-w-7xl mx-auto relative z-10 border-t border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5">
              <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-6">Our Philosophy</h2>
              <p className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight font-display">
                Privacy.<br/>Precision.<br/>Performance.
              </p>
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
              
              <div className="p-10 rounded-3xl bg-[#0a0a0c] border border-white/5 hover:border-white/10 transition-colors duration-500">
                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-6 text-violet-400">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">Absolute Privacy</h3>
                <p className="text-neutral-400 leading-relaxed font-medium text-sm">We believe your data belongs to you. Our applications run completely offline with local databases and no unnecessary cloud uploads.</p>
              </div>

              <div className="p-10 rounded-3xl bg-[#0a0a0c] border border-white/5 hover:border-white/10 transition-colors duration-500">
                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-6 text-cyan-400">
                  <Smartphone className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">Android Native</h3>
                <p className="text-neutral-400 leading-relaxed font-medium text-sm">We build and scale directly within the Android ecosystem, tailoring layouts to Material 3 guidelines and native rendering pipelines.</p>
              </div>

              <div className="p-10 rounded-3xl bg-[#0a0a0c] border border-white/5 hover:border-white/10 sm:col-span-2 transition-colors duration-500">
                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-6 text-fuchsia-400">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">Fluid Interaction Engines</h3>
                <p className="text-neutral-400 leading-relaxed font-medium text-sm max-w-2xl">
                  Aesthetics meets function. Every pixel is calculated to support heavy workloads—such as high FPS onionskin processing, camera projection mapping, and real-time edge outlines.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* Founders / The Minds Section */}
        <section id="minds" className="py-32 px-6 md:px-12 max-w-7xl mx-auto relative z-10 border-t border-white/5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-16 text-center">The Minds</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <div className="p-10 rounded-[2.5rem] bg-[#0a0a0c] border border-white/5 flex flex-col md:flex-row items-center md:items-start gap-8 hover:border-white/10 transition-colors duration-500">
              <div className="w-24 h-24 rounded-full bg-gradient-to-b from-zinc-700 to-zinc-900 flex-shrink-0 overflow-hidden border border-white/10 relative flex items-center justify-center">
                <span className="text-3xl font-extrabold text-neutral-400 font-display">P</span>
              </div>
              <div className="text-center md:text-left flex-grow">
                <h3 className="text-2xl font-bold text-white mb-1 tracking-tight font-display">Pramith</h3>
                <p className="text-neutral-400 font-medium text-sm mb-4">Founder & Developer</p>
                <p className="text-neutral-500 text-sm leading-relaxed mb-5">Architecting native mobile systems with clean code, modern architectures, and highly polished rendering features.</p>
                <a 
                  href="mailto:pramith303@gmail.com" 
                  className="inline-flex items-center gap-2 text-xs font-bold text-neutral-300 hover:text-white transition-colors"
                >
                  <Mail size={14} /> pramith303@gmail.com
                </a>
              </div>
            </div>

            <div className="p-10 rounded-[2.5rem] bg-[#0a0a0c] border border-white/5 flex flex-col md:flex-row items-center md:items-start gap-8 hover:border-white/10 transition-colors duration-500">
              <div className="w-24 h-24 rounded-full bg-gradient-to-b from-zinc-700 to-zinc-900 flex-shrink-0 overflow-hidden border border-white/10 relative flex items-center justify-center">
                <span className="text-3xl font-extrabold text-neutral-400 font-display">A</span>
              </div>
              <div className="text-center md:text-left flex-grow">
                <h3 className="text-2xl font-bold text-white mb-1 tracking-tight font-display">Abhiram</h3>
                <p className="text-neutral-400 font-medium text-sm mb-4">Founder & Developer</p>
                <p className="text-neutral-500 text-sm leading-relaxed mb-5">Driving target goals, product operations, and strategic scaling of the Horizon ecosystem.</p>
                <a 
                  href="mailto:abhiramts2004@gmail.com" 
                  className="inline-flex items-center gap-2 text-xs font-bold text-neutral-300 hover:text-white transition-colors"
                >
                  <Mail size={14} /> abhiramts2004@gmail.com
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-40 px-6 md:px-12 border-t border-white/5 relative z-10 bg-zinc-900/[0.05]">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-16 text-white font-display">Let's Connect.</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 md:gap-16">
              
              <a 
                href="mailto:pramith303@gmail.com" 
                className="group flex items-center gap-4 px-6 py-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white hover:text-black transition-all duration-300 w-full sm:w-auto justify-center"
              >
                <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="font-semibold text-sm">pramith303@gmail.com</span>
              </a>

              <a 
                href="mailto:abhiramts2004@gmail.com" 
                className="group flex items-center gap-4 px-6 py-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white hover:text-black transition-all duration-300 w-full sm:w-auto justify-center"
              >
                <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="font-semibold text-sm">abhiramts2004@gmail.com</span>
              </a>

            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 relative z-10 bg-[#050505] text-center text-xs text-neutral-500 font-medium">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Horizon Builds. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="https://play.google.com/store/apps/dev?id=5255794692438174290" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Developer Profile</a>
            <span className="text-neutral-800">|</span>
            <span className="text-neutral-500">Built Natively for Android</span>
          </div>
        </div>
      </footer>

      {/* App Detail Modal */}
      <AnimatePresence>
        {selectedApp && (
          <AppModal app={selectedApp} onClose={() => setSelectedApp(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}