import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MainLogin from './auth/MainLogin';
import SearchPage from './components/SearchPage';
import About from './components/About';
import FavoritesPage from './components/FavoritesPage'; 
import Home from './components/Home'; 
import ProtectedRoute from './components/ProtectedRoute'; 
import RedirectIfAuthenticated from './components/RedirectIfAuthenticated'; 
import NotFound from './components/NotFound'; // Import the NotFound component
import './Stylesheets/App.css'; 
import { auth } from './firebase';

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) 
    {return <div>Loading...</div>;}

  return (
    <Router>
      <Navbar user={user} />
      <Routes>
        {/* Redirect to search if authenticated */}
        <Route 
          path="/" 
          element={
            <RedirectIfAuthenticated user={user}>
              <Home user={user} /> {/* Render Home if not logged in */}
            </RedirectIfAuthenticated>
          } 
        />
        <Route 
          path="/login" 
          element={
            <RedirectIfAuthenticated user={user}>
              <MainLogin />
            </RedirectIfAuthenticated>
          } 
        />
        {/* Protected routes */}
        <Route 
          path="/search" 
          element={
            <ProtectedRoute user={user}>
              <SearchPage user={user} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/about" 
          element={
            <ProtectedRoute user={user}>
              <About user={user} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/favorites" 
          element={
            <ProtectedRoute user={user}>
              <FavoritesPage user={user} />
            </ProtectedRoute>
          } 
        />
        
        {/* Catch all other routes and show 404 page */}
        <Route 
          path="*" 
          element={<NotFound user={user} />} 
        />
      </Routes>
    </Router>
  );
};

export default App;
