const express = require("express");
const mongoose = require("mongoose");
const Doctor = require("../models/doctor");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Hello World2!");
});

router.post("/register", async (req, res) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const phoneNumber = req.body.phoneNumber;
        const specialization = req.body.specialization;
        const availability = req.body.availability;
        // const dateOfBirth = req.body.dateOfBirth;
        const newDoctor = new Doctor({
            name: name,
            email: email,
            phoneNumber: phoneNumber,
            specialization: specialization,
            availability: availability
        });
        newDoctor.save().then(doctor => console.log('Doctor saved:'))
        .catch(error => console.error('Error saving doctor:', error));

        res.send("Doctor created!");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error creating Doctor");
    }
});

router.get("/getall", async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.status(200).json(doctors);
    } catch (error) {
        console.error('Error fetching doctors:', error);
        res.status(500).json({ message: 'Failed to fetch doctors' });
    }
});

router.delete('/deleteall', async (req, res) => {
    try {
        const result = await Doctor.deleteMany({}); // Delete all doctors
        res.status(200).json({
            message: 'All doctors have been deleted successfully.',
            deletedCount: result.deletedCount, // Number of documents deleted
        });
    } catch (error) {
        console.error('Error deleting doctors:', error);
        res.status(500).json({
            message: 'Failed to delete doctors.',
            error: error.message,
        });
    }
});
module.exports = router;