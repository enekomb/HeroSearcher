import React, { useEffect, useState } from 'react';
import { getFavorites, deleteFavorite } from '../database';
import { auth } from '../auth';
import '../Stylesheets/FavoritesPage.css';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        fetchUserFavorites(user.uid);
      } else {
        setUser(null);
        setFavorites([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUserFavorites = async (userId) => {
    setLoading(true);
    try {
      const favoritesList = await getFavorites(userId);
      setFavorites(favoritesList);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (user) {
      try {
        await deleteFavorite(id);
        setFavorites((prevFavorites) => prevFavorites.filter((favorite) => favorite.id !== id));
      } catch (error) {
        console.error('Error deleting favorite:', error);
      }
    }
  };

  const statOrder = ['intelligence', 'strength', 'speed', 'durability', 'power', 'combat'];

  if (loading) {
    return <div>Loading favorites...</div>;
  }

  return (
    <div className="container">
      <center><h1>Favorites</h1></center>
      {favorites.length > 0 ? (
        <div className="cardContainer">
          {favorites.map((favorite) => (
            <div key={favorite.id} className="card">
              <img src={favorite.image} alt={favorite.name} className="image" />
              <h2>{favorite.name}</h2>
              <div className="powerStats">
                {statOrder.map((stat) => (
                  <div className="stat-bar" key={stat}>
                    <span className="stat-name">{stat.charAt(0).toUpperCase() + stat.slice(1)}:</span>
                    <div className="stat-bar-container">
                      <div
                        className="stat-fill"
                        data-stat={`stat-${stat}-${favorite.id}`}
                        style={{ width: '0%', backgroundColor: getStatColor(stat) }}
                      >
                        <span className="stat-label">{favorite.powerstats[stat]}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={() => handleDelete(favorite.id)} className="button2">
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <center><p>You don't have any favorites yet. Use the search bar to add the characters you like the most.</p></center>
      )}
      {/* Load statistics with a small delay */}
      {favorites.forEach((favorite, index) => {
        statOrder.forEach((stat) => {
          setTimeout(() => {
            const statFillElement = document.querySelector(`.stat-fill[data-stat="stat-${stat}-${favorite.id}"]`);
            if (statFillElement) {
              statFillElement.style.width = `${favorite.powerstats[stat]}%`;
            }
          }, 500 * (index + 1));
        });
      })}
    </div>
  );
};

// Function to get the color of the bar according to the statistic
const getStatColor = (stat) => {
  switch (stat) {
    case 'intelligence':
      return '#4CAF50'; // Green
    case 'strength':
      return '#2196F3'; // Blue
    case 'speed':
      return '#FF9800'; // Orange
    case 'durability':
      return '#9C27B0'; // Purple
    case 'power':
      return '#F44336'; // Red
    case 'combat':
      return '#FFC107'; // Yellow
    default:
      return '#B0BEC5'; // Gray
  }
};

export default FavoritesPage;
