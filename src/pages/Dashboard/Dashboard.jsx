import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useAuth } from '@/contexts/AuthContext'; 

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function Dashboard() {
  const { user } = useAuth();
  const [clients, setClients] = useState([]);

  useEffect(() => {
    // Simulação de busca de clientes - você pode depois puxar de uma API
    const fetchedClients = [
      { name: 'Empresa A', value: 400 },
      { name: 'Empresa B', value: 300 },
      { name: 'Empresa C', value: 300 },
      { name: 'Empresa D', value: 200 },
    ];
    setClients(fetchedClients);
  }, []);

  if (!user) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard de Clientes</h1>
      <div className="w-full h-96">
      <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 2, borderRadius: 2, boxShadow: 3 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={clients}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name }) => name}
              outerRadius={150}
              fill="#8884d8"
              dataKey="value"
            >
              {clients.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        </Paper>
      </Box>
      </div>
    </div>
  );
}
