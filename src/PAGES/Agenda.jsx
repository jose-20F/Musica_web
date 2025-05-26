import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import '../CSS/estilo.css';
import 'react-calendar/dist/Calendar.css';

/**
 * Página de agenda de eventos.
 * Muestra un calendario interactivo con los eventos públicos y privados obtenidos del backend.
 */
function Agenda() {
  // Estado: lista de eventos obtenidos del backend
  const [eventos, setEventos] = useState([]);
  // Estado: fecha seleccionada en el calendario
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  // Estado: indica si los eventos están cargando
  const [cargando, setCargando] = useState(true);

  /**
   * Consulta los eventos públicos desde el backend.
   * Actualiza el estado 'eventos' y el estado de carga.
   */
  const fetchEventos = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/eventos/public');
      const data = await res.json();
      setEventos(data);
    } catch (error) {
      setEventos([]);
    } finally {
      setCargando(false);
    }
  };

  // Efecto: carga los eventos al montar el componente y cada 10 segundos
  useEffect(() => {
    fetchEventos(); // Consulta inicial
    const interval = setInterval(fetchEventos, 10000); // Actualiza cada 10s
    return () => clearInterval(interval);
  }, []);

  // Busca el evento correspondiente a la fecha seleccionada
  const eventoSeleccionado = eventos.find(
    e =>
      fechaSeleccionada &&
      new Date(e.Fecha).toISOString().slice(0, 10) === fechaSeleccionada.toISOString().slice(0, 10)
  );

  return (
    <>
      {/* Encabezado de la página */}
      <section className="content header" style={{marginBottom: 0}}>
        <h2 className="title" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem'}}>
          <i className="bi bi-calendar2-event" style={{color: "#00ffcc", fontSize: "2.5rem"}}></i>
          Agenda de Eventos
        </h2>
        <p style={{color: "#bdbdbd", fontSize: "1.1rem", marginTop: "0.5rem"}}>
          Consulta aquí los próximos eventos destacados.
        </p>
      </section>

      {/* Sección principal con el calendario y detalles de eventos */}
      <section className="about" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <div style={{position: 'relative', width: 'fit-content', margin: '0 auto'}}>
          {/* Icono de fondo decorativo */}
          <i className="bi bi-calendar3 agenda-bg-icon"></i>
          {/* Calendario interactivo */}
          <Calendar
            onChange={setFechaSeleccionada}
            value={fechaSeleccionada}
            tileClassName={({ date }) => {
              // Marca los días con evento público o privado
              const evento = eventos.find(
                e => new Date(e.Fecha).toISOString().slice(0,10) === date.toISOString().slice(0,10)
              );
              if (evento) {
                return evento.Tipo === 'Público' ? 'evento-publico' : 'evento-privado';
              }
              return null;
            }}
          />
        </div>

        {/* Mensaje de carga */}
        {cargando && <div style={{marginTop: '2rem', color: '#bdbdbd'}}>Cargando eventos...</div>}

        {/* Muestra los detalles del evento seleccionado */}
        {!cargando && eventoSeleccionado && (
          <div className="agenda-card" style={{marginTop: '2rem', minWidth: 300}}>
            <div>
              <div className="agenda-fecha">
                {new Date(eventoSeleccionado.Fecha).toLocaleDateString()} {eventoSeleccionado.Hora || ''}
              </div>
              <div className="agenda-titulo">{eventoSeleccionado.Titulo}</div>
              <div className="agenda-lugar">{eventoSeleccionado.Lugar}</div>
              <div className={`agenda-tipo ${eventoSeleccionado.Tipo === 'Público' ? 'publico' : 'privado'}`}>
                {eventoSeleccionado.Tipo}
              </div>
            </div>
          </div>
        )}

        {/* Si no hay evento para la fecha seleccionada */}
        {!cargando && !eventoSeleccionado && fechaSeleccionada && (
          <div style={{marginTop: '2rem', color: '#bdbdbd'}}>No hay evento para esta fecha.</div>
        )}
      </section>

      {/* Leyenda de colores para eventos públicos y privados */}
      <section className="agenda-leyenda">
        <span>
          <span className="leyenda-circulo publico"></span> Evento Público
        </span>
        <span>
          <span className="leyenda-circulo privado"></span> Evento Privado
        </span>
      </section>
    </>
  );
}

export default Agenda;