export default function LpProblem() {
  return (
    <section className="lp-problem">
      <div className="lp-container">
        <div className="lp-problem-grid">
          <div className="lp-problem-left">
            <span className="lp-section-label">The problem</span>
            <h2 className="lp-section-h">
              You're paying for things<br />you don't even remember
            </h2>
            <p className="lp-section-sub">
              The average person pays for 3–4 subscriptions they've completely forgotten about.
              They silently drain your account every single month.
            </p>
            <div className="lp-problem-points">
              {[
                { color: '#ef4444', text: "Free trials auto-renew and you don't notice until the statement arrives." },
                { color: '#f59e0b', text: "Renewal dates are scattered across email threads you'll never search for." },
                { color: '#a855f7', text: "You have no clear picture of what you're actually spending each month." },
              ].map(({ color, text }, i) => (
                <div className="lp-problem-point" key={i}>
                  <div className="lp-problem-bullet" style={{ background: `${color}10`, border: `1px solid ${color}25` }}>
                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: color }} />
                  </div>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lp-problem-right">
            <div className="lp-receipt-card">
              <div className="lp-receipt-title">This month's silent charges</div>
              {[
                { name: 'Adobe Creative Cloud', meta: 'Annual plan auto-renewed',    amount: '$54.99', forgotten: true  },
                { name: 'LinkedIn Premium',      meta: 'Monthly · been 8 months',    amount: '$39.99', forgotten: true  },
                { name: 'Dropbox Plus',          meta: 'Annual · still using it',    amount: '$11.99', forgotten: false },
                { name: 'Duolingo Super',        meta: 'Monthly · last opened: ???', amount: '$6.99',  forgotten: true  },
              ].map(({ name, meta, amount, forgotten }) => (
                <div className="lp-receipt-row" key={name}>
                  <div>
                    <div className="lp-receipt-name">{name}</div>
                    <div className="lp-receipt-meta">{meta}</div>
                  </div>
                  <div className="lp-receipt-right">
                    <div className={`lp-receipt-amount${forgotten ? ' forgotten' : ''}`}>{amount}</div>
                    {forgotten && <div className="lp-receipt-tag">forgotten</div>}
                  </div>
                </div>
              ))}
              <div className="lp-receipt-total">
                <span className="lp-receipt-total-label">Wasted this month</span>
                <div>
                  <div className="lp-receipt-total-val">$101.97</div>
                  <div className="lp-receipt-saving">Subscription Tracker would've caught this</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
