import { Routes, Route } from 'react-router-dom'
import './App.css'
import SignUp from './pages/signUp'
import SignIn from './pages/signin'
import ForgetPassword from './pages/forgotPassword'
import Dashboard from './pages/dashboard'
import Settings from './pages/settings'
import Admin from './pages/admin'
import ProtectedRoute from './components/protectedRoutes'
import AdminRoute from './components/AdminRoute'

function App() {
  return (
    <Routes>
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/forgot-password" element={<ForgetPassword />} />
      <Route path="/" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/settings" element={
        <ProtectedRoute>
          <Settings />
        </ProtectedRoute>
      } />
      <Route path="/admin" element={
        <AdminRoute>
          <Admin />
        </AdminRoute>
      } />
    </Routes>
  )
}

export default App
