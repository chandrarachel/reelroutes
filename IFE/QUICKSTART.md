# Quick Start Guide - ReelRoutes

## 🚀 Getting Started in 3 Minutes

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

```bash
# Copy the example file
cp .env.example .env

# Edit .env with your credentials (optional for demo)
# For demo purposes, you can leave the default values
```

### 3. Run the Application

```bash
npm run dev
```

The app will open at `http://localhost:5173`

## 🎯 Demo Flow

### Option 1: Passenger Experience

1. Click "Passenger" on the landing page
2. Browse featured movies
3. Click any movie to watch
4. Wait for scene overlays to appear (at 4:05, 8:40, 14:50)
5. Click "Save for Later" on interesting scenes
6. Check the heart icon (top right) to see saved experiences
7. Click the gear icon to set preferences

### Option 2: Crew Dashboard

1. Click "Crew Dashboard" on the landing page
2. View the list of passengers
3. Click on a passenger to see their preferences
4. Filter by "Needs Attention" or "Sleeping"
5. Review dietary restrictions and service preferences
6. Mark passengers as served

## 📁 Project Overview

### Main Routes

- `/` - Landing page (choose passenger or crew)
- `/passenger` - Passenger interface
- `/crew` - Crew dashboard

### Key Features to Demo

#### Passenger Features:

✅ Interactive movie player with scene overlays
✅ Save experiences with one click
✅ Set dietary and service preferences
✅ View saved collection
✅ Asia Miles integration

#### Crew Features:

✅ Real-time passenger overview
✅ Silent preference system
✅ Priority alerts for special needs
✅ Language preferences
✅ Service tracking

## 🔧 Connecting to Backend

The frontend is ready to connect to your backend API. Update `.env`:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

Then uncomment the API calls in components and remove mock data.

## 🎨 Customization

### Change Mock Data

Edit these files to customize demo content:

- `src/components/PassengerHome.jsx` - Movie list
- `src/components/MoviePlayer.jsx` - Scene data
- `src/components/SavedScenes.jsx` - Saved scenes
- `src/components/CrewDashboard.jsx` - Passenger data

### Add Real Images

1. Set up Supabase bucket
2. Upload images to `scenes/` folder
3. Update image paths in mock data

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Kill the process on port 5173
lsof -ti:5173 | xargs kill -9

# Or use a different port
npm run dev -- --port 3000
```

### Missing Dependencies

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

### Supabase Errors

The app works without Supabase for demo purposes. Images will show placeholders.

## 📱 Mobile Testing

Test responsive design:

```bash
# Get your local IP
ifconfig | grep "inet "

# Access from mobile device
http://YOUR_IP:5173
```

## 🏆 Hackathon Tips

### For Presentation:

1. Start at landing page
2. Demo passenger flow first (more visual)
3. Show scene saving in action
4. Switch to crew dashboard
5. Highlight preference visibility

### Key Talking Points:

- **Revenue**: Scene bookings = new revenue stream
- **Loyalty**: Saved experiences = Asia Miles engagement
- **Service**: Silent preferences = better crew efficiency
- **Data**: User interests = valuable insights

## 📦 Building for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## 🎯 Next Steps

1. Connect to your backend API
2. Add real scene data from movies
3. Set up Supabase for image storage
4. Implement authentication
5. Add real-time messaging
6. Deploy to production

---

Happy hacking! 🚀
