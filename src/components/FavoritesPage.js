import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import '../Stylesheets/FavoritesPage.css'; // Importa el CSS

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchFavorites(user.uid);
      } else {
        setUser(null);
        setFavorites([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchFavorites = async (userId) => {
    setLoading(true);
    try {
      const favoritesCollection = collection(db, `users/${userId}/favorites`);
      const favoritesSnapshot = await getDocs(favoritesCollection);
      const favoritesList = favoritesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setFavorites(favoritesList);
    } catch (error) {
      console.error('Error al obtener favoritos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (user) {
      try {
        await deleteDoc(doc(db, `users/${user.uid}/favorites`, id));
        setFavorites((prevFavorites) => prevFavorites.filter((favorite) => favorite.id !== id));
      } catch (error) {
        console.error('Error al eliminar favorito:', error);
      }
    }
  };

  const statOrder = ['intelligence', 'strength', 'speed', 'durability', 'power', 'combat'];

  if (loading) {
    return <div>Cargando favoritos...</div>;
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
                        data-stat={`stat-${stat}-${favorite.id}`} // Cambiado a usar `favorite.id`
                        style={{ width: '0%', backgroundColor: getStatColor(stat) }}
                      >
                        <span className="stat-label">{favorite.powerstats[stat]}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={() => handleDelete(favorite.id)} className="button2">
                Eliminar
              </button>
            </div>
          ))}
        </div>
      ) : (
        <center><p>you don't have any favorites yet, use the search bar to add the characters you like the most.</p></center>
      )}
      {/* Cargar las estadísticas con un pequeño ritmo */}
      {favorites.forEach((favorite, index) => {
        statOrder.forEach((stat) => {
          setTimeout(() => {
            const statFillElement = document.querySelector(`.stat-fill[data-stat="stat-${stat}-${favorite.id}"]`);
            if (statFillElement) {
              statFillElement.style.width = `${favorite.powerstats[stat]}%`;
            }
          }, 500 * (index + 1)); // Retraso para la animación en función del índice
        });
      })}
    </div>
  );
};

// Función para obtener el color de la barra de acuerdo a la estadística
const getStatColor = (stat) => {
  switch (stat) {
    case 'intelligence':
      return '#4CAF50'; // Verde
    case 'strength':
      return '#2196F3'; // Azul
    case 'speed':
      return '#FF9800'; // Naranja
    case 'durability':
      return '#9C27B0'; // Morado
    case 'power':
      return '#F44336'; // Rojo
    case 'combat':
      return '#FFC107'; // Amarillo
    default:
      return '#B0BEC5'; // Gris
  }
};

export default FavoritesPage;
