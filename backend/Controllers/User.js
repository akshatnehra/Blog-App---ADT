const User = require('../Models/User');
const bcrypt = require('bcrypt');

// Signup
exports.signup = async (req, res) => {
    try {
        // Get the user input
        const { username, email, password } = req.body;

        // Check if all fields are entered
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please enter all fields'
            });
        }

        // Check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            });
        }

        // Encrypt the password
        const salt = await bcrypt.genSalt(10);

        // Create a new user
        const newUser = await User.create({
            username,
            email,
            password: await bcrypt.hash(password, salt),
            registrationDate: Date.now(),
            blogs: []
        });

        // Save the user in database
        await newUser.save();

        // Return the response
        res.status(200).json({
            success: true,
            message: 'User created successfully',
            data: newUser
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

// Login
exports.login = async (req, res) => {
    try {
        // Get the user input
        const { email, password } = req.body;

        // Check if all fields are entered
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please enter all fields'
            });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User does not exists'
            });
        }

        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);

        // If password is incorrect
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Remove the password from the response
        user.password = undefined;

        // Return the response
        res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            data: user
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}