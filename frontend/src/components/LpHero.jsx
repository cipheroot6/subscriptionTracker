import { Link } from 'react-router-dom';
import { ArrowRightIcon } from './lp-icons';
import LpMockDesktop from './LpMockDesktop';
import LpMockMobile from './LpMockMobile';

export default function LpHero() {
  return (
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
          Subscription Tracker gives you a single, clear view of every subscription you pay for —
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
          <LpMockDesktop />
        </div>
        <div className="lp-hero-visual-mobile">
          <LpMockMobile />
        </div>
      </div>
    </section>
  );
}
