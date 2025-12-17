import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ReactNode, useEffect, useState, useRef } from 'react';
import { authApi } from '../utils/api';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, login, logout } = useAuth();
  const [isVerifying, setIsVerifying] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const hasVerifiedRef = useRef(false); // Track if verification has been initiated

  useEffect(() => {
    // Prevent double execution in React StrictMode
    if (hasVerifiedRef.current) {
      return;
    }
    hasVerifiedRef.current = true;

    const verifyToken = async () => {
      try {
        // Verify token with backend
        const response = await authApi.verify();
        if (response.authenticated && response.user) {
          // Update user data in context if needed
          // Only update if data changed to avoid loops (though context handles this)
          if (!user || user.googleId !== response.user.googleId) {
            login({
              id: response.user.id,
              email: response.user.email,
              name: response.user.name,
              picture: response.user.picture,
              googleId: response.user.googleId,
            });
          }
          setIsValid(true);
        } else {
          setIsValid(false);
          logout(); // Clear invalid user from context
        }
      } catch (error) {
        console.error('Token verification failed:', error);
        setIsValid(false);
        logout(); // Clear invalid user from context
      } finally {
        setIsVerifying(false);
      }
    };

    verifyToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once on mount

  // Show loading state while verifying
  if (isVerifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-500 font-medium">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  // Redirect to home if token is invalid
  if (!isValid) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
