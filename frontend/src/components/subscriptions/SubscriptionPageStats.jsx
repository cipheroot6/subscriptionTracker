import './SubscriptionPageStats.css';

const toMonthly = (price, frequency) => {
  const map = { daily: 30, weekly: 4.33, monthly: 1, yearly: 1/12 };
  return price * (map[frequency] || 1);
};

export default function SubscriptionPageStats({ subscriptions }) {
  const active   = subscriptions.filter(s => s.status === 'active').length;
  const canceled = subscriptions.filter(s => s.status === 'canceled').length;
  const expired  = subscriptions.filter(s => s.status === 'expired').length;
  const monthly  = subscriptions
    .filter(s => s.status === 'active')
    .reduce((sum, s) => sum + toMonthly(s.price, s.frequency), 0);

  const stats = [
    { label: 'Total', value: subscriptions.length, color: '#94a3b8' },
    { label: 'Active', value: active, color: '#10b981' },
    { label: 'Canceled', value: canceled, color: '#64748b' },
    { label: 'Expired', value: expired, color: '#ef4444' },
    { label: 'Monthly spend', value: `$${monthly.toFixed(2)}`, color: '#3b82f6' },
  ];

  return (
    <div className="sps-row">
      {stats.map(({ label, value, color }) => (
        <div className="sps-item" key={label}>
          <span className="sps-value" style={{ color }}>{value}</span>
          <span className="sps-label">{label}</span>
        </div>
      ))}
    </div>
  );
}
