// src/COMPONENTS/Layout.jsx
import { Link } from 'react-router-dom';
import { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../CSS/estilo.css';

function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggle = () => setMenuOpen(!menuOpen);
  const handleClose = () => setMenuOpen(false);

  return (
    <div>
      <header className="head">
        <div className="logo">
          <Link to="/" onClick={handleClose}>
            <img src="/IMG/logo.jpg" alt="Logo Opción MG" />
          </Link>
        </div>
        <button className="menu-toggle" onClick={handleToggle} aria-label="Abrir menú">
          <span className="menu-icon"></span>
        </button>
        <nav className={`navbar${menuOpen ? ' open' : ''}`}>
          <Link to="/" onClick={handleClose}>Inicio</Link>
          <Link to="/musica" onClick={handleClose}>Música</Link>
          <Link to="/nosotros" onClick={handleClose}>Nuestro Grupo</Link>
          <Link to="/galeria" onClick={handleClose}>Galería</Link>
          <Link to="/agenda" onClick={handleClose}>Agenda</Link>
          <Link to="/contacto" onClick={handleClose}>Contacto</Link>
          <Link to="/login" onClick={handleClose}>Login</Link>
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
