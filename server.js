const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.static('public'));

// Database (in-memory for now - replace with MongoDB/PostgreSQL)
let users = [];
let locations = [];
let alerts = [];
let devices = [];
let photos = [];

// Routes

// Serve website
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Register
app.post('/api/register', (req, res) => {
    const { email, password, pin } = req.body;
    
    const existing = users.find(u => u.email === email);
    if (existing) {
        return res.status(400).json({ success: false, message: 'User exists' });
    }
    
    users.push({ email, password, pin, created: new Date() });
    console.log(`✅ New user registered: ${email}`);
    
    res.json({ success: true, message: 'User registered' });
});

// Login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        console.log(`✅ User logged in: ${email}`);
        res.json({ success: true, message: 'Login successful' });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

// Send Location
app.post('/api/location', (req, res) => {
    const { email, latitude, longitude, timestamp } = req.body;
    
    locations.push({ email, latitude, longitude, timestamp: timestamp || Date.now() });
    console.log(`📍 Location received from ${email}: ${latitude}, ${longitude}`);
    
    res.json({ success: true, message: 'Location saved' });
});

// Get Locations
app.get('/api/locations', (req, res) => {
    const { email } = req.query;
    const userLocations = locations.filter(l => l.email === email);
    res.json(userLocations);
});

// Send Intruder Alert
app.post('/api/alert', (req, res) => {
    const { email, photo, latitude, longitude, timestamp, alert_type } = req.body;
    
    const alert = {
        email,
        photo,
        latitude,
        longitude,
        timestamp: timestamp || Date.now(),
        alert_type: alert_type || 'wrong_pin_attempt'
    };
    
    alerts.push(alert);
    photos.push(alert);
    
    console.log(`🚨 ALERT from ${email} at ${latitude}, ${longitude}`);
    console.log(`📸 Photo size: ${photo ? photo.length : 0} bytes`);
    
    res.json({ success: true, message: 'Alert received' });
});

// Get Alerts
app.get('/api/alerts', (req, res) => {
    const { email } = req.query;
    const userAlerts = alerts.filter(a => a.email === email);
    res.json(userAlerts);
});

// Get Photos
app.get('/api/photos', (req, res) => {
    const { email } = req.query;
    const userPhotos = photos.filter(p => p.email === email);
    res.json(userPhotos);
});

// Send Device Info
app.post('/api/device', (req, res) => {
    const { email, device_model, device_id, timestamp } = req.body;
    
    const existing = devices.findIndex(d => d.email === email && d.device_id === device_id);
    
    if (existing >= 0) {
        devices[existing] = { email, device_model, device_id, timestamp: timestamp || Date.now(), online: true };
    } else {
        devices.push({ email, device_model, device_id, timestamp: timestamp || Date.now(), online: true });
    }
    
    console.log(`📱 Device info from ${email}: ${device_model}`);
    
    res.json({ success: true, message: 'Device info saved' });
});

// Get Devices
app.get('/api/devices', (req, res) => {
    const { email } = req.query;
    const userDevices = devices.filter(d => d.email === email);
    res.json(userDevices);
});

// Stats
app.get('/api/stats', (req, res) => {
    res.json({
        total_users: users.length,
        total_locations: locations.length,
        total_alerts: alerts.length,
        total_devices: devices.length
    });
});

app.listen(PORT, () => {
    console.log(`🚀 AntiTheft Backend running on port ${PORT}`);
    console.log(`📊 Dashboard: http://localhost:${PORT}`);
});