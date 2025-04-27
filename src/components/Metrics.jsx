import { FaUsers, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

export default function Metrics({ clients }) {
  const stats = {
    total: clients.length,
    active: clients.filter(c => c.status === 'active').length,
    inactive: clients.filter(c => c.status === 'inactive').length
  };

  return (
    <div className="metrics-grid">
      <div className="metric-card total">
        <FaUsers className="metric-icon" />
        <h3>Total</h3>
        <p>{stats.total}</p>
      </div>
      <div className="metric-card active">
        <FaCheckCircle className="metric-icon" />
        <h3>Ativos</h3>
        <p>{stats.active}</p>
      </div>
      <div className="metric-card inactive">
        <FaTimesCircle className="metric-icon" />
        <h3>Inativos</h3>
        <p>{stats.inactive}</p>
      </div>
    </div>
  );
}