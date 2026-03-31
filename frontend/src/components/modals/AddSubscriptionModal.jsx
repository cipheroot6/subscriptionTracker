import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../lib/api';
import './AddSubscriptionModal.css';

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const INITIAL = {
  name: '',
  price: '',
  currency: 'USD',
  frequency: 'monthly',
  category: 'entertainment',
  paymentMethod: '',
  startDate: new Date().toISOString().split('T')[0],
  renewalDate: '',
};

function addDays(dateStr, days) {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

const FREQ_DAYS = { daily: 1, weekly: 7, monthly: 30, yearly: 365 };

export default function AddSubscriptionModal({ onClose, onSuccess }) {
  const { user } = useAuth();
  const [form, setForm] = useState(INITIAL);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => {
      const next = { ...prev, [name]: value };
      // Auto-fill renewalDate when startDate or frequency changes
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
    if (err) { setError(err); return; }

    setLoading(true);
    try {
      await api.post('/subscription/user/create', {
        ...form,
        price: Number(form.price),
      });
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-card">
        {/* Header */}
        <div className="modal-header">
          <div>
            <h2 className="modal-title">Add Subscription</h2>
            <p className="modal-subtitle">Track a new recurring payment</p>
          </div>
          <button className="modal-close" onClick={onClose}><XIcon /></button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {error && <div className="modal-error" role="alert">{error}</div>}

          <div className="modal-fields">
            {/* Name */}
            <div className="modal-field">
              <label>Service Name</label>
              <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Netflix" />
            </div>

            {/* Price + Currency */}
            <div className="modal-field-row">
              <div className="modal-field" style={{ flex: 2 }}>
                <label>Price</label>
                <input name="price" type="number" min="0" step="0.01" value={form.price} onChange={handleChange} placeholder="9.99" />
              </div>
              <div className="modal-field" style={{ flex: 1 }}>
                <label>Currency</label>
                <select name="currency" value={form.currency} onChange={handleChange}>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="JPY">JPY</option>
                  <option value="AUD">AUD</option>
                </select>
              </div>
            </div>

            {/* Frequency + Category */}
            <div className="modal-field-row">
              <div className="modal-field" style={{ flex: 1 }}>
                <label>Billing Frequency</label>
                <select name="frequency" value={form.frequency} onChange={handleChange}>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
              <div className="modal-field" style={{ flex: 1 }}>
                <label>Category</label>
                <select name="category" value={form.category} onChange={handleChange}>
                  <option value="entertainment">Entertainment</option>
                  <option value="education">Education</option>
                  <option value="health">Health</option>
                  <option value="sports">Sports</option>
                  <option value="news">News</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Payment Method */}
            <div className="modal-field">
              <label>Payment Method</label>
              <input name="paymentMethod" value={form.paymentMethod} onChange={handleChange} placeholder="e.g. Visa *4242" />
            </div>

            {/* Dates */}
            <div className="modal-field-row">
              <div className="modal-field" style={{ flex: 1 }}>
                <label>Start Date</label>
                <input name="startDate" type="date" value={form.startDate} onChange={handleChange} max={new Date().toISOString().split('T')[0]} />
              </div>
              <div className="modal-field" style={{ flex: 1 }}>
                <label>Renewal Date</label>
                <input name="renewalDate" type="date" value={form.renewalDate} onChange={handleChange} />
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="modal-cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="modal-submit-btn" disabled={loading}>
              {loading ? 'Adding…' : 'Add Subscription'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
