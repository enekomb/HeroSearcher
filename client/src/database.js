// API service for database operations
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export const createUser = async (uid, email, displayName) => {
  try {
    const response = await fetch(`${API_URL}/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: uid, email, displayName }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create user');
    }
    
    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const addFavorite = async (userId, favoriteData) => {
  try {
    const response = await fetch(`${API_URL}/api/users/${userId}/favorites`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: favoriteData.name,
        image: favoriteData.image,
        powerstats: favoriteData.powerstats,
      }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to add favorite');
    }
    
    const favorite = await response.json();
    return favorite;
  } catch (error) {
    console.error('Error adding favorite:', error);
    throw error;
  }
};

export const getFavorites = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/api/users/${userId}/favorites`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch favorites');
    }
    
    const favorites = await response.json();
    return favorites;
  } catch (error) {
    console.error('Error getting favorites:', error);
    throw error;
  }
};

export const deleteFavorite = async (favoriteId) => {
  try {
    const response = await fetch(`${API_URL}/api/favorites/${favoriteId}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete favorite');
    }
  } catch (error) {
    console.error('Error deleting favorite:', error);
    throw error;
  }
};

export const checkFavoriteExists = async (userId, name) => {
  try {
    const favorites = await getFavorites(userId);
    return favorites.some(fav => fav.name === name);
  } catch (error) {
    console.error('Error checking favorite:', error);
    return false;
  }
};
