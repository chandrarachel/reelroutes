import { useState, useEffect } from 'react';
import { Play, Heart, MapPin, Clock, Info, X, Menu, ChevronLeft, Minimize2, Volume2, Pause, Star } from 'lucide-react';
import { getSceneImageUrl } from '../lib/supabase';
import haoHaoDimSumImg from '../assets/destinations/haoHaoDimSum.png';
import nikeStoreImg from '../assets/destinations/nikeStore.png';
import reelRoutesLogo from '../assets/reelRoutesWhiteLogo.svg';
import hongKongMoA from '../assets/destinations/moa.png';

import jaMorantShoes from '../assets/products/jaMorant.png';

import demoVid from '../assets/demo.mp4';
import { transactionAPI } from '../lib/api';
import './MoviePlayer.css';
import { useRef } from 'react';

const MoviePlayer = ({ movie, userId }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const videoRef = useRef(null);
  const [activeScene, setActiveScene] = useState(null);
  const [savedScenes, setSavedScenes] = useState([]);
  const [showOverlay, setShowOverlay] = useState(false);

  // Mock movie scenes - in production, this would come from sceneAPI
  const scenes = [
    {
      id: 'scene-1',
      timestamp: 19,
      title: 'Hong Mi Chang',
      subtitle: "The food you selected is called Hong Mi Chang. It’s a common item Hong Kong dim sum. In The Flavours of Friendship, the two friends had this delicious meal at",
      restaurant: 'Hao Hao Dim Sum',
      cuisine: 'Hong Kong Dim Sum & Coconut Chicken Hot Pot',
      location: 'Mong Kok, Hong Kong',
      rating: 4.5,
      type: 'food',
      // description: 'Michelin-starred dim sum restaurant',
      image: haoHaoDimSumImg,
      bookable: true,
      price: 'HKD 150',
      asiaMiles: 1000,
    },
    {
      id: 'scene-2',
      timestamp: 25,
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
      timestamp: 31,
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
            
            // Auto-hide overlay after 5 seconds if not interacted
            setTimeout(() => {
              setShowOverlay(false);
            }, 5000);
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
        {/* Top Navigation Bar - Cathay IFE Style */}
        <div className="top-nav-bar">
          <div className="nav-left">
            <button className="nav-btn" onClick={() => window.location.href = '/passenger'}>
              <ChevronLeft size={20} />
              <span>Back</span>
            </button>
          </div>
          <div className="nav-minimize" style={{ position: 'absolute', top: 20, right: 32 }}>
            <button className="nav-btn nav-btn-minimize">
              <Minimize2 size={20} />
            </button>
          </div>
        </div>

        <div className="video-placeholder">
          {!isPlaying ? (
            <button 
              className="play-button"
              onClick={() => {
                setIsPlaying(true);
                if (videoRef.current) {
                  videoRef.current.play();
                }
              }}
            >
              <Play size={48} />
            </button>
          ) : (
            <video
              ref={videoRef}
              src={demoVid}
              className="main-video"
              autoPlay
              controls={false}
              onEnded={() => setIsPlaying(false)}
              style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
            />
          )}
          {movie && (
            <div className="video-info">
              <h2>{movie.title}</h2>
              <div className="movie-meta">
                <span className="meta-item">{movie.genre}</span>
                <span className="meta-separator">•</span>
                <span className="meta-item">{movie.year}</span>
                <span className="meta-separator">•</span>
                <span className="meta-item">2 hour 45 min</span>
              </div>
              <div className="movie-stats">
                <div className="stat">
                  <span className="stat-icon">👍</span>
                  <span className="stat-value">92%</span>
                </div>
                <div className="stat-badge" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  <Star size={18} style={{ verticalAlign: 'middle' }} />
                  <span style={{ fontWeight: 700, fontSize: '16px', color: 'white', lineHeight: 1 }}>8.2</span>
                </div>
                <div className="rating-badges">
                  <span className="badge">PG-13</span>
                  <span className="badge">HD</span>
                  <span className="badge">CC</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Scene Overlay */}
        {showOverlay && activeScene && (
          <div className="reelroutes-overlay" style={{
            position: 'absolute',
            top: 24,
            right: 24,
            height: 'calc(100% - 48px)',
            width: '33vw',
            minWidth: 380,
            maxWidth: 540,
            background: 'rgba(18, 22, 28, 0.98)',
            borderRadius: 24,
            boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
            zIndex: 100,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            padding: '48px 32px',
            color: 'white',
            overflowY: 'auto',
          }}>
            <div className="overlay-header">
              <div className="reelroutes-logo">
                <img src={reelRoutesLogo} alt="ReelRoutes Logo" className="logo-icon" style={{ width: 32, height: 32 }} />
                <span className="logo-text" style={{ fontSize: 22, fontWeight: 700, marginLeft: 8 }}>ReelRoutes</span>
              </div>
              <button 
                className="overlay-close"
                onClick={() => setShowOverlay(false)}
                style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: 0, marginLeft: 'auto', display: 'flex', alignItems: 'center' }}
                aria-label="Close"
              >
                <X size={28} />
              </button>
            </div>

            <div className="overlay-content">
              <div className="food-info" style={{ fontSize: 20, marginBottom: 32, lineHeight: 1.5 }}>
                <p className="food-description">
                  {activeScene.subtitle ? (
                    <span>{activeScene.subtitle}</span>
                  ) : (
                    <span>{activeScene.description}</span>
                  )}
                </p>
              </div>

              <div className="restaurant-card" style={{ display: 'flex', gap: 24, marginBottom: 32 }}>
                <div className="restaurant-card-inner" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                  <div className="restaurant-image" style={{ width: '100%', height: '340px', borderRadius: 16, overflow: 'hidden', marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img 
                      src={activeScene.image} 
                      alt={activeScene.restaurant || activeScene.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 16 }}
                    />
                  </div>
                  <div className="restaurant-details" style={{ width: '100%' }}>
                    <h3 className="restaurant-name" style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>{activeScene.restaurant || activeScene.title}</h3>
                    <p className="restaurant-cuisine" style={{ fontSize: 16, marginBottom: 4 }}>{activeScene.cuisine}</p>
                    <div className="restaurant-location" style={{ fontSize: 15, color: '#ccc', marginBottom: 8 }}>{activeScene.location}</div>
                    {activeScene.rating && (
                      <div className="restaurant-rating" style={{ fontSize: 18, color: '#FFD700', marginBottom: 8 }}>
                        {'★'.repeat(Math.floor(activeScene.rating))}{'☆'.repeat(5 - Math.floor(activeScene.rating))}
                      </div>
                    )}
                  </div>
                  {activeScene.description && (
                    <div className="restaurant-description" style={{ fontSize: 16, color: '#eee', marginTop: 8 }}>
                      {activeScene.description}
                    </div>
                  )}
                </div>
              </div>

              {activeScene.product && (
                <div className="product-card" style={{ display: 'flex', gap: 24, marginBottom: 32 }}>
                  <div className="product-image" style={{ flex: '0 0 120px', borderRadius: 12, overflow: 'hidden' }}>
                    <img 
                      src={activeScene.product.image || '/placeholder-product.jpg'} 
                      alt={activeScene.product.name}
                      style={{ width: 120, height: 90, objectFit: 'cover', borderRadius: 12 }}
                    />
                  </div>
                  <div className="product-details" style={{ flex: 1 }}>
                    <h4 className="product-name" style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>{activeScene.product.name}</h4>
                    <p className="product-description" style={{ fontSize: 16, marginBottom: 4 }}>{activeScene.product.description}</p>
                    {activeScene.price && (
                      <p className="product-price" style={{ fontWeight: 600, color: '#00a86b', marginTop: 4, fontSize: 18 }}>
                        {activeScene.price}
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div className="overlay-actions" style={{ marginTop: 16, display: 'flex', gap: 16 }}>
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                  <button 
                    className="add-destination-btn"
                    style={{ fontSize: 18, padding: '14px 28px', borderRadius: 10, fontWeight: 700, marginBottom: activeScene.product ? 16 : 0, width: '100%' }}
                    onClick={() => handleSaveScene(activeScene)}
                  >
                    {isSaved(activeScene.id) ? '✓ Added to Cathay App' : 'Add Destination to Cathay App'}
                  </button>
                  {activeScene.product && (
                    <button className="add-item-btn" style={{ fontSize: 18, padding: '14px 28px', borderRadius: 10, fontWeight: 700, width: '100%' }}>
                      Add Item to Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Video Controls - Cathay IFE Style */}
        <div className="video-controls">
          <div className="controls-left">
            <button className="control-btn" onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
            <div className="time-display">
              {formatTime(currentTime)}
            </div>
          </div>

          <div 
            className="progress-bar"
            style={{ position: 'relative', cursor: 'pointer', height: 8 }}
            onClick={e => {
              const bar = e.currentTarget;
              const rect = bar.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const percent = x / rect.width;
              const duration = videoRef.current && videoRef.current.duration ? videoRef.current.duration : 7200;
              const newTime = Math.floor(percent * duration);
              setCurrentTime(newTime);
              if (videoRef.current) {
                videoRef.current.currentTime = newTime;
              }
            }}
          >
            <div
              className="progress-fill"
              style={{
                width: `${(currentTime / (videoRef.current && videoRef.current.duration ? videoRef.current.duration : 7200)) * 100}%`,
                height: 8,
                background: '#00a86b',
                borderRadius: 4,
                position: 'absolute',
                top: 0,
                left: 0,
              }}
            />
            {/* Slider Thumb */}
            <div
              className="progress-thumb"
              style={{
                position: 'absolute',
                top: '50%',
                left: `calc(${(currentTime / (videoRef.current && videoRef.current.duration ? videoRef.current.duration : 7200)) * 100}% - 8px)`,
                transform: 'translateY(-50%)',
                width: 16,
                height: 16,
                borderRadius: '50%',
                background: '#fff',
                border: '2px solid #00a86b',
                boxShadow: '0 0 4px rgba(0,0,0,0.2)',
                cursor: 'pointer',
                zIndex: 2,
                transition: 'left 0.1s',
              }}
              draggable={false}
            />
          </div>

          <div className="controls-right">
            <button className="control-btn">
              <Volume2 size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Movie Info Section - Cathay IFE Style */}
      <div className="movie-info-section">
        <div className="info-tabs">
          <button className="info-tab">Overview</button>
          <button className="info-tab">Oscars Awards 2023 Best Picture</button>
        </div>
        
        <div className="language-selector">
          <h4>Languages</h4>
          <div className="language-buttons">
            <button className="lang-btn active">English</button>
            <button className="lang-btn">Deutsch</button>
            <button className="lang-btn">Français</button>
            <button className="lang-btn">中文版</button>
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
