import { useState, useEffect } from 'react';
import localforage from 'localforage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClientForm from './ClientForm';
import ClientList from './ClientList';
import Metrics from '../../components/Metrics';
import ClientCharts from '../../components/ClientCharts';

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [editData, setEditData] = useState(null);

  const loadClients = async () => {
    const data = await localforage.getItem('clients') || [];
    setClients(data);
  };

  useEffect(() => {
    loadClients();
  }, []);

  const handleSave = async (client) => {
    let updatedClients;
    const currentClients = await localforage.getItem('clients') || [];
    
    if (client.id && currentClients.some(c => c.id === client.id)) {
      updatedClients = currentClients.map(c => 
        c.id === client.id ? client : c
      );
      toast.success('Cliente atualizado!');
    } else {
      updatedClients = [...currentClients, { ...client, id: Date.now().toString() }];
      toast.success('Cliente adicionado!');
    }

    await localforage.setItem('clients', updatedClients);
    loadClients();
    setEditData(null);
  };

  return (
    <div className="page-container">
      <h1>Gestão de Clientes</h1>
      <Metrics clients={clients} />
      <ClientCharts clients={clients} />
      
      {/* Formulário - Props completas */}
      <ClientForm 
        onSave={handleSave} 
        editData={editData}
        onCancel={() => setEditData(null)}
      />
      
      {/* Lista - Props completas */}
      <ClientList 
        clients={clients}
        onEdit={setEditData}
        onDelete={async (id) => {
          const updated = clients.filter(c => c.id !== id);
          await localforage.setItem('clients', updated);
          loadClients();
          toast.error('Cliente excluído!');
        }}
      />
      
      <ToastContainer position="bottom-right" />
    </div>
  );
}