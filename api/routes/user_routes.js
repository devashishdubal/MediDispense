const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/user");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Hello World2!");
});

router.post("/register", (req, res) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        // const dateOfBirth = req.body.dateOfBirth;
        const newUser = new User({
            name: name,
            email: email,
            password: password // Make sure to hash the password before saving
            // dateOfBirth: req.body.dateOfBirth // Date format: year, month (0-indexed), day
        });
        newUser.save().then(user => console.log('User saved:', user))
        .catch(error => console.error('Error saving user:', error));

        res.send("User created!");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error creating user");
    }
});

router.post("/login", (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        User.findOne({ email: email }).then(user => {
            if (!user) {
                res.status(401).send("User not found");
            } else if (user.password !== password) {
                res.status(401).send("Invalid password");
            } else {
                res.status(200).send("User logged in!");
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error logging in");
    }
});

router.get('/getall', async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await User.find();

        if (users.length > 0) {
            res.status(200).json(users);
        } else {
            res.status(404).json({ message: 'No users found' });
        }
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Failed to fetch users' });
    }
});

module.exports = router;