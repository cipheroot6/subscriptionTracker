import './AnalyticsSummaryRow.css';

const toMonthly = (price, frequency) => {
  const map = { daily: 30, weekly: 4.33, monthly: 1, yearly: 1/12 };
  return price * (map[frequency] || 1);
};

const CATEGORY_LABELS = { sports:'Sports', news:'News', entertainment:'Entertainment', education:'Education', health:'Health', other:'Other' };

export default function AnalyticsSummaryRow({ subscriptions }) {
  const active = subscriptions.filter(s => s.status === 'active');
  const monthly = active.reduce((sum, s) => sum + toMonthly(s.price, s.frequency), 0);

  const categoryTotals = active.reduce((acc, s) => {
    acc[s.category] = (acc[s.category] || 0) + toMonthly(s.price, s.frequency);
    return acc;
  }, {});
  const topCat = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];

  const mostExpensive = active.reduce((max, s) => {
    const m = toMonthly(s.price, s.frequency);
    return m > (max?.monthly || 0) ? { ...s, monthly: m } : max;
  }, null);

  const avgPerSub = active.length > 0 ? monthly / active.length : 0;

  const cards = [
    { label: 'Avg. per subscription', value: `$${avgPerSub.toFixed(2)}`, sub: 'monthly equivalent', accent: '#3b82f6' },
    { label: 'Top category', value: topCat ? CATEGORY_LABELS[topCat[0]] || topCat[0] : '—', sub: topCat ? `$${topCat[1].toFixed(2)}/mo` : 'no data', accent: '#a855f7' },
    { label: 'Most expensive', value: mostExpensive ? mostExpensive.name : '—', sub: mostExpensive ? `$${mostExpensive.monthly.toFixed(2)}/mo` : 'no data', accent: '#f59e0b' },
  ];

  return (
    <div className="asr-row">
      {cards.map(({ label, value, sub, accent }) => (
        <div className="asr-card" key={label}>
          <span className="asr-label">{label}</span>
          <span className="asr-value" style={{ color: accent }}>{value}</span>
          <span className="asr-sub">{sub}</span>
        </div>
      ))}
    </div>
  );
}
