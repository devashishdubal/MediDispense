const express = require('express');
const mongodb = require('mongodb');
const mongoose = require('mongoose');
require('dotenv').config();

const userRoutes = require('./routes/user_routes');
const app = express();
const port = 8000;
app.use(express.json());
app.use("/users", userRoutes);

mongoose.connect(process.env.mongo_url).then(() => {
    console.log('Connected to MongoDB');
})

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`API listening on port ${port}`);
});
