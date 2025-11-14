import { useState, useEffect } from 'react';
import { 
  User, 
  Bell, 
  Moon, 
  Utensils, 
  AlertCircle, 
  MessageCircle,
  Check,
  Clock,
  Globe
} from 'lucide-react';
import { crewAPI } from '../lib/api';
import './CrewDashboard.css';

const CrewDashboard = ({ flightId = 'CX123', crewSection = 'Business' }) => {
  const [passengers, setPassengers] = useState([]);
  const [selectedPassenger, setSelectedPassenger] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, needs-attention, sleeping

  // Mock data - in production, this would come from crewAPI
  useEffect(() => {
    const mockPassengers = [
      {
        id: 'P001',
        name: 'Sarah Chen',
        seat: '12A',
        status: 'awake',
        preferences: {
          wakeForMeals: true,
          sleepThroughService: false,
          dietaryRestrictions: ['Vegetarian', 'Gluten-Free'],
          languagePreference: 'Mandarin',
          specialAssistance: '',
          firstTimeFlyernote: '',
        },
        savedScenes: 3,
        messages: [],
        priority: 'normal',
      },
      {
        id: 'P002',
        name: 'John Smith',
        seat: '12B',
        status: 'sleeping',
        preferences: {
          wakeForMeals: true,
          sleepThroughService: false,
          dietaryRestrictions: [],
          languagePreference: 'English',
          specialAssistance: '',
          firstTimeFlyernote: '',
        },
        savedScenes: 5,
        messages: [],
        priority: 'normal',
      },
      {
        id: 'P003',
        name: 'Rina Wijaya',
        seat: '13A',
        status: 'awake',
        preferences: {
          wakeForMeals: false,
          sleepThroughService: true,
          dietaryRestrictions: ['Halal'],
          languagePreference: 'Indonesian',
          specialAssistance: 'First time flying - anxious about turbulence',
          firstTimeFlyernote: 'Please check in occasionally',
        },
        savedScenes: 1,
        messages: [
          { from: 'passenger', text: 'Could I get some water please?', time: '10:30' }
        ],
        priority: 'high',
      },
      {
        id: 'P004',
        name: 'Takeshi Yamamoto',
        seat: '13B',
        status: 'awake',
        preferences: {
          wakeForMeals: true,
          sleepThroughService: false,
          dietaryRestrictions: ['Seafood Allergy'],
          languagePreference: 'Japanese',
          specialAssistance: '',
          firstTimeFlyernote: '',
        },
        savedScenes: 7,
        messages: [],
        priority: 'normal',
      },
    ];

    setPassengers(mockPassengers);
    setLoading(false);
  }, [flightId]);

  const filteredPassengers = passengers.filter((p) => {
    if (filter === 'needs-attention') {
      return p.priority === 'high' || p.messages.length > 0;
    }
    if (filter === 'sleeping') {
      return p.status === 'sleeping';
    }
    return true;
  });

  const handlePassengerClick = (passenger) => {
    setSelectedPassenger(passenger);
  };

  const handleMarkServed = async (passengerId) => {
    try {
      await crewAPI.updatePassengerStatus(passengerId, 'served');
      setPassengers((prev) =>
        prev.map((p) =>
          p.id === passengerId ? { ...p, status: 'served' } : p
        )
      );
    } catch (error) {
      console.error('Error updating passenger status:', error);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return '#d32f2f';
      case 'normal':
        return 'var(--cathay-green)';
      default:
        return 'var(--text-secondary)';
    }
  };

  if (loading) {
    return (
      <div className="crew-dashboard loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="crew-dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Crew Dashboard</h1>
          <p>
            Flight {flightId} • {crewSection} Class • {passengers.length} Passengers
          </p>
        </div>

        <div className="filter-tabs">
          <button
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            All ({passengers.length})
          </button>
          <button
            className={filter === 'needs-attention' ? 'active' : ''}
            onClick={() => setFilter('needs-attention')}
          >
            <AlertCircle size={16} />
            Needs Attention (
            {passengers.filter((p) => p.priority === 'high' || p.messages.length > 0).length}
            )
          </button>
          <button
            className={filter === 'sleeping' ? 'active' : ''}
            onClick={() => setFilter('sleeping')}
          >
            <Moon size={16} />
            Sleeping ({passengers.filter((p) => p.status === 'sleeping').length})
          </button>
        </div>
      </div>

      <div className="dashboard-content">
        {/* Passenger List */}
        <div className="passenger-list">
          {filteredPassengers.map((passenger) => (
            <div
              key={passenger.id}
              className={`passenger-card ${
                selectedPassenger?.id === passenger.id ? 'selected' : ''
              } ${passenger.priority === 'high' ? 'priority-high' : ''}`}
              onClick={() => handlePassengerClick(passenger)}
            >
              <div className="passenger-header">
                <div className="passenger-info">
                  <User size={20} />
                  <div>
                    <h4>{passenger.name}</h4>
                    <span className="seat-number">Seat {passenger.seat}</span>
                  </div>
                </div>

                {passenger.messages.length > 0 && (
                  <div className="message-badge">
                    <MessageCircle size={16} />
                    <span>{passenger.messages.length}</span>
                  </div>
                )}
              </div>

              <div className="passenger-quick-info">
                {passenger.status === 'sleeping' && (
                  <div className="info-tag">
                    <Moon size={14} />
                    Sleeping
                    {passenger.preferences.wakeForMeals && (
                      <span className="sub-info">• Wake for meals</span>
                    )}
                  </div>
                )}

                {passenger.preferences.dietaryRestrictions.length > 0 && (
                  <div className="info-tag">
                    <Utensils size={14} />
                    {passenger.preferences.dietaryRestrictions.join(', ')}
                  </div>
                )}

                {passenger.preferences.languagePreference !== 'English' && (
                  <div className="info-tag">
                    <Globe size={14} />
                    {passenger.preferences.languagePreference}
                  </div>
                )}

                {passenger.preferences.specialAssistance && (
                  <div className="info-tag alert">
                    <AlertCircle size={14} />
                    Special assistance needed
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Passenger Details Panel */}
        {selectedPassenger && (
          <div className="passenger-details">
            <div className="details-header">
              <div>
                <h2>{selectedPassenger.name}</h2>
                <p className="seat-number">Seat {selectedPassenger.seat}</p>
              </div>
              <button
                className="btn btn-ghost"
                onClick={() => setSelectedPassenger(null)}
              >
                Close
              </button>
            </div>

            <div className="details-sections">
              {/* Service Preferences */}
              <div className="details-section">
                <h3>
                  <Bell size={18} />
                  Service Preferences
                </h3>
                <div className="preference-list">
                  <div className="preference-row">
                    <Moon size={16} />
                    <span>
                      {selectedPassenger.preferences.wakeForMeals
                        ? 'Wake for meals'
                        : 'Let sleep through meals'}
                    </span>
                  </div>
                  <div className="preference-row">
                    <Moon size={16} />
                    <span>
                      {selectedPassenger.preferences.sleepThroughService
                        ? 'Minimize interruptions'
                        : 'Normal service'}
                    </span>
                  </div>
                  <div className="preference-row">
                    <Globe size={16} />
                    <span>Preferred language: {selectedPassenger.preferences.languagePreference}</span>
                  </div>
                </div>
              </div>

              {/* Dietary Requirements */}
              {selectedPassenger.preferences.dietaryRestrictions.length > 0 && (
                <div className="details-section">
                  <h3>
                    <Utensils size={18} />
                    Dietary Requirements
                  </h3>
                  <div className="dietary-tags">
                    {selectedPassenger.preferences.dietaryRestrictions.map((diet) => (
                      <span key={diet} className="dietary-tag">
                        {diet}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Special Assistance */}
              {selectedPassenger.preferences.specialAssistance && (
                <div className="details-section alert-section">
                  <h3>
                    <AlertCircle size={18} />
                    Special Assistance
                  </h3>
                  <p className="assistance-note">
                    {selectedPassenger.preferences.specialAssistance}
                  </p>
                </div>
              )}

              {/* Messages */}
              {selectedPassenger.messages.length > 0 && (
                <div className="details-section">
                  <h3>
                    <MessageCircle size={18} />
                    Messages
                  </h3>
                  <div className="message-list">
                    {selectedPassenger.messages.map((msg, idx) => (
                      <div key={idx} className="message-item">
                        <div className="message-content">
                          <p>{msg.text}</p>
                          <span className="message-time">
                            <Clock size={12} />
                            {msg.time}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Travel Interests */}
              {selectedPassenger.savedScenes > 0 && (
                <div className="details-section">
                  <h3>
                    <Bell size={18} />
                    Travel Interests
                  </h3>
                  <p className="interest-note">
                    Passenger has saved {selectedPassenger.savedScenes} experiences from
                    ReelRoutes. Consider mentioning relevant destinations or offers.
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="details-actions">
                <button
                  className="btn btn-primary"
                  onClick={() => handleMarkServed(selectedPassenger.id)}
                >
                  <Check size={18} />
                  Mark as Served
                </button>
              </div>
            </div>
          </div>
        )}

        {!selectedPassenger && (
          <div className="no-selection">
            <User size={64} strokeWidth={1} />
            <p>Select a passenger to view details</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CrewDashboard;
