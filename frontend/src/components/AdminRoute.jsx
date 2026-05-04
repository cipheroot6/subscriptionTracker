import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminRoute({ children }) {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#0a0a0b',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#52525b',
        fontSize: '0.875rem',
      }}>
        Loading…
      </div>
    );
  }

  if (!isAuthenticated) return <Navigate to="/sign-in" replace />;
  if (user?.role !== 'admin') return <Navigate to="/" replace />;

  if (!user?.isVerified) {
    return <Navigate to={`/verify-email?email=${user?.email}`} replace />;
  }

  return children;
}
