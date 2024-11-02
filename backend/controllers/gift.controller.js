
const Gift = require("../models/gifts.model.js");

const getAllUsers = async (req,res) =>{
    try {
        const products = await Gift.find({});
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
const getUser =  async (req,res) => { // gets all gifts
    try {
        const userId = req.params.id;
        const products = await Gift.findById(userId);
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};



const getSingleGift = async (req,res) => { //gets gift w specific user and specific gift
    try {
        const id = req.params.id;
        const giftId= req.params.giftId;

        const product = await Gift.findOne(
            { _id: id, 'gifts._id': giftId }, // Match both ID and giftName
            { 'gifts.$': 1 } // Project to return only the matched gift
        );
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
        const id = req.params.id;
        const giftId= req.params.giftId;

        const Product = await Gift.findOneAndUpdate(
            { _id: id, 'gifts._id': giftId }, // Match both ID and giftName
            { $set: { 'gifts.$.status': false } }, // Update the status to false
            { new: true } //updates
        );
        if(!Product){
            return res.status(404).json({message: "product not found"})
        }

        res.status(200).json(Product);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
};

module.exports = { 
    getAllUsers,
    getUser,
    getSingleGift,
    addGift,
    updateGiftStatus
};