// Componente de ruta privada para proteger rutas solo accesibles por administradores.
// Si el usuario no tiene token o no es admin, redirige al login.

import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRouteAdmin = ({ children }) => {
  // Obtiene el token y el rol del usuario desde localStorage
  const token = localStorage.getItem('token');
  const rol = localStorage.getItem('rol');

  // Si no hay token o el rol no es admin, redirige al login
  if (!token || rol !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  // Si es admin, renderiza el contenido protegido
  return children;
};

export default PrivateRouteAdmin;
