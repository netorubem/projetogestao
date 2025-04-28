import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function Register() {
  return (
    <Grid
      container
      justifyContent="center"
      sx={{ height: '100vh', bgcolor: '#f0f2f5' }}
    >
      <Grid item xs={10} sm={6} md={4}>
        <Paper elevation={6} sx={{ p: 4, mt: 8 }}>
          <Typography variant="h5" align="center" sx={{ mb: 3 }}>
            Cadastre-se
          </Typography>
          <TextField label="Nome completo" fullWidth sx={{ mb: 2 }} />
          <TextField label="Email" fullWidth sx={{ mb: 2 }} />
          <TextField label="Senha" type="password" fullWidth sx={{ mb: 2 }} />
          <TextField
            label="Confirmar Senha"
            type="password"
            fullWidth
            sx={{ mb: 3 }}
          />
          <Button variant="contained" fullWidth sx={{ py: 1.5 }}>
            Criar Conta
          </Button>
          <Typography align="center" sx={{ mt: 2 }}>
            Já tem conta?{' '}
            <Link component={RouterLink} to="/login">
              Faça login
            </Link>
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}
