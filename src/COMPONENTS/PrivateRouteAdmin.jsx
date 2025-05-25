// src/components/PrivateRouteAdmin.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRouteAdmin = ({ children }) => {
  const token = localStorage.getItem('token');
  const rol = localStorage.getItem('rol');

  if (!token || rol !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRouteAdmin;
