const QA = require("../models/QA");

class QARepo {
  static async create(qa) {
    return await QA.create(qa);
  }
  static async findByChatbot(chatbotId, opts = {}) {
    return await QA.find({ chatbot: chatbotId }).limit(opts.limit || 20);
  }
  static async findDisplayByChatbot(chatbotId) {
    return await QA.find({ chatbot: chatbotId, isDisplay: true });
  }
  static async searchBestMatch(chatbotId, text) {
    const res = await QA.aggregate([
      {
        $match: {
          $text: { $search: text },
          chatbot: chatbotId,
        },
      },
      {
        $addFields: {
          score: { $meta: "textScore" },
        },
      },
      {
        $sort: { score: -1 },
      },
      {
        $limit: 1,
      },
    ]);

    return res[0] || null;
  }

  static async findById(id) {
    return await QA.findById(id);
  }
  static async update(id, update) {
    return await QA.findByIdAndUpdate(id, update, { new: true });
  }
  static async delete(id) {
    return await QA.findByIdAndDelete(id);
  }
   static async findByChatbotId(chatbotId) {
    return await QA.find({ chatbot: chatbotId });
  }
}

module.exports = QARepo;