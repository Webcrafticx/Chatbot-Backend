const VisitorRepo = require("../repositories/visitorRepo");

class VisitorService {
    static async create(data) {
        return await VisitorRepo.create(data);
    }
    static async visitorList(chatbot, opts = {}) {
        return await VisitorRepo.listByChatbot(chatbot, opts);
    }
    static async update(id, status) {
        return await VisitorRepo.update(id, status);
    }
    static async delete(id) {
        return await VisitorRepo.delete(id);
    }
}

module.exports = VisitorService;