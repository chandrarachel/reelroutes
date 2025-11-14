const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

// Helper function for API calls
const fetchAPI = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Auth API
export const authAPI = {
  // Authenticate user via QR code scan
  scanQR: async (qrCode) => {
    return fetchAPI('/auth/scan', {
      method: 'POST',
      body: JSON.stringify({ qr_code: qrCode }),
    });
  },

  // Get user session
  getSession: async (token) => {
    return fetchAPI('/auth/session', {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};

// Preference API
export const preferenceAPI = {
  // Get user preferences
  getPreferences: async (userId) => {
    return fetchAPI(`/preferences/${userId}`);
  },

  // Update user preferences
  updatePreferences: async (userId, preferences) => {
    return fetchAPI(`/preferences/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(preferences),
    });
  },

  // Add meal preference
  addMealPreference: async (userId, mealData) => {
    return fetchAPI(`/preferences/${userId}/meals`, {
      method: 'POST',
      body: JSON.stringify(mealData),
    });
  },

  // Add service preference (wake for meals, sleep through service, etc.)
  addServicePreference: async (userId, serviceData) => {
    return fetchAPI(`/preferences/${userId}/service`, {
      method: 'POST',
      body: JSON.stringify(serviceData),
    });
  },
};

// Transaction API
export const transactionAPI = {
  // Get all user transactions
  getTransactions: async (userId) => {
    return fetchAPI(`/transactions/${userId}`);
  },

  // Save a scene/spot
  saveScene: async (userId, sceneData) => {
    return fetchAPI(`/transactions/save`, {
      method: 'POST',
      body: JSON.stringify({
        user_id: userId,
        ...sceneData,
      }),
    });
  },

  // Get saved scenes
  getSavedScenes: async (userId) => {
    return fetchAPI(`/transactions/${userId}/saved-scenes`);
  },

  // Sync transactions on landing
  syncOnLanding: async (userId) => {
    return fetchAPI(`/transactions/${userId}/sync`, {
      method: 'POST',
    });
  },
};

// Scene API (for getting scene details from backend)
export const sceneAPI = {
  // Get scene by ID
  getScene: async (sceneId) => {
    return fetchAPI(`/scenes/${sceneId}`);
  },

  // Get scenes for a movie
  getMovieScenes: async (movieId) => {
    return fetchAPI(`/scenes/movie/${movieId}`);
  },

  // Search scenes by location or type
  searchScenes: async (query) => {
    return fetchAPI(`/scenes/search?q=${encodeURIComponent(query)}`);
  },
};

// Crew API
export const crewAPI = {
  // Get all passengers for crew dashboard
  getPassengers: async (flightId) => {
    return fetchAPI(`/crew/passengers/${flightId}`);
  },

  // Get passenger details
  getPassengerDetails: async (passengerId) => {
    return fetchAPI(`/crew/passenger/${passengerId}`);
  },

  // Update passenger status
  updatePassengerStatus: async (passengerId, status) => {
    return fetchAPI(`/crew/passenger/${passengerId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  },

  // Send message to passenger
  sendMessage: async (passengerId, message) => {
    return fetchAPI(`/crew/passenger/${passengerId}/message`, {
      method: 'POST',
      body: JSON.stringify({ message }),
    });
  },
};

// Messages API (for passenger-crew communication)
export const messageAPI = {
  // Send message from passenger to crew
  sendToCreww: async (userId, message) => {
    return fetchAPI(`/messages/to-crew`, {
      method: 'POST',
      body: JSON.stringify({
        user_id: userId,
        message,
      }),
    });
  },

  // Get messages for passenger
  getMessages: async (userId) => {
    return fetchAPI(`/messages/${userId}`);
  },
};
