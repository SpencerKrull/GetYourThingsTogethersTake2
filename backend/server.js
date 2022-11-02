// Dependencies
const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialization
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false })) // handle data from url
app.use(bodyParser.json()) 

// Routes
app.get("/", (req, res) => {
    res.send("Home")
});

// MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
})
.catch((err) => console.log(err))