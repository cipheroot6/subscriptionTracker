import LpFeatureCard from './LpFeatureCard';
import { TrendUpIcon, BellIcon, ChartIcon, CreditCardIcon, CalendarIcon, ShieldIcon } from './lp-icons';

export default function LpFeatures() {
  return (
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
          <LpFeatureCard icon={<TrendUpIcon />}    iconBg="rgba(59,130,246,0.08)"  iconColor="#3b82f6" title="Live spending dashboard"   description="Monthly and yearly spend updated the moment you add or cancel. Summary cards, budget bar, and a 30-day renewal view all in one place." />
          <LpFeatureCard icon={<BellIcon />}        iconBg="rgba(245,158,11,0.08)"  iconColor="#f59e0b" title="Renewal reminders"          description="Automated reminders at 7, 5, 2, and 1 day before each subscription renews — so you can cancel before the charge hits." />
          <LpFeatureCard icon={<ChartIcon />}       iconBg="rgba(168,85,247,0.08)"  iconColor="#a855f7" title="Spending analytics"          description="Visual breakdown by category, billing cycle, and payment method. See your top subscriptions ranked by monthly cost." />
          <LpFeatureCard icon={<CreditCardIcon />}  iconBg="rgba(16,185,129,0.08)"  iconColor="#10b981" title="Budget tracking"             description="Set a monthly budget and watch your active subscriptions stack up against it. Colour-coded warning when you're close." />
          <LpFeatureCard icon={<CalendarIcon />}    iconBg="rgba(236,72,153,0.08)"  iconColor="#ec4899" title="Upcoming renewals view"       description="A forward-looking 30-day timeline of everything renewing. Colour-coded by urgency — red for this week, green for later." />
          <LpFeatureCard icon={<ShieldIcon />}      iconBg="rgba(239,68,68,0.08)"   iconColor="#ef4444" title="Secure by default"            description="JWT-based auth, Arcjet rate limiting, and bot detection. Role-based access control. Your subscription data stays yours." />
        </div>
      </div>
    </section>
  );
}
