import { createContext, useState, useContext, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

    // Carrega o usuário do localStorage ao inicializar
    useEffect(() => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) setUser(JSON.parse(storedUser));
    }, []);

    const login = (userData) => {
      localStorage.setItem('user', JSON.stringify(userData)); // Persiste
      setUser(userData);
      return Promise.resolve(); // Simula API
    };

    const logout = () => {
      localStorage.removeItem('user');
      setUser(null);
    };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook useAuth corrigido (apenas retorna o contexto)
export function useAuth() {
  return useContext(AuthContext);
}

// Hook separado para proteção de rotas
export function RequireAuth({ children }) {
  const location = useLocation();
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}
