const qaRepo = require("../repositories/qaRepo");

class QAServices {
    static async createQA(data) {
        return await qaRepo.create(data);
    }
    static async update(id, data) {
        return await qaRepo.update(id, data);
    }
    static async delete(id) {
        return await qaRepo.delete(id);
    }
    static async listForChatbot(ChatbotId){
        return await qaRepo.findByChatbot(ChatbotId);
    }
    static async displayForChatbot(ChatbotId){
        return await qaRepo.findDisplayByChatbot(ChatbotId);
    }
    static async searchBestMatch(chatbotId, text) {
        return await qaRepo.searchBestMatch(chatbotId, text);
    }
}

module.exports = QAServices;