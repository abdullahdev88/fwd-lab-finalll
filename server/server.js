/**
 * Smart Library System - Backend Server
 * This is the main server file that initializes Express server,
 * connects to MongoDB, and sets up middleware and routes.
 */

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import book routes
const bookRoutes = require('./routes/bookRoutes');

// Initialize Express application
const app = express();

// ========================
// MIDDLEWARE CONFIGURATION
// ========================

// Enable CORS - allows frontend (React) to make requests to this backend
app.use(cors());

// Parse incoming JSON requests - converts request body to JavaScript object
app.use(express.json());

// ========================
// MONGODB CONNECTION
// ========================

// Connect to MongoDB using connection string from environment variables
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    // Connection successful
    console.log('✅ MongoDB Connected Successfully!');
})
.catch((err) => {
    // Connection failed - log error
    console.error('❌ MongoDB Connection Error:', err.message);
});

// ========================
// API ROUTES
// ========================

// Mount book routes at /api/books endpoint
app.use('/api/books', bookRoutes);

// Basic route to check if server is running
app.get('/', (req, res) => {
    res.json({ message: 'Smart Library System API is running!' });
});

// ========================
// START SERVER
// ========================

// Get port from environment variables or use default 5000
const PORT = process.env.PORT || 5000;

// Start listening for requests
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
