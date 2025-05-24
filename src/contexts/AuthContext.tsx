import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'parent' | 'child';
  subscription: 'free' | 'basic' | 'premium' | null;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Save token in localStorage
  const saveToken = (token: string) => {
    localStorage.setItem('authToken', token);
  };

  // Get token from localStorage
  const getToken = () => localStorage.getItem('authToken');

  // Remove token from localStorage
  const removeToken = () => {
    localStorage.removeItem('authToken');
  };

  // Fetch user info from backend using token (for auto-login)
  const fetchUserFromToken = async (token: string) => {
    try {
      const response = await fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        removeToken();
        setUser(null);
        return;
      }

      const data = await response.json();
      setUser(data.user);
    } catch {
      removeToken();
      setUser(null);
    }
  };

  // Auto login on mount if token exists
  useEffect(() => {
    const token = getToken();
    if (token) {
      fetchUserFromToken(token);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    const data = await response.json();

    // Save token for future auth
    saveToken(data.token);
    setUser(data.user);
  };

  const register = async (name: string, email: string, password: string) => {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }

    const data = await response.json();

    // Save token for future auth
    saveToken(data.token);
    setUser(data.user);
  };

  const logout = () => {
    // Optionally notify backend logout if using sessions
    removeToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
