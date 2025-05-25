import { useState } from 'react';
import Calendar from 'react-calendar';
import Layout from '../COMPONENTS/Layout';
import '../CSS/estilo.css';
import 'react-calendar/dist/Calendar.css';

const eventos = [
  { fecha: '2025-06-01', hora: '20:00', lugar: 'Auditorio Nacional', tipo: 'Público', titulo: 'Concierto en CDMX' },
  { fecha: '2025-06-15', hora: '19:00', lugar: 'Salón Privado', tipo: 'Privado', titulo: 'Evento Privado' },
];

function Agenda() {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);

  // Fechas de eventos en formato Date
  const fechasEvento = eventos.map(e => new Date(e.fecha).toDateString());

  // Evento del día seleccionado
  const eventoSeleccionado = eventos.find(
    e =>
      fechaSeleccionada &&
      new Date(e.fecha).toISOString().slice(0, 10) === fechaSeleccionada.toISOString().slice(0, 10)
  );

  return (
    <Layout>
      <section className="content header" style={{marginBottom: 0}}>
        <h2 className="title" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem'}}>
          <i className="bi bi-calendar2-event" style={{color: "#00ffcc", fontSize: "2.5rem"}}></i>
          Agenda de Eventos
        </h2>
        <p style={{color: "#bdbdbd", fontSize: "1.1rem", marginTop: "0.5rem"}}>
        Consulta aquí los próximos eventos destacados.
        </p>
      </section>

      <section className="about" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <div style={{position: 'relative', width: 'fit-content', margin: '0 auto'}}>
          <i className="bi bi-calendar3 agenda-bg-icon"></i>
          <Calendar
            onChange={setFechaSeleccionada}
            value={fechaSeleccionada}
            tileClassName={({ date }) => {
              const evento = eventos.find(
                e => new Date(e.fecha).toISOString().slice(0,10) === date.toISOString().slice(0,10)
              );
              if (evento) {
                return evento.tipo === 'Público' ? 'evento-publico' : 'evento-privado';
              }
              return null;
            }}
          />
        </div>

        {eventoSeleccionado && (
          <div className="agenda-card" style={{marginTop: '2rem', minWidth: 300}}>
            <div>
              <div className="agenda-fecha">
                {new Date(eventoSeleccionado.fecha).toLocaleDateString()} {eventoSeleccionado.hora}
              </div>
              <div className="agenda-titulo">{eventoSeleccionado.titulo}</div>
              <div className="agenda-lugar">{eventoSeleccionado.lugar}</div>
              <div className={`agenda-tipo ${eventoSeleccionado.tipo === 'Público' ? 'publico' : 'privado'}`}>
                {eventoSeleccionado.tipo}
              </div>
            </div>
          </div>
        )}
        {!eventoSeleccionado && fechaSeleccionada && (
          <div style={{marginTop: '2rem', color: '#bdbdbd'}}>No hay evento para esta fecha.</div>
        )}
      </section>

      <section className="agenda-leyenda">
        <span>
          <span className="leyenda-circulo publico"></span> Evento Público
        </span>
        <span>
          <span className="leyenda-circulo privado"></span> Evento Privado
        </span>
      </section>
    </Layout>
  );
}

export default Agenda;