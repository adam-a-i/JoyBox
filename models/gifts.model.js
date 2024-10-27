// models/gifts.model.js
const mongoose = require('mongoose');

const GiftSchema = new mongoose.Schema( // Ensure this is 'new mongoose.Schema'
    {
        name: {
            type: String,
            required: [true, "Please enter gift name"],
        },
        status: {
            type: Boolean,
            default: false,
        },
    }
);

// Export the model
const Gift = mongoose.model('Gift', GiftSchema);
module.exports = Gift;
