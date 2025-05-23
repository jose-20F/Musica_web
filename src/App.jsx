// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './PAGES/Home';
import Contacto from './PAGES/contacto';
import Galeria from './PAGES/galeria';
import Musica from './PAGES/musica';
import Nosotros from './PAGES/nosotros';
import Layout from './COMPONENTS/Layout';
import Login from './PAGES/login';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/galeria" element={<Galeria />} />
        <Route path="/musica" element={<Musica />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/login" element={<Login />} />
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;
