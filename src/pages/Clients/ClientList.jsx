import { useState, useEffect } from 'react';
import {
  FaFileExcel,
  FaFilePdf,
  FaFileCsv,
  FaFileCode,
  FaEdit,
  FaTrash,
  FaEye,
} from 'react-icons/fa';
import localforage from 'localforage';
import {
  exportToExcel,
  exportToPDF,
  exportToCSV,
  exportToJSON,
} from '../../utils/exportUtils';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../utils/routes';
import { FaPlus } from 'react-icons/fa';

export default function ClientList({ onEdit }) {
  const [clients, setClients] = useState([]);
  const [filter, setFilter] = useState('');
  const [sortConfig, setSortConfig] = useState({
    key: 'name',
    direction: 'asc',
  });

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    const data = (await localforage.getItem('clients')) || [];
    setClients(data);
  };

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(filter.toLowerCase()) ||
      client.email.toLowerCase().includes(filter.toLowerCase()),
  );

  const sortedClients = [...filteredClients].sort((a, b) => {
    const valueA = String(a[sortConfig.key] || '').toLowerCase();
    const valueB = String(b[sortConfig.key] || '').toLowerCase();

    console.log(`Comparando: ${valueA} (${a.name}) vs ${valueB} (${b.name})`);

    if (valueA < valueB) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (valueA > valueB) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  console.log(
    '--- Dados ordenados:',
    sortedClients.map((c) => c.name),
  );

  const handleDelete = async (id) => {
    const updated = clients.filter((c) => c.id !== id);
    await localforage.setItem('clients', updated);
    loadClients();
  };

  const [showPDFPreview, setShowPDFPreview] = useState(false);

  return (
    <div className="client-list">
      <div className="list-controls">
        <input
          type="text"
          placeholder="Filtrar..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="search-input"
        />
        <div className="action-buttons">
          <Link to={ROUTES.CLIENT_FORM} className="btn-primary">
            <FaPlus /> Novo Cliente
          </Link>
        </div>
      </div>

      <div className="sort-controls">
        <select
          value={sortConfig.key}
          onChange={(e) => {
            setSortConfig((prev) => ({ ...prev, key: e.target.value }));
            console.log('Ordenando por:', e.target.value); // Debug
          }}
        >
          <option value="name">Nome</option>
          <option value="status">Status</option>
        </select>
        <button
          onClick={() => {
            const newDirection =
              sortConfig.direction === 'asc' ? 'desc' : 'asc';
            setSortConfig((prev) => ({ ...prev, direction: newDirection }));
            console.log('Nova direção:', newDirection); // Debug
          }}
          className={`sort-btn ${sortConfig.direction}`}
        >
          {sortConfig.direction === 'asc' ? 'A-Z ↑' : 'Z-A ↓'}
        </button>
      </div>

      <div className="client-grid">
        {sortedClients.map((client) => (
          <div
            key={`${client.id}-${sortConfig.key}-${sortConfig.direction}`}
            className={`client-card ${client.status}`}
          >
            <h3>{client.name}</h3>
            <p>{client.email}</p>
            <span className={`status-badge ${client.status}`}>
              {client.status === 'active' ? 'Ativo' : 'Inativo'}
            </span>
            <div className="actions">
              <button
                onClick={() => onEdit(client)}
                className="btn-icon"
                aria-label="Editar"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => {
                  if (window.confirm(`Excluir ${client.name}?`)) {
                    handleDelete(client.id);
                  }
                }}
                className="btn-icon danger"
                aria-label="Excluir"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
        <div className="export-buttons">
          <button
            onClick={() => setShowPDFPreview(true)}
            className="btn-export preview"
          >
            <FaEye /> Pré-visualizar
          </button>
          <button onClick={() => exportToExcel(clients)} className="btn-export">
            <FaFileExcel /> Excel
          </button>
          <button
            onClick={async () => {
              // Cria um elemento HTML oculto apenas para exportação
              const hiddenElement = document.createElement('div');
              hiddenElement.style.position = 'absolute';
              hiddenElement.style.left = '-9999px';
              hiddenElement.id = 'hidden-pdf-export';
              hiddenElement.innerHTML =
                document.querySelector('.client-grid').innerHTML;
              document.body.appendChild(hiddenElement);

              await exportToPDF('hidden-pdf-export', 'clientes');
              document.body.removeChild(hiddenElement);
            }}
            className="btn-export"
          >
            <FaFilePdf /> PDF
          </button>
          <button onClick={() => exportToCSV(clients)} className="btn-export">
            <FaFileCsv /> CSV
          </button>
          <button onClick={() => exportToJSON(clients)} className="btn-export">
            <FaFileCode /> JSON
          </button>
        </div>
      </div>
      {showPDFPreview && (
        <div className="pdf-preview-modal">
          <div id="pdf-preview-content">
            <div className="client-grid">
              {sortedClients.map((client) => (
                <div key={client.id} className={`client-card ${client.status}`}>
                  <h3>{client.name}</h3>
                  <p>{client.email}</p>
                  <span>Status: {client.status}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="modal-actions">
            <button
              onClick={() => exportToPDF('pdf-preview-content', 'clientes')}
              className="btn-primary"
            >
              <FaFilePdf /> Baixar PDF
            </button>
            <button
              onClick={() => setShowPDFPreview(false)}
              className="btn-secondary"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
