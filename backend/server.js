// Dependencies
const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const user_route = require('./routes/user_route')
const error = require('./middleware/error_middleware')
const cookie = require('cookie-parser') // attaches cookies to tags

// Initialization
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cookie());
app.use(express.urlencoded({ extended: false })); // handle data from url
app.use(bodyParser.json());
app.use("/api/users", user_route);
app.use(error);

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