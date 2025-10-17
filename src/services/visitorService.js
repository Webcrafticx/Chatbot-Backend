const VisitorRepo = require("../repositories/visitorRepo");

class VisitorService {
    static async create(data) {
        return await VisitorRepo.create(data);
    }
    static async visitorList(chatbot, opts = {}) {
        return await VisitorRepo.listByChatbot(chatbot, opts);
    }
    static async delete(id) {
        return await VisitorRepo.delete(id);
    }
}

module.exports = VisitorService;