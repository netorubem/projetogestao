import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { ROUTES } from '@/utils/routes';
import './scss/main.scss';
import theme from '@/theme';
import MainNavbar from './components/MainNavbar';
import ErrorBoundary from '@/components/ErrorBoundary';
import AppLayout from '@/components/AppLayout';
import ClientForm from '@/pages/Clients/ClientForm';
import ClientList from '@/pages/Clients/ClientList';
import Dashboard from '@/pages/Dashboard/Dashboard';
import Home from '@/pages/Home/Home';  
import Login from '@/pages/Login/Login';
import Register from '@/pages/Register/Register';
import { useAuth } from '@/contexts/AuthContext';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

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

function App() {
  return (   
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Reseta e padroniza estilos */}
    <BrowserRouter>
      <MainNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/clientes" element={<ClientList />} />
          <Route path="/clientes/novo" element={<ClientForm />} />
          <Route path="/clientes/editar/:id" element={<ClientForm />} />
        </Route>

        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;