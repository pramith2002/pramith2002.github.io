import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Mail } from 'lucide-react';
import { HorizonMark, Magnetic, Scribble, SplitWords, YouTubeIcon } from './ui';
import { DEV_PROFILE, YT_CHANNEL, arrowmio, otherApps, sketchflow } from '../data/apps';

export default function Contact() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const sunY = useTransform(scrollYProgress, [0, 1], ['60%', '0%']);
  const sunScale = useTransform(scrollYProgress, [0, 1], [0.7, 1]);

  return (
    <footer id="contact" ref={ref} className="relative overflow-hidden pt-28 md:pt-40">
      {/* Rising horizon sun */}
      <motion.div
        style={{ y: sunY, scale: sunScale }}
        className="absolute left-1/2 -translate-x-1/2 bottom-[-55vw] md:bottom-[-38vw] w-[140vw] md:w-[90vw] aspect-square rounded-full bg-gradient-to-b from-volt via-[#5dffb0] to-cyan opacity-25 blur-[60px] pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-10 text-center">
        <p className="font-hand text-3xl text-accent">got an idea? say hi ✎</p>
        <h2 className="mt-4 font-display font-extrabold tracking-[-0.04em] leading-[0.9] text-[clamp(3.25rem,12vw,10rem)]">
          <SplitWords text="Let's make" className="block" />
          <span className="relative inline-block">
            <SplitWords text="something." wordClassName="text-brand" delay={0.15} />
            <Scribble className="absolute left-[5%] -bottom-1 w-[90%] h-5 md:h-8" d="M4 18 C 80 4, 200 4, 296 16" delay={0.6} />
          </span>
        </h2>

        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4">
          {['pramith303@gmail.com', 'tsabhiram2004@gmail.com'].map((email) => (
            <Magnetic key={email} strength={0.2}>
              <a
                href={`mailto:${email}`}
                className="group inline-flex items-center gap-3 rounded-full bg-fg text-ink pl-2 pr-6 py-2 font-bold hover:bg-volt hover:text-on-accent transition-colors"
              >
                <span className="grid place-items-center w-10 h-10 rounded-full bg-ink text-fg group-hover:bg-ink group-hover:text-accent transition-colors">
                  <Mail size={18} />
                </span>
                {email}
              </a>
            </Magnetic>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="relative mt-28 md:mt-40 border-t border-fg/10 bg-ink/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-14 grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <a href="#top" className="inline-flex items-center gap-2 font-display text-2xl font-extrabold tracking-tight">
              <HorizonMark className="w-8 h-8 text-fg" /> Horizon<span className="text-mute font-semibold">Builds</span>
            </a>
            <p className="mt-4 text-mute max-w-sm">
              An indie mobile studio making creative and utility apps. Live on Android, coming soon to iOS.
            </p>
            <div className="mt-6 flex gap-3">
              <a href={DEV_PROFILE} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-fg/15 px-4 py-2 text-sm font-semibold hover:bg-fg/5">
                Google Play <ArrowUpRight size={14} />
              </a>
              <a href={YT_CHANNEL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-fg/15 px-4 py-2 text-sm font-semibold hover:bg-fg/5">
                <YouTubeIcon className="w-4 h-4" /> YouTube
              </a>
            </div>
          </div>

          <div className="md:col-span-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-mute">Apps</h3>
            <ul className="mt-4 space-y-2.5 font-semibold">
              {[sketchflow, ...otherApps].map((a) => (
                <li key={a.id}>
                  <a href={a.playStore} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">{a.name}</a>
                </li>
              ))}
              <li>
                <a href={arrowmio.playStore} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">{arrowmio.name}</a>
                <span className="ml-2 align-middle rounded-full bg-volt/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent">New</span>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-mute">Privacy</h3>
            <ul className="mt-4 space-y-2.5 font-semibold">
              {[sketchflow, ...otherApps, arrowmio].map((a) => (
                <li key={a.id}>
                  <a href={a.privacyUrl} className="hover:text-accent transition-colors">{a.shortName}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 pb-10 flex flex-col sm:flex-row justify-between gap-2 text-sm text-mute">
          <p>© {new Date().getFullYear()} Horizon Builds. All rights reserved.</p>
          <div className="flex flex-wrap gap-5"><a href="./contact.html" className="hover:text-accent transition-colors">Contact us &amp; support</a><p>Live on Android · Coming to iOS</p></div>
        </div>
      </div>
    </footer>
  );
}
