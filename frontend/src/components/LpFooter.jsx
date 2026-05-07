import { Link } from 'react-router-dom';

export default function LpFooter() {
  return (
    <footer className="lp-footer">
      <div className="lp-container">
        <div className="lp-footer-inner">
          <div className="lp-footer-logo">
            <img src="/logo(1).png" alt="Subscription Tracker" className="lp-footer-logo-img" />
            <span className="lp-footer-name">Subscription Tracker</span>
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
  );
}