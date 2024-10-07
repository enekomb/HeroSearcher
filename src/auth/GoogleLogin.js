// src/auth/GoogleLogin.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { googleSignIn } from '../firebase'; // Asegúrate de importar las funciones de firebase

const GoogleLogin = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      await googleSignIn();
      navigate('/search'); // Redirigir a la página de búsqueda después de iniciar sesión
    } catch (error) {
      console.error('Error durante el inicio de sesión con Google:', error);
    }
  };

  return (
    <button onClick={handleGoogleLogin} style={styles.button}>Login with Google</button>
  );
};

const styles = {
  button: {
    padding: '10px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#DB4437', // Color de Google
    color: 'white',
    cursor: 'pointer',
    marginTop: '10px',
  },
};

export default GoogleLogin;
