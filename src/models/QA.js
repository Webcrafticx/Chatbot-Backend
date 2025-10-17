const mongoose = require("mongoose");

const QASchema = new mongoose.Schema({
    chatbot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ChatBot',
        required: true,
        index: true
    },
    question: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true
    },
    isDisplay: {
        type: Boolean,
        default: false,
        index: true
    },
    keywords:[ {
        type: String,
        index: true
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

QASchema.index({question: "text", answer: "text", keywords: "text"});

module.exports = mongoose.model('QA', QASchema);