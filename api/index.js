// index.js, imports
const express = require('express');
const mongoose = require('mongoose');
const Gift = require('./models/gifts.model'); // Ensure correct path
const giftRoute = require('./routes/gift.route')
require('dotenv').config();
const app = express();
const cors = require('cors'); // whenver  code works in node terminal but
// not in the live server browser do npm install cors


// middleware
app.use(cors())
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({extended: false}));// Middleware to parse forms 


//routes for functions such as get,put,post
app.use("/api/gifts", giftRoute);


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
