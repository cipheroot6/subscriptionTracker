import './SummaryCards.css';
import { toMonthly } from '../../lib/constants.js';

const TrendUpIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const SubscriptionIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </svg>
);

const BellIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

function SkeletonCard() {
  return <div className="summary-card skeleton" />;
}

export default function SummaryCards({ subscriptions, loading }) {
  if (loading) {
    return (
      <div className="summary-cards">
        {[1, 2, 3, 4].map(i => <SkeletonCard key={i} />)}
      </div>
    );
  }

  const active = subscriptions.filter(s => s.status === 'active');
  const now = new Date();
  const in7 = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  const monthlySpend = active.reduce((sum, s) => sum + toMonthly(s.price, s.frequency), 0);
  const yearlySpend = monthlySpend * 12;
  const activeCount = active.length;
  const renewingSoon = active.filter(s => {
    const rd = new Date(s.renewalDate);
    return rd >= now && rd <= in7;
  }).length;

  const cards = [
    {
      label: 'Monthly Spend',
      value: `$${monthlySpend.toFixed(2)}`,
      icon: <TrendUpIcon />,
      accent: '#3b82f6',
      sub: 'across all active plans',
    },
    {
      label: 'Active Subscriptions',
      value: activeCount,
      icon: <SubscriptionIcon />,
      accent: '#10b981',
      sub: `${subscriptions.length} total`,
    },
    {
      label: 'Renewing Soon',
      value: renewingSoon,
      icon: <BellIcon />,
      accent: '#f59e0b',
      sub: 'within next 7 days',
    },
    {
      label: 'Yearly Spend',
      value: `$${yearlySpend.toFixed(2)}`,
      icon: <CalendarIcon />,
      accent: '#a855f7',
      sub: 'projected total',
    },
  ];

  return (
    <div className="summary-cards">
      {cards.map(({ label, value, icon, accent, sub }) => (
        <div className="summary-card" key={label}>
          <div className="summary-card-top">
            <span className="summary-card-label">{label}</span>
            <span className="summary-card-icon" style={{ color: accent, background: `${accent}14` }}>
              {icon}
            </span>
          </div>
          <span className="summary-card-value">{value}</span>
          <span className="summary-card-sub">{sub}</span>
        </div>
      ))}
    </div>
  );
}
