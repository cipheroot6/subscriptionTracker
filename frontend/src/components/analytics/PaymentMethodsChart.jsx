import './PaymentMethodsChart.css';
import { toMonthly } from '../../lib/constants.js';

const BAR_COLORS = ['#3b82f6','#10b981','#a855f7','#f59e0b','#ef4444','#ec4899','#06b6d4','#f97316'];

export default function PaymentMethodsChart({ subscriptions }) {
  const active = subscriptions.filter(s => s.status === 'active');

  const totals = active.reduce((acc, s) => {
    const method = s.paymentMethod || 'Unknown';
    if (!acc[method]) acc[method] = { monthly: 0, count: 0 };
    acc[method].monthly += toMonthly(s.price, s.frequency);
    acc[method].count += 1;
    return acc;
  }, {});

  const sorted = Object.entries(totals)
    .sort((a, b) => b[1].monthly - a[1].monthly);

  const maxVal = sorted[0]?.[1].monthly || 1;
  const grandTotal = sorted.reduce((s, [, v]) => s + v.monthly, 0);

  return (
    <div className="pmc-card">
      <h3 className="pmc-title">Payment Methods</h3>
      <p className="pmc-sub">Monthly spend per payment method</p>

      {sorted.length === 0 ? (
        <div className="pmc-empty">No active subscriptions.</div>
      ) : (
        <div className="pmc-list">
          {sorted.map(([method, { monthly, count }], i) => {
            const color = BAR_COLORS[i % BAR_COLORS.length];
            const barPct = (monthly / maxVal) * 100;
            const ofTotal = grandTotal > 0 ? (monthly / grandTotal) * 100 : 0;
            return (
              <div className="pmc-row" key={method}>
                <div className="pmc-label-row">
                  <div className="pmc-dot-name">
                    <span className="pmc-dot" style={{ background: color }} />
                    <span className="pmc-method">{method}</span>
                    <span className="pmc-count">{count} sub{count !== 1 ? 's' : ''}</span>
                  </div>
                  <div className="pmc-values">
                    <span className="pmc-pct">{ofTotal.toFixed(0)}%</span>
                    <span className="pmc-amount">${monthly.toFixed(2)}/mo</span>
                  </div>
                </div>
                <div className="pmc-bar-track">
                  <div className="pmc-bar-fill" style={{ width: `${barPct}%`, background: color }} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
