import { useState } from 'react';
import api from '../../lib/api';
import './DeleteConfirmModal.css';

const TrashIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6" /><path d="M14 11v6" />
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
);

export default function DeleteConfirmModal({ subscription, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDelete = async () => {
    setLoading(true);
    try {
      await api.delete(`/subscription/${subscription._id}`);
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong.');
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="delete-modal-card">
        <div className="delete-modal-icon">
          <TrashIcon />
        </div>
        <h2 className="delete-modal-title">Delete Subscription</h2>
        <p className="delete-modal-body">
          Are you sure you want to delete <strong>{subscription.name}</strong>?
          This action cannot be undone.
        </p>

        {error && <div className="modal-error">{error}</div>}

        <div className="delete-modal-footer">
          <button className="modal-cancel-btn" onClick={onClose} disabled={loading}>
            Cancel
          </button>
          <button className="delete-confirm-btn" onClick={handleDelete} disabled={loading}>
            {loading ? 'Deleting…' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}
