import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './landingPage.css';

// ── Icons ──────────────────────────────────────────────────────────────────────

const ChartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);
const BellIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);
const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const CreditCardIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" />
  </svg>
);
const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);
const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="11" height="11">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const TrendUpIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
  </svg>
);
const CodeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
    <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
  </svg>
);
const ExternalLinkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="13" height="13">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

// ── Desktop Mock Dashboard ─────────────────────────────────────────────────────

function MockDesktop() {
  const subs = [
    { name: 'Netflix',  initial: 'N', color: '#e50914', price: '$15.99', days: 3  },
    { name: 'Spotify',  initial: 'S', color: '#1db954', price: '$9.99',  days: 7  },
    { name: 'GitHub',   initial: 'G', color: '#6e40c9', price: '$4.00',  days: 12 },
    { name: 'Figma',    initial: 'F', color: '#f24e1e', price: '$12.00', days: 18 },
    { name: 'Linear',   initial: 'L', color: '#5e6ad2', price: '$8.00',  days: 24 },
  ];

  return (
    <div className="lp-mock-wrap lp-mock-desktop">
      <div className="lp-mock-bar">
        <span className="lp-mock-dot" style={{ background: '#ef4444' }} />
        <span className="lp-mock-dot" style={{ background: '#f59e0b' }} />
        <span className="lp-mock-dot" style={{ background: '#10b981' }} />
        <span className="lp-mock-url">subtracker.app / dashboard</span>
      </div>
      <div className="lp-mock-body">
        {/* Sidebar */}
        <div className="lp-mock-sidebar">
          <div className="lp-mock-logo-row">
            <img src="/logo(1).png" alt="SubTracker" className="lp-mock-logo-img" />
            <span className="lp-mock-logo-text">SubTracker</span>
          </div>
          {['Dashboard', 'Subscriptions', 'Analytics', 'Settings'].map((item, i) => (
            <div key={item} className={`lp-mock-nav-item${i === 0 ? ' active' : ''}`}>
              <div className="lp-mock-nav-icon" />
              <span>{item}</span>
            </div>
          ))}
        </div>
        {/* Main */}
        <div className="lp-mock-main">
          <div className="lp-mock-cards">
            {[
              { label: 'Monthly Spend', value: '$49.98', color: '#3b82f6' },
              { label: 'Active Subs',   value: '5',      color: '#10b981' },
              { label: 'Renewing Soon', value: '2',      color: '#f59e0b' },
              { label: 'Yearly Spend',  value: '$599',   color: '#a855f7' },
            ].map(({ label, value, color }) => (
              <div className="lp-mock-card" key={label}>
                <div className="lp-mock-card-label">{label}</div>
                <div className="lp-mock-card-value" style={{ color }}>{value}</div>
              </div>
            ))}
          </div>
          <div className="lp-mock-budget">
            <div className="lp-mock-budget-top">
              <span className="lp-mock-budget-label">Monthly Budget</span>
              <span className="lp-mock-budget-pct" style={{ color: '#f59e0b' }}>62%</span>
            </div>
            <div className="lp-mock-budget-meta">$49.98 <span>of $80.00 budget</span></div>
            <div className="lp-mock-budget-track">
              <div className="lp-mock-budget-fill" />
            </div>
          </div>
          <div className="lp-mock-section-title">Upcoming Renewals</div>
          <div className="lp-mock-sub-list">
            {subs.map((sub) => {
              const chipColor = sub.days <= 3 ? '#ef4444' : sub.days <= 7 ? '#f59e0b' : '#10b981';
              return (
                <div className="lp-mock-sub-row" key={sub.name}>
                  <div className="lp-mock-sub-icon" style={{ background: `${sub.color}15`, border: `1px solid ${sub.color}28` }}>
                    <span style={{ color: sub.color }}>{sub.initial}</span>
                  </div>
                  <div className="lp-mock-sub-info">
                    <span className="lp-mock-sub-name">{sub.name}</span>
                    <span className="lp-mock-sub-price">{sub.price}/mo</span>
                  </div>
                  <div className="lp-mock-chip" style={{ background: `${chipColor}15`, color: chipColor, border: `1px solid ${chipColor}30` }}>
                    {sub.days}d
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Mobile Mock (portrait phone screenshot) ────────────────────────────────────

function MockMobile() {
  const subs = [
    { name: 'Netflix',  initial: 'N', color: '#e50914', price: '$15.99', days: 3  },
    { name: 'Spotify',  initial: 'S', color: '#1db954', price: '$9.99',  days: 7  },
    { name: 'GitHub',   initial: 'G', color: '#6e40c9', price: '$4.00',  days: 12 },
    { name: 'Figma',    initial: 'F', color: '#f24e1e', price: '$12.00', days: 18 },
  ];

  return (
    <div className="lp-mock-phone-frame">
      {/* phone top notch area */}
      <div className="lp-phone-top">
        <div className="lp-phone-notch" />
      </div>

      {/* app content */}
      <div className="lp-phone-content">
        {/* mobile header */}
        <div className="lp-phone-header">
          <div className="lp-phone-header-left">
            <img src="/logo(1).png" alt="SubTracker" className="lp-phone-logo-img" />
            <span className="lp-phone-logo-text">SubTracker</span>
          </div>
          <div className="lp-phone-header-right">
            <span className="lp-phone-greeting">Dashboard</span>
          </div>
        </div>

        {/* summary cards 2x2 */}
        <div className="lp-phone-cards">
          {[
            { label: 'Monthly Spend', value: '$49.98', color: '#3b82f6' },
            { label: 'Active Subs',   value: '5',      color: '#10b981' },
            { label: 'Renewing Soon', value: '2',      color: '#f59e0b' },
            { label: 'Yearly Spend',  value: '$599',   color: '#a855f7' },
          ].map(({ label, value, color }) => (
            <div className="lp-phone-card" key={label}>
              <div className="lp-phone-card-label">{label}</div>
              <div className="lp-phone-card-value" style={{ color }}>{value}</div>
            </div>
          ))}
        </div>

        {/* budget */}
        <div className="lp-phone-budget">
          <div className="lp-phone-budget-row">
            <span className="lp-phone-budget-label">Monthly Budget</span>
            <span style={{ color: '#f59e0b', fontSize: '0.625rem', fontWeight: 600 }}>62%</span>
          </div>
          <div className="lp-phone-budget-amount">$49.98 <span>of $80.00</span></div>
          <div className="lp-phone-budget-track">
            <div className="lp-phone-budget-fill" />
          </div>
        </div>

        {/* renewals */}
        <div className="lp-phone-section-title">Upcoming Renewals</div>
        <div className="lp-phone-sub-list">
          {subs.map((sub) => {
            const chipColor = sub.days <= 3 ? '#ef4444' : sub.days <= 7 ? '#f59e0b' : '#10b981';
            return (
              <div className="lp-phone-sub-row" key={sub.name}>
                <div className="lp-phone-sub-icon" style={{ background: `${sub.color}15`, border: `1px solid ${sub.color}28` }}>
                  <span style={{ color: sub.color }}>{sub.initial}</span>
                </div>
                <div className="lp-phone-sub-info">
                  <span className="lp-phone-sub-name">{sub.name}</span>
                  <span className="lp-phone-sub-price">{sub.price}/mo</span>
                </div>
                <div className="lp-phone-chip" style={{ background: `${chipColor}15`, color: chipColor, border: `1px solid ${chipColor}30` }}>
                  {sub.days}d
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* bottom home indicator */}
      <div className="lp-phone-bottom">
        <div className="lp-phone-home-bar" />
      </div>
    </div>
  );
}

// ── Analytics Preview ──────────────────────────────────────────────────────────

function AnalyticsPreview() {
  const categories = [
    { label: 'Entertainment', pct: 52, color: '#ef4444', amount: '$25.99' },
    { label: 'Dev Tools',     pct: 31, color: '#a855f7', amount: '$15.99' },
    { label: 'Music',         pct: 17, color: '#10b981', amount: '$8.00'  },
  ];
  const bars = [
    { label: 'Entertainment', pct: 100, color: '#ef4444', val: '$25.99' },
    { label: 'Dev Tools',     pct: 61,  color: '#a855f7', val: '$15.99' },
    { label: 'Music',         pct: 31,  color: '#10b981', val: '$8.00'  },
  ];

  return (
    <div className="lp-analytics-card">
      <div className="lp-ac-header">
        <div>
          <div className="lp-ac-title">Spend by Category</div>
          <div className="lp-ac-sub">Monthly · active subscriptions</div>
        </div>
        <div className="lp-ac-total">$49.98<span>/mo</span></div>
      </div>
      <div className="lp-donut-area">
        <div className="lp-donut-wrap">
          <svg viewBox="0 0 36 36" className="lp-donut-svg">
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="#1a1a1e" strokeWidth="3.8" />
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="#ef4444" strokeWidth="3.8"
              strokeDasharray="32.7 67.3" strokeDashoffset="25" strokeLinecap="round" />
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="#a855f7" strokeWidth="3.8"
              strokeDasharray="19.5 80.5" strokeDashoffset="-7.7" strokeLinecap="round" />
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="#10b981" strokeWidth="3.8"
              strokeDasharray="10.7 89.3" strokeDashoffset="-27.2" strokeLinecap="round" />
          </svg>
          <div className="lp-donut-center">
            <span className="lp-donut-val">$50</span>
            <span className="lp-donut-unit">/mo</span>
          </div>
        </div>
        <div className="lp-donut-legend">
          {categories.map(({ label, color, pct, amount }) => (
            <div className="lp-legend-row" key={label}>
              <span className="lp-legend-dot" style={{ background: color }} />
              <span className="lp-legend-name">{label}</span>
              <span className="lp-legend-pct">{pct}%</span>
              <span className="lp-legend-amount">{amount}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="lp-bars-title">Monthly spend per category</div>
      <div className="lp-bars">
        {bars.map(({ label, pct, color, val }) => (
          <div className="lp-bar-row" key={label}>
            <div className="lp-bar-meta">
              <span className="lp-bar-label">{label}</span>
              <span className="lp-bar-val">{val}</span>
            </div>
            <div className="lp-bar-track">
              <div className="lp-bar-fill" style={{ width: `${pct}%`, background: color }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function FeatureCard({ icon, iconBg, iconColor, title, description }) {
  return (
    <div className="lp-feature-card">
      <div className="lp-feature-icon" style={{ background: iconBg, border: `1px solid ${iconColor}28`, color: iconColor }}>
        {icon}
      </div>
      <h3 className="lp-feature-title">{title}</h3>
      <p className="lp-feature-desc">{description}</p>
    </div>
  );
}

function StepCard({ number, numBg, numColor, title, description }) {
  return (
    <div className="lp-step-card">
      <div className="lp-step-num" style={{ background: numBg, color: numColor }}>{number}</div>
      <h3 className="lp-step-title">{title}</h3>
      <p className="lp-step-desc">{description}</p>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────

export default function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);

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
    <div className="lp-page">

      {/* ── NAV ── */}
      <nav className="lp-nav">
        <div className="lp-nav-inner">
          {/* Logo */}
          <div className="lp-nav-logo">
            <img src="/logo(1).png" alt="SubTracker" className="lp-nav-logo-img" />
            <span className="lp-nav-name">SubTracker</span>
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
            <Link to="/sign-in" className="lp-nav-signin">Sign in</Link>
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
              <img src="/logo(1).png" alt="SubTracker" className="lp-nav-logo-img" />
              <span className="lp-nav-name">SubTracker</span>
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
            <Link to="/sign-in" className="lp-btn-ghost lp-mobile-cta-ghost" onClick={closeMenu}>
              Sign in to your account
            </Link>
          </div>

          {/* bottom note */}
          <p className="lp-mobile-menu-note">No payment info. Free to use.</p>
        </div>
      </div>

      {/* ── HERO ── */}
      <section className="lp-hero">
        <div className="lp-hero-grid" aria-hidden="true" />
        <div className="lp-hero-glow" aria-hidden="true" />

        <div className="lp-hero-content">
          <div className="lp-hero-eyebrow">
            <span className="lp-eyebrow-dot" />
            Free to use · No credit card required
          </div>
          <h1 className="lp-hero-h1">
            Stop losing money to<br />
            <span className="lp-hero-gradient">forgotten subscriptions</span>
          </h1>
          <p className="lp-hero-sub">
            SubTracker gives you a single, clear view of every subscription you pay for —
            with renewal alerts, spending analytics, and budget tracking built right in.
          </p>
          <div className="lp-hero-actions">
            <Link to="/sign-up" className="lp-btn-primary">
              Start tracking for free <ArrowRightIcon />
            </Link>
            <Link to="/sign-in" className="lp-btn-ghost">Sign in to your account</Link>
          </div>
        </div>

        {/* Dual mock — desktop shown on large screens, phone on mobile */}
        <div className="lp-hero-visual">
          <div className="lp-hero-visual-desktop">
            <MockDesktop />
          </div>
          <div className="lp-hero-visual-mobile">
            <MockMobile />
          </div>
        </div>
      </section>

      {/* ── PROOF STRIP ── */}
      <div className="lp-proof-strip">
        <div className="lp-container">
          <div className="lp-proof-grid">
            {[
              { val: '$200+', label: 'avg. saved per year'       },
              { val: '5 min', label: 'to set up your dashboard'  },
              { val: '100%',  label: 'your data, always'         },
              { val: '0',     label: 'annoying upsells'          },
            ].map(({ val, label }) => (
              <div className="lp-proof-stat" key={label}>
                <span className="lp-proof-val">{val}</span>
                <span className="lp-proof-label">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── PROBLEM ── */}
      <section className="lp-problem">
        <div className="lp-container">
          <div className="lp-problem-grid">
            <div className="lp-problem-left">
              <span className="lp-section-label">The problem</span>
              <h2 className="lp-section-h">
                You're paying for things<br />you don't even remember
              </h2>
              <p className="lp-section-sub">
                The average person pays for 3–4 subscriptions they've completely forgotten about.
                They silently drain your account every single month.
              </p>
              <div className="lp-problem-points">
                {[
                  { color: '#ef4444', text: "Free trials auto-renew and you don't notice until the statement arrives." },
                  { color: '#f59e0b', text: "Renewal dates are scattered across email threads you'll never search for." },
                  { color: '#a855f7', text: "You have no clear picture of what you're actually spending each month." },
                ].map(({ color, text }, i) => (
                  <div className="lp-problem-point" key={i}>
                    <div className="lp-problem-bullet" style={{ background: `${color}10`, border: `1px solid ${color}25` }}>
                      <div style={{ width: 7, height: 7, borderRadius: '50%', background: color }} />
                    </div>
                    <p>{text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lp-problem-right">
              <div className="lp-receipt-card">
                <div className="lp-receipt-title">This month's silent charges</div>
                {[
                  { name: 'Adobe Creative Cloud', meta: 'Annual plan auto-renewed',    amount: '$54.99', forgotten: true  },
                  { name: 'LinkedIn Premium',      meta: 'Monthly · been 8 months',    amount: '$39.99', forgotten: true  },
                  { name: 'Dropbox Plus',          meta: 'Annual · still using it',    amount: '$11.99', forgotten: false },
                  { name: 'Duolingo Super',        meta: 'Monthly · last opened: ???', amount: '$6.99',  forgotten: true  },
                ].map(({ name, meta, amount, forgotten }) => (
                  <div className="lp-receipt-row" key={name}>
                    <div>
                      <div className="lp-receipt-name">{name}</div>
                      <div className="lp-receipt-meta">{meta}</div>
                    </div>
                    <div className="lp-receipt-right">
                      <div className={`lp-receipt-amount${forgotten ? ' forgotten' : ''}`}>{amount}</div>
                      {forgotten && <div className="lp-receipt-tag">forgotten</div>}
                    </div>
                  </div>
                ))}
                <div className="lp-receipt-total">
                  <span className="lp-receipt-total-label">Wasted this month</span>
                  <div>
                    <div className="lp-receipt-total-val">$101.97</div>
                    <div className="lp-receipt-saving">SubTracker would've caught this</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="lp-features" id="features">
        <div className="lp-container">
          <div className="lp-features-header">
            <span className="lp-section-label">What you get</span>
            <h2 className="lp-section-h">Everything you need.<br />Nothing you don't.</h2>
            <p className="lp-section-sub lp-center">
              Built specifically for subscription management — not a generic note app or spreadsheet with tracking bolted on.
            </p>
          </div>
          <div className="lp-feature-grid">
            <FeatureCard icon={<TrendUpIcon />}    iconBg="rgba(59,130,246,0.08)"  iconColor="#3b82f6" title="Live spending dashboard"   description="Monthly and yearly spend updated the moment you add or cancel. Summary cards, budget bar, and a 30-day renewal view all in one place." />
            <FeatureCard icon={<BellIcon />}        iconBg="rgba(245,158,11,0.08)"  iconColor="#f59e0b" title="Renewal reminders"          description="Automated reminders at 7, 5, 2, and 1 day before each subscription renews — so you can cancel before the charge hits." />
            <FeatureCard icon={<ChartIcon />}       iconBg="rgba(168,85,247,0.08)"  iconColor="#a855f7" title="Spending analytics"          description="Visual breakdown by category, billing cycle, and payment method. See your top subscriptions ranked by monthly cost." />
            <FeatureCard icon={<CreditCardIcon />}  iconBg="rgba(16,185,129,0.08)"  iconColor="#10b981" title="Budget tracking"             description="Set a monthly budget and watch your active subscriptions stack up against it. Colour-coded warning when you're close." />
            <FeatureCard icon={<CalendarIcon />}    iconBg="rgba(236,72,153,0.08)"  iconColor="#ec4899" title="Upcoming renewals view"       description="A forward-looking 30-day timeline of everything renewing. Colour-coded by urgency — red for this week, green for later." />
            <FeatureCard icon={<ShieldIcon />}      iconBg="rgba(239,68,68,0.08)"   iconColor="#ef4444" title="Secure by default"            description="JWT-based auth, Arcjet rate limiting, and bot detection. Role-based access control. Your subscription data stays yours." />
          </div>
        </div>
      </section>

      {/* ── ANALYTICS ── */}
      <section className="lp-analytics" id="analytics">
        <div className="lp-container">
          <div className="lp-analytics-grid">
            <div className="lp-analytics-left">
              <span className="lp-section-label">Analytics</span>
              <h2 className="lp-section-h">Insights that actually mean something</h2>
              <p className="lp-section-sub" style={{ marginBottom: '2rem' }}>
                Not just a table of numbers. A set of visual charts designed to answer
                the questions you actually care about.
              </p>
              <div className="lp-analytics-points">
                {[
                  { title: 'Category breakdown',  desc: 'Donut chart of where your money goes — entertainment, dev tools, health, education and more.' },
                  { title: 'Top subscriptions',   desc: "Ranked by monthly cost with each one's share of your total spend shown as a visual bar." },
                  { title: 'Payment method view', desc: 'See exactly how much is charged to each card or payment method every month.' },
                  { title: 'Status distribution', desc: 'Visual split of active vs. canceled vs. expired subscriptions across your whole account.' },
                ].map(({ title, desc }) => (
                  <div className="lp-analytics-point" key={title}>
                    <div className="lp-analytics-check"><CheckIcon /></div>
                    <div>
                      <h4>{title}</h4>
                      <p>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lp-analytics-right">
              <AnalyticsPreview />
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="lp-how" id="how">
        <div className="lp-container">
          <div className="lp-how-header">
            <span className="lp-section-label">How it works</span>
            <h2 className="lp-section-h">Up and running in minutes</h2>
            <p className="lp-section-sub lp-center">
              No bank access. No imports. No integrations required.
              You add what you pay for — SubTracker handles the rest.
            </p>
          </div>
          <div className="lp-steps-grid">
            <StepCard number="1" numBg="rgba(59,130,246,0.12)"  numColor="#3b82f6" title="Create a free account"   description="Sign up with your email in under 30 seconds. No payment info, no trial expiry — your dashboard is ready immediately." />
            <StepCard number="2" numBg="rgba(16,185,129,0.12)"  numColor="#10b981" title="Add your subscriptions"  description="Name, price, billing cycle, renewal date. Takes about 10 seconds per subscription. Add as many as you need." />
            <StepCard number="3" numBg="rgba(168,85,247,0.12)"  numColor="#a855f7" title="Stay in control"         description="Renewal reminders land before you're charged. Use the analytics to spot waste. Cancel anything in one click." />
          </div>
        </div>
      </section>

      {/* ── ABOUT / HIRE ME ── */}
      <section className="lp-about" id="about">
        <div className="lp-container">
          <div className="lp-about-card">
            <div className="lp-about-left">
              <div className="lp-about-tag">
                <CodeIcon /> Built by a developer
              </div>
              <h2 className="lp-about-h">Need something built like this?</h2>
              <p className="lp-about-p">
                SubTracker is a production-grade full-stack application — React + Vite frontend,
                Express.js backend, MongoDB, JWT auth, background workflows, and security middleware —
                deployed on Vercel. No tutorials followed, no boilerplate copied.
              </p>
              <p className="lp-about-p">
                I build clean, fast, maintainable web apps. If you have a product idea
                or need a developer who can take it from zero to shipped, let's talk.
              </p>

              <div className="lp-stack-list">
                {[
                  { label: 'Frontend', pills: ['React', 'Vite', 'CSS Modules'],            color: 'blue'   },
                  { label: 'Backend',  pills: ['Node.js', 'Express', 'MongoDB'],            color: 'green'  },
                  { label: 'Infra',    pills: ['Vercel', 'JWT Auth', 'Upstash', 'Arcjet'],  color: 'purple' },
                ].map(({ label, pills, color }) => (
                  <div key={label} className="lp-stack-row">
                    <span className="lp-stack-label">{label}</span>
                    <div className="lp-stack-pills">
                      {pills.map((p) => (
                        <span key={p} className={`lp-stack-pill ${color}`}>{p}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="lp-about-ctas">
                <a href="mailto:hello@example.com" className="lp-btn-primary lp-btn-sm">
                  Get in touch <ExternalLinkIcon />
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="lp-btn-ghost lp-btn-sm">
                  View on GitHub
                </a>
              </div>
            </div>

            <div className="lp-about-right">
              <div className="lp-skills-card">
                <div className="lp-skills-title">What I can build for you</div>
                <div className="lp-skills-list">
                  {[
                    'SaaS web applications end-to-end',
                    'REST APIs & backend services',
                    'Authentication & user management',
                    'Admin dashboards & analytics',
                    'Real-time features & notifications',
                    'Database design & optimisation',
                    'Deployment pipelines (Vercel / Railway)',
                    'Performance & security reviews',
                  ].map((item) => (
                    <div className="lp-skill-item" key={item}>
                      <div className="lp-skill-check"><CheckIcon /></div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="lp-cta">
        <div className="lp-cta-glow" aria-hidden="true" />
        <div className="lp-container lp-cta-inner">
          <h2 className="lp-cta-h">
            Take five minutes.<br />
            <span className="lp-hero-gradient">Know exactly what you pay.</span>
          </h2>
          <p className="lp-cta-sub">
            Add your subscriptions once. SubTracker keeps track so you don't have to.
          </p>
          <Link to="/sign-up" className="lp-btn-primary lp-btn-lg">
            Create your free account <ArrowRightIcon />
          </Link>
          <p className="lp-cta-note">No payment info · Free to use · Takes 2 minutes</p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="lp-footer">
        <div className="lp-container">
          <div className="lp-footer-inner">
            <div className="lp-footer-logo">
              <img src="/logo(1).png" alt="SubTracker" className="lp-footer-logo-img" />
              <span className="lp-footer-name">SubTracker</span>
            </div>
            <p className="lp-footer-copy">
              Built with React, Express &amp; MongoDB · Deployed on Vercel
            </p>
            <div className="lp-footer-links">
              <Link to="/sign-up">Sign up</Link>
              <Link to="/sign-in">Sign in</Link>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
