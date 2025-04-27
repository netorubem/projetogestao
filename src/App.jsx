import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from './utils/routes';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ClientList from './pages/Clients/ClientList';
import ClientForm from './pages/Clients/ClientForm';
import AppLayout from './components/AppLayout';
import Dashboard from './pages/Dashboard';
import ErrorBoundary from './components/ErrorBoundary';
import { useAuth } from './context/AuthContext'; // Importe useAuth
import { useLocation } from 'react-router-dom';

function ProtectedLayout() {
  const location = useLocation();
  const { user } = useAuth();

  console.log('Usuário atual:', user);

  if (!user) {
    console.log('Redirecionando para login...');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <AppLayout />;
}

export default function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          {/* Rotas públicas */}
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.REGISTER} element={<Register />} />

          {/* Rotas protegidas */}
          <Route element={<ProtectedLayout />}>
            <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
            <Route path={ROUTES.CLIENTS} element={<ClientList />} />
            <Route path={ROUTES.CLIENT_FORM} element={<ClientForm />} />
            <Route path={ROUTES.CLIENT_EDIT} element={<ClientForm />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
