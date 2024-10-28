
const Gift = require("../models/gifts.model.js");

const getGifts =  async (req,res) => { // gets all gifts
    try {
        const products = await Gift.find({})
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};



const getSingleGift = async (req,res) => { //gets gift w specific id
    try {
        const id = req.params.id;
        const product = await Gift.findById(id)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};



const addGift = async (req, res) => { // add gift to database user 
    try {
        const gift = await Gift.create(req.body); // Create a new gift document
        res.status(200).json(gift); // Respond with the created gift
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle errors
    }
};


const updateGiftStatus = async (req,res) => { //update gift status to false after reservation 
    try {
        const id  = req.params.id;
        const updated  = await Gift.findByIdAndUpdate(id, {
            status: false
        }, {new: true}); // new to update the database
        if(!updated){
            return res.status(404).json({message: "product not found"})
        }

        const updatedProduct = await Gift.findById(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
};

module.exports = { 
    getGifts,
    getSingleGift,
    addGift,
    updateGiftStatus
};