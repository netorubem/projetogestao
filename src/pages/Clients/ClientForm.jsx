import { useState } from 'react';
import { FaSave, FaEdit } from 'react-icons/fa';

export default function ClientForm({ onSave, editData }) {
  const [form, setForm] = useState(editData || {
    id: '',
    name: '',
    email: '',
    status: 'active'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...form,
      id: form.id || Date.now().toString()
    });
    setForm({ id: '', name: '', email: '', status: 'active' });
  };

  return (
    <form onSubmit={handleSubmit} className="client-form">
      <input
        type="text"
        placeholder="Nome"
        value={form.name}
        onChange={(e) => setForm({...form, name: e.target.value})}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({...form, email: e.target.value})}
      />
      <select 
        value={form.status}
        onChange={(e) => setForm({...form, status: e.target.value})}
      >
        <option value="active">Ativo</option>
        <option value="inactive">Inativo</option>
      </select>
      <button type="submit" className="btn btn-primary">
        {form.id ? <><FaEdit /> Atualizar</> : <><FaSave /> Salvar</>}
      </button>
    </form>
  );
}