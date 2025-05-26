// src/PAGES/nosotros.jsx
import '../CSS/estilo.css';

/**
 * Página de presentación del grupo musical y sus integrantes.
 * Muestra una breve descripción y una sección con los integrantes del grupo.
 */
function Nosotros() {
  return (
    <>
      {/* Encabezado de la página */}
      <section className="content header">
        <h2 className="title">Nuestro Grupo</h2>
      </section>

      {/* Sección principal con descripción y lista de integrantes */}
      <section className="about">
        <h3 className="subtitulo">Conócenos</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          scelerisque leo nec urna fermentum, a facilisis libero vehicula.
          Integer nec libero nec lorem tincidunt tincidunt. Suspendisse potenti.
        </p>

        {/* Lista de integrantes, renderizada dinámicamente */}
        <div className="integrantes">
          {[1, 2, 3].map((num) => (
            <div key={num} className="integrante">
              {/* Imagen del integrante */}
              <img src={`/IMG/imagen${num}.jpg`} alt={`Integrante ${num}`} className="img-integrante" />
              {/* Nombre del integrante */}
              <h4>Integrante {num}</h4>
              {/* Descripción breve del integrante */}
              <p>Descripción del integrante {num}.</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Nosotros;
