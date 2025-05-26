// src/App.js
// Componente principal de la aplicación.
// Define la estructura de rutas públicas y privadas usando React Router y el layout general.

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
import Agenda from './PAGES/agenda'; 

function App() {
  return (
    <Router>
      {/* Layout envuelve todas las páginas para mostrar navbar y footer en todas */}
      <Layout>
        <Routes>
          {/* Rutas públicas accesibles para cualquier usuario */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/musica" element={<Musica />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/galeria" element={<Galeria />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/agenda" element={<Agenda />} />

          {/* Ruta protegida solo para administradores */}
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
