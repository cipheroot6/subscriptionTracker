import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import { useAuth } from '../context/AuthContext'; // Uncomment if needed
import "./oauthSuccess.css";

export default function OAuthSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(false);
  const processedRef = useRef(false); // Prevents React StrictMode double-firing

  useEffect(() => {
    // Prevent double execution in dev mode
    if (processedRef.current) return;
    processedRef.current = true;

    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      // 1. Save the token
      localStorage.setItem("token", token);

      // 2. Delay slightly for UX so the loading screen feels deliberate and premium
      setTimeout(() => {
        // Note: Using window.location.href instead of navigate() is often safer for OAuth
        // because it forces a full React state reload, ensuring your AuthContext
        // grabs the fresh token from localStorage on its initial mount!
        window.location.href = "/dashboard";
      }, 1500);
    } else {
      setError(true);
      setTimeout(() => navigate("/sign-in", { replace: true }), 2500);
    }
  }, [navigate, location]);

  return (
    <div className="os-page">
      {/* Ambient grid background */}
      <div className="os-grid" aria-hidden="true" />

      <div className="os-card">
        {error ? (
          <>
            <div className="os-icon-error">✕</div>
            <h2 className="os-title">Authentication Failed</h2>
            <p className="os-text">
              We couldn't securely verify your account. Redirecting you back to
              sign in...
            </p>
          </>
        ) : (
          <>
            <div className="os-spinner" />
            <h2 className="os-title">Authenticating...</h2>
            <p className="os-text">
              Securely connecting your account and loading your
              dashboard.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
