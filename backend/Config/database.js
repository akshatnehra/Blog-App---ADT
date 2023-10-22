const mongoose = require('mongoose');

// Use dotenv to read .env vars into Node
require('dotenv').config();

// Connect to MongoDB
connectMongoDb = () => {
    // Connect to MongoDB
    mongoose.connect(process.env.DATABASE_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Connected to MongoDB...');
    })
    .catch((err) => {
        console.log(err);

        // Exit process with failure
        process.exit(1);
    });
}

module.exports = { connectMongoDb };