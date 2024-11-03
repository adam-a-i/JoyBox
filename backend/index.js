// index.js, imports
const express = require('express');
const mongoose = require('mongoose');
const Gift = require('./models/gifts.model.js'); // Ensure correct path
const giftRoute = require('./routes/gift.route');
const path = require('path'); // Import the path module
require('dotenv').config();
const app = express();
const cors = require('cors'); // whenver  code works in node terminal but
// not in the live server browser do npm install cors
// sometimes the DB is just slow asf and you have to wait for a bit and refresh

// middleware
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: false })); // Middleware to parse forms 

// routes for functions such as get, put, post
app.use("/api/gifts", giftRoute);

// Serve the HTML page
app.use(express.static(path.join(__dirname, '..', 'frontend')));

app.get('/', (req, res) => { 
    res.send('Welcome to the Gifts API!'); // Updated response message
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('CONNECTED to MongoDB');
        app.listen(5500, () => {
            console.log('Server is running on port 5500');
        });
    })
    .catch((error) => {
        console.error('Connection error:', error.message); // Log connection error
    });
