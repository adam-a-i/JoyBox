// index.js
const express = require('express');
const mongoose = require('mongoose');
const Gift = require('./models/gifts.model'); // Ensure correct path
require('dotenv').config();
const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

app.get('/', (req, res) => { 
    res.send('Welcome to the Gifts API!'); // Updated response message
});

app.get('/api/gifts', async (req,res) => { // gets all gifts
    try {
        const products = await Gift.find({})
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

app.get('/api/gifts/:id', async (req,res) => { //gets gift w specific id
    try {
        const id = req.params.id;
        const product = await Gift.findById(id)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

app.post('/api/gifts', async (req, res) => { // add gift to database user 
    try {
        const gift = await Gift.create(req.body); // Create a new gift document
        res.status(200).json(gift); // Respond with the created gift
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle errors
    }
});

//update a gift
app.put('/api/gifts/:id', async (req,res) => {
    try {
        const id  = req.params.id;
        const updated  = await Gift.findByIdAndUpdate(id, req.body);
        if(!updated){
            return res.status(404).json({message: "product not found"})
        }

        const updatedProduct = await Gift.findById(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}) 

app.delete('/api/gifts/:id' async (req,res) => { 
    
})

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('CONNECTED to MongoDB');
        app.listen(5000, () => {
            console.log('Server is running on port 5000');
        });
    })
    .catch((error) => {
        console.error('Connection error:', error.message); // Log connection error
    });
