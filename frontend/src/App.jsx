import { Routes, Route } from 'react-router-dom'
import './App.css'
import SignUp from './pages/signUp'
import Dashboard from './pages/dashboard'
import ProtectedRoute from './components/protectedRoutes'

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
    </Routes>
  )
}

export default App