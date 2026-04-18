import './UpcomingRenewals.css';

function daysUntil(dateStr) {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  target.setHours(0, 0, 0, 0);
  return Math.round((target - now) / (1000 * 60 * 60 * 24));
}

function chipClass(days) {
  if (days <= 3) return 'chip red';
  if (days <= 7) return 'chip amber';
  return 'chip green';
}

function chipLabel(days) {
  if (days === 0) return 'Today';
  if (days === 1) return 'Tomorrow';
  return `${days}d`;
}

const INITIALS_COLORS = [
  '#3b82f6', '#10b981', '#f59e0b', '#ef4444',
  '#a855f7', '#ec4899', '#06b6d4', '#f97316',
];

function getColor(name = '') {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return INITIALS_COLORS[Math.abs(hash) % INITIALS_COLORS.length];
}

export default function UpcomingRenewals({ subscriptions }) {
  const now = new Date();
  const in30 = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

  const upcoming = subscriptions
    .filter(s => {
      if (s.status !== 'active') return false;
      const rd = new Date(s.renewalDate);
      return rd >= now && rd <= in30;
    })
    .sort((a, b) => new Date(a.renewalDate) - new Date(b.renewalDate))
    .slice(0, 6);

  return (
    <div className="upcoming-card">
      <h3 className="upcoming-title">Upcoming Renewals</h3>
      <p className="upcoming-sub">Next 30 days</p>

      {upcoming.length === 0 ? (
        <div className="upcoming-empty">No renewals in the next 30 days.</div>
      ) : (
        <div className="upcoming-list">
          {upcoming.map(sub => {
            const days = daysUntil(sub.renewalDate);
            const color = getColor(sub.name);
            const initial = sub.name?.[0]?.toUpperCase() || '?';
            const freq = sub.frequency === 'monthly' ? '/mo' : sub.frequency === 'yearly' ? '/yr' : `/${sub.frequency}`;

            return (
              <div className="upcoming-row" key={sub._id}>
                <div
                  className="upcoming-icon"
                  style={{ background: `${color}18`, border: `1px solid ${color}30` }}
                >
                  <span style={{ color }}>{initial}</span>
                </div>
                <div className="upcoming-info">
                  <span className="upcoming-name">{sub.name}</span>
                  <span className="upcoming-price">${sub.price}{freq}</span>
                </div>
                <span className={chipClass(days)}>{chipLabel(days)}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
