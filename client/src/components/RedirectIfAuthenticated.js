import React from 'react';
import { Navigate } from 'react-router-dom';

const RedirectIfAuthenticated = ({ user, children }) => {
  if (user) {
    return <Navigate to="/search" />; // Redirigir a search si el usuario está autenticado
  }

  return children; // Si no está autenticado, renderiza el componente hijo (Login o Home)
};

export default RedirectIfAuthenticated;