import React from 'react';
import { Box, Button, Typography, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        bgcolor: '#f0f2f5',
      }}
    >
      <Typography variant="h3" sx={{ mb: 4 }}>
        Bem-vindo ao Sistema
      </Typography>
      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          component={Link}
          to="/login"
          sx={{ px: 4, py: 1.5 }}
        >
          Login
        </Button>
        <Button
          variant="outlined"
          component={Link}
          to="/register"
          sx={{ px: 4, py: 1.5 }}
        >
          Cadastre-se
        </Button>
      </Stack>
    </Box>
  );
}
