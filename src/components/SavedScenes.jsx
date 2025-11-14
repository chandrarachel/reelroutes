import { useState } from 'react';
import { Heart, MapPin, Clock, DollarSign, Calendar, X } from 'lucide-react';
import { getSceneImageUrl } from '../lib/supabase';
import { transactionAPI } from '../lib/api';
import './SavedScenes.css';

const SavedScenes = ({ userId }) => {
  // Mock saved scenes - in production, this would come from transactionAPI
  const [savedScenes, setSavedScenes] = useState([
    {
      id: 'scene-1',
      title: 'Avenue of the Stars',
      location: 'Hong Kong',
      type: 'landmark',
      description: 'Iconic waterfront promenade with stunning harbor views',
      image: 'scenes/avenue-stars-1.jpg',
      price: 'HKD 2,500',
      asiaMiles: 15000,
      savedAt: '2025-11-14T10:30:00',
      movieTitle: 'In the Mood for Love',
    },
    {
      id: 'scene-2',
      title: 'Authentic Dim Sum',
      location: 'Tim Ho Wan, Hong Kong',
      type: 'food',
      description: 'Michelin-starred dim sum restaurant',
      image: 'scenes/dimsum-1.jpg',
      price: 'HKD 150',
      asiaMiles: 1000,
      savedAt: '2025-11-14T11:45:00',
      movieTitle: 'Crazy Rich Asians',
    },
    {
      id: 'scene-3',
      title: 'Victoria Peak',
      location: 'Hong Kong',
      type: 'landmark',
      description: 'Panoramic views of Hong Kong skyline',
      image: 'scenes/victoria-peak-1.jpg',
      price: 'HKD 3,200',
      asiaMiles: 20000,
      savedAt: '2025-11-14T14:20:00',
      movieTitle: 'In the Mood for Love',
    },
  ]);

  const [filter, setFilter] = useState('all'); // all, food, landmark, culture

  const handleRemoveScene = async (sceneId) => {
    // In production, call API to remove scene
    setSavedScenes(savedScenes.filter((s) => s.id !== sceneId));
  };

  const handleSyncToApp = async () => {
    try {
      await transactionAPI.syncOnLanding(userId);
      alert('Your saved experiences have been synced to the Cathay App!');
    } catch (error) {
      console.error('Error syncing:', error);
      alert('Failed to sync. Please try again.');
    }
  };

  const filteredScenes = savedScenes.filter((scene) => {
    if (filter === 'all') return true;
    return scene.type === filter;
  });

  const totalAsiaMiles = savedScenes.reduce((sum, scene) => sum + scene.asiaMiles, 0);

  return (
    <div className="saved-scenes">
      <div className="saved-header">
        <div>
          <h1>
            <Heart fill="var(--cathay-green)" color="var(--cathay-green)" />
            Your Saved Experiences
          </h1>
          <p>
            {savedScenes.length} experience{savedScenes.length !== 1 ? 's' : ''} saved •{' '}
            {totalAsiaMiles.toLocaleString()} total Asia Miles
          </p>
        </div>

        {savedScenes.length > 0 && (
          <button className="btn btn-primary" onClick={handleSyncToApp}>
            <Calendar size={20} />
            Sync to Cathay App
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="filter-tabs">
        <button
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          All ({savedScenes.length})
        </button>
        <button
          className={filter === 'food' ? 'active' : ''}
          onClick={() => setFilter('food')}
        >
          Food ({savedScenes.filter((s) => s.type === 'food').length})
        </button>
        <button
          className={filter === 'landmark' ? 'active' : ''}
          onClick={() => setFilter('landmark')}
        >
          Landmarks ({savedScenes.filter((s) => s.type === 'landmark').length})
        </button>
        <button
          className={filter === 'culture' ? 'active' : ''}
          onClick={() => setFilter('culture')}
        >
          Culture ({savedScenes.filter((s) => s.type === 'culture').length})
        </button>
      </div>

      {/* Scenes Grid */}
      {filteredScenes.length > 0 ? (
        <div className="scenes-grid">
          {filteredScenes.map((scene) => (
            <div key={scene.id} className="scene-card">
              <button
                className="remove-button"
                onClick={() => handleRemoveScene(scene.id)}
                title="Remove from saved"
              >
                <X size={18} />
              </button>

              <div className="scene-image">
                <img
                  src={getSceneImageUrl(scene.image) || '/placeholder-scene.jpg'}
                  alt={scene.title}
                />
                <span className="scene-badge">{scene.type}</span>
              </div>

              <div className="scene-content">
                <h3>{scene.title}</h3>

                <div className="scene-location">
                  <MapPin size={16} />
                  <span>{scene.location}</span>
                </div>

                <p className="scene-description">{scene.description}</p>

                <div className="scene-meta">
                  <div className="movie-source">
                    <Clock size={14} />
                    <span>From "{scene.movieTitle}"</span>
                  </div>
                </div>

                <div className="scene-pricing">
                  <div className="price-main">
                    <DollarSign size={16} />
                    <span>{scene.price}</span>
                  </div>
                  <div className="price-miles">{scene.asiaMiles.toLocaleString()} miles</div>
                </div>

                <button className="btn btn-primary book-button">Book Now</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <Heart size={64} strokeWidth={1} />
          <h3>No saved experiences yet</h3>
          <p>
            Tap the heart icon on scenes while watching movies to save experiences
            you'd like to explore.
          </p>
        </div>
      )}

      {/* Sync Info */}
      {savedScenes.length > 0 && (
        <div className="sync-info">
          <h4>✈️ What happens when you land?</h4>
          <ul>
            <li>All your saved experiences sync to the Cathay App</li>
            <li>Get personalized recommendations and itineraries</li>
            <li>Book with Asia Miles or cash directly from the app</li>
            <li>Receive special partner offers for saved locations</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SavedScenes;
