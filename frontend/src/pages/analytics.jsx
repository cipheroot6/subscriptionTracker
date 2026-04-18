import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../lib/api';
import Sidebar from '../components/Sidebar';
import AnalyticsSummaryRow from '../components/analytics/AnalyticsSummaryRow';
import CategoryBreakdown from '../components/analytics/CategoryBreakdown';
import SpendByFrequency from '../components/analytics/SpendByFrequency';
import TopSubscriptions from '../components/analytics/TopSubscriptions';
import PaymentMethodsChart from '../components/analytics/PaymentMethodsChart';
import StatusDistribution from '../components/analytics/StatusDistribution';
import './analytics.css';

export default function Analytics() {
  const { user } = useAuth();
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fetchSubscriptions = useCallback(async () => {
    if (!user?._id) return;
    setLoading(true); setError('');
    try {
      const res = await api.get(`/subscription/user/${user._id}`);
      setSubscriptions(res.data.data || []);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load your data.');
    } finally { setLoading(false); }
  }, [user?._id]);

  useEffect(() => { fetchSubscriptions(); }, [fetchSubscriptions]);

  return (
    <div className="analytics-layout">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="analytics-main">
        <div className="analytics-header">
          <div className="analytics-header-left">
            <button className="sidebar-toggle-btn" onClick={() => setSidebarOpen(true)} aria-label="Open sidebar">
              <span /><span /><span />
            </button>
            <div>
              <h1 className="analytics-title">Analytics</h1>
              <p className="analytics-subtitle">Insights across your subscription portfolio</p>
            </div>
          </div>
        </div>

        {error && (
          <div className="analytics-error" role="alert">
            {error}
            <button onClick={fetchSubscriptions} className="retry-btn">Retry</button>
          </div>
        )}

        {loading ? (
          <div className="analytics-loading">
            {[1,2,3,4,5,6].map(i => <div key={i} className="analytics-skeleton" />)}
          </div>
        ) : (
          <>
            <AnalyticsSummaryRow subscriptions={subscriptions} />

            <div className="analytics-row-2">
              <CategoryBreakdown subscriptions={subscriptions} />
              <SpendByFrequency subscriptions={subscriptions} />
            </div>

            <div className="analytics-row-3">
              <TopSubscriptions subscriptions={subscriptions} />
              <PaymentMethodsChart subscriptions={subscriptions} />
              <StatusDistribution subscriptions={subscriptions} />
            </div>
          </>
        )}
      </main>
    </div>
  );
}
