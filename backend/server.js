const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const notificationRoutes = require('./routes/notificationRoutes');
const { initSocketIo } = require('./config/socket'); // Import the socket setup

const app = express();
const server = http.createServer(app);
app.use(cors({
    origin: 'http://localhost:3001', // frontend URL
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));
// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', notificationRoutes);

// Initialize Socket.io
initSocketIo(server);

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
