import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Loader = () => (
  <div
    style={{
      minHeight: "100vh",
      background: "#0a0a0b",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#52525b",
      fontSize: "0.875rem",
    }}
  >
    Loading…
  </div>
);

// Public pages — redirect authenticated users away
export default function PublicRoute({ children }) {
  const { isAuthenticated, loading, user } = useAuth();
  if (loading) return <Loader />;
  if (isAuthenticated) {
    return (
      <Navigate to={user?.role === "admin" ? "/admin" : "/dashboard"} replace />
    );
  }
  return children;
}
