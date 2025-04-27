import React from 'react';
import ClientCharts from '../../components/ClientCharts';
import { useAuth } from '../../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();
  
  return (
    <div>
      <h2>Bem-vindo, {user?.name || 'Visitante'}</h2>
      {/* Seus gráficos aqui */}
    </div>
  );
}