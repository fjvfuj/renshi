const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/hr_system';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api', require('./routes/index'));

app.get('/', (req, res) => {
  res.json({ 
    name: 'HR Management System API', 
    version: '1.0.0',
    status: 'running'
  });
});

app.listen(PORT, () => {
  console.log(`HR System Backend running on port ${PORT}`);
});

module.exports = app;
