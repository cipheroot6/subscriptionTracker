import './CategoryBreakdown.css';

const toMonthly = (price, frequency) => {
  const map = { daily: 30, weekly: 4.33, monthly: 1, yearly: 1/12 };
  return price * (map[frequency] || 1);
};

const CATEGORY_COLORS = {
  sports: '#3b82f6', news: '#f59e0b', entertainment: '#ef4444',
  education: '#10b981', health: '#ec4899', other: '#6b7280',
};
const CATEGORY_LABELS = {
  sports:'Sports', news:'News', entertainment:'Entertainment',
  education:'Education', health:'Health', other:'Other',
};

export default function CategoryBreakdown({ subscriptions }) {
  const active = subscriptions.filter(s => s.status === 'active');
  const totals = active.reduce((acc, s) => {
    acc[s.category] = (acc[s.category] || 0) + toMonthly(s.price, s.frequency);
    return acc;
  }, {});
  const total = Object.values(totals).reduce((a, b) => a + b, 0);
  const segments = Object.entries(totals)
    .sort((a, b) => b[1] - a[1])
    .map(([cat, amount]) => ({ cat, amount, pct: total > 0 ? (amount / total) * 100 : 0 }));

  let angle = 0;
  const donutSegments = segments.map(s => {
    const seg = { ...s, start: angle, color: CATEGORY_COLORS[s.cat] || '#6b7280' };
    angle += s.pct;
    return seg;
  });

  const gradient = total === 0
    ? '#1e293b'
    : donutSegments.map(s => `${s.color} ${s.start.toFixed(2)}% ${(s.start + s.pct).toFixed(2)}%`).join(', ');

  const maxVal = segments[0]?.amount || 1;

  return (
    <div className="cbd-card">
      <h3 className="cbd-title">Spend by Category</h3>
      {total === 0 ? (
        <div className="cbd-empty">No active subscriptions.</div>
      ) : (
        <div className="cbd-body">
          {/* Donut */}
          <div className="cbd-donut-wrap">
            <div className="cbd-donut" style={{ background: `conic-gradient(${gradient})` }} />
            <div className="cbd-donut-center">
              <span className="cbd-donut-total">${total.toFixed(0)}</span>
              <span className="cbd-donut-label">/mo</span>
            </div>
          </div>

          {/* Bar breakdown */}
          <div className="cbd-bars">
            {segments.map(({ cat, amount, pct, color: _ }) => {
              const color = CATEGORY_COLORS[cat] || '#6b7280';
              const barPct = (amount / maxVal) * 100;
              return (
                <div className="cbd-bar-row" key={cat}>
                  <div className="cbd-bar-meta">
                    <span className="cbd-bar-dot" style={{ background: color }} />
                    <span className="cbd-bar-name">{CATEGORY_LABELS[cat]}</span>
                    <span className="cbd-bar-pct">{pct.toFixed(0)}%</span>
                    <span className="cbd-bar-amt">${amount.toFixed(2)}</span>
                  </div>
                  <div className="cbd-bar-track">
                    <div className="cbd-bar-fill" style={{ width: `${barPct}%`, background: color }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
