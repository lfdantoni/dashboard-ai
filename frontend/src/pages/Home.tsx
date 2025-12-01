import { Link } from 'react-router-dom';
import '../App.css';

export const Home = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>🚀 Dashboard AI</h1>
        <p className="subtitle">Welcome to Dashboard AI</p>
        
        <div className="card">
          <h2>Get Started</h2>
          <p>A full-stack application with React and NestJS</p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
            <Link to="/login">
              <button>Login with Google</button>
            </Link>
            <Link to="/dashboard">
              <button>Go to Dashboard</button>
            </Link>
          </div>
        </div>

        <div className="card">
          <h2>Features</h2>
          <ul className="health-info">
            <li>✅ Google OAuth Authentication</li>
            <li>✅ Protected Routes</li>
            <li>✅ NestJS Backend API</li>
            <li>✅ Swagger Documentation</li>
            <li>✅ Docker Support</li>
          </ul>
        </div>

        <div className="links">
          <a href="http://localhost:3000/api/docs" target="_blank" rel="noopener noreferrer">
            API Documentation
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            GitHub Repository
          </a>
        </div>
      </header>
    </div>
  );
};
