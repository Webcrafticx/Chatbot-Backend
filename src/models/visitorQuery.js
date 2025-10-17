const mongoose = require("mongoose");

const VisitorQuerySchema = new mongoose.Schema({
  chatbot: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chatbot",
    required: true,
    index: true,
  },
  name: { type: String, required: true, index: true },
  email: { type: String, required: true, index: true },
  phone: { type: String, required: true, index: true },
  message: { type: String, required: true },
  // replied: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("VisitorQuery", VisitorQuerySchema);
