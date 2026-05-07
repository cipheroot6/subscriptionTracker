import { useState } from 'react';
import api from '../../lib/api';
import { INITIALS_COLORS, freqLabel, STATUS_CONFIG, CATEGORY_LABELS } from '../../lib/constants.js';
import EditSubscriptionModal from '../modals/EditSubscriptionModal';
import DeleteConfirmModal from '../modals/DeleteConfirmModal';
import './SubscriptionTable.css';

function getColor(name = '') {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return INITIALS_COLORS[Math.abs(hash) % INITIALS_COLORS.length];
}
function formatDate(d) { return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }); }

export default function SubscriptionTable({ subscriptions, loading, onRefresh }) {
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [cancellingId, setCancellingId] = useState(null);

  const handleCancel = async (id) => {
    setCancellingId(id);
    try {
      await api.put(`/subscription/${id}/cancel`);
      onRefresh();
    } catch { /* handled */ } finally { setCancellingId(null); }
  };

  if (loading) return (
    <div className="st-skeletons">
      {[1,2,3,4,5].map(i => <div key={i} className="st-skeleton" />)}
    </div>
  );

  if (subscriptions.length === 0) return (
    <div className="st-empty">No subscriptions match your filters.</div>
  );

  return (
    <>
      <div className="st-wrap">
        <table className="st-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Renewal</th>
              <th>Status</th>
              <th>Payment</th>
              <th style={{ width: '160px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map(sub => {
              const color = getColor(sub.name);
              const initial = sub.name?.[0]?.toUpperCase() || '?';
              const status = STATUS_CONFIG[sub.status] || STATUS_CONFIG.active;
              return (
                <tr key={sub._id}>
                  <td>
                    <div className="st-name-cell">
                      <div className="st-icon" style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
                        <span style={{ color }}>{initial}</span>
                      </div>
                      <span className="st-name">{sub.name}</span>
                    </div>
                  </td>
                  <td><span className="st-cat">{CATEGORY_LABELS[sub.category] || sub.category}</span></td>
                  <td>
                    <span className="st-price">{sub.currency} {sub.price}</span>
                    <span className="st-freq">{freqLabel(sub.frequency)}</span>
                  </td>
                  <td><span className="st-date">{formatDate(sub.renewalDate)}</span></td>
                  <td><span className={`st-badge ${status.cls}`}>{status.label}</span></td>
                  <td><span className="st-payment">{sub.paymentMethod}</span></td>
                  <td>
                    <div className="st-actions">
                      <button className="st-btn st-btn-edit" onClick={() => setEditTarget(sub)}>Edit</button>
                      <button 
                        className="st-btn st-btn-cancel" 
                        style={{ visibility: sub.status === 'active' ? 'visible' : 'hidden' }}
                        onClick={() => sub.status === 'active' && handleCancel(sub._id)} 
                        disabled={cancellingId === sub._id}
                      >
                        {cancellingId === sub._id ? '…' : 'Cancel'}
                      </button>
                      <button className="st-btn st-btn-delete" onClick={() => setDeleteTarget(sub)}>Delete</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
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
