import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GoogleLoginButton } from '../components/GoogleLoginButton';
import { Button } from '../components/ui';
import { useEffect } from 'react';
import { BrainCircuit, ArrowLeft, LockKeyhole } from 'lucide-react';

export const Login = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleLogin = (user: any) => {
    login(user);
    navigate('/dashboard');
  };

  const handleLoginError = (error: string) => {
    console.error('Login error:', error);
    // Error is already displayed by GoogleLoginButton
  };

  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center relative overflow-hidden p-4">
      {/* Abstract Background Elements */}
      <div 
        className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl opacity-50 pointer-events-none animate-pulse"
      />
      <div 
        className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] bg-gradient-to-tr from-accent/30 to-primary/10 rounded-full blur-3xl opacity-50 pointer-events-none animate-pulse"
        style={{ animationDelay: '1s' }}
      />

      <div className="w-full max-w-md relative z-10 animate-fade-in-up">
        {/* Branding */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-primary text-white p-3 rounded-2xl mb-4 shadow-lg shadow-primary/30">
            <BrainCircuit size={32} />
          </div>
          <h1 className="text-3xl font-bold text-dark text-center">Dashboard AI</h1>
          <p className="text-gray-500 mt-2 text-center">Your intelligent workspace companion</p>
        </div>

        {/* Login Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50">
          <div className="text-center mb-8">
             <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary/10 text-secondary mb-4">
               <LockKeyhole size={24} />
             </div>
             <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
             <p className="text-gray-500 mt-1 text-sm">Sign in to access your analytics</p>
          </div>

          <div className="space-y-6">
            <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100 text-sm text-blue-700 text-center">
              🔐 Authentication is required to view the dashboard and protected routes.
            </div>

            <div className="flex justify-center w-full py-2">
              <GoogleLoginButton onLogin={handleLogin} onError={handleLoginError} />
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white/50 px-2 text-gray-400">Secure Access</span>
              </div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')} 
            className="text-gray-500 hover:text-primary gap-2"
          >
            <ArrowLeft size={16} /> Back to Home
          </Button>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-gray-400">
          <p>&copy; 2024 Dashboard AI. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};
