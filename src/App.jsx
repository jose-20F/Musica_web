// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './PAGES/Home';
import Contacto from './PAGES/contacto';
import Galeria from './PAGES/galeria';
import Musica from './PAGES/musica';
import Nosotros from './PAGES/nosotros';
import Agenda from './PAGES/agenda'; // <-- Cambia aquí la importación
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/galeria" element={<Galeria />} />
        <Route path="/musica" element={<Musica />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/agenda" element={<Agenda />} /> {/* Esto ya está bien */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
