# Deployment Guide - ReelRoutes

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)

Perfect for React apps with zero configuration.

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow prompts to connect your repo
```

Or use Vercel Dashboard:

1. Go to https://vercel.com
2. Import your GitHub repository
3. Vercel auto-detects Vite
4. Add environment variables in dashboard
5. Deploy!

### Option 2: Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build the app
npm run build

# Deploy
netlify deploy --prod
```

Or drag-and-drop in Netlify Dashboard:

1. Run `npm run build`
2. Drag `dist` folder to Netlify
3. Add environment variables
4. Done!

### Option 3: GitHub Pages

```bash
# Install gh-pages
npm install -D gh-pages

# Add to package.json scripts:
# "predeploy": "npm run build",
# "deploy": "gh-pages -d dist"

# Deploy
npm run deploy
```

### Option 4: Docker

```dockerfile
# Create Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```bash
# Build and run
docker build -t reelroutes .
docker run -p 8080:80 reelroutes
```

## 🔧 Environment Variables

Set these in your deployment platform:

```env
VITE_SUPABASE_URL=your_production_supabase_url
VITE_SUPABASE_ANON_KEY=your_production_key
VITE_API_BASE_URL=https://your-api.com/api
```

## 📱 Pre-Deployment Checklist

- [ ] Update `.env` with production values
- [ ] Test build locally: `npm run build && npm run preview`
- [ ] Check all API endpoints are working
- [ ] Verify Supabase bucket is public or has correct policies
- [ ] Test on mobile devices
- [ ] Check console for errors
- [ ] Verify all routes work
- [ ] Test crew and passenger flows

## 🎯 Production Optimizations

### 1. Image Optimization

```bash
# Install image optimization
npm install -D vite-plugin-image-optimizer

# Add to vite.config.js
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default {
  plugins: [
    ViteImageOptimizer()
  ]
}
```

### 2. Bundle Analysis

```bash
# Install bundle analyzer
npm install -D rollup-plugin-visualizer

# Add to vite.config.js
import { visualizer } from 'rollup-plugin-visualizer';

export default {
  plugins: [
    visualizer()
  ]
}
```

### 3. Performance Monitoring

Add to your deployment:

- Google Analytics
- Sentry for error tracking
- Performance monitoring

## 🔒 Security Checklist

- [ ] Supabase RLS policies configured
- [ ] API endpoints secured
- [ ] CORS properly configured
- [ ] Environment variables not exposed
- [ ] HTTPS enabled
- [ ] Content Security Policy set

## 🌐 Custom Domain

### Vercel

```bash
vercel domains add yourdomain.com
```

### Netlify

1. Go to Domain settings
2. Add custom domain
3. Update DNS records

## 📊 Analytics Setup

### Google Analytics

```javascript
// Add to index.html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🐛 Common Issues

### Build Fails

```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

### Environment Variables Not Working

- Ensure they start with `VITE_`
- Restart dev server after changes
- Check deployment platform settings

### Routes Not Working (404 on Refresh)

Add to `vercel.json`:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

Or `netlify.toml`:

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## 📈 Performance Tips

1. **Lazy Loading**: Already implemented with React Router
2. **Code Splitting**: Vite handles automatically
3. **CDN**: Vercel/Netlify provide global CDN
4. **Caching**: Configure in deployment platform
5. **Compression**: Enable gzip/brotli

## 🎉 Post-Deployment

1. Test all features in production
2. Monitor error logs
3. Check performance metrics
4. Share with team
5. Gather feedback

---

Good luck with your deployment! 🚀
