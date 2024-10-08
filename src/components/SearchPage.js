import React, { useEffect, useState, useCallback } from 'react'; // Asegúrate de importar useCallback
import { db } from '../firebase'; // Importa tu configuración de Firebase
import { collection, addDoc, getDocs } from 'firebase/firestore';
import '../Stylesheets/SearchPage.css'; // Importa el CSS

const totalHeroes = 731;
const apiKey = process.env.REACT_APP_SUPERHERO_API_KEY;
const heroesToShow = 6; // Número de héroes a mostrar en el carrusel

const SearchPage = ({ user }) => {
  const [heroName, setHeroName] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [randomHeroes, setRandomHeroes] = useState([]);
  const [favorites, setFavorites] = useState([]); // Estado para almacenar los favoritos

  // Función para obtener los favoritos del usuario
  const fetchFavorites = useCallback(async () => { // Usar useCallback para memoizar la función
    if (!user) return;

    try {
      const favoritesRef = collection(db, `users/${user.uid}/favorites`);
      const favoritesSnapshot = await getDocs(favoritesRef);
      const favoritesList = favoritesSnapshot.docs.map((doc) => doc.data().name);
      setFavorites(favoritesList);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  }, [user]); // Dependencia de user para que se ejecute cuando cambie

  useEffect(() => {
    fetchRandomHeroes(); // Cargar héroes aleatorios
    if (user) {
      fetchFavorites(); // Cargar favoritos si hay usuario
    }
  }, [user, fetchFavorites]); // Añadir fetchFavorites al array de dependencias

  // Función para obtener héroes aleatorios
  const fetchRandomHeroes = async () => {
    const randomIndices = Array.from({ length: heroesToShow }, () => Math.floor(Math.random() * totalHeroes) + 1);
    const fetchedHeroes = await Promise.all(
      randomIndices.map(async (index) => {
        const response = await fetch(`https://superheroapi.com/api.php/${apiKey}/${index}`);
        const data = await response.json();
        return data;
      })
    );
    setRandomHeroes(fetchedHeroes);
  };

  const handleSearch = async (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      setLoading(true);
      const link1 = `https://superheroapi.com/api.php/${apiKey}/search/`;
      try {
        const response = await fetch(link1 + heroName);
        const data = await response.json();
        setSearchResults(data.results || []);
      } catch (error) {
        console.error('Error fetching superhero data:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleAddFavorite = async (character) => {
    if (!user) {
      return;
    }

    if (favorites.includes(character.name)) {
      return;
    }

    try {
      const favoritesRef = collection(db, `users/${user.uid}/favorites`);
      await addDoc(favoritesRef, {
        name: character.name,
        image: character.image.url,
        powerstats: character.powerstats,
      });

      setFavorites((prevFavorites) => [...prevFavorites, character.name]);
    } catch (error) {
      console.error('Error adding favorite:', error);
    }
  };

  const nextHeroes = () => {
    fetchRandomHeroes();
  };

  const prevHeroes = () => {
    fetchRandomHeroes();
  };

  return (
    <div className="container">
      <header>
        <h1>SEARCH YOUR FAVORITE CHARACTER</h1>
      </header>
      <main>
        <div className="carousel">
          <button className="carousel-button left" onClick={prevHeroes}>❮</button>
          <div className="hero-container">
            {randomHeroes.map((hero) => (
              <div key={hero.id} className="hero-card">
                <img src={hero.image.url} alt={hero.name} className="hero-image" />
                <h3>{hero.name}</h3>
              </div>
            ))}
          </div>
          <button className="carousel-button right" onClick={nextHeroes}>❯</button>
        </div>
        <div className="search-container">
          <input
            type="search"
            placeholder="Enter a comic character name"
            id="hero-name"
            value={heroName}
            onChange={(e) => setHeroName(e.target.value)}
            onKeyDown={handleSearch}
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">
            Search
          </button>
        </div>
        {loading && <p className="loading">Loading...</p>}
        <div className="results-container">
          {searchResults.map((character) => (
            <div key={character.id} className="result-card">
              <img src={character.image.url} alt={character.name} className="result-image" />
              <h3>{character.name}</h3>
              <button 
                onClick={() => handleAddFavorite(character)} 
                className="favorite-button"
                disabled={favorites.includes(character.name)}
              >
                {favorites.includes(character.name) ? '✓ Added' : 'Add to Favorites'}
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default SearchPage;
