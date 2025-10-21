const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));

const registerDevice = require('./api/device/register');
const photoUpload = require('./api/photo/upload');
const testRoute = require('./api/test');

app.post('/api/device/register', registerDevice);
app.post('/api/photo/upload', photoUpload);
app.get('/api/test', testRoute);
app.get('/', (req, res) => res.json({ message: 'AntiTheft Backend API' }));

app.listen(PORT, () => console.log(`Server on port ${PORT}`));
