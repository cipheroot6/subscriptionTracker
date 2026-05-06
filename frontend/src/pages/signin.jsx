import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../lib/api";
import { useAuth } from "../context/AuthContext";
import "./signin.css";

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const DiscordIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026c.462-.62.874-1.275 1.226-1.963.021-.04.001-.088-.041-.104a13.201 13.201 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z" />
  </svg>
);

const EyeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

export default function SignIn() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/auth/sign-in", formData);
      const { token, user } = res.data.data;
      signIn(token, user);
      navigate(user.role === "admin" ? "/admin" : "/", { replace: true });
    } catch (err) {
      if (err.response?.status === 403) {
        navigate(`/verify-email?email=${formData.email}`);
        return;
      }
      setError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setError("");
    setDemoLoading(true);
    try {
      const res = await api.post("/auth/sign-in", {
        email: "demo@subtracker.dev",
        password: "Demo1234!",
      });
      const { token, user } = res.data.data;
      signIn(token, user);
      navigate(user.role === "admin" ? "/admin" : "/", { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "Demo login failed. Please try again.",
      );
    } finally {
      setDemoLoading(false);
    }
  };

  const handleOAuth = (provider) => {
    const baseUrl = import.meta.env.VITE_API_URL || "/api/v1";
    window.location.href = `${baseUrl}/auth/${provider}`;
  };

  return (
    <div className="signin-page">
      <div className="signin-card">
        <div className="signin-header">
          <h1>Sign in</h1>
          <p>Welcome back to your account</p>
        </div>

        <div className="oauth-section">
          <button type="button" className="oauth-btn" id="google-oauth-btn" onClick={() => handleOAuth("google")}>
            <GoogleIcon /> Continue with Google
          </button>
          <button type="button" className="oauth-btn" id="github-oauth-btn" onClick={() => handleOAuth("github")}>
            <GitHubIcon /> Continue with GitHub
          </button>
          <button type="button" className="oauth-btn" id="discord-oauth-btn" onClick={() => handleOAuth("discord")}>
            <DiscordIcon /> Continue with Discord
          </button>
        </div>

        <div className="divider"><span>or</span></div>

        <form className="signin-form" onSubmit={handleSubmit} noValidate>
          {error && <div className="error-message" role="alert">{error}</div>}

          <div className="form-group">
            <label htmlFor="signin-email">Email</label>
            <input id="signin-email" type="email" name="email" placeholder="you@example.com"
              value={formData.email} onChange={handleChange} autoComplete="email" />
          </div>

          <div className="form-group">
            <label htmlFor="signin-password">Password</label>
            <div className="password-wrapper">
              <input id="signin-password" type={showPassword ? "text" : "password"} name="password"
                placeholder="Your password" value={formData.password} onChange={handleChange}
                autoComplete="current-password" />
              <button type="button" className="password-toggle"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}>
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          <button type="submit" className="submit-btn" id="signin-submit-btn" disabled={loading || demoLoading}>
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <div className="demo-btn-wrapper">
          <button
            type="button"
            className="demo-btn"
            onClick={handleDemoLogin}
            disabled={loading || demoLoading}
          >
            {demoLoading ? "Loading demo…" : "Try demo account"}
          </button>
        </div>

        <p className="signin-forgot-row">
          <Link to="/forgot-password" className="forgot-link">Forgot password?</Link>
        </p>

        <p className="signin-footer">
          Don&#39;t have an account? <Link to="/sign-up">Sign up</Link>
        </p>
      </div>

      <div className="signin-branding">
        <div className="branding-content">
          <div className="branding-logo-row">
            <img src="/logo.png" alt="SubTracker logo" className="branding-logo" />
            <span className="branding-label">Subscription Tracker</span>
          </div>
          <p className="branding-tagline">Your subscriptions, under control.</p>

          <div className="mock-dashboard">
            <div className="mock-summary">
              <div className="mock-summary-left">
                <span className="mock-summary-label">Monthly spend</span>
                <span className="mock-summary-amount">$47.97</span>
              </div>
              <div className="mock-summary-right">
                <span className="mock-badge">3 renewing soon</span>
              </div>
            </div>
            <div className="mock-spend-bar">
              <div className="mock-spend-bar-fill" style={{ width: "62%" }} />
            </div>
            <div className="mock-spend-bar-meta">
              <span>$47.97 of $80 budget</span><span>62%</span>
            </div>
            <div className="mock-sub-list">
              {[
                { name: "Netflix",  category: "Streaming",    amount: "$15.99", due: "Apr 3",  color: "#e50914", initial: "N" },
                { name: "Spotify",  category: "Music",        amount: "$9.99",  due: "Apr 7",  color: "#1db954", initial: "S" },
                { name: "GitHub",   category: "Dev Tools",    amount: "$4.00",  due: "Apr 12", color: "#6e40c9", initial: "G" },
                { name: "Figma",    category: "Design",       amount: "$12.00", due: "Apr 18", color: "#f24e1e", initial: "F" },
                { name: "Notion",   category: "Productivity", amount: "$8.00",  due: "Apr 22", color: "#a8a8a8", initial: "N" },
              ].map((sub) => (
                <div className="mock-sub-card" key={sub.name}>
                  <div className="mock-sub-icon" style={{ background: `${sub.color}18`, border: `1px solid ${sub.color}30` }}>
                    <span style={{ color: sub.color }}>{sub.initial}</span>
                  </div>
                  <div className="mock-sub-info">
                    <span className="mock-sub-name">{sub.name}</span>
                    <span className="mock-sub-category">{sub.category}</span>
                  </div>
                  <div className="mock-sub-right">
                    <span className="mock-sub-amount">{sub.amount}</span>
                    <span className="mock-sub-due">Renews {sub.due}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
