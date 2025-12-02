import { useState } from 'react';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

interface GoogleJwtPayload {
  iss: string;
  nbf: number;
  aud: string;
  sub: string;
  email: string;
  email_verified: boolean;
  azp: string;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  iat: number;
  exp: number;
  jti: string;
}

export interface AuthUser {
  name: string;
  email: string;
  picture: string;
  sub: string;
}

interface Props {
  onLogin: (user: AuthUser, idToken: string) => void;
}

export const GoogleLoginButton: React.FC<Props> = ({ onLogin }) => {
  const [error, setError] = useState<string>('');

  const handleSuccess = (cred: CredentialResponse) => {
    if (!cred.credential) {
      setError('No credential received');
      return;
    }
    try {
      const decoded = jwtDecode<GoogleJwtPayload>(cred.credential);
      const user: AuthUser = {
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture,
        sub: decoded.sub,
      };
      onLogin(user, cred.credential);
    } catch (e) {
      console.error(e);
      setError('Failed to decode token');
    }
  };

  return (
    <div className="flex flex-col items-center">
      <GoogleLogin onSuccess={handleSuccess} onError={() => setError('Login Failed')} />
      {error && <p className="text-[#ff6b6b] mt-2">{error}</p>}
    </div>
  );
};
