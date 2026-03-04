import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import api from './lib/api'
import './App.css'

function Home() {
  const [backendStatus, setBackendStatus] = useState('Checking...')

  useEffect(() => {
    api.get('/auth/test')
      .then(() => setBackendStatus('Connected'))
      .catch(() => {
        api.get('/')
          .then(() => setBackendStatus('Connected (no auth)'))
          .catch(() => setBackendStatus('Disconnected'))
      })
  }, [])

  return (
    <div>
      <h1>Frontend Connected</h1>
      <p>Backend Status: {backendStatus}</p>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  )
}

export default App
