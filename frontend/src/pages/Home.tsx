import { Link } from 'react-router-dom';
import { Card, Button, PageHeader } from '../components/ui';
import '../App.css';

export const Home = () => {
  return (
    <div className="App">
      <header className="App-header">
        <PageHeader
          title="🚀 Dashboard AI"
          subtitle="Welcome to Dashboard AI"
        />
        
        <Card>
          <h2>Get Started</h2>
          <p>A full-stack application with React and NestJS</p>
          <div className="home-actions">
            <Link to="/login">
              <Button>Login with Google</Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="secondary">Go to Dashboard</Button>
            </Link>
          </div>
        </Card>

        <Card>
          <h2>Features</h2>
          <ul className="health-info">
            <li>✅ Google OAuth Authentication</li>
            <li>✅ Protected Routes</li>
            <li>✅ NestJS Backend API</li>
            <li>✅ Swagger Documentation</li>
            <li>✅ Docker Support</li>
          </ul>
        </Card>

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
