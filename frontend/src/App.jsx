import { Routes, Route } from 'react-router-dom'
import './App.css'
import SignUp from './pages/signUp'
import SignIn from './pages/signin'
import ForgetPassword from './pages/forgotPassword'
import Dashboard from './pages/dashboard'
import NotFound from './pages/notFound'
import ProtectedRoute from './components/protectedRoutes'

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
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
