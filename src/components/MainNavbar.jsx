import { Link } from 'react-router-dom';
import { useState } from 'react';
import LoginModal from './LoginModal';
import { useAuth } from '@/contexts/AuthContext';

export default function MainNavbar() {
  const { user, logout } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md py-3 px-6 flex justify-between items-center">
      <div className="flex items-center gap-6 text-lg font-semibold">
        <Link to="/" className="hover:text-blue-300 transition">Início</Link>
        <Link to="/clientes" className="hover:text-blue-300 transition">Clientes</Link>
        <Link to="/dashboard" className="hover:text-blue-300 transition">Dashboard</Link>
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-sm">Olá, {user.email}!</span>
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-sm"
            >
              Sair
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="bg-primary text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Login
            </button>
            <Link
              to="/register"
              className="bg-primary text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Cadastro
            </Link>
          </>
        )}
      </div>

      {isLoginModalOpen && <LoginModal onClose={() => setIsLoginModalOpen(false)} />}
    </nav>
  );
}
