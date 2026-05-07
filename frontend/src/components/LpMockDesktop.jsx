import { Link } from 'react-router-dom';

export default function LpMockDesktop() {
  const subs = [
    { name: 'Netflix',  initial: 'N', color: '#e50914', price: '$15.99', days: 3  },
    { name: 'Spotify',  initial: 'S', color: '#1db954', price: '$9.99',  days: 7  },
    { name: 'GitHub',   initial: 'G', color: '#6e40c9', price: '$4.00',  days: 12 },
    { name: 'Figma',    initial: 'F', color: '#f24e1e', price: '$12.00', days: 18 },
    { name: 'Linear',   initial: 'L', color: '#5e6ad2', price: '$8.00',  days: 24 },
  ];

  return (
    <div className="lp-mock-wrap lp-mock-desktop">
      <div className="lp-mock-bar">
        <span className="lp-mock-dot" style={{ background: '#ef4444' }} />
        <span className="lp-mock-dot" style={{ background: '#f59e0b' }} />
        <span className="lp-mock-dot" style={{ background: '#10b981' }} />
        <span className="lp-mock-url">subscription-tracker.app / dashboard</span>
      </div>
      <div className="lp-mock-body">
        <div className="lp-mock-sidebar">
          <div className="lp-mock-logo-row">
            <img src="/logo(1).png" alt="Subscription Tracker" className="lp-mock-logo-img" />
            <span className="lp-mock-logo-text">Subscription Tracker</span>
          </div>
          {['Dashboard', 'Subscriptions', 'Analytics', 'Settings'].map((item, i) => (
            <div key={item} className={`lp-mock-nav-item${i === 0 ? ' active' : ''}`}>
              <div className="lp-mock-nav-icon" />
              <span>{item}</span>
            </div>
          ))}
        </div>
        <div className="lp-mock-main">
          <div className="lp-mock-cards">
            {[
              { label: 'Monthly Spend', value: '$49.98', color: '#3b82f6' },
              { label: 'Active Subs',   value: '5',      color: '#10b981' },
              { label: 'Renewing Soon', value: '2',      color: '#f59e0b' },
              { label: 'Yearly Spend',  value: '$599',   color: '#a855f7' },
            ].map(({ label, value, color }) => (
              <div className="lp-mock-card" key={label}>
                <div className="lp-mock-card-label">{label}</div>
                <div className="lp-mock-card-value" style={{ color }}>{value}</div>
              </div>
            ))}
          </div>
          <div className="lp-mock-budget">
            <div className="lp-mock-budget-top">
              <span className="lp-mock-budget-label">Monthly Budget</span>
              <span className="lp-mock-budget-pct" style={{ color: '#f59e0b' }}>62%</span>
            </div>
            <div className="lp-mock-budget-meta">$49.98 <span>of $80.00 budget</span></div>
            <div className="lp-mock-budget-track">
              <div className="lp-mock-budget-fill" />
            </div>
          </div>
          <div className="lp-mock-section-title">Upcoming Renewals</div>
          <div className="lp-mock-sub-list">
            {subs.map((sub) => {
              const chipColor = sub.days <= 3 ? '#ef4444' : sub.days <= 7 ? '#f59e0b' : '#10b981';
              return (
                <div className="lp-mock-sub-row" key={sub.name}>
                  <div className="lp-mock-sub-icon" style={{ background: `${sub.color}15`, border: `1px solid ${sub.color}28` }}>
                    <span style={{ color: sub.color }}>{sub.initial}</span>
                  </div>
                  <div className="lp-mock-sub-info">
                    <span className="lp-mock-sub-name">{sub.name}</span>
                    <span className="lp-mock-sub-price">{sub.price}/mo</span>
                  </div>
                  <div className="lp-mock-chip" style={{ background: `${chipColor}15`, color: chipColor, border: `1px solid ${chipColor}30` }}>
                    {sub.days}d
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
