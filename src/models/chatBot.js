const mongoose = require("mongoose");

const chatBotSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    companyName: {
        type: String,
        required: true,
        index: true
    },
    logoUrl: {
        type: String,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    welcomeMessage: {
        type: String,
        default: 'Hello! How can I help you?'
    },
    description: {
        type: String,
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('ChatBot', chatBotSchema);