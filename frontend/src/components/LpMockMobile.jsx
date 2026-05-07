export default function LpMockMobile() {
  const subs = [
    { name: 'Netflix',  initial: 'N', color: '#e50914', price: '$15.99', days: 3  },
    { name: 'Spotify',  initial: 'S', color: '#1db954', price: '$9.99',  days: 7  },
    { name: 'GitHub',   initial: 'G', color: '#6e40c9', price: '$4.00',  days: 12 },
    { name: 'Figma',    initial: 'F', color: '#f24e1e', price: '$12.00', days: 18 },
  ];

  return (
    <div className="lp-mock-phone-frame">
      {/* phone top notch area */}
      <div className="lp-phone-top">
        <div className="lp-phone-notch" />
      </div>

      {/* app content */}
      <div className="lp-phone-content">
        {/* mobile header */}
        <div className="lp-phone-header">
          <div className="lp-phone-header-left">
            <img src="/logo(1).png" alt="Subscription Tracker" className="lp-phone-logo-img" />
            <span className="lp-phone-logo-text">Subscription Tracker</span>
          </div>
          <div className="lp-phone-header-right">
            <span className="lp-phone-greeting">Dashboard</span>
          </div>
        </div>

        {/* summary cards 2x2 */}
        <div className="lp-phone-cards">
          {[
            { label: 'Monthly Spend', value: '$49.98', color: '#3b82f6' },
            { label: 'Active Subs',   value: '5',      color: '#10b981' },
            { label: 'Renewing Soon', value: '2',      color: '#f59e0b' },
            { label: 'Yearly Spend',  value: '$599',   color: '#a855f7' },
          ].map(({ label, value, color }) => (
            <div className="lp-phone-card" key={label}>
              <div className="lp-phone-card-label">{label}</div>
              <div className="lp-phone-card-value" style={{ color }}>{value}</div>
            </div>
          ))}
        </div>

        {/* budget */}
        <div className="lp-phone-budget">
          <div className="lp-phone-budget-row">
            <span className="lp-phone-budget-label">Monthly Budget</span>
            <span style={{ color: '#f59e0b', fontSize: '0.625rem', fontWeight: 600 }}>62%</span>
          </div>
          <div className="lp-phone-budget-amount">$49.98 <span>of $80.00</span></div>
          <div className="lp-phone-budget-track">
            <div className="lp-phone-budget-fill" />
          </div>
        </div>

        {/* renewals */}
        <div className="lp-phone-section-title">Upcoming Renewals</div>
        <div className="lp-phone-sub-list">
          {subs.map((sub) => {
            const chipColor = sub.days <= 3 ? '#ef4444' : sub.days <= 7 ? '#f59e0b' : '#10b981';
            return (
              <div className="lp-phone-sub-row" key={sub.name}>
                <div className="lp-phone-sub-icon" style={{ background: `${sub.color}15`, border: `1px solid ${sub.color}28` }}>
                  <span style={{ color: sub.color }}>{sub.initial}</span>
                </div>
                <div className="lp-phone-sub-info">
                  <span className="lp-phone-sub-name">{sub.name}</span>
                  <span className="lp-phone-sub-price">{sub.price}/mo</span>
                </div>
                <div className="lp-phone-chip" style={{ background: `${chipColor}15`, color: chipColor, border: `1px solid ${chipColor}30` }}>
                  {sub.days}d
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* bottom home indicator */}
      <div className="lp-phone-bottom">
        <div className="lp-phone-home-bar" />
      </div>
    </div>
  );
}
