# ReelRoutes - Cathay Hackathon 2025

## 🎬 Turn Every Scene Into a Journey

ReelRoutes reimagines inflight entertainment by transforming passive movie-watching into actionable travel experiences. Passengers can save bookable moments (landmarks, food, culture) from movies they watch, which automatically sync to the Cathay App upon landing.

## 🚀 Features

### Passenger Interface

- **Interactive Movie Player**: Watch movies with context-aware scene overlays
- **Bookable Moments**: Save experiences directly from movie scenes
- **Preference Management**: Set dietary requirements, service preferences, and language
- **Saved Collection**: View and manage all saved experiences
- **Asia Miles Integration**: Book experiences with cash or Asia Miles

### Crew Dashboard

- **Passenger Overview**: View all passengers in your section
- **Silent Preferences**: Access passenger needs without asking
- **Priority Alerts**: See who needs special attention
- **Service Tracking**: Mark passengers as served
- **Multilingual Support**: View language preferences

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Routing**: React Router v6
- **Styling**: Custom CSS with Cathay Pacific branding
- **Icons**: Lucide React
- **Storage**: Supabase (for scene images)
- **Backend API**: FastAPI/Django (separate repo)

## 📦 Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your Supabase credentials

# Run development server
npm run dev

# Build for production
npm run build
```

## 🔧 Environment Variables

Create a `.env` file with:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_BASE_URL=http://localhost:8000/api
```

## 🗂️ Project Structure

```
reelroutes/
├── src/
│   ├── components/
│   │   ├── MoviePlayer.jsx       # Interactive video player
│   │   ├── PassengerHome.jsx     # Main passenger dashboard
│   │   ├── PreferencePanel.jsx   # Service & dietary preferences
│   │   ├── SavedScenes.jsx       # Saved experiences
│   │   └── CrewDashboard.jsx     # Crew interface
│   ├── lib/
│   │   ├── api.js                # Backend API integration
│   │   └── supabase.js           # Supabase client
│   ├── App.jsx                   # Main app with routing
│   └── index.css                 # Global styles
├── .env                          # Environment variables
└── package.json
```

## 🌐 Routes

- `/` or `/passenger` - Passenger interface (home)
- `/crew` - Crew dashboard

## 🎨 Design System

### Colors

- **Cathay Green**: `#007e3a`
- **Dark Green**: `#005a2b`
- **Light Green**: `#e8f5e9`
- **Gold**: `#c9a961`

## 🔗 Backend API Endpoints

The frontend expects these endpoints:

### Auth

- `POST /auth/scan` - QR authentication
- `GET /auth/session` - Get session

### Preferences

- `GET /preferences/:userId`
- `PUT /preferences/:userId`
- `POST /preferences/:userId/meals`
- `POST /preferences/:userId/service`

### Transactions

- `GET /transactions/:userId`
- `POST /transactions/save`
- `GET /transactions/:userId/saved-scenes`
- `POST /transactions/:userId/sync`

### Scenes

- `GET /scenes/:sceneId`
- `GET /scenes/movie/:movieId`
- `GET /scenes/search`

### Crew

- `GET /crew/passengers/:flightId`
- `GET /crew/passenger/:passengerId`
- `PUT /crew/passenger/:passengerId/status`

## 🏆 Hackathon Notes

Currently uses mock data. In production, connect to backend APIs.

### Supabase Setup

1. Create Supabase project
2. Create `scene-images` bucket
3. Upload screenshots to `scenes/` folder
4. Make bucket public

## 👥 Team GoBeyond

Built for Cathay Hackathon 2025

---

**Made with ❤️ for Cathay Pacific**
