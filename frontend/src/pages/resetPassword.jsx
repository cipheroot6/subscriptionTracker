import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import api from '../lib/api';
import './resetPassword.css';

// ── Icons ──────────────────────────────────────────────────────────────────────

const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const KeyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
  </svg>
);

// ── Component ──────────────────────────────────────────────────────────────────

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!token) {
      setError('Invalid or missing reset token.');
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!token) {
      setError('Invalid or missing reset token.');
      return;
    }

    if (!password) {
      setError('Please enter a new password.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      await api.post('/auth/reset-password', { token, newPassword: password });
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rp-page">
      {/* Dot grid background */}
      <div className="rp-grid" aria-hidden="true" />

      <div className="rp-card">

        {submitted ? (
          /* ── Success state ── */
          <div className="rp-success">
            <div className="rp-success-icon">
              <CheckIcon />
            </div>
            <h2 className="rp-success-title">Password Reset</h2>
            <p className="rp-success-body">
              Your password has been successfully reset.
            </p>
            <p className="rp-success-hint">
              You can now sign in with your new password.
            </p>
            <Link to="/sign-in" className="rp-try-again" style={{ display: 'inline-block', textDecoration: 'none', textAlign: 'center' }}>
              Sign In
            </Link>
          </div>

        ) : (
          /* ── Form state ── */
          <>
            <div className="rp-header">
              <div className="rp-icon-wrap">
                <LockIcon />
              </div>
              <h1 className="rp-title">Set new password</h1>
              <p className="rp-subtitle">
                Please enter your new password below.
              </p>
            </div>

            <form className="rp-form" onSubmit={handleSubmit} noValidate>
              {error && (
                <div className="rp-error" role="alert">
                  {error}
                </div>
              )}

              <div className="rp-field">
                <label htmlFor="rp-password">New Password</label>
                <div className="rp-input-wrap">
                  <span className="rp-input-icon">
                    <KeyIcon />
                  </span>
                  <input
                    id="rp-password"
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (error) setError('');
                    }}
                    autoFocus
                    disabled={loading || !token}
                  />
                </div>
              </div>

              <div className="rp-field">
                <label htmlFor="rp-confirm">Confirm Password</label>
                <div className="rp-input-wrap">
                  <span className="rp-input-icon">
                    <KeyIcon />
                  </span>
                  <input
                    id="rp-confirm"
                    type="password"
                    name="confirmPassword"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (error) setError('');
                    }}
                    disabled={loading || !token}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="rp-submit"
                disabled={loading || !token}
              >
                {loading ? (
                  <>
                    <span className="rp-spinner" />
                    Resetting…
                  </>
                ) : (
                  'Reset Password'
                )}
              </button>
            </form>
          </>
        )}

        {/* Footer link — always visible */}
        <div className="rp-footer">
          <ArrowLeftIcon />
          <Link to="/sign-in">Back to sign in</Link>
        </div>

      </div>
    </div>
  );
}
