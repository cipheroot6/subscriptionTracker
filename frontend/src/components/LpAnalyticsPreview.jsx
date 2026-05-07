export default function LpAnalyticsPreview() {
  const categories = [
    { label: 'Entertainment', pct: 52, color: '#ef4444', amount: '$25.99' },
    { label: 'Dev Tools',     pct: 31, color: '#a855f7', amount: '$15.99' },
    { label: 'Music',         pct: 17, color: '#10b981', amount: '$8.00'  },
  ];
  const bars = [
    { label: 'Entertainment', pct: 100, color: '#ef4444', val: '$25.99' },
    { label: 'Dev Tools',     pct: 61,  color: '#a855f7', val: '$15.99' },
    { label: 'Music',         pct: 31,  color: '#10b981', val: '$8.00'  },
  ];

  return (
    <div className="lp-analytics-card">
      <div className="lp-ac-header">
        <div>
          <div className="lp-ac-title">Spend by Category</div>
          <div className="lp-ac-sub">Monthly · active subscriptions</div>
        </div>
        <div className="lp-ac-total">$49.98<span>/mo</span></div>
      </div>
      <div className="lp-donut-area">
        <div className="lp-donut-wrap">
          <svg viewBox="0 0 36 36" className="lp-donut-svg">
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="#1a1a1e" strokeWidth="3.8" />
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="#ef4444" strokeWidth="3.8"
              strokeDasharray="32.7 67.3" strokeDashoffset="25" strokeLinecap="round" />
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="#a855f7" strokeWidth="3.8"
              strokeDasharray="19.5 80.5" strokeDashoffset="-7.7" strokeLinecap="round" />
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="#10b981" strokeWidth="3.8"
              strokeDasharray="10.7 89.3" strokeDashoffset="-27.2" strokeLinecap="round" />
          </svg>
          <div className="lp-donut-center">
            <span className="lp-donut-val">$50</span>
            <span className="lp-donut-unit">/mo</span>
          </div>
        </div>
        <div className="lp-donut-legend">
          {categories.map(({ label, color, pct, amount }) => (
            <div className="lp-legend-row" key={label}>
              <span className="lp-legend-dot" style={{ background: color }} />
              <span className="lp-legend-name">{label}</span>
              <span className="lp-legend-pct">{pct}%</span>
              <span className="lp-legend-amount">{amount}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="lp-bars-title">Monthly spend per category</div>
      <div className="lp-bars">
        {bars.map(({ label, pct, color, val }) => (
          <div className="lp-bar-row" key={label}>
            <div className="lp-bar-meta">
              <span className="lp-bar-label">{label}</span>
              <span className="lp-bar-val">{val}</span>
            </div>
            <div className="lp-bar-track">
              <div className="lp-bar-fill" style={{ width: `${pct}%`, background: color }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
