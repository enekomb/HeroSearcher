// Simple mock authentication for demo purposes
// In a production app, you would use a proper authentication service

const AUTH_STORAGE_KEY = 'heroSearcher_user';

export const auth = {
  currentUser: null,
  
  // Initialize auth on app load
  initialize() {
    const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);
    if (storedUser) {
      try {
        this.currentUser = JSON.parse(storedUser);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    }
  },
  
  // Mock sign-in (in production, this would be a real OAuth flow)
  signInWithProvider: async (provider) => {
    // Simulate OAuth flow
    const mockUser = {
      uid: 'demo-user-' + Date.now(),
      email: `demo@${provider}.com`,
      displayName: `Demo ${provider} User`,
    };
    
    auth.currentUser = mockUser;
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(mockUser));
    
    // Notify listeners
    auth._notifyListeners(mockUser);
    
    return { user: mockUser };
  },
  
  // Sign out
  signOut: async () => {
    auth.currentUser = null;
    localStorage.removeItem(AUTH_STORAGE_KEY);
    auth._notifyListeners(null);
  },
  
  // Auth state listener
  _listeners: [],
  onAuthStateChanged(callback) {
    this._listeners.push(callback);
    
    // Call immediately with current state
    callback(this.currentUser);
    
    // Return unsubscribe function
    return () => {
      const index = this._listeners.indexOf(callback);
      if (index > -1) {
        this._listeners.splice(index, 1);
      }
    };
  },
  
  _notifyListeners(user) {
    this._listeners.forEach(callback => callback(user));
  }
};

// Initialize on module load
auth.initialize();

// Authentication functions
export const googleSignIn = async () => {
  try {
    const result = await auth.signInWithProvider('google');
    const user = result.user;
    return user;
  } catch (error) {
    console.error('Error during Google sign-in:', error);
    alert('Error during Google sign-in. Please try logging in with GitHub.');
  }
};

export const githubSignIn = async () => {
  try {
    const result = await auth.signInWithProvider('github');
    const user = result.user;
    return user;
  } catch (error) {
    console.error('Error during GitHub sign-in:', error);
    alert('Error during GitHub sign-in. Please try logging in with Google.');
  }
};
