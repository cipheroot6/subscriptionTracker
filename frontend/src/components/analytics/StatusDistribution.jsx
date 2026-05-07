import './StatusDistribution.css';
import { STATUS_CONFIG } from '../../lib/constants.js';

export default function StatusDistribution({ subscriptions }) {
  const total = subscriptions.length;

  const data = Object.entries(STATUS_CONFIG).map(([status, { label, color }]) => {
    const count = subscriptions.filter(s => s.status === status).length;
    const pct = total > 0 ? (count / total) * 100 : 0;
    return { status, label, color, count, pct };
  });

  // Conic gradient for the ring
  let angle = 0;
  const ringData = data.filter(d => d.count > 0).map(d => {
    const seg = { ...d, start: angle };
    angle += d.pct;
    return seg;
  });

  const gradient = ringData.length === 0
    ? '#1e293b'
    : ringData.map(s => `${s.color} ${s.start.toFixed(2)}% ${(s.start + s.pct).toFixed(2)}%`).join(', ');

  return (
    <div className="sd-card">
      <h3 className="sd-title">Status Distribution</h3>
      <p className="sd-sub">{total} subscription{total !== 1 ? 's' : ''} total</p>

      <div className="sd-body">
        <div className="sd-ring-wrap">
          <div className="sd-ring" style={{ background: `conic-gradient(${gradient})` }} />
          <div className="sd-ring-center">
            <span className="sd-ring-total">{total}</span>
            <span className="sd-ring-label">total</span>
          </div>
        </div>

        <div className="sd-legend">
          {data.map(({ status, label, color, count, pct }) => (
            <div className="sd-legend-row" key={status}>
              <span className="sd-dot" style={{ background: color }} />
              <span className="sd-legend-label">{label}</span>
              <div className="sd-legend-right">
                <span className="sd-legend-count">{count}</span>
                <span className="sd-legend-pct">{pct.toFixed(0)}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
