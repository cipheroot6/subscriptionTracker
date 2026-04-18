import { useState } from 'react';
import api from '../../lib/api';
import DeleteConfirmModal from '../modals/DeleteConfirmModal';
import './SubscriptionList.css';

const INITIALS_COLORS = [
  '#3b82f6', '#10b981', '#f59e0b', '#ef4444',
  '#a855f7', '#ec4899', '#06b6d4', '#f97316',
];

function getColor(name = '') {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return INITIALS_COLORS[Math.abs(hash) % INITIALS_COLORS.length];
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function freqLabel(f) {
  const map = { daily: '/day', weekly: '/wk', monthly: '/mo', yearly: '/yr' };
  return map[f] || '';
}

const STATUS_CONFIG = {
  active:   { label: 'Active',   cls: 'badge-active' },
  expired:  { label: 'Expired',  cls: 'badge-expired' },
  canceled: { label: 'Canceled', cls: 'badge-canceled' },
  pending:  { label: 'Pending',  cls: 'badge-pending' },
};

const CATEGORY_LABELS = {
  sports: 'Sports', news: 'News', entertainment: 'Entertainment',
  education: 'Education', health: 'Health', other: 'Other',
};

export default function SubscriptionList({ subscriptions, loading, onRefresh, onAdd }) {
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('renewalDate');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [cancellingId, setCancellingId] = useState(null);

  const filtered = subscriptions
    .filter(s => filterStatus === 'all' || s.status === filterStatus)
    .filter(s => filterCategory === 'all' || s.category === filterCategory)
    .sort((a, b) => {
      if (sortBy === 'renewalDate') return new Date(a.renewalDate) - new Date(b.renewalDate);
      if (sortBy === 'price') return b.price - a.price;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

  const handleCancel = async (id) => {
    setCancellingId(id);
    try {
      await api.put(`/subscription/${id}/cancel`);
      onRefresh();
    } catch {
      // stub — backend not yet implemented
    } finally {
      setCancellingId(null);
    }
  };

  const categories = [...new Set(subscriptions.map(s => s.category))];

  return (
    <>
      <div className="sub-list-card">
        {/* Header */}
        <div className="sub-list-header">
          <div>
            <h3 className="sub-list-title">My Subscriptions</h3>
            <p className="sub-list-count">{filtered.length} of {subscriptions.length} shown</p>
          </div>
          <button className="add-sub-btn" onClick={onAdd}>
            + Add
          </button>
        </div>

        {/* Controls */}
        <div className="sub-list-controls">
          <div className="filter-group">
            <select
              className="filter-select"
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
            >
              <option value="all">All statuses</option>
              <option value="active">Active</option>
              <option value="expired">Expired</option>
              <option value="canceled">Canceled</option>
              <option value="pending">Pending</option>
            </select>

            {categories.length > 1 && (
              <select
                className="filter-select"
                value={filterCategory}
                onChange={e => setFilterCategory(e.target.value)}
              >
                <option value="all">All categories</option>
                {categories.map(c => (
                  <option key={c} value={c}>{CATEGORY_LABELS[c]}</option>
                ))}
              </select>
            )}
          </div>

          <select
            className="filter-select"
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
          >
            <option value="renewalDate">Sort: Renewal date</option>
            <option value="price">Sort: Price (high–low)</option>
            <option value="name">Sort: Name</option>
          </select>
        </div>

        {/* List */}
        {loading ? (
          <div className="sub-list-loading">
            {[1, 2, 3].map(i => (
              <div key={i} className="sub-row-skeleton" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="sub-list-empty">
            {subscriptions.length === 0
              ? 'No subscriptions yet. Add your first one!'
              : 'No subscriptions match the current filters.'}
          </div>
        ) : (
          <div className="sub-list">
            {filtered.map(sub => {
              const color = getColor(sub.name);
              const initial = sub.name?.[0]?.toUpperCase() || '?';
              const status = STATUS_CONFIG[sub.status] || STATUS_CONFIG.active;

              return (
                <div className="sub-row" key={sub._id}>
                  {/* Icon */}
                  <div
                    className="sub-icon"
                    style={{ background: `${color}18`, border: `1px solid ${color}30` }}
                  >
                    <span style={{ color }}>{initial}</span>
                  </div>

                  {/* Info */}
                  <div className="sub-info">
                    <span className="sub-name">{sub.name}</span>
                    <span className="sub-category">{CATEGORY_LABELS[sub.category]}</span>
                  </div>

                  {/* Price */}
                  <div className="sub-price-col">
                    <span className="sub-price">{sub.currency} {sub.price}</span>
                    <span className="sub-freq">{freqLabel(sub.frequency)}</span>
                  </div>

                  {/* Renewal */}
                  <div className="sub-renewal-col">
                    <span className="sub-renewal-label">Renews</span>
                    <span className="sub-renewal-date">{formatDate(sub.renewalDate)}</span>
                  </div>

                  {/* Status */}
                  <span className={`sub-badge ${status.cls}`}>{status.label}</span>

                  {/* Actions */}
                  <div className="sub-actions">
                    {sub.status === 'active' && (
                      <button
                        className="sub-action-btn cancel-btn"
                        onClick={() => handleCancel(sub._id)}
                        disabled={cancellingId === sub._id}
                        title="Cancel subscription"
                      >
                        {cancellingId === sub._id ? '…' : 'Cancel'}
                      </button>
                    )}
                    <button
                      className="sub-action-btn delete-btn"
                      onClick={() => setDeleteTarget(sub)}
                      title="Delete subscription"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {deleteTarget && (
        <DeleteConfirmModal
          subscription={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onSuccess={() => {
            setDeleteTarget(null);
            onRefresh();
          }}
        />
      )}
    </>
  );
}
