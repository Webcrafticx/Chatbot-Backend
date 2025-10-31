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
    logoPublicId: String,
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
    fallbackMessage: {
    type: String,
    default: 'Thanks for your message. Kindly submit this form and our executive will reach out as soon as possible.'
  },
    socialLinks: {
    facebook: { type: String, default: "" },
    instagram: { type: String, default: "" },
    youtube: { type: String, default: "" },
    whatsapp: { type: String, default: "" },
    location: { type: String, default: "" },
    website: { type: String, default: "" }
  },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('ChatBot', chatBotSchema);