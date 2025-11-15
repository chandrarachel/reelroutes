import { Plane, User, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <div className="landing-content">
        <div className="landing-header">
          <Plane size={64} className="logo-icon" />
          {/* <img src={require("../assets/reelRoutesWhiteLogo.svg")} alt="ReelRoutes Logo" className="logo-icon" /> */}
          <h1>ReelRoutes</h1>
          <p className="tagline">Turn Every Scene Into a Journey</p>
        </div>
        <div className="landing-options">
          <button 
            className="option-card passenger-option"
            onClick={() => navigate('/passenger')}
          >
            <User size={48} />
            <h2>Passenger</h2>
            <p>Watch movies and save travel experiences</p>
          </button>

          <button 
            className="option-card crew-option"
            onClick={() => navigate('/crew')}
          >
            <Users size={48} />
            <h2>Crew Dashboard</h2>
            <p>View passenger preferences and provide service</p>
          </button>
        </div>

        <div className="landing-footer">
          <p>Cathay Hackathon 2025 • Team GoBeyond</p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
