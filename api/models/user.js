const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date
        // required: true,
    }
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
