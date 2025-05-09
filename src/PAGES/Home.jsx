// src/pages/Home.jsx
import '../CSS/estilo.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Home() {
  return (
    <div className="page-container">
      <header className="head">
        <div className="logo">
          <a href="/">
            <img src="/IMG/logo.jpg" alt="Logo Opción MG" />
          </a>
        </div>
        <nav className="navbar">
          <a href="/">Inicio</a>
          <a href="/musica">Música</a>
          <a href="/nosotros">Nuestro Grupo</a>
          <a href="/galeria">Galería</a>
          <a href="/contacto">Contacto</a>
        </nav>
      </header>

      <main className="content header">
        <img src="/IMG/logo.jpg" alt="Logo Opción MG" className="responsive-logo" />
      </main>

      <section className="content about">
        <h2 className="title">Nosotros</h2>
        <p>
          Opción MG es un grupo musical versátil que ofrece una amplia gama de generos musicales 
        </p>

        <div className="box-container">
          <div className="box">
            <i className="bi bi-disc"></i>
            <h3>Traklist</h3>
            <p>Descubre nuestro repertorio de canciones para tocar en tus eventos</p>
            <a href="/musica" className="btn">Saber más</a>
          </div>

          <div className="box">
            <i className="bi bi-camera"></i>
            <h3>Galería</h3>
            <p>¿Aún no te decides? Checa nuestra galería para ver más</p>
            <a href="/galeria" className="btn">Saber más</a>
          </div>

          <div className="box">
            <i className="bi bi-journal-check"></i>
            <h3>Contacto</h3>
            <p>
              ¿No sabes cómo pasarla bien en tus eventos? ¡Nosotros somos la
              solución! Contáctanos
            </p>
            <a href="/contacto" className="btn">Regístrate</a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <hr className="divider" />
        <p>Síguenos en:</p>
        <div className="social-links">
          <a href="#"><i className="bi bi-facebook"></i></a>
          <a href="#"><i className="bi bi-twitter-x"></i></a>
          <a href="#"><i className="bi bi-instagram"></i></a>
          <a href="#"><i className="bi bi-youtube"></i></a>
        </div>
      </footer>
    </div>
  );
}

export default Home;