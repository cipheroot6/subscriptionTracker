import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../lib/api';
import Sidebar from '../components/Sidebar';
import './settings.css';

function getInitials(name = '') {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || '?';
}

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const AlertIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

function Section({ title, description, children }) {
  return (
    <div className="settings-section">
      <div className="settings-section-header">
        <h2 className="settings-section-title">{title}</h2>
        {description && <p className="settings-section-desc">{description}</p>}
      </div>
      <div className="settings-section-body">{children}</div>
    </div>
  );
}

function Toast({ type, message, onDismiss }) {
  if (!message) return null;
  return (
    <div className={`settings-toast settings-toast--${type}`} onClick={onDismiss}>
      <span className="settings-toast-icon">{type === 'success' ? <CheckIcon /> : <AlertIcon />}</span>
      {message}
    </div>
  );
}

export default function Settings() {
  const { user, signIn, token, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Profile form
  const [profile, setProfile] = useState({ name: user?.name || '', email: user?.email || '' });
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileToast, setProfileToast] = useState(null);

  // Password form
  const [pwForm, setPwForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [pwLoading, setPwLoading] = useState(false);
  const [pwToast, setPwToast] = useState(null);

  // Delete
  const [deleteConfirm, setDeleteConfirm] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteToast, setDeleteToast] = useState(null);

  const toast = (setter, type, message) => {
    setter({ type, message });
    setTimeout(() => setter(null), 4000);
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    if (!profile.name.trim()) return toast(setProfileToast, 'error', 'Name cannot be empty.');
    if (!profile.email.trim()) return toast(setProfileToast, 'error', 'Email cannot be empty.');
    setProfileLoading(true);
    try {
      const res = await api.put(`/users/${user._id}`, {
        name: profile.name,
        email: profile.email,
      });
      // Refresh user in AuthContext
      signIn(token, res.data.data);
      toast(setProfileToast, 'success', 'Profile updated successfully.');
    } catch (err) {
      toast(setProfileToast, 'error', err.response?.data?.error || 'Failed to update profile.');
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordSave = async (e) => {
    e.preventDefault();
    if (!pwForm.currentPassword) return toast(setPwToast, 'error', 'Enter your current password.');
    if (pwForm.newPassword.length < 6) return toast(setPwToast, 'error', 'New password must be at least 6 characters.');
    if (pwForm.newPassword !== pwForm.confirmPassword) return toast(setPwToast, 'error', 'Passwords do not match.');
    setPwLoading(true);
    try {
      await api.put(`/users/${user._id}`, {
        currentPassword: pwForm.currentPassword,
        newPassword: pwForm.newPassword,
      });
      setPwForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      toast(setPwToast, 'success', 'Password changed successfully.');
    } catch (err) {
      toast(setPwToast, 'error', err.response?.data?.error || 'Failed to change password.');
    } finally {
      setPwLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirm !== 'DELETE') return toast(setDeleteToast, 'error', 'Type DELETE to confirm.');
    setDeleteLoading(true);
    try {
      await api.delete(`/users/${user._id}`);
      logout();
    } catch (err) {
      toast(setDeleteToast, 'error', err.response?.data?.error || 'Failed to delete account.');
      setDeleteLoading(false);
    }
  };

  return (
    <div className="settings-layout">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="settings-main">
        <div className="settings-header">
          <div className="settings-header-left">
            <button className="sidebar-toggle-btn" onClick={() => setSidebarOpen(true)} aria-label="Open sidebar">
              <span /><span /><span />
            </button>
            <div>
              <h1 className="settings-title">Settings</h1>
              <p className="settings-subtitle">Manage your account and preferences</p>
            </div>
          </div>
        </div>

        <div className="settings-content">

          {/* Profile */}
          <Section title="Profile" description="Update your display name and email address.">
            <div className="settings-avatar-row">
              <div className="settings-avatar">{getInitials(user?.name)}</div>
              <div>
                <p className="settings-avatar-name">{user?.name || '—'}</p>
                <p className="settings-avatar-email">{user?.email || ''}</p>
              </div>
            </div>
            <form onSubmit={handleProfileSave} noValidate>
              <div className="settings-fields">
                <div className="settings-field">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={e => setProfile(p => ({ ...p, name: e.target.value }))}
                    placeholder="Your name"
                  />
                </div>
                <div className="settings-field">
                  <label>Email Address</label>
                  <div className="settings-readonly-text">{profile.email}</div>
                </div>
              </div>
              <Toast {...(profileToast || {})} onDismiss={() => setProfileToast(null)} />
              <div className="settings-actions">
                <button type="submit" className="btn-primary" disabled={profileLoading}>
                  {profileLoading ? 'Saving…' : 'Save Changes'}
                </button>
              </div>
            </form>
          </Section>

          {/* Password */}
          <Section title="Password" description="Use a strong password you don't use elsewhere.">
            <form onSubmit={handlePasswordSave} noValidate>
              <div className="settings-fields">
                <div className="settings-field">
                  <label>Current Password</label>
                  <input
                    type="password"
                    value={pwForm.currentPassword}
                    onChange={e => setPwForm(p => ({ ...p, currentPassword: e.target.value }))}
                    placeholder="••••••••"
                    autoComplete="current-password"
                  />
                </div>
                <div className="settings-field">
                  <label>New Password</label>
                  <input
                    type="password"
                    value={pwForm.newPassword}
                    onChange={e => setPwForm(p => ({ ...p, newPassword: e.target.value }))}
                    placeholder="••••••••"
                    autoComplete="new-password"
                  />
                </div>
                <div className="settings-field">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    value={pwForm.confirmPassword}
                    onChange={e => setPwForm(p => ({ ...p, confirmPassword: e.target.value }))}
                    placeholder="••••••••"
                    autoComplete="new-password"
                  />
                </div>
              </div>
              <Toast {...(pwToast || {})} onDismiss={() => setPwToast(null)} />
              <div className="settings-actions">
                <button type="submit" className="btn-primary" disabled={pwLoading}>
                  {pwLoading ? 'Updating…' : 'Update Password'}
                </button>
              </div>
            </form>
          </Section>

          {/* Account info */}
          <Section title="Account Info">
            <div className="settings-info-grid">
              <div className="settings-info-item">
                <span className="settings-info-label">Account ID</span>
                <span className="settings-info-value settings-info-mono">{user?._id || '—'}</span>
              </div>
              <div className="settings-info-item">
                <span className="settings-info-label">Role</span>
                <span className={`settings-badge settings-badge--${user?.role}`}>{user?.role || 'user'}</span>
              </div>
              <div className="settings-info-item">
                <span className="settings-info-label">Member Since</span>
                <span className="settings-info-value">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '—'}
                </span>
              </div>
            </div>
          </Section>

          {/* Danger Zone */}
          <Section title="Danger Zone">
            <div className="settings-danger-box">
              <div className="settings-danger-text">
                <p className="settings-danger-title">Delete Account</p>
                <p className="settings-danger-desc">
                  Permanently deletes your account and all your subscriptions. This cannot be undone.
                </p>
              </div>
              <div className="settings-field" style={{ maxWidth: '320px' }}>
                <label>Type <strong>DELETE</strong> to confirm</label>
                <input
                  type="text"
                  value={deleteConfirm}
                  onChange={e => setDeleteConfirm(e.target.value)}
                  placeholder="DELETE"
                  className="settings-danger-input"
                />
              </div>
              <Toast {...(deleteToast || {})} onDismiss={() => setDeleteToast(null)} />
              <div className="settings-actions">
                <button
                  type="button"
                  className="btn-danger"
                  disabled={deleteLoading || deleteConfirm !== 'DELETE'}
                  onClick={handleDeleteAccount}
                >
                  {deleteLoading ? 'Deleting…' : 'Delete My Account'}
                </button>
              </div>
            </div>
          </Section>

        </div>
      </main>
    </div>
  );
}
