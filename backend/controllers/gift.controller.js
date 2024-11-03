
const Gift = require("../models/gifts.model.js");

const getAllUsers = async (req,res) =>{// gets all users from database
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

const addnewUser = async (req,res) => {
    try {
        const {username, gifts} = req.body;
        if (!username || !Array.isArray(gifts)) {
            return res.status(400).json({ message: "Username and gifts array are required." });
        }

        // Create a new Gift document with the provided data
        const newUser = new Gift({
            username: username,
            gifts: gifts.map(gift => ({ giftName: gift.giftName, status: gift.status ?? true })) // default status to true
        });

        // Save the document to the database
        await newUser.save();
        // Send a success response
        res.status(201).json({ message: "User added successfully", user: newUser });
    } catch (error) {
        console.error("Error adding new user:", error);
        res.status(500).json({ message: "Failed to add user" });
    }
}

const addGift = async (req, res) => { // add gift to database user 
    try {
        const userId = req.params.id;
        const newGift = req.body;
        const updatedUser = await Gift.findByIdAndUpdate(
            userId,
            { $push: { gifts: newGift } }, // Add the new gift to the gifts array
            { new: true } // Return the updated user document
        );
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(updatedUser); // Respond with the created gift
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
    addnewUser,
    getAllUsers,
    getUser,
    getSingleGift,
    addGift,
    updateGiftStatus
};