import { createContext, useContext, useState, ReactNode } from 'react';
import { AuthUser } from '../components/GoogleLoginButton';

interface AuthContextType {
  user: AuthUser | null;
  idToken: string;
  login: (user: AuthUser, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [idToken, setIdToken] = useState<string>('');

  const login = (user: AuthUser, token: string) => {
    setUser(user);
    setIdToken(token);
  };

  const logout = () => {
    setUser(null);
    setIdToken('');
  };

  return (
    <AuthContext.Provider value={{ user, idToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
