const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.static('public'));

const registerDevice = require('./api/device/register');
const photoUpload = require('./api/photo/upload');
const testRoute = require('./api/test');
const devicesApi = require('./api/devices');
const allPhotosApi = require('./api/all-photos');

app.post('/api/device/register', registerDevice);
app.post('/api/photo/upload', photoUpload);
app.get('/api/test', testRoute);
app.get('/api/devices', devicesApi);
app.get('/api/all-photos', allPhotosApi);
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

app.listen(PORT, () => console.log(`Server on port ${PORT}`));
