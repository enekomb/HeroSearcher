import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { auth } from '../auth';
import '../Stylesheets/Navbar.css'; // Import the CSS file

const Navbar = ({ user }) => {
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const defaultAvatar = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUW0u5Eiiy3oM6wcpeEE6sXCzlh8G-tX1_Iw&s";

  return (
    <nav className="menu-bar">
      <ul className="nav-links">
        {user ? (
          <>
            <li>
              <NavLink to="/search" className="nav-btn">Search</NavLink>
            </li>
            <li>
              <NavLink to="/favorites" className="nav-btn">Favorites</NavLink>
            </li>
            <li>
              <NavLink to="/about" className="nav-btn">About</NavLink>
            </li>
          </>
        ) : (<></>)}
      </ul>
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
