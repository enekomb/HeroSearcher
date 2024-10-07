import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = ({ user }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (user) {
        navigate('/search'); 
      } else {
        navigate('/');
      }
    }, 3000); 

    return () => clearTimeout(timer);
  }, [user, navigate]);

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>404 - Page Not Found</h1>
      <p style={styles.text}>You will be redirected shortly...</p>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
    color: '#fff',
  },
  header: {
    fontSize: '3rem',
    marginBottom: '1rem',
  },
  text: {
    fontSize: '1.5rem',
  },
};

export default NotFound;
