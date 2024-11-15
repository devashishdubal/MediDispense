const express = require('express');
const Appointment = require('../models/appointment'); // Adjust the path as needed
const Doctor = require('../models/doctor');
const router = express.Router();
const mongoose = require('mongoose');

router.post('/create', async (req, res) => {
    try {
        const { doctorName, userId, appointmentDate,  appointmentStart, appointmentEnd } = req.body;
        const doctor = await Doctor.findOne({ name: doctorName });
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        const appointments = await Appointment.find({ doctorId: doctor._id, appointmentDate: appointmentDate, appointmentStart: appointmentStart,appointmentEnd: appointmentEnd });
        if (appointments.length > 0) {
            return res.status(400).json({message:'Timeslot already booked'});
        }
        const d = new Date(appointmentDate);
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const day = d.getDay();
        if (doctor.availability.indexOf(days[day]) === -1) {
            return res.status(400).json({message: 'Doctor is not available on this day'});
        }
        const notes = "";
        const status = "Scheduled";
        // Create a new Appointment instance
        const newAppointment = new Appointment({
            doctorId: doctor._id,
            patientId: userId,
            appointmentDate: appointmentDate,
            appointmentStart:appointmentStart,
            appointmentEnd: appointmentEnd,
            status: status,
            notes: notes,
        });

        // Save the appointment to MongoDB
        await newAppointment.save();
        
        res.status(201).send('Appointment created successfully');
    } catch (error) {
        console.error('Error creating appointment:', error);
        res.status(500).send('Failed to create appointment');
    }
});
router.get('/getall', async (req, res) => {
    try {
        // Fetch all appointments and populate doctor and patient details
        const appointments = await Appointment.find()
            .populate('doctorId', 'name specialization') // Populate specific doctor fields
            .populate('patientId', 'name email');        // Populate specific patient fields

        res.status(200).json(appointments);
    } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ message: 'Failed to fetch appointments' });
    }
});

router.get('/get/:userId', async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.params.userId);

        // Fetch all appointments for the user (patient)
        const appointments = await Appointment.find({ patientId: userId })
            .populate('doctorId', 'name specialization')  // Populate doctor details (name, specialization)

            
        if (appointments.length > 0) {
            res.status(200).json(appointments);
        } else {
            res.status(404).json({ message: 'No appointments found for this user' });
        }
    } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ message: 'Failed to fetch appointments' });
    }
});

router.delete('/deleteall', async (req, res) => {
    try {
        // Delete all appointments from the database
        const result = await Appointment.deleteMany({});

        if (result.deletedCount > 0) {
            res.status(200).json({ message: `${result.deletedCount} appointments deleted successfully` });
        } else {
            res.status(404).json({ message: 'No appointments found to delete' });
        }
    } catch (error) {
        console.error('Error deleting appointments:', error);
        res.status(500).json({ message: 'Failed to delete appointments' });
    }
});


module.exports = router;
