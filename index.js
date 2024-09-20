const express = require('express');
const connectDB = require('./config/db');
const inventoryRoutes = require('./routes/inventoryRoutes');
const cors = require('cors'); // Import the CORS package
require('dotenv').config();

const app = express();
connectDB();

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON bodies

// Use inventory routes
app.use('/inventory', inventoryRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
