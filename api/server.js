const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();

// CORS configuration
app.use(cors({
  origin: 'http://localhost:5173', // Your React dev server
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(cookieParser());

// FIXED: Static file serving for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const route = require('./routers/routes');
app.use('/', route);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// Sart server
const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {
    res.send("🚀 API is Running");
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});

module.exports = app;
