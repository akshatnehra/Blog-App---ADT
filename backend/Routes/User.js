const express = require('express');
const router = express.Router();

// Importing controllers
const { login, signup } = require('../Controllers/User');

// User Routes
router.post('/signup', signup);
router.post('/login', login);

module.exports = router;