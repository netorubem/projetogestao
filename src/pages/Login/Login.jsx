import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { authPaper, authGrid } from './styles';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = e.target.elements.email?.value;
    const password = e.target.elements.password?.value;

    if (!email || !password) {
      alert('Preencha todos os campos!');
      return;
    }

    try {
      await login({
        email,
        name: email.split('@')[0], // Simula nome do usuário
      });
      navigate('/dashboard');
    } catch (error) {
      console.error('Erro:', error);
      alert('Login falhou! Verifique o console.');
    }
  };

  return (
    <Grid container justifyContent="center" sx={authGrid}>
      <Grid item xs={10} sm={6} md={4}>
        <Paper
          elevation={6}
          sx={authPaper}
          component="form"
          onSubmit={handleLogin}
        >
          <Typography variant="h5" align="center" sx={{ mb: 3 }}>
            Login
          </Typography>
          <TextField
            name="email"
            label="Email"
            type="email"
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            name="password"
            label="Senha"
            type="password"
            fullWidth
            required
            sx={{ mb: 3 }}
          />
          <Button type="submit" variant="contained" fullWidth sx={{ py: 1.5 }}>
            Entrar
          </Button>
          <Typography align="center" sx={{ mt: 2 }}>
            Não tem conta?{' '}
            <Link component={RouterLink} to="/register">
              Cadastre-se
            </Link>
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}
