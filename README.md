# AntiTheft Backend

## Deploy to Railway

1. Create account on Railway.app
2. Click "New Project" → "Deploy from GitHub"
3. Or upload these files manually
4. Railway will auto-detect Node.js and deploy

## Files:
- server.js: Backend API
- package.json: Dependencies
- public/index.html: Website dashboard

## Endpoints:
- GET  / - Website dashboard
- POST /api/register - Register user
- POST /api/login - Login
- POST /api/location - Send location
- POST /api/alert - Send alert with photo
- POST /api/device - Send device info
- GET  /api/locations?email=xxx - Get locations
- GET  /api/alerts?email=xxx - Get alerts
- GET  /api/photos?email=xxx - Get photos
- GET  /api/devices?email=xxx - Get devices