import { Link } from 'react-router-dom';
import { ArrowRightIcon } from './lp-icons';

export default function LpCta() {
  return (
    <section className="lp-cta">
      <div className="lp-cta-glow" aria-hidden="true" />
      <div className="lp-container lp-cta-inner">
        <h2 className="lp-cta-h">
          Take five minutes.<br />
          <span className="lp-hero-gradient">Know exactly what you pay.</span>
        </h2>
        <p className="lp-cta-sub">
          Add your subscriptions once. Subscription Tracker keeps track so you don't have to.
        </p>
        <Link to="/sign-up" className="lp-btn-primary lp-btn-lg">
          Create your free account <ArrowRightIcon />
        </Link>
        <p className="lp-cta-note">No payment info · Free to use · Takes 2 minutes</p>
      </div>
    </section>
  );
}
