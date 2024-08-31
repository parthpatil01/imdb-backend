const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const celebrityRoute = require('./src/routes/celebrityRoute');
const genreRoute = require('./src/routes/genresRoute');
const authRouter = require('./src/routes/authRouter');
const topTenRouter = require('./src/routes/topTenrouter');
const exploringRouter = require('./src/routes/exploringRouter');

const app = express();

// Use CORS middleware
app.use(cors());

// Middleware to parse JSON
app.use(express.json()); 

// Preflight request handling for all routes
app.options('*', cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch((error) => console.log('Error connecting to MongoDB:', error));

// Define routes
app.use('/api', celebrityRoute);
app.use('/api', genreRoute);
app.use('/auth', authRouter);
app.use('/api', topTenRouter);
app.use('/api', exploringRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
