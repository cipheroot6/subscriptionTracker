import { useNavigate } from 'react-router-dom';
import './RecentActivity.css';

const INITIALS_COLORS = [
  '#3b82f6', '#10b981', '#f59e0b', '#ef4444',
  '#a855f7', '#ec4899', '#06b6d4', '#f97316',
];

function getColor(name = '') {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return INITIALS_COLORS[Math.abs(hash) % INITIALS_COLORS.length];
}

function freqLabel(f) {
  return { daily: '/day', weekly: '/wk', monthly: '/mo', yearly: '/yr' }[f] || '';
}

const STATUS_CONFIG = {
  active:   { label: 'Active',   cls: 'ra-badge-active' },
  expired:  { label: 'Expired',  cls: 'ra-badge-expired' },
  canceled: { label: 'Canceled', cls: 'ra-badge-canceled' },
  pending:  { label: 'Pending',  cls: 'ra-badge-pending' },
};

const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);

export default function RecentActivity({ subscriptions, loading }) {
  const navigate = useNavigate();

  const recent = [...subscriptions]
    .sort((a, b) => new Date(b.createdAt || b.startDate) - new Date(a.createdAt || a.startDate))
    .slice(0, 3);

  return (
    <div className="ra-card">
      <div className="ra-header">
        <div>
          <h3 className="ra-title">Recent Subscriptions</h3>
          <p className="ra-sub">{subscriptions.length} total</p>
        </div>
        <button className="ra-view-all" onClick={() => navigate('/subscriptions')}>
          View all <ArrowRightIcon />
        </button>
      </div>

      {loading ? (
        <div className="ra-skeletons">
          {[1, 2, 3].map(i => <div key={i} className="ra-skeleton" />)}
        </div>
      ) : recent.length === 0 ? (
        <div className="ra-empty">
          <p>No subscriptions yet.</p>
        </div>
      ) : (
        <div className="ra-list">
          {recent.map(sub => {
            const color = getColor(sub.name);
            const initial = sub.name?.[0]?.toUpperCase() || '?';
            const status = STATUS_CONFIG[sub.status] || STATUS_CONFIG.active;
            return (
              <div className="ra-row" key={sub._id}>
                <div className="ra-icon" style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
                  <span style={{ color }}>{initial}</span>
                </div>
                <div className="ra-info">
                  <span className="ra-name">{sub.name}</span>
                  <span className="ra-price">{sub.currency} {sub.price}{freqLabel(sub.frequency)}</span>
                </div>
                <span className={`ra-badge ${status.cls}`}>{status.label}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
