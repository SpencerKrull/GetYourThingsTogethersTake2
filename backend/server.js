// Dependencies
const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const user_route = require('./routes/user_route')
const entry_route = require('./routes/entry_route')
const contact_route = require('./routes/contact_route')
const error = require('./middleware/error_middleware')
const cookie = require('cookie-parser') // attaches cookies to tags
const path = require("path");

// Initialization
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(cookie());
app.use(express.urlencoded({ extended: false })); // handle data from url
app.use(bodyParser.json());
app.use(cors());
app.use(error);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/users", user_route)
app.use("/api/entries", entry_route)
app.use("/api/contact", contact_route)

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