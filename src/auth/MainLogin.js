// src/auth/MainLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { googleSignIn, githubSignIn } from '../firebase'; // Importa las funciones de inicio de sesión
import GoogleLogin from './GoogleLogin';
import GithubLogin from './GithubLogin';
import '../Stylesheets/MainLogin.css'; // Import the CSS file

const MainLogin = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      await googleSignIn();
      navigate('/search'); // Redirect to the search page after login
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGithubLogin = async () => {
    try {
      await githubSignIn();
      navigate('/search'); // Redirect to the search page after login
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <div className="login-buttons">
          <GoogleLogin onLogin={handleGoogleLogin} />
          <GithubLogin onLogin={handleGithubLogin} />
        </div>
      </div>
    </div>
  );
};

export default MainLogin;

