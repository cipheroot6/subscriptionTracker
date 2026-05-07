import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../lib/api';
import './BudgetBar.css';
import { toMonthly } from '../../lib/constants.js';

const PencilIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function BudgetBar({ subscriptions }) {
  const { user, updateUserData } = useAuth();
  const [budget, setBudget] = useState(user?.budget || 100);
  const [editing, setEditing] = useState(false);
  const [inputVal, setInputVal] = useState('');

  // Keep local state in sync if user object changes (e.g. initial fetch)
  useEffect(() => {
    if (user?.budget) setBudget(user.budget);
  }, [user?.budget]);

  const active = subscriptions.filter(s => s.status === 'active');
  const spent = active.reduce((sum, s) => sum + toMonthly(s.price, s.frequency), 0);
  const pct = budget > 0 ? Math.min((spent / budget) * 100, 100) : 0;

  const barColor = pct >= 90 ? '#ef4444' : pct >= 70 ? '#f59e0b' : '#10b981';

  const startEditing = () => {
    setInputVal(budget.toString());
    setEditing(true);
  };

  const saveBudget = async () => {
    const val = parseFloat(inputVal);
    if (!isNaN(val) && val > 0) {
      try {
        const res = await api.put(`/users/${user._id}`, { budget: val });
        if (res.data.success) {
          setBudget(val);
          updateUserData(res.data.data);
        }
      } catch (error) {
        console.error('Failed to update budget:', error);
        alert('Failed to update budget. Please try again.');
      }
    }
    setEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') saveBudget();
    if (e.key === 'Escape') setEditing(false);
  };

  return (
    <div className="budget-bar-card">
      <div className="budget-bar-header">
        <div className="budget-bar-title-row">
          <span className="budget-bar-title">Monthly Budget</span>
          {!editing ? (
            <button className="budget-edit-btn" onClick={startEditing} title="Edit budget">
              <PencilIcon />
            </button>
          ) : (
            <div className="budget-input-row">
              <span className="budget-input-prefix">$</span>
              <input
                className="budget-input"
                type="number"
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
                min="1"
              />
              <button className="budget-save-btn" onClick={saveBudget}>
                <CheckIcon />
              </button>
            </div>
          )}
        </div>
        <div className="budget-bar-amounts">
          <span className="budget-spent">${spent.toFixed(2)}</span>
          <span className="budget-of">of ${budget.toFixed(2)} budget</span>
          <span className="budget-pct" style={{ color: barColor }}>{pct.toFixed(0)}%</span>
        </div>
      </div>
      <div className="budget-track">
        <div
          className="budget-fill"
          style={{ width: `${pct}%`, background: barColor }}
        />
      </div>
      {pct >= 90 && (
        <p className="budget-warning">⚠ You're close to your monthly budget limit.</p>
      )}
    </div>
  );
}
