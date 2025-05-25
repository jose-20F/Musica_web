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
           <img src='/public/IMG/logo.png' alt="Logo Opcion MG"></img>
          </Link>
        </div>
        <nav className="navbar">
          <Link to="/">Inicio</Link>
          <Link to="/musica">Música</Link>
          <Link to="/nosotros">Paquetes</Link>
          <Link to="/galeria">Galería</Link>
          <Link to="/contacto">Contacto</Link>
        </nav>
      </header>

      <main>{children}</main>

      <footer className="footer">
        <div className="divider"></div>
        <p>Síguenos en:</p>
         <div className="social-links">
          <a href="https://www.facebook.com/profile.php?id=61563383490654"><i className="bi bi-facebook"></i></a>
          <a href="https://x.com/OpcionMGrupo"><i className="bi bi-twitter-x"></i></a>
          <a href="https://www.instagram.com/opcionmgrupo/"><i className="bi bi-instagram"></i></a>
          <a href="https://www.youtube.com/channel/UCcHAjeHZ9JRY1vi2g2C6blA"><i className="bi bi-youtube"></i></a>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
