import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../lib/api';
import Sidebar from '../components/Sidebar';
import SummaryCards from '../components/dashboard/SummaryCards';
import BudgetBar from '../components/dashboard/BudgetBar';
import CategoryChart from '../components/dashboard/CategoryChart';
import UpcomingRenewals from '../components/dashboard/UpcomingRenewals';
import SubscriptionList from '../components/dashboard/SubscriptionList';
import AddSubscriptionModal from '../components/modals/AddSubscriptionModal';
import './dashboard.css';

export default function Dashboard() {
  const { user } = useAuth();
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fetchSubscriptions = useCallback(async () => {
    if (!user?._id) return;
    setLoading(true);
    setError('');
    try {
      const res = await api.get(`/subscription/user/${user._id}`);
      setSubscriptions(res.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load subscriptions.');
    } finally {
      setLoading(false);
    }
  }, [user?._id]);

  useEffect(() => {
    fetchSubscriptions();
  }, [fetchSubscriptions]);

  return (
    <div className="dashboard-layout">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="dashboard-main">
        {/* Page header */}
        <div className="dashboard-header">
          <div className="dashboard-header-left">
            {/* Hamburger — only visible on mobile */}
            <button
              className="sidebar-toggle-btn"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <span /><span /><span />
            </button>
            <div>
              <h1 className="dashboard-title">Dashboard</h1>
              <p className="dashboard-welcome">
                Welcome back{user?.name ? `, ${user.name.split(' ')[0]}` : ''}
              </p>
            </div>
          </div>
          <button className="dashboard-add-btn" onClick={() => setShowAddModal(true)}>
            + Add Subscription
          </button>
        </div>

        {error && (
          <div className="dashboard-error" role="alert">
            {error}
            <button onClick={fetchSubscriptions} className="retry-btn">Retry</button>
          </div>
        )}

        {/* Summary cards */}
        <SummaryCards subscriptions={subscriptions} loading={loading} />

        {/* Budget bar */}
        {!loading && <BudgetBar subscriptions={subscriptions} />}

        {/* Charts row */}
        <div className="dashboard-charts-row">
          <CategoryChart subscriptions={subscriptions} />
          <UpcomingRenewals subscriptions={subscriptions} />
        </div>

        {/* Subscription list */}
        <SubscriptionList
          subscriptions={subscriptions}
          loading={loading}
          onRefresh={fetchSubscriptions}
          onAdd={() => setShowAddModal(true)}
        />
      </main>

      {showAddModal && (
        <AddSubscriptionModal
          onClose={() => setShowAddModal(false)}
          onSuccess={() => {
            setShowAddModal(false);
            fetchSubscriptions();
          }}
        />
      )}
    </div>
  );
}
