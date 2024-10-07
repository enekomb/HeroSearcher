// src/auth/GithubLogin.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { githubSignIn } from '../firebase'; // Asegúrate de importar las funciones de firebase

const GithubLogin = () => {
  const navigate = useNavigate();

  const handleGithubLogin = async () => {
    try {
      await githubSignIn();
      navigate('/search'); // Redirigir a la página de búsqueda después de iniciar sesión
    } catch (error) {
      console.error('Error durante el inicio de sesión con GitHub:', error);
    }
  };

  return (
    <button onClick={handleGithubLogin} style={styles.button}>Login with GitHub</button>
  );
};

const styles = {
  button: {
    padding: '10px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#333', // Color de GitHub
    color: 'white',
    cursor: 'pointer',
    marginTop: '10px',
  },
};

export default GithubLogin;
