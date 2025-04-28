import { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginModal from './LoginModal';

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <nav className="flex justify-end items-center p-4 bg-white shadow-md">
      <button
        onClick={() => setIsModalOpen(true)}
        className="text-blue-600 mr-4 hover:underline"
      >
        Login
      </button>
      <Link
        to="/register"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Cadastro
      </Link>

      {isModalOpen && <LoginModal onClose={() => setIsModalOpen(false)} />}
    </nav>
  );
}
