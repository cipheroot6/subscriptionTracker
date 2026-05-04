import { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import api from '../lib/api';
import { useAuth } from '../context/AuthContext';
import './verifyEmail.css';

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const [status, setStatus] = useState('idle'); // idle | verifying | success | error
  const [error, setError] = useState('');
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  // Guard against double-invocation (React StrictMode in dev, or signIn
  // reference change triggering the effect a second time after success).
  const verifyCalledRef = useRef(false);

  // if token in URL, verify it immediately
  useEffect(() => {
    if (!token || verifyCalledRef.current) return;
    verifyCalledRef.current = true;

    setStatus('verifying');
    api.get(`/auth/verify-email?token=${token}`)
      .then((res) => {
        const { token: jwt, user } = res.data.data;
        signIn(jwt, user);
        setStatus('success');
        setTimeout(() => navigate('/'), 2000);
      })
      .catch((err) => {
        setStatus('error');
        setError(err.response?.data?.error || 'This link is invalid or has expired.');
      });
  }, [token, navigate, signIn]);

  const handleResend = async () => {
    if (!email) return;
    setResendLoading(true);
    try {
      await api.post('/auth/resend-verification', { email });
      setResendSuccess(true);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to resend. Please try again.');
    } finally {
      setResendLoading(false);
    }
  };

  // verifying token state
  if (token && status === 'verifying') {
    return (
      <div className="ve-page">
        <div className="ve-card">
          <div className="ve-spinner" />
          <p>Verifying your email...</p>
        </div>
      </div>
    );
  }

  // success state
  if (status === 'success') {
    return (
      <div className="ve-page">
        <div className="ve-card">
          <div className="ve-icon ve-icon--success">✓</div>
          <h2>Email verified!</h2>
          <p>Redirecting you to the dashboard...</p>
        </div>
      </div>
    );
  }

  // error state (invalid/expired token)
  if (status === 'error') {
    return (
      <div className="ve-page">
        <div className="ve-card">
          <div className="ve-icon ve-icon--error">✕</div>
          <h2>Link expired</h2>
          <p>{error}</p>
          <Link to="/sign-up" className="ve-btn-primary">Back to sign up</Link>
        </div>
      </div>
    );
  }

  // default state: check your inbox
  return (
    <div className="ve-page">
      <div className="ve-card">
        <div className="ve-icon">📧</div>
        <h2>Check your inbox</h2>
        <p>
          We sent a verification link to{' '}
          <strong>{email || 'your email address'}</strong>.
          Click it to activate your account.
        </p>
        <p className="ve-sub">The link expires in 24 hours.</p>

        {resendSuccess ? (
          <p className="ve-resend-success">Email resent! Check your inbox.</p>
        ) : (
          <button
            className="ve-btn-secondary"
            onClick={handleResend}
            disabled={resendLoading || !email}
          >
            {resendLoading ? 'Sending...' : 'Resend email'}
          </button>
        )}

        <p className="ve-footer">
          Wrong email? <Link to="/sign-up">Sign up again</Link>
        </p>
      </div>
    </div>
  );
}
