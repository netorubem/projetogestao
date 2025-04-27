import React from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale, 
  LinearScale, 
  BarElement,
  Title 
} from 'chart.js';
import { FaImage, FaFileArchive } from 'react-icons/fa';

// Registre todos os componentes necessários
ChartJS.register(
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale,
  LinearScale, 
  BarElement,
  Title
);

export default function ClientCharts({ clients = [] }) { // Valor padrão para clients
  // Dados processados
  const activeClients = clients.filter(c => c.status === 'active').length;
  const inactiveClients = clients.filter(c => c.status === 'inactive').length;

  // Gráfico de Pizza (Status)
  const statusData = {
    labels: ['Ativos', 'Inativos'],
    datasets: [{
      data: [activeClients, inactiveClients],
      backgroundColor: ['#2dce89', '#f5365c'],
      borderWidth: 1
    }]
  };

  // Gráfico de Barras (Cadastros)
  const signupData = {
    labels: ['Últimos 7 dias', 'Últimos 30 dias', 'Total'],
    datasets: [{
      label: 'Cadastros',
      data: [
        clients.filter(c => isRecent(c, 7)).length,
        clients.filter(c => isRecent(c, 30)).length,
        clients.length
      ],
      backgroundColor: '#5e72e4',
    }]
  };

  // Função auxiliar para filtrar clientes recentes
  const isRecent = (client, days) => {
    const joinDate = new Date(client.joinDate || new Date());
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    return joinDate >= cutoffDate;
  };

  // Exportação de gráficos
  const exportChart = (chartId) => {
    const canvas = document.getElementById(chartId);
    if (canvas) {
      const link = document.createElement('a');
      link.download = `${chartId}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  const exportAllCharts = () => {
    ['pie-chart-status', 'bar-chart-signups'].forEach(exportChart);
  };

  return (
    <div className="charts-container">
      <div className="chart-section">
        <div className="chart-wrapper">
          <h3>Status dos Clientes</h3>
          <div className="chart-container">
            <Pie 
              id="pie-chart-status"
              data={statusData}
              options={{ responsive: true }}
            />
          </div>
          <div className="chart-actions">
            <button onClick={() => exportChart('pie-chart-status')}>
              <FaImage /> Exportar
            </button>
          </div>
        </div>

        <div className="chart-wrapper">
          <h3>Cadastros Recentes</h3>
          <div className="chart-container">
            <Bar
              id="bar-chart-signups"
              data={signupData}
              options={{
                responsive: true,
                scales: { y: { beginAtZero: true } }
              }}
            />
          </div>
          <div className="chart-actions">
            <button onClick={() => exportChart('bar-chart-signups')}>
              <FaImage /> Exportar
            </button>
          </div>
        </div>
      </div>

      <div className="global-actions">
        <button onClick={exportAllCharts} className="export-all">
          <FaFileArchive /> Exportar Todos os Gráficos
        </button>
      </div>
    </div>
  );
}