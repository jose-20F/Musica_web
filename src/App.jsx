// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from './COMPONENTS/Layout';
import PrivateRouteAdmin from './COMPONENTS/PrivateRouteAdmin';
import Login from './PAGES/login';
import HomeAdmin from './PAGES/HomeAdmin';
import Home from './PAGES/Home';
import Musica from './PAGES/musica';
import Contacto from './PAGES/contacto';
import Galeria from './PAGES/galeria';
import Nosotros from './PAGES/nosotros';
import Agenda from './PAGES/Agenda';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/musica" element={<Musica />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/galeria" element={<Galeria />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/agenda" element={<Agenda />} /> {/* <-- Agrega esta línea */}

          {/* Ruta protegida solo para admin */}
          <Route
            path="/homeadmin"
            element={
              <PrivateRouteAdmin>
                <HomeAdmin />
              </PrivateRouteAdmin>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
