import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GoogleLoginButton } from '../components/GoogleLoginButton';
import { useEffect } from 'react';
import '../App.css';

export const Login = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleLogin = (user: any, token: string) => {
    login(user, token);
    navigate('/dashboard');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🔐 Login</h1>
        <p className="subtitle">Sign in with your Google account</p>
        
        <div className="card">
          <h2>Authentication Required</h2>
          <p style={{ marginBottom: '1.5rem', color: '#888' }}>
            Please login to access the dashboard
          </p>
          <GoogleLoginButton onLogin={handleLogin} />
        </div>

        <div className="links">
          <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
            ← Back to Home
          </a>
        </div>
      </header>
    </div>
  );
};
