const VisitorQuery = require("../models/visitorQuery");

class VisitorRepo {
   static async create(data) {
        return await VisitorQuery.create(data);
    }
    static async listByChatbot(chatbotId, opts = {}) {
  const query = { chatbot: chatbotId };

  if (opts.search) {
    query.message = { $regex: opts.search, $options: "i" }; 
  }

  if (opts.fromDate || opts.toDate) {
    query.createdAt = {};
    if (opts.fromDate) query.createdAt.$gte = new Date(opts.fromDate);
    if (opts.toDate) query.createdAt.$lte = new Date(opts.toDate);
  }

  const list = await VisitorQuery.find(query)
    .sort({ createdAt: -1 }) 
    .limit(opts.limit || 20)
    .skip(opts.skip || 0);

  const total = await VisitorQuery.countDocuments(query); 

  return { total, count: list.length, data: list };
}

    static async delete(id) {
        return await VisitorQuery.findByIdAndDelete(id);
    }
}
module.exports = VisitorRepo;
