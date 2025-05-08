// src/COMPONENTS/Layout.jsx
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../CSS/estilo.css';

function Layout({ children }) {
  return (
    <div>
      <header className="head">
        <div className="logo">
          <Link to="/">
            <img src="/IMG/logo.jpg" alt="Logo Opción MG" />
          </Link>
        </div>
        <nav className="navbar">
          <Link to="/">Inicio</Link>
          <Link to="/musica">Música</Link>
          <Link to="/nosotros">Nuestro Grupo</Link>
          <Link to="/galeria">Galería</Link>
          <Link to="/contacto">Contacto</Link>
        </nav>
      </header>

      <main>{children}</main>

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

export default Layout;
