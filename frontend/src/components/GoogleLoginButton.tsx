import { useState } from 'react';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  picture?: string;
  googleId: string;
}

interface Props {
  onLogin: (user: AuthUser) => void;
  onError?: (error: string) => void;
}

export const GoogleLoginButton: React.FC<Props> = ({ onLogin, onError }) => {
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSuccess = async (cred: CredentialResponse) => {
    if (!cred.credential) {
      const errorMsg = 'No credential received';
      setError(errorMsg);
      onError?.(errorMsg);
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Import authApi dynamically to avoid circular dependencies
      const { authApi } = await import('../utils/api');
      
      // Call backend login endpoint
      const response = await authApi.login(cred.credential);
      
      // Call onLogin with the user from backend response
      onLogin(response.user);
    } catch (e: any) {
      const errorMsg = e?.message || 'Failed to authenticate with server';
      console.error('Login error:', e);
      setError(errorMsg);
      onError?.(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <GoogleLogin 
        onSuccess={handleSuccess} 
        onError={() => {
          const errorMsg = 'Google login failed';
          setError(errorMsg);
          onError?.(errorMsg);
        }}
      />
      {loading && <p className="text-gray-500 mt-2 text-sm">Authenticating...</p>}
      {error && <p className="text-[#ff6b6b] mt-2 text-sm">{error}</p>}
    </div>
  );
};
