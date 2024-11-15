const mongoose = require('mongoose');

// Define the Appointment schema
const appointmentSchema = new mongoose.Schema({
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true,
    },
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    },
    appointmentDate: {
        type: Date,
        required: true,
    },
    appointmentStart: {
        type: Number,
        required: true,
    },
    appointmentEnd: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['Scheduled', 'Completed'],
        default: 'Scheduled',
    },
    notes: {
        type: String,
        trim: true,
    },
});

// Create the Appointment model
const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
