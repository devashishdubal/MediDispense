const express = require('express');
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/user_routes');
const doctorRoutes = require('./routes/doctor_routes');
const appointmentRoutes = require('./routes/appointment_routes');
const app = express();
const port = 8000;
const corsOptions = {
    origin: 'http://localhost:3000',  // Specify the frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed methods
    allowedHeaders: ['Content-Type'],  // Allowed headers
    credentials: true,  // Allow cookies to be sent
};

app.use(cors(corsOptions));

app.use(express.json());
app.use("/users", userRoutes);
app.use("/doctors", doctorRoutes);
app.use("/appointments", appointmentRoutes);

mongoose.connect(process.env.mongo_url).then(() => {
    console.log('Connected to MongoDB');
})

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`API listening on port ${port}`);
});
