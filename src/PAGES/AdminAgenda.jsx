import { useState } from 'react';
import '../CSS/estilo.css';

function Agenda() {
  const [eventos, setEventos] = useState([
    { fecha: '2025-06-01', hora: '20:00', lugar: 'Auditorio Nacional', tipo: 'Público', titulo: 'Concierto en CDMX' },
    { fecha: '2025-06-15', hora: '19:00', lugar: 'Salón Privado', tipo: 'Privado', titulo: 'Evento Privado' },
  ]);
  const [nuevoEvento, setNuevoEvento] = useState({
    fecha: '', hora: '', lugar: '', tipo: 'Público', titulo: ''
  });

  const handleChange = (e) => {
    setNuevoEvento({ ...nuevoEvento, [e.target.name]: e.target.value });
  };

  const agregarEvento = (e) => {
    e.preventDefault();
    if (nuevoEvento.fecha && nuevoEvento.hora && nuevoEvento.lugar && nuevoEvento.titulo) {
      setEventos([...eventos, nuevoEvento]);
      setNuevoEvento({ fecha: '', hora: '', lugar: '', tipo: 'Público', titulo: '' });
    }
  };

  const eliminarEvento = (index) => {
    setEventos(eventos.filter((_, i) => i !== index));
  };

  return (
    <>
      <section className="content header">
        <h2 className="title">Agenda</h2>
      </section>

      <section className="about">
        <h3 className="subtitulo">Próximos eventos</h3>
        <form className="formulario-contacto" onSubmit={agregarEvento} style={{marginBottom: '2rem'}}>
          <input
            type="date"
            name="fecha"
            value={nuevoEvento.fecha}
            onChange={handleChange}
            required
          />
          <input
            type="time"
            name="hora"
            value={nuevoEvento.hora}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lugar"
            placeholder="Lugar"
            value={nuevoEvento.lugar}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="titulo"
            placeholder="Título del evento"
            value={nuevoEvento.titulo}
            onChange={handleChange}
            required
          />
          <select
            name="tipo"
            value={nuevoEvento.tipo}
            onChange={handleChange}
            required
          >
            <option value="Público">Público</option>
            <option value="Privado">Privado</option>
          </select>
          <button type="submit">Agregar evento</button>
        </form>

        <div className="agenda-lista">
          {eventos.length === 0 && <p>No hay eventos próximos.</p>}
          {eventos
            .sort((a, b) => a.fecha.localeCompare(b.fecha))
            .map((evento, idx) => (
            <div className="agenda-card" key={idx}>
              <div>
                <div className="agenda-fecha">{new Date(evento.fecha).toLocaleDateString()} {evento.hora}</div>
                <div className="agenda-titulo">{evento.titulo}</div>
                <div className="agenda-lugar">{evento.lugar}</div>
                <div className={`agenda-tipo ${evento.tipo === 'Público' ? 'publico' : 'privado'}`}>{evento.tipo}</div>
              </div>
              <button className="agenda-eliminar" onClick={() => eliminarEvento(idx)} title="Eliminar evento">
                <i className="bi bi-trash"></i>
              </button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Agenda;