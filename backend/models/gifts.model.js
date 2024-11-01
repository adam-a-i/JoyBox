// models/gifts.model.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    gifts: [{
        giftName: { type: String, required: true },
        status: { type: Boolean,  default: true }
    }]
});

// Export the model
const Gift = mongoose.model('Gift', GiftSchema);
module.exports = Gift;
