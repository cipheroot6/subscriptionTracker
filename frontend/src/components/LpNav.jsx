import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from './lp-icons';

export default function LpNav({ menuOpen, setMenuOpen }) {
  // prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* ── NAV ── */}
      <nav className="lp-nav">
        <div className="lp-nav-inner">
          {/* Logo */}
          <div className="lp-nav-logo">
            <img src="/logo(1).png" alt="Subscription Tracker" className="lp-nav-logo-img" />
            <span className="lp-nav-name">Subscription Tracker</span>
          </div>

          {/* Desktop links */}
          <div className="lp-nav-links">
            <a href="#features">Features</a>
            <a href="#analytics">Analytics</a>
            <a href="#how">How it works</a>
            <a href="#about">About</a>
          </div>

          {/* Desktop CTAs */}
          <div className="lp-nav-ctas lp-nav-ctas-desktop">
            <Link to="/sign-up" className="lp-nav-cta">Get started free</Link>
          </div>

          {/* Hamburger — mobile only */}
          <button
            className={`lp-hamburger${menuOpen ? ' lp-hamburger--open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span className="lp-ham-line lp-ham-line-1" />
            <span className="lp-ham-line lp-ham-line-2" />
            <span className="lp-ham-line lp-ham-line-3" />
          </button>
        </div>
      </nav>

      {/* ── FULLSCREEN MOBILE MENU ── */}
      <div className={`lp-mobile-menu${menuOpen ? ' lp-mobile-menu--open' : ''}`} aria-hidden={!menuOpen}>
        <div className="lp-mobile-menu-inner">
          {/* top row */}
          <div className="lp-mobile-menu-top">
            <div className="lp-nav-logo">
              <img src="/logo(1).png" alt="Subscription Tracker" className="lp-nav-logo-img" />
              <span className="lp-nav-name">Subscription Tracker</span>
            </div>
            <button className="lp-mobile-close" onClick={closeMenu} aria-label="Close menu">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* nav links */}
          <nav className="lp-mobile-nav">
            {[
              { href: '#features',  label: 'Features'      },
              { href: '#analytics', label: 'Analytics'     },
              { href: '#how',       label: 'How it works'  },
              { href: '#about',     label: 'About'         },
            ].map(({ href, label }, i) => (
              <a
                key={href}
                href={href}
                className="lp-mobile-nav-link"
                style={{ animationDelay: menuOpen ? `${i * 60 + 100}ms` : '0ms' }}
                onClick={closeMenu}
              >
                {label}
                <span className="lp-mobile-nav-arrow">→</span>
              </a>
            ))}
          </nav>

          {/* CTAs */}
          <div className="lp-mobile-menu-ctas">
            <Link to="/sign-up" className="lp-btn-primary lp-mobile-cta-primary" onClick={closeMenu}>
              Get started free <ArrowRightIcon />
            </Link>
          </div>

          {/* bottom note */}
          <p className="lp-mobile-menu-note">No payment info. Free to use.</p>
        </div>
      </div>
    </>
  );
}
