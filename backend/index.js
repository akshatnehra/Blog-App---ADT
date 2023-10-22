// Importing the required modules
const express = require('express');
const app = express();

// Use dotenv to read .env vars into Node
require('dotenv').config();

// Body Parser Middleware
app.use(express.json());

// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
    }
);

// Importing routes
const blogRoutes = require('./Routes/Blog');
const commentRoutes = require('./Routes/Comment');
const userRoutes = require('./Routes/User');

// Using routes
app.use('/api/v1/blog', blogRoutes);
app.use('/api/v1/comment', commentRoutes);
app.use('/api/v1/user', userRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to my blog');
});

// Connect to MongoDB
const { connectMongoDb } = require('./Config/database');
connectMongoDb();