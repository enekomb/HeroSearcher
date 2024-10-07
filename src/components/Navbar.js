import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import '../Stylesheets/Navbar.css'; // Import the CSS file

const Navbar = ({ user }) => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log('User logged out');
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const defaultAvatar = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUW0u5Eiiy3oM6wcpeEE6sXCzlh8G-tX1_Iw&s";

  return (
    <nav className="topnav">
      <div className="navLinks">
        {user ? (
          <>
            <NavLink to="/search" className="nav-btn" activeClassName="active">Search</NavLink>
            <NavLink to="/favorites" className="nav-btn" activeClassName="active">Favorites</NavLink>
            <NavLink to="/about" className="nav-btn" activeClassName="active">About</NavLink>
          </>
        ) : (
          <>
            <NavLink to="/" className="nav-btn" activeClassName="active">Homepage</NavLink>
            <NavLink to="/login" className="nav-btn" activeClassName="active">Login</NavLink>
          </>
        )}
      </div>
      {user && (
        <div className="user-section">
          <button onClick={handleLogout} className="nav-btn logout">Logout</button>
          <img 
            src={user.photoURL || defaultAvatar} 
            alt="User Avatar" 
            className="user-avatar" 
          />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
