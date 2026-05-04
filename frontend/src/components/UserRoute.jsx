import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Loader = () => (
  <div style={{
    minHeight: '100vh', background: '#0a0a0b',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: '#52525b', fontSize: '0.875rem',
  }}>Loading…</div>
);

// Regular user pages — admins are redirected to /admin
export default function UserRoute({ children }) {
  const { user, isAuthenticated, loading } = useAuth();
  if (loading) return <Loader />;
  if (!isAuthenticated) return <Navigate to="/sign-in" replace />;
  if (user?.role === 'admin') return <Navigate to="/admin" replace />;
  if (!user?.isVerified) {
    return <Navigate to={`/verify-email?email=${user?.email}`} replace />;
  }
  return children;
}
