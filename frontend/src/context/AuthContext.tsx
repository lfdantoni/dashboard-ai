import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthUser } from '../components/GoogleLoginButton';

interface AuthContextType {
  user: AuthUser | null;
  idToken: string;
  login: (user: AuthUser, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY_USER = 'dashboard_user';
const STORAGE_KEY_TOKEN = 'dashboard_token';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const storedUser = localStorage.getItem(STORAGE_KEY_USER);
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [idToken, setIdToken] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEY_TOKEN) || '';
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY_USER);
    }
  }, [user]);

  useEffect(() => {
    if (idToken) {
      localStorage.setItem(STORAGE_KEY_TOKEN, idToken);
    } else {
      localStorage.removeItem(STORAGE_KEY_TOKEN);
    }
  }, [idToken]);

  const login = (user: AuthUser, token: string) => {
    setUser(user);
    setIdToken(token);
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
    localStorage.setItem(STORAGE_KEY_TOKEN, token);
  };

  const logout = () => {
    setUser(null);
    setIdToken('');
    localStorage.removeItem(STORAGE_KEY_USER);
    localStorage.removeItem(STORAGE_KEY_TOKEN);
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
