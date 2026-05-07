import './CategoryChart.css';
import { toMonthly, CATEGORY_LABELS, CATEGORY_COLORS } from '../../lib/constants.js';

export default function CategoryChart({ subscriptions }) {
  const active = subscriptions.filter(s => s.status === 'active');

  const totals = active.reduce((acc, s) => {
    acc[s.category] = (acc[s.category] || 0) + toMonthly(s.price, s.frequency);
    return acc;
  }, {});

  const total = Object.values(totals).reduce((a, b) => a + b, 0);

  if (total === 0) {
    return (
      <div className="category-chart-card">
        <h3 className="category-chart-title">Spend by Category</h3>
        <div className="category-chart-empty">No active subscriptions yet.</div>
      </div>
    );
  }

  // Build conic-gradient stops
  let angle = 0;
  const segments = Object.entries(totals).map(([cat, amount]) => {
    const pct = (amount / total) * 100;
    const seg = { cat, amount, pct, start: angle, color: CATEGORY_COLORS[cat] };
    angle += pct;
    return seg;
  });

  const gradient = segments
    .map(s => `${s.color} ${s.start.toFixed(2)}% ${(s.start + s.pct).toFixed(2)}%`)
    .join(', ');

  return (
    <div className="category-chart-card">
      <h3 className="category-chart-title">Spend by Category</h3>

      <div className="category-chart-body">
        {/* Donut */}
        <div className="donut-wrap">
          <div
            className="donut"
            style={{ background: `conic-gradient(${gradient})` }}
          />
          <div className="donut-center">
            <span className="donut-total">${total.toFixed(0)}</span>
            <span className="donut-label">/mo</span>
          </div>
        </div>

        {/* Legend */}
        <div className="category-legend">
          {segments.map(({ cat, amount, pct, color }) => (
            <div className="legend-row" key={cat}>
              <span className="legend-dot" style={{ background: color }} />
              <span className="legend-name">{CATEGORY_LABELS[cat]}</span>
              <span className="legend-pct">{pct.toFixed(0)}%</span>
              <span className="legend-amount">${amount.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
