import { useState } from 'react';
import api from '../../lib/api';
import { INITIALS_COLORS } from '../../lib/constants.js';
import EditSubscriptionModal from '../modals/EditSubscriptionModal';
import DeleteConfirmModal from '../modals/DeleteConfirmModal';
import './SubscriptionCards.css';

function getColor(name = '') {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return INITIALS_COLORS[Math.abs(hash) % INITIALS_COLORS.length];
}
function daysUntil(dateStr) {
  const now = new Date(); now.setHours(0,0,0,0);
  const t = new Date(dateStr); t.setHours(0,0,0,0);
  return Math.round((t - now) / 86400000);
}
function freqLabel(f) { return { daily: '/day', weekly: '/wk', monthly: '/mo', yearly: '/yr' }[f] || ''; }
const CATEGORY_LABELS = { sports:'Sports', news:'News', entertainment:'Entertainment', education:'Education', health:'Health', other:'Other' };
const STATUS_CONFIG = {
  active:   { label: 'Active',   cls: 'sc-badge-active' },
  expired:  { label: 'Expired',  cls: 'sc-badge-expired' },
  canceled: { label: 'Canceled', cls: 'sc-badge-canceled' },
  pending:  { label: 'Pending',  cls: 'sc-badge-pending' },
};

export default function SubscriptionCards({ subscriptions, loading, onRefresh }) {
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [cancellingId, setCancellingId] = useState(null);

  const handleCancel = async (id) => {
    setCancellingId(id);
    try { await api.put(`/subscription/${id}/cancel`); onRefresh(); }
    catch { } finally { setCancellingId(null); }
  };

  if (loading) return (
    <div className="sc-grid">
      {[1,2,3,4,5,6].map(i => <div key={i} className="sc-skeleton" />)}
    </div>
  );

  if (subscriptions.length === 0) return (
    <div className="sc-empty">No subscriptions match your filters.</div>
  );

  return (
    <>
      <div className="sc-grid">
        {subscriptions.map(sub => {
          const color = getColor(sub.name);
          const initial = sub.name?.[0]?.toUpperCase() || '?';
          const status = STATUS_CONFIG[sub.status] || STATUS_CONFIG.active;
          const days = daysUntil(sub.renewalDate);
          const chipCls = days <= 3 ? 'sc-chip-red' : days <= 7 ? 'sc-chip-amber' : 'sc-chip-green';
          const chipTxt = days < 0 ? 'Overdue' : days === 0 ? 'Today' : days === 1 ? 'Tomorrow' : `${days}d`;

          return (
            <div className="sc-card" key={sub._id}>
              <div className="sc-card-top">
                <div className="sc-icon" style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
                  <span style={{ color, fontSize: '1.25rem', fontWeight: 600 }}>{initial}</span>
                </div>
                <span className={`sc-badge ${status.cls}`}>{status.label}</span>
              </div>
              <h4 className="sc-name">{sub.name}</h4>
              <p className="sc-cat">{CATEGORY_LABELS[sub.category] || sub.category}</p>
              <div className="sc-price-row">
                <span className="sc-price">{sub.currency} {sub.price}{freqLabel(sub.frequency)}</span>
                {sub.status === 'active' && (
                  <span className={`sc-chip ${chipCls}`}>{chipTxt}</span>
                )}
              </div>
              <p className="sc-payment">{sub.paymentMethod}</p>
              <div className="sc-actions">
                <button className="sc-btn sc-btn-edit" onClick={() => setEditTarget(sub)}>Edit</button>
                {sub.status === 'active' && (
                  <button className="sc-btn sc-btn-cancel" onClick={() => handleCancel(sub._id)} disabled={cancellingId === sub._id}>
                    {cancellingId === sub._id ? '…' : 'Cancel'}
                  </button>
                )}
                <button className="sc-btn sc-btn-delete" onClick={() => setDeleteTarget(sub)}>Delete</button>
              </div>
            </div>
          );
        })}
      </div>

      {editTarget && (
        <EditSubscriptionModal
          subscription={editTarget}
          onClose={() => setEditTarget(null)}
          onSuccess={() => { setEditTarget(null); onRefresh(); }}
        />
      )}
      {deleteTarget && (
        <DeleteConfirmModal
          subscription={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onSuccess={() => { setDeleteTarget(null); onRefresh(); }}
        />
      )}
    </>
  );
}
