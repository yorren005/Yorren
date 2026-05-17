'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const pathname = usePathname();
  const navLinksRef = useRef(null);
  const activeBgRef = useRef(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/blog', label: 'Blog' },
  ];

  useEffect(() => {
    // Desktop sliding background logic
    const moveNavBg = (el) => {
      if (!el || !activeBgRef.current || !navLinksRef.current || window.innerWidth < 768) return;
      const rect = el.getBoundingClientRect();
      const parentRect = navLinksRef.current.getBoundingClientRect();
      gsap.to(activeBgRef.current, {
        left: rect.left - parentRect.left,
        width: rect.width,
        opacity: 1,
        duration: 0.4,
        ease: 'power3.out',
      });
    };

    const activeEl = navLinksRef.current?.querySelector('.active');
    if (activeEl) setTimeout(() => moveNavBg(activeEl), 100);

    const linkEls = navLinksRef.current?.querySelectorAll('a');
    const handleEnter = (e) => moveNavBg(e.currentTarget);
    const handleLeave = () => {
      if (window.innerWidth < 768) return;
      const active = navLinksRef.current?.querySelector('.active');
      if (active) moveNavBg(active);
      else gsap.to(activeBgRef.current, { opacity: 0, duration: 0.3 });
    };

    linkEls?.forEach((l) => l.addEventListener('mouseenter', handleEnter));
    navLinksRef.current?.addEventListener('mouseleave', handleLeave);

    return () => {
      linkEls?.forEach((l) => l.removeEventListener('mouseenter', handleEnter));
      navLinksRef.current?.removeEventListener('mouseleave', handleLeave);
    };
  }, [pathname]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="navbar">
      <div className="nav-container">
        <Link href="/" className="logo" aria-label="Yorren Home">
          <img src="/assets/logo-cropped.png" alt="Yorren" className="logo-img" />
        </Link>

        {/* Desktop Links */}
        <nav className="nav-links desktop-nav" ref={navLinksRef}>
          <div className="nav-active-bg" ref={activeBgRef} />
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href || (link.href === '/blog' && pathname.startsWith('/blog')) ? 'active' : ''}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="nav-cta">
          <ThemeToggle />
          <button className="pill-btn primary desktop-btn">
            GET STARTED{' '}
            <svg className="btn-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          
          {/* Mobile Hamburger Toggle */}
          <button 
            className={`hamburger-btn ${mobileMenuOpen ? 'open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile Fullscreen Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
        <nav className="mobile-nav-links">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href || (link.href === '/blog' && pathname.startsWith('/blog')) ? 'active' : ''}
            >
              {link.label}
            </Link>
          ))}
          <button className="pill-btn primary mt-8 w-full justify-center">
            GET STARTED
          </button>
        </nav>
      </div>
    </header>
  );
}
