import LpStepCard from './LpStepCard';

export default function LpHowItWorks() {
  return (
    <section className="lp-how" id="how">
      <div className="lp-container">
        <div className="lp-how-header">
          <span className="lp-section-label">How it works</span>
          <h2 className="lp-section-h">Up and running in minutes</h2>
          <p className="lp-section-sub lp-center">
            No bank access. No imports. No integrations required.
            You add what you pay for — Subscription Tracker handles the rest.
          </p>
        </div>
        <div className="lp-steps-grid">
          <LpStepCard number="1" numBg="rgba(59,130,246,0.12)"  numColor="#3b82f6" title="Create a free account"   description="Sign up with your email in under 30 seconds. No payment info, no trial expiry — your dashboard is ready immediately." />
          <LpStepCard number="2" numBg="rgba(16,185,129,0.12)"  numColor="#10b981" title="Add your subscriptions"  description="Name, price, billing cycle, renewal date. Takes about 10 seconds per subscription. Add as many as you need." />
          <LpStepCard number="3" numBg="rgba(168,85,247,0.12)"  numColor="#a855f7" title="Stay in control"         description="Renewal reminders land before you're charged. Use the analytics to spot waste. Cancel anything in one click." />
        </div>
      </div>
    </section>
  );
}
