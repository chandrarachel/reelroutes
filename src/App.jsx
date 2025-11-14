import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './components/Landing';
import PassengerHome from './components/PassengerHome';
import MoviePlayer from './components/MoviePlayer';
import PreferencePanel from './components/PreferencePanel';
import SavedScenes from './components/SavedScenes';
import CrewDashboard from './components/CrewDashboard';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState({
    id: 'user-123',
    name: 'Sarah Chen',
    seat: '12A',
    flightId: 'CX123',
  });

  const handleNavigate = (view, data = null) => {
    setCurrentView(view);
    if (view === 'movie' && data) {
      setSelectedMovie(data);
    }
  };

  const handleBack = () => {
    setCurrentView('home');
    setSelectedMovie(null);
  };

  // Main Passenger Interface
  const PassengerInterface = () => {
    return (
      <div className="passenger-interface">
        {currentView === 'home' && (
          <PassengerHome onNavigate={handleNavigate} user={user} />
        )}

        {currentView === 'movie' && selectedMovie && (
          <div className="movie-view">
            <button className="back-button" onClick={handleBack}>
              ← Back to Home
            </button>
            <MoviePlayer movie={selectedMovie} userId={user.id} />
          </div>
        )}

        {currentView === 'preferences' && (
          <div className="preferences-view">
            <button className="back-button" onClick={handleBack}>
              ← Back to Home
            </button>
            <PreferencePanel userId={user.id} onClose={handleBack} />
          </div>
        )}

        {currentView === 'saved' && (
          <div className="saved-view">
            <button className="back-button" onClick={handleBack}>
              ← Back to Home
            </button>
            <SavedScenes userId={user.id} />
          </div>
        )}
      </div>
    );
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/passenger" element={<PassengerInterface />} />
        <Route 
          path="/crew" 
          element={<CrewDashboard flightId={user.flightId} crewSection="Business" />} 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
