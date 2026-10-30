import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { HorizonMark } from './ui';
import ThemeToggle from './ThemeToggle';

export default function Nav({ product }) {
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);
  const menuRef = useRef(null);
  const links = [
    { href: './', label: 'Home', current: !product },
    { href: './#apps', label: 'Our projects' },
    { href: './contact.html', label: 'Contact' },
  ];
  useEffect(() => {
    if (!open) return;
    const close = (event) => {
      if (event.type === 'keydown' && event.key === 'Escape') {
        setOpen(false);
        menuRef.current?.focus();
      } else if (event.type === 'pointerdown' && !navRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('keydown', close);
    document.addEventListener('pointerdown', close);
    return () => {
      document.removeEventListener('keydown', close);
      document.removeEventListener('pointerdown', close);
    };
  }, [open]);
  return (
    <header className="site-header" ref={navRef}>
      <nav className="site-shell nav-inner" aria-label="Main">
        <a href="./" className="brand" aria-label="Horizon Builds home"><HorizonMark className="w-8 h-8" /><span>Horizon <span className="text-mute">Builds</span></span></a>
        <div className="desktop-links">{links.map((link) => <a key={link.href} href={link.href} aria-current={link.current ? 'page' : undefined}>{link.label}</a>)}</div>
        <div className="nav-actions"><ThemeToggle /><button ref={menuRef} className="menu-toggle icon-button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>{open ? <X size={20} /> : <Menu size={20} />}</button></div>
      </nav>
      {open && <nav id="mobile-menu" className="mobile-menu site-shell" aria-label="Mobile">{links.map((link) => <a key={link.href} href={link.href} aria-current={link.current ? 'page' : undefined} onClick={() => setOpen(false)}>{link.label}</a>)}</nav>}
    </header>
  );
}
