import { useState, useEffect } from 'react';
import { Play, Heart, MapPin, Clock, Info, X } from 'lucide-react';
import { getSceneImageUrl } from '../lib/supabase';
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
      timestamp: 245, // 4:05
      title: 'Avenue of the Stars',
      location: 'Hong Kong',
      type: 'landmark',
      description: 'Iconic waterfront promenade with stunning harbor views',
      image: 'scenes/avenue-stars-1.jpg',
      bookable: true,
      price: 'HKD 2,500',
      asiaMiles: 15000,
    },
    {
      id: 'scene-2',
      timestamp: 520, // 8:40
      title: 'Authentic Dim Sum',
      location: 'Tim Ho Wan, Hong Kong',
      type: 'food',
      description: 'Michelin-starred dim sum restaurant',
      image: 'scenes/dimsum-1.jpg',
      bookable: true,
      price: 'HKD 150',
      asiaMiles: 1000,
    },
    {
      id: 'scene-3',
      timestamp: 890, // 14:50
      title: 'Victoria Peak',
      location: 'Hong Kong',
      type: 'landmark',
      description: 'Panoramic views of Hong Kong skyline',
      image: 'scenes/victoria-peak-1.jpg',
      bookable: true,
      price: 'HKD 3,200',
      asiaMiles: 20000,
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
          const scene = scenes.find(s => s.timestamp === newTime);
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
          <div className="scene-overlay slide-up">
            <button 
              className="overlay-close"
              onClick={() => setShowOverlay(false)}
            >
              <X size={24} />
            </button>

            <div className="scene-content">
              <div className="scene-image">
                <img 
                  src={getSceneImageUrl(activeScene.image) || '/placeholder-scene.jpg'} 
                  alt={activeScene.title}
                />
                <span className="scene-badge">{activeScene.type}</span>
              </div>

              <div className="scene-details">
                <h3>{activeScene.title}</h3>
                <div className="scene-location">
                  <MapPin size={16} />
                  <span>{activeScene.location}</span>
                </div>
                <p className="scene-description">{activeScene.description}</p>

                {activeScene.bookable && (
                  <div className="scene-booking">
                    <div className="price-info">
                      <span className="price">{activeScene.price}</span>
                      <span className="miles">or {activeScene.asiaMiles.toLocaleString()} Asia Miles</span>
                    </div>

                    <div className="scene-actions">
                      <button
                        className={`btn-save ${isSaved(activeScene.id) ? 'saved' : ''}`}
                        onClick={() => handleSaveScene(activeScene)}
                        disabled={isSaved(activeScene.id)}
                      >
                        <Heart 
                          size={20} 
                          fill={isSaved(activeScene.id) ? 'currentColor' : 'none'}
                        />
                        {isSaved(activeScene.id) ? 'Saved' : 'Save for Later'}
                      </button>
                      
                      <button className="btn btn-primary">
                        Book Now
                      </button>
                    </div>
                  </div>
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
                  src={getSceneImageUrl(scene.image) || '/placeholder-scene.jpg'} 
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
