// src/PAGES/nosotros.jsx
import Layout from '../COMPONENTS/Layout';
import '../CSS/estilo.css';

function Nosotros() {
  return (
    <Layout>
      <section className="content header">
        <h2 className="title">Nuestro Grupo</h2>
      </section>

      <section className="about">
        <h3 className="subtitulo">Conócenos</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          scelerisque leo nec urna fermentum, a facilisis libero vehicula.
          Integer nec libero nec lorem tincidunt tincidunt. Suspendisse potenti.
        </p>

        <div className="integrantes">
          {[1, 2, 3].map((num) => (
            <div key={num} className="integrante">
              <img src={`/IMG/imagen${num}.jpg`} alt={`Integrante ${num}`} className="img-integrante" />
              <h4>Integrante {num}</h4>
              <p>Descripción del integrante {num}.</p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}

export default Nosotros;
