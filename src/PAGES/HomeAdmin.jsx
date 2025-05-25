// src/PAGES/HomeAdmin.jsx
import React, { useEffect, useState } from 'react';
import '../CSS/estilo.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const HomeAdmin = () => {
  const [eventos, setEventos] = useState([]);
  const [form, setForm] = useState({ titulo: '', descripcion: '', fecha: '', lugar: '', tipo: 'Público' });
  const [editId, setEditId] = useState(null);
  const [mensaje, setMensaje] = useState('');

  const token = localStorage.getItem('token');

  const fetchEventos = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/eventos', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setEventos(data);
    } catch (error) {
      setMensaje('Error al cargar eventos');
    }
  };

  useEffect(() => {
    fetchEventos();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    if (!form.titulo || !form.fecha || !form.lugar || !form.tipo) {
      setMensaje('Título, fecha, lugar y tipo son obligatorios');
      return;
    }

    try {
      const url = editId
        ? `http://localhost:3000/api/eventos/${editId}`
        : 'http://localhost:3000/api/eventos';
      const method = editId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        setMensaje(data.error || 'Error en la operación');
        return;
      }

      setMensaje(data.message || 'Operación exitosa');
      setForm({ titulo: '', descripcion: '', fecha: '', lugar: '', tipo: 'Público' });
      setEditId(null);
      fetchEventos();
    } catch (error) {
      setMensaje('Error de conexión');
    }
  };

  const handleEdit = (evento) => {
    setForm({
      titulo: evento.Titulo,
      descripcion: evento.Descripcion,
      fecha: new Date(evento.Fecha).toISOString().slice(0, 16),
      lugar: evento.Lugar,
      tipo: evento.Tipo
    });
    setEditId(evento.Id);
    setMensaje('');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que quieres eliminar este evento?')) return;
    try {
      const res = await fetch(`http://localhost:3000/api/eventos/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (!res.ok) {
        setMensaje(data.error || 'Error al eliminar');
        return;
      }
      setMensaje(data.message || 'Evento eliminado');
      fetchEventos();
    } catch (error) {
      setMensaje('Error de conexión');
    }
  };

  return (
    <div className="page-container">
      <h1>Panel de Administración - Agenda de Eventos</h1>
      {mensaje && <p className="mensaje">{mensaje}</p>}

      <form onSubmit={handleSubmit} className="form-agenda">
        <label htmlFor="titulo">Título</label>
        <input
          id="titulo"
          type="text"
          name="titulo"
          placeholder="Título"
          value={form.titulo}
          onChange={handleChange}
          required
        />

        <label htmlFor="fecha">Fecha</label>
        <input
          id="fecha"
          type="datetime-local"
          name="fecha"
          value={form.fecha}
          onChange={handleChange}
          required
        />

        <label htmlFor="lugar">Lugar</label>
        <input
          id="lugar"
          type="text"
          name="lugar"
          placeholder="Lugar"
          value={form.lugar}
          onChange={handleChange}
          required
        />

        <label htmlFor="descripcion">Descripción</label>
        <textarea
          id="descripcion"
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleChange}
        />

        <label htmlFor="tipo">Tipo</label>
        <select
          id="tipo"
          name="tipo"
          value={form.tipo}
          onChange={handleChange}
          required
        >
          <option value="Público">Público</option>
          <option value="Privado">Privado</option>
        </select>

        <button type="submit">{editId ? 'Actualizar' : 'Agregar'}</button>
        {editId && (
          <button
            type="button"
            onClick={() => {
              setForm({ titulo: '', descripcion: '', fecha: '', lugar: '', tipo: 'Público' });
              setEditId(null);
            }}
          >
            Cancelar
          </button>
        )}
      </form>

      <table className="tabla-eventos">
        <thead>
          <tr>
            <th>Título</th>
            <th>Fecha</th>
            <th>Lugar</th>
            <th>Descripción</th>
            <th>Tipo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {eventos.map((evento) => (
            <tr key={evento.Id}>
              <td>{evento.Titulo}</td>
              <td>{new Date(evento.Fecha).toLocaleString()}</td>
              <td>{evento.Lugar}</td>
              <td>{evento.Descripcion}</td>
              <td>{evento.Tipo}</td>
              <td>
                <button onClick={() => handleEdit(evento)}>Editar</button>
                <button onClick={() => handleDelete(evento.Id)}>Eliminar</button>
              </td>
            </tr>
          ))}
          {eventos.length === 0 && (
            <tr>
              <td colSpan="6">No hay eventos registrados</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default HomeAdmin;
