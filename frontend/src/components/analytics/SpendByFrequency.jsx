import './SpendByFrequency.css';

const toMonthly = (price, frequency) => {
  const map = { daily: 30, weekly: 4.33, monthly: 1, yearly: 1/12 };
  return price * (map[frequency] || 1);
};

const FREQ_CONFIG = {
  daily:   { label: 'Daily',   color: '#a855f7' },
  weekly:  { label: 'Weekly',  color: '#3b82f6' },
  monthly: { label: 'Monthly', color: '#10b981' },
  yearly:  { label: 'Yearly',  color: '#f59e0b' },
};

export default function SpendByFrequency({ subscriptions }) {
  const active = subscriptions.filter(s => s.status === 'active');

  const data = Object.entries(FREQ_CONFIG).map(([freq, { label, color }]) => {
    const subs = active.filter(s => s.frequency === freq);
    const monthly = subs.reduce((sum, s) => sum + toMonthly(s.price, s.frequency), 0);
    return { freq, label, color, monthly, count: subs.length };
  });

  const maxVal = Math.max(...data.map(d => d.monthly), 1);

  return (
    <div className="sbf-card">
      <h3 className="sbf-title">Spend by Billing Cycle</h3>
      <p className="sbf-sub">Monthly equivalent spend per billing frequency</p>

      <div className="sbf-chart">
        {data.map(({ freq, label, color, monthly, count }) => {
          const barH = (monthly / maxVal) * 100;
          return (
            <div className="sbf-col" key={freq}>
              <div className="sbf-bar-wrap">
                <span className="sbf-val">{monthly > 0 ? `$${monthly.toFixed(0)}` : ''}</span>
                <div className="sbf-bar-track">
                  <div
                    className="sbf-bar-fill"
                    style={{ height: `${barH}%`, background: color }}
                  />
                </div>
              </div>
              <span className="sbf-label">{label}</span>
              <span className="sbf-count">{count} sub{count !== 1 ? 's' : ''}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
