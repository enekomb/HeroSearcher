import React from 'react';
import { Navigate } from 'react-router-dom';

const RedirectIfAuthenticated = ({ user, children }) => {
  if (user) {
    return <Navigate to="/search" />; // Redirect to search if user is authenticated
  }

  return children; // If not authenticated, render the child component (Login or Home)
};

export default RedirectIfAuthenticated;