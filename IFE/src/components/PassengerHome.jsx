import { useState } from 'react';
import cathayLogo from '../assets/cathayLogoWhite.png';
import { Film, Heart, Settings, MessageCircle, Plane } from 'lucide-react';
import './PassengerHome.css';

import fof from '../assets/movies/fof.png';
import anthony from '../assets/movies/anthony.png';
import nat from '../assets/movies/nat.png';
import vic from '../assets/movies/vic.png';

const PassengerHome = ({ onNavigate, user }) => {
  const [movies] = useState([
    {
      id: 1,
      title: 'The Flavours of Friendship',
      genre: 'Comedy',
      year: '2023',
      duration: '98 min',
      poster: fof,
      bookableScenes: 3,
    },
    {
      id: 2,
      title: 'Vicko and Friends',
      genre: 'Comedy',
      year: '2018',
      duration: '120 min',
      poster: vic,
      bookableScenes: 1,
    },
    {
      id: 3,
      title: 'Anthony Lost in the Sauce: Hong Kong',
      genre: 'Culinary',
      year: '2023',
      duration: '102 min',
      poster: anthony,
      bookableScenes: 2,
    },
    {
      id: 4,
      title: 'Nat\'s Journey',
      genre: 'Drama',
      year: '2010',
      duration: '133 min',
      poster: nat,
      bookableScenes: 0,
    },
  ]);

  const handleMovieClick = (movie) => {
    onNavigate('movie', movie);
  };

  return (
    <div className="passenger-home">
      {/* Header */}
      <div className="home-header">
        <div className="nav-left">
          <button className="nav-btn menu-btn">
            <span>Menu</span>
          </button>
          <button className="nav-btn time-btn">
            <Plane size={16} />
            <span>4h 55min</span>
          </button>
        </div>
        <div className="cathay-logo" onClick={() => window.location.href = '/'} style={{ cursor: 'pointer' }}>
          <img src={cathayLogo} alt="Cathay Logo" className="logo-icon" style={{ height: 40, width: 'auto', marginRight: 8 }} />
        </div>
        <div className="nav-controls">
          <button className="control-btn"><Settings size={24} color="white" /></button>
          <button className="control-btn"><Heart size={24} color="white" /></button>
          <button className="control-btn"><MessageCircle size={24} color="white" /></button>
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
            <Film size={24} color="white" />
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
                {movie.poster && (
                  <img
                    src={movie.poster}
                    alt={movie.title + ' poster'}
                    className="movie-poster-img"
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', borderRadius: '18px' }}
                  />
                )}
                {/* {movie.bookableScenes > 0 && (
                  <div className="bookable-badge">
                    <Heart size={14} />
                    {movie.bookableScenes} Experiences
                  </div>
                )} */}
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
          <Heart size={32} className="info-icon" color="white" />
          <h4>Save Your Favorites</h4>
          <p>Tap the heart on any scene to save experiences you want to explore</p>
        </div>
        <div className="info-card">
          <Plane size={32} className="info-icon" color="white" />
          <h4>Sync on Landing</h4>
          <p>Your saved experiences automatically sync to the Cathay App when you land</p>
        </div>
        <div className="info-card">
          <Settings size={32} className="info-icon" color="white" />
          <h4>Customize Your Experience</h4>
          <p>Set your preferences to help our crew provide personalized service</p>
        </div>
      </div>
    </div>
  );
};

export default PassengerHome;
