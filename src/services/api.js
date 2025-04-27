import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5173', // ou sua URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptador para adicionar token de autenticação (se quiser futuramente)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
