import { useState } from 'react';
import api from '../../lib/api';
import './AddSubscriptionModal.css';

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

function toDateInput(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toISOString().split('T')[0];
}

function addDays(dateStr, days) {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

const FREQ_DAYS = { daily: 1, weekly: 7, monthly: 30, yearly: 365 };

export default function EditSubscriptionModal({ subscription, onClose, onSuccess }) {
  const [form, setForm] = useState({
    name: subscription.name || '',
    price: subscription.price?.toString() || '',
    currency: subscription.currency || 'USD',
    frequency: subscription.frequency || 'monthly',
    category: subscription.category || 'entertainment',
    paymentMethod: subscription.paymentMethod || '',
    startDate: toDateInput(subscription.startDate),
    renewalDate: toDateInput(subscription.renewalDate),
    status: subscription.status || 'active',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => {
      const next = { ...prev, [name]: value };
      if ((name === 'startDate' || name === 'frequency') && next.startDate) {
        next.renewalDate = addDays(next.startDate, FREQ_DAYS[next.frequency] || 30);
      }
      return next;
    });
    if (error) setError('');
  };

  const validate = () => {
    if (!form.name.trim()) return 'Name is required.';
    if (!form.price || isNaN(form.price) || Number(form.price) < 0) return 'Enter a valid price.';
    if (!form.paymentMethod.trim()) return 'Payment method is required.';
    if (!form.startDate) return 'Start date is required.';
    if (!form.renewalDate) return 'Renewal date is required.';
    if (new Date(form.renewalDate) <= new Date(form.startDate)) return 'Renewal date must be after start date.';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) return setError(err);
    setLoading(true);
    try {
      await api.put(`/subscription/${subscription._id}`, {
        ...form,
        price: Number(form.price),
      });
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save changes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-card">
        <div className="modal-header">
          <h2 className="modal-title">Edit Subscription</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close"><XIcon /></button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="modal-form">
          <div className="modal-row">
            <div className="modal-field">
              <label>Name</label>
              <input name="name" value={form.name} onChange={handleChange} placeholder="Netflix, Spotify…" />
            </div>
            <div className="modal-field">
              <label>Status</label>
              <select name="status" value={form.status} onChange={handleChange}>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="canceled">Canceled</option>
                <option value="expired">Expired</option>
              </select>
            </div>
          </div>

          <div className="modal-row">
            <div className="modal-field modal-field--sm">
              <label>Currency</label>
              <select name="currency" value={form.currency} onChange={handleChange}>
                {['USD','EUR','GBP','JPY','AUD'].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="modal-field">
              <label>Price</label>
              <input name="price" type="number" min="0" step="0.01" value={form.price} onChange={handleChange} placeholder="9.99" />
            </div>
            <div className="modal-field">
              <label>Frequency</label>
              <select name="frequency" value={form.frequency} onChange={handleChange}>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
          </div>

          <div className="modal-row">
            <div className="modal-field">
              <label>Category</label>
              <select name="category" value={form.category} onChange={handleChange}>
                <option value="entertainment">Entertainment</option>
                <option value="sports">Sports</option>
                <option value="news">News</option>
                <option value="education">Education</option>
                <option value="health">Health</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="modal-field">
              <label>Payment Method</label>
              <input name="paymentMethod" value={form.paymentMethod} onChange={handleChange} placeholder="Visa, PayPal…" />
            </div>
          </div>

          <div className="modal-row">
            <div className="modal-field">
              <label>Start Date</label>
              <input name="startDate" type="date" value={form.startDate} onChange={handleChange} />
            </div>
            <div className="modal-field">
              <label>Renewal Date</label>
              <input name="renewalDate" type="date" value={form.renewalDate} onChange={handleChange} />
            </div>
          </div>

          {error && <p className="modal-error">{error}</p>}

          <div className="modal-actions">
            <button type="button" className="modal-btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="modal-btn-primary" disabled={loading}>
              {loading ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
