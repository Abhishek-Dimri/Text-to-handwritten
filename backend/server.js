const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const textRoutes = require('./routes/textRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files (images)
app.use('/images', express.static('images'));  // Add this line to serve static files from the "images" folder


// MongoDB connection
mongoose.connect('mongodb://localhost:27017/myDatabase').then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log(err));

// Routes
app.use('/api/text', textRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
