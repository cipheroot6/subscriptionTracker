import { Routes, Route } from "react-router-dom";
import "./App.css";
import SignUp from "./pages/signUp";
import SignIn from "./pages/signin";
import ForgetPassword from "./pages/forgotPassword";
import Dashboard from "./pages/dashboard";
import Settings from "./pages/settings";
import Admin from "./pages/admin";
import Subscriptions from "./pages/subscriptions";
import Analytics from "./pages/analytics";
import ProtectedRoute from "./components/protectedRoutes";
import UserRoute from "./components/UserRoute";
import AdminRoute from "./components/AdminRoute";
import PublicRoute from "./components/PublicRoute";
import NotFound from "./pages/notFound";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import Landing from "./pages/landingPage";
import VerifyEmail from "./pages/verifyEmail";
import ResetPassword from "./pages/resetPassword";

function App() {
  return (
    <>
      <Routes>
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/"
          element={
            <PublicRoute>
              <Landing />
            </PublicRoute>
          }
        />
        <Route
          path="/sign-up"
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />
        <Route
          path="/sign-in"
          element={
            <PublicRoute>
              <SignIn />
            </PublicRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <PublicRoute>
              <ForgetPassword />
            </PublicRoute>
          }
        />
        <Route path="/verify-email" element={<VerifyEmail />} />

        {/* Regular user pages */}
        <Route
          path="/dashboard"
          element={
            <UserRoute>
              <Dashboard />
            </UserRoute>
          }
        />
        <Route
          path="/subscriptions"
          element={
            <UserRoute>
              <Subscriptions />
            </UserRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <UserRoute>
              <Analytics />
            </UserRoute>
          }
        />

        {/* Settings accessible to both roles */}
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        {/* Admin only */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <VercelAnalytics />
    </>
  );
}

export default App;
