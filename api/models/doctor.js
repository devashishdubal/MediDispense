const mongoose = require('mongoose');

// Define the Doctor schema
const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    specialization: {
        type: String,
        required: true,
    },
    availability: {
        type: [String], // e.g., ["Monday", "Wednesday", "Friday"]
        required: true,
    }
});

// Create the Doctor model
const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
