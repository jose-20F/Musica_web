// src/PAGES/nosotros.jsx
import Layout from '../COMPONENTS/Layout';
import '../CSS/estilo.css';

function Nosotros() {
  return (
    <Layout>
      <section className="content header fade-in-top">
        <h2 className="title">Paquetes</h2>
        <img src="/IMG/logo.png" alt="Logo Opción MG" className="responsive-logo paquete-logo" />
        <div className="linea-mini"></div>
      </section>

      <section className="about fade-in-bottom">
        <h3 className="subtitulo">Elige el paquete ideal para tu evento</h3>
        <p className="paquete-text grande">
          En Grupo Opción MG ofrecemos tres paquetes diseñados para adaptarse a las necesidades y estilo de tu evento.
          Todos incluyen sonido profesional, iluminación, ambientación, y mucho más para que tu celebración sea inolvidable.
        </p>

        <div className="paquetes-grid">
          {/* Paquete Plus */}
          <div className="paquete-card visual-box animar-desde-izquierda">
            <i className="bi bi-stars icono-paquete"></i>
            <h4>Plus</h4>
            <p>(10 elementos)</p>
            <ul>
              <li>Audio profesional (2 bocinas + consola)</li>
              <li>Micrófono inalámbrico</li>
              <li>Cámara de humo básica</li>
              <li>Pantalla LED estándar</li>
              <li>Pista de baile básica</li>
              <li>Operador de audio/luz</li>
              <li>Instalación básica en salón</li>
              <li>Hasta 4 horas de servicio</li>
              <li>Traslado gratuito zona urbana</li>
            </ul>
            <a href="/contacto" className="btn">Reservar</a>
          </div>

          {/* Paquete Max */}
          <div className="paquete-card visual-box animar-desde-abajo">
            <i className="bi bi-music-note-beamed icono-paquete"></i>
            <h4>Max</h4>
            <p>(12 elementos)</p>
            <ul>
              <li>Sonido estéreo (bocinas + bajos)</li>
              <li>2 micrófonos inalámbricos</li>
              <li>Cámara de humo con efectos</li>
              <li>Pantalla de proyección grande</li>
              <li>Pista iluminada con ritmo</li>
              <li>Cabina de DJ estándar</li>
              <li>Luces robóticas</li>
              <li>Técnico de luz/audio</li>
              <li>Truss frontal con luces</li>
              <li>Hasta 6 horas de servicio</li>
            </ul>
            <a href="/contacto" className="btn">Reservar</a>
          </div>

          {/* Paquete Mega */}
          <div className="paquete-card visual-box animar-desde-derecha">
            <i className="bi bi-disc icono-paquete"></i>
            <h4>Mega</h4>
            <p>(15+ elementos)</p>
            <ul>
              <li>Sonido Line-Array profesional</li>
              <li>Subwoofers + consola digital</li>
              <li>4 micrófonos inalámbricos</li>
              <li>Cámara de humo dual + CO₂</li>
              <li>Pantalla LED de gran formato</li>
              <li>Pista de cristal LED RGB</li>
              <li>Cabina de DJ personalizada</li>
              <li>Luces robóticas, estrobos, láser</li>
              <li>Truss completo con iluminación</li>
              <li>Show de apertura o cierre (opcional)</li>
              <li>Grabación/transmisión en HD</li>
              <li>Hasta 8 horas continuas</li>
              <li>2 operadores profesionales</li>
            </ul>
            <a href="/contacto" className="btn">Reservar</a>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Nosotros;
