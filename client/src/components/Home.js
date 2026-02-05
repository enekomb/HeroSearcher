import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Stylesheets/Home.css';

const Home = ({ user }) => {
  const navigate = useNavigate();

  // Function to redirect to login
  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="title">Welcome to HeroSearcher</h1>
        <p className="subtitle">
          Discover the world of superheroes and comics! Use HeroSearcher to find information on your favorite heroes, watch the latest trailers, and save your favorites. Our app provides you with a powerful search engine to explore the Marvel universe and beyond.
        </p>

        {!user && (
          <div className="login-prompt-section">
            <p className="cta-text">
              Ready to explore? Log in to unlock the full experience, including search features and favorites.
            </p>
            <button className="login-button" onClick={handleLoginRedirect}>
              Get Started
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
