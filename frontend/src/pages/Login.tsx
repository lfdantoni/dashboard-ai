import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GoogleLoginButton } from '../components/GoogleLoginButton';
import { Card, PageHeader, Button } from '../components/ui';
import { useEffect } from 'react';

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
    <div className="w-full min-h-screen">
      <header className="min-h-screen flex flex-col items-center justify-center p-8">
        <PageHeader
          title="🔐 Login"
          subtitle="Sign in with your Google account"
        />
        
        <Card className="max-w-[500px]">
          <h2 className="mt-0 text-primary">Authentication Required</h2>
          <p className="mb-6 text-gray-500">
            Please login to access the dashboard
          </p>
          <GoogleLoginButton onLogin={handleLogin} />
        </Card>

        <div className="flex gap-6 mt-8 flex-wrap justify-center">
          <Button variant="ghost" onClick={() => navigate('/')}>
            ← Back to Home
          </Button>
        </div>
      </header>
    </div>
  );
};
