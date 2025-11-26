import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

interface HealthResponse {
  status: string;
  timestamp: string;
  service: string;
}

function App() {
  const [message, setMessage] = useState<string>('Cargando...')
  const [health, setHealth] = useState<HealthResponse | null>(null)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    // Obtener mensaje del backend
    axios.get('http://localhost:3000')
      .then(response => {
        setMessage(response.data)
      })
      .catch(err => {
        setError('Error al conectar con el backend')
        console.error(err)
      })

    // Verificar salud del backend
    axios.get<HealthResponse>('http://localhost:3000/api/health')
      .then(response => {
        setHealth(response.data)
      })
      .catch(err => {
        console.error('Error al verificar salud:', err)
      })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>🚀 Dashboard AI</h1>
        <p className="subtitle">React + NestJS</p>
        
        <div className="card">
          <h2>Mensaje del Backend:</h2>
          {error ? (
            <p className="error">{error}</p>
          ) : (
            <p className="message">{message}</p>
          )}
        </div>

        {health && (
          <div className="card">
            <h2>Estado del Backend:</h2>
            <ul className="health-info">
              <li>Estado: <span className="status-ok">{health.status}</span></li>
              <li>Servicio: {health.service}</li>
              <li>Timestamp: {new Date(health.timestamp).toLocaleString()}</li>
            </ul>
          </div>
        )}

        <div className="links">
          <a href="http://localhost:3000" target="_blank" rel="noopener noreferrer">
            Backend API (puerto 3000)
          </a>
          <a href="http://localhost:5173" target="_blank" rel="noopener noreferrer">
            Frontend (puerto 5173)
          </a>
        </div>
      </header>
    </div>
  )
}

export default App
