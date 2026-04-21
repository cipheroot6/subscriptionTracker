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
import NotFound from "./pages/notFound";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";

function App() {
  return (
    <>
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />

        {/* Regular user pages — admins are blocked and redirected to /admin */}
        <Route
          path="/"
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

        {/* Settings is accessible to both roles */}
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
