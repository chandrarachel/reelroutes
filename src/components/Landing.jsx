import { Plane, User, Users, Menu, Wifi, Moon, Tv, ArrowRight, Utensils } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Landing.css';

import landingBg from '../assets/landingBg.png';

import cathayLogo from '../assets/cathayLogoWhite.png';

const Landing = () => {
  const navigate = useNavigate();
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="landing-page" style={{ backgroundImage: `url(${landingBg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      {/* Top Navigation */}
        <div className="top-nav">
          <div className="nav-left">
            <button className="nav-btn menu-btn">
              <span>Menu</span>
            </button>
            <button className="nav-btn time-btn">
              <Plane size={16} />
              <span>14h 25min</span>
            </button>
          </div>
          <div className="cathay-logo center-logo">
            <img src={cathayLogo} alt="Cathay Pacific Logo" className=''/>
          </div>
          <div className="nav-controls">
            <button className="control-btn"><User size={18} /></button>
            <button className="control-btn"><Moon size={18} /></button>
            <button className="control-btn active"><Wifi size={18} /></button>
            <button className="control-btn" onClick={() => navigate('/passenger')}><Tv size={18} /></button>
          </div>
        </div>

      {/* Main Content */}
      <div className="landing-hero">
        <div style={{ marginTop: '150px'}}>
          <p className="journey-text">Enjoy your journey</p>
          <h1 className="destination-title">Hong Kong</h1>
          {/* Centered Explore Map Button */}
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <button className="explore-btn" onClick={() => setShowOptions(!showOptions)}>
              <span>Explore map</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* Add spacing between explore button and flight timeline */}
        <div style={{ height: '120px' }}></div>

        {/* Flight Timeline */}
        <div className="flight-timeline" style={{ marginTop: '180px', maxWidth: '1700px', width: '90%' }}>
          <div className="timeline-start">
            <span className="location">Indonesia</span>
            <span className="time">Departure 8 min ago</span>
          </div>
          <div className="timeline-track">
            <div className="timeline-progress"></div>
            <Plane className="timeline-plane" size={24} style={{ transform: 'rotate(45deg)' }} />
            <div className="milestone utensils"><Utensils size={16} /></div>
            <div className="milestone wifi"><Wifi size={16} /></div>
            <div className="milestone moon"><Moon size={16} /></div>
            <div className="milestone tv"><Tv size={16} /></div>
          </div>
          <div className="timeline-end">
            <span className="location">Hong Kong</span>
            <span className="time">Arriving in 12 h 22 min</span>
          </div>
        </div>

        <button className="edit-timeline-btn">Edit Timeline</button>
      </div>

      {/* Options Modal */}
      {showOptions && (
        <div className="options-modal" onClick={() => setShowOptions(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Select Your Experience</h2>
            <div className="modal-options">
              <button 
                className="modal-option passenger-option"
                onClick={() => navigate('/passenger')}
              >
                <User size={48} />
                <h3>Passenger</h3>
                <p>Watch movies and save travel experiences</p>
              </button>

              <button 
                className="modal-option crew-option"
                onClick={() => navigate('/crew')}
              >
                <Users size={48} />
                <h3>Crew Dashboard</h3>
                <p>View passenger preferences and provide service</p>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Landing;
