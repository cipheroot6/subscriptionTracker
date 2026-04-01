import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../lib/api';
import Sidebar from '../components/Sidebar';
import SubscriptionPageStats from '../components/subscriptions/SubscriptionPageStats';
import SubscriptionFilters from '../components/subscriptions/SubscriptionFilters';
import SubscriptionTable from '../components/subscriptions/SubscriptionTable';
import SubscriptionCards from '../components/subscriptions/SubscriptionCards';
import AddSubscriptionModal from '../components/modals/AddSubscriptionModal';
import './subscriptions.css';

const DEFAULT_FILTERS = { search: '', status: 'all', category: 'all', sort: 'renewalDate', view: 'table' };

function applyFilters(subs, { search, status, category, sort }) {
  return subs
    .filter(s => status === 'all' || s.status === status)
    .filter(s => category === 'all' || s.category === category)
    .filter(s => !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.paymentMethod?.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === 'renewalDate') return new Date(a.renewalDate) - new Date(b.renewalDate);
      if (sort === 'price')       return b.price - a.price;
      if (sort === 'name')        return a.name.localeCompare(b.name);
      if (sort === 'createdAt')   return new Date(b.createdAt || b.startDate) - new Date(a.createdAt || a.startDate);
      return 0;
    });
}

export default function Subscriptions() {
  const { user } = useAuth();
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const fetchSubscriptions = useCallback(async () => {
    if (!user?._id) return;
    setLoading(true); setError('');
    try {
      const res = await api.get(`/subscription/user/${user._id}`);
      setSubscriptions(res.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load subscriptions.');
    } finally { setLoading(false); }
  }, [user?._id]);

  useEffect(() => { fetchSubscriptions(); }, [fetchSubscriptions]);

  const filtered = applyFilters(subscriptions, filters);

  return (
    <div className="subs-layout">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="subs-main">
        <div className="subs-header">
          <div className="subs-header-left">
            <button className="sidebar-toggle-btn" onClick={() => setSidebarOpen(true)} aria-label="Open sidebar">
              <span /><span /><span />
            </button>
            <div>
              <h1 className="subs-title">Subscriptions</h1>
              <p className="subs-subtitle">Manage all your subscriptions</p>
            </div>
          </div>
          <button className="subs-add-btn" onClick={() => setShowAddModal(true)}>
            + Add Subscription
          </button>
        </div>

        {error && (
          <div className="subs-error" role="alert">
            {error}
            <button onClick={fetchSubscriptions} className="retry-btn">Retry</button>
          </div>
        )}

        <SubscriptionPageStats subscriptions={subscriptions} />

        <SubscriptionFilters filters={filters} onChange={setFilters} />

        <div className="subs-results-bar">
          <span className="subs-count">
            {filtered.length === subscriptions.length
              ? `${subscriptions.length} subscription${subscriptions.length !== 1 ? 's' : ''}`
              : `${filtered.length} of ${subscriptions.length} shown`}
          </span>
          {(filters.search || filters.status !== 'all' || filters.category !== 'all') && (
            <button className="subs-clear" onClick={() => setFilters(DEFAULT_FILTERS)}>
              Clear filters
            </button>
          )}
        </div>

        {filters.view === 'table' ? (
          <SubscriptionTable subscriptions={filtered} loading={loading} onRefresh={fetchSubscriptions} />
        ) : (
          <SubscriptionCards subscriptions={filtered} loading={loading} onRefresh={fetchSubscriptions} />
        )}
      </main>

      {showAddModal && (
        <AddSubscriptionModal
          onClose={() => setShowAddModal(false)}
          onSuccess={() => { setShowAddModal(false); fetchSubscriptions(); }}
        />
      )}
    </div>
  );
}
