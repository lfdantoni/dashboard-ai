import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GoogleLoginButton } from '../components/GoogleLoginButton';
import { Card, PageHeader, Button } from '../components/ui';
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
        <PageHeader
          title="🔐 Login"
          subtitle="Sign in with your Google account"
        />
        
        <Card>
          <h2>Authentication Required</h2>
          <p style={{ marginBottom: '1.5rem', color: '#888' }}>
            Please login to access the dashboard
          </p>
          <GoogleLoginButton onLogin={handleLogin} />
        </Card>

        <div className="links">
          <Button variant="ghost" onClick={() => navigate('/')}>
            ← Back to Home
          </Button>
        </div>
      </header>
    </div>
  );
};
