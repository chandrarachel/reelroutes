import { useState, useEffect } from 'react';
import { Play, Heart, MapPin, Clock, Info, X } from 'lucide-react';
import { getSceneImageUrl } from '../lib/supabase';
import haoHaoDimSumImg from '../assets/destinations/haoHaoDimSum.png';
import nikeStoreImg from '../assets/destinations/nikeStore.png';
import reelRoutesLogo from '../assets/reelRoutesWhiteLogo.svg';
import hongKongMoA from '../assets/destinations/moa.png';

import jaMorantShoes from '../assets/products/jaMorant.png';
import { transactionAPI } from '../lib/api';
import './MoviePlayer.css';

const MoviePlayer = ({ movie, userId }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeScene, setActiveScene] = useState(null);
  const [savedScenes, setSavedScenes] = useState([]);
  const [showOverlay, setShowOverlay] = useState(false);

  // Mock movie scenes - in production, this would come from sceneAPI
  const scenes = [
    {
      id: 'scene-1',
      timestamp: 5,
      title: 'Hong Mi Chang',
      subtitle: "The food you selected is called Hong Mi Chang. It’s a common item Hong Kong dim sum. In The Flavours of Friendship, the two friends had this delicious meal at",
      restaurant: 'Hao Hao Dim Sum',
      cuisine: 'Hong Kong Dim Sum & Coconut Chicken Hot Pot',
      location: 'Mong Kok, Hong Kong',
      rating: 4.5,
      type: 'food',
      description: 'Michelin-starred dim sum restaurant',
      image: haoHaoDimSumImg,
      bookable: true,
      price: 'HKD 150',
      asiaMiles: 1000,
    },
    {
      id: 'scene-2',
      timestamp: 10,
      title: 'Nike Ja Morant One',
      subtitle: 'The item you selected is the Nike Ja Morant One. It’s a recent addition in Nike’s shoes line-up. It’s seen here being worn by Ja Morant. Hong Kong has a number of Nike stores, famously on the iconic Sneaker Street; here’s more information!',
      location: 'Nike Mong Kok Store, Hong Kong',
      product: {
        name: 'Nike Ja Morant One',
        description: 'Nike’s Shoes',
        image: jaMorantShoes, 
      },
      type: 'shopping',
      description: 'Shoes worn by John Doe during the basketball game',
      image: nikeStoreImg,
      bookable: true,
      price: 'HKD 3,200',
      asiaMiles: 20000,
    },
        {
      id: 'scene-3',
      timestamp: 15,
      title: 'Hong Kong Museum of Art',
      location: 'Tsim Sha Tsui, Hong Kong',
      type: 'landmark',
      description: 'The area you selected is Hong Kong’s Museum of Art, right next to Avenue of Stars. Cloud Starships’s climax takes place to harken back to an earlier heartbreaking scene in the movie. Both popular tourist spots, it shouldn’t be a surprise that they are often placed high on places to visit lists to Hong Kong.',
      image: hongKongMoA,
      bookable: true,
      price: 'HKD 2,500',
      asiaMiles: 15000,
    },
  ];

  // Simulate video playback
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          const newTime = prev + 1;
          
          // Check if we hit a scene timestamp
          const scene = scenes.find(s => 
            Math.abs(s.timestamp - newTime) <= 1 && s.bookable
          );
          if (scene) {
            setActiveScene(scene);
            setShowOverlay(true);
            
            // Auto-hide overlay after 8 seconds if not interacted
            setTimeout(() => {
              setShowOverlay(false);
            }, 8000);
          }
          
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleSaveScene = async (scene) => {
    try {
      await transactionAPI.saveScene(userId, {
        scene_id: scene.id,
        scene_title: scene.title,
        scene_location: scene.location,
        scene_type: scene.type,
        timestamp: scene.timestamp,
        image_path: scene.image,
      });

      setSavedScenes([...savedScenes, scene.id]);
      
      // Show success toast
      showToast('Scene saved! View in your saved collection.', 'success');
    } catch (error) {
      console.error('Error saving scene:', error);
      showToast('Failed to save scene. Please try again.', 'error');
    }
  };

  const showToast = (message, type) => {
    // Simple toast implementation
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const isSaved = (sceneId) => savedScenes.includes(sceneId);

  return (
    <div className="movie-player">
      {/* Video Player */}
      <div className="video-container">
        <div className="video-placeholder">
          {!isPlaying && (
            <button 
              className="play-button"
              onClick={() => setIsPlaying(true)}
            >
              <Play size={64} />
            </button>
          )}
          
          {movie && (
            <div className="video-info">
              <h2>{movie.title}</h2>
              <p>{movie.genre} • {movie.year}</p>
            </div>
          )}
        </div>

        {/* Scene Overlay */}
        {showOverlay && activeScene && (
          <div className="reelroutes-overlay">
            <div className="overlay-header">
              <div className="reelroutes-logo">
                <img src={reelRoutesLogo} alt="ReelRoutes Logo" className="logo-icon" />
                <span className="logo-text">ReelRoutes</span>
              </div>
              <button 
                className="overlay-close"
                onClick={() => setShowOverlay(false)}
              >
                Close ×
              </button>
            </div>

            <div className="overlay-content">
              <div className="food-info">
                <p className="food-description">
                  {activeScene.subtitle ? (
                    <span>{activeScene.subtitle}</span>
                  ) : (
                    <span>{activeScene.description}</span>
                  )}
                </p>
              </div>

              <div className="restaurant-card">
                <div className="restaurant-image">
                  <img 
                    src={activeScene.image} 
                    alt={activeScene.restaurant || activeScene.title}
                  />
                </div>
                <div className="restaurant-details">
                  <h3 className="restaurant-name">{activeScene.restaurant || activeScene.title}</h3>
                  <p className="restaurant-cuisine">{activeScene.cuisine}</p>
                  <div className="restaurant-location">{activeScene.location}</div>
                  {activeScene.rating && (
                    <div className="restaurant-rating">
                      {'★'.repeat(Math.floor(activeScene.rating))}{'☆'.repeat(5 - Math.floor(activeScene.rating))}
                    </div>
                  )}
                </div>
              </div>

              {activeScene.product && (
                <div className="product-card">
                  <div className="product-image">
                    <img 
                      src={activeScene.product.image || '/placeholder-product.jpg'} 
                      alt={activeScene.product.name}
                    />
                  </div>
                  <div className="product-details">
                    <h4 className="product-name">{activeScene.product.name}</h4>
                    <p className="product-description">{activeScene.product.description}</p>
                  </div>
                </div>
              )}

              <div className="overlay-actions">
                <button 
                  className="add-destination-btn"
                  onClick={() => handleSaveScene(activeScene)}
                >
                  {isSaved(activeScene.id) ? '✓ Added to Cathay App' : 'Add Destination to Cathay App'}
                </button>
                {activeScene.product && (
                  <button className="add-item-btn">
                    Add Item to Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Video Controls */}
        <div className="video-controls">
          <button onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? '⏸' : '▶️'}
          </button>
          
          <div className="time-display">
            {formatTime(currentTime)}
          </div>

          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(currentTime / 7200) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Scene Timeline */}
      <div className="scene-timeline">
        <h4>
          <Info size={18} />
          Bookable Moments in This Movie
        </h4>
        <div className="timeline-scenes">
          {scenes.map((scene) => (
            <div 
              key={scene.id} 
              className={`timeline-scene ${currentTime >= scene.timestamp ? 'active' : ''}`}
              onClick={() => {
                setCurrentTime(scene.timestamp);
                setActiveScene(scene);
                setShowOverlay(true);
              }}
            >
              <div className="timeline-image">
                <img 
                  src={scene.product ? scene.product.image : scene.image || '/placeholder-scene.jpg'} 
                  alt={scene.title}
                />
                {isSaved(scene.id) && (
                  <Heart 
                    className="saved-indicator" 
                    size={20} 
                    fill="var(--cathay-green)"
                  />
                )}
              </div>
              <div className="timeline-info">
                <h5>{scene.title}</h5>
                <div className="timeline-meta">
                  <Clock size={14} />
                  <span>{formatTime(scene.timestamp)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoviePlayer;
