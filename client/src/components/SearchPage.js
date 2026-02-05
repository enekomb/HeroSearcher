import React, { useEffect, useState, useCallback } from 'react';
import { addFavorite, getFavorites, createUser } from '../database';
import '../Stylesheets/SearchPage.css';

const totalHeroes = 731;
const apiKey = process.env.REACT_APP_SUPERHERO_API_KEY;
const heroesToShow = 6;

const SearchPage = ({ user }) => {
  const [heroName, setHeroName] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [randomHeroes, setRandomHeroes] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Function to fetch user favorites
  const fetchFavorites = useCallback(async () => {
    if (!user) return;

    try {
      // Ensure user exists in database
      await createUser(user.uid, user.email, user.displayName);
      
      const favoritesList = await getFavorites(user.uid);
      const favoriteNames = favoritesList.map((fav) => fav.name);
      setFavorites(favoriteNames);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  }, [user]);

  useEffect(() => {
    fetchRandomHeroes();
    if (user) {
      fetchFavorites();
    }
  }, [user, fetchFavorites]);

  // Function to fetch random heroes
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
      await addFavorite(user.uid, {
        name: character.name,
        image: character.image?.url || '',
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
            {randomHeroes && randomHeroes.length > 0 && randomHeroes
              .filter(hero => hero && hero.image && hero.image.url)
              .map((hero) => (
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
          {searchResults && searchResults.length > 0 && searchResults
            .filter(character => character && character.image && character.image.url)
            .map((character) => (
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
