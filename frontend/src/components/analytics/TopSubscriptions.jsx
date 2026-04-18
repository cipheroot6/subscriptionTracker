import './TopSubscriptions.css';

const toMonthly = (price, frequency) => {
  const map = { daily: 30, weekly: 4.33, monthly: 1, yearly: 1/12 };
  return price * (map[frequency] || 1);
};

const INITIALS_COLORS = ['#3b82f6','#10b981','#f59e0b','#ef4444','#a855f7','#ec4899','#06b6d4','#f97316'];
function getColor(name = '') {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return INITIALS_COLORS[Math.abs(hash) % INITIALS_COLORS.length];
}

export default function TopSubscriptions({ subscriptions }) {
  const active = subscriptions.filter(s => s.status === 'active');
  const totalMonthly = active.reduce((sum, s) => sum + toMonthly(s.price, s.frequency), 0);

  const ranked = active
    .map(s => ({ ...s, monthly: toMonthly(s.price, s.frequency) }))
    .sort((a, b) => b.monthly - a.monthly)
    .slice(0, 5);

  return (
    <div className="ts-card">
      <h3 className="ts-title">Top Subscriptions</h3>
      <p className="ts-sub">Ranked by monthly cost</p>

      {ranked.length === 0 ? (
        <div className="ts-empty">No active subscriptions.</div>
      ) : (
        <div className="ts-list">
          {ranked.map((sub, i) => {
            const color = getColor(sub.name);
            const initial = sub.name?.[0]?.toUpperCase() || '?';
            const pct = totalMonthly > 0 ? (sub.monthly / totalMonthly) * 100 : 0;
            return (
              <div className="ts-row" key={sub._id}>
                <span className="ts-rank">#{i + 1}</span>
                <div className="ts-icon" style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
                  <span style={{ color }}>{initial}</span>
                </div>
                <div className="ts-info">
                  <div className="ts-name-row">
                    <span className="ts-name">{sub.name}</span>
                    <span className="ts-amount">${sub.monthly.toFixed(2)}/mo</span>
                  </div>
                  <div className="ts-bar-track">
                    <div className="ts-bar-fill" style={{ width: `${pct}%`, background: color }} />
                  </div>
                  <span className="ts-pct">{pct.toFixed(0)}% of spend</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
