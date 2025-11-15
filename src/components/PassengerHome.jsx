import { useState } from 'react';
import reelRoutesLogo from '../assets/reelRoutesWhiteLogo.svg';
import { Film, Heart, Settings, MessageCircle, Plane } from 'lucide-react';
import './PassengerHome.css';

const PassengerHome = ({ onNavigate, user }) => {
  const [movies] = useState([
    {
      id: 1,
      title: 'The Flavours of Friendship',
      genre: 'Romance',
      year: '2000',
      duration: '98 min',
      poster: '/movies/in-the-mood.jpg',
      bookableScenes: 3,
    },
    {
      id: 2,
      title: 'Crazy Rich Asians',
      genre: 'Romance/Comedy',
      year: '2018',
      duration: '120 min',
      poster: '/movies/crazy-rich.jpg',
      bookableScenes: 5,
    },
    {
      id: 3,
      title: 'Lost in Translation',
      genre: 'Drama',
      year: '2003',
      duration: '102 min',
      poster: '/movies/lost-translation.jpg',
      bookableScenes: 4,
    },
    {
      id: 4,
      title: 'Eat Pray Love',
      genre: 'Drama',
      year: '2010',
      duration: '133 min',
      poster: '/movies/eat-pray-love.jpg',
      bookableScenes: 6,
    },
  ]);

  const handleMovieClick = (movie) => {
    onNavigate('movie', movie);
  };

  return (
    <div className="passenger-home">
      {/* Header */}
      <div className="home-header">
        <div className="cathay-logo">
          <img src={reelRoutesLogo} alt="ReelRoutes Logo" className="logo-icon" style={{ height: 32, width: 32, marginRight: 8 }} />
          <h1>ReelRoutes</h1>
        </div>
        <div className="header-actions">
          <button className="icon-button" onClick={() => onNavigate('preferences')}>
            <Settings size={24} />
          </button>
          <button className="icon-button" onClick={() => onNavigate('saved')}>
            <Heart size={24} />
          </button>
          <button className="icon-button">
            <MessageCircle size={24} />
          </button>
        </div>
      </div>

      {/* Welcome Banner */}
      <div className="welcome-banner">
        <h2>Welcome aboard, {user?.name || 'Passenger'}!</h2>
        <p>Discover experiences from the movies you love</p>
        <div className="flight-info">
          <span>Flight CX 2025</span>
          <span>•</span>
          <span>Indonesia → Hong Kong</span>
          <span>•</span>
          <span>Seat {user?.seat || '12A'}</span>
        </div>
      </div>

      {/* Featured Section */}
      <div className="featured-section">
        <div className="section-header">
          <h3>
            <Film size={24} />
            Featured Movies with Bookable Experiences
          </h3>
        </div>

        <div className="movies-grid">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="movie-card"
              onClick={() => handleMovieClick(movie)}
            >
              <div className="movie-poster">
                <div className="poster-placeholder">
                  <Film size={48} />
                </div>
                {movie.bookableScenes > 0 && (
                  <div className="bookable-badge">
                    <Heart size={14} />
                    {movie.bookableScenes} Experiences
                  </div>
                )}
              </div>
              <div className="movie-info">
                <h4>{movie.title}</h4>
                <p className="movie-meta">
                  {movie.genre} • {movie.year}
                </p>
                <p className="movie-duration">{movie.duration}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info Section */}
      <div className="info-section">
        <div className="info-card">
          <Heart size={32} className="info-icon" />
          <h4>Save Your Favorites</h4>
          <p>Tap the heart on any scene to save experiences you want to explore</p>
        </div>
        <div className="info-card">
          <Plane size={32} className="info-icon" />
          <h4>Sync on Landing</h4>
          <p>Your saved experiences automatically sync to the Cathay App when you land</p>
        </div>
        <div className="info-card">
          <Settings size={32} className="info-icon" />
          <h4>Customize Your Experience</h4>
          <p>Set your preferences to help our crew provide personalized service</p>
        </div>
      </div>
    </div>
  );
};

export default PassengerHome;
