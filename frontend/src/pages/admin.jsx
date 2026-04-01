import { useState, useEffect, useCallback } from 'react';
import api from '../lib/api';
import Sidebar from '../components/Sidebar';
import './admin.css';

// ── Icons ─────────────────────────────────────────────────
const UsersIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const ReceiptIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 6 2 18 2 18 9" /><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
    <rect x="6" y="14" width="12" height="8" />
  </svg>
);

const TrendIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const RefreshIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
  </svg>
);

// ── Stat card ─────────────────────────────────────────────
function StatCard({ icon, label, value, sub, accent }) {
  return (
    <div className="admin-stat-card" style={{ '--accent': accent }}>
      <div className="admin-stat-icon">{icon}</div>
      <div className="admin-stat-body">
        <p className="admin-stat-label">{label}</p>
        <p className="admin-stat-value">{value}</p>
        {sub && <p className="admin-stat-sub">{sub}</p>}
      </div>
    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────
function fmt(date) {
  if (!date) return '—';
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function currency(price, curr) {
  const symbols = { USD: '$', EUR: '€', GBP: '£', JPY: '¥', AUD: 'A$' };
  return `${symbols[curr] || ''}${Number(price).toFixed(2)}`;
}

const STATUS_CLASS = { active: 'badge--active', expired: 'badge--expired', canceled: 'badge--canceled', pending: 'badge--pending' };

// ── Main ──────────────────────────────────────────────────
export default function Admin() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tab, setTab] = useState('users'); // 'users' | 'subscriptions'
  const [roleUpdating, setRoleUpdating] = useState(null);
  const [userSearch, setUserSearch] = useState('');
  const [subSearch, setSubSearch] = useState('');
  const [subStatusFilter, setSubStatusFilter] = useState('all');

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [usersRes, subsRes] = await Promise.all([
        api.get('/users/'),
        api.get('/subscription/'),
      ]);
      setUsers(usersRes.data.data || []);
      setSubs(subsRes.data.data || []);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load admin data.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const handleRoleToggle = async (userId, currentRole) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    setRoleUpdating(userId);
    try {
      const res = await api.patch(`/users/${userId}/role`, { role: newRole });
      setUsers(prev => prev.map(u => u._id === userId ? { ...u, role: res.data.data.role } : u));
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to update role.');
    } finally {
      setRoleUpdating(null);
    }
  };

  // Derived stats
  const activeSubs = subs.filter(s => s.status === 'active');
  const totalRevenue = activeSubs.reduce((sum, s) => sum + (s.price || 0), 0);
  const adminCount = users.filter(u => u.role === 'admin').length;

  // Filtered lists
  const filteredUsers = users.filter(u => {
    const q = userSearch.toLowerCase();
    return !q || u.name?.toLowerCase().includes(q) || u.email?.toLowerCase().includes(q);
  });

  const filteredSubs = subs.filter(s => {
    const q = subSearch.toLowerCase();
    const matchSearch = !q || s.name?.toLowerCase().includes(q);
    const matchStatus = subStatusFilter === 'all' || s.status === subStatusFilter;
    return matchSearch && matchStatus;
  });

  const userSubCount = (userId) => subs.filter(s => s.user === userId || s.user?._id === userId).length;

  return (
    <div className="admin-layout">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="admin-main">
        {/* Header */}
        <div className="admin-header">
          <div className="admin-header-left">
            <button className="sidebar-toggle-btn" onClick={() => setSidebarOpen(true)} aria-label="Open sidebar">
              <span /><span /><span />
            </button>
            <div>
              <div className="admin-title-row">
                <h1 className="admin-title">Admin</h1>
                <span className="admin-badge"><ShieldIcon /> Admin Panel</span>
              </div>
              <p className="admin-subtitle">Manage users and subscriptions across the platform</p>
            </div>
          </div>
          <button className="admin-refresh-btn" onClick={fetchAll} disabled={loading}>
            <RefreshIcon /> Refresh
          </button>
        </div>

        {error && <div className="admin-error">{error}</div>}

        {/* Stats */}
        <div className="admin-stats">
          <StatCard icon={<UsersIcon />} label="Total Users" value={loading ? '—' : users.length} sub={`${adminCount} admin${adminCount !== 1 ? 's' : ''}`} accent="#818cf8" />
          <StatCard icon={<ReceiptIcon />} label="Total Subscriptions" value={loading ? '—' : subs.length} sub={`${activeSubs.length} active`} accent="#34d399" />
          <StatCard icon={<TrendIcon />} label="Monthly Revenue" value={loading ? '—' : `$${totalRevenue.toFixed(2)}`} sub="from active subs" accent="#f59e0b" />
        </div>

        {/* Tabs */}
        <div className="admin-tabs">
          <button className={`admin-tab${tab === 'users' ? ' active' : ''}`} onClick={() => setTab('users')}>
            Users <span className="admin-tab-count">{users.length}</span>
          </button>
          <button className={`admin-tab${tab === 'subscriptions' ? ' active' : ''}`} onClick={() => setTab('subscriptions')}>
            Subscriptions <span className="admin-tab-count">{subs.length}</span>
          </button>
        </div>

        {/* Users table */}
        {tab === 'users' && (
          <div className="admin-table-card">
            <div className="admin-table-toolbar">
              <input
                className="admin-search"
                placeholder="Search by name or email…"
                value={userSearch}
                onChange={e => setUserSearch(e.target.value)}
              />
            </div>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Role</th>
                    <th>Subscriptions</th>
                    <th>Joined</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    Array.from({ length: 4 }).map((_, i) => (
                      <tr key={i} className="admin-row-skeleton">
                        <td colSpan={5}><div className="skeleton" /></td>
                      </tr>
                    ))
                  ) : filteredUsers.length === 0 ? (
                    <tr><td colSpan={5} className="admin-empty">No users found.</td></tr>
                  ) : filteredUsers.map(u => (
                    <tr key={u._id}>
                      <td>
                        <div className="admin-user-cell">
                          <div className="admin-user-avatar">
                            {(u.name || '?').split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)}
                          </div>
                          <div>
                            <p className="admin-user-name">{u.name}</p>
                            <p className="admin-user-email">{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`badge badge--role-${u.role}`}>{u.role}</span>
                      </td>
                      <td>
                        <span className="admin-sub-count">{userSubCount(u._id)}</span>
                      </td>
                      <td className="admin-date">{fmt(u.createdAt)}</td>
                      <td>
                        <button
                          className={`admin-role-btn${u.role === 'admin' ? ' admin-role-btn--demote' : ''}`}
                          onClick={() => handleRoleToggle(u._id, u.role)}
                          disabled={roleUpdating === u._id}
                        >
                          {roleUpdating === u._id ? '…' : u.role === 'admin' ? 'Remove Admin' : 'Make Admin'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Subscriptions table */}
        {tab === 'subscriptions' && (
          <div className="admin-table-card">
            <div className="admin-table-toolbar">
              <input
                className="admin-search"
                placeholder="Search by service name…"
                value={subSearch}
                onChange={e => setSubSearch(e.target.value)}
              />
              <select className="admin-select" value={subStatusFilter} onChange={e => setSubStatusFilter(e.target.value)}>
                <option value="all">All statuses</option>
                <option value="active">Active</option>
                <option value="expired">Expired</option>
                <option value="canceled">Canceled</option>
                <option value="pending">Pending</option>
              </select>
            </div>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Service</th>
                    <th>Price</th>
                    <th>Frequency</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Renewal</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    Array.from({ length: 4 }).map((_, i) => (
                      <tr key={i} className="admin-row-skeleton">
                        <td colSpan={6}><div className="skeleton" /></td>
                      </tr>
                    ))
                  ) : filteredSubs.length === 0 ? (
                    <tr><td colSpan={6} className="admin-empty">No subscriptions found.</td></tr>
                  ) : filteredSubs.map(s => (
                    <tr key={s._id}>
                      <td>
                        <span className="admin-service-name">{s.name}</span>
                      </td>
                      <td className="admin-price">{currency(s.price, s.currency)}</td>
                      <td className="admin-freq">{s.frequency}</td>
                      <td className="admin-cat">{s.category}</td>
                      <td>
                        <span className={`badge ${STATUS_CLASS[s.status] || ''}`}>{s.status}</span>
                      </td>
                      <td className="admin-date">{fmt(s.renewalDate)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
