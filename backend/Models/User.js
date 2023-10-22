const mongoose = require('mongoose');

// Create a schema
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type:String,
        required: true
    },
    password: {
        type:String,
        required: true
    },
    registrationDate: {
        type: Date,
        default: Date.now
    },
    blogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    }]
});

const User = mongoose.model('User', UserSchema);
module.exports = User;